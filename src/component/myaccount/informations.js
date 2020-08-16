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

    const [mdp,setmdp] = useState(false);
    const [modif,setmodif] = useState(false);
    const [stop,setStop] = useState(0);
    const [cookies, setCookie] = useCookies(null);

    useEffect(()=>{
        setTimeout(()=>{
            setStop(1);
        },600);

       
    })
 
    const submit= function submit(e){
        setmodif(true);
        e.preventDefault();

        var data=[
            document.getElementById('email').value,
            document.getElementById('nom').value,
            document.getElementById('prenom').value,
            document.getElementById('adresse').value,
            document.getElementById('ville').value,
            document.getElementById('codePostal').value,
            document.getElementById('pays').value,
            document.getElementById('telephonne').value,
            cookies._lo.id
        ]

        let formData= new FormData();
        formData.append("text",JSON.stringify(data));
        const url= localhost+'/controleur.php?p=mofifie_usera'; 
        axios.post(url,formData)
        .then((res)=>{
                if(res.data === 'update-success-users'){
                    document.getElementById('response-message-users').style.display='block';
                    document.getElementById('response-message-users').style.backgroundColor='green';
                    document.getElementById('response-message-users').innerHTML=" <span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>Vos informations à bien été modifier";
                    setTimeout(()=>{
                        if(document.getElementById('response-message-users')){
                            setmodif(false);
                            document.getElementById('response-message-users').style.display='none';
                        }
                    },2000)
               
                }
        });

      

    }

    const buttonMdp= function buttonMdp(){
        if(mdp === false){
            return  <button>
                        Appliquer les modifications
                    </button>
        }else{
            return <button disabled style={{backgroundColor:'rgba(2, 110, 242, 0.445)'}}>
                        chargmenet...
                    </button>
        }
    } 

    
    const buttonModif= function buttonModif(){
        if(modif === false){
            return  <button>
                        Appliquer les modifications
                    </button>
        }else{
            return <button disabled style={{backgroundColor:'rgba(2, 110, 242, 0.445)'}}>
                        chargmenet...
                    </button>
        }
    } 

    const modifierMotdepasse= function modifierMotdepasse(e){
        e.preventDefault();
        setmdp(true);
     
        if(document.getElementById('mdp2').value ===  document.getElementById('mdp1').value){

            if(document.getElementById('mdp1').value.length > 5){

                document.querySelector('.motdepasse1 label').style['color']='#AAA';
                document.querySelector('.motdepasse1 input').style['color']='#AAA';
                document.querySelector('.motdepasse2 label').style['color']='#AAA';
                document.querySelector('.motdepasse2 input').style['color']='#AAA';
                document.getElementById('messageMotDepass').innerHTML='<b>LES MOTS DE PASSE SONT TROP COURT AU MOINS 6 CARRACTERE </b> ';
                document.getElementById('messageMotDepass').style.display='none';

                var data =[
                    document.getElementById('mdp1').value,
                    cookies._lo.id
                ];
        
                let formData= new FormData();
                formData.append("text",JSON.stringify(data));
                const url= localhost+'/controleur.php?p=mofifie_mdp'; 
                axios.post(url,formData)
                .then((res)=>{

                        if(res.data === 'modification-mdp-success'){

                            document.getElementById('response-message-users').style.display='block';
                            document.getElementById('response-message-users').style.backgroundColor='green';
                            document.getElementById('response-message-users').innerHTML=" <span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>Les mots de passe à bien été modifier";
                      
                            document.querySelector('.motdepasse1 label').style['color']='green'
                            document.querySelector('.motdepasse1 input').style['color']='green'
                            document.querySelector('.motdepasse2 label').style['color']='green'
                            document.querySelector('.motdepasse2 input').style['color']='green'
                            document.getElementById('messageMotDepass').innerHTML='<b>Les mots de passe à bien été modifier </b> ';
                        
                           
                        }else{
                            document.getElementById('response-message-users').style.display='block';
                            document.getElementById('response-message-users').style.backgroundColor='red';
                            document.getElementById('response-message-users').innerHTML="une erreur est survenu";
                        }
                });
                
                setTimeout(()=>{
                    if(document.getElementById('response-message-users')){
                        setmdp(false);
     
                        document.getElementById('response-message-users').style.display='none';
                    }
                },2000)

            }else{
                document.querySelector('.motdepasse1 label').style['color']='red'
                document.querySelector('.motdepasse1 input').style['color']='red'
                document.querySelector('.motdepasse2 label').style['color']='red'
                document.querySelector('.motdepasse2 input').style['color']='red'
                document.getElementById('messageMotDepass').innerHTML='<b>LES MOTS DE PASSE SONT TROP COURT AU MOINS 6 CARRACTERE </b> ';
                setmdp(false);
           
            }    

        }else{
            document.querySelector('.motdepasse1 label').style['color']='red'
            document.querySelector('.motdepasse1 input').style['color']='red'
            document.querySelector('.motdepasse2 label').style['color']='red'
            document.querySelector('.motdepasse2 input').style['color']='red'
            document.getElementById('messageMotDepass').innerHTML='<b>LES MOTS DE PASSE NE SONT PAS  IDENTIQUE </b> ';
            setmdp(false);
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
                            <div id='myInforation'>

                            <form method="POST" onSubmit={(e)=>{modifierMotdepasse(e)}}>
                                    <h1>
                                        <span class="glyphicon glyphicon-lock" aria-hidden="true"></span>
                                        modification de mot de passe
                                    </h1>
                                <div className='row'>
                                  
                                    <div class="col-md-6 motdepasse1" >
                                            <label for="mdp1">Nouveau mot de passe:</label>
                                            <input type="password"  id="mdp1" name="mdp1" />
                                    </div>

                                    <div class="col-md-6 motdepasse2">
                                            <label for="mdp2">comfirme le nouveau mot de passe :</label>
                                            <input type="password" id="mdp2" name="mdp2"/>
                                    </div>

                                </div>
                                <div id='messageMotDepass' style={{textAlign:'center',fontSize:'2vh',margin:'1vh 0',color:'red'}}>

                                </div>
                                    
                                {buttonMdp()}

                            </form>
                         
                            <form method="POST" onSubmit={(e)=>{submit(e)}}>
                                <div className='row'>
                                    <h1>
                                    <span class="glyphicon glyphicon-user" aria-hidden="true"></span>
                                    Completez mes informations
                                    </h1>
                                    <div class="col-md-6" >
                                        
                                            <label for="nom">Nom de famille :</label>
                                            <input type="text"  id="nom" defaultValue={cookies._lo.nom} name="nom" placeholder="Entrez le nom de famille"  required="required"/>
                                        
                                            <label for="prenom">Prénom :</label>
                                            <input type="text" id="prenom"  name="prenom" defaultValue={cookies._lo.prenom} placeholder="Entrez le prénom"  required="required"/>
                                       
                                            <label for="email">Adresse e-mail :</label>
                                            <input type="email" id="email"  name="email" defaultValue={cookies._lo.email} placeholder="Entrez l'adresse e-mail"  required="required"/>
                                  
                                            <label for="telephonne">Numero telephonne :</label>
                                            <input type="number" step="1" id="telephonne" name="telephonne" defaultValue={cookies._lo.telephone} placeholder="Entrez le Numero telephonne" />

                                    </div>
                                    <div class="col-md-6" >

                                            <label for="ville">pays :</label>
                                            <input type="text" id="pays" name="pays" defaultValue={cookies._lo.pays}  placeholder="Entrez votre pays" />
                                       
                                            <label for="ville">Ville :</label>
                                            <input type="text" id="ville" name="ville" defaultValue={cookies._lo.ville}  placeholder="Entrez la ville" />
                                       
                                            <label for="adresse">Adresse complète :</label>
                                            <input type="text" id="adresse" defaultValue={cookies._lo.adresse} name="adresse" placeholder="Entrez l'adresse complète (Rue + nr.)" />
                                       
                                            <label for="codePostal">Code postal :</label>
                                            <input type="number" step="1" id id="codePostal" name="codePostal" defaultValue={cookies._lo.codePostal}  placeholder="Entrez le code postal" />
                                         
                                    </div>
                                </div>
                                {buttonModif()}
                            </form>
                              
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
                <Footer/>

                </div>

 <div id='response-message-users'>
                    </div>
            </div>  
        ); 
  }
export default AddSousC;

