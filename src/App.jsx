import './App.css';
// Bootstrap CSS
// Bootstrap Bundle JS
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Rotas from './pages/rotas';
import React, {  useEffect, useState } from 'react';
import RotasPT from './pages/rotas';
// import RotasEN from './en/pages/rotasEN';
import {useHistory} from 'react-router-dom';


function App() { 

  const [cart, setCart] = useState([]);

  const [nomee, setNomee] = useState('');

  const [emaill, setEmaill] = useState('');
  const [tell, setTell] = useState('');

  const handleClick = (item) => {
    
    const existe = cart.find((x) => x.id === item.id);

    if(existe ){
      setCart(
        cart.map((x)=> x.id === item.id ? {...existe, qty: existe.qty + 1} : x)
      )
    }
    else {

      setCart([...cart, {...item, qty: 1}]);

      toast.success('Seu produto foi adicionado com sucesso!')
    
    }
  }

  const remover = (item) => {
    const existe = cart.find((x) => x.id === item.id);

    if(existe.qty === 1){
      setCart(
        cart.filter((x)=> x.id !== item.id)
      )
      console.log(cart);
    }
    else {
      setCart(
        cart.map((x)=> x.id === item.id ? {...existe, qty: existe.qty - 1} : x)
       
       )
       toast.success('Seu produto foi removido com sucesso!')
    }
  }

  const adicionar = (item) => {
    const existe = cart.find((x) => x.id === item.id);

    if(existe ){
     setCart(
      cart.map((x)=> x.id === item.id ? {...existe, qty: existe.qty + 1} : x)
     );    
     console.log(cart);
    }
    else {
      setCart([...cart, {...item, qty: 1}]);
      console.log(cart);
    }
  }

  const [language, setLanguage] = useState('');


  const redirecionarURL = () => {
    const currentPath = window.location.pathname;

    if (currentPath === '/') {
      window.location.pathname = '/pt';
    }
  };

  useEffect(() => {
    redirecionarURL();

    // Defina o idioma inicial com base na rota atual
    const currentPath = window.location.pathname;
    if (currentPath.startsWith('/en')) {
      setLanguage('en');
    } else {
      setLanguage('pt');
    }
  }, []);
 
  return (
    <React.Fragment>
      <ToastContainer />
      {/* <div className='lang'>
        <button className='bt' onClick={() => handleLanguageChange('pt')}>Português</button>
        <button clas onClick={() => handleLanguageChange('en')}>English</button>
      </div> */}

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
