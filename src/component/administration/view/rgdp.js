import React , {useEffect,useState} from 'react';
import axios from 'axios';
import MetaTags from 'react-meta-tags';
import {Link} from 'react-router-dom'; 
import localhost from '../../../_config';

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
const IndexAdmin=()=>{
    
    const [stop2,setStop2]=useState(0);
    const [resData,setResDate]=useState([]);
    const [description,setDescription]=useState(null);
    const [disabled,SetDisabled]=useState(true);

    useEffect(()=>{
        if(stop2 === 0){
            setelement(0);
        }
    })

    const setelement= function setelement(e){
         
        document.getElementById('response').classList.replace('fade_up','fade_down');

            let formData= new FormData();
                formData.append("text",e);
                const url= localhost+'/controleur.php?p=GetRgpd'; 
                axios.post(url,formData)
                .then((res)=>{

                       setDescription(res.data.text);
                       setStop2(1);
                       document.getElementById('response').classList.replace('fade_down','fade_up');

                });

    }

    
    const loader = function loader(){
        
        if(stop2 == 1){
            return data();
        }else{
            return  <center>
                        <div className="cs-loader">
                            <div className="cs-loader-inner">
                                <span>●</span>
                                <span>●</span>
                                <span>●</span>
                                <span>●</span>
                                <span>●</span>
                                <span>●</span>
                            </div>
                        </div>
                    </center> 
        }
    
    }

    const data= function data(){
         
         return <div className='validatation'>
             
                     <CKEditor
                                            editor={ ClassicEditor }
                                            data={description}
                                            onChange={ ( event, editor ) => {
                                                setDescription(editor.getData());
                                            }}
                                       />
                    {button()}
                                
            </div>;
        
    }
    
    const submit = function submit (){

        window.scrollTo({
            behavior:'smooth',
            top:0
        })

        document.getElementById('loader').style.display='block';
        document.getElementById('btn-loader').innerHTML='chargement ...';
        
        SetDisabled(false);

                let formData= new FormData();
                formData.append("text", JSON.stringify(description));
                const url= localhost+'/controleur.php?p=Updatergpd';
                axios.post(url,formData)
                    .then((res)=>{


                                SetDisabled(true);

                                    if(res.data === 'update-rgdp-users'){
                                            document.getElementById('response-message').style.display='block';
                                            document.getElementById('response-message').style.backgroundColor='green';
                                            document.getElementById('response-message').innerHTML=" <span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>Le RGPD à bien été Modifier";
                                    } else{
                                            document.getElementById('response-message').style.display='block';
                                            document.getElementById('response-message').style.backgroundColor='red';
                                            document.getElementById('response-message').innerHTML=" <span class=\"glyphicon glyphicon-exclamation-sign\" aria-hidden=\"true\"></span>une erreur est survenu";
                                    }
                                    
                                        document.getElementById('loader').style.display='none';

                    });


            setTimeout(()=>{
                if(document.getElementById('btn-loader') &&   document.getElementById('response-message')){
                    document.getElementById('btn-loader').innerHTML='Modifier un coupons';
                    SetDisabled(true);
                    document.getElementById('response-message').style.display='none';
                }
            },2000)
    }

    const button = function button(){

        if(disabled){
            return <button type="submit" id='btn-loader' onClick={()=>{
                submit();
            }} name="submit_add" className="btn btn-primary" >Modifier un Rgpd</button>
        }else{
            return <button type="submit" id='btn-loader' disabled name="submit_add" className="btn btn-primary" >Modifier un Rgpd</button>
        }

    }

    return (
            <div> 
                 <MetaTags>
                    <title>Administration | RGPD </title>
                </MetaTags>
                <div id='loader'>
                        <div className="cs-loader">
                            <div className="cs-loader-inner">
                                <span>●</span>
                                <span>●</span>
                                <span>●</span>
                                <span>●</span>
                                <span>●</span>
                                <span>●</span>
                            </div>
                        </div>
                    </div>
                    <div className='container-admin' data-aos="fade-left">
                        <div id='titre-admin' >
                            <h1><span class="glyphicon glyphicon-book"  aria-hidden="true"></span><b>RGPD</b></h1>
                        </div>

                        <div id='response' className='fade_up'>
                            {loader()}
                        </div>
                    </div> 
                    <div id='response-message'>
                    </div>
            </div>
        ); 
  }
export default IndexAdmin;

