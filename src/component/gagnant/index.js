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

        window.addEventListener('scroll',function(){

            if(document.getElementById('hero-all') && 
                document.getElementById('all-container') &&
                document.getElementById('hero-all-container') &&
                document.getElementById('img-io')    

              ){
       
              if(window.screen.width <= 414){
       
                    if(window.pageYOffset > 10){
                      document.getElementById('hero-all').style.height= '10vh';
                      document.getElementById('hero-all').style.position='fixed';
                      document.getElementById('all-container').style.top='20vh';
                      document.getElementById('hero-all-container').style.top='60%';
                      document.getElementById('img-io').style.width='5vh'    

                    }else{  
                      document.getElementById('hero-all').style.position='relative';
                      document.getElementById('hero-all').style.height='50vh';
                      document.getElementById('all-container').style.top='0';
                      document.getElementById('hero-all-container').style.top='30%';
                      document.getElementById('img-io').style.width='13vh'    

                    }
 
             }else{
       
                    if(window.pageYOffset > 10){
                        document.getElementById('hero-all').style.height= '20vh';
                        document.getElementById('hero-all').style.position='fixed';
                        document.getElementById('all-container').style.top='35vh'; 
                        document.getElementById('hero-all-container').style.top='55%';
                        document.getElementById('img-io').style.width='5vh';    
                    }else{  
                        document.getElementById('hero-all').style.position='relative';
                        document.getElementById('hero-all').style.height='35vh';
                        document.getElementById('all-container').style.top='0';
                        document.getElementById('hero-all-container').style.top='30%';
                        document.getElementById('img-io').style.width='13vh';    
                    }
       
             }
            }
          })
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
            <div style={{width:'100%',overflowX:'hidden',overflowY:'hidden'}}> 

                <MetaTags>
                     <title>Gagnant</title>
                    <meta property="og:type"          content="website" />
                    <meta property="og:title"         content="Gagnant" />
                    <meta property="og:description"   content="Les Gagnants qui on recu de l'argent comfirmer par l'admin." />
                    <meta property="og:image"         content="http://facilodeal.com/img/winner.ng" />
                    <meta property="og:image:width"         content="1200" />
                    <meta property="og:image:height"         content="630" />
                    <meta property="og:image:width"         content="1200" />
                    <meta property="og:image:height"         content="630" />
                </MetaTags>
                

                <div id='hero-all'>
                    <div id='hero-all-container'>
                    <div className='titre-gangnat'>
                        <img src='/img/winner.png' id='img-io' style={{transition:'600ms'}} />       
                        <h1>
                            Les Gagnants    
                        </h1>             
                        </div> 
                    </div>
                </div>
                <div id='all-container'>

                    <div className='mission-container'>
                        
                            <div>
                                {loader()}
                            </div>
                    </div>
              
                </div>
                <Footer/>
                

            </div>
        ); 
  }
export default Gagnant;

