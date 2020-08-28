import React , {Component, useEffect,useState }from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { withCookies, Cookies } from 'react-cookie';
import localhost from '../../_config'
import Empiler from "../cashback/loader/empiler";
import MetaTags from 'react-meta-tags';
import Footer from '../footer/index';
import parse from 'html-react-parser';
import { findDOMNode } from 'react-dom';
import $ from 'jquery';
class Mission extends Component {

    constructor(props) {
        super(props);
        this.state = {
          stop: 0,
          responseData: [],
          responseDataHisto: [],
          ipp: null,
          open:false
        };
      }
 
    
      componentWillMount=()=>{
     
        if(this.state.stop ===0){
            setTimeout(()=>{
                this.getFindData();
            },600)
        }
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
       window.addEventListener('scroll',function(){

           if(document.getElementById('hero-all') && 
               document.getElementById('all-container') &&
               document.getElementById('hero-all-container')    
             ){
      
             if(window.screen.width <= 414){
      
                   if(window.pageYOffset > 10){
                     document.getElementById('hero-all').style.height= '10vh';
                     document.getElementById('hero-all').style.position='fixed';
                     document.getElementById('all-container').style.top='20vh';
                     document.getElementById('hero-all-container').style.top='60%';
                   }else{  
                     document.getElementById('hero-all').style.position='relative';
                     document.getElementById('hero-all').style.height='50vh';
                     document.getElementById('all-container').style.top='0';
                     document.getElementById('hero-all-container').style.top='30%';
                   }

            }else{
      
             if(window.pageYOffset > 10){
               document.getElementById('hero-all').style.height= '20vh';
               document.getElementById('hero-all').style.position='fixed';
               document.getElementById('all-container').style.top='35vh'; 
               document.getElementById('hero-all-container').style.top='55%';
             }else{  
               document.getElementById('hero-all').style.position='relative';
               document.getElementById('hero-all').style.height='35vh';
               document.getElementById('all-container').style.top='0';
               document.getElementById('hero-all-container').style.top='30%';
             }
      
            }
           }
         })

     }

    RestQuota= (e)=>{

        const { cookies } = this.props;
        
        var data=[];

            for(var i=0; i<  this.state.responseDataHisto.length;i++){
                if( this.state.responseDataHisto[i].idOffre === e && 
                    this.state.responseDataHisto[i].idUser === cookies.get('_lo').id && 
                    this.state.responseDataHisto[i].ip === this.state.ipp
                ){
                    data.push(this.state.responseDataHisto[i]);
                }
            }

                if(data.length === 0){
                    return true;
                }else{
                    return false;
                }

    }

    getFindData = function getFindData(){
        
        const { cookies } = this.props;

        this.setState({
            responseData: [],
            responseDataHisto:[]
        })

        let formData= new FormData();
        formData.append("text",JSON.stringify(cookies.get('_lo').id));
        const url= localhost+'/controleur.php?p=FindMission'; 
        axios.post(url,formData)
            .then((res)=>{
                this.setState({
                    stop: 1,
                    responseData: res.data[0],
                    responseDataHisto: res.data[1],
                    ipp: res.data[2]
                    
                })
            });

    }
    
