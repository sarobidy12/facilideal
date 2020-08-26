import React , {useEffect,useState} from 'react';
import MetaTags from 'react-meta-tags';
import axios from 'axios';
import { useCookies } from "react-cookie";

import Moment from 'react-moment';
import 'moment/locale/fr';
import parse from 'html-react-parser';
import localhost from '../../_config'
import Empiler from "../cashback/loader/empiler";
import { Link, Redirect } from 'react-router-dom';
import Menu from './menu';

import Footer from '../footer/index';

const AddSousC=(data)=>{

const [stop,setStop] = useState(0);
const [stop2,setStop2] = useState(0);
const [cookies, setCookie,removeCookie] = useCookies(null);

const [stopx,setstopx] = useState(0);
const [stopy,setstopy] = useState(0);
const [stopz,setstopz] = useState(0);
const [MissionClick,setMissionClick] = useState([]);
const [cashback,setcashback] = useState([]);


    useEffect(()=>{

            if(stop2 === 0){
                getFindusersID();
            }
       
            if(stopz === 0){
                getCashback()
            }

    })

    const getFindusersID = function getFindusersID(){
        let formData= new FormData();
        formData.append("text",JSON.stringify(cookies._lo.id));
        const url= localhost+'/controleur.php?p=findUserId'; 
        axios.post(url,formData)
        .then((res)=>{
            setStop2(1);
                    setCookie('_lo',res.data);
                        setTimeout(()=>{
                            setStop(1);
                        },600);
        });
    }  

    const getMission = function getMission(){
        let formData= new FormData();
        formData.append("text",JSON.stringify(cookies._lo.id));
        const url= localhost+'/controleur.php?p=getMyMission'; 
        axios.post(url,formData)
        .then((res)=>{
            setMissionClick(res.data);
                    setTimeout(()=>{
                        setstopy(1);
                    },500)
        });
    }  
    
    const getClick = function getClick(){
        let formData= new FormData();
        formData.append("text",JSON.stringify(cookies._lo.id));
        const url= localhost+'/controleur.php?p=getMyClick'; 
        axios.post(url,formData)
        .then((res)=>{
                setMissionClick(res.data);
                setTimeout(()=>{
                    setstopx(1);
                },500)
        });
    } 

    const getCashback = function getCashback(){

        let formData= new FormData();
        formData.append("text",JSON.stringify(cookies._lo.id));
        const url= localhost+'/controleur.php?p=getMyCashback'; 
        axios.post(url,formData)
        .then((res)=>{
                setcashback(res.data);
                    setTimeout(()=>{
                        setstopz(1);
                    },500)
        });
    } 

    const DataMissionClick= function DataMissionClick(){

        var data=[];

        if(MissionClick.length > 0){
            for(var i=0;i < MissionClick.length;i++){

                data.push(
                    <ul className='only-historique' style={{margin: '0 auto',width:'80%'}}>
                        <li>
                           <p>
                               {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(MissionClick[i].remuneration)}
                            </p>
                        </li>
                        <li>
                            {gliphicon(MissionClick[i].etat)}
                        </li>
                        <li>
                            <i class="glyphicon glyphicon-time" aria-hidden="true"></i><Moment fromNow>{MissionClick[i].dateUsTime}</Moment>  
                        </li>
                    </ul>
                )
            }
    
            return data;
    
        }else{

            return <h5>vous n'avez effectuer aucun activite pour le moment </h5>
                
        }
     


    }

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
    
    const Datacashback= function Datacashback(){

        var data=[];

        if(cashback.length > 0){

            for(var i=0;i < cashback.length;i++){

                data.push(
                    <ul className='only-cashback' style={{margin: '0 auto',width:'80%'}}>
                        <li>
                            <Link to={'/cashbackAndCoupons/'+WatsUrl(cashback[i].cashback_name)} >
                           <b>
                               {cashback[i].cashback_name}
                            </b>
                            </Link>

                        </li>
                        <li>
                           <p>
                               {cashback[i].cashback_p}
                            </p>
                        </li>
                        <li>
                            {gliphiconCashback(cashback[i].etat)}
                        </li>
                        <li>
                            <i class="glyphicon glyphicon-time" aria-hidden="true"></i><Moment fromNow>{cashback[i].date}</Moment>  
                        </li>
                    </ul>
                )
            }
    
            return data;

        }else{

            return <h5>vous n'avez activer cashback pour le moment </h5>

        }
        
      

    }


    const gliphicon = function gliphicon(e){
        if (e == 2 )  {
           return  <div style={{color:'green',textAlign:'center'}} >
                        <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>Valide
                   </div> 

        }else if (e == 1 || e == 0 ) {
            return <div style={{color:'#aaa',textAlign:'center'}} >
                       <span className="glyphicon glyphicon-time" aria-hidden="true"></span>En attente
                   </div> 
        }else if (e == 3) {
            return <div style={{color:'red',textAlign:'center'}} >
                    <span className="glyphicon glyphicon-remove-sign" aria-hidden="true"></span>Refuse
                </div> 
        }
    }

    const gliphiconCashback = function gliphicon(e){
        if (e == 1)  {
           return  <div style={{color:'green',textAlign:'center'}} >
                        <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>Valide
                   </div> 

        }else if ( e == 0 ) {
            return <div style={{color:'#aaa',textAlign:'center'}} >
                       <span className="glyphicon glyphicon-time" aria-hidden="true"></span>En attente
                   </div> 
        }else if (e == 2) {
            return <div style={{color:'red',textAlign:'center'}} >
                    <span className="glyphicon glyphicon-remove-sign" aria-hidden="true"></span>Refuse
                </div> 
        }
    }

    const onglet= function onglet(a){
     
        setstopx(0) 
        setstopy(0);
        setstopz(0);

        for(var i =0;i < document.getElementsByClassName('onglet').length;i++){
            document.getElementsByClassName('onglet')[i].classList='onglet';
        }
    
        for(var i =0;i < document.getElementsByClassName('cashbackPromo-content').length;i++){
            document.getElementsByClassName('cashbackPromo-content')[i].classList='cashbackPromo-content';
        }
    
        document.getElementById('on-'+a).classList.add('active-cashbackPromo');
        document.getElementById(''+a).classList.add('cashbackPromo-content-block');

        if(a+'' === 'mission'){
       
                if(stopy === 0){
                    getMission();
                }
          
        }else if(a+'' === 'click'){
                if(stopx === 0){
                    getClick();
                }
        }else if(a+'' === 'cashback_v'){
                if(stopz === 0){
                    getCashback();
                }
        }

    }

    const loaderClick = function loaderClick(){
        if(stopx === 1){
            return DataMissionClick();
        }else{
            return <div>
                <Empiler />
                <Empiler />
                <Empiler />
            </div>
        }
    }
    const loaderMission = function loaderMission(){
        if(stopy === 1){
            return DataMissionClick();
        }else{
            return <div>
                <Empiler />
                <Empiler />
                <Empiler />
            </div>
        }
    }
    const loaderCashback = function loaderCashback(){
        if(stopz === 1){
            return Datacashback()
        }else{
            return <div>
                <Empiler />
                <Empiler />
                <Empiler />
            </div>
        }
    }

    const element= function(){

        if(stop === 1){
            return  <div className="container-view-all">
                        <div className="row">

                         <div className="col-md-4 img-view">
                            <Menu />
                        </div>

                        <div className="col-md-8 contennt-titre-view">
                                <div className='money'>
                                   <h1>
                                       {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(cookies._lo.argent*1)}
                                   </h1>
                                </div>

                                        <div className='tableau-de-bord-title'>
                                            <ul>
                                                <li id='on-cashback_v' onClick={()=>{ onglet('cashback_v') }}  className='onglet active-cashbackPromo'>
                                                    Mes cashbacks
                                                </li>
                                                <li id='on-mission' onClick={()=>{ onglet('mission') }} className='onglet' >
                                                    Mission
                                                </li>
                                                <li id='on-click' onClick={()=>{ onglet('click') }} className='onglet' >
                                                    click
                                                    
                                                </li>
                                            </ul>
                                        </div>

                                        <div id='mission'  className='cashbackPromo-content'  >
                                            {loaderMission()}
                                        </div>

                                        <div id='click' className='cashbackPromo-content'  >
                                            {loaderClick()}
                                        </div>

                                        <div id='cashback_v' className='cashbackPromo-content cashbackPromo-content-block'  >
                                            {loaderCashback()}
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
                                    <div className="col-md-8 contennt-titre-view">
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
                    <Footer />
                </div>

            </div>  
        ); 
  }
export default AddSousC;
