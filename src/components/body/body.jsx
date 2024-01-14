import i1 from "../../imgs/icon-m.png";
import i2 from "../../imgs/icon-market.png";
import i3 from "../../imgs/icon-p.png";
import bg1 from "../../imgs/bg1.png";
import bg2 from "../../imgs/bg2.png";
import bgM from "../../imgs/bg-motoboy.png";
import "./body.css";

export default function Body() {
  return (
    <>
      <div className=" mt-5 ">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-4 my-4 px-3 px-md-0">
              <div className="cc text-center">
                <img src={i1} alt="" />
                <h2>
                  <b>Torne-se um Ondjaler</b>
                </h2>
                <p className="f-light">
                  Como Ondjaler de entrega, voce ganhá dinheiro a qualquer hora
                </p>
                <a href="/know-more" className="link">
                  Saiba mais <i className="bi bi-arrow-right-short"></i>
                </a>
              </div>
            </div>
            <div className="col-12 col-md-4 my-4 px-3 px-md-0">
              <div className="cc text-center">
                <img src={i2} alt="" />
                <h2>
                  <b>Encomende de onde estiver</b>
                </h2>
                <p className="f-light">
                  Peça uma refeição de onde quiser que a Ondjala o faz chegar
                  até si
                </p>
                <a href="/know-more" className="link">
                  Saiba mais <i className="bi bi-arrow-right-short"></i>
                </a>
              </div>
            </div>
            <div className="col-12 col-md-4 my-4 px-3 px-md-0">
              <div className="cc text-center">
                <img src={i3} alt="" />
                <h2>
                  <b>Obtenha a melhor experiência do Ondjala</b>
                </h2>
                <p className="f-light">
                  Faça o maior proveito do Ondjala para obter suas refeicoes e
                  blabla
                </p>
                <a href="/know-more" className="link">
                  Saiba mais <i className="bi bi-arrow-right-short"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <div className="banners py-3 container">
        <div className="row row-reverse">
          <div className="col-12 my-2 col-md-6">
            <h1>
              <b>Tudo o que você deseja, é entregue.</b>
            </h1>
            <p className="f-light">
              Receba uma fatia de pizza ou a torta inteira, ou compre house lo
              mein no Ondjala que você está querendo experimentar.
            </p>

            <button className="btn btn-danger btn-sm rounded-pill">
              Encomendar agora <i className="bi bi-arrow-right-short"></i>
            </button>
          </div>
          <div className="col-12 my-2 col-md-6">
            <img src={bg1} className="w-100 h-100" alt="" />
          </div>
        </div>
        <br />
        <br />
        <div className="row row-reverse">
          <div className="col-12 my-2 col-md-6">
            <h1>
              <b>
                Planos de assinatura <b className="text-danger">Ondjala</b>
              </b>
            </h1>
            <p className="f-light">
              Assine planos semanais ou mensais e fique descansado quando o caso
              for refeicao que a Ondjala cuida disto para si, fique descansado
              com os nossos planos para sí
            </p>

            <button className="btn btn-danger btn-sm rounded-pill">
              Assine agora <i className="bi bi-arrow-right-short"></i>
            </button>
          </div>
          <div className="col-12 my-2 col-md-6">
            <img src={bg2} className="w-100 h-100" alt="" />
          </div>
        </div>

        <br />
        <br />
      </div>
      <div className=" text-center bannn py-5">
        <div className="my-3">
          <h1>ONDJALA, O MELHOR DA BANDA</h1>
          <p className="text-white">
            Entrega de compras, exatamente como você deseja. Compre em casa e
            encha seu carrinho com produtos frescos, entradas congeladas,
            delícias deliciosas e muito mais. Comprar mantimentos
          </p>
          <br />

          <button className="btn btn-danger btn-sm rounded-pill">
            Encomende agora <i className="bi bi-arrow-right-short"></i>
          </button>
        </div>
      </div>
      <br />
      <br />

<div className="text-center mx-auto w-75">
    <h1><b>Oportunidade de desbloqueio para <b className="text-danger">Ondjalers</b> e empresas</b></h1>
</div>

<br />\

























































<br />

      <div className="banners py-3 container">
      <div className="row row-reverse">
          <div className="col-12 my-2 col-md-6">
            <h1>
              <b>
              Inscreva-se para correr e receber o pagamento
              </b>
            </h1>
            <p className="f-light">
            Faça entregas com o aplicativo de comida e bebida nº 1 em Angola, defina sua própria programação e comece a ganhar dinheiro a qualquer hora e em qualquer lugar.
            </p>

            <button className="btn btn-danger btn-sm rounded-pill">
              Torne se um Ondjaler <i className="bi bi-arrow-right-short"></i>
            </button>
          </div>
          <div className="col-12 my-2 col-md-6">
            <img src={bgM} className="w-100 h-100" alt="" />
          </div>
        </div>

      </div>
    </>
  );
}
