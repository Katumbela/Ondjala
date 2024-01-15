import { useEffect, useState } from "react";
import "./hero.css";
import firebase from "firebase/compat/app";
import dadosEmpresas from "../../model/empresas";
import ScrollToTopLink from "../scrollTopLink";
import axios from "axios";

export default function Hero() {
  const [user, setUser] = useState(null);

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

  // useEffect(() => {
  //   const handleOverflow = () => {
  //     // Adicione a classe para ocultar a rolagem vertical do corpo
  //     document.body.style.overflowY = showSuggestions ? "hidden" : "auto";
  //   };

  //   // Adicione um ouvinte de evento quando showSuggestions muda
  //   handleOverflow();

  //   // Limpe o ouvinte de evento ao desmontar o componente
  //   return () => {
  //     document.body.style.overflowY = "auto";
  //   };
  // }, [showSuggestions]);

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
          <h2>
            <b className="f-reg text-white title">ONDJALA</b>
          </h2>
          <div className="d-flex gap-2">
            <ScrollToTopLink
              to={"/pt/login"}
              className="btn btn-sm login btn-white px-3 f-reg rounded-pill"
            >
              Login
            </ScrollToTopLink>
            <button className="btn btn-sm cadastro btn-danger px-3 rounded-pill">
              Cadastro
            </button>
          </div>
        </div>
        {/* A parte do input */}
        <div className=" container datas">
          <div className="my-auto text-center">
            <h1>
              <b className="f-reg text-white title-2">ONDJALA</b>
            </h1>
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
              <i className="bi bi-arrow-right-short "></i>
            </div>
            {showSuggestions && searchResults.length >= 1 ? (
              <div className="results pesquisa input-search bg-white p-2 text-start f-14">
                {searchResults.map((endereco, index) => (
                  <ScrollToTopLink to={`/pt/menu/${encodeURIComponent(endereco.properties.formatted)}`} key={index} className="result-item">
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
