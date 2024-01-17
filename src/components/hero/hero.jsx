import { useEffect, useState } from "react";
import "./hero.css";
import firebase from "firebase/compat/app";
import dadosEmpresas from "../../model/empresas";
import ScrollToTopLink from "../scrollTopLink";
import axios from "axios";
import logo2 from "../../imgs/iconn2.png";
import { db } from "../../pages/firebase";

export default function Hero() {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

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
        // setLoading(false);
      });

      return () => unsubscribe();
    }
  }, []);

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

  const [searchTerm, setSearchTerm] = useState("");

  const [searchResults, setSearchResults] = useState([]);

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

  const handleInputChange = async (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    try {
      const response = await axios.get(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${searchTerm}&apiKey=5f2e4eae5b4040d78f664d728ba9b2dd`
      );

      console.log(response.data);

      // Atualizar os resultados da pesquisa
      setSearchResults(response.data.features);

      // Exibir as sugestões
      setShowSuggestions(true);
    } catch (error) {
      console.error("Erro ao buscar sugestões de autocomplete:", error);
    }
  };

  return (
    <>
      <div className="hero">
        <div className="py-3 d-flex container justify-content-between text-center">
          <div></div>
          {user != null ? (
            <>
            <div className="d-flex gap-2 logged">
                
                <ScrollToTopLink
                  to={"/pt/cadastro"}
                  className="btn btn-sm login btn-white px-3 py- rounded-pill"
                >
                <i className="bi bi-person-circle me-1"></i>  {user.nome}
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
        {/* A parte do input */}

        <div className=" container datas">
          <div className="my-auto text-center">
            <div className="logo-div mx-auto">
              <img style={{ height: "8em" }} src={logo2} alt="" />
            </div>

            <h3 className="text-white f-reg">
              <b>Peça a comida que lhe apetece agora</b>
            </h3>

            <div className="input-search rounded-pill d-flex pesquisa">
              <i className="bi bi-search"></i>
              <input
                type="text"
                name=""
                placeholder="Endereço de entrega"
                id=""
                value={searchTerm}
                onChange={handleInputChange}
                onClick={handleInputClick}
              />
              <ScrollToTopLink to={'/pt/menu/'+searchTerm}>
              <i className="bi bi-arrow-right-short "></i>
              </ScrollToTopLink>
            </div>
            {showSuggestions && searchResults.length >= 1 ? (
              <div className="results pesquisa res-p text-start input-search bg-white py-2 px-3 f-14 ">
                {searchResults.map((endereco, index) => (
                  <ScrollToTopLink
                    to={`/pt/menu/${encodeURIComponent(
                      endereco.properties.formatted
                    )}`}
                    key={index}
                    className="result-item link text-decoration-none text-start"
                  >
                    <p>{endereco.properties.formatted}</p>
                    {/* Adicione qualquer outra informação que você deseje exibir */}
                  </ScrollToTopLink>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
