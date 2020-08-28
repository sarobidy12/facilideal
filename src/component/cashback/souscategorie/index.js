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
import Footer from '../../footer/index'

const ViewAllCahsback = () => {
  const [idca, setidca] = useState(null);
  const [nameca, setnameca] = useState(null);
  const [urlca, seturlca] = useState(null);
  const [stop2, setStop2] = useState(0);
  const [stop3, setStop3] = useState(0);
  const [stop4, setStop4] = useState(0);
  const [cookies, setCookie] = useCookies(null);
  const [result,SetResult]= useState([]);
  const [stop,setStop]= useState(0);
  const [Boutique, setBoutique] = useState([]);

  useEffect(()=>{

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

        setTimeout(() => {
          getCategorie();
            if(stop3 === 0 ){
              getFindData();
            }
        },500);

        if(document.getElementsByClassName('casbackCategorieLi')){
            for(var i=0;i < document.getElementsByClassName('casbackCategorieLi').length;i++){
                document.getElementsByClassName('casbackCategorieLi')[i].classList='casbackCategorieLi ';
            }
        }

        if(document.getElementById(window.location.pathname.split('/')[3])){
           document.getElementById(window.location.pathname.split('/')[3]).classList.add('active-sous-categorie');
        }

          if(stop === 0 && stop4 === 0){
            getData(WatsCategorie(window.location.pathname.split('/')[3]));
          }

  });

  const getFindData=(id)=>{

    let formData = new FormData();
    formData.append("text",JSON.stringify(idca));

    const url = localhost + "/controleur.php?p=getCashbackSelection";
        axios.post(url, formData).then((res)=>{
          setBoutique(res.data)
          setStop3(1);
        });
  };

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
              setStop4(1);
            },700);
        });
  }

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

  const generateUrl = function generateUrl(e){

    var text = "";

    for (var i = 0; i < e.split(" ").length; i++) {
      if (i === e.split(" ").length - 1) {
        text = text + e.split(" ")[i];
      } else {
        text = text + e.split(" ")[i] + "-";
      }
    }

    return encodeURI(text)+'';

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

  const selection=()=>{
    if(stop3 === 1){
      return BoutiqueView()
    } 
  }
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

  
  
    const heroData = function stop() {
      if (idca != null) {
        return nameca
      } else {
        return <Long />
        
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
    const filtre=(e)=>{

      setStop(0);
      SetResult([]);
      if(e.target.value === 'populaire'){
          let formData= new FormData();
          formData.append("text",JSON.stringify(WatsCategorie(window.location.pathname.split('/')[3])));
          const url= localhost+'/controleur.php?p=ViewCashbackSousCategorieComfirmePopulaire'; 
          axios.post(url,formData)
          .then((res)=>{
              SetResult(res.data);
              setTimeout(()=>{
                  setStop(1);
              },500)

          });
      }else if(e.target.value === 'taux'){
          let formData= new FormData();
          formData.append("text",JSON.stringify(WatsCategorie(window.location.pathname.split('/')[3])));
          const url= localhost+'/controleur.php?p=ViewCashbackSousCategorieComfirmeTaux'; 
          axios.post(url,formData)
          .then((res)=>{
              SetResult(res.data);
            
              setTimeout(()=>{
                  setStop(1);
              },500)

          });
      }else if(e.target.value === 'alphabetique'){
          let formData= new FormData();
          formData.append("text",JSON.stringify(WatsCategorie(window.location.pathname.split('/')[3])));
          const url= localhost+'/controleur.php?p=ViewCashbackSousCategorieComfirmeAlphabetique'; 
          axios.post(url,formData)
          .then((res)=>{
              SetResult(res.data);

              setTimeout(()=>{
                  setStop(1);
              },500)
               
          });
      }
     
  }
  return (
    <div>
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

              <div className='row'>
                    <div className='col-md-4'>
                        {NavLien()}
                    </div>
                    <div className='col-md-8'>
                      <select className='selection' onChange={filtre}>
                          <option value='populaire'>
                                  Plus populaire
                          </option>
                          <option value='taux'>
                                  taux cashback
                          </option>
                          <option value='alphabetique'>
                                  ordre alphabetique
                          </option>
                      </select>
                          {dataResult()}
                    </div>
              </div>
       
      <Footer />
    </div>
  );
};
export default ViewAllCahsback;
