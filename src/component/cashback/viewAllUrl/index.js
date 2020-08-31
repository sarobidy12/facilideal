import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Data from "./data";
import axios from "axios";
import localhost from "../../../_config";
import { useCookies } from "react-cookie";
import MetaTags from "react-meta-tags";
import Care from "../loader/rarre";
import Long from "../loader/long";
import Empiler from "../loader/empiler";

import Footer from '../../footer/index'

const ViewAllCahsback = () => {
  const [idca, setidca] = useState(null);
  const [nameca, setnameca] = useState(null);
  const [urlca, seturlca] = useState(null);
  const [stop2, setStop2] = useState(0);
  const [stop3, setStop3] = useState(0);
  const [Boutique, setBoutique] = useState([]);
  const [cookies, setCookie] = useCookies(null);
  const [url,seturl]= useState(window.location.pathname.split('/')[2]);

  const urlChange=()=>{
        if(url != window.location.pathname.split('/')[2]){
          getCategorie();
          setStop3(0);
          getFindData();
          seturl(window.location.pathname.split('/')[2])
        }
  }
  useEffect(() => {

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setTimeout(() => {
      getCategorie();
      if(stop3 === 0){
        getFindData();
      }
    }, 500);
  
    window.addEventListener('scroll',function(){
      if(document.getElementById('scroll-home')  
        ){
        if(window.screen.width <= 414){
              if(window.pageYOffset > 10){
                document.getElementById('scroll-home').style.height= '50vh';
              }else{  
                document.getElementById('scroll-home').style.height= '60vh';
              }
       }else{
              if(window.pageYOffset > 10){
                document.getElementById('scroll-home').style.height= '40vh';
              }else{  
                document.getElementById('scroll-home').style.height= '55vh';
              }
       }
      }
    })

  });

  const WatsCategorie = function WatsCategorie(e) {
    var text = "";

    for (var i = 0; i < e.split("-").length; i++) {
      if (i === e.split("-").length - 1) {
        text = text + e.split("-")[i];
      } else {
        text = text + e.split("-")[i] + " ";
      }
    }

    return text;

  };

  const getFindData=(id)=>{

    let formData = new FormData();
    formData.append("text",JSON.stringify(idca));

    const url = localhost + "/controleur.php?p=getCashbackSelection";
        axios.post(url, formData).then((res)=>{
          setBoutique(res.data)
          setStop3(1)
        });
  };

  const WatsUrl = (e) => {
     var text = "";
     for (var i = 0; i < e.split(" ").length; i++) {
       if (i === e.split(" ").length - 1) {
         text = text + e.split(" ")[i];
       } else {
         text = text + e.split(" ")[i] + "-";
       }
     }
     return text;
  };

  const BoutiqueView=()=>{

    var BoutiqueAll = [];

     if (0 < Boutique.length) {
       for (var i = 0; i < Boutique.length; i++) {
         BoutiqueAll.push(
             <Link
               to={
                 "/cashbackAndCoupons/" +
                 WatsUrl(Boutique[i].nom)
               }
               onClick={()=>{
                 window.scrollTo({
                   top: 0,
                   behavior: "smooth",
                });
               }}
              
               data-aos='fade-in'
             >
                 <div className='selection-moment'>
                     <center>

                         <img src={Boutique[i].url_img}/>

                         <div className='view-link-suggestion'>
                             <strike>
                                 {Boutique[i].Ancien+''}
                             </strike>
                             <b>
                                 {Boutique[i].Nouveaux+''}
                                 <span class="glyphicon glyphicon-circle-arrow-up" aria-hidden="true"></span>
                             </b>
                         </div>
                     </center>

                 </div>
             </Link>
         );
       }

       return <div>
         <h2>
           selection du moment
         </h2>
            {BoutiqueAll}
       </div>
       
       
     } else {
       return <h2>Aucune selection du moment</h2>;
     }

  };

  const generateUrl = function generateUrl(e) {
    
    var text = "";

      for (var i = 0; i < e.split(" ").length; i++) {
        if (i === e.split(" ").length - 1) {
          text = text + e.split(" ")[i];
        } else {
          text = text + e.split(" ")[i] + "-";
        }
      }

        return text;

  };

  const getCategorie = function getCategorie() {
    for (var i = 0; i < cookies._categorieAndSousCAtegorie.length; i++) {
      if (
        cookies._categorieAndSousCAtegorie[i].nom_categorie ===
        WatsCategorie(window.location.pathname.split("/")[2])
      ) {
        setidca(cookies._categorieAndSousCAtegorie[i].id);
        setnameca(cookies._categorieAndSousCAtegorie[i].nom_categorie);
        seturlca(cookies._categorieAndSousCAtegorie[i].url_img);
      }
    }

    setStop2(1);

  };

  const heroData = function stop() {
    if (idca != null){
      return nameca;
    } else {
      return (<div>
        <br/>
        <br/>
        <br/>
        <Long />
        </div>);
    }
  };

  const selection=()=>{

    if(stop3 === 1){
      return BoutiqueView()
    } 

  }

  const NavLien = function NavLien() {
    if (stop2 === 1) {
      return (
        <div className="menu_cashabck_sous">
          <h2>
            <i className="glyphicon glyphicon-tasks" aria-hidden="true"></i>
            Categorie
          </h2>
          <ul>{getSousCategorie()}</ul>
        </div>
      );
    }else{
      return <Empiler />;
    }
  };

    const getSousCategorie = function getSousCategorie(e) {
    var resultat = [];

    for (var i = 0; i < cookies._categorieAndSousCAtegorie.length; i++) {
      if (
        cookies._categorieAndSousCAtegorie[i].nom_categorie ===
        WatsCategorie(window.location.pathname.split("/")[2]) + ""
      ) {
        for (
          var b = 0;
          b < cookies._categorieAndSousCAtegorie[i].souscategorie.length;
          b++
        ) {
          resultat.push(
            <li>
              <Link
                to={
                  "/casbackCategorie/"+generateUrl(nameca)+"/"+generateUrl(cookies._categorieAndSousCAtegorie[i].souscategorie[b].nom_sous_categorie)
                }
              >
                {
                  cookies._categorieAndSousCAtegorie[i].souscategorie[b]
                    .nom_sous_categorie
                }
              </Link>
            </li>
          );
        }
      }
    }
    return resultat;
  };

  return (
    <div style={{width:'100%',overflowX:'hidden',overflowY:'hidden'}}>
      {urlChange()}
      <MetaTags>
        <title> {WatsCategorie(window.location.pathname.split("/")[2])}</title>
      </MetaTags>

                    <div id='scroll-home' style={{
                      backgroundImage:'url('+urlca+')'
                    }} className='categorie-background'>
                      <div style={{
                        backgroundColor:'rgba(0,0,0,0.5)',
                        with:'100%',
                        height:'100%'
                      }}>
                        <br/>
                         <h1>
                           {heroData()} 
                         </h1> 
                         <div className='selction-du-moment'>
                           {selection()}
                         </div>
                      </div>
                                   
                    </div>
                <div>

                  <div className='row'>

                  <div className='col-md-4'>
                      {NavLien()}
                  </div>

                  <div className='col-md-8'>
                      <Data />
                  </div>
                  </div>
      <Footer/>
                            
                </div>
    </div>
  );
};
export default ViewAllCahsback;
