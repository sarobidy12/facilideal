import React , {useEffect,useState} from 'react';
import MetaTags from 'react-meta-tags';
import axios from 'axios';
import localhost from '../../../_config';
import count from '../../../country';

const UpdateClick=()=>{
 
    const [disabled,SetDisabled]=useState(true);
    const [findTrue,setfindTrue]=useState(0);
    const [datares,setDatares]=useState(0);

    useEffect(()=>{
        getFindData(window.location.pathname.split('/')[3]);
    })

    const button = function button(){

        if(disabled){
            return <button type="submit" id='btn-loader' name="submit_add" className="btn btn-primary" >Ajouter un Click</button>
        }else{
            return <button type="submit" id='btn-loader' disabled name="submit_add" className="btn btn-primary" >Ajouter un Click</button>
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

          
            if(verfie()){

                 var objet= [
                    document.getElementById('nom').value ,
                    document.getElementById('url').value ,
                    document.getElementById('pays').value,
                    document.getElementById('renumeration').value,
                    window.location.pathname.split('/')[3] 
                 ];
    
                 let formData= new FormData();
                 formData.append("text", JSON.stringify(objet));
                 const url= localhost+'/controleur.php?p=UpdateClick';
                 axios.post(url,formData)
                 .then((res)=>{

                         document.getElementById('btn-loader').innerHTML='Ajouter un Click';
                         SetDisabled(true);

                                if(res.data === 'update-success-click'){
                                    document.getElementById('response-message').style.display='block';
                                    document.getElementById('response-message').style.backgroundColor='green';
                                    document.getElementById('response-message').innerHTML=" <span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>Le click à bien été Modifier";
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
                document.getElementById('response-message').innerHTML=" <span class=\"glyphicon glyphicon-exclamation-sign\" aria-hidden=\"true\"></span>Aucune modification n'a été faite";
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
             document.getElementById('url').value != datares.url  ||
             document.getElementById('pays').value != datares.pays ||
             document.getElementById('renumeration').value != datares.remuneration 

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
        const url= localhost+'/controleur.php?p=getClickId'; 
        axios.post(url,formData)
        .then((res)=>{

            if(findTrue === 0){
                setDatares(res.data[0]);
                setfindTrue(1);
            }
            document.getElementById('loader').style.display='none';
        });
    } 

    const findData= function findData(){
        
        if(findTrue === 1){

            return   <form method="post" onSubmit={(e)=>submit(e)}>

            <div class='form-group'>                           
                <label for="type" >Nom de l'offre :</label>
                <input type="text" defaultValue={datares.nom} id="nom" name="nom"   />
            </div>

            <div class='form-group'>
                <label for="url">URL de l'offre :</label>
                <input type="text" id="url" defaultValue={datares.url} name="url" />
            </div>

            <div class='form-group'>
                <label for="url">Rémunération aux membres :</label>
                <input type="text" defaultValue={datares.remuneration}  id='renumeration' name="renumeration"  />
            </div>

            <div class='form-group'>
                <label for="url">pays acceptés :</label>
                <select id="pays" style={{width:'20vh'}} name="pays">

                    {country(datares.pays)}
                
                </select>
            </div>

            <div class='from-group'> 
                {button()}
            </div>
            
        </form>
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


    return (
            <div> 
                 <MetaTags>
                     <title>Administration | add cashback</title>
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
                    <h1><span class="glyphicon glyphicon-bookmark"  aria-hidden="true"></span><b> Ajouter Cashback</b></h1>
                </div>
              
              {findData()}

                    </div> 
                       <div id='response-message'>
                    </div>
            </div>  
        ); 
  }
export default UpdateClick;

