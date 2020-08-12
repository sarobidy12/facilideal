import React , { Component } from 'react';
import Hero from './hero';
import Functionnement from './functionnement';
import Coupons from './coupons-carousel';
import CashBack from './cashback';
import Parraignage from './parraignage';
import Temoignage from './temoignage';
import CashbackPromo from './cashbackPromo';
import MetaTags from 'react-meta-tags';

class Index extends Component{
  componentDidMount=()=>{
    window.scrollTo({
      top: 0,
      behavior: "smooth",
  });
  }
  render(){
    
    return (
            <div>
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
            </div>          
        ); 
  }
}

export default Index;

