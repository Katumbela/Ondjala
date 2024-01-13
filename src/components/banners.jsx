import Carousel from 'react-bootstrap/Carousel';
import '../css/banners.css'
import { NavLink } from 'react-router-dom';
import semana_do_espaco from '../imgs/semana_do_espaco.jpeg'
import sinopec_banner from '../imgs/peq_eng.jpeg' ;
import sinopec_logo from '../imgs/logo_s_2.png';
function Banners() {

  const SemanaEspacial = {
    background: `url(${semana_do_espaco}) center center`,
    backgroundSize: 'cover', // Para cobrir completamente o elemento com a imagem
  };



  const SinopecStyle = {
    background: `linear-gradient(to right, #D10000CA, #FFFFFFDC), url(${sinopec_banner}) center center`,
    backgroundSize: 'cover', // Para cobrir completamente o elemento com a imagem
  };



  return (
    <Carousel className='car'>
   
   <Carousel.Item style={SinopecStyle} className="carousel px-5 b_code py-auto bg-c">
     
     <div className="row  px-4">
        <div className="col-12 position-relative  text-start  col-lg-8">
          <div className='my-5 cont text-white'>
            <h3>Peq. Eng.º  BY SINOPEC</h3>
            <p className='w-lg-75 pe-sm-2'>O programa busca treinar estudantes angolanos em STEM, possibilitando a montagem e programação de robôs com foco em energia e petróleo.</p>
            <br />
            <NavLink to="/pt/sinopec_learn_inscricao" className="btn bb btn-outline-white">Inscrever-se</NavLink>
          </div>
        </div>
        <div className="col-12 text-center text-start-md col-lg-4">
          <img src={sinopec_logo} alt="sinopec" className='w-75 my-auto' />
        </div>
     </div>

    </Carousel.Item> 
    {/* Carousel do banner do sinopec */}


    <Carousel.Item className="carousel pb-3 position-relative px-5 b_code  bg-c" style={SemanaEspacial}>
     
     <div className="row  px-4">
        <div className="col-12 position-relative  text-start  col-lg-6">
          <div className='my-5 cont text-white'>
            {/* <h3>SEMANA MUNDIAL DO ESPAÇO</h3>
            <p className='w-lg-75 pe-sm-2'>Está de volta a terceira edição do Unitel Code Robótica, para Luanda, Cabinda, Benguela, Uíge, Bengo Kwanza Sul, Kwanza Norte.</p> */}
            {/* <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> */}
          
              <h3>SEMANA MUNDIAL DO ESPAÇO</h3>
               <p className='w-lg-75 pe-sm-2'>Este já terminou, fique atento para próximas edições.</p>
            </div>
        </div>
        <div className="col-12 col-lg-6 ">
        <div style={{right: "1rem", bottom: "5rem", opacity: "0.4"}}  className="bb bg-white text-dark position-absolute bottom-0 btn-outline-white">Inscrever-se <i className="bi bi-arrow-right-short"></i></div>
        
        </div>
     </div>

    </Carousel.Item> 
    {/* Carousel do banner do GGPEN ESPACIAL */}


    <Carousel.Item className="carousel px-5 b_code py-auto bg-c">
     
     <div className="row  px-4">
      <div className="col-12 position-relative  text-start  col-lg-6">
        <div className='my-5 cont text-white' >
          <h3>UNITEL CODE ROBOTICA</h3>
          <p className='w-lg-75 pe-sm-2'>Está de volta a terceira edição do Unitel Code Robótica, para Luanda, Cabinda, Benguela, Uíge, Bengo Kwanza Sul, Kwanza Norte.</p>
          <br />
          <NavLink to="/pt/semana_mundial_do_espaco" className="btn bb btn-outline-white">Inscrever-se</NavLink>
        </div>
      </div>
      <div className="col-12 col-lg-6">
      </div>
     </div>

    </Carousel.Item>

      <Carousel.Item className="carousel bg-primary ban">
        <div className="row my-auto">
          <div className="col-12 items-star im-t text-white my-auto col-sm-6">
            <div>
            <h3>ACADEMIA AROTEC</h3>
            <p>Academia de Robótica, cursos variados voltados para novas tecnologias, Trazendo novidades tecnologias mais próximas dos alunos.</p>
            <NavLink to="/pt/academia"> <button className="btn bb mt-2 btn-outline-white">Ir para academia</button></NavLink>
            
          </div>
          </div>
          <div className="col-12 my-auto acad col-sm-6">
             <div className='im'>
              {/* <img src={banner_academia} alt="" className='img_banner' /> */}
            </div>
          </div>
        </div>
       
        
      </Carousel.Item>

      <Carousel.Item className="carousel bg-primary ban">
      <div className="row my-auto">
         <div className="col-12 items-star im-t text-white my-auto  col-sm-6">
         <div >
          <h3>EMPRESAS</h3>
          <p>
          Consultoria e design de dispositivos inteligentes e software, oluções e programas sociais para empresas.
            </p>
            <NavLink to="/pt/empresas"><button className="btn bb mt-0 btn-outline-white">Saber mais</button></NavLink>
          
        </div>
         </div>
         
          <div className="col-12 text-center my-auto emp mx-auto col-sm-6">
             <div className='im mx-auto'>
              {/* <img src={banner_empresa} alt="" className='img_banner' /> */}
            </div>
         </div>
        </div>

       
     
      </Carousel.Item>
      

      <Carousel.Item className="carousel bg-primary ban">
         
         
      <div className="row my-auto">
         <div className="col-12 items-star im-t text-white my-auto col-sm-6">
         <div >
         <h3>LOJA AROTEC</h3>
          <p>
          Dispositivos e eletrônicos disponíveis para desenvolvimento e suporte de projetos. De componentes eletrônicos a dispositivos montados.
          </p>
          <NavLink to="/pt/loja"><button className="btn bb mt-0 btn-outline-white">Ir para Loja</button></NavLink>
          </div>
        </div>
          <div className="col-12 loja text-center my-auto col-sm-6">
             <div className='im'>
              {/* <img src={banner_loja} alt="" className='img_banner' /> */}
            </div>
         </div>
        </div>
      </Carousel.Item>
      
    </Carousel>
  );
}

export default Banners;
