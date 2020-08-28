import React , {Component, useEffect,useState }from 'react';
import { Link } from 'react-router-dom';
import MetaTags from 'react-meta-tags';
import Footer from '../footer/index';
import { withCookies, Cookies } from 'react-cookie';

class Mission extends Component {
    
      componentWillMount=()=>{
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
       window.addEventListener('scroll',function(){

           if(document.getElementById('hero-all') && 
               document.getElementById('all-container') &&
               document.getElementById('hero-all-container')    
             ){
      
             if(window.screen.width <= 414){
      
                   if(window.pageYOffset > 10){
                     document.getElementById('hero-all').style.height= '10vh';
                     document.getElementById('hero-all').style.position='fixed';
                     document.getElementById('all-container').style.top='20vh';
                     document.getElementById('hero-all-container').style.top='60%';
                   }else{  
                     document.getElementById('hero-all').style.position='relative';
                     document.getElementById('hero-all').style.height='50vh';
                     document.getElementById('all-container').style.top='0';
                     document.getElementById('hero-all-container').style.top='30%';
                   }

            }else{
      
             if(window.pageYOffset > 10){
               document.getElementById('hero-all').style.height= '20vh';
               document.getElementById('hero-all').style.position='fixed';
               document.getElementById('all-container').style.top='35vh'; 
               document.getElementById('hero-all-container').style.top='55%';
             }else{  
               document.getElementById('hero-all').style.position='relative';
               document.getElementById('hero-all').style.height='35vh';
               document.getElementById('all-container').style.top='0';
               document.getElementById('hero-all-container').style.top='30%';
             }
      
            }
           }
         })

     }

   
    
  render() {

    return (
            <div style={{width:'100%',overflowX:'hidden',overflowY:'hidden'}}> 
                <MetaTags>
                    <title> offerwall</title>
                    <meta property="og:type"          content="website" />
                    <meta property="og:title"         content="offerwall" />
                    <meta property="og:description"   content="Parcourez nos offres en ligne et soyez payé pour effectuer des tâches afin de gagner des points GPT. Essayez autant de types d'offres différents que possible pour voir ce que vous pouvez accomplir chaque jour pendant votre temps libre." />
                    <meta property="og:image"         content="http://facilodeal.com/img/Mission.ng" />
                    <meta property="og:image:width"         content="1200" />
                    <meta property="og:image:height"         content="630" />
                    <meta property="og:image:width"         content="1200" />
                    <meta property="og:image:height"         content="630" />
                </MetaTags>
                <div id='hero-all'>
                    <div id='hero-all-container'>
                                    <h1>
                                    offerwall
                                    </h1>
                                    <p>
                                        Parcourez nos offres en ligne et soyez payé pour effectuer des tâches afin de gagner des points GPT. Essayez autant de types d'offres différents que possible pour voir ce que vous pouvez accomplir chaque jour pendant votre temps libre.
                                    </p>
                    </div>
                </div>
                <div id='all-container'>
                            <div className='mission-container'>
                                <Link to='/offerwalls/Superrewards'>
                                    <div className='offerwall-view'>
                                        <img src='/img/offerwall/1.png'/>
                                        <h1>Superrewards <span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span></h1>
                                    </div>
                                </Link>
                                <Link to='/offerwalls/clixwall'>
                                    <div className='offerwall-view'>
                                        <img src='/img/offerwall/2.png'/>
                                        <h1>clixwall <span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span></h1>

                                    </div>
                                </Link>
                                <Link to='/offerwalls/Adworkmedia'>
                                    <div className='offerwall-view'>
                                        <img src='/img/offerwall/3.png'/>
                                        <h1>Adworkmedia <span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span></h1>

                                    </div>
                                </Link>
                                <Link to='/offerwalls/personaly'>
                                    <div className='offerwall-view'>
                                        <img src='/img/offerwall/4.png'/>
                                        <h1>Static persona <span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span></h1>

                                    </div>
                                </Link>
                                <Link to='/offerwalls/Ptcwall'>
                                    <div className='offerwall-view'>
                                        <img src='/img/offerwall/5.png'/>
                                        <h1>Ptcwall <span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span></h1>

                                    </div>
                                </Link>
                                <Link to='/offerwalls/kiwiwall'>
                                    <div className='offerwall-view'>
                                        <img src='/img/offerwall/6.png'/>
                                        <h1>kiwiwall <span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span></h1>

                                    </div>
                                </Link>
                                <Link to='/offerwalls/offertoro'>
                                    <div className='offerwall-view'>
                                        <img src='/img/offerwall/7.png'/>
                                        <h1>offertoro <span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span></h1>

                                    </div>
                                </Link>
                                <Link to='/offerwalls/Wannads'>
                                    <div className='offerwall-view'>
                                        <img src='/img/offerwall/8.png'/>
                                        <h1>Wannads <span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span></h1>
                                    </div>
                                </Link>
                              
                             
                            <div>
                    </div>
                    </div>
              
                </div>
            <Footer />

        </div>

        ); 
  }
}
export default withCookies(Mission);

