import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import localhost from "../../../_config";
import { useCookies } from "react-cookie";
import MetaTags from "react-meta-tags";
import Loader from '../loader/all_data';

import Carre from "../loader/rarre";
import Long from "../loader/long";
import Empiler from "../loader/empiler";

const ViewAllCahsback = () => {
  const [idca, setidca] = useState(null);
  const [nameca, setnameca] = useState(null);
  const [urlca, seturlca] = useState(null);
  const [stop2, setStop2] = useState(0);
  const [cookies, setCookie] = useCookies(null);
  const [result,SetResult]= useState([]);
  const [stop,setStop]= useState(0);

  useEffect(()=>{

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

      setTimeout(() => {
        getCategorie();
      }, 500);

        if(document.getElementsByClassName('casbackCategorieLi')){
            for(var i=0;i < document.getElementsByClassName('casbackCategorieLi').length;i++){
                document.getElementsByClassName('casbackCategorieLi')[i].classList='casbackCategorieLi ';
            }
        }

        if(document.getElementById(window.location.pathname.split('/')[3])){
          document.getElementById(window.location.pathname.split('/')[3]).classList.add('active-sous-categorie');
        }

          if(stop === 0){
            getData(WatsCategorie(window.location.pathname.split('/')[3]));
          }

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

  const afficheData= function afficheData(){

    var element =[];

    if( result.length > 0){
        for(var i= 0;i< result.length;i++){
            element.push(
                <Link to={'/cashbackAndCoupons/'+generateUrl(result[i].nom)} >
                    <div className='view-cashback'>

                        <div className='inline-block-id'>
                            <img src={result[i].url_img}/>
                        </div>
                        <div className='inline-block-id'>
                            <h3>
                                {result[i].nom}
                            </h3>
                            <strike>
                                {result[i].Ancien}
                            </strike>
                            <b>
                                    {result[i].Nouveaux+''}
                                    <span class="glyphicon glyphicon-circle-arrow-up" aria-hidden="true"></span>
                            </b>
                        </div>
                        <div className='inline-block-id'>
                            {nbr_coupons(result[i].nbr_coupons)}
                        </div>
                
                    </div>
                </Link>
            )
        }

        return element;

    }else{
        return <div className='cashback-view-h1'><h1>Aucun resultat</h1></div>
    }
   
    }

    const nbr_coupons= function nbr_coupons(e){
      if(e*1 === 0){
          return  <p style={{color:'#aaa'}}>{e}<span class="glyphicon glyphicon-tags" aria-hidden="true"></span></p>
      }else{
          return  <p style={{color:'yellowgreen'}}>{e+''}<span class="glyphicon glyphicon-tags" aria-hidden="true"></span></p>
      }

    }

    const dataResult = function dataResult(){
      if(stop === 1){
          return afficheData();
      }else{

        return <Loader />
      }
    }

    const getData= function getData(e,id){

      setStop(0);

      let formData= new FormData();
          formData.append("text",JSON.stringify(WatsCategorie(e)));
          const url= localhost+'/controleur.php?p=ViewCashbackSousCategorieComfirme'; 
          axios.post(url,formData)
          .then((res)=>{  
              SetResult(res.data);
              setTimeout(()=>{
                setStop(1);
              },700);
          });
    }
  
  
    const heroData = function stop() {
      if (idca != null) {
        return (
          <div id="row-hero">
            <div className="inline-block img-view">
              <img src={urlca} data-aos="fade-right" />
            </div>
            <div className="inline-block contennt-titre-view">
              <h1>{nameca}</h1>
            </div>
          </div>
        );
      } else {
        return (
          <div id="row-hero">
            <div className="inline-block img-view">
              <Carre />
            </div>
            <div className="inline-block contennt-titre-view">
              <Long />
            </div>
          </div>
        );
      }
    };

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
      } else {
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
            
              <li className='casbackCategorieLi'  id={generateUrl(cookies._categorieAndSousCAtegorie[i].souscategorie[b].nom_sous_categorie)} >
                <Link
                  to={
                    "/casbackCategorie/"+generateUrl(nameca)+"/"+generateUrl(cookies._categorieAndSousCAtegorie[i].souscategorie[b].nom_sous_categorie)
                  }

                  onClick={getData.bind(this,generateUrl(cookies._categorieAndSousCAtegorie[i].souscategorie[b].nom_sous_categorie))}
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
    <div>
      <MetaTags>
        <title> {WatsCategorie(window.location.pathname.split("/")[2])}</title>
      </MetaTags>

      <div id="hero-cashack">{heroData()}</div>

      <div className="container-view-all">
        <div className="inline-block img-view">{NavLien()}</div>

        <div className="inline-block contennt-titre-view">
{dataResult()}
        </div>
      </div>
    </div>
  );
};
export default ViewAllCahsback;
