import React , {useEffect,useState} from 'react';
import MetaTags from 'react-meta-tags';
import axios from 'axios';
import localhost from '../../../_config';
import count from '../../../country';

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const UpdateMission=()=>{
 
    const [findTrue,setfindTrue]=useState(0);
    const [datares,setDatares]=useState(0);
    const [disabled,SetDisabled]=useState(true);
    const [description,setDescription]=useState(null);
    
    useEffect(()=>{
        getFindData(window.location.pathname.split('/')[3]);
    })

    const button = function button(){

        if(disabled){
            return <button type="submit" id='btn-loader' name="submit_add" className="btn btn-primary" >modifier Mission</button>
        }else{
            return <button type="submit" id='btn-loader' disabled name="submit_add" className="btn btn-primary" >chargement ... </button>
        }

    }
    
    const country= function country(e){

        var co= [];
        count.forEach(element => {
            if(e+'' === element+''){
                co.push(<option  value={element} selected>{element}</option>)
            }else{
                co.push(<option  value={element}>{element}</option>)
            }
        });
        return co;
    }

    const Prenium = function Prenium(e){
 
        if(e== 0){
            return <>
                    <option value={1} >Oui</option>
                    <option value={0} selected>Non</option>
                    </>
        }else{
            return <>
            <option value={1} selected>Oui</option>
            <option value={0} >Non</option>
            </>
        }
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
            document.getElementById('premium_mision').value,
            window.location.pathname.split('/')[3]
         ];

             if(verfie()){
              
                  let formData= new FormData();
                  formData.append("text", JSON.stringify(objet));
                  const url= localhost+'/controleur.php?p=UpdateMission';
                  axios.post(url,formData)
                  .then((res)=>{

                         document.getElementById('btn-loader').innerHTML='Ajouter un mission';
                         SetDisabled(true);

                                 if(res.data === 'update-success-mission'){
                                     document.getElementById('response-message').style.display='block';
                                     document.getElementById('response-message').style.backgroundColor='green';
                                     document.getElementById('response-message').innerHTML=" <span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>Le Mission a bien ete modifier";
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
            document.getElementById('nom_mision').value !=  datares.nom ||
            document.getElementById('url_mision').value   !=  datares.url ||
            document.getElementById('renumeration_mision').value  !=  datares.remuneration ||
            description != datares.description ||
            document.getElementById('Remuneration_regie_mision').value  !=  datares.montant ||
            document.getElementById('Regie_publiciter_mision').value   !=  datares.regie ||
            document.getElementById('premium_mision').value 
        )
        {
            return true;
        }else{
            return false;
        }
   }
 
   const getFindData = function getFindData(id){

       document.getElementById('loader').style.display='block';

       let formData= new FormData();
       formData.append("text",id);
       const url= localhost+'/controleur.php?p=getMissionId'; 
       axios.post(url,formData)
       .then((res)=>{

           if(findTrue === 0){
               setDatares(res.data[0]);
               setDescription(res.data[0].description)
               setfindTrue(1);
           }
           document.getElementById('loader').style.display='none';
       });
   } 

    const findata =()=>{

        if(findTrue === 1){

            return  <form method="post" onSubmit={(e)=>submit(e)}>
            <div className='row'>
                <div className='col-md-6'>
                    <div class='form-group'>                           
                        <label for="type" >Nom de l'offre :</label>
                            <input type="text" style={{width:'90%'}} defaultValue={datares.nom} id="nom_mision"     />
                    </div>

                    <div class='form-group'>
                        <label for="url">URL de l'offre :</label>
                        <input type="text" id="url_mision"  style={{width:'90%'}}  defaultValue={datares.url} name="url_mision" />
                    </div>

                    <div class='form-group'>
                        <label for="description">description de l'offre :</label>
                        <CKEditor
                                        editor={ ClassicEditor }
                                        data={datares.description}
                                        onInit={ editor => {
                                //          You can store the "editor" and use when it is needed.
                                            console.log( 'Editor is ready to use!', editor );
                                        }}

                                        onChange={ ( event, editor ) => {
                                            setDescription(editor.getData());
                                        }}
                                />
                    </div>

                    <div class='form-group'>
                        <label for="url">Rémunération aux membres :</label>
                        <input  type="number" step="0.01" min="0.01" style={{width:'90%'}} id='renumeration_mision' defaultValue={datares.remuneration} name="renumeration"  />
                    </div>

                    <div class='from-group'> 
                        {button()}
                    </div>

                </div>
                        
                <div className='col-md-6'>

                    <div class='form-group'>                           
                            <label for="type" >Rémunération sur régie :</label>
                            <input type="number" step="0.01" min="0.01" style={{width:'90%'}} defaultValue={datares.montant} id='Remuneration_regie_mision' />
                    </div>

                    <div class='form-group'>                           
                            <label for="type" >Régie publicitaire :</label>
                            <input  type="text" style={{width:'90%'}} defaultValue={datares.regie} id='Regie_publiciter_mision' />
                    </div>

                    <div class='form-group'>                           
                            <label for="type" >Annonceur :</label>
                            <input  type="text"  defaultValue={datares.annonceur} style={{width:'90%'}} id='Annonceur_mision' />
                    </div>

                    <div class='form-group'>
                            <label for="premium">premium :</label>
                            <select id="premium_mision"  style={{width:'90%'}} name="premium">
                                {Prenium(datares.premium)}
                            </select>
                    </div>

                </div>
            </div>
          
      </form>
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
                     
               {findata()}
                    </div> 
                       <div id='response-message'>
                    </div>
            </div>  
        ); 
  }
export default UpdateMission;

