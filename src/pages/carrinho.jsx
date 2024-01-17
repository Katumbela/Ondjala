import { useEffect, useState } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import { NavLink, useParams } from "react-router-dom";
import Header2 from "../components/header2/header2";

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
        <h1 className="text-danger">Sua encomenda</h1>
        <hr />

        <center>
          {cart.length == 0 && (
            <div className="container">
              <span className="text-secondary">
                Sua cesta está vazia, informe nos o endereço de entrega
              </span>{" "}
              <br />
              <NavLink to={"/pt"}>
                <button className="btn-outline-danger btn-sm mt-2 f-14 btn">
                  escolha o seu prato <i className="bi bi-cart"></i>
                </button>
              </NavLink>
            </div>
          )}
        </center>
        <article>
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
                  <h3>{item.nome}</h3>
                  <div className="d-flex w-100 justify-content-between">
                    <p className="mt-auto">
                      Preço: {formatarQuantia(item.preco)}{" "}
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

          <br />

          {cart.length !== 0 && (
            <div className="row">
              <div className="col-12  col-md-8">
                <h6 className="f-14">Compra de {qnt} pratos</h6>
                <div>
                  <h6 className="d-flex flex-wrap gap-2">
                    <span className="me- text-danger ">Endereço: </span>
                    <div className="d-flex gap-1">
                      {editando ? (
                        <>
                          <input
                            type="text"
                            className="w-100"
                            value={novoEndereco}
                            onChange={handleChange}
                          />
                          <i
                            title="salvar"
                            className="bi bi-check2 mx-2 text-success"
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
                  </h6>
                </div>
                <h6>
                  <b className="text-danger">Entrega:</b> 1450 Kz
                </h6>
                <h4>
                  <b className="text-danger">Total:</b>{" "}
                  {formatarQuantia(preco + 1450)}{" "}
                </h4>
              </div>
              <div className="col-12 my-auto col-md-12 text-end">
                <button className="btn w-sm-100 mt-3 mt-md-0 btn-danger">Finalizar</button>
              </div>
            </div>
          )}

          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </article>
      </div>

      {/* <Footer /> */}
    </div>
  );
};
export default Carrinho;
