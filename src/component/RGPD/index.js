import React , {useEffect,useState} from 'react';
import axios from 'axios';
import MetaTags from 'react-meta-tags';
import localhost from '../../_config';
import Empiler from "../cashback/loader/empiler";
import Moment from 'react-moment';
import 'moment/locale/fr';
import Footer from '../footer/index';
import parse from 'html-react-parser';

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
                const url= localhost+'/controleur.php?p=GetRgpd'; 
                axios.post(url,formData)
                .then((res)=>{
                    
                       setResDate(res.data.text);

                            setTimeout(()=>{
                                setStop3(1);
                            },500);

                });

    }

    const setData = function setData(){
                
                return parse(resData)

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

