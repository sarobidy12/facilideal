import React , {  useEffect }from 'react';
 
import { Link } from 'react-router-dom';

const Hero=()=>{
    
  

    return (
            <div> 
                    <div id='hero'>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-md-6' data-aos='fade-right'>
                                    
                                    <img src='/img/hero.svg' className='img-hero' alt='economise'/>
                                </div>
                                <div className='col-md-6' data-aos='fade-left'>
                                    <div className='hero-ex'>
                                        <h1>Facilideal.com</h1>
                                        <p>
                                            Simple et 100% gratuit, Facilodeal vous rembourse une partie de vos achats dans + de 1800 boutiques partenaires. C'est ça le cashback !
                                        </p>
                                        <Link to='/inscription' className='btn btn-hero'>Je m'inscris + 3 € offerts</Link>
                                        <button className='btn btn-transparent' onClick={()=>{
                                            window.scrollTo({
                                                top:620,
                                                behavior:'smooth'
                                            })
                                        }} >Comment ça marche  </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        ); 
  }
export default Hero;

