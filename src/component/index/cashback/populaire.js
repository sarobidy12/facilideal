import React , {useEffect,useState} from 'react';
import Moment from 'react-moment';
import 'moment/locale/fr';
import localhost from '../../../_config';
import axios from 'axios';

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
        const url= localhost+'/controleur.php?p=GetPopulaire';
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
                    <div className='view-cashback-acceuille' data-aos='fade-up'>
                        <center>
                            <img src={dataR[i].url_img}/>
                            <div className='view-link-suggestion'>
                                <strike>
                                    {dataR[i].Ancien+''}
                                </strike>
                                <b>
                                    {dataR[i].Nouveaux+''}
                                    <span class="glyphicon glyphicon-circle-arrow-up" aria-hidden="true"></span>
                                </b>
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
                <div  >
                    {result()}
                </div>
                        
            </div>
        ); 
  }
export default Recent;

