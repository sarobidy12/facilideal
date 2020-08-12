import React , {  useEffect, useState }from 'react';
import { Link,Redirect } from 'react-router-dom';
import axios from 'axios';
import localhost from '../../../_config'

const SignUp=()=>{
 
    const [redirect,setredirect]=useState(0);
    useEffect(()=>{
        sessionStorage.setItem('id-paraign',window.location.pathname.split('/')[3])
        setredirect(1);
    })
       
    const redirectLink = function redirectLink(){
        if(redirect === 1){
            return <Redirect to='/inscription'/>
        }
    }
    
    return (
            <div> 
                {redirectLink()}
            </div>
        ); 
  }

export default SignUp;

