import React , {useEffect,useState} from 'react';
import cookie from 'cookie';
import MetaTags from 'react-meta-tags';
import axios from 'axios';
import {Link} from 'react-router-dom';
import localhost from '../../../_config';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const IndexAdmin=()=>{
 
    const [Rescategorie,setRescategorie]=useState([]);
    const [stop,setStop]=useState(0);
    const [disabled,SetDisabled]=useState(true);
    const [findTrue,setfindTrue]=useState(0);
    const [datares,setDatares]=useState(0);
    const [description,setDescription]=useState(null);
    const [nom,setNom]=useState(null);

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
        const url= localhost+'/controleur.php?p=getCouponsId'; 
        axios.post(url,formData)
        .then((res)=>{

            if(findTrue === 0){
                setDatares(res.data[0]);
                setDescription(res.data[0].description);
                setNom(res.data[0].title);
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

        var objet= [
            document.getElementById('nom').value,
            document.getElementById('description').value,
            document.getElementById('code').value,
            document.getElementById('Somme').value,
            document.getElementById('url').value,
            document.getElementById('url_img').value,
            document.getElementById('url_img_fond').value,
            document.getElementById('date').value,
            window.location.pathname.split('/')[3]
        ];

            if(verfie()){

                let formData= new FormData();
                formData.append("text", JSON.stringify(objet));
                const url= localhost+'/controleur.php?p=UpdateCoupons'; 
                axios.post(url,formData)
                    .then((res)=>{

                        console.log(res.data);

                        document.getElementById('btn-loader').innerHTML='Modifier';

                            SetDisabled(true);

                                if(res.data === 'update-success-coupons'){
                                    document.getElementById('response-message').style.display='block';
                                    document.getElementById('response-message').style.backgroundColor='green';
                                    document.getElementById('response-message').innerHTML=" <span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>Le coupons à bien été Modifier";
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
                    document.getElementById('btn-loader').innerHTML='Ajouter un coupons';
                    SetDisabled(true);
                    document.getElementById('response-message').style.display='none';
                }
            },2000);

    }

    const verfie = function verfie (){

        if(
            document.getElementById('nom').value   !=  datares.title  ||
            document.getElementById('description').value   !=   datares.description ||
            document.getElementById('Somme').value   !=   datares.somme ||
            document.getElementById('url').value   != datares.link ||
            document.getElementById('url_img').value   != datares.link_img ||
            document.getElementById('date').value   !=  datares.end_date
        ){
            return true;
        }
        else{
            return false
        }
           
    }
    const button = function button(){
        if(disabled){
            return <button type="submit" id='btn-loader' name="submit_add" className="btn btn-primary" >Modifier</button>
        }else{
            return <button type="submit" id='btn-loader' disabled name="submit_add" className="btn btn-primary" >Modifier</button>
        }
    }


    const FindData= function FindData(){

        if(findTrue === 1){

        return     <form method="post" onSubmit={(e)=>submit(e)} >
 
                        <div className='row'>

                            <div className='col-md-6'>
  
                                <div className='form-group'>
                                    <label htmlFor="type" >Nom de coupon</label>
                                    <input type='hidden' id='nom' value={nom}/>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={nom}
                                        onChange={ ( event, editor ) => {
                                            setNom(editor.getData());
                                        }}
                                    />
                                </div>
                               
                                <div className='form-group'>
                                    <label htmlFor="url" >Url</label>
                                    <input type="text" id="url" defaultValue={datares.link} style={{width:'100%'}} name="url" />
                                </div>

                                <div className='form-group'>
                                    <label htmlFor="url" >Url img</label>
                                    <input type="text" id="url_img" defaultValue={datares.link_img} style={{width:'100%'}} name="url" />
                                </div>
                                
                                <div className='form-group'>
                                    <label htmlFor="url" >Url img fond</label>
                                    <input type="text" id="url_img_fond" defaultValue={datares.url_img_fond} style={{width:'100%'}} name="url" />
                                </div>

                                <div className='form-group'>
                                    <label htmlFor="url" >Somme</label>
                                    <input  type="text" placeholder='euro' step="1" id="Somme" defaultValue={datares.somme} style={{width:'100%'}} name="url_image" />
                                </div>
                                    
                                <div className='form-group'>         
                                    <label htmlFor="code">Code du coupon</label>
                                    <input type="text"  placeholder='###' step="1" id="code" defaultValue={datares.code} style={{width:'100%'}} name="code"/>
                                </div>

                                {button()}

                            </div>
                    
                            <div className='col-md-6'>
                        
                                <div className='form-group'>  
                                    <label htmlFor="description">Description du coupon</label>
                                    <input type='hidden' id='description' value={description}/>
                                        <CKEditor
                                                editor={ ClassicEditor }
                                                data={description}
                                                onChange={ ( event, editor ) => {
                                                    setDescription(editor.getData());
                                                }}
                                        />
                                </div>
                                <div className='form-group'>  
                                        <label htmlFor="date1">Date d'expiration</label>
                                        <input type="date" id="date" defaultValue={datares.end_date} style={{width:'100%'}} name="dateFin" min={Date('Y-m-d')} />
                                </div>   

                            </div>
                    
                        </div>
                    
                    </form>
        }

    }
    
    return (
            <div> 

                <MetaTags>
                     <title>Administration | coupons update</title>
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
                            <h1><span className="glyphicon glyphicon-tags"  aria-hidden="true"></span><b>Modifier Coupons</b></h1>
                        </div>

                       {FindData()}
                    </div> 
                    
                    <div id='response-message'>
                    </div>
                </div> 
        ); 
  }
export default IndexAdmin;

