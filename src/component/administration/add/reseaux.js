import React , {useEffect,useState} from 'react';
import MetaTags from 'react-meta-tags';
import axios from 'axios';
import localhost from '../../../_config';
import count from '../../../country';

const AddReseaux=()=>{
 
    const [disabled,SetDisabled]=useState(true);
    const button = function button(){

        if(disabled){
            return <button type="submit" id='btn-loader' name="submit_add" className="btn btn-primary" >Ajouter un reseaux d'affilliation</button>
        }else{
            return <button type="submit" id='btn-loader' disabled name="submit_add" className="btn btn-primary" >Ajouter un reseaux d'affilliation</button>
        }

    }

    const country= function country(){

        var co= [];
        
        count.forEach(element => {
             co.push(<option>{element}</option>)
        });

        return co;

    }

    const submit = function submit (event){

        event.preventDefault();

        window.scrollTo({
            behavior:'smooth',
            top:0
        })

        document.getElementById('loader').style.display='block';
        document.getElementById('btn-loader').innerHTML='chargement ...';
        SetDisabled(false);
          
            if(verfie()){

                var objet= [
                    document.getElementById('nom').value ,
                    document.getElementById('url').value ,
                    document.getElementById('pays').value,
                    document.getElementById('renumeration').value 
                 ];
    
                 let formData= new FormData();
                 formData.append("text", JSON.stringify(objet));
                 const url= localhost+'/controleur.php?p=addAffiliation';
                 axios.post(url,formData)
                 .then((res)=>{

                         document.getElementById('btn-loader').innerHTML="Ajouter un reseaux d'affilliation";
                         SetDisabled(true);

                                if(res.data === 'add-affilliation-click'){
                                    document.getElementById('response-message').style.display='block';
                                    document.getElementById('response-message').style.backgroundColor='green';
                                    document.getElementById('response-message').innerHTML=" <span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>Le reseaux d'affiliation à bien été ajouter";
                                }else{
                                    document.getElementById('response-message').style.display='block';
                                    document.getElementById('response-message').style.backgroundColor='red';
                                    document.getElementById('response-message').innerHTML=" <span class=\"glyphicon glyphicon-exclamation-sign\" aria-hidden=\"true\"></span>une erreur est survenu";
                                }
                                    document.getElementById('loader').style.display='none';
                
                 });

            }else{
                document.getElementById('loader').style.display='none';
                document.getElementById('response-message').style.display='block';
                document.getElementById('response-message').style.backgroundColor='red';
                document.getElementById('response-message').innerHTML=" <span class=\"glyphicon glyphicon-exclamation-sign\" aria-hidden=\"true\"></span>Veuiller a remplir tout les champs erreur est survenu";
            }

            setTimeout(()=>{
                if(document.getElementById('btn-loader') && document.getElementById('response-message')){
                    document.getElementById('btn-loader').innerHTML='Ajouter un reseaux affiliation';
                    SetDisabled(true);
                    document.getElementById('response-message').style.display='none';
                }
            },2000)
    }

    const verfie = function verfie (){

         if( 
             document.getElementById('nom').value != '' &&
             document.getElementById('url').value != '' &&
             document.getElementById('renumeration').value != ''  
         )
         {
            return true;
         }else{
             return false;
         }
    }

    return (
            <div> 
                 <MetaTags>
                     <title>Administration | add affiliation</title>
                </MetaTags>

               
            <center>
               
            </center>
            <div className='container-admin' data-aos="fade-left">
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
                <div id='titre-admin' >
                    <h1><span className="glyphicon glyphicon-random"   aria-hidden="true"></span><b> Ajouter Reseau D'affilliation</b></h1>
                </div>
                     
                <form method="post" onSubmit={(e)=>submit(e)}>

                  <div class='form-group'>                           
                      <label for="type" >Nom de l'affilliation :</label>
                      <input type="text" id="nom" name="nom"   />
                  </div>

                  <div class='form-group'>
                      <label for="url">URL de l'affilliation:</label>
                      <input type="text" id="url" name="url" />
                  </div>

                  <div class='form-group'>
                      <label for="url">Description </label>
                      <input type="text" id='renumeration' name="renumeration"  />
                  </div>

                  
                  <div class='form-group'>
                      <label for="url">pays :</label>
                      <select id="pays" style={{width:'20vh'}} name="pays">
                        {country()}
                     </select>
                  </div>

                  <div class='from-group'> 
                      {button()}
                  </div>
                  
              </form>
                    </div> 
                       <div id='response-message'>
                    </div>
            </div>  
        ); 
  }
export default AddReseaux;
