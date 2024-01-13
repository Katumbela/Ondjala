import React, { useState, useEffect, useContext } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

import { UserContext } from "./userContext";

import { NavLink } from "react-router-dom";
import "../css/login.css";
import logo from "../imgs/icone.png";
import logo2 from "../imgs/logo-d.png";
import axios from "axios";
import Header from "../components/header";
import Footer from "../components/footer";
import ScrollToTopLink from "../components/scrollTopLink";
import Swal from "sweetalert2";
import { db } from "./firebase";

const Login = ({ setNomee, setEmaill, cart, nomee, emaill }) => {
  const { handleLogin, push } = useContext(UserContext);

  document.title = `Entrar para sua conta | Reputação 360`;

  const [user, setUser] = useState(null);


  // verificar login do usuario
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        try {
          // Consultar o Firestore para obter o documento do usuário com base no e-mail
          const querySnapshot = await db.collection("cliente").where("email", "==", user.email).get();
  
          if (!querySnapshot.empty) {
            // Se houver um documento correspondente, obter os dados
            const userData = {
              name: user.displayName ,
              email: user.email,
              pictureUrl: user.photoURL,
              uid: user.uid,
              tel: user.phoneNumber ? user.phoneNumber : querySnapshot.docs[0].get("phone"),
              // Adicione outros campos conforme necessário
              bi: querySnapshot.docs[0].get("bi"),
              nome: querySnapshot.docs[0].get("name"),
              city: querySnapshot.docs[0].get("city"),
              // Adicione outros campos conforme necessário
            };
  
            // Atualizar o estado do usuário com os dados
            setUser(userData);
  
            // Salvar dados no localStorage
            localStorage.setItem("users", JSON.stringify(userData));
          } else {
            console.warn("Documento não encontrado no Firestore para o e-mail do usuário.");
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

        setEmaill(result.user.email);

        const userData = {
          name: result.user.displayName,
          email: result.user.email,
          pictureUrl: result.user.pictureUrl,
          photo: result.user.photoURL,
          uid: result.user.uid,
          tel: result.user.phoneNumber,
        };

        localStorage.setItem("users", JSON.stringify(userData));
        setNomee(result.user.displayName);
        handleLogin(result);
        window.location.href = "/pt";
      })
      .catch((error) => {
        alert(error);
      });
  };

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(null);

        setEmaill("");
        setNomee("");
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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleLoginWithEmailAndPassword = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        // Login bem-sucedido, faça algo aqui
        setEmaill(result.user.email);
        setNomee(result.user.displayName);

        const userData = {
          name: result.user.displayName,
          email: result.user.email,
          // Adicione outros dados do usuário conforme necessário
        };

        localStorage.setItem("users", JSON.stringify(userData));
        window.location.href = "/pt";
      })
      .catch((error) => {
        if (
          error.code === "auth/invalid-login-credentials" ||
          error.code === "auth/invalid-email"
        ) {
          // Verificar se o usuário existe
          firebase
            .auth()
            .fetchSignInMethodsForEmail(email)
            .then((signInMethods) => {
              if (signInMethods.includes("google.com")) {
                // Usuário registrado com Google, mostre a mensagem apropriada
                Swal.fire({
                  icon: "info",
                  title: "Conta registrada com Google",
                  text: "Esta conta foi registrada com o Google. Faça login com o Google.",
                });
              } else {
                // Usuário registrado com e-mail e senha, mostre a mensagem de erro padrão
                Swal.fire({
                  icon: "error",
                  title: "Ops!",
                  text: error.message,
                });
              }
            })
            .catch((fetchError) => {
              console.error(fetchError);
            });
        } else {
          // Erro padrão
          Swal.fire({
            icon: "error",
            title: "Erro de sistema!",
            text: "Ocorreu um erro no sistema, por favor tente novamente mais tarde.",
          });
        }
      });
  };

  return (
    <>
      <Header
        style={{ marginBottom: "5rem" }}
        nomee={nomee}
        emaill={emaill}
        cart={cart}
      />
      <div className="c mx-auto pb-5 body">
        <div className="row ">
          <div className="col-12  text-center pt-sm-0 pt-lg-0"></div>
          <div className="col-12  pt-sm-5 ">
            <div className="text-center">
              <h4 className="f-reg">Que bom que você vai usar o R360</h4>
              <p className="fw-light fw-400 fw-thin f-14">
                Insira o login e senha para acessar sua área do consumidor.
              </p>
            </div>
            <div className="container pb-5 my-auto form">
              <center>
                {user ? (
                  <div>
                    <p className="text-primary">
                      Você está logado como <b></b> <br />
                      <span className="text-secondary">
                        Email: {user.email}
                      </span>
                    </p>

                    <button className="btn btn-danger" onClick={handleLogout}>
                      Sair
                    </button>
                  </div>
                ) : (
                  <>
                    <div>
                      <div className=" text-start">
                        <div className="col-12">
                          <label htmlFor="" className="text-secondary f-12">
                            Email ou Telefone
                          </label>
                          <input
                            type="email"
                            className="form-control rounded-1"
                            placeholder="Digite o email"
                            value={email}
                            onChange={handleChangeEmail}
                          />
                        </div>
                        <br />
                        <div className="col-12">
                          <label htmlFor="" className="text-secondary f-12">
                            Palavra passe
                          </label>
                          <input
                            type="password"
                            className="form-control rounded-1"
                            placeholder="Digite sua palavra passe"
                            value={password}
                            onChange={handleChangePassword}
                          />
                        </div>
                        <br />
                      </div>
                    </div>

                    {/* Botão de login */}
                    <button
                      className="d-flex w-100 rounded-1 justify-content-center btn btn-primary"
                      onClick={handleLoginWithEmailAndPassword}
                    >
                      <span>Entrar</span>
                    </button>
                    <br />
                    <br />

                    <div className="google-btn" onClick={handleLoginWithGoogle}>
                      <div className="google-icon-wrapper">
                        <img
                          className="google-icon"
                          src="https://steelbluemedia.com/wp-content/uploads/2019/06/new-google-favicon-512.png"
                        />
                      </div>
                      <p className="btn-text">
                        <b>Login com google</b>
                      </p>
                    </div>
                  </>
                )}
              </center>
            </div>
            <br />
            <div className="container my-auto form">
              <center>
                <>
                  <div className="pb-2">
                    <b className="text-dark">Não tem uma conta ?</b>
                  </div>
                  <ScrollToTopLink
                    to={"/pt/cadastro"}
                    className="d-flex  w-100 btn-google btn btn-outline-primary"
                  >
                    <span>Faça seu cadastro</span>
                  </ScrollToTopLink>
                </>
              </center>
            </div>
            <br />
            {/* <div className="text-center">
              <span>
                Não tem uma conta ? <a href="/pt/cadastro">Cadastre-se</a>{" "}
              </span>
            </div> */}
          </div>
        </div>
      </div>
      {/* <Footer/> */}
    </>
  );
};

export default Login;
