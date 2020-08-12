import React , {useEffect,useState} from 'react';
import axios from 'axios';
import MetaTags from 'react-meta-tags';
import {Link} from 'react-router-dom'; 
import localhost from '../../../_config';

const IndexAdmin=()=>{
    
    const [stop2,setStop2]=useState(0);
    const [resData,setResDate]=useState([]);
    const [cate,setCat]=useState(0);

    useEffect(()=>{
        if(stop2 === 0){
            setelement(0);
        }
    })

    const setelement= function setelement(e){
         
        document.getElementById('response').classList.replace('fade_up','fade_down');

            let formData= new FormData();
                formData.append("text",e);
                const url= localhost+'/controleur.php?p=getCountAll'; 
                axios.post(url,formData)
                .then((res)=>{

                       console.log(res.data);
                       setResDate(res.data);
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
                    <div className='row'>
                        <div className='col-md-6'>

                            <Link to='/administration/prevalidation/mission'>
                                 <div className='btn-validation'>
                                    <h1>
                                        {resData[0].name}
                                    </h1>
                                    <p>
                                        Pre-validation mission
                                    </p>
                                </div>
                            </Link>
                        </div>

                        <div className='col-md-6'>
                            <Link to='/administration/comfirm-validation/mission'>
                                <div className='btn-validation'>
                                    <h1>
                                        {resData[1].name}
                                    </h1>
                                    <p>
                                        validation mission
                                    </p>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className='row'>
                        
                        <div className='col-md-6'>
                            <Link to='/administration/prevalidation/click'>
                                <div className='btn-validation'>
                                    <h1>
                                        {resData[2].name}
                                    </h1>
                                    <p>
                                        Pre-validation click
                                    </p>
                                </div>
                            </Link>
                        </div>

                        <div className='col-md-6'>
                            <Link to='/administration/comfirm-validation/click'>
                                <div className='btn-validation'>
                                    <h1>
                                        {resData[3].name}
                                    </h1>
                                    <p>
                                        validation click
                                    </p>
                                </div>
                            </Link>
                        </div>
                        
                    </div>

                    <div className='row'>
                        
                        <div className='col-md-6'>
                            <Link to='/administration/validation-avis'>
                                <div className='btn-validation'>
                                    <h1>
                                        {resData[4].name}
                                    </h1>
                                    <p>
                                        validation Avis
                                    </p>
                                </div>
                            </Link>
                        </div>

                     
                        
                    </div>
         </div>;
        
    }

    return (
            <div> 
                 <MetaTags>
                    <title>Administration | validation </title>
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
                            <h1><span class="glyphicon glyphicon-thumbs-up"  aria-hidden="true"></span><b>Validation</b></h1>
                        </div>

                        <div id='response' className='fade_up'>
                            {loader()}
                        </div>
                    </div> 
            </div>
        ); 
  }
export default IndexAdmin;

