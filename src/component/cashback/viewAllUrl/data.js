import React , {  useEffect,useState }from 'react';
import { Link } from 'react-router-dom';
import Loader from '../loader/all_data';
import axios from 'axios';
import localhost from '../../../_config';
import { useCookies } from 'react-cookie';

const Nav=()=>{

    const [stop,setStop]= useState(0);
    const [cookies, setCookie] = useCookies(null);
    const [result,SetResult]= useState([]);

    useEffect(()=>{
        if(stop === 0){
            setTimeout(()=>{
                getCashbac()
            },500)
        }
    })

    const getCashbac= function getCashbac(){

        let formData= new FormData();
        formData.append("text",getCategorie());
        const url= localhost+'/controleur.php?p=ViewCashback'; 
        axios.post(url,formData)
        .then((res)=>{
            SetResult(res.data);
            setStop(1);
        });
    }

    const WatsCategorie= function WatsCategorie(e){

        var text ='';

        for(var i=0;i<e.split('-').length;i++){
            if(i === (e.split('-').length - 1)){
                text = text + e.split('-')[i] 
            }else{
                text = text + e.split('-')[i]+' ' 
            }
        }
        
        return text;

    };

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
            return <h1>Aucun resultat</h1>
        }
       
    }

    const nbr_coupons= function nbr_coupons(e){
        if(e*1 === 0){
            return  <p style={{color:'#aaa'}}>{e}<span class="glyphicon glyphicon-tags" aria-hidden="true"></span></p>
        }else{
            return  <p style={{color:'yellowgreen'}}>{e+''}<span class="glyphicon glyphicon-tags" aria-hidden="true"></span></p>
        }

    }

    const getCategorie = function getCategorie(){
        for(var i=0;i< cookies._categorieAndSousCAtegorie.length;i++){
           if(cookies._categorieAndSousCAtegorie[i].nom_categorie === WatsCategorie(window.location.pathname.split('/')[2])){
            return JSON.stringify(cookies._categorieAndSousCAtegorie[i].id);
            break;
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
    return (
            <div> 
                <div className='resultat-data'>
                    {dataResult()}
                </div>
            </div>
        ); 
}

export default Nav;

