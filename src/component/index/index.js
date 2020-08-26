import React , { Component } from 'react';
import Hero from './hero';
import Functionnement from './functionnement';
import Coupons from './coupons-carousel';
import CashBack from './cashback';
import Parraignage from './parraignage';
import Temoignage from './temoignage';
import CashbackPromo from './cashbackPromo';
import MetaTags from 'react-meta-tags';
import Footer from '../footer/index';
 

class Index extends Component{
  componentDidMount=()=>{
    window.scrollTo({
      top: 0,
      behavior: "smooth",
  });
  }
  render(){
    
    return (
            <div style={{width:'100%',overflowX:'hidden',overflowY:'hidden'}}>
                 <MetaTags>
                     <title>Bienvennu | accuille</title>
                </MetaTags>
                <Hero />
                <Functionnement />
                <Coupons />
                <CashBack />
                <Parraignage />
                <CashbackPromo />
                <Temoignage />
                <Footer />
            </div>          
        ); 
  }
}

export default Index;

