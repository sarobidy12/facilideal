import React , {  useEffect,useState }from 'react';
import { Link,Redirect } from 'react-router-dom';

const Hero=()=>{

    const [redirecturl,setRedirect]=useState(false);
    
    const redirect= function redirect(){
        if(redirecturl === true){
            return <Redirect to={'/findCashback/'+document.getElementById('search').value} />
        }
    }

    const find= function find(e){
        e.preventDefault();
        if(document.getElementById('search')){
            if(document.getElementById('search').value != ''){
                setRedirect(true);
            }
        }
    }

    const stop=function stop(){
        if(window.location.pathname.split('/')[1] != 'administration'){
            return  <footer></footer>
        }
    }

    return (
            <div> 
                {stop()}
            </div>
        ); 
  }
export default Hero;

