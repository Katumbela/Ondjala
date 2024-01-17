import "../App.css";
// Bootstrap CSS
import { Modal, Button } from "react-bootstrap";
// Bootstrap Bundle JS
import logo from "../imgs/iconn2.png";
import sh from "../imgs/sh.png";
import Header from "../components/header";
import Footer from "../components/footer";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "./userContext";
import firebase from "firebase/compat/app";
import { db } from "./firebase";
import notFound from "../imgs/not-found.png";
import regular from "../imgs/regular.png";
import "../css/ranking.css";
import naorecomendado from "../imgs/naorecomendado.webp";
import otimo from "../imgs/otimo.webp";
import r360 from "../imgs/r360.png";
import ruim from "../imgs/ruim.webp";
import dadosEmpresas from "../model/empresas";
import ScrollToTopLink from "../components/scrollTopLink";
import AbreviarTexto from "../components/abreviartexto/abreviarTexto";
import pratos from "../model/pratos";
import { useParams } from "react-router-dom";

const Pesquisar = ({ cart, nomee, add, remove, emaill }) => {
  const { handleLogout } = useContext(UserContext);
  const { endereco } = useParams();
  document.title = `Busque o prato que deseja | Ondjala Catering Service`;

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

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited) {
      setShowModal(true);
      localStorage.setItem("hasVisited", true);
    }

    fetchPlayers();
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleClose = () => setShowModal(false);

  const [players, setPlayers] = useState([]);

  // Função para buscar os jogadores ordenados por pontuação
  const fetchPlayers = async () => {
    try {
      const snapshot = await db
        .collection("players")
        .where("pontos", ">", 15)
        .orderBy("pontos", "desc")
        .limit(3)
        .get();
      const playerData = snapshot.docs.map((doc) => doc.data());
      setPlayers(playerData);
    } catch (error) {
      console.error("Erro ao buscar os jogadores:", error);
    }
  };

  const [backgroundImage, setBackgroundImage] = useState(0);
  const images = ["a1.jpg", "a7.jpg", "a3.jpg"];

  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

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

  return (
    <div className="w-100">
      <div className="">
        <br />
        <center className="container text-start">
          <div className="justify-content-between d-flex mb-2">
            <a href={"/pt/menu/" + endereco} title="Voltar">
              <i className="bi bi-arrow-left text-danger f-24"></i>
            </a>
            {user != null ? (
              <>
                <div className="d-flex gap-2">
                  <ScrollToTopLink
                    to={"/pt/perfil"}
                    className="btn btn-sm login2 btn-danger px-3 f-reg rounded-pill"
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
          <h2 className="fw-bolder text-danger"> Busque o seu prato</h2>
          <div className="">
            <div className="input-search2 mt-1 rounded-pill d-flex pesquisa3">
              <i className="bi bi-search"></i>
              <input
                type="text"
                name=""
                placeholder="Pesquise o seu prato"
                id=""
                value={searchTerm}
                onClick={handleInputClick}
                onChange={handleInputChange}
              />
            </div>

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
                      <b className="preco mt-">{prato.preco} Kz</b>
                    </div>
                    <div className="img">
                      <img src={prato.imagem} className="my-auto" alt="" />
                      <button onClick={add(prato)} className="btn btn-danger rounded-pill">
                        Add <i className="bi bi-plus"></i>
                      </button>
                    </div>
                  </div>
                ))
              ) : showSuggestions && searchTerm !== "" ? (
                <>
                  <p className="text-center py-3 mt-3 w-100 mx-auto f-14">
                    <img src={logo} style={{ height: "8em" }} alt="" />
                    <p className="text-secondary mt-3">
                      Nenhum resultado encontrado, parece que ainda não temos{" "}
                      <b className="text-danger">{searchTerm}</b> no nosso menu
                      de hoje.{" "}
                    </p>
                  </p>
                </>
              ) : null}

              <br />
              <br />
              <br />
              {searchTerm == "" && (
                <center>
                  <img src={sh} style={{ height: "6em" }} alt="" />
                  <br />
                  <br />
                  <span className="text-secondary f-14">
                    Busque o seu prato no menu de hoje
                  </span>
                </center>
              )}
            </div>
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
