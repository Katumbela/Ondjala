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
    // verificar login do usuario
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        try {
          // Consultar o Firestore para obter o documento do usuário com base no e-mail
          const querySnapshot = await db
            .collection("cliente")
            .where("email", "==", user.email)
            .get();

          if (!querySnapshot.empty) {
            // Se houver um documento correspondente, obter os dados
            const userData = {
              name: user.displayName
                ? user.displayName
                : querySnapshot.docs[0].get("name"),
              email: user.email,
              pictureUrl: user.photoURL,
              uid: user.uid,
              tel: user.phoneNumber
                ? user.phoneNumber
                : querySnapshot.docs[0].get("phone"),
              // Adicione outros campos conforme necessário
              bi: querySnapshot.docs[0].get("bi"),
              city: querySnapshot.docs[0].get("city"),
              // Adicione outros campos conforme necessário
            };

            // Atualizar o estado do usuário com os dados
            setUser(userData);

            // Salvar dados no localStorage
            localStorage.setItem("users", JSON.stringify(userData));
          } else {
            console.warn(
              "Documento não encontrado no Firestore para o e-mail do usuário."
            );
          }
        } catch (error) {
          console.error("Erro ao buscar dados do Firestore:", error);
        }
      } else {
        // Se o usuário não estiver logado, defina o estado do usuário como null
        setUser(null);
      }
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
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
          name: result.user.displayName,
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

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    // Filtrar empresas com base no termo de pesquisa
    const results = dadosEmpresas.filter((empresa) => {
      const lowerCasedTerm = searchTerm.toLowerCase();
      return (
        empresa.nome.toLowerCase().includes(lowerCasedTerm) ||
        empresa.site.toLowerCase().includes(lowerCasedTerm) ||
        empresa.nif.includes(searchTerm)
      );
    });

    // Atualizar os resultados da pesquisa
    setSearchResults(results);

    // Exibir as sugestões
    setShowSuggestions(true);
  };

  const handleBlur = () => {
    // Aguarde um curto período antes de fechar as sugestões para permitir o clique nas sugestões
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };

  const handleInputClick = () => {
    // Exibir sugestões ao clicar no input
    setShowSuggestions(true);
  };

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(null);

        const userData = {
          name: "",
          email: "",
          pictureUrl: "",
          tel: "",
        };

        localStorage.setItem("users", JSON.stringify(userData));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="py-3 d-flex container justify-content-between text-center">
        <img src={icone} className="icone2 my-auto" alt="" />

        <div className="d-flex gap-2">
          <ScrollToTopLink
            to={"/pt/login"}
            className="btn btn-sm login2 btn-danger px-3 f-reg rounded-pill"
          >
            Login
          </ScrollToTopLink>
          <button className="btn btn-sm cadastro2  px-3 rounded-pill">
            Cadastro
          </button>
        </div>
      </div>

      <div className="head-menu container">
        <div className="d-flex justify-content-between">
          <div className="d-flex my-auto flex-column">
            <b className="f-18">Menú do dia</b>
            <span className="text-secondary f-12">
              <AbreviarTexto texto={endereco} largura={300} />
            </span>
          </div>
          <div className="my-auto">
            <button className="btn my-auto btn-sm login2 btn-danger px-3 f-20 rounded-pill">
              <i className="bi bi-cart2 me-1"></i>
              <b>{qnt}</b>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header2;
