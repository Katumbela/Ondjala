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
import mini2 from "../imgs/sopa.png";
import mini3 from "../imgs/cou.png";
import mini4 from "../imgs/fries.png";

import dadosEmpresas from "../model/empresas";
import firebase from "firebase/compat/app";
import pratos from "../model/pratos";
import AbreviarTexto from "../components/abreviartexto/abreviarTexto";
import ScrollToTopLink from "../components/scrollTopLink";

const Menu = ({ emaill, nomee, cart, add, remove }) => {
  document.title = "Menú do dia | Ondjala";

  const { endereco } = useParams();
  const [nomeCompleto, setNC] = useState("");
  const [telefone, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMsg] = useState("");
  const [load, setLoad] = useState(false);

  const [user, setUser] = useState(null);

  const salvar = () => {
    setLoad(true);
    db.collection("mensagens")
      .add({
        nomeCompleto: nomeCompleto,
        telefone: telefone,
        email: email,
        mensagem: mensagem,
        dataEnvio: new Date(),
      })
      .then(() => {
        setEmail("");
        setTel("");
        setNC("");
        setMsg("");
        setLoad(false);
        toast.success("Recebemos a sua mensagem com sucesso!");
      })
      .catch((error) => {
        setLoad(false);
        toast.error("Erro ao enviar mensagem:");
      });
  };

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
    <>

<ToastContainer />
      <Header2
        endereco={endereco}
        add={add}
        remove={remove}
        cart={cart}
        emaill={emaill}
      />
      <div className="container">
        <ScrollToTopLink to={'/pt/buscar-prato/'+endereco} className={'text-decoration-none'}>
          
        <div className="input-search2 rounded-pill d-flex pesquisa2">
          <i className="bi bi-search"></i>
          <span className="text- mx-3" style={{color: '#A0A0A0'}}>Pesquise seu prato</span>
          {/* <input disabled
            type="text"
            name=""
            placeholder="Pesquise o seu prato"
            id=""
            value={searchTerm}
            onChange={handleInputChange}
            onClick={handleInputClick}
          /> */}
        </div>
        </ScrollToTopLink>
      </div>

      <br />

      <div className="container">
        <div className="d-flex gap-2">
          <i className="bi bi-filter"></i>{" "}
          <span className="f-12 text-secondary">Filtre por categoria </span>
        </div>
        <div className="d-flex justify-content-start minis gap-2">
          <img src={mini1} alt="" />
          <img src={mini2} alt="" />
          <img src={mini3} alt="" />
          <img src={mini4} alt="" />
        </div>
      </div>
      <div className="container">
        <br />
        <br />
        <h1>Pratos do dia</h1>
      </div>

      <div className="container">
        {pratos.map((prato) => (
          <div key={prato.id} className="prato justify-content-between d-flex my-3">
            <div className="desc-prato">
              <h2 className="f-20">
                <b>{prato.nome}</b>
              </h2>
              <p className="text-secondary f-12 desc">
                <AbreviarTexto texto={prato.descricao} largura={190} />
                
              </p>
              <b className="preco mt-">{formatarQuantia(prato.preco)} </b>
            </div>
            <div className="img">
                <img src={prato.imagem} className="my-auto" alt="" />
                <button onClick={() => add(prato)} className="btn btn-danger rounded-pill">
                    Add <i className="bi bi-plus"></i>
                </button>
            </div>
          </div>
        ))}
      </div>
      <br />
      <br />

      <Footer />
    </>
  );
};

export default Menu;
