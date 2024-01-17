import React, { useState, useEffect, useContext } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

import { UserContext } from "./userContext";
import "../css/login.css";
import logo from "../imgs/iconn2.png";
import ScrollToTopLink from "../components/scrollTopLink";
import Swal from "sweetalert2";
import { db } from "./firebase";

const Login = ({ setNomee, setEmaill, cart, nomee, emaill }) => {
  const { handleLogin, push } = useContext(UserContext);

  document.title = `Entrar para sua conta | Reputação 360`;

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
                name: user.displayName
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
        setLoading(false);
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
        const userData = {
          nome: result.user.displayName,
          email: result.user.email,
          pictureUrl: result.user.pictureUrl,
          photo: result.user.photoURL,
          uid: result.user.uid,
          tel: result.user.phoneNumber,
        };

        localStorage.setItem("users", JSON.stringify(userData));
        setUser(userData);
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
        localStorage.removeItem("users"); // Remover dados do armazenamento local
        // window.location.href = "/pt"; // Redirecionar para a página de login
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
      {/* <Header
        style={{ marginBottom: "5rem" }}
        nomee={nomee}
        emaill={emaill}
        cart={cart}
      /> */}
      <div className=" mx-auto pb-5 body">
        <div className="row ">
          <div className="col-12  text-center pt-sm-0 pt-lg-0"></div>
          <div className="col-12 ">
            <div className="text-center">
            </div>
            <div className="container pb-5 my-auto form">
              <div className="text-start">
                <a href="/pt/" title="Voltar"><i className="bi bi-arrow-left text-danger f-24"></i></a>
              </div>
              <center>
                
                <img src={logo} style={{height:'7em'}} alt="" />
                <br />
                <br />
                {user ? (
                  <div>
                    <p className="text-danger">
                      Você está logado como <b></b> <br />
                      <span className="text-secondary">
                         {user.nome ? user.nome.split(' ')[0] :  user.nome?.split(' ')[0]}
                      {user.name}
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
                      className="d-flex  rounded-1 justify-content-center btn btn-danger"
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
            <div className="pb-2 text-center">
                    <b className="text-dark">Não tem uma conta ? <a href="/pt/cadastro" className="link">Crie uma conta</a></b>
                  </div>
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
