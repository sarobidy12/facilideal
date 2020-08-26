import React , {useEffect,useState} from 'react';
import MetaTags from 'react-meta-tags';
import axios from 'axios';
import localhost from '../../_config'
import Empiler from "../cashback/loader/empiler";
import Menu from './menu';
import Moment from 'react-moment';
import 'moment/locale/fr';
import Footer from '../footer/index';
import { useCookies } from "react-cookie"; 

const AddSousC=(data)=>{

const [stop,setStop] = useState(0);
const [historique, sethistorique] = useState([]);
const [cookies,Setcookie,removeCookie]=useCookies([]);

    useEffect(()=>{

            if(stop === 0){
                getFindData();
            }   

    })

    const getFindData = function getFindData(){

        let formData= new FormData();
        formData.append("text",JSON.stringify(cookies._lo.id));
        const url= localhost+'/controleur.php?p=getMyhistorique'; 
        axios.post(url,formData)
        .then((res)=>{
            sethistorique(res.data);
                setTimeout(()=>{
                    setStop(1);
                },600);
        });

    }  

    const gliphicon = function gliphicon(e){
        if (e == 1) {
           return  <div style={{color:'green',textAlign:'center'}} >
                        <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>valide
                   </div> 

        } else if (e == 2) {
         return <div style={{color:'red',textAlign:'center'}} >
                    <span className="glyphicon glyphicon-remove-sign" aria-hidden="true"></span>Refuse
                </div> 
        }else if (e == 0) {
            return <div style={{color:'#aaa',textAlign:'center'}} >
                       <span className="glyphicon glyphicon-time" aria-hidden="true"></span>En attente
                   </div> 
           }
    }
 
    const historiqueAll=function historiqueAll(){
        var data=[];

        if( historique.length > 0){


        for(var i=0;i< historique.length;i++){
            data.push(
                <ul className='only-historique'>
                      
                        <li>
                            <img src={'/img/'+historique[i].id_type_boutique*1+'.png'}/>
                        </li>
                        <li>
                           <p>
                               {historique[i].prix+' €'}
                           </p> 
                        </li>
                        <li>
                           <p>
                               <i class="glyphicon glyphicon-time" aria-hidden="true"></i><Moment fromNow>{historique[i].date}</Moment>  
                           </p> 
                        </li>
                        <li>
                            {gliphicon(historique[i].etat)}
                        </li>

                </ul>
            )
        }

        return data;
    }else{
        return <center><h2>Aucune historique</h2></center>
    }

    }

    const buttonDelete= function buttonDelete(){

        if( historique.length > 0){

            return   <button className='btn-del-notification' onClick={()=>{
                        deleteHisto()
                    }}>
                        <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
                        Effacer
                    </button>

        }
    }

    const deleteHisto = function deleteHisto(){

        let formData= new FormData();
        formData.append("text",JSON.stringify(cookies._lo.id));
        const url= localhost+'/controleur.php?p=deletehistorique'; 
        axios.post(url,formData)
        .then((res)=>{

            if(res.data ==='delete-success'){
               //  document.getElementById('data_notif').innerHTML='<center><h2>Aucune notification</h2></center>'
                 sethistorique([]);
            }
        });

    }

    const element= function(){

        if(stop === 1){
            return  <div className="container-view-all">
                        <div className="row">

                                <div className="col-md-4 img-view">
                                    <Menu />
                                </div>

                                <div className="col-md-8 contennt-titre-view">
                                    
                                    <div id='data_notif'>
                                        <h1>
                                            Historique
                                        </h1>
                                        {buttonDelete()}
                                    {historiqueAll()}
                                    </div>

                                </div>
                            </div>
                </div>

        }else{
            return  <div className="container-view-all">
                        <div className="row">
                                <div className="col-md-4 img-view">
                                    <Menu />
                                </div>
                                <div className="col-md-6 contennt-titre-view">
                                    <Empiler />
                                    <Empiler />
                                    <Empiler />
                                </div>
                            </div> 
                </div>

        }
        
    }
  
    return (
            <div> 
                <MetaTags>
                    <title> {cookies._lo.prenom} </title>
                </MetaTags>   
                <div id='acount'>
                   {element()}
                <Footer/>

                </div>
            </div>  
        ); 
  }
export default AddSousC;

