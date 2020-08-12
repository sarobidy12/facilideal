import React , {useEffect,useState} from 'react';
import MetaTags from 'react-meta-tags';
import axios from 'axios';
import localhost from '../../../_config';
import count from '../../../country';

const AddClick=()=>{

 
    const [disabled,SetDisabled]=useState(true);

    const button = function button(){

        if(disabled){
            return <button type="submit" id='btn-loader' name="submit_add" className="btn btn-primary" >Ajouter un Click</button>
        }else{
            return <button type="submit" id='btn-loader' disabled name="submit_add" className="btn btn-primary" >Ajouter un Click</button>
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
                 const url= localhost+'/controleur.php?p=addClick';
                 axios.post(url,formData)
                 .then((res)=>{

                console.log(res.data)

                         document.getElementById('btn-loader').innerHTML='Ajouter un Click';
                         SetDisabled(true);

                                if(res.data === 'add-success-click'){
                                    document.getElementById('response-message').style.display='block';
                                    document.getElementById('response-message').style.backgroundColor='green';
                                    document.getElementById('response-message').innerHTML=" <span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>Le Cashback a bien ete ajouter";
                                } else{
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
                    document.getElementById('btn-loader').innerHTML='Ajouter un coupons';
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
                     <title>Administration | add cashback</title>
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
                    <h1><span class="glyphicon glyphicon-bookmark"  aria-hidden="true"></span><b> Ajouter Cashback</b></h1>
                </div>
                     
                <form method="post" onSubmit={(e)=>submit(e)}>

                  <div class='form-group'>                           
                      <label for="type" >Nom de l'offre :</label>
                      <input type="text" id="nom" name="nom"   />
                  </div>

                  <div class='form-group'>
                      <label for="url">URL de l'offre :</label>
                      <input type="text" id="url" name="url" />
                  </div>

                  <div class='form-group'>
                      <label for="url">Rémunération aux membres :</label>
                      <input type="number" min="0" step="1" id='renumeration' name="renumeration"  />
                  </div>

                  
                  <div class='form-group'>
                      <label for="url">pays acceptés :</label>
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
export default AddClick;

