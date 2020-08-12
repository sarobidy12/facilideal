import React , {useEffect,useState} from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import 'moment/locale/fr';
import localhost from '../../../_config';
import {Link} from 'react-router-dom'; 

const Recent=()=>{
    
    const [dataR,setData]=useState([]);
    const [stopSend,setStopSend]=useState(0);
  
    useEffect(()=>{
         getData();
    })

    const getData= function getData(){

        let formData= new FormData();
        formData.append("text","ko");
        const url= localhost+'/controleur.php?p=GetRecent';
        axios.post(url,formData)
        .then((res)=>{

            setStopSend(1);
            if(stopSend == 0){
                 setData(res.data);
            }
             
        })
    }

    const  WatsUrl = (e) => {
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

      const  BoutiqueView=()=>{

        var BoutiqueAll = [];
    
        if (0 < dataR.length) {
          for (var i = 0; i < dataR.length; i++) {
            BoutiqueAll.push(
              <li>
                <Link
                  to={
                    "/cashbackAndCoupons/" +
                    WatsUrl(dataR[i].nom)
                  }
                >
                    <div className='view-cashback-acceuille'>
                        <center>
                            <img src={dataR[i].url_img}/>
                            <h3>
                                {dataR[i].nom}
                            </h3>
                            <div className='view-link-suggestion'>
                                <strike>
                                    {dataR[i].Ancien+''}
                                </strike>
                                <b>
                                    {dataR[i].Nouveaux+''}
                                    <span class="glyphicon glyphicon-circle-arrow-up" aria-hidden="true"></span>
                                </b>
                                {date(dataR[i].Nouveaux)}
                            </div>
                        </center>
    
                    </div>
                </Link>
              </li>
            );
          }
    
          return (<div className='view_home'>
                        {BoutiqueAll}
                    </div>
          );
        } else {
          return <h2>Aucune Magasin pour le moment</h2>;
        }
      };

    const date=(e)=>{
        var now=new Date(); // date actuelle
        var later=new Date(e); // premier janvier 2013
        var result=later.getTime()-now.getTime(); // différence en millisecondes depuis le premier janvier 1970 (voir getTime() pour mieux comprendre)
        var jours=parseInt(result/86400000);
    
        if(jours < 10){
            return <div style={{color:'red'}}>
                        <span class="glyphicon glyphicon-time" aria-hidden="true"></span>Expire <Moment fromNow>{' '+e}</Moment>
                    </div>
        }else{
            return <div style={{color:'green'}}>
                        <span class="glyphicon glyphicon-time" aria-hidden="true"></span>Expire <Moment fromNow>{' '+e}</Moment>
                   </div>
        }
      }
    

    const result=()=>{

        if(stopSend == 1){
                return  BoutiqueView();
        }else{
                return <div id='loader-cashback'>
                            <img src='/img/loader1.gif'/>
                        </div>
        }

    }
    
    return (
            <div> 
                <div className='container'>
                    {result()}
                </div>
                        
            </div>
        ); 
  }
export default Recent;

