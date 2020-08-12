import React , {useEffect,useState} from 'react';
import MetaTags from 'react-meta-tags';
import axios from 'axios';
import localhost from '../../../_config';
import count from '../../../country';

const UpdateMission=()=>{
 
    const [findTrue,setfindTrue]=useState(0);
    const [datares,setDatares]=useState(0);
    const [disabled,SetDisabled]=useState(true);
    
    useEffect(()=>{
        getFindData(window.location.pathname.split('/')[3]);
    })

    const button = function button(){

        if(disabled){
            return <button type="submit" id='btn-loader' name="submit_add" className="btn btn-primary" >Ajouter un mission</button>
        }else{
            return <button type="submit" id='btn-loader' disabled name="submit_add" className="btn btn-primary" >Ajouter un mission</button>
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

        var co= [];

        for(var i=0; i < 1;i++){

            if(i === 0 ){
                if(e == 1){
                    co.push(<option value={i} selected>Oui</option>)
                }
            }
            if(e == 0){
                co.push(<option value={i} selected>Non</option>)
            }


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

          
            if(verfie()){

                 var objet= [
                    document.getElementById('nom').value ,
                    document.getElementById('url').value ,
                    document.getElementById('description').value ,
                    document.getElementById('pays').value,
                    document.getElementById('renumeration').value,
                    document.getElementById('Remuneration_regie').value,
                    document.getElementById('valid').value ,
                    document.getElementById('Regie_publiciter').value ,
                    document.getElementById('Annonceur').value,
                    document.getElementById('Quota').value,
                    document.getElementById('premium').value 
                 ];
    
                 let formData= new FormData();
                 formData.append("text", JSON.stringify(objet));
                 const url= localhost+'/controleur.php?p=addMission';
                 axios.post(url,formData)
                 .then((res)=>{

                console.log(res.data)

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
            document.getElementById('nom').value !=  datares.nom ||
            document.getElementById('url').value   !=  datares.url ||
            document.getElementById('renumeration').value  !=  datares.remuneration ||
            document.getElementById('description').value   !=  datares.description ||
            document.getElementById('pays').value  !=  datares.pays ||
            document.getElementById('Remuneration_regie').value  !=  datares.montant ||
            document.getElementById('valid').value   !=  datares.valid ||
            document.getElementById('Regie_publiciter').value   !=  datares.regie ||
            document.getElementById('Annonceur').value  !=  datares.annonceur ||
            document.getElementById('Quota').value  !=  datares.quota ||
            document.getElementById('premium').value 

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
                            <input type="text" style={{width:'90%'}} defaultValue={datares.nom} id="nom" name="nom"   />
                    </div>

                    <div class='form-group'>
                        <label for="url">URL de l'offre :</label>
                        <input type="text" id="url"  style={{width:'90%'}}  defaultValue={datares.url} name="url" />
                    </div>

                    <div class='form-group'>
                        <label for="description">description de l'offre :</label>
                        <input type="text" id="description" style={{width:'90%'}} name="description" defaultValue={datares.description} />
                    </div>

                    <div class='form-group'>
                        <label for="url">Rémunération aux membres :</label>
                        <input type="number" min="0" step="1"  style={{width:'90%'}} id='renumeration' defaultValue={datares.remuneration} name="renumeration"  />
                    </div>

                    <div class='form-group'>
                        <label for="url">pays acceptés :</label>
                            <select id="pays"  style={{width:'90%'}} name="pays">
                                {country(datares.pays)}
                            </select>
                    </div>

                    <div class='form-group'>
                        <label for="premium">premium :</label>
                            <select id="premium"  style={{width:'90%'}} name="premium">
                                {Prenium(datares.premium)}
                            </select>
                    </div>

                    <div class='from-group'> 
                        {button()}
                    </div>
                </div>
                        
                <div className='col-md-6'>

                    <div class='form-group'>                           
                        <label for="type" >Validation directe (0 = non | 1 = oui) :</label>
                            <input  type="number" min="0" style={{width:'90%'}}  defaultValue={datares.valid} step="1" id='valid' max='1'/>
                    </div>

                    <div class='form-group'>                           
                        <label for="type" >Quota quotidien (0 = illimité) :</label>
                            <input  type="number" min="1" style={{width:'90%'}} defaultValue={datares.quota}  step="1" id='Quota' />
                    </div>

                    <div class='form-group'>                           
                        <label for="type" >Rémunération sur régie :</label>
                            <input  type="number" min="0"  style={{width:'90%'}} defaultValue={datares.montant} id='Remuneration_regie' />
                    </div>

                    <div class='form-group'>                           
                        <label for="type" >Régie publicitaire :</label>
                            <input  type="number" min="0"  style={{width:'90%'}}  defaultValue={datares.regie} id='Regie_publiciter' />
                    </div>

                    <div class='form-group'>                           
                        <label for="type" >Annonceur :</label>
                            <input  type="text"  defaultValue={datares.annonceur} style={{width:'90%'}} id='Annonceur' />
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

