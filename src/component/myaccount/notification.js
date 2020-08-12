import React , {useEffect,useState} from 'react';
import MetaTags from 'react-meta-tags';
import axios from 'axios';
import { useCookies } from "react-cookie";
import Moment from 'react-moment';
import 'moment/locale/fr';
import localhost from '../../_config'
import Empiler from "../cashback/loader/empiler";
import Menu from './menu';

const AddSousC=(data)=>{

const [stop,setStop] = useState(0);
const [cookies, setCookie] = useCookies(null);
const [notification, setNotification] = useState([]);

    useEffect(()=>{
     
        if(stop === 0){
            getFindData();
        }           

    })
 
    const getFindData = function getFindData(){

        let formData= new FormData();
        formData.append("text",JSON.stringify(cookies._lo.id));
        const url= localhost+'/controleur.php?p=getMyNotification'; 
        axios.post(url,formData)
        .then((res)=>{
            setNotification(res.data);
                setTimeout(()=>{
                    setStop(1);
                },600);
        });

    }  

    const gliphicon = function gliphicon(e){
        if (e == 1) {
           return  <div style={{color:'green',textAlign:'center'}} >
                        <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
                   </div> 

        } else if (e == 0) {
         return <div style={{color:'red',textAlign:'center'}} >
                    <span className="glyphicon glyphicon-remove-sign" aria-hidden="true"></span>
                </div> 
        }
    }

    const delNotificatio = function delNotificatio(){

        let formData= new FormData();
        formData.append("text",JSON.stringify(cookies._lo.id));
        const url= localhost+'/controleur.php?p=deleteNotification'; 
        axios.post(url,formData)
        .then((res)=>{

            console.log(res.data);
            if(res.data ==='delete-success'){
               //  document.getElementById('data_notif').innerHTML='<center><h2>Aucune notification</h2></center>'
                 setNotification([]);
            }
        });

    }

    const notificationAll=function notificationAll(){
        var data=[];

        if( notification.length > 0){


        for(var i=0;i< notification.length;i++){
            data.push(
                <ul className='only-notification'>
                        <li>
                            {gliphicon(notification[i].etat)}
                        </li>
                        <li>
                            <p>
                                {notification[i].message}
                            </p>
                        </li>
                        <li>
                           <p>
                               {notification[i].type}
                           </p> 
                        </li>
                        <li>
                           <p>
                               <i class="glyphicon glyphicon-time" aria-hidden="true"></i><Moment fromNow>{notification[i].data_c}</Moment>  
                           </p> 
                        </li>

                </ul>
            )
        }

        return data;
    }else{
        return <center><h2>Aucune notification</h2></center>
    }

    }


    const buttonDelete= function buttonDelete(){

        if( notification.length > 0){

            return   <button className='btn-del-notification' onClick={()=>{
                        delNotificatio()
                    }}>
                        <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
                        Effacer
                    </button>

        }
    }

    const element= function(){

        if(stop === 1){
            return  <div className="container-view-all">
                        <div className="inline-block img-view">
                            <Menu />
                        </div>
                        <div className="inline-block contennt-titre-view-users">
                            <h1>
                                Notification
                            </h1>
                            {buttonDelete()}
                            <div id='data_notif'>
                                {notificationAll()}
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

            </div>  
        ); 
  }
export default AddSousC;

