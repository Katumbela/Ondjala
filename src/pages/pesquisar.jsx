import "../App.css";
// Bootstrap CSS
// Bootstrap Bundle JS
import logo from "../imgs/iconn2.png";
import sh from "../imgs/sh.png";
import Header from "../components/header";
import Footer from "../components/footer";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "./userContext";
import firebase from "firebase/compat/app";
import { db } from "./firebase";

import regular from "../imgs/regular.png";
import "../css/ranking.css";
import naorecomendado from "../imgs/naorecomendado.webp";
import otimo from "../imgs/otimo.webp";
import r360 from "../imgs/r360.png";
import ruim from "../imgs/ruim.webp";
// import AbreviarTexto from "../components/abreviarTexto";
import dadosEmpresas from "../model/empresas";
import ScrollToTopLink from "../components/scrollTopLink";
import AbreviarTexto from "../components/abreviartexto/abreviarTexto";
import pratos from "../model/pratos";
import { useParams } from "react-router-dom";

const Pesquisar = ({ add, remove, cart, nomee, emaill }) => {
  const { handleLogout } = useContext(UserContext);
  document.title = `Busque a empresa a reclamar | Reputação 360`;

  const [user, setUser] = useState(null);
  const { endereco } = useParams();

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

    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited) {
      setShowModal(true);
      localStorage.setItem("hasVisited", true);
    }

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleClose = () => setShowModal(false);

  const [backgroundImage, setBackgroundImage] = useState(0);
  const images = ["a1.jpg", "a7.jpg", "a3.jpg"];

  const backgroundStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/images/${images[backgroundImage]})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: "brightness(35%)",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "70vh",
  };

  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  const [searchTerm, setSearchTerm] = useState("");

  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    // Filtrar empresas com base no termo de pesquisa
    const results = pratos.filter((plate) => {
      const lowerCasedTerm = searchTerm.toLowerCase();
      return plate.nome.toLowerCase().includes(lowerCasedTerm);
    });

    // Atualizar os resultados da pesquisa
    setSearchResults(results);

    // Exibir as sugestões
  };

  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleInputClick = () => {
    // Exibir sugestões ao clicar no input
    setShowSuggestions(true);
  };

  const handleBlur = () => {
    // Aguarde um curto período antes de fechar as sugestões para permitir o clique nas sugestões
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };

  let preco = 0;
  let qnt = 0;
  cart.map((item) => (preco += item.preco * item.qty));
  cart.map((item) => (qnt += item.qty));

  const [nav, setNav] = useState(0);

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
    const partes = valorEmReais.toFixed(2).toString().split('.');
    const inteiro = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const decimal = partes[1];
  
    return `${inteiro} ${decimal} Kz`;
  }
  
  return (
    <div className="w-100">
      {/*  */}
      {/* <Navba/> */}

      <div className="">
        <br />
        <center className="container text-start">
          <div className="d-flex justify-content-between">
            <div>
              <ScrollToTopLink to={"/pt/menu/" + endereco}>
                <i className="bi bi-arrow-left f-20 text-danger"></i>
              </ScrollToTopLink>
            </div>

            <div className="d-flex gap-2">
              <div className="my-auto">
                <ScrollToTopLink to={'/pt/meu-carrinho/'+endereco} className="btn text-decoration-none my-auto btn-sm login2 btn-danger px-3 f- rounded-pill">
                  <i className="bi bi-cart2 me-1"></i>
                  <b>{qnt}</b>
                </ScrollToTopLink>
              </div>
              {user != null ? (
                <>
                  <div className="d-flex gap-2">
                    <ScrollToTopLink
                      to={"/pt/perfil"}
                      className="btn btn-sm cadastro2  px-3 f-reg rounded-pill"
                    >
                      <span className="my-auto">
                        <i className="bi bi-person-circle me-1"></i>{" "}
                        {user?.name.split(" ")[0]} {user?.name.split(" ")[1]}
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
          </div>
          <br />
          <div className="">
            <h2 className="fw-bolder text-danger">Busque seu prato</h2>
          </div>

          <div className="input-search rounded-pill d-flex pesquisa3">
            <i className="bi bi-search"></i>
            <input
              type="text"
              name=""
              placeholder="Endereço de entrega"
              id=""
              value={searchTerm}
              onClick={handleInputClick}
              onBlur={handleBlur}
              onChange={handleInputChange}
            />
            <i className="bi bi-arrow-right-short "></i>
          </div>
          <div className="">
            <div className="">
              {searchResults.length > 0 && searchTerm !== "" ? (
                searchResults.map((prato) => (
                  <div
                    key={prato.id}
                    className="prato justify-content-between d-flex my-3"
                  >
                    <div className="desc-prato">
                      <h2 className="f-20">
                        <b>{prato.nome}</b>
                      </h2>
                      <p className="text-secondary f-12 desc">
                        <AbreviarTexto texto={prato.descricao} largura={190} />
                      </p>
                      <b className="preco mt-">{formatarQuantia(prato.preco)} Kz</b>
                    </div>
                    <div className="img">
                      <img src={prato.imagem} className="my-auto" alt="" />
                      <button
                        onClick={() => add(prato)}
                        className="btn btn-danger rounded-pill"
                      >
                        Add <i className="bi bi-plus"></i>
                      </button>
                    </div>
                  </div>
                ))
              ) : searchTerm !== "" ? (
                <>
                  <p className="text-center py-3 w-100 mx-auto f-14">
                    <img src={logo} style={{ height: "8em" }} alt="" />
                    <p>
                      Não encontramos{" "}
                      <b className="text-danger">{searchTerm}</b> no nosso menu
                      de hoje, tente buscar por outro prato ou veja o menú
                      completo.{" "}
                    </p>
                  </p>
                </>
              ) : null}
            </div>
          </div>
          <br />
          <br />
          <br />

          <div className="container">
            {searchTerm === "" && (
              <center>
                <img src={sh} style={{ height: "7em" }} alt="" /> <br />
                <span className="text-secondary w-175">
                  Encontre o prato que deseja comer hoje que a Ondjala Catering
                  leva pra sí na hora
                </span>
              </center>
            )}
          </div>
        </center>
        <br />

        <br />

        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default Pesquisar;
