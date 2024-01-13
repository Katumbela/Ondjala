import React, { useContext, useEffect, useState } from "react";
import logo from "../imgs/logo-d.png";
import cart from "../imgs/carrinho.png";
import iconn from "../imgs/iconn.png";
import logosm from "../imgs/logo-sm.png";
import "../css/header.css";
import { NavLink } from "react-router-dom";
import firebase from "firebase/compat/app";
// import AbreviarTexto from "./abreviarTexto";

import bom from "../imgs/bom.png";
import notFound from "../imgs/not-found.png";
import mau from "../imgs/mau.png";
import arreiou from "../imgs/arreiou.jpeg";
import bomm from "../imgs/bomm.webp";
import maxi from "../imgs/maxi.png";
import naorecomendado from "../imgs/naorecomendado.webp";
import otimo from "../imgs/otimo.webp";
import xyami from "../imgs/xyami.jpeg";
import shoprite from "../imgs/shoprite.jpeg";
import unitel from "../imgs/unitel.png";
import r360 from "../imgs/r360.png";
import ruim from "../imgs/ruim.webp";
import icon from "../imgs/icon.png";
import desconto from "../imgs/descontos.webp";
import desc from "../imgs/desc.png";
import blog from "../imgs/blog.png";
import b1 from "../imgs/blog/1.png";
import b2 from "../imgs/blog/2.png";
import b3 from "../imgs/blog/3.png";
import b4 from "../imgs/blog/4.png";
import regular from "../imgs/regular.png";
import africa from "../imgs/africa.png";
import ScrollToTopLink from "./scrollTopLink";
import dadosEmpresas from "../model/empresas";
import { db } from "../pages/firebase";
const Header = (props) => {
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

  const { nomee, emaill, cart } = props;

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
    // <div className={`navbar ${visible ? 'navbar-show' : 'navbar-hide'}`}>

    <div className={` ${showSuggestions === true ? "nav-fixo" : ""}`}>
      <div
        onClick={handleBlur}
        className={` ${showSuggestions === true ? "backdrop" : ""}`}
      ></div>
      <div className={`nav bg-white py-2`}>
        <div className="d-flex container-lg container-fluid justify-content-between">
          <div className="logo">
            <NavLink to="/pt">
              <img src={iconn} alt="" className="logo-md" />
            </NavLink>
          </div>{" "}
          <div className="pesquisa pesquisa-md">
            <NavLink to="/pt">
              <img src={logosm} alt="" className="logo-sm" />
            </NavLink>
            <input
              type="text"
              name=""
              placeholder="Busque por nome, NIF ou site"
              id=""
              value={searchTerm}
              onChange={handleInputChange}
              onClick={handleInputClick}
            />
            <i className="bi bi-search"></i>
          </div>
          <div className="item-menu menu-md">
            <ul>
              <li>
                {user ? (
                  <span className="btn d-flex gap-2">
                    {" "}
                    <i className="bi tex-success bi-person-circle"></i>{" "}
                    {/* <AbreviarTexto
                      className="text-success f-reg"
                      texto={user.name}
                      largura={100}
                    />{" "} */}
                  </span>
                ) : (
                  <NavLink className={"btn btn-outline-success"} to="/pt/login">
                    {" "}
                    Entrar
                  </NavLink>
                )}
              </li>

              {user ? (
                <li>
                  <NavLink
                    onClick={handleLogout}
                    className={"my-auto btn btn-outline-danger"}
                  >
                    Sair
                  </NavLink>
                </li>
              ) : (
                <li>
                  <NavLink className={"btn btn-success"} to="/pt/cadastro">
                    {" "}
                    Cadastro
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
      <div className="menu-sm d-flex justify-content-between overflow-x-auto">
        {user ? (
          <span className="btn text-success f-reg d-flex gap-2">
            {" "}
            {/* <i className="bi tex-success bi-person-circle"></i>{" "} */}
            {/* <AbreviarTexto
              className="text-success f-reg"
              texto={user.name}
              largura={100}
            />{" "} */}
          </span>
        ) : (
          <ScrollToTopLink to={"/pt/login"}>Entrar</ScrollToTopLink>
        )}

        <ScrollToTopLink to={"/pt/cadastro"}>Cadastro</ScrollToTopLink>

        <ScrollToTopLink to={"/pt/empresa/produtos"}>
          <span className="premio-md">Produtos</span>
        </ScrollToTopLink>

        <ScrollToTopLink to={"/pt/reclamar"}>
          <button className="btn rec btn-sm btn-danger">
            <i className="bi bi-megaphone me-1"></i> Reclamar
          </button>
        </ScrollToTopLink>
      </div>
      {showSuggestions && (
        <div className="suggestions container-fluid py-sm-3">
          <br />
          <h5 className="f-reg">
            {showSuggestions ? (
              searchTerm !== "" ? (
                <></>
              ) : (
                <>
                  <b>As empresas mais buscadas do R360 nas últimas 24h</b>
                  <br />
                  <br />
                </>
              )
            ) : null}
          </h5>
          {(searchResults !== "") & (searchTerm !== "") ? (
            <>
              Resultados para: <b className="f-reg">{searchTerm}</b>
              <br />
              <br />
            </>
          ) : null}
          <div className="listas-lojas mb-3  d-flex gap-3 overflow-x-auto listas-descontos">
            {searchResults != "" ? (
              searchResults.map((empresa) => (
                <a
                  onClick={handleBlur}
                  key={empresa.id}
                  href={`/pt/empresa/${empresa.id}`}
                  className="card-loja text-decoration-none text-dark text-center rounded-1 border-lightt p-3 shadow-sm"
                >
                  <img src={empresa.logo} alt="" className="logo-empresa" />
                  <div className="bod">
                    {/* <AbreviarTexto texto={empresa.nome} largura={"200"} /> */}

                    <p className="d-flex justify-content-center mt-1 my-auto gap-2 f-12">
                      {/* <AbreviarTexto
                        texto={empresa.localizacao}
                        largura={"300"}
                        className="my-auto text-secondary"
                      ></AbreviarTexto> */}
                    </p>
                    <hr />

                    <div className="d-flex gap-2 justify-content-center">
                      {empresa.avaliacao >= 5.0 && empresa.avaliacao <= 6.9 ? (
                        <img src={regular} alt="" className="icon-empresa" />
                      ) : empresa.avaliacao >= 7.0 &&
                        empresa.avaliacao <= 10.0 ? (
                        <img src={otimo} alt="" className="icon-empresa" />
                      ) : empresa.avaliacao >= 3.0 &&
                        empresa.avaliacao <= 4.9 ? (
                        <img src={ruim} alt="" className="icon-empresa" />
                      ) : empresa.avaliacao <= 2.9 ? (
                        <img
                          src={naorecomendado}
                          alt=""
                          className="icon-empresa"
                        />
                      ) : null}
                      <h4 className="f-reg my-auto">
                        <b>{empresa.avaliacao} </b>
                      </h4>
                      <span className="text-secondary f-12 mt-auto">/ 10</span>
                    </div>
                  </div>
                </a>
              ))
            ) : showSuggestions ? (
              searchTerm !== "" ? (
                <p className="text-center py-3 w-100 mx-auto f-14">
                  <img src={notFound} style={{ height: "8em" }} alt="" />
                  <p>
                    {" "}
                    Nenhum resultado encontrado, parece que esta empresa ainda
                    não está cadastrado.{" "}
                    <a href="/pt/solicitar-cadastro">
                      Solicite o cadastro
                    </a>{" "}
                    desta empresa
                  </p>
                </p>
              ) : (
                dadosEmpresas.slice(0, 8).map((empresa) => (
                  <a
                    onClick={handleBlur}
                    key={empresa.id}
                    href={`/pt/empresa/${empresa.id}`}
                    className="card-loja text-decoration-none text-dark text-center rounded-1 border-lightt p-3 shadow-sm"
                  >
                    <img src={empresa.logo} alt="" className="logo-empresa" />
                    <div className="bod">
                      {/* <AbreviarTexto texto={empresa.nome} largura={"200"} /> */}

                      <p className="d-flex justify-content-center mt-1 my-auto gap-2 f-12">
                        {/* <AbreviarTexto
                          texto={empresa.localizacao}
                          largura={"300"}
                          className="my-auto text-secondary"
                        ></AbreviarTexto> */}
                      </p>
                      <hr />

                      <div className="d-flex gap-2 justify-content-center">
                        {empresa.avaliacao >= 5.0 &&
                        empresa.avaliacao <= 6.9 ? (
                          <img src={regular} alt="" className="icon-empresa" />
                        ) : empresa.avaliacao >= 7.0 &&
                          empresa.avaliacao <= 10.0 ? (
                          <img src={otimo} alt="" className="icon-empresa" />
                        ) : empresa.avaliacao >= 3.0 &&
                          empresa.avaliacao <= 4.9 ? (
                          <img src={ruim} alt="" className="icon-empresa" />
                        ) : empresa.avaliacao <= 2.9 ? (
                          <img
                            src={naorecomendado}
                            alt=""
                            className="icon-empresa"
                          />
                        ) : null}
                        <h4 className="f-reg my-auto">
                          <b>{empresa.avaliacao} </b>
                        </h4>
                        <span className="text-secondary f-12 mt-auto">
                          / 10
                        </span>
                      </div>
                    </div>
                  </a>
                ))
              )
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
