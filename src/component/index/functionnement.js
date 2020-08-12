import React , {  useEffect }from 'react';
 import { Link } from 'react-router-dom';

const Functionnement=()=>{
    
  
    return (
            <div> 

                        <div className='container'>
                            <div id='functionnement'>
                                <h1>
                                Comment ça marche le Cashback ?
                                </h1>
                                <div className='row'>

                                        <div className='col-md-3'>
                                            <div className='functionnement'  data-aos='fade-up'>
                                                <img src='/img/add-count.png' alt="S'inscire"/>
                                                <span>
                                                    1.
                                                </span>
                                                <h2>
                                                Enregistrez-vous sur falicideal
                                                </h2>
                                            </div>
                                        </div>
                                        
                                        <div className='col-md-3' >
                                            <div className='functionnement' data-aos='fade-up'>
                                                <img src='/img/find-shop.png' alt="Choisir une boutique"/>
                                                <span>
                                                    2.
                                                </span>
                                                <h2>
                                                Cherchez une boutique ou un produit
                                                </h2>
                                            </div>
                                        </div>
                                        
                                        <div className='col-md-3' >
                                            <div className='functionnement' data-aos='fade-up'>
                                                <img src='/img/buy.png' alt="Acheter "/>
                                                <span>
                                                    3.
                                                </span>
                                                <h2>
                                                Achetez et payez
                                                </h2>
                                            </div>
                                        </div>
                                        
                                        <div className='col-md-3'  >
                                            <div className='functionnement' data-aos='fade-up'>
                                                <img src='/img/receive-cashback.png' alt="Recevoir le cashback"/>
                                                <span>
                                                    4.
                                                </span>
                                                <h2>
                                                Recevez le meilleur Cashback
                                                </h2>
                                            </div>
                                        </div>
                                     
                                </div>
                            </div>
                        
                    </div>
            </div>
        ); 
  }
export default Functionnement;

