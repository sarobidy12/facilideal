import React , {useEffect,useState} from 'react';
import MetaTags from 'react-meta-tags';
import axios from 'axios';
import localhost from '../../../_config';

const IndexAdmin=()=>{
 
    const [disabled,SetDisabled]=useState(true);
    const [findTrue,setfindTrue]=useState(0);
    const [datares,setDatares]=useState(0);

    useEffect(()=>{
        getFindData(window.location.pathname.split('/')[3]);
    })

    const button = function button(){
        if(disabled){
            return <button type="submit" id='btn-loader' name="submit_add" className="btn btn-primary" >Modifier un Categorie</button>
        }else{
            return <button type="submit" id='btn-loader' disabled name="submit_add" className="btn btn-primary" >Modifier un Categorie</button>
        }
    }

    const getFindData = function getFindData(id){

        document.getElementById('loader').style.display='block';

        let formData= new FormData();
        formData.append("text",id);
        const url= localhost+'/controleur.php?p=getCAtegorieId'; 
        axios.post(url,formData)
        .then((res)=>{
             if(findTrue === 0){
                 setDatares(res.data[0]);
                 setfindTrue(1);
             }
            document.getElementById('loader').style.display='none';

        });

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
if(document.getElementById('Img').value != ''){
    if(document.getElementById('categorie__').value.trim() != datares.nom_categorie || document.getElementById('Img').value.trim() != datares.url_img){
                
        let formData= new FormData();

        formData.append("text", JSON.stringify([
            document.getElementById('categorie__').value.trim(),
            document.getElementById('Img').value.trim(),
            window.location.pathname.split('/')[3]])
        );

       
        const url= localhost+'/controleur.php?p=UpdateCategorie';
        axios.post(url,formData)
        .then((res)=>{

            
                document.getElementById('btn-loader').innerHTML='Modifier le Categorie';
                SetDisabled(true);
                    if(res.data === 'update-success-categorie'){
                            document.getElementById('response-message').style.display='block';
                            document.getElementById('response-message').style.backgroundColor='green';
                            document.getElementById('response-message').innerHTML=" <span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>Le Categorie à bien été Modifier";
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
}else{
    document.getElementById('loader').style.display='none';
    document.getElementById('response-message').style.display='block';
    document.getElementById('response-message').style.backgroundColor='red';
    document.getElementById('response-message').innerHTML=" <span class=\"glyphicon glyphicon-exclamation-sign\" aria-hidden=\"true\"></span>Aucune modification n'a été faite";
}
            

            setTimeout(()=>{
                if(document.getElementById('btn-loader') &&   document.getElementById('response-message')){
                    document.getElementById('btn-loader').innerHTML='Modifier un coupons';
                    SetDisabled(true);
                    document.getElementById('response-message').style.display='none';
                }
            },2000)
    }

  
    const findData  = function findData(){

        if(findTrue === 1){
            
            return  <form method="post" onSubmit={(e)=>submit(e)}>
                        <div class='form-group'>                           
                            <label for="type" >Nom de categorie</label>
                            <input type="text" id="categorie__" defaultValue={datares.nom_categorie} name="categorie__" />
                        </div>

                        <div class='form-group'>                           
                            <label for="type" >Url Img</label>
                            <input type="text" id="Img" name="Img" defaultValue={datares.url_img}  />
                            <br/>
                        
                        </div>
                        <a href="https://stories.freepik.com/" target="_blank">Trouver un model ici</a>
                        <br/>
                        <br/>
                        <div class='from-group'> 
                            {button()}
                        </div>
                    </form>
        }
                    
    }

    return (
            <div> 

                 <MetaTags>
                     <title>Administration | update Categorie</title>
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
                    <h1><span class="gglyphicon glyphicon-th-list"  aria-hidden="true"></span><b> Modifier le Categorie</b></h1>
                </div>

                {findData()} 

            </div> 
                    <div id='response-message'>
                    </div>
            </div>  
        ); 
  }
export default IndexAdmin;

