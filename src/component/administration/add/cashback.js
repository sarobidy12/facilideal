import React , {useEffect,useState} from 'react';
import MetaTags from 'react-meta-tags';
import axios from 'axios';
import localhost from '../../../_config';

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import parse from 'html-react-parser';
const AddCashback=()=>{

    const [categorie,setCategorie]=useState(null);
    const [Rescategorie,setRescategorie]=useState([]);
    const [affiliation,setgetaffiliation]=useState([]);
    const [ResSouscategorie,setSousRescategorie]=useState([]);
    const [stop,setStop]=useState(0);
    const [stop2,setStop2]=useState(0);
    const [stop3,setStop3]=useState(0);
    const [disabled,SetDisabled]=useState(true);

    const [description,setDescription]=useState(null);
    const [Condition,setCondition]=useState(true);

    useEffect(()=>{
        getCategorie();
        getaffiliation();
    })

    const getCategorie = function getCategorie(){
        let formData= new FormData();
        formData.append("text",'text');
        const url= localhost+'/controleur.php?p=categorie'; 
        axios.post(url,formData)
        .then((res)=>{

            if(stop === 0){
                setRescategorie(res.data);
                setStop(1)
            }
        });
    }
    
    const getaffiliation = function getaffiliation(){
        let formData= new FormData();
        formData.append("text",'text');
        const url= localhost+'/controleur.php?p=affiliation'; 
        axios.post(url,formData)
        .then((res)=>{

            if(stop3 === 0){
                setgetaffiliation(res.data);
                setStop3(1)
            }
        });
    }

    const getSousCategorie = function getSousCategorie(e){
        
        document.getElementById('sousCategorie').style.display='block';
        document.getElementById('gif').style.display='block';
        document.getElementById('sousCategorie_io').style.display='none';

        if(e == null){
            e=1;
        }

        let formData= new FormData();
        formData.append("text",JSON.stringify(e));
        const url= localhost+'/controleur.php?p=souscategorie'; 
        axios.post(url,formData)
        .then((res)=>{
            if(stop2 === 0){
                console.log(res.data)
                console.log(e)
                setSousRescategorie(res.data);
                document.getElementById('gif').style.display='none';
                document.getElementById('sousCategorie_io').style.display='block';
            }
        });
    }
  
    const SouscategorieRes = function SouscategorieRes(){

        var element =[];
        for(var i=0;i<ResSouscategorie.length;i++ ){
            element.push(
                <option value={ResSouscategorie[i].id}>{ResSouscategorie[i].nom_sous_categorie}</option>
            )
        }
        return element;

    }
    
    const categorieRes = function categorieRes(){

        var element =[];
        for(var i=0;i<Rescategorie.length;i++ ){
            element.push(
                <option value={Rescategorie[i].id}>{Rescategorie[i].nom_categorie}</option>
            )
        }
        return element;

    }

    const categorieAffiliation = function categorieAffiliation(){

        var element =[];
        for(var i=0;i<affiliation.length;i++ ){
            element.push(
                <option value={affiliation[i].id}>{affiliation[i].nom}</option>
            )
        }
        return element;

    }

    const inputChange = function inputChange (event){

         event.preventDefault();
        
         if(event.target.name ==='categorie_all'){
             getSousCategorie(event.target.value);
             setCategorie(event.target.value);
         }
       

    }

    const button = function button(){
        if(disabled){
            return <button type="submit" id='btn-loader' name="submit_add" className="btn btn-primary" >Ajouter un cashback</button>
        }else{
            return <button type="submit" id='btn-loader' disabled name="submit_add" className="btn btn-primary" >Ajouter un cashback</button>
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

            var objet= [
                document.getElementById('affiliation').value.trim(),
                document.getElementById('Ancien').value.trim(),
                document.getElementById('nouveaux').value.trim(),
                document.getElementById('categorie_all').value.trim(),
                document.getElementById('sousCategorie_io').value.trim(),
                document.getElementById('url').value.trim(),
                document.getElementById('url_img').value.trim(),
                document.getElementById('nom').value.trim(),
                description,
                Condition,
                document.getElementById('dateFin').value
            ];

            console.log(objet);
            
            if(verfie(objet)){

               let formData= new FormData();
               formData.append("text", JSON.stringify(objet));
               const url= localhost+'/controleur.php?p=addCashback';
               axios.post(url,formData)
               .then((res)=>{

                       document.getElementById('btn-loader').innerHTML='Ajouter un Cashback';
                       SetDisabled(true);
                      if(res.data === 'add-success-cashback'){
                           document.getElementById('response-message').style.display='block';
                           document.getElementById('response-message').style.backgroundColor='green';
                           document.getElementById('response-message').innerHTML=" <span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>Le Cashback a bien ete ajouter";
                     
                        }else if(res.data === 'add-already-exist-cashback'){
                            document.getElementById('response-message').style.display='block';
                            document.getElementById('response-message').style.backgroundColor='red';
                            document.getElementById('response-message').innerHTML=" <span class=\"glyphicon glyphicon-exclamation-sign\" aria-hidden=\"true\"></span>Le utilise un autre nom";
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
                    document.getElementById('btn-loader').innerHTML='Ajouter un cashback';
                    SetDisabled(true);
                    document.getElementById('response-message').style.display='none';
                }
            },2000)
    }

    const verfie = function verfie (){

        if( 
            document.getElementById('affiliation').value != '' &&
            document.getElementById('categorie_all').value != '' &&
            document.getElementById('sousCategorie_io').value != '' &&
            document.getElementById('Ancien').value != '' &&
            document.getElementById('nouveaux').value != '' &&
            document.getElementById('url').value != '' &&
            document.getElementById('url_img').value != '' &&
            document.getElementById('nom').value != '' &&
            document.getElementById('dateFin').value != ''
            
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

<div className='row'>
    
            <div className='col-md-6'>
                <div class='form-group'>                           
                      <label for="type" >Nom de Cashback</label>
                      <input type="text" style={{width:'100%'}} id="nom" name="nom"   />
                  </div>

                  <div className='form-group'> 
                            <label>Reseaux d'affiliation</label> 
                            <select name="affiliation" id="affiliation" style={{width:'100%'}} >
                                {categorieAffiliation()}
                            </select>
                  </div> 


                  <div className='form-group'> 
                            <label>Categorie</label> 
                            <select name="categorie_all" id="categorie_all" style={{width:'100%'}}  onChange={inputChange }>
                                {categorieRes()}
                            </select>
                  </div> 

                  <div id='sousCategorie'>
                        <center>
                            <img id='gif' src='/img/loader.gif'/>
                        </center>
                        <div className='form-group'> 
                            <label>Sous categorie </label>
                                <select name="categoriesous" id='sousCategorie_io' style={{width:'100%'}} onChange={inputChange } style={{width :" 190px"}}>
                                    {SouscategorieRes()}
                                </select>
                        </div>  
                 </div>
               
                 <div class='form-group'>
                      <label for="url">Url magasin</label>
                      <input type="text" id="url" style={{width:'100%'}} name="url" />
                  </div>

                  <div class='form-group'>
                      <label for="url">Url image</label>
                      <input type="text" id="url_img" style={{width:'100%'}} name="url_img"  />
                  </div>

                  <div class='form-group'>
                      <label for="renumeration">Ancien Cashback</label>
                      <input type="text" placeholder='% / euro'  step="1" style={{width:'100%'}} id="Ancien" name="Ancien" />
                  </div>

                  <div class='form-group'>
                      <label for="renumeration">Nouveau Cashback</label>
                      <input type="text" placeholder='% / euro '  step="1" style={{width:'100%'}} id="nouveaux" name="nouveaux" />
                  </div>

                  <div class='from-group'> 
                      {button()}
                  </div>
    </div>
    <div className='col-md-6'>

                  <div class='form-group'>
                      <label for="description">Description</label>
                      <CKEditor
                            editor={ ClassicEditor }
                            data="<p>Hello from CKEditor 5!</p>"
                            onInit={ editor => {
                        //       You can store the "editor" and use when it is needed.
                                console.log( 'Editor is ready to use!', editor );
                            }}

                            onChange={ ( event, editor ) => {
                                setDescription(editor.getData());
                            }}
                       />
                  </div>

                  <div class='form-group'>
                      <label for="description">Condition</label>
                      <CKEditor
                            editor={ ClassicEditor }
                            data="<p>Hello from CKEditor 5!</p>"
                            onInit={ editor => {
                                // You can store the "editor" and use when it is needed.
                                console.log( 'Editor is ready to use!', editor );
                            } }

                            onChange={ ( event, editor1 ) => {
                                setCondition(editor1.getData());
                            }}
                       />
                  </div>
                   
                  <div class='from-group'> 
                      <label for="dateFin">Date d'expiration</label>
                      <input type="date" style={{width:'100%'}} id="dateFin" name="dateFin"/>
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
export default AddCashback;

