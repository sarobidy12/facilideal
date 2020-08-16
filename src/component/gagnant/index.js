import React , {useEffect,useState} from 'react';
import axios from 'axios';
import MetaTags from 'react-meta-tags';
import localhost from '../../_config';
import Empiler from "../cashback/loader/empiler";
import Moment from 'react-moment';
import 'moment/locale/fr';
import Footer from '../footer/index';

const Gagnant=()=>{

    const [stop3,setStop3]=useState(0);
    const [resData,setResDate]=useState([]); 

    useEffect(()=>{

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

        if(stop3 === 0){
            setelement(0);
        }
    })

    const setelement= function setelement(e){
         
            let formData= new FormData();
                formData.append("text",e);
                const url= localhost+'/controleur.php?p=AllGagnant'; 
                axios.post(url,formData)
                .then((res)=>{
                    
                       setResDate(res.data);

                            setTimeout(()=>{
                                setStop3(1);
                            },500);

                });

    }

    const setData = function setData(){
 
        var element=[];

            for(var i=0;i < resData.length;i++){
                    element.push( 
                        <div id={'del-'+resData[i].id} className='content-view-table row-gagnant'>
                                <div className='inline-table'></div>
                                <div className='inline-table' ><b>{resData[i].fullname}</b></div>
                                <div className='inline-table'><b  style={{width:'15vh',textAlign:'center'}}>{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(resData[i].prix)}</b></div>
                                <div className='inline-table' style={{width:'25vh'}}><b><span class="glyphicon glyphicon-time" aria-hidden="true"></span><Moment fromNow>{resData[i].date}</Moment></b></div>
                        </div>
                    )
                }       
                
                return <div className='ElementGagnant'>{element}</div> ;

    } 


 

    const loader= function loader(){
        if(stop3 === 1){
            return <div className="container-view-all">
                <div className='titre-gangnat'>
                        <img src='/img/winner.png'/>       
                        <h1>
                            Les Gagnants    
                        </h1>             
                </div>
                            {setData()}
                    </div>
        }else{
            return  <div className="container-view-all">
                            <Empiler />
                            <Empiler />
                            <Empiler />
                    </div> 
        }

    }
 
    return (
            <div> 

                <MetaTags>
                     <title>Gagnant</title>
                </MetaTags>
                
                <div className='boutique-view'>
                    {loader()}
                    <Footer/>
                </div>
                

            </div>
        ); 
  }
export default Gagnant;

