import React , {useEffect} from 'react';
import Recent from './cashback/recent';
import Populaire from './cashback/populaire';

const cashbackPromo=()=>{

   const onglet= function onglet(a){

        for(var i =0;i < document.getElementsByClassName('onglet').length;i++){
            document.getElementsByClassName('onglet')[i].classList='onglet';
        }

        for(var i =0;i < document.getElementsByClassName('cashbackPromo-content').length;i++){
            document.getElementsByClassName('cashbackPromo-content')[i].classList='cashbackPromo-content';
        }

        document.getElementById('on-'+a).classList.add('active-cashbackPromo');
        document.getElementById(''+a).classList.add('cashbackPromo-content-block');

    }
 
  
    return (
            <div> 
                <div className='container'>
                    <div id='cashbackPromo' >
                        <h1  data-aos='fade-left' ><span><img src="/img/coupons.png"/></span>Les Cashback en Promotion </h1>

                        <div className='cashbackPromo-title'  data-aos='fade-right'>
                            <ul>
                                <li id='on-recent' onClick={()=>{ onglet('recent') }}  className='onglet active-cashbackPromo'>
                                    Plus recent
                                </li>
                                <li id='on-populaire' onClick={()=>{ onglet('populaire') }} className='onglet' >
                                    Plus populaire
                                </li>
                            </ul>
                        </div>

                        <div id='recent' className='cashbackPromo-content cashbackPromo-content-block'  >
                            <Recent />
                        </div>
                        <div id='populaire'  className='cashbackPromo-content'  >
                            <Populaire />
                        </div>
                    </div>  
                </div>
                        
            </div>
        ); 
  }
export default cashbackPromo;

