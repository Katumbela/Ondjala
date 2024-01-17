import "../App.css";
// Bootstrap CSS
// Bootstrap Bundle JS
import Header from "../components/header";
import Footer from "../components/footer";
import BannerPreto from "../components/banner_preto";
import { db } from "./firebase";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../components/loader";
import { useParams } from "react-router-dom";
import Header2 from "../components/header2/header2";

import mini1 from "../imgs/begga.png";
import user from "../imgs/user.png";
import logo from "../imgs/iconn.png";
import mini3 from "../imgs/cou.png";
import mini4 from "../imgs/fries.png";

import dadosEmpresas from "../model/empresas";
import firebase from "firebase/compat/app";
import pratos from "../model/pratos";
import AbreviarTexto from "../components/abreviartexto/abreviarTexto";
import ScrollToTopLink from "../components/scrollTopLink";

const Perfil = ({ emaill, nomee, cart, add, remove }) => {

  const [load, setLoad] = useState(false);

  const [user, setUser] = useState(null);

  document.title = `Perfil ${user?.nome} | Ondjala`;

  const [telefone, setTel] = useState(user?.tel);
  useEffect(() => {
    const userDataFromLocalStorage = localStorage.getItem("users");

    // Verificar se há dados no armazenamento local
    if (userDataFromLocalStorage) {
      try {
        const userData = JSON.parse(userDataFromLocalStorage);
        setUser(userData);
        setTel(userData.tel || ""); // Definir o número de telefone
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
                photo: user.pictureUrl,
                uid: user.uid,
                tel: user.phoneNumber
                  ? user.phoneNumber
                  : querySnapshot.docs[0].get("phone"),
                city: querySnapshot.docs[0].get("city"),
              };

              setUser(userData);
              setTel(userData.tel || ""); // Definir o número de telefone
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

  
  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(null);
        localStorage.removeItem("users"); // Remover dados do armazenamento local
        // window.location.href = "/pt"; // Redirecionar para a página de login
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const handleTelChange = (e) => {
    setTel(e.target.value);
  };
  const handleUpdatePhone = () => {
    setLoad(true);
  
    // Consultar o Firestore para obter o documento do usuário com base no e-mail
    db.collection("cliente")
      .where("email", "==", user.email)
      .get()
      .then((querySnapshot) => {
        // Verificar se há algum documento retornado
        if (!querySnapshot.empty) {
          // Obter o primeiro documento (assumindo que há apenas um)
          const doc = querySnapshot.docs[0];
  
          // Atualizar o número de telefone no banco de dados
          return doc.ref.update({
            phone: telefone,
          });
        } else {
          throw new Error("Documento não encontrado para o e-mail do usuário.");
        }
      })
      .then(() => {
        setLoad(false);
        toast.success("Número de telefone atualizado com sucesso!");
      })
      .catch((error) => {
        setLoad(false);
        toast.error("Erro ao atualizar número de telefone: " + error.message);
      });
  };
  
  return (
    <>
      <ToastContainer />
      <div className="py-3 d-flex container justify-content-between text-center">
        <ScrollToTopLink to={'/pt/'} className="">
          <img style={{ height: "2em" }} src={logo} alt="" />
        </ScrollToTopLink>
        {user != null ? (
          <>
            <div className="d-flex gap-2 logged">
              <ScrollToTopLink
                to={"/pt/perfil"}
                className="btn btn-sm login btn-white px-3 py- rounded-pill"
              >
                <i className="bi bi-person-circle me-1"></i>{" "}
                {user?.nome.split(" ")[0]} {user?.nome.split(" ")[1]}
              </ScrollToTopLink>
            </div>
          </>
        ) : (
          <>
            <div className="d-flex gap-2">
              <ScrollToTopLink
                to={"/pt/login"}
                className="btn btn-sm login btn-white px-3 f-reg rounded-pill"
              >
                Login
              </ScrollToTopLink>
              <ScrollToTopLink
                to={"/pt/cadastro"}
                className="btn btn-sm cadastro btn-danger px-3 py- rounded-pill"
              >
                Cadastro
              </ScrollToTopLink>
            </div>
          </>
        )}
      </div>
      <div className="p-4 bg-light">
        <center>
          <h1 className="text-dark fw-bolder">Perfil</h1>
          <div className="linha2 mx-auto"></div>
        </center>
      </div>
      <br />
      <center className="w-75 mx-auto">
        {user?.photo != "" ? (
          <img
            src={user?.photo}
            className="rounded-circle borded-1"
            style={{ height: "8em", border: "1px solid #d9d9d9" }}
            alt=""
          />
        ) : (
          <img
            src={user}
            className="rounded-circle borded-1"
            style={{ height: "8em", border: "1px solid #d9d9d9" }}
            alt=""
          />
        )}
        <br />
        <br />
        <h2>{user?.nome}</h2>
        <p className="text-secondary">
          <i className="bi bi-envelope"></i> {user?.email}
        </p>
        <p className="text-secondary">
          <i className="bi bi-telephone"></i> {user?.tel ?? "N/A"}
        </p>
        <p className="mx-auto">
          <button onClick={handleLogout} className="btn btn-danger">
            Termina sessão
          </button>
        </p>
      </center>
      <br />

      <div className="p-4 bg-light">
        <center>
          <h3 className="text-danger fw-bolder">Informações adicionais</h3>
        </center>
      </div>
      <br />
      <div className="container mx-auto w-75">
        <p className="text-dark">ID: {user?.uid}</p>
        <p className="text-dark">Endereço: {user?.city ?? "--"}</p>
        <br /> {/* Adicione o campo de entrada para o número de telefone */}
        <div className="text-center">
          <div className="mb-3 text-start mx-auto">
            <label htmlFor="telefone" className="form-label">
              Número de Telefone
            </label>
            <input
              type="tel"
              className="form-control"
              id="telefone"
              value={telefone}
              onChange={handleTelChange}
            />
          </div>

          {/* Botão para atualizar o número de telefone */}
          <div className="mx-auto">
            <button
              className="btn btn-outline-danger mx-auto "
              onClick={handleUpdatePhone}
              disabled={load}
            >
              Atualizar Número de Telefone
            </button>
          </div>
        </div>
      </div>

      <br />
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </>
  );
};

export default Perfil;
