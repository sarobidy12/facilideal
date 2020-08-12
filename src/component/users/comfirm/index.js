
import React , {  useEffect, useState }from 'react';
import { Link,Redirect } from 'react-router-dom';
import axios from 'axios';
import localhost from '../../../_config'

const SignUp=()=>{
   
    const [redirect,Setdredirect] =useState(0);
    const [code,SetCode] =useState(sessionStorage.getItem('_comfirm'));
    const [BtnA,SetBtnA] =useState(0);
    const [desabled,SetDesabled] =useState(0);
   
    const redirectLink = function redirectLink(){
        if(redirect === 1){
            return <Redirect to='/connexion'/>
        }
    }

    const element = function element(e){

        e.preventDefault();
        SetBtnA(0)
        if(code === e.target.value){
            SetBtnA(1)
        }
    }

    const button = function button(){

        if(BtnA === 1){
            if(desabled === 0){
                return <button onClick={(e)=>{ Valider(e) }}  style={{width:'100%'}} className='btn_login' >Continue</button>
            }else{
                return <center><img src='/img/loader1.gif' style={{width:'15vh'}}/></center>
            }
        }
        
    }

    
    const Valider = function Valider(e){
      
        e.preventDefault();
            SetDesabled(1);
                let formData= new FormData();
                formData.append("text",sessionStorage.getItem('_mail'));
                const url= localhost+'/controleur.php?p=comfirmUsers'; 
                axios.post(url,formData)
                .then((res)=>{

                    if(res.data === 'comfirm-users-success'){
                        Setdredirect(1);
                    }

                });
    }

    return (
            <div> 
                {redirectLink()}
                <div id='login_register'>

                    <div className='row'>
                        <div className='col-md-6' data-aos='fade-in'>
                            <center>
                                <img src='/img/send-mail.png' />
                            </center>
                        </div>
                        <div className='col-md-6' data-aos='fade-in'> 
                            <div className='login'>

                            <h1>Code de comfirmation</h1>
                                    <p>Un email a ete envoyer au {sessionStorage.getItem('_mail')} <br/><br/>
                                    (n'oublier pas de verifier les spam)
                                    </p>
                                    <label>Entre le code </label>
                                    <div className='form-group'>
                                        <span class="glyphicon glyphicon-lock" aria-hidden="true"></span>
                                        <input type='number' onChange={element} min="0" step="1"  id='code' name='code' />
                                    </div>
                                    {button()}
                            </div>
                        </div>
                    </div>
              
                </div>
            </div>
        ); 
  }

export default SignUp;

