import React, { useContext, useEffect, useState } from "react";
import "./header2.css";
import { NavLink } from "react-router-dom";
import firebase from "firebase/compat/app";
// import AbreviarTexto from "./abreviarTexto";

import icone from "../../imgs/iconn.png";
import ScrollToTopLink from "../scrollTopLink";
import dadosEmpresas from "../../model/empresas";
import { db } from "../../pages/firebase";
import AbreviarTexto from "../abreviartexto/abreviarTexto";

const Header2 = (props) => {
  const [ph, setPh] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userDataFromLocalStorage = localStorage.getItem("users");

    // Verificar se há dados no armazenamento local
    if (userDataFromLocalStorage) {
      try {
        const userData = JSON.parse(userDataFromLocalStorage);
        setUser(userData);
      } catch (error) {
        console.error("Erro ao analisar dados do armazenamento local:", error);
      }
    } else {
      // Se não houver dados no armazenamento local, verificar o estado do usuário no Firebase
      const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
          try {
            // Consultar o Firestore para obter o documento do usuário com base no e-mail
            const querySnapshot = await db
              .collection("cliente")
              .where("email", "==", user.email)
              .get();

            if (!querySnapshot.empty) {
              const userData = {
                nome: user.displayName
                  ? user.displayName
                  : querySnapshot.docs[0].get("name"),
                email: user.email,
                pictureUrl: user.photoURL,
                uid: user.uid,
                tel: user.phoneNumber
                  ? user.phoneNumber
                  : querySnapshot.docs[0].get("phone"),
                city: querySnapshot.docs[0].get("city"),
              };

              setUser(userData);
              localStorage.setItem("users", JSON.stringify(userData));
            } else {
              console.warn(
                "Documento não encontrado no Firestore para o e-mail do usuário."
              );
            }
          } catch (error) {
            console.error("Erro ao buscar dados do Firestore:", error);
          }
        }

        // Definir o estado de carregamento como falso, independentemente do resultado
        // setLoading(false);
      });

      return () => unsubscribe();
    }
  }, []);

  const handleLoginWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        // login bem-sucedido, faça algo aqui
        setUser(result.user);

        // setEmaill(result.user.email);

        const userData = {
          nome: result.user.displayName,
          email: result.user.email,
          pictureUrl: result.user.pictureUrl,
          photo: result.user.photoURL,
          uid: result.user.uid,
          tel: result.user.phoneNumber,
        };

        localStorage.setItem("users", JSON.stringify(userData));
        // setNomee(result.user.displayName);
        // handleLogin(result);
        window.location.href = "/pt";
      })
      .catch((error) => {
        // erro no login, faça algo aqui
      });
  };

  const { nomee, emaill, endereco, add, remove, cart } = props;

  let preco = 0;
  let qnt = 0;
  cart.map((item) => (preco += item.preco * item.qty));
  cart.map((item) => (qnt += item.qty));
  const [nav, setNav] = useState(0);

  const abrirMenu = () => {
    setNav(1);
    console.log("Menu Aberto!");
  };

  const fecharMenu = () => {
    setNav(!nav);
  };

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const visible = prevScrollPos > currentScrollPos;

      setPrevScrollPos(currentScrollPos);
      setVisible(visible);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const handleOverflow = () => {
      // Adicione a classe para ocultar a rolagem vertical do corpo
      document.body.style.overflowY = showSuggestions ? "hidden" : "auto";
    };

    // Adicione um ouvinte de evento quando showSuggestions muda
    handleOverflow();

    // Limpe o ouvinte de evento ao desmontar o componente
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [showSuggestions]);

  const [searchTerm, setSearchTerm] = useState("");

  const [searchResults, setSearchResults] = useState([]);

  const [scrollY, setScrollY] = useState(0);
  const [showDiv, setShowDiv] = useState(true);
  const [hideAnimation, setHideAnimation] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setScrollY(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (scrollY > 150 && showDiv) {
      // Se a distância de scroll for maior que 60 e a div estiver visível
      setShowDiv(false);
      setHideAnimation(false);
    } else if (scrollY <= 150 && !showDiv) {
      // Se a distância de scroll for menor ou igual a 60 e a div estiver invisível
      setShowDiv(true);
      setHideAnimation(true); // Desativar animação de saída
    }
  }, [scrollY, showDiv]);



  function formatarQuantia(valorEmCentavos) {
    // Converte a string para um número em centavos
    const valorNumerico = parseInt(valorEmCentavos);

    // Verifica se o valor é um número válido
    if (isNaN(valorNumerico)) {
      return "Formato inválido";
    }

    // Converte o valor para reais (dividindo por 100)
    const valorEmReais = valorNumerico / 100;

    // Formata o número como uma quantia de dinheiro
    const partes = valorEmReais.toFixed(2).toString().split(".");
    const inteiro = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const decimal = partes[1];

    return `${inteiro} ${decimal} Kz`;
  }

  const [isEndOfPage, setIsEndOfPage] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight || document.documentElement.clientHeight;

      if (scrollTop >= scrollHeight - clientHeight) {
        setIsEndOfPage(true);
      } else {
        setIsEndOfPage(false);
      }
    };

    // Adicione o evento de scroll ao componente
    window.addEventListener("scroll", handleScroll);

    // Remova o evento de scroll ao desmontar o componente
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  return (
    <>
      <div className="py-3 d-flex container justify-content-between text-center">
        <ScrollToTopLink to={"/pt"}>
          <img src={icone} className="icone2 my-auto" alt="" />
        </ScrollToTopLink>
        {user != null ? (
          <>
            <div className="d-flex gap-2">
              <ScrollToTopLink
                to={"/pt/perfil"}
                className="btn btn-sm login2 btn-danger px-3 f-reg rounded-pill"
              >
                <span className="my-auto">
                  <i className="bi bi-person-circle me-1"></i>{" "}
                  {user.nome.split(" ")[0]} {user.nome.split(" ")[1]}
                </span>
              </ScrollToTopLink>
            </div>
          </>
        ) : (
          <div className="d-flex gap-2">
            <ScrollToTopLink
              to={"/pt/login"}
              className="btn btn-sm login2 btn-danger px-3 f-reg rounded-pill"
            >
              Login
            </ScrollToTopLink>
            <ScrollToTopLink
              to={"/pt/cadastro"}
              className="btn btn-sm cadastro2  px-3 rounded-pill"
            >
              Cadastro
            </ScrollToTopLink>
          </div>
        )}
      </div>

      <div className="head-menu container">
        <div className="d-flex justify-content-between">
          {endereco === "Luanda, Angola" ? (
            <>
              <div className="d-flex my-auto flex-column">
                <b className="f-18">Pratos escolhidos</b>
                <span className="f-12">
                  <ScrollToTopLink to={"/pt"} className={"text-danger "}>
                    <i className="bi bi-arrow-left text-danger"></i> Voltar
                  </ScrollToTopLink>
                </span>
              </div>
            </>
          ) : (
            <div className="d-flex my-auto flex-column">
              <b className="f-18">Menú do dia</b>
              <span className="text-secondary f-12">
                <AbreviarTexto texto={endereco} largura={250} />
              </span>
            </div>
          )}
          <div className="my-auto">
            <ScrollToTopLink
              to={"/pt/meu-carrinho/" + endereco}
              className="btn text-decoration-none my-auto btn-sm login2 btn-danger px-3 f-20 rounded-pill"
            >
              <i className="bi bi-cart2 me-1"></i>
              <b>{qnt}</b>
            </ScrollToTopLink>
          </div>
        </div>
      </div>
      <div className={`div-bottom ${hideAnimation ? "hide-animation" : ""} ${isEndOfPage ? " final-p bg-white text-dark" : " bg-dark text-white"}`}>
        {/* div a ser mostrada depois de scroll {scrollY} {hideAnimation ? "hide-animation" : "show"}
         */}
        <div className="d-flex justify-content-between">
          <div className="d-flex gap-2 cartt">
          <i className="bi bi-cart3"></i> {qnt} pratos no Carrinho
          </div>
          <div className="tott">
            {formatarQuantia(preco)}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header2;
