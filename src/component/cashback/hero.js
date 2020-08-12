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

    return (
            <div> 
                {redirect()}
                <div id='hero-cashack'>
                    <div className='cashback-seach'>
                        <h1><span class=" glyphicon glyphicon-map-marker" aria-hidden="true"></span>Trouver un magasin</h1>
                        <div className='form-input-seach' data-aos='fade-in'>
                            <form method="POST" onSubmit={(e)=>{find(e)}}>
                                    <input type='text' placeholder='chercher une boutique' id='search' name='search-cashback'/>
                                    <button type="button" onClick={(e)=>{find(e)}}>
                                        <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
                                    </button>
                            </form>
                            </div>
                        </div>
                    </div>
            </div>
        ); 
  }
export default Hero;

