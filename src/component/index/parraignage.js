import React , {  useEffect }from 'react';

import { Link } from 'react-router-dom';

const Parraignage=()=>{
    
  

    return (
            <div> 
                <div className='container'>
                    <div id='parraignage-home'>
                            <div className='row'>


                                 <div className='col-md-6' data-aos='fade-left'>
                                     <h1>
                                     Gagnez de l'argent avec le parrainage
                                     </h1>
                                     <p>
                                     facildeal offre <b>5€</b>  à votre filleul-e à son inscription (au lieu de 3€). Récupérez 10% du montant du <b>cashback de vos filleuls</b>, à vie. Une pêche miraculeuse…

                                     </p>
                                </div>

                                <div className='col-md-6' data-aos='fade-right'>
                                    <img src='/img/parraign.png' className='img-hero' alt='economise'/>
                                </div>

                            </div>
                     </div>
                </div>
                        
            </div>
        ); 
  }
export default Parraignage;

