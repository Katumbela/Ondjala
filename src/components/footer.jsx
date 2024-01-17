import React, { useState } from "react";
import "../css/footer.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db } from "../pages/firebase";
import Swal from "sweetalert";

function Footer() {
  const [email, setEmail] = useState("");
  const [load, setLoad] = useState(false);

  const alert = (t) => {
    Swal.fire({
      title: "NewsLetter",
      text: t,
      icon: "success",
      confirmButtonText: "Ok",
    });
  };

  const NewsLetter = () => {
    setLoad(true);
    db.collection("newsletter")
      .add({
        email: email,
        dataEnvio: new Date(),
      })
      .then(() => {
        setEmail("");
        setLoad(false);
        toast.success(
          "Seu email foi adicionado a nossa newsletter com sucesso, obrigado!"
        );
        //   sendEmail(email, "NewsLetter Arotec", "Adicionado com sucesso!")
      })
      .catch((error) => {
        setLoad(false);
        toast.error("Erro ao enviar mensagem:" + error);
      });
  };

  return (
    <>
      <div className="bg-dark copyright py-3 ">
        <div className="container">
          <div className="text-center">
            <div className="d-flex icones flex-wrap justify-content-center gap-3">
              <i className="bi bi-facebook"></i>
              <i className="bi bi-twitter"></i>
              <i className="bi bi-instagram"></i>
            </div>
          </div>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            <a href="#" className="footer-link">
              Termos de serviços
            </a>
            &middot;
            <a href="#" className="footer-link">
              Privacidade
            </a>
            &middot;
            <a href="#" className="footer-link">
              Endereços de entregas
            </a>
          </div>
          <center className="mt-2 copy">
            &copy; 2024 &middot; ONDJALA Catering
          </center>
          <br />
          <br />
          <br />
        </div>
      </div>
    </>
  );
}

export default Footer;
