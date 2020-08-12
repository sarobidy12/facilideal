import React , {  useEffect,useState }from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from "react-cookie";
import localhost from '../../_config'
import Empiler from "../cashback/loader/empiler";
import MetaTags from 'react-meta-tags';

const Mission=()=>{
        
    const [stop,setStop] = useState(0);
    const [cookies, setCookie] = useCookies(null);
    const [responseData, setResponseData] = useState([]);
    const [responseDataHisto, setResponseDataHisto] = useState([]);
        
    useEffect(()=>{
     
        if(stop ===0){
            setTimeout(()=>{
                getFindData();
            },600)
        }

    },[]);

    const RestQuota= function RestQuota(a,e){

        var data=[];

        for(var i=0; i< responseDataHisto.length;i++){
            if(responseDataHisto[i].idOffre === e && responseDataHisto[i].idUser === cookies._lo.id){
                data.push(responseDataHisto[i]);
            }

        }

        return a - data.length

    }

    const getFindData = function getFindData(){
        
        setResponseData([]);
        setResponseDataHisto([]);
        let formData= new FormData();
        formData.append("text",JSON.stringify(cookies._lo.id));
        const url= localhost+'/controleur.php?p=FindMission'; 
        axios.post(url,formData)
            .then((res)=>{
                setResponseData(res.data[0]);
                setResponseDataHisto(res.data[1]);
                setStop(1);
            });

    }
    
    const addHistorique= function addHistorique(e,id){

        setStop(0);

        id.preventDefault();
            window.open(e[2]);
                var data =[
                    cookies._lo.id,
                    'mission',
                    e[0],
                    e[1],
                ]

                let formData= new FormData();
                formData.append("text",JSON.stringify(data));
                const url= localhost+'/controleur.php?p=addHistorique'; 
                axios.post(url,formData)
                    .then((res)=>{
                        if(res.data === 'add-histo-success'){
                            getFindData();
                        }
                    });
    }

    const responseAll= function responseAll(){

        var data=[];
        var prenium=[];

        for(var i=0;i < responseData.length ;i++){

            if(responseData[i].actif*1 === 1){

                if(responseData[i].premium*1 === 1){

                    prenium.push(<div className='all-mission'>
                        <ul>
                            <li>
                                {responseData[i].nom}
                            </li>
                            <li>
                                <div className='div-success'>
                                    Premium
                                </div>
                            </li>
                            <li>
                                {responseData[i].remuneration}
                            </li>
                            <li>
                             {RestQuota(responseData[i].quota,responseData[i].id)}<span class="glyphicon glyphicon-tag" aria-hidden="true"></span>
                            </li>
                            <li>
                                {buttonClique(RestQuota(responseData[i].quota,responseData[i].id),responseData[i].id,responseData[i].remuneration,responseData[i].url)}
                            </li>
                        </ul>
                    </div>)
                }else{

                    data.push(<div className='all-mission'>
                        <ul>
                            <li>
                                {responseData[i].nom}
                            </li>
                            <li>
                                <div className='div-no-prenium'>
                                    Premium
                                </div>
                            </li>
                            <li>
                                {responseData[i].remuneration}
                            </li>
                            <li>
                                 {RestQuota(responseData[i].quota,responseData[i].id)}<span class="glyphicon glyphicon-tag" aria-hidden="true"></span>
                            </li>
                            <li> 
                            
                                {buttonClique(RestQuota(responseData[i].quota,responseData[i].id),responseData[i].id,responseData[i].remuneration,responseData[i].url)}
                            </li>
                        </ul>
                    </div>)
                    
                }
            }
         
        }

        

        return <div>
                <div className='prenium'>
                    {prenium}
                </div>
                <div className='prenium'>
                    {data}
                </div>
            </div>;
    }

    const buttonClique= function buttonClique(e,id,remuneration,url){

        if(e >0){
            return  <button className='btn-click-mission' onClick={addHistorique.bind(this,[id,remuneration,url])}>
                        Clique ici
                        </button>
        }
    }
    const data = function data(){

        if (stop === 1) {

            return  <div>
                        {responseAll()}
                    </div>  
    
        }else{

            return   <div>
                            <Empiler />
                            <Empiler />
                            <Empiler />
                    </div>   

        }
    };
    return (
            <div> 
                <MetaTags>
                    <title> Mission</title>
                </MetaTags>
                <div id='mission'>
                    <div id="hero-cashack">
                        <div id="row-hero">
                            <div className="inline-block img-view"  data-aos='fade-in'>
                                <img src='/img/Mission.png'/>
                            </div>
                            <div className="inline-block contennt-titre-view"  data-aos='fade-in'>
                                <h1>
                                    Mission
                                </h1>
                            </div>
                        </div>

                <div className="container-view-all">

                            <div className="inline-block img-view"  data-aos='fade-in'>
                                    <div className="description-content-mission">
                                        Les missions avec des adresses emails jetables sont INTERDITES ! Celui qui utilise des adreses email jetable seront banni. Les adresse non autorisé ( gmx,netcourrier,trashmail etc)
                                        Tout les membres qui effecturons l'offres LISTEOO j'offre un bonus de 1,50€ toute les 10 offres validées
                                        Participez aux offres présentes ci-dessous et gagnez des € euros.
                                    </div>
                            </div>

                            <div className="inline-block contennt-titre-view">
                                        <div className='all-mission-title'>
                                            <ul>
                                                <li>
                                                    Nom
                                                </li>
                                                <li>

                                                </li>
                                                <li>
                                                    Renumeration
                                                </li>
                                                <li>
                                                    Ticket
                                                </li>
                                                <li>
                                                    
                                                </li>
                                            </ul>
                                        </div>
                                        {data()}
                            </div>
                    </div>
                </div>
            </div>
        </div>

        ); 
  }
export default Mission;

