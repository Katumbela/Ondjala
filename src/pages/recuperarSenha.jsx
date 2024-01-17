// ForgotPassword.jsx
import React, { useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { Alert } from "react-bootstrap";

import logo from "../imgs/iconn2.png";
import ScrollToTopLink from "../components/scrollTopLink";
import Swal from "sweetalert2";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);

  const handleForgotPassword = () => {
    setLoading(true);

    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        setResetEmailSent(true);
      })
      .catch((error) => {

        if(
            error.message == "Firebase: Error (auth/missing-email)."
        ){
            Swal.fire({
                icon: "error",
                title: "Opah!",
                text:"Por favor insira um email válido!.",
              });
        }
        else {
            Swal.fire({
                icon: "error",
                title: "Oops!",
                text:"Ocorreu um erro ao tentar enviar seu email, por favor tente novamente mais tarde!.",
              });
        }
        // alert(`Erro ao enviar email de recuperação: ${error.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="container text-center pt-5 px-4">
          <div className="text-start">
                <a href="/pt/login" className="link text-decoration-none" title="Voltar">
                  <i className="bi bi-arrow-left-short text-danger f-24"></i> Voltar
                </a>
              </div>
              <br />
<br />
        <ScrollToTopLink to={'/pt/'} >
        <img src={logo} style={{height:'10em'}} alt="" />
        </ScrollToTopLink>
        
<br /><br />
      <h1>Recuperação de Senha</h1>

      {!resetEmailSent ? (
        <>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Insira o email da conta"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            className="btn btn-danger"
            onClick={handleForgotPassword}
            disabled={loading}
          >
            {
                loading ?
                <span>

Enviando...                </span>
                :
                <span>

                Enviar Email de Recuperação
                    </span>
            }
          </button>
        </>
      ) : (
        <>
        <i className="bi bi-envelope f-30 text-success"></i>
        <Alert variant="success" className="mt-3">
          Um email de recuperação foi enviado. Verifique sua caixa de entrada para redefinir sua senha.
        </Alert>
        <ScrollToTopLink to={'/pt/login'} className="btn btn-danger">Está bem</ScrollToTopLink>
        </>
      )}
    </div>
  );
};

export default ForgotPassword;
