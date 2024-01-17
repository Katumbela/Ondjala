import "./App.css";
// Bootstrap CSS
// Bootstrap Bundle JS
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Rotas from "./pages/rotas";
import React, { useEffect, useState } from "react";
import RotasPT from "./pages/rotas";
import logo from "./imgs/iconn2.png";
// import RotasEN from './en/pages/rotasEN';
import { useHistory } from "react-router-dom";

function App() {
  const [cart, setCart] = useState([]);

  const [nomee, setNomee] = useState("");

  const [emaill, setEmaill] = useState("");
  const [tell, setTell] = useState("");

  const handleClick = (item) => {
    const existe = cart.find((x) => x.id === item.id);

    if (existe) {
      setCart(
        cart.map((x) =>
          x.id === item.id ? { ...existe, qty: existe.qty + 1 } : x
        )
      );
    } else {
      setCart([...cart, { ...item, qty: 1 }]);

      toast.success("Seu produto foi adicionado com sucesso!");
    }
  };

  const remover = (item) => {
    const existe = cart.find((x) => x.id === item.id);

    if (existe.qty === 1) {
      setCart(cart.filter((x) => x.id !== item.id));
      console.log(cart);
    } else {
      setCart(
        cart.map((x) =>
          x.id === item.id ? { ...existe, qty: existe.qty - 1 } : x
        )
      );
      toast.success("Seu prato foi removido com sucesso!");
    }
  };

  const adicionar = (item) => {
    const existe = cart.find((x) => x.id === item.id);

    if (existe) {
      setCart(
        cart.map((x) =>
          x.id === item.id ? { ...existe, qty: existe.qty + 1 } : x
        )
      );
      console.log(cart);
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
      console.log(cart);
    }
  };

  const [language, setLanguage] = useState("");

  const redirecionarURL = () => {
    const currentPath = window.location.pathname;

    if (currentPath === "/") {
      window.location.pathname = "/pt";
    }
  };

  useEffect(() => {
    redirecionarURL();

    // Defina o idioma inicial com base na rota atual
    const currentPath = window.location.pathname;
    if (currentPath.startsWith("/en")) {
      setLanguage("en");
    } else {
      setLanguage("pt");
    }
  }, []);

  return (
    <React.Fragment>
      <ToastContainer />
      {/* <div className='lang'>
        <button className='bt' onClick={() => handleLanguageChange('pt')}>Português</button>
        <button clas onClick={() => handleLanguageChange('en')}>English</button>
      </div> */}
      <div className="tela-gd">
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <center className="container px-sm-5 mx-auto w-75">
          <img src={logo} style={{ height: "10em" }} alt="" />
          <br />
          <h2>
            Para melhor experiência porquanto recomendamos usar um Smartphone
          </h2>
          <br />
          <span className="text-secondary">Acesse <a className="link" href="https://ondjala.vercel.app">ondjala.vercel.app</a> no seu smartphone e peça a sua comida</span>
          <br />
          
          <br /><span className="text-secondary fw-light">Estamos trabalhando para lhe dar a melhor experiência apartir do seu computador</span>
        </center>
      </div>
      <div className="tela-peq">
        <RotasPT
          emaill={emaill}
          setEmaill={setEmaill}
          nomee={nomee}
          setNomee={setNomee}
          adicionar={adicionar}
          remover={remover}
          handleClick={handleClick}
          cart={cart}
        />
      </div>
      {/* 
      {language === 'en' && window.location.pathname.startsWith('/en') && (
        <RotasEN
          emaill={emaill}
          setEmaill={setEmaill}
          nomee={nomee}
          setNomee={setNomee}
          adicionar={adicionar}
          remover={remover}
          handleClick={handleClick}
          cart={cart}
        />
      )} */}
    </React.Fragment>
  );
}

export default App;
