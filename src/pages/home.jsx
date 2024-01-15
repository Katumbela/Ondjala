import '../App.css';
// Bootstrap CSS
import { Modal, Button } from 'react-bootstrap';
// Bootstrap Bundle JS
import logo from '../imgs/icone.png';
import Header from '../components/header';
import CookieConsent from 'react-cookie-consent';
import { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from './userContext';
import firebase from 'firebase/compat/app';
import { db } from './firebase';
import Hero from '../components/hero/hero';
import Body from '../components/body/body';
import Footer from '../components/footer';
import axios from 'axios';


const Home = ({ cart, nomee, emaill }) => {

  const { user, handleLogout } = useContext(UserContext);
  document.title = `Pagina Inicial | Ondjala Cathering Service`;

  useEffect(() => {
    // Adicione um listener para o estado da autenticação
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        // Se não houver usuário autenticado, redirecione para a página de login

        const userData = {
          name: '',
          email: '',
          pictureUrl: '',
          tel: '',
          uid: '',
        }

        localStorage.setItem('users', JSON.stringify(userData));

      }

    });


    // Retorne uma função de limpeza para remover o listener quando o componente for desmontado
    return unsubscribe;
  }, []);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      setShowModal(true);
      localStorage.setItem('hasVisited', true);
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
      const snapshot = await db.collection('players').where('pontos', '>', 15).orderBy('pontos', 'desc').limit(3).get();
      const playerData = snapshot.docs.map((doc) => doc.data());
      setPlayers(playerData);
    } catch (error) {
      console.error('Erro ao buscar os jogadores:', error);
    }
  };




  const [use, setUser] = useState([]);

  useEffect(() => {
    // Obtém o valor de 'users' do local storage quando o componente for montado
    const userString = localStorage.getItem('users');
    if (userString) {
      const user = JSON.parse(userString);
      setUser(user);
    }
    else {
      const userData = {
        name: '',
        email: '',
        pictureUrl: '',
        tel: '',
      }
      setUser(userData);
    }
  }, []);


  const [backgroundImage, setBackgroundImage] = useState(0);
  const images = ['a1.jpg', 'a7.jpg', 'a3.jpg'];

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
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'brightness(35%)',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '70vh',
  };

  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);


  return (
    <div className="w-100">

{/*  */}
      <Hero/>
      {/* < Header style={{ marginBottom: '5rem' }} nomee={nomee} emaill={emaill} cart={cart} /> */}
      <Body />


      <Footer />
    </div>
  );
}

export default Home;
