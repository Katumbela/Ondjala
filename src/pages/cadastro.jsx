import "../App.css";
// Bootstrap CSS
import { Modal, Button } from "react-bootstrap";
// Bootstrap Bundle JS
import logo from "../imgs/icone.png";
import Header from "../components/header";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "./userContext";
import firebase from "firebase/compat/app";
import { db } from "./firebase";
import { NavLink } from "react-router-dom";

import userSignup from "../imgs/user-signup.png";
import company from "../imgs/company.png";
import Footer from "../components/footer";


const Cadastro = ({ cart, nomee, emaill }) => {
  const { user, handleLogout } = useContext(UserContext);
  document.title = `Cadastre uma conta | Reputação 360`;

  useEffect(() => {
    // Adicione um listener para o estado da autenticação
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        // Se não houver usuário autenticado, redirecione para a página de login

        const userData = {
          name: "",
          email: "",
          pictureUrl: "",
          tel: "",
          uid: "",
        };

        localStorage.setItem("users", JSON.stringify(userData));
      }
    });

    // Retorne uma função de limpeza para remover o listener quando o componente for desmontado
    return unsubscribe;
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

  const [use, setUser] = useState([]);

  useEffect(() => {
    // Obtém o valor de 'users' do local storage quando o componente for montado
    const userString = localStorage.getItem("users");
    if (userString) {
      const user = JSON.parse(userString);
      setUser(user);
    } else {
      const userData = {
        name: "",
        email: "",
        pictureUrl: "",
        tel: "",
      };
      setUser(userData);
    }
  }, []);

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

  return (
    <div className="w-100 bg-light">
      {/*  */}
      {/* <Navba/> */}
      <Header
        style={{ marginBottom: "5rem" }}
        nomee={nomee}
        emaill={emaill}
        cart={cart}
      />

      <div className="s">
        <br />
        <br />
        <center className="container">
          <h1 className="f-reg">
            <b>Olá, crie uma conta no Reputação 360</b>
          </h1>
          <div className="container">
            <span className="f-16 text-secondary container">
              Com você logado conseguimos oferecer um serviço melhor e mais
              personalizado.Navegue logado e ajude outros milhões de
              consumidores.
            </span>
            <br />
          </div>
        </center>
        <br />

        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-1 col-lg-2"></div>
            <div className="col-12 col-sm-5 col-lg-4 my-3">
              <div className="card-cadastro c-c-c bg-white p-4">
                <center>
                  <img src={userSignup} className="logo" alt="" />
                </center>
                <center>
                  <h3>
                    <b className="text-success">Sou consumidor</b>
                  </h3>

                  <p>
                    Faça seu cadastro e publique reclamações para as empresas e
                    ajude outros consumidores
                  </p>
                  <br />
                  <NavLink
                    to={"/pt/cadastro/consumidor"}
                    className="btn mt-auto btn-outline-success w-100 rounded-1"
                  >
                    Fazer cadastro
                  </NavLink>
                </center>
              </div>
            </div>
            <div className="col-12 col-sm-5 col-lg-4 my-3">
              <div className="card-cadastro c-c-e bg-white p-4">
                <center>
                  <img src={company} className="logo" alt="" />
                </center>
                <center>
                  <h3>
                    <b className="text-primary">Sou empresa</b>
                  </h3>

                  <p>
                    Cadastre sua empresa no Reputação 360. Responda suas
                    reclamações e trabalhe sua reputação, ou reclame de outras
                    empresas.
                  </p>
                  <br />
                  <NavLink
                    to={"/pt/cadastro/empresa"}
                    className="btn btn-primary w-100 rounded-1"
                  >
                    Conheça as soluções
                  </NavLink>
                </center>
              </div>
            </div>

            <div className="col-12 col-sm-1  col-lg-2"></div>
          </div>
        </div>

        <br />

        <div className="publicidade text-white bg-secondary my-3 py-5 text-center">
          <br />
          <h5>Publicidade</h5>

          <br />
        </div>

        <br />

        <br />

        <Footer />
      </div>
    </div>
  );
};

export default Cadastro;
