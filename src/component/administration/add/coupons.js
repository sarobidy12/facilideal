import React , {useEffect,useState} from 'react';
import MetaTags from 'react-meta-tags';
import axios from 'axios';
import localhost from '../../../_config';

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


const AddCoupons=()=>{
     
    const [description,setDescription]=useState(null);
    const [stop3,setStop3]=useState(0);
    const [disabled,SetDisabled]=useState(true);
    const [affiliation,setgetaffiliation]=useState([]);
 
    useEffect(()=>{
        CashBack ();
    })

    const getAllCAshBack = function getAllCAshBack(){

        var element =[];
        for(var i=0;i<affiliation.length;i++ ){
            element.push(
                <option value={affiliation[i].id}>{affiliation[i].nom}</option>
            )
        }
        return element;

    }

        
    const CashBack  = function CashBack (){
        let formData= new FormData();
        formData.append("text",'text');
        const url= localhost+'/controleur.php?p=ViewCashback'; 
        axios.post(url,formData)
        .then((res)=>{

            if(stop3 === 0){
                setgetaffiliation(res.data);
                setStop3(1)
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
        document.getElementById('btn-loader').innerHTML='chargement ...';

        SetDisabled(false);

            var objet= [
                document.getElementById('nom').value,
                document.getElementById('description').value,
                document.getElementById('code').value,
                document.getElementById('Somme').value,
                document.getElementById('cashbackio').value,
                document.getElementById('url').value,
                document.getElementById('date').value
 
            ];

            if(verfie()){
                console.log(document.getElementById('description').value)

                let formData= new FormData();
                formData.append("text", JSON.stringify(objet));
                const url= localhost+'/controleur.php?p=addCoupons'; 
                axios.post(url,formData)
                .then((res)=>{
                    console.log(res.data);
                     document.getElementById('btn-loader').innerHTML='Ajouter un coupons';
                     SetDisabled(true);

                        if(res.data === 'add-success-coupons'){
                            document.getElementById('response-message').style.display='block';
                            document.getElementById('response-message').style.backgroundColor='green';
                            document.getElementById('response-message').innerHTML=" <span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>Le coupons a bien ete ajouter";
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
                    document.getElementById('btn-loader').innerHTML='Ajouter un coupons';
                    SetDisabled(true);
                    document.getElementById('response-message').style.display='none';
                }
            },2000)
    }

    const verfie = function verfie (){
        if(
            document.getElementById('nom').value  != '' &&
            document.getElementById('url').value  != '' &&
            document.getElementById('Somme').value  != '' &&
            document.getElementById('code').value  != '' &&
            document.getElementById('description').value  != '' &&
            document.getElementById('date').value != ''
        ){
            return true
        }else{
            return false
        }
       
    }

    const button = function button(){
        if(disabled){
            return <button type="submit" id='btn-loader' name="submit_add" className="btn btn-primary" >Ajouter un coupons</button>
        }else{
            return <button type="submit" id='btn-loader' disabled name="submit_add" className="btn btn-primary" >Ajouter un coupons</button>
        }
    }
    
    return (
            <div> 

                <MetaTags>
                     <title>Administration | coupons add</title>
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
                            <h1><span className="glyphicon glyphicon-tags"  aria-hidden="true"></span><b>Ajouter Coupons</b></h1>
                        </div>

                                <form method="post" onSubmit={(e)=>submit(e)} >
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <div className='form-group'>
                                                <label htmlFor="type" >Nom de coupon</label>
                                                <input type="text" id="nom" style={{width:'100%'}}  name="nom"/>
                                            </div>


                                            <div className='form-group'>
                                                <label>Le cashback</label>
                                                <select id="cashbackio" name="cashbackio" style={{width:'100%'}}>
                                                        {getAllCAshBack()}
                                                </select>
                                            </div>
                                            
                                            <div className='form-group'>
                                                <label htmlFor="url" >Url</label>
                                                <input type="text" id="url"  style={{width:'100%'}} name="url" />
                                            </div>

                                            <div className='form-group'>
                                                <label htmlFor="url" >Somme</label>
                                                <input type="number" min="0"   placeholder='euro'  step="1"  id="Somme" style={{width:'100%'}} name="url_image" />
                                            </div>
                                                
                                            <div className='form-group'>         
                                                <label htmlFor="code">Code du coupon</label>
                                                <input type="number" min="0"   placeholder='###'  step="1"  id="code" style={{width:'100%'}} name="code"/>
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
                                                    <input type="date" id="date"  style={{width:'100%'}} name="dateFin" min={Date('Y-m-d')} />
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
export default AddCoupons;

