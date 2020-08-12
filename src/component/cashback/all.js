import React , {  useEffect,useState }from 'react';
import { Link } from 'react-router-dom';
import Loader from './loader/loader_view_all';
import { useCookies } from 'react-cookie';
const Allcashback=()=>{
    
    const [stop,setStop]=useState(0);
    const [cookies, setCookie] = useCookies(null);
 
    useEffect(()=>{
        setTimeout(()=>{
            setStop(1)
        },300);
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
                       <div className='cashback-all-content' data-aos='zoom-in' >
                         <img src={cookies._categorieAndSousCAtegorie[i].url_img}/>
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
            <div> 
                <div id="cashback-all-io">
                    {loader()}
                </div>
            </div>
        ); 
  }

export default Allcashback;
