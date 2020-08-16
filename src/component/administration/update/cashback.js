import React , {useEffect,useState} from 'react';
import MetaTags from 'react-meta-tags';
import axios from 'axios';
import localhost from '../../../_config';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import parse from 'html-react-parser';
const UdapdeCahback=()=>{

    const [Rescategorie,setRescategorie]=useState([]);
    const [stop,setStop]=useState(0);
    const [disabled,SetDisabled]=useState(true);
    const [findTrue,setfindTrue]=useState(0);
    const [datares,setDatares]=useState(0);
 
    const [description,setDescription]=useState(null);
    const [Condition,setCondition]=useState(true);

    useEffect(()=>{
        getCategorie();
        getFindData(window.location.pathname.split('/')[3]);
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
        
    const getFindData = function getFindData(id){

        document.getElementById('loader').style.display='block';

        let formData= new FormData();
        formData.append("text",id);
        const url= localhost+'/controleur.php?p=getCashbackId'; 
        axios.post(url,formData)
        .then((res)=>{

             if(findTrue === 0){
                 setDatares(res.data[0]);
                 setCondition(res.data[0].Condition_c);
                 setDescription(res.data[0].description);
                 setfindTrue(1);
             }

            document.getElementById('loader').style.display='none';
        });

    }  

    const button = function button(){

        if(disabled){
            return <button type="submit" id='btn-loader' name="submit_add" className="btn btn-primary" >Modifier un coupons</button>
        }else{
            return <button type="submit" id='btn-loader' disabled name="submit_add" className="btn btn-primary" >Modifier un coupons</button>
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
                document.getElementById('Ancien').value.trim(),
                document.getElementById('nouveaux').value.trim(),
                document.getElementById('url').value.trim(),
                document.getElementById('url_img').value.trim(),
                document.getElementById('nom').value.trim(),
                document.getElementById('description').value.trim(),
                document.getElementById('Condition').value.trim(),
                document.getElementById('dateFin').value.trim(),
                window.location.pathname.split('/')[3]
            ];

            if(verfie(objet)){

                let formData= new FormData();
                formData.append("text", JSON.stringify(objet));
                const url= localhost+'/controleur.php?p=UpdateCashback';
                axios.post(url,formData)
                    .then((res)=>{

                            document.getElementById('btn-loader').innerHTML='Modifier le Cashback';
                            SetDisabled(true);

                                if(res.data === 'update-success-cashback'){
                                        document.getElementById('response-message').style.display='block';
                                        document.getElementById('response-message').style.backgroundColor='green';
                                        document.getElementById('response-message').innerHTML=" <span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>Le Cashback à bien été Modifier";
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
                if(document.getElementById('btn-loader') &&   document.getElementById('response-message')){
                    document.getElementById('btn-loader').innerHTML='Modifier un coupons';
                    SetDisabled(true);
                    document.getElementById('response-message').style.display='none';
                }
            },2000)
    }

    const verfie = function verfie (){

        if(  
            document.getElementById('Ancien').value  != datares.Ancien ||
            document.getElementById('nouveaux').value  != datares.Nouveaux ||
            document.getElementById('url').value  != datares.link ||
            document.getElementById('url_img').value  != datares.link_img ||
            document.getElementById('nom').value  != datares.nom ||
            document.getElementById('dateFin').value != datares.end_date 
        ){

            return true;

        }else{

            return false;

        }

    }

    const findData  = function findData(){

        if(findTrue === 1){
                return   <form method="post" onSubmit={(e)=>submit(e)}>

                <div className='row'>
                    
                            <div className='col-md-6'>
                                <div class='form-group'>                           
                                      <label for="type" >Nom de Cashback</label>
                                      <input type="text" style={{width:'100%'}} defaultValue={datares.nom} id="nom" name="nom"   />
                                  </div>
                                               
                                 <div class='form-group'>
                                      <label for="url">Url magasin</label>
                                      <input type="text" id="url" style={{width:'100%'}} defaultValue={datares.link} name="url" />
                                  </div>
                
                                  <div class='form-group'>
                                      <label for="url">Url image</label>
                                      <input type="text" id="url_img" style={{width:'100%'}}  defaultValue={datares.url_img} name="url_img"  />
                                  </div>
                
                                  <div class='form-group'>
                                      <label for="renumeration">Ancien Cashback</label>
                                      <input type="text"    placeholder='%'  step="1" style={{width:'100%'}} defaultValue={datares.Ancien} id="Ancien" name="Ancien" />
                                  </div>
                
                                  <div class='form-group'>
                                      <label for="renumeration">Nouveau Cashback</label>
                                      <input type="text"  placeholder='%' step="1" style={{width:'100%'}} defaultValue={datares.Nouveaux} id="nouveaux" name="nouveaux" />
                                  </div>
                
                                  <div class='from-group'> 
                                      {button()}
                                  </div>
                    </div>
                    <div className='col-md-6'>
                
                                  <div class='form-group'>
                                      <label for="description">Description</label>
                                      <input type='hidden' id='description' value={description}/>
                                   
                                      <CKEditor
                                            editor={ ClassicEditor }
                                            data={description}
                                            onChange={ ( event, editor ) => {
                                                setDescription(editor.getData());
                                            }}
                                       />
                                  </div>
                
                                  <div class='form-group'>
                                      <label for="Condition">Condition</label>
                                      <input type='hidden' id='Condition' value={Condition}/>
z                                      <CKEditor
                                            editor={ ClassicEditor }
                                            data={Condition}
                                            onChange={ ( event, editor1 ) => {
                                                setCondition(editor1.getData());
                                            }}
                                       />
                                  </div>
                                   
                                  <div class='from-group'> 
                                      <label for="dateFin">Date d'expiration</label>
                                      <input type="date" style={{width:'100%'}} defaultValue={datares.end_date} id="dateFin" name="dateFin"/>
                                  </div>
                                
                    </div>
                
                </div>
                                  
                              </form>
        }
                    
    
    }

    return (
            <div> 
                 <MetaTags>
                     <title>Administration | update cashback</title>
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
                    <h1><span class="glyphicon glyphicon-bookmark"  aria-hidden="true"></span><b> Modifier Cashback</b></h1>
                </div>

                {findData()} 

            </div> 
                    <div id='response-message'>
                    </div>
            </div>  
        ); 
  }
export default UdapdeCahback;

