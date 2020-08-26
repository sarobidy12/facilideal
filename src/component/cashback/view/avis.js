import React , {useEffect,useState} from 'react';
import MetaTags from 'react-meta-tags';
import axios from 'axios';
import localhost from '../../../_config';
import { useCookies } from "react-cookie";
import Moment from 'react-moment';
import 'moment/locale/fr';
import parse from 'html-react-parser';

const AddSousC=(data)=>{

    const [stop,setStop]=useState(0);
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

        console.log(data);
    })

    const FindData = function FindData(){

                  let formData= new FormData();
                  formData.append("text", JSON.stringify(idNow));
                  const url= localhost+'/controleur.php?p=ViewAvis';
                  axios.post(url,formData)
                  .then((res)=>{
                            setAdd(res.data);
                             setStop(1);
                  })

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
                    <form method='POST' onSubmit={(e)=>{submit(e)}}>
                        <textarea  placeholder =' laisser un avis' id='avis'></textarea>
                        <input type='hidden' id='start' value='' />
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
                    <h1>
                    {
                        Add[i].user_name
                    }
                    </h1>
                    <p>
                    {
                        Add[i].avis
                    }
                    </p>
                    {date(Add[i].date_time)}
                </div>
            )
        }

        return element;
    }

    const date=(e)=>{
        var now=new Date(); // date actuelle
        var later=new Date(e); // premier janvier 2013
        var result=later.getTime()-now.getTime(); // différence en millisecondes depuis le premier janvier 1970 (voir getTime() pour mieux comprendre)
        var jours=parseInt(result/86400000);
    
        if(jours < 90){
            return <div >
                        <span class="glyphicon glyphicon-time" aria-hidden="true"></span>Ecrit le <Moment fromNow>{' '+e}</Moment>
                    </div>
        }else{
            return  <b> <span class="glyphicon glyphicon-time" aria-hidden="true"></span>Ecrit le{e}</b>
        }
    }

    const viewStart=function viewStart(e){

     var  element=[];
     for(var i=0;i < 6;i++){
         if(i <= e){
            element.push(
                <li style={{color:'yellow'}}>
                <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
                </li>
            )
    
         }else{
            element.push(
                <li style={{color:'#aaa'}}>
                <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
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

                <h2>
                    {data.text[1]} avis  <b>{data.text[0]}</b>
                </h2>
                {viewAvisAll()}
            </div>  
        ); 
  }
export default AddSousC;

