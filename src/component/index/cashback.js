import React , {  useEffect }from 'react';
import Aos from 'aos';
import "aos/dist/aos.css";
import { Link } from 'react-router-dom';

const CashBack=()=>{
    
    useEffect(()=>{
        Aos.init({
        duration : 1500
        })
    },[]);

    return (
            <div> 
                <div className='container'>
                    <div id='cashback-home'>
                            <div className='row'>

                                <div className='col-md-6' data-aos='fade-right'>
                                    <img src='/img/cashback.png' className='img-hero' alt='economise'/>
                                </div>

                                <div className='col-md-6' data-aos='fade-left'>
                                     <h1>
                                     Le cashback
                                     </h1>
                                     <p>
                                     Faites-vous <b>rembourser</b>  une partie de vos <b>achats</b> à chaque passage en caisse dans nos magasins partenaires. C'est toujours <b>gratuit</b>  mais encore plus simple, rapide et <b>automatique</b> !
                                     </p>
                                </div>
                            </div>
                     </div>
                </div>
                        
            </div>
        ); 
  }
export default CashBack;

