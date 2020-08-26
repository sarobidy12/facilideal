import React , {  useEffect,useState }from 'react';
import { Link,Redirect } from 'react-router-dom';
import axios from "axios";
import localhost from "../../../_config";
import { useCookies } from "react-cookie";
import MetaTags from "react-meta-tags";
import Loader from '../loader/all_data';
 
import Footer from '../../footer/index';

const Hero=()=>{

    const [redirecturl,setRedirect]=useState(false);
    const [url,setUrl]=useState(null);
    const [stop,setStop]= useState(0);
    const [result,SetResult]= useState([]);

    useEffect(()=>{

        setUrl(window.location.pathname.split('/')[2]);

            if(stop === 0){
                getCashbac();
            }

            window.addEventListener('scroll',()=>{
                if(document.getElementById('hero-search-cashack')){
                    if(window.pageYOffset > 200){
                        document.getElementById('hero-search-cashack').style.height='10vh';
                    }else{
                        document.getElementById('hero-search-cashack').style.height='35vh';
                    }
                }
            })
            
    })
    
    const redirect= function redirect(){
        if(redirecturl === true){
            return <Redirect to={'/findCashback/'+document.getElementById('search').value} />
        }
    }

    const urlChange=()=>{
        if(url != window.location.pathname.split('/')[2]){
            setStop(0);
            find();
            setUrl(window.location.pathname.split('/')[2])
        }
    }
    const getCashbac= function getCashbac(){

        let formData= new FormData();
        formData.append("text",JSON.stringify(window.location.pathname.split('/')[2]));
        const url= localhost+'/controleur.php?p=findCachbackName'; 
        axios.post(url,formData)
        .then((res)=>{
            SetResult(res.data);
            setTimeout(()=>{
                setStop(1);
                setRedirect(false);
            },500)
        });

    }

    const find= function find(e){

        setStop(0);
        getCashbac();
        
        if(document.getElementById('search')){
            if(document.getElementById('search').value != ''){
                setRedirect(true);
            }
        }

    }

    const dataResult = function dataResult(){
        if(stop === 1){
            return afficheData();
        }else{

           return <Loader />
        }
    }

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
    
    const afficheData= function afficheData(){

        var element =[];
    
        if( result.length > 0){
            for(var i= 0;i< result.length;i++){
                element.push(
                    <Link to={'/cashbackAndCoupons/'+generateUrl(result[i].nom)} >
                        <div className='view-cashback' data-aos='fade-up'>
    
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
            return <div className='cashback-view-h1'>
                    <img src='/img/find.png' />
                    <h1>Aucun resultat</h1>
                    </div>
        }
       
        }

        const nbr_coupons= function nbr_coupons(e){
            if(e*1 === 0){
                return  <p style={{color:'#aaa'}}>{e}<span class="glyphicon glyphicon-tags" aria-hidden="true"></span></p>
            }else{
                return  <p style={{color:'yellowgreen'}}>{e+''}<span class="glyphicon glyphicon-tags" aria-hidden="true"></span></p>
            }
    
        }
    
    

    return (
            <div> 
                {urlChange()}
                {redirect()}

                <div id='hero-search-cashack'>
                    <div className='cashback-seach'>
                        <h1>
                            <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
                            Resultat du recherche "{window.location.pathname.split('/')[2]}"
                        </h1>
                    </div>
                </div>

                    <div className='resultat-data-find'>
                        {dataResult()}
                    </div>
                        
                        <Footer />

            </div>
        ); 
  }
export default Hero;

