import React , {  useEffect, useState }from 'react';
import { Link,Redirect } from 'react-router-dom';
import axios from 'axios';
import localhost from '../../../_config'
import Footer from '../../footer/index';
import { useCookies } from 'react-cookie';
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';

const SignUp=()=>{

    const [stop,SetStop] =useState(0);
    const [disabled,Setdisabled] =useState(0);
    const [redirect,Setdredirect] =useState(0);
    const [message,SetMessage] =useState(null);
    const [cookies, setCookie] = useCookies(null);

    const [nom,setNom] =useState(null);
    const [prenom,setPrenom] =useState(null);
    const [mail,setMail] =useState(null);
        
    useEffect(()=>{
        
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    })
    const submit = function submit (event){

        event.preventDefault();
        Setdisabled(1);
        let formData= new FormData();

        if(sessionStorage.getItem('id-paraign') != null){
            var id_parraign=sessionStorage.getItem('id-paraign')
        }else{
            var id_parraign=0   
        }

        var data = [
            document.getElementById('email').value,
            document.getElementById('mdp1').value,
            document.getElementById('nom').value,
            document.getElementById('prenom').value,
            id_parraign
        ];

        if(
            document.getElementById('email').value  != '' &&
            document.getElementById('mdp1').value  != '' &&
            document.getElementById('nom').value  != '' &&
            document.getElementById('prenom').value != ''
        ){

                if(document.getElementById('mdp1').value === document.getElementById('mdp2').value){

                    if(document.getElementById('mdp1').value.length > 5){
                        formData.append("text",JSON.stringify(data));
                        const url= localhost+'/controleur.php?p=register';
                        axios.post(url,formData)
                        .then((res)=>{
                            
                            if(res.data === 'add-user-success'){

                                var rand= Math.floor(Math.random() * ((10000 - 1000) + 1))
                                formData.append("text",JSON.stringify([ document.getElementById('prenom').value, document.getElementById('email').value,rand]));
                                const url= localhost+'/send_mail_comfirmation.php';
                                axios.post(url,formData)
                                .then((res)=>{
                                    sessionStorage.setItem('_comfirm',rand);
                                    sessionStorage.setItem('_mail',  document.getElementById('email').value);
                                    Setdisabled(0);
                                    Setdredirect(1);
                                });

                            }else if( res.data === 'error-email'){
                                Setdisabled(0);
                                SetMessage('Address email invalid ');
                            }else{
                                SetMessage('Vous ête déja inscrit , connectez-vous !');
                                Setdisabled(0);
                            }
                        });
                    }else{
                        SetMessage('Mot de passe est trop courte');
                        Setdisabled(0);
                    }
                
                }else{
                    SetMessage('Mot de passe ne sont indentique ');
                    Setdisabled(0);
                }
        }else{

            SetMessage('Veuiller remplir tout les champs');
            Setdisabled(0);
            
        }
       
    }

    const btn = function btn(){
        if(disabled === 0){
            return <button   className='btn_login'>S'inscrire</button>
        }else{
            return <center><img src='/img/loader1.gif' style={{width:'15vh'}}/></center>
        }
    }

    const messageR = function messageR(){

        if(message != null){
            return   <div className='alert-danger'>{message}</div>
        }
       
    }

    const redirectLink = function redirectLink(){
        if(redirect === 1){
            return <Redirect to='/comfirmation-users'/>
        }
    }
    const responseFacebook = response=>{
 

        if(response.email != null){
            Setdisabled(1);

            var name = response.name;
            var apt = name.split(' ');


                if(sessionStorage.getItem('id-paraign') != null){
                    var id_parraign=sessionStorage.getItem('id-paraign')
                }else{
                    var id_parraign=0   
                }
        
                    var data = [
                        response.email,
                        apt[0],
                        apt[1],
                        id_parraign
                    ]

                        let formData= new FormData();
                        formData.append("text",JSON.stringify(data));
                        const url= localhost+'/controleur.php?p=registerSocial';
                        axios.post(url,formData)
                            .then((res)=>{
                                
                                 setCookie('_lo', res.data);
                                 sessionStorage.setItem('_lo',res.data.id)
                                 Setdisabled(0);
                                 window.location.replace('/MyaccountInfo/tableau-de-bord')
                            
                            })
        }
        
          
     
    }
     const  componentClicked= ()=>{
     
        console.log('click'); 
     }

    const  responseGoogle = (response) => {
 
    
       var name = response.profileObj.name;
       var apt = name.split(' ');
    
        if(sessionStorage.getItem('id-paraign') != null){
            var id_parraign=sessionStorage.getItem('id-paraign')
        }else{
            var id_parraign=0   
        }

            var data = [
                response.profileObj.email,
                apt[0],
                apt[1],
                id_parraign
            ]

                let formData= new FormData();
                formData.append("text",JSON.stringify(data));
                const url= localhost+'/controleur.php?p=registerSocial';
                axios.post(url,formData)
                    .then((res)=>{
                        
                        setCookie('_lo', res.data);
                        sessionStorage.setItem('_lo',res.data.id)
                        Setdisabled(0);
                        window.location.replace('/MyaccountInfo/tableau-de-bord')
                    
                    })

    }

    let fbContent;
    fbContent=(
        <FacebookLogin
            appId="854916238331262"
            fields="name,email,picture"
            onClick={componentClicked}
            callback={responseFacebook}
            cssClass="btn_facebook"
            textButton="inscription via Facebook"
            icon="fa fa-facebook-square"
         />
    )
    return (
            <div> 
                {redirectLink()}
                <div id='login_register'>
                    <div className='container'>
               
                        <div className='row'>
                            <div className='col-md-6' data-aos='fade-in'>
                                    <img src='/img/sign.png'/>
                            </div>
                            <div className='col-md-6' data-aos='fade-in'>
                                <div className='login'>

                                  {messageR()}
                                    <h1>
                                        S'inscire
                                    </h1>
                                   {fbContent}
                                   <GoogleLogin
                                        clientId="799924690004-3n6l4rkr2j0kg4k4ktkg96fphgtcvocj.apps.googleusercontent.com"
                                        buttonText='inscription via Google'
                                        onSuccess={responseGoogle}
                                        onFailure={responseGoogle}
                                        cookiePolicy={'single_host_origin'}
                                        className='btn_login'
                                    />
                                   <form method="POST" onSubmit={(e)=>submit(e)}>

                                    <label>Prénom</label>
                                    <div className='form-group'>
                                        <span class="glyphicon glyphicon-star" aria-hidden="true"></span>
                                        <input type='text' id='prenom' name='prenom' />
                                    </div>

                                    <label>Nom</label>
                                    <div className='form-group'>
                                        <span class="glyphicon glyphicon-star" aria-hidden="true"></span>
                                        <input type='text' id='nom' name='Nom' />
                                    </div>

                                    <label>Addres mail</label>

                                    <div className='form-group'>
                                        <span class="glyphicon glyphicon-user" aria-hidden="true"></span>
                                        <input type='email' id='email' name='email' />
                                    </div>

                                    <label>Mot de passe</label>

                                    <div className='form-group'>
                                        <span class="glyphicon glyphicon-lock" aria-hidden="true"></span>
                                        <input type='password' id='mdp1' name='mdp1' />
                                    </div>

                                    <label>Comfirmé le mot de passe</label>
                                    <div className='form-group'>
                                        <span class="glyphicon glyphicon-lock" aria-hidden="true"></span>
                                        <input type='password'  id='mdp2' name='mdp2' />
                                    </div>

                                    {btn()}
                                   </form>

                                </div>
                             
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        ); 
  }

export default SignUp;

