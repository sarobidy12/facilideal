import React , {useEffect,useState} from 'react';
import MetaTags from 'react-meta-tags';
import axios from 'axios';
import localhost from '../../../_config';
import count from '../../../country';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const AddMission=()=>{
 
    const [disabled,SetDisabled]=useState(true);
    const [description,setDescription]=useState(null);

    const button = function button(){

        if(disabled){
            return <button type="submit" id='btn-loader' name="submit_add" className="btn btn-primary" >Ajouter un mission</button>
        }else{
            return <button type="submit" id='btn-loader' disabled name="submit_add" className="btn btn-primary" >Ajouter un mission</button>
        }

    }
    
    const country= function country(){

        var co= [];
        
        count.forEach(element => {
            co.push(<option>{element}</option>)
        });

        return co;

    }

    const Prenium = function Prenium(){

        var co= [];

        for(var i=0; i < 1;i++){

            if(i === 0 ){
                co.push(<option value={i}>Non</option>)
            }
            co.push(<option value={i}>Oui</option>)

        }
         
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

        var objet= [
            document.getElementById('nom_mision').value ,
            document.getElementById('url_mision').value ,
            description.trim(),
            document.getElementById('renumeration_mision').value,
            document.getElementById('Remuneration_regie_mision').value,
            document.getElementById('Regie_publiciter_mision').value ,
            document.getElementById('Annonceur_mision').value,
            document.getElementById('premium_mision').value 
         ];

         
            if(verfie()){

               let formData= new FormData();
               formData.append("text", JSON.stringify(objet));
               const url= localhost+'/controleur.php?p=addMission';
               axios.post(url,formData)
               .then((res)=>{

                console.log(res.data);

                       document.getElementById('btn-loader').innerHTML='Ajouter un mission';
                       SetDisabled(true);

                              if(res.data === 'add-success-mission'){
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
             document.getElementById('nom_mision').value != '' &&
             document.getElementById('url_mision').value != '' &&
             document.getElementById('renumeration_mision').value != ''  
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
                     <title>Administration | add mission</title>
                </MetaTags>

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
                    <h1><span class="glyphicon glyphicon-lock" aria-hidden="true"></span><b>Ajouter Mission</b></h1>
                </div>
                     
                <form method="post" onSubmit={(e)=>submit(e)}>
                    <div className='row'>
                        <div className='col-md-6'>
                            <div class='form-group'>                           
                                <label for="type" >Nom de l'offre :</label>
                                    <input type="text" style={{width:'90%'}} id="nom_mision" name="nom_mision"   />
                            </div>

                            <div class='form-group'>
                                <label for="url_mision">URL de l'offre :</label>
                                <input type="text" id="url_mision"  style={{width:'90%'}} name="url_mision" />
                            </div>

                            <div class='form-group'>
                                <label for="description">description de l'offre :</label>
                                <CKEditor
                                        editor={ ClassicEditor }
                                        data="<p>Description</p>"
                                        onInit={ editor => {
                                        //  You can store the "editor" and use when it is needed.
                                            console.log( 'Editor is ready to use!', editor );
                                        }}

                                        onChange={ ( event, editor ) => {
                                            setDescription(editor.getData());
                                        }}
                                />
                            </div>

                            <div class='form-group'>
                                <label for="renumeration_mision">Rémunération aux membres :</label>
                                <input type="number" step="0.01" min="0.01" style={{width:'90%'}} id='renumeration_mision' name="renumeration_mision"  />
                            </div>

                            <div class='from-group'> 
                                {button()}
                            </div>

                        </div>
                                
                        <div className='col-md-6'>

                            <div class='form-group'>                           
                                    <label for="type" >Rémunération sur régie :</label>
                                    <input  type="number" step="0.01" min="0.01" style={{width:'90%'}} id='Remuneration_regie_mision' />
                            </div>

                            <div class='form-group'>                           
                                    <label for="type" >Régie publicitaire :</label>
                                    <input type="text" style={{width:'90%'}} id='Regie_publiciter_mision' />
                            </div>

                            <div class='form-group'>                           
                                    <label for="type" >Annonceur :</label>
                                    <input type="text" style={{width:'90%'}} id='Annonceur_mision' />
                            </div>

                            <div class='form-group'>                           
                                    <label for="type" >Prenium:</label>
                                    <select id='premium_mision' style={{width:'90%'}}>
                                        <option value='0'>non</option>
                                        <option value='1'>oui</option>
                                    </select>
                            </div>
                        </div>
                    </div>
                  
              </form>
                    </div> 
                       <div id='response-message'>
                    </div>
            </div>  
        ); 
  }
export default AddMission;

