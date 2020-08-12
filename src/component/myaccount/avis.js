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

const AddSousC=(data)=>{

    const [mdp,setmdp] = useState(false);
    const [modif,setmodif] = useState(false);
    const [stop,setStop] = useState(0);
    const [cookies, setCookie] = useCookies(null);

    useEffect(()=>{
        setTimeout(()=>{
            setStop(1);
        },600);

        for(var i =0;i < document.getElementsByClassName('allStart').length ;i++){

            document.getElementsByClassName('allStart')[i].addEventListener("mouseover",function(){
                for(var i =0;i < this.getAttribute("id") ;i++){
                    document.getElementsByClassName('allStart')[i].style["color"] = 'rgba(255, 255, 0, 0.383)';
                }
            }, false);

            document.getElementsByClassName('allStart')[i].addEventListener("mouseout",function(){
                for(var i =0;i < document.getElementsByClassName('allStart').length ;i++){

                    if(document.getElementsByClassName('allStart')[i].style["color"] != 'yellow'){
                        document.getElementsByClassName('allStart')[i].style["color"] = '#aaa';
                    }

                }
            }, false);
            
            document.getElementsByClassName('allStart')[i].addEventListener("click",function(){
                document.getElementById('start').value =this.getAttribute("id")
                  for(var i =0;i < document.getElementsByClassName('allStart').length ;i++){
                    document.getElementsByClassName('allStart')[i].style["color"] = '#aaa';
                }
                for(var i =0;i < this.getAttribute("id") ;i++){
                    document.getElementsByClassName('allStart')[i].style["color"] = 'yellow';
                }
            }, false)

        }
    })
 
    const submit= function submit(e){

        setmodif(true);
        e.preventDefault();

        var data=[
            cookies._lo.id,
            cookies._lo.nom+' '+ cookies._lo.nom,
            document.getElementById('start').value,
            document.getElementById('avis').value,
        ];
   
        let formData= new FormData();
        formData.append("text",JSON.stringify(data));
        const url= localhost+'/controleur.php?p=addAvis'; 
        axios.post(url,formData)
        .then((res)=>{

                if(res.data === 'add-histo-success'){
                    document.getElementById('response-message-users').style.display='block';
                    document.getElementById('response-message-users').style.backgroundColor='green';
                    document.getElementById('response-message-users').innerHTML=" <span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>Votre avis à bien été ajouter";
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

  
    const element= function(){

        if(stop === 1){
            return  <div className="container-view-all">
                        <div className="inline-block img-view">
                            <Menu />
                        </div>
                        <div className="inline-block contennt-titre-view">
                            <div id='myInforation'>
                                    <br/>
                                    <h1>
                                    <span class="glyphicon glyphicon-comment" aria-hidden="true"></span>
                                    laisser un avis
                                    </h1>

                                    <div className='content-start'>
                                        <h3>
                                        
                                        </h3>
                                        <ul>
                                            <li id='1' className='allStart'>
                                                <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
                                            </li>
                                            
                                            <li id='2' className='allStart'>
                                                <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
                                            </li>
                                            
                                            <li id='3' className='allStart'>
                                                <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
                                            </li>
                                            
                                            <li id='4' className='allStart'>
                                                <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
                                            </li>
                                            
                                            <li id='5' className='allStart'>
                                                <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
                                            </li>
                                            
                                            <li id='6' className='allStart'>
                                                <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
                                            </li>
                                        </ul>
                                        <form method='POST' onSubmit={(e)=>{submit(e)}}>
                                            <textarea  placeholder =' laisser un avis' id='avis'></textarea>
                                            <input type='hidden' id='start' value='' />
                                            {buttonMdp()}
                                        </form>
                                    
                                    </div>
                            </div>
                        </div>

                    </div>

        }else{
            
            return  <div className="container-view-all">
                        <div className="inline-block img-view">
                            <Menu />
                        </div>
                        <div className="inline-block contennt-titre-view">
                            <Empiler />
                            <Empiler />
                            <Empiler />
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
                </div>
 <div id='response-message-users'>
                    </div>
            </div>  
        ); 
  }
export default AddSousC;

