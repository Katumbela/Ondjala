import '../App.css';
// Bootstrap CSS
// Bootstrap Bundle JS
import Header from '../components/header';
import Footer from '../components/footer';
import BannerPreto from '../components/banner_preto';
import { db } from './firebase';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../components/loader';
// import Accordion from '../components/accordion';

const Faqs = ({ emaill, nomee, cart }) => {
    document.title = 'Formulario de Contacto | D-ALUGUEL';

    const [nomeCompleto, setNC] = useState('');
    const [telefone, setTel] = useState('');
    const [email, setEmail] = useState('');
    const [mensagem, setMsg] = useState('');
    const [load, setLoad] = useState(false);


    const salvar = () => {
        setLoad(true)
        db.collection('mensagens').add({
            nomeCompleto: nomeCompleto,
            telefone: telefone,
            email: email,
            mensagem: mensagem,
            dataEnvio: new Date(),
        })
            .then(() => {
                setEmail('');
                setTel('');
                setNC('');
                setMsg('');
                setLoad(false);
                toast.success('Recebemos a sua mensagem com sucesso!');
            })
            .catch((error) => {
                setLoad(false);
                toast.error('Erro ao enviar mensagem:');
            });
    }

    return (
        <div className="w-100">
            <ToastContainer />

            < Header nomee={nomee} emaill={emaill} cart={cart} />
            <BannerPreto>
                F A Q S
            </BannerPreto>
            <br />
            <br /><br />
            {/* <div className="container">

                <Accordion title={'Como ganho dinheiro ?'} children={'Voce ganha dinheiro alugando seu material na plataforma e nos procuramos por clientes '} />
                <br />

                <Accordion title={'Como funciona a plataforma ?'} children={'Voce ganha dinheiro alugando seu material na plataforma e nos procuramos por clientes '} />
                <br />

                <Accordion title={'Como funciona a plataforma ?'} children={'Voce ganha dinheiro alugando seu material na plataforma e nos procuramos por clientes '} />
                <br />

                <Accordion title={'Como funciona a plataforma ?'} children={'Voce ganha dinheiro alugando seu material na plataforma e nos procuramos por clientes '} />
                <br />

                <Accordion title={'Como funciona a plataforma ?'} children={'Voce ganha dinheiro alugando seu material na plataforma e nos procuramos por clientes '} />
                <br />

                <Accordion title={'Como funciona a plataforma ?'} children={'Voce ganha dinheiro alugando seu material na plataforma e nos procuramos por clientes '} />
                <br />

                <Accordion title={'Como funciona a plataforma ?'} children={'Voce ganha dinheiro alugando seu material na plataforma e nos procuramos por clientes '} />
                <br />

                <Accordion title={'Como funciona a plataforma ?'} children={'Voce ganha dinheiro alugando seu material na plataforma e nos procuramos por clientes '} />
                <br />

                <Accordion title={'Como funciona a plataforma ?'} children={'Voce ganha dinheiro alugando seu material na plataforma e nos procuramos por clientes '} />


            </div> */}
            <br /><br /><br />
            < Footer />

        </div>
    );
}

export default Faqs;
