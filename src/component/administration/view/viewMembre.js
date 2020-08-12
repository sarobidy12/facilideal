import React , {useEffect,useState} from 'react';
import MetaTags from 'react-meta-tags';
import axios from 'axios';
import localhost from '../../../_config';
import count from '../../../country';

const ViewMember=()=>{
 
    const [disabled,SetDisabled]=useState(true);
    const [findTrue,setfindTrue]=useState(0);
    const [datares,setDatares]=useState(0);
    const [modif,setmodif] = useState(false);

    useEffect(()=>{
        getFindData(window.location.pathname.split('/')[3]);
    })
  
    const getFindData = function getFindData(id){

        document.getElementById('loader').style.display='block';

        let formData= new FormData();
        formData.append("text",id);
        const url= localhost+'/controleur.php?p=getUserId'; 
        axios.post(url,formData)
            .then((res)=>{
                
                if(findTrue === 0){
                    setDatares(res.data);
                    setfindTrue(1);
                    document.getElementById('loader').style.display='none';
                }
            });

    } 

    const submit= function submit(e){
        setmodif(true);
        e.preventDefault();

        var data=[
            document.getElementById('email').value,
            document.getElementById('nom').value,
            document.getElementById('prenom').value,
            document.getElementById('adresse').value,
            document.getElementById('ville').value,
            document.getElementById('codePostal').value,
            document.getElementById('pays').value,
            document.getElementById('telephonne').value,
            datares.id
        ]

        let formData= new FormData();
        formData.append("text",JSON.stringify(data));
        const url= localhost+'/controleur.php?p=mofifie_usera'; 
        axios.post(url,formData)
        .then((res)=>{
                if(res.data === 'update-success-users'){
                    document.getElementById('response-message').style.display='block';
                    document.getElementById('response-message').style.backgroundColor='green';
                    document.getElementById('response-message').innerHTML=" <span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>Vos informations à bien été modifier";
                    setTimeout(()=>{
                        if(document.getElementById('response-message')){
                            setmodif(false);
                        }
                    },2000)
                    document.getElementById('loader').style.display='none';
               
                }
        });

      

    }


    const findData= function findData(){
        
        if(findTrue === 1){

            return   <div id='myInforation'>
                
                    <div className='row' style={{width:'90%',margin:'0 auto',position:'relative',left:'0vh'}}>
                                <label for="nom">Sont Comptes est :<b id='modif'>{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(datares.argent*1)}</b></label>
                                <input type="number" step="1"  id="argent" defaultValue={datares.nom} name="nom"  required="required"/>
                                 {buttonVersementRetire()}
                    </div>

                <form method="POST" onSubmit={(e)=>{submit(e)}}>
                    <div className='row'>
                    
                        <div class="col-md-6" >
                                <label for="nom">Nom de famille :</label>
                                <input type="text"  id="nom" defaultValue={datares.nom} name="nom" placeholder="Entrez le nom de famille"  required="required"/>
                            
                                <label for="prenom">Prénom :</label>
                                <input type="text" id="prenom"  name="prenom" defaultValue={datares.prenom} placeholder="Entrez le prénom"  required="required"/>
                           
                                <label for="email">Adresse e-mail :</label>
                                <input type="email" id="email"  name="email" defaultValue={datares.email} placeholder="Entrez l'adresse e-mail"  required="required"/>
                      
                                <label for="telephonne">Numero telephonne :</label>
                                <input type="number" step="1" id="telephonne" name="telephonne" defaultValue={datares.telephone} placeholder="Entrez le Numero telephonne" />
                      

                        </div>
                        <div class="col-md-6" >

                                  <label for="ville">pays :</label>
                                <input type="text" id="pays" name="pays" defaultValue={datares.pays}  placeholder="Entrez votre pays" />
                           
                                <label for="ville">Ville :</label>
                                <input type="text" id="ville" name="ville" defaultValue={datares.ville}  placeholder="Entrez la ville" />
                           
                                <label for="adresse">Adresse complète :</label>
                                <input type="text" id="adresse" defaultValue={datares.adresse} name="adresse" placeholder="Entrez l'adresse complète (Rue + nr.)" />
                           
                                <label for="codePostal">Code postal :</label>
                                <input type="number" step="1" id id="codePostal" name="codePostal" defaultValue={datares.codePostal}  placeholder="Entrez le code postal" />
                             
                        </div>
                    </div>
                    {buttonModif()}
                </form>
                </div>
        }
    }
 
    const buttonModif= function buttonModif(){
        if(modif === false){
            return  <button>
                        Appliquer les modifications
                    </button>
        }else{
            return <button disabled style={{backgroundColor:'rgba(2, 110, 242, 0.445)'}}>
                        chargmenet...
                    </button>
        }
    } 

    const buttonVersementRetire= function buttonVersementRetire(){
        return <div>
            <button className='btn-success' style={{width: '15vh',margin:'0 3vh 0 0'}} onClick={()=>{
                Ajouter();
            }}>
                Ajouter 
            </button>
            <button className='btn-warning' style={{width: '15vh'}} onClick={()=>{
                retirer();
            }} >
                retire 
            </button>
        </div>
    }
 
    const Ajouter= function Ajouter(){
        var data =[
            datares.argent*1 + document.getElementById('argent').value*1,
            datares.id 
        ]
        if(document.getElementById('argent').value != ''){
            let formData= new FormData();
            formData.append("text",JSON.stringify(data));
            const url= localhost+'/controleur.php?p=UpdateArgent'; 
            axios.post(url,formData)
            .then((res)=>{
                    if(res.data === 'update-money-users'){
                        document.getElementById('modif').innerHTML=new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(datares.argent*1 + document.getElementById('argent').value*1);
                        document.getElementById('response-message').style.display='block';
                        document.getElementById('response-message').style.backgroundColor='green';
                        document.getElementById('response-message').innerHTML=" <span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>Vos informations à bien été modifier";
                        setTimeout(()=>{
                            if(document.getElementById('response-message')){
                                setmodif(false);
                            }
                        },2000)
                   
                    }
            });
        }else{
            document.getElementById('response-message').style.display='block';
            document.getElementById('response-message').style.backgroundColor='red';
            document.getElementById('response-message').innerHTML=" <span class=\"glyphicon glyphicon-exclamation-sign\" aria-hidden=\"true\"></span>Le champs est vide";
            setTimeout(()=>{
                if(document.getElementById('response-message')){
                    setmodif(false);
                }
            },2000)
        }

    }
    
    const retirer= function retirer(){
        var data =[
            datares.argent*1 - document.getElementById('argent').value*1,
            datares.id 
        ]
 
        if(document.getElementById('argent').value != ''){

            if(datares.argent > document.getElementById('argent').value*1){
                let formData= new FormData();
                formData.append("text",JSON.stringify(data));
                const url= localhost+'/controleur.php?p=UpdateArgent'; 
                axios.post(url,formData)
                .then((res)=>{
                        if(res.data === 'update-money-users'){
                            document.getElementById('modif').innerHTML=new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(datares.argent - document.getElementById('argent').value*1);
                            document.getElementById('response-message').style.display='block';
                            document.getElementById('response-message').style.backgroundColor='green';
                            document.getElementById('response-message').innerHTML=" <span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>Vos informations à bien été modifier";
                            setTimeout(()=>{
                                if(document.getElementById('response-message')){
                                    setmodif(false);
                                }
                            },2000)
                       
                        }
                });
            } else{
                document.getElementById('response-message').style.display='block';
                document.getElementById('response-message').style.backgroundColor='red';
                document.getElementById('response-message').innerHTML=" <span class=\"glyphicon glyphicon-exclamation-sign\" aria-hidden=\"true\"></span>Erreur de calcul verifier ";
                setTimeout(()=>{
                    if(document.getElementById('response-message')){
                        setmodif(false);
                    }
                },2000)
            }
            
        }else{
            document.getElementById('response-message').style.display='block';
            document.getElementById('response-message').style.backgroundColor='red';
            document.getElementById('response-message').innerHTML=" <span class=\"glyphicon glyphicon-exclamation-sign\" aria-hidden=\"true\"></span>Le champs est vide";
            setTimeout(()=>{
                if(document.getElementById('response-message')){
                    setmodif(false);
                }
            },2000)
        }

      

    }

    return (
            <div> 
                 <MetaTags>
                     <title>Administration | Modification membres</title>
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
                    <h1><span class="glyphicon glyphicon-user"  aria-hidden="true"></span><b> Modification membres</b></h1>
                </div>
              
              {findData()}

                    </div> 
                       <div id='response-message'>
                    </div>

            </div>  
        ); 
  }
export default ViewMember;

