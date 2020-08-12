import React , {  useEffect, useState }from 'react';
import axios from 'axios';
import MetaTags from 'react-meta-tags';
import localhost from '../../_config';

const CashBack=()=>{

    const [email,Setemail]= useState(null);
    const [password,Setpassword]= useState(null);

        const inputChange = function inputChange (event){

            event.preventDefault();
            if(event.target.name ==='email'){
                Setemail(event.target.value);
            }else if(event.target.name ==='password'){
                Setpassword(event.target.value);
            }

        }
    
        const handSubmit = function handSubmit (event){

                event.preventDefault();
                document.getElementById('message-admin-login').style='opacity:1;background:rgba(0, 191, 255, 0.5)';
                document.getElementById('message-admin-login').innerHTML='Connection au serveur ... ';
                    let formData= new FormData();
                    formData.append("text",[email,password]);

                    const url= localhost+'/controleur.php?p=loginAdmin'; 
                    axios.post(url,formData)

                    .then((res)=>{

                        if(res.data == 'success-log-admin'){
                            window.location.replace('/administration/');
                            document.getElementById('message-admin-login').style='opacity:1;background: rgba(0, 128, 0, 0.678)';
                            document.getElementById('message-admin-login').innerHTML=' <span class="glyphicon glyphicon-ok aria-hidden="true"></span> Redirection en cours ... ';
                            
                            sessionStorage.setItem('Admin-login',Date('y-d-m'))
                  
                        }else if(res.data == 'error-log-admin'){
                            document.getElementById('message-admin-login').style='opacity:1;background:rgba(255, 0, 0, 0.5)';
                            document.getElementById('message-admin-login').innerHTML=' <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> indentifiant incorrect';
                        }else if(res.data == 'error-mdp-admin'){
                            document.getElementById('message-admin-login').style='opacity:1;background:rgba(255, 0, 0, 0.5)';
                            document.getElementById('message-admin-login').innerHTML=' <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> Mot de passe incorrect';
                        } 

                    });
        }

    return (

        <div>

          <MetaTags>
            <title>Admin </title>
          </MetaTags>

            <div id="login-admin">
                        <div id='message-admin-login'>
                            Connection au serveur ... 
                        </div>
                    <div className='login-admin-form'>
                        <center>
                            <h1>Admin.</h1>
                        </center>
                      
                        <form onSubmit={(e)=>{ handSubmit(e)}}>
                            <div class="form-group">
                            <label for="exampleInputEmail1">Indentifiant</label>
                             <input type="text" name='email'  onChange={inputChange} id="nom"/>
                            </div>
                            <label for="exampleInputPassword1">Mot de passe</label>
                            <div class="form-group">
                                <input type="password" name='password'  onChange={inputChange} id="pasword" />
                            </div>

                            <button class="btn btn-login-admin">Se connecter</button>
                        </form>
                    </div>
              
            </div>
        </div>   
        ); 
  }
export default CashBack;

