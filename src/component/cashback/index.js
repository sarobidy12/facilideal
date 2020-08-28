import React , {  useEffect,useState }from 'react';
import { Link } from 'react-router-dom';
import Loader from './loader/loader_view_all';
import MetaTags from "react-meta-tags";
import Footer from '../footer/index';
import { useCookies } from 'react-cookie';

const Allcashback=()=>{

  const [stop,setStop]=useState(0);
  const [cookies, setCookie] = useCookies(null);
  useEffect(()=>{

    setTimeout(()=>{
      setStop(1)
    },300);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    
  })

  const generateUrl= function generateUrl(e){

    var text ='';

    for(var i=0;i<e.split(' ').length;i++){
        if(i === (e.split(' ').length - 1)){
            text = text + e.split(' ')[i] 
        }else{
            text = text + e.split(' ')[i]+'-' 
        }
    }

    return text;

};

 const dataAll = function categorieRes(){

     var element =[];
     for(var i=0;i<cookies._categorieAndSousCAtegorie.length;i++ ){
         element.push(
                   <div className='cashback-all-content' style={{backgroundImage:'url('+cookies._categorieAndSousCAtegorie[i].url_img+')'}} >
                     <h1><Link to={'/cashbackView/'+generateUrl(cookies._categorieAndSousCAtegorie[i].nom_categorie)+'/'}>{cookies._categorieAndSousCAtegorie[i].nom_categorie}</Link></h1>
                     <ul>
                         {getSousCategorie(
                            cookies._categorieAndSousCAtegorie[i].souscategorie,
                            cookies._categorieAndSousCAtegorie[i].nom_categorie)}
                     </ul>
                 </div>
         )
     }
    return element;

 }

 const getSousCategorie = function getSousCategorie(e,c){

    var i=[];


    for(var b=0;b< e.length;b++){
        i.push(
            <li>
                 <Link to={'/casbackCategorie/'+generateUrl(c)+'/'+generateUrl(e[b].nom_sous_categorie)}>
                     {e[b].nom_sous_categorie}
                </Link>
            </li>
        )
    }
    
    return i;
 }
 const loader = function loader(){
     if(stop == 1){

         return dataAll();

     }else{
         return <div>
            <Loader/>
         </div>
     }
 }
    return (
      <div style={{width:'100%',overflowX:'hidden',overflowY:'hidden'}}>
          <MetaTags>
              <title> categorie </title>
          </MetaTags>

        <div id='hero-all'>
                    <div id='hero-all-container'>
                    <div className='titre-gangnat'>
                        <h1>
                            Toute les Boutiques    
                        </h1>             
                        </div> 
                    </div>
                </div>
                <div id='all-container'>

                  <div id='cashback-all-io'>
                            <div>
                                {loader()}
                            </div>
                  </div>
                            
                </div>

        <Footer />

      </div>
    );
  }

export default Allcashback;
