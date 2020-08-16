import React , {useEffect,useState} from 'react';
import MetaTags from 'react-meta-tags';
import axios from 'axios';
import { useCookies } from "react-cookie";
import Moment from 'react-moment';
import 'moment/locale/fr';
import parse from 'html-react-parser';
import localhost from '../../_config'
import Carre from "../cashback/loader/rarre";
import Long from "../cashback/loader/long";
import Empiler from "../cashback/loader/empiler";
import All_data from "../cashback/loader/all_data";
import { Link, Redirect } from 'react-router-dom';
import Menu from './menu';
import Footer from '../footer/index';

const AddSousC=(data)=>{

    const [stop,setStop] = useState(0);
    const [result,setResult] = useState(0);
    const [cookies, setCookie] = useCookies(null);

    useEffect(()=>{
            if(stop === 0){
                getFindData()
            }
    })
 
    const getFindData = function getFindData(){
        let formData= new FormData();
        formData.append("text",JSON.stringify(cookies._lo.id));
        const url= localhost+'/controleur.php?p=getMyparraaignageId'; 
        axios.post(url,formData)
        .then((res)=>{
            setResult(res.data);
            setTimeout(()=>{
                setStop(1);
            },600);
        });

    }  


    const viewParaign= function viewParaign()
        {
            if(result.length > 0){
                var i=[];
                for(var b=0;b < result.length ;b++){
                    i.push(
                        <ul>
                            <li>
                                { result[b].nom}
                            </li>
                            <li>
                                { result[b].prenom}
                            </li>
                            <li>
                            <span class="glyphicon glyphicon-time" aria-hidden="true"></span>   <Moment fromNow>{result[b].date_Inscription}</Moment> 
                            </li>

                        </ul>
                    )

                }
                return i;
            }else{

                return <h2>Vous n'avez parrainager aucun utilisateur</h2>
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
                            <div className='paraignage'>
                                <div className='row'>
                                    <div className='col-md-6'>  
                                        <h1>
                                            PARRAINAGE
                                        </h1>
                                        <p>
                                            Vous souhaitez inviter vos ami(e)s sur Multi-cadeaux et gagner plus d'argent ?
                                            Récupérez votre lien de parrainage ci-dessous et partagez-le un maximum.
                                            Chaque personne qui s'inscrit via votre lien devient automatiquement votre filleul et vous devenez son parrain. A chaque commande effectuée, vous toucherez 15% du montant de leur commande.
                                        </p>
                                    </div>
                                    <div className='col-md-6'>
                                        <img src='/img/paraign-add.png' />
                                    </div>
                                </div>

                            <input id="input-code"  value={'localhost/Parraignage/'+cookies._lo.prenom+'/'+cookies._lo.id} type="text"/>
                            <button id="copy" onClick={()=>{
                                document.getElementById('input-code').select();
                                document.getElementById('copy').innerHTML='<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>'
                                document.execCommand('copy')
                            }}><span class="glyphicon glyphicon-duplicate" aria-hidden="true"></span></button>
                        </div>
                        <h2>
                            Partagez sur 
                        </h2>

                            <button type="button" class="btn-facebook"><i class="fa fa-facebook"></i> Facebook</button>
                            <button type="button"class="btn-facebook"><i class="fa fa-twitter"></i> Twitter</button>
                            <a class='btn btn' href="mailto:?subject=Profite de 5 € de bienvenue avec mon code parrainage facilideal&amp;body=
                            Si comme moi tu veux récupérer une partie du montant de tes achats sur internet, inscris-toi sur facilideal avec mon code parrainage FbWnab, un bonus de bienvenue de 5€ sera immédiatement versé sur ton compte facilideal. 
                            Pour commencer à cumuler des euros rapidement, suis ce lien et inscris-toi, c'est gratuit :
                            ici
                            A très vite !." title="Share by Email">
                            Mail
                            </a>
                            <div className="view-paraignage">
                                    <h2>
                                        Mes parrainage
                                    </h2>
                                 {viewParaign()}
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

