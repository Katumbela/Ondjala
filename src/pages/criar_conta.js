import React, { useState, useEffect, useContext } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import { useHistory } from 'react-router-dom';
import { UserContext } from './userContext';




import { NavLink } from 'react-router-dom';
import '../css/login.css';
import logo from '../imgs/logo.png'
import logo2 from '../imgs/icone.png'
import axios from 'axios';


const Login = ({setNomee, setEmaill}) => {

    const { handleLogin, push } = useContext(UserContext);


    const [user, setUser] = useState(null);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            setUser(user);
        });
    }, []);

    const handleLoginWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider)
            .then((result) => {
                // login bem-sucedido, faça algo aqui
                setUser(result.user);
                
                setEmaill(result.user.email)


                const userData = {
                    name: result.user.displayName,
                    email: result.user.email,
                    pictureUrl: result.user.photoURL,
                    tel: result.user.phoneNumber,
                  }

                localStorage.setItem('users', JSON.stringify(userData));
                setNomee(result.user.displayName)
                handleLogin(result)
                window.location.href = '/';
            
            })
            .catch((error) => {
                // erro no login, faça algo aqui
            });
    };


    const handleLogout = () => {
        firebase.auth().signOut()
            .then(() => {
                setUser(null);

                localStorage.removeItem('users'); // Remove o item userData do localStorage
                setEmaill('')
                setNomee('')
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="c body">
            <div className="row w-100">
                <div className="col-12 autoo col-md-6 col-xl-6 col-xxl-6 luanda">
                    <div className="">
                        <img src={logo} style={{ height: '3em' }} alt="Logo Arotec" /> <br />
                        <span className="text-white">Angola Robotica e Tecnologia</span>
                    </div>
                </div>
                <div className="col-12 col-md-6 autoo col-xl-6 col-xxl-6 ">
                    <div className="container my-auto form">
                        <center> <img src={logo2} style={{ height: '1.5em' }} alt="Logo Arotec" /></center>

                        <br />
                        <center>
                            <b> Crie uma conta com Google</b>
                            <br />
                            <br />   {user ? (
                                <div>
                                    <p className='text-primary'>Você já está cadastrado como {user.displayName}</p>

                                    <button className='btn btn-danger' onClick={handleLogout}>Sair</button>
                                </div>
                            ) : (
                                <button className='d-flex btn-google btn btn-outline-primary' onClick={handleLoginWithGoogle}>
                                    <i className="bi bi-google text- me-2"> </i><span>Cadastrar com o Google</span>
                                </button>
                            )}

                        </center>

                    </div>

                </div>
                <br />
<center>

<NavLink className={'btn btn-outline-secondary'} to={'/pt'} >Pagina Inicial <i className="bi bi-house"></i></NavLink>
</center>
            </div>
        </div>
    )
}

export default Login;