import React , {useEffect,useState} from 'react';
import MetaTags from 'react-meta-tags';
import axios from 'axios';
import localhost from '../../../_config';

const AddSousC=()=>{

    const [disabled,SetDisabled]=useState(true);

    const button = function button(){
        if(disabled){
            return <button type="submit" id='btn-loader' name="submit_add" className="btn btn-primary" >Ajouter un categorie</button>
        }else{
            return <button type="submit" id='btn-loader' disabled name="submit_add" className="btn btn-primary" >Ajouter un categorie</button>
        }
    }
    
    const submit = function submit (event){

        event.preventDefault();

        window.scrollTo({
            behavior:'smooth',
            top:0
        })

        document.getElementById('loader').style.display='block';
        document.getElementById('btn-loader').innerHTML='chargement...';
        SetDisabled(false);

            if(document.getElementById('categorie_').value != ''){

                  let formData= new FormData();
                  formData.append("text", JSON.stringify([document.getElementById('categorie_').value.trim(),document.getElementById('Img').value.trim()]));
                  const url= localhost+'/controleur.php?p=addCategorie';
                  axios.post(url,formData)
                  .then((res)=>{

                      console.log(res.data);

                          document.getElementById('btn-loader').innerHTML='Ajouter un categorie';
                          SetDisabled(true);
                         if(res.data === 'add-categorie-success'){
                              document.getElementById('response-message').style.display='block';
                              document.getElementById('response-message').style.backgroundColor='green';
                              document.getElementById('response-message').innerHTML=" <span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>Le Categorie a bien ete ajouter";
                  
                         }else if(res.data === 'add-categorie-faild'){
 
                            document.getElementById('response-message').style.display='block';
                            document.getElementById('response-message').style.backgroundColor='red';
                            document.getElementById('response-message').innerHTML=" <span class=\"glyphicon glyphicon-exclamation-sign\" aria-hidden=\"true\"></span>utilise un autre nom";
                    
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
                if(document.getElementById('btn-loader') &&   document.getElementById('response-message')){
                    document.getElementById('btn-loader').innerHTML='Ajouter un Categorie';
                    SetDisabled(true);
                    document.getElementById('response-message').style.display='none';
                }
            },2000);

    }

    return (
            <div> 
                 <MetaTags>
                     <title>Administration | add categorie</title>
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
                    <h1><span class="glyphicon glyphicon-th-list"  aria-hidden="true"></span><b> Ajouter un Categorie</b></h1>
                </div>
                     
                <form method="post" onSubmit={(e)=>submit(e)}>
                    <div class='form-group'>                           
                        <label for="type" >Nom de categorie</label>
                        <input type="text" id="categorie_" name="categorie_"   />
                    </div>

                    <div class='form-group'>                           
                        <label for="type" >Url Img</label>
                        <input type="text" id="Img" name="Img"   />
                        <br/>
                      
                    </div>
                    <a href="https://stories.freepik.com/" target="_blank">Trouver un model ici</a>
                    <br/>
                    <br/>
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
export default AddSousC;

