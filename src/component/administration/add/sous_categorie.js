
import React , {useEffect,useState} from 'react';
import cookie from 'cookie';
import MetaTags from 'react-meta-tags';
import {Link} from 'react-router-dom';
import axios from 'axios';
import localhost from '../../../_config';
import Moment from 'react-moment';
import 'moment/locale/fr';

const Click=()=>{

    const [Tchek,setTchek]=useState([]);
    const [findTrue,setfindTrue]=useState(0);
    const [datares,setDatares]=useState(0);
    const [disabled,SetDisabled]=useState(true);

    useEffect(()=>{
        if(findTrue === 0){
            getFindData(window.location.pathname.split('/')[3]);
        }
    })

    const getFindData = function getFindData(id){

        document.getElementById('loader').style.display='block';
        let formData= new FormData();
        formData.append("text",id);
        const url= localhost+'/controleur.php?p=souscategorie'; 
        axios.post(url,formData)
        .then((res)=>{
             if(findTrue === 0){
                setDatares(res.data);
                    setfindTrue(1);
                        document.getElementById('loader').style.display='none';
             }
        });

    } 
 
    const data= function data(){
         
        var element =[];

         if(datares.length == 0){

            return  <center><h3>Aucune information</h3></center>  ;

         }else{

             for(var i=0;i<datares.length;i++ ){
                 element.push( 
                    <div id={'del-'+datares[i].id} className='content-view-table row'>
                        <div className='inline-table'><input type='checkbox' onChange={checkio.bind(this,datares[i].id)} /></div>
                 <div className='inline-table' style={{width:'25vh'}}>{datares[i].nom_sous_categorie}</div>
                        <div className='inline-table'></div>
                        <div className='inline-table'></div>
                        <div className='inline-table'>
                        </div>  
                      
                    </div>
                 )
             }       

             return element;
         }
        
    }

    const checkio = function checkio(io,e){
        document.getElementById('loader').style.display='none';

        var element5 = [];

        var id=io.split('/')[0];

        for(var i=0;i< Tchek.length;i++ ){
            if(Tchek[i] != id){
                 element5.push(Tchek[i]);
            }
        }  
        if(!Tchek.includes(id)){
             element5.push(id);
        }

        setTchek(element5.sort((a,b)=>a-b));

        document.getElementById('del-'+id).style.backgroundColor='transparent';

        }
        
        const nbrCheck= function nbrCheck(e){
           
                if(Tchek.length > 0){
                    return '( '+Tchek.length+' )';
                }
        }
 
        const btnDelete= function btnDelete(){
            if(Tchek.length > 0){
                return  <button  className='btn-danger' onClick={()=>{ deleteAll()}} >Suprimer {nbrCheck()}</button>
            }
        }

    const loader = function loader(){
        
        if(findTrue == 1){
            return data();
        }else{
            if( document.getElementById('loader')){
                document.getElementById('loader').style.display='block';
            }
        }
    
    }

    const deleteAll= function deleteAll(){

          setTchek([]);

            for(var i=0 ;i <Tchek.length;i++){
                document.getElementById('del-'+Tchek[i]).style.backgroundColor="#aaa";
            }

                document.getElementById('loader').style.display='block';
                let formData= new FormData();
                formData.append("text",Tchek);
                const url= localhost+'/controleur.php?p=deleteSouscategorie'; 
                axios.post(url,formData)
                .then((res)=>{
                        if(res.data == 'categorie-sous-delete-success'){
                            
                            for(var i=0 ;i <Tchek.length;i++){
                                document.getElementById('del-'+Tchek[i]).classList.add('remove-all');
                            }

                            setTimeout(()=>{
                                for(var i=0 ;i <Tchek.length;i++){
                                    document.getElementById('del-'+Tchek[i]).style.display='none';
                                }
                            },500);

                                document.getElementById('loader').style.display='none';
                        }
                });

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

            if(document.getElementById('Souscategorie').value != ''){

                  let formData= new FormData();
                  formData.append("text", JSON.stringify([document.getElementById('Souscategorie').value.trim(),window.location.pathname.split('/')[3]]));
                  const url= localhost+'/controleur.php?p=addSousCategorie';
                  axios.post(url,formData)
                  .then((res)=>{

                          document.getElementById('btn-loader').innerHTML='Ajouter un sous categorie';
                          SetDisabled(true);

                         if(res.data === 'add-categorie-success'){
                            setfindTrue(0);
                              document.getElementById('response-message').style.display='block';
                              document.getElementById('response-message').style.backgroundColor='green';
                              document.getElementById('response-message').innerHTML=" <span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>Le Categorie a bien ete ajouter";
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
                if(document.getElementById('btn-loader') &&   document.getElementById('response-message')){
                    document.getElementById('btn-loader').innerHTML='Ajouter un Categorie';
                    SetDisabled(true);
                    document.getElementById('response-message').style.display='none';
                }
            },2000);

    }

    const button = function button(){
        if(disabled){
            return <button type="submit" id='btn-loader' name="submit_add" className="btn btn-primary" >Ajouter un sous categorie</button>
        }else{
            return <button type="submit" id='btn-loader' disabled name="submit_add" className="btn btn-primary" >Ajouter un sous categorie</button>
        }
    }
    
    return (
            <div> 
                 <MetaTags>
                    <title>Administration | click </title>
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
                                <h1><span class="glyphicon glyphicon-th-list"  aria-hidden="true"></span><b> Ajouter un sous  Categorie</b></h1>
                            </div>
                            
                        <div id='content-view-admin'>
                            <div className='view-menu'>
                                <ul>
                                        <li>
                                            {btnDelete()}
                                        </li>
                                        <li>
                                        </li>
                                        <li>
                                        </li>
                                        <li>
                                        </li>
                                </ul>
                            </div>
                        </div>

                        <div id='response' className='fade_up'>
    
                            {loader()}

                                <form method="post" onSubmit={(e)=>submit(e)}>
                                    <div class='form-group'>                           
                                        <label for="type" >Nom du sous categorie</label>
                                        <input type="text" id="Souscategorie" name="Souscategorie"   />
                                    </div>

                                    <div class='from-group'> 
                                        {button()}
                                    </div>
                                </form>

                        </div>

                    </div> 
                    <div id='response-message'>
                    </div>
                </div> 
        ); 
  }
export default Click;