    addHistorique= function addHistorique(e,id){
    const { cookies } = this.props;
    
        this.setState({
            stop: 0,
        })

        id.preventDefault();
            window.open(e[2]);
                var data =[
                    cookies.get('_lo').id,
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
                            this.getFindData();
                        }
                    });
    }

    openDescription=(e,id)=>{

        id.preventDefault();

            const el= findDOMNode(document.getElementById('secri_mission_'+e));

             this.setState({
                 open:true
             })

             document.getElementById('gliph_'+e).classList.toggle('rotate');

                $(el).slideToggle();
    }

    

    componentDidUpdate=()=>{
        if(this.state.open === false){
            for(var i=0;i< this.state.responseData.length;i++){
                if(document.getElementById('secri_mission_'+this.state.responseData[i].id)){
                    $(findDOMNode(document.getElementById('secri_mission_'+this.state.responseData[i].id))).slideUp(1);
                }
            }
       }
    }


    responseAll= function responseAll(){
        const { cookies } = this.props;

        var data=[];
        var prenium=[];

        console.log(this.state.responseData);
        
        for(var i=0;i < this.state.responseData.length ;i++){

            if(this.RestQuota( this.state.responseData[i].id) &&  this.state.responseData[i].actif*1 === 1){

                if(this.state.responseData[i].premium === "1" &&
                 cookies.get('_lo').premium === "1"){

                    prenium.push(<div >
                        <ul className='all-mission-content-ul'>
                            <li>
                                { this.state.responseData[i].nom}
                            </li>
                            <li>
                                <div className='div-success'>
                                    Premium
                                </div>
                            </li>
                            <li>
                                {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(  this.state.responseData[i].remuneration)} 
                            </li>
                            <li>
                                {this.buttonClique( this.state.responseData[i].id, this.state.responseData[i].remuneration, this.state.responseData[i].url)}
                            </li>
                        </ul>
                        <div className='mission-description'>
                            <button  onClick={this.openDescription.bind(this, this.state.responseData[i].id)}>Voir les details <span id={'gliph_'+this.state.responseData[i].id} class="glyphicon glyphicon-plus" naria-hidden="true"></span></button>
                            <div id={'secri_mission_'+ this.state.responseData[i].id} className='description_mission'>
                                    {parse( this.state.responseData[i].description)}
                            </div>
                        </div>
                    </div>)

                }else if(
                 this.state.responseData[i].premium === "0"  
                 ){

                    data.push(
                                <div className='all-mission-content'>

                                    <ul className='all-mission-content-ul'>

                                        <li>
                                            <h1>
                                                { this.state.responseData[i].nom}
                                            </h1>
                                        </li>

                                        <li>
                                            
                                        </li>

                                        <li>
                                            {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format( this.state.responseData[i].remuneration)} 
                                        </li>

                                        <li> 
                                            {
                                            this.buttonClique(
                                                this.state.responseData[i].id,
                                                this.state.responseData[i].remuneration,
                                                this.state.responseData[i].url
                                                )
                                            }
                                        </li>

                                    </ul>

                                    <div className='mission-description'>

                                        <button  onClick={this.openDescription.bind(this, this.state.responseData[i].id)}>Voir les details <span  id={'gliph_'+this.state.responseData[i].id} class="glyphicon glyphicon-plus" naria-hidden="true"></span> </button>
                                      
                                            <div id={'secri_mission_'+this.state.responseData[i].id} className='description_mission'>
                                                {parse( this.state.responseData[i].description)}
                                            </div>

                                    </div>

                             </div>
                             )
                    
                }
            }
         
        }

        
        if(prenium.length > 0 || data.length > 0){

            return <div>
                        <div className='all-mission-title'>
                            <ul><li>Nom</li><li></li><li>Renumeration</li><li></li></ul>
                        </div>
                        <div className='prenium'>
                            {prenium}
                        </div>
                        <div className='prenium'>
                            {data}
                        </div>
                </div>;
        }else{
            return <div className='mission-null'>
                        <p>Aucune mission disponible , revener un peu plus tard</p>
                    </div>
        }
                
    }


    buttonClique= function buttonClique(id,remuneration,url){

            return  <button className='btn-click-mission' onClick={this.addHistorique.bind(this,[id,remuneration,url])}>
                        Participez
                    </button>
    }
    data =()=>{

        if (this.state.stop === 1) {

            return  <div>
                        {this.responseAll()}
                    </div>  
    
        }else{

            return  <div>
                            <Empiler />
                            <Empiler />
                            <Empiler />
                    </div>   

        }
    };
    
  render() {

    return (
            <div style={{width:'100%',overflowX:'hidden',overflowY:'hidden'}}> 
                <MetaTags>
                    <title> Mission</title>
                    <meta property="og:type"          content="website" />
                    <meta property="og:title"         content="Mission" />
                    <meta property="og:description"   content="Les missions avec des adresses emails jetables sont INTERDITES ! Celui qui utilise des adreses email jetable seront banni. Les adresse non autorisé ( gmx,netcourrier,trashmail etc)Tout les membres qui effecturons l'offres LISTEOO j'offre un bonus de 1,50€ toute les 10 offres validéesParticipez aux offres présentes ci-dessous et gagnez des € euros." />
                    <meta property="og:image"         content="http://facilodeal.com/img/Mission.ng" />
                    <meta property="og:image:width"         content="1200" />
                    <meta property="og:image:height"         content="630" />
                    <meta property="og:image:width"         content="1200" />
                    <meta property="og:image:height"         content="630" />
                </MetaTags>
                <div id='hero-all'>
                    <div id='hero-all-container'>

                                <h1>
                                    Mission
                                </h1>
                                    <p>
                                        Les missions avec des adresses emails jetables sont INTERDITES ! Celui qui utilise des adreses email jetable seront banni. Les adresse non autorisé ( gmx,netcourrier,trashmail etc)
                                        Tout les membres qui effecturons l'offres LISTEOO j'offre un bonus de 1,50€ toute les 10 offres validées
                                        Participez aux offres présentes ci-dessous et gagnez des € euros.
                                    </p>
                    </div>
                </div>
                <div id='all-container'>
                    <div className='mission-container'>
                        
                            <div>
                                {this.data()}
                            </div>
                    </div>
              
                </div>
            <Footer />

        </div>

        ); 
  }
}
export default withCookies(Mission);

