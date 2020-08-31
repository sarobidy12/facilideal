import React , {useEffect,useState} from 'react';
import MetaTags from 'react-meta-tags';
import axios from 'axios';
import localhost from '../../../_config';
import { useCookies } from "react-cookie";
import Moment from 'react-moment';
import 'moment/locale/fr';
import parse from 'html-react-parser';
import Empiler from '../loader/empiler';

const AddSousC=(data)=>{

    const [stop,setStop]=useState(0);
    const [bool,setboll]=useState(true);
    const [cookies, setCookie] = useCookies(null);
    const [idNow] =useState(data.data);
    const [Add,setAdd]=useState([]);
    
    useEffect(()=>{

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

        if(stop === 0){
            FindData();
        }

    })

    const FindData = function FindData(){

        if(bool === true){
            let formData= new FormData();
            formData.append("text", JSON.stringify(idNow));
            const url= localhost+'/controleur.php?p=ViewAvisOne';
            axios.post(url,formData)
            .then((res)=>{
                      setAdd(res.data);
                      setTimeout(()=>{
                            if(document.getElementById('view_all_avis') && document.getElementById('btn_avis')){
                                document.getElementById('view_all_avis').style.overflowY='hidden';
                                document.getElementById('btn_avis').innerHTML='Voir tout les avis';
                            }
                            setStop(1);
                      },600);
            })
        }else{
            let formData= new FormData();
            formData.append("text", JSON.stringify(idNow));
            const url= localhost+'/controleur.php?p=ViewAvisAll';
            axios.post(url,formData)
            .then((res)=>{
                      setAdd(res.data);
                      setTimeout(()=>{
                        setStop(1);
                            document.getElementById('view_all_avis').style.overflowY='scroll';
                            document.getElementById('btn_avis').innerHTML='Reduire';
                        },600);
            })
        }
                

    }

    const submit = function submit (event){

        event.preventDefault();

        var data=[
            idNow,
            document.getElementById('avis').value,
            cookies._lo.id,
            cookies._lo.nom+' '+cookies._lo.prenom,
            document.getElementById('start').value
        ]
     
                  let formData= new FormData();
                  formData.append("text", JSON.stringify(data));
                  const url= localhost+'/controleur.php?p=addavis';
                  axios.post(url,formData)
                  .then((res)=>{
                    if(res.data === 'add-avis-success'){
                        document.getElementById('add').append(viewStart( document.getElementById('start').value));
                    }
                  })


    }

    const btn=function btn(){
        if(cookies._lo != null){
            return <div>
                <div className='content-start'>
                    <h3>
                     laisser un avis
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
                    <form method='POST' onSubmit={(e)=>{submit(e)}} style={{width:'100%'}}>
                        <textarea  placeholder =' laisser un avis' id='avis'></textarea>
                        <input type='hidden' id='start' value='' style={{width:'100%'}} />
                        <button>Commenter</button>
                    </form>
                  
                </div>
            </div>
        } 
    }


    const viewAvisAll=function viewAvisAll(){
        var element=[];
        for(var i=0;i < Add.length;i++){
            element.push(
                <div className='avis-content'>
                    <ul>
                        {viewStart(Add[i].nbr_start)}
                    </ul>
                    {date(Add[i].date_time)}

                    <h1>
                    {
                        Add[i].user_name+':'
                    }
                    </h1>
                    <p>
                    {
                        Add[i].avis
                    }
                    </p>
                </div>
            )
        }

        return element;
    }

    const dataLoader=()=>{
        if(stop === 1){
            return viewAvisAll();
        }else{
            return <div>
                    <Empiler/>
                    <Empiler/>
                </div>
        }
    }
    const date=(e)=>{
        var now=new Date(); // date actuelle
        var later=new Date(e); // premier janvier 2013
        var result=later.getTime()-now.getTime(); // différence en millisecondes depuis le premier janvier 1970 (voir getTime() pour mieux comprendre)
        var jours=parseInt(result/86400000);
    
        if(jours < 90){
            return <div >
                         avis publié <Moment fromNow>{' '+e}</Moment>
                    </div>
        }else{
            return  <b>avis publié le {e}</b>
        }
    }
    const viewAllavis=()=>{

        setStop(0);
        setboll(!bool);
       
    }

    const viewStart=function viewStart(e){

     var  element=[];
     for(var i=1;i <= 6;i++){
         if(i <= e){
            element.push(
                <li style={{color:'yellow'}}>
                <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
                </li>
            )
    
         }else{
            element.push(
                <li style={{color:'yellow'}}>
                <span className="glyphicon glyphicon-star-empty" aria-hidden="true"></span>
                </li>
            )
    
         }
     }

     return element;
        
    } 
    return (
            <div> 
                {btn()}
                <div id='add'>

                </div>
                        <div className='avis-all'>
                        <h2>
                                            {data.text[1]} avis sur <b>{data.text[0]}</b>
                                        </h2>
                                        <p>
                                            <b>{data.text[0]}</b> a reçu {data.text[1]} évaluations et obtenu la note moyenne de {data.text[2]}/5.
                                        </p>
                        </div>
                    <div id='view_all_avis'>
                    {dataLoader()}
                    </div>

                <button id='btn_avis' onClick={()=>{
                    viewAllavis()
                }}>
                    Voir touts les avis 
                </button>
            </div>  
        ); 
  }
export default AddSousC;

