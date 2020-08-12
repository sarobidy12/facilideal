import React , {useEffect,useState} from 'react';
import MetaTags from 'react-meta-tags';
import axios from 'axios';
import localhost from '../../../_config';
import count from '../../../country';

const UpdateClick=()=>{
 
    const [disabled,SetDisabled]=useState(true);
    const [findTrue,setfindTrue]=useState(0);
    const [datares,setDatares]=useState(0);
    const [categorie,idCategorie]=useState(null);

    useEffect(()=>{
        if(findTrue === 0){
            getFindData(window.location.pathname.split('/')[3]);
        }
    })

    const button = function button(){

        if(disabled){
            return <div>
                        <button type="submit" style={{width:'20vh',margin:'0 1vh'}} onClick={(e)=>{ comfirm(e) }} id='btn-loader' name="submit_add" className="btn btn-success" >comfirmer</button>
                        <button type="submit" style={{width:'20vh',margin:'0 1vh'}} onClick={(e)=>{ refuser(e) }} id='btn-loader' name="submit_add" className="btn btn-danger" >Refuser</button>
                    </div>
        }else{
            return  <div>
                        <button type="submit" style={{width:'20vh',margin:'0 1vh'}} id='btn-loader' disabled name="submit_add" className="btn btn-success" >comfirmer</button>
                        <button type="submit" style={{width:'20vh',margin:'0 1vh'}} id='btn-loader' disabled name="submit_add" className="btn btn-danger" >Refuser</button>
                    </div>
        }

    }
          

    const getFindData = function getFindData(id){

        document.getElementById('loader').style.display='block';

        let formData= new FormData();
        formData.append("text",JSON.stringify(id));
        const url= localhost+'/controleur.php?p=getComfirmationBoutique'; 
        axios.post(url,formData)
        .then((res)=>{
                setDatares(res.data);
                idCategorie(res.data.id_type_boutique);
                setfindTrue(1);
                console.log(res.data.id_type_boutique);
                console.log(window.location.pathname.split('/')[3]);
                document.getElementById('loader').style.display='none';
        });
    } 

     const findData= function findData(){

        console.log(categorie);

        if(findTrue === 1){

         if(categorie*1 === 1){
             return <div className='popup-boutique-admin'>
                                <img src={'/img/'+categorie*1+'.png'}/>
                                  <h3>
                                     {datares.prix+' €'}
                                 </h3> 

                                 <label>
                                     Votre nom complet
                                 </label>
                                 <h2>
                                     {datares.fullname}
                                 </h2>  
                                 <label>
                                    Votre email amazone
                                </label>
                                 <h2>
                                     {datares.emailpaypal}
                                 </h2>
                             {button()}

                     </div>
         }else if(categorie*1 === 2){
             return  <div className='popup-boutique-admin'>
                                   <img src={'/img/'+categorie*1+'.png'}/>
                                  <h3>
                                     {datares.prix+' €'}
                                 </h3> 

                             <label>
                                     Votre nom complet
                                 </label>
                                 <h2>
                                     {datares.fullname}
                                 </h2>  
                                 <label>
                                    Votre email amazone
                                </label>
                                 <h2>
                                     {datares.emailamazon}
                                 </h2>
                             {button()}

                     </div>

         }else if(categorie*1 === 3){

                 return <div className='popup-boutique-admin'>
                                 <img src={'/img/'+categorie*1+'.png'}/>
                                  <h3>
                                     {datares.prix+' €'}
                                 </h3> 
                                 <label>
                                     Votre nom complet
                                 </label>
                                 <h2>
                                     {datares.fullname}
                                 </h2> 
                                <label>
                                    Nom de la banque
                                </label>
                                <h2>
                                     {datares.bankname}
                                 </h2> 
                                <label>
                                    Votre IBAN
                                </label>
                                 <h2>
                                     {datares.iban}
                                 </h2>
                                <label>
                                    Votre RIB
                                </label>
                                 <h2>
                                     {datares.rib}
                                 </h2>
                                 {button()}
                 </div>
         }
        }

     }

     const comfirm= function comfirm(e){

        e.preventDefault();
        window.scrollTo({
            behavior:'smooth',
            top:0
        })

        document.getElementById('loader').style.display='block';
        document.getElementById('btn-loader').innerHTML='chargement ...';
        SetDisabled(false);
            
    
                 let formData= new FormData();
                 formData.append("text", JSON.stringify(window.location.pathname.split('/')[3]));
                 const url= localhost+'/controleur.php?p=ComfirmPayment';
                 axios.post(url,formData)
                 .then((res)=>{

                    
                         document.getElementById('btn-loader').innerHTML='comfirmer';
                         SetDisabled(true);

                                if(res.data === 'validation-success'){
                                    document.getElementById('response-message').style.display='block';
                                    document.getElementById('response-message').style.backgroundColor='green';
                                    document.getElementById('response-message').innerHTML=" <span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>Comfirmation reussi";
                                } else{
                                    document.getElementById('response-message').style.display='block';
                                    document.getElementById('response-message').style.backgroundColor='red';
                                    document.getElementById('response-message').innerHTML=" <span class=\"glyphicon glyphicon-exclamation-sign\" aria-hidden=\"true\"></span>une erreur est survenu";
                                }

                                    document.getElementById('loader').style.display='none';

                 });

            setTimeout(()=>{
                if(document.getElementById('btn-loader') && document.getElementById('response-message')){
                    document.getElementById('btn-loader').innerHTML='Ajouter un coupons';
                    SetDisabled(true);
                    document.getElementById('response-message').style.display='none';
                }
            },2000)

     }

     const refuser= function comfirm(e){

        e.preventDefault();
        window.scrollTo({
            behavior:'smooth',
            top:0
        })

            document.getElementById('loader').style.display='block';
            document.getElementById('btn-loader').innerHTML='chargement ...';
            SetDisabled(false);
            
                 let formData= new FormData();
                 formData.append("text", JSON.stringify(window.location.pathname.split('/')[3]));
                 const url= localhost+'/controleur.php?p=RefusePayment';
                 axios.post(url,formData)
                 .then((res)=>{
                    console.log(res.data);

                         document.getElementById('btn-loader').innerHTML='comfirmer';
                         SetDisabled(true);

                                if(res.data === 'validation-success'){
                                    document.getElementById('response-message').style.display='block';
                                    document.getElementById('response-message').style.backgroundColor='green';
                                    document.getElementById('response-message').innerHTML=" <span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>annulation reussi";
                                } else{
                                    document.getElementById('response-message').style.display='block';
                                    document.getElementById('response-message').style.backgroundColor='red';
                                    document.getElementById('response-message').innerHTML=" <span class=\"glyphicon glyphicon-exclamation-sign\" aria-hidden=\"true\"></span>une erreur est survenu";
                                }

                                    document.getElementById('loader').style.display='none';

                 });

                    setTimeout(()=>{
                        if(document.getElementById('btn-loader') && document.getElementById('response-message')){
                            document.getElementById('btn-loader').innerHTML='Ajouter un coupons';
                            SetDisabled(true);
                            document.getElementById('response-message').style.display='none';
                        }
                    },2000)

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

