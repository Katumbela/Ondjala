import { useEffect, useState } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import { NavLink, useParams } from "react-router-dom";
import Header2 from "../components/header2/header2";
import ScrollToTopLink from "../components/scrollTopLink";

const Carrinho = (props) => {
  const [preco, setPreco] = useState(0);
  const { cart, emaill, add, remove } = props;
  let qnt = 0;

  document.title = "Seu carrinho de comida | Ondjala Catering Service";

  cart.forEach((item) => (qnt += item.qty));

  useEffect(() => {
    const calculateTotalPrice = () => {
      let total = 0;
      cart.forEach((item) => {
        const numericPrice = parseFloat(item.preco.replace(",", "."));
        total += numericPrice * item.qty;
      });
      setPreco(total);
    };

    calculateTotalPrice();
  }, [cart]);

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
    const partes = valorEmReais.toFixed(2).toString().split(".");
    const inteiro = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const decimal = partes[1];

    return `${inteiro} ${decimal} Kz`;
  }

  const { ende } = useParams();
  const [editando, setEditando] = useState(false);
  const [novoEndereco, setNovoEndereco] = useState(ende); // Substitua pelo seu estado de endereço atual

  const handleEditar = () => {
    setEditando(true);
  };


  const pagar = () => {
  alert('Funcao em falta');
  };

  const handleSalvar = () => {
    // Aqui você pode adicionar a lógica para salvar o novo endereço no estado ou no seu backend
    // Por exemplo, você pode chamar uma função de API ou atualizar o estado local
    console.log("Novo endereço:", novoEndereco);

    // Após salvar, desative o modo de edição
    setEditando(false);
  };

  const handleChange = (e) => {
    setNovoEndereco(e.target.value);
  };
  return (
    <div className="bg-white">
      <Header2
        endereco={"Luanda, Angola"}
        add={add}
        remove={remove}
        cart={cart}
        emaill={emaill}
      />
      <div className="container mt-4">
        {cart.length !== 0 && (
          <>
            <center>
              <h2 className="text-danger">Confira</h2>
              <div className="linha mx-auto"></div>
            </center>
            <div className="bg-light rounded-2 p-4 my-3">
              <div>
                <h6 className="">
                  <h3 className="me- text-dark ">Detalhe de entrega </h3> <br />
                  <div className="d-flex gap-1">
                    <i className="bi my-auto bi-geo"></i>
                    {editando ? (
                      <>
                        <input
                          type="text"
                          className="form-control w-100"
                          value={novoEndereco}
                          onChange={handleChange}
                        />
                        <i
                          title="salvar"
                          className="bi my-auto bi-check2 mx-2 text-success"
                          onClick={handleSalvar}
                          style={{ cursor: "pointer" }}
                        ></i>
                      </>
                    ) : (
                      <>
                        {novoEndereco}
                        <i
                          title="editar"
                          className="bi bi-pencil my-auto mx-2"
                          onClick={handleEditar}
                          style={{ cursor: "pointer" }}
                        ></i>
                      </>
                    )}
                  </div>
                  <br />
                  <span className="text-secondary f-12">
                    Edite se necessário
                  </span>
                </h6>
              </div>
            </div>
            <div className="d-flex px-4 justify-content-between">
              <h6 className="f-14 my-auto">Seu carrinho está pronto</h6>
              <ScrollToTopLink
                to={"/pt/menu/" + ende}
                className="f-14 my-auto text-decoration-none text-secondary"
              >
                <i className="bi mx-1 bi-backspace"></i> Retornar
              </ScrollToTopLink>
            </div>
          </>
        )}
        <center>
          {cart.length == 0 && (
            <div className="container">
                <br />
                <br />
                <center>
                    <i className="bi bi-cart3 f-24"></i>
                </center>
              <span className="text-secondary">
                Sua cesta está vazia, informe nos o endereço de entrega
              </span>{" "}
              <br />
              <NavLink to={"/pt/menu/"+ende}>
                <button className="btn-outline-danger btn-sm mt-2 f-14 btn">
                  escolha o seu prato <i className="bi bi-cart"></i>
                </button>
              </NavLink>
            </div>
          )}
        </center>

        <article className="px-4">
          {cart.map((item) => (
            <div className="" key={item.id}>
              <div
                className="d-flex "
                style={{ borderBottom: "1px solid #d9d9d9", height: "8em" }}
              >
                <div className="im my-auto">
                  <img style={{ height: "4em" }} src={item.imagem} alt="" />
                </div>
                <div className="my-auto w-100 ms-3">
                  <h5>{item.nome}</h5>
                  <div className="d-flex w-100 justify-content-between">
                    <p className="mt-auto f-14">
                       {formatarQuantia(item.preco)}{" "}
                    </p>
                    <button
                      className="btn d-flex f-12 btn-outline-danger"
                      style={{
                        height: "2em",
                        lineHeight: "0",
                        fontSize: "12px",
                      }}
                    >
                      <span onClick={() => remove(item)} className="my-auto">
                        -
                      </span>
                      <span className="my-auto mx-2">{item.qty}</span>
                      <span onClick={() => add(item)} className="my-auto">
                        +
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {cart.length !== 0 && (
            <>
             
              <br />

              <div className="bg-light rounded-2 p-4 my-3">
                <div className="d-flex my-2 justify-content-between">
                  <h6 className="text-secondary">Valor do carrinho:</h6>
                  <h6>
                    {" "}
                    <b>{formatarQuantia(preco)}</b>
                  </h6>
                </div>
                <div className="d-flex my-2 justify-content-between">
                  <h6 className="text-secondary">Taxa de entrega:</h6>
                  <h6>
                    {" "}
                    <b>{formatarQuantia(145000)}</b>
                  </h6>
                </div>
                <div className="d-flex my-2 justify-content-between">
                  <h6 className="text-secondary">
                    Imposto <i className="bi f-14 bi-exclamation-circle"></i>{" "}
                  </h6>
                  <h6>
                    {" "}
                    <b>{formatarQuantia("00000")}</b>
                  </h6>
                </div>
              </div>
            </>
          )}
        </article>
      </div>
      {cart.length !== 0 && (
        <>
          <br />
          <div className="px-4 py-1">
            <div className="d-flex my-2 justify-content-between">
              <h6 className="text-secondary">
                TOTAL {" "}
              </h6>
              <h6>
                {" "}
                <b>{formatarQuantia(preco + 145000)}</b>
              </h6>
            </div>
          </div>
          <br />
          <div className="px-4 pb-1">
            <div className="d-flex bg-light rounded-2 p-2 my-2 gap-2 justify-content-between">
              <i className="bi bi-chat-left-dots my-auto "></i>
              <textarea
                name=""
                style={{ border: "0" }}
                id=""
                className="w-100 bg-light form-control"
                placeholder="Observações do pedido"
                rows="2"
              ></textarea>
            </div>
          </div>
          <br />

          <div className="col-12 my-auto px-4 col-md-12 text-end">
            <button  onClick={() => pagar()} className="btn w-sm-100 mt-3 mt-md-0 btn-danger">
              Proceder ao pagamento
            </button>
          </div>
        </>
      )}

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      {/* <Footer /> */}
    </div>
  );
};
export default Carrinho;
