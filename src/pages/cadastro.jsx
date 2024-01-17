import React, { useState, useEffect, useContext } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { UserContext } from "./userContext";
import { NavLink } from "react-router-dom";
import "../css/login.css";
import logo from "../imgs/icone.png";
import logo2 from "../imgs/iconn2.png";
import axios from "axios";
import Header from "../components/header";
import Footer from "../components/footer";
import ScrollToTopLink from "../components/scrollTopLink";
import { db } from "./firebase";
import Swal from "sweetalert2";

const Cadastro = ({ setNomee, setEmaill, cart, nomee, emaill }) => {
  const { handleLogin, push } = useContext(UserContext);

  document.title = `Cadastro de consumidor | Reputação 360`;
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  
  
  const handleRegister = async (userData) => {
    try {
      // Check if the email is already registered
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(
        userData.email,
        userData.password
      );

      // Send user data to Firestore if the registration is successful
      await db.collection("cliente").add({
        uid: userCredential.user.uid,
        ...userData,
      });

      console.log("User registered successfully!");

      // Show success alert
      Swal.fire({
        icon: 'success',
        title: 'Uhaa , Cadastrado!',
        text: 'Seu cadastro foi efectuado com sucesso, e você foi logado automáticamente.',
      });


      localStorage.setItem("users", JSON.stringify(userData));

      handleLogin(userData);

      window.location.href = "/pt";

      document.getElementsByTagName('name').value = ''; // Replace 'nomeCompleto' with the actual name attribute of the input field
       // Replace 'numeroBI' with the actual name attribute of the input field
      // document.getElementsByTagName('dataNascimento').value = ''; // Replace 'dataNascimento' with the actual name attribute of the input field
      document.getElementsByTagName('phone').value = ''; // Replace 'telefone' with the actual name attribute of the input field
      // document.getElementsByTagName('provincia').value = ''; // Replace 'provincia' with the actual name attribute of the input field
      document.getElementsByTagName('address').value = ''; // Replace 'cidade' with the actual name attribute of the input field
      document.getElementsByTagName('email').value = ''; // Replace 'email' with the actual name attribute of the input field
      document.getElementsByTagName('password').value = ''; // Replace 'senha' with the actual name attribute of the input field


    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        console.log("Email is already registered. Please log in.");

        // Show error alert
        Swal.fire({
          icon: 'warning',
          title: 'Opah !',
          text: 'Parece que seu email já se encontra em uso, faça login.',
        });
        document.getElementsByTagName('name').value = ''; // Replace 'nomeCompleto' with the actual name attribute of the input field
         // Replace 'numeroBI' with the actual name attribute of the input field
        // document.getElementsByTagName('dataNascimento').value = ''; // Replace 'dataNascimento' with the actual name attribute of the input field
        document.getElementsByTagName('phone').value = ''; // Replace 'telefone' with the actual name attribute of the input field
        // document.getElementsByTagName('provincia').value = ''; // Replace 'provincia' with the actual name attribute of the input field
        document.getElementsByTagName('address').value = ''; // Replace 'cidade' with the actual name attribute of the input field
        document.getElementsByTagName('email').value = ''; // Replace 'email' with the actual name attribute of the input field
        document.getElementsByTagName('password').value = ''; // Replace 'senha' with the actual name attribute of the input field
  
      } else {
        console.error(error);

        // Show generic error alert
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: 'An error occurred during registration. Please try again later.',
        });
      }
    }
  };





  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Collect form data
    const formData = {
      name: e.target.elements.name.value,
      phone: e.target.elements.phone.value,
      city: e.target.elements.address.value,
      email: e.target.elements.email.value,
      password: e.target.elements.password.value,
    };

    // Call backend to register user
    handleRegister(formData);
  };
  return (
    <>
      
      <div className=" mt-5 mx-auto body bg-white">
        <div className="container ">
          <div className="row ">
            <div className="col-12  text-center "></div>
            <div className="col-12  ">
              <div className="text-center">
              <div className="text-center mb-3 ">
                         
                         <img src={logo2} style={{height:'6.5em'}} alt="" />

                        
                        </div>
                <h2>
                  <b>Olá, crie uma conta na <b className="text-danger">Ondjala</b></b>
                </h2>
                <p className="fw-light fw-400 fw-thin f-16">
                 Garanta suas refeições com uma conta Ondjala Catering
                </p>
              </div>
              <div className="container my-auto form-c form">
                <center>
                   
                    <form onSubmit={handleFormSubmit}>
                      <div className="text-dark">
                       
                        <div className="row text-start">
                          <div className="col-12 col-lg-6 my-2">
                            <label htmlFor="" className="text-secondary f-12">
                               Nome completo
                            </label>
                            <input
                              type="text"
                              className="form-control rounded-1"
                              name="name"
                              required
                              placeholder="Digite seu nome e sobrenome"
                            />
                          </div>
                          <br />
                          <br />
                          {/* <div className="col-12 col-lg-6 my-2">
                            <label htmlFor="" className="text-secondary f-12">
                              Nascimento
                            </label>
                            <input
                            name="birthdate"
                              type="date"
                              className="form-control rounded-1"
                            />
                          </div> */}
                          {/* <br />
                          <div className="col-12 col-lg-6 my-2">
                            <label htmlFor="" className="text-secondary f-12">
                              Gênero
                            </label>
                            <select
                              name=""
                              id=""
                              className="form-control rounded-1"
                            >
                              <option value="Masculino">Masculino</option>
                              <option value="Feminino">Feminino</option>
                              <option value="Outro">Outro</option>
                            </select>
                          </div>
                          <br /> */}

                          <br />
                          <div className="col-12 my-2 col-lg-6">
                            <label htmlFor="" className="text-secondary f-12">
                               Telefone
                            </label>
                            <input
                              type="tel"
                              className="form-control rounded-1"
                              name="phone"

                              placeholder="Digite seu telefone atual"
                            />
                          </div>

                          <br />
                          {/* <div className="col-12 my-2 col-lg-6">
                            <label htmlFor="" className="text-secondary f-12">
                               Província
                            </label>
                            <input
                              type="text"
                              className="form-control rounded-1"
                              name="province"
                              placeholder="Digite sua provincia de residência"
                            />
                          </div>
                          <br /> */}
                          <div className="col-12 my-2">
                            <label htmlFor="" className="text-secondary f-12">
                               Endereço
                            </label>
                            <input
                              type="text"
                              name="address"
                              required
                              className="form-control rounded-1"
                              placeholder="Digite sua cidade atual"
                            />
                          </div>
                          <br />

                          <br />
                          <div className="titul mt-3">
                            <div className="d-flex text-danger gap-2">
                              <i className="bi bi-shield-lock-fill"></i>
                              <b>Dados de acesso</b>
                            </div>
                          </div>

                          <br />
                          <div className="col-12 my-2 col-lg-6">
                            <label htmlFor="" className="text-secondary f-12">
                               E-mail
                            </label>
                            <input
                            required
                              type="email"
                              name="email"
                              className="form-control rounded-1"
                              placeholder="Digite seu melhor email"
                            />
                          </div>

                          <div className="col-12 my-2 col-lg-6">
                            <label htmlFor="" className="text-secondary f-12">
                               Crie uma senha
                            </label>
                            <input
                              type="password"
                              required
                              name="password"
                              className="form-control rounded-1"
                              placeholder="Crie uma senha (min 8 caracteres)"
                              minLength={8}
                            />
                          </div>
                          <br />
                          <br />
                        </div>
                      </div>
                      <br />
                      <br />
                      <button className="d-flex text-white w-100  btn btn-danger rounded-pill justify-content-center rounded-1">
                        <span>Cadastrar</span>
                      </button>
                    </form>
                  
                </center>
              </div>
              <br />
              <br />
              <div className="text-center">
                <span>
                  Já possui uma conta ? <a href="/pt/login" className="link">peça sua comida</a>{" "}
                </span>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Cadastro;
