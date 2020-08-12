import React , {useEffect,useState} from 'react';
import MetaTags from 'react-meta-tags';
import axios from 'axios';
import localhost from '../../../_config';
 

const AddCashback=()=>{

    const [disabled,SetDisabled]=useState(true);

    useEffect(()=>{
    })

    const button = function button(){
        if(disabled){
            return <button type="submit" id='btn-loader' name="submit_add" className="btn btn-primary" >Ajouter une boutique</button>
        }else{
            return <button type="submit" id='btn-loader' disabled name="submit_add" className="btn btn-primary" >Ajouter une boutique</button>
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

            console.log( [
                document.getElementById('SelectBoutique').value,
                document.getElementById('momtant').value
            ])
                if(
                    document.getElementById('SelectBoutique').value != 0 &&
                    document.getElementById('momtant').value != ''){

                    let formData= new FormData();

                    formData.append("text", JSON.stringify(
                        [
                            document.getElementById('SelectBoutique').value,
                            document.getElementById('momtant').value
                        ]
                    ));

                    const url= localhost+'/controleur.php?p=addboutique';
                    axios.post(url,formData)
                    .then((res)=>{

                            document.getElementById('btn-loader').innerHTML='Ajouter un boutique';
                            SetDisabled(true);

                                if(res.data === 'add-boutique-success'){
                                    document.getElementById('response-message').style.display='block';
                                    document.getElementById('response-message').style.backgroundColor='green';
                                    document.getElementById('response-message').innerHTML=" <span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>Le boutique a bien ete ajouter";
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
                        document.getElementById('btn-loader').innerHTML='Ajouter un boutique';
                        SetDisabled(true);
                        document.getElementById('response-message').style.display='none';
                    }
                },2000);
    }

    return (
            <div> 
                
                <MetaTags>
                     <title>Administration | add boutique</title>
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
                    <h1><span class="glyphicon glyphicon-bookmark"  aria-hidden="true"></span><b> Ajouter boutique</b></h1>
                </div>
                     
                <form method="post" onSubmit={(e)=>submit(e)}>

                    <div class='form-group'>                           
                            <label for="type" >Selectionner le boutique</label>
                                <select  name="SelectBoutique" id='SelectBoutique' style={{width:'50%'}}>
                                    <option value='0'>Selectionner un categorie</option>
                                    <option value='1'>Paypal</option>
                                    <option value='2'>Amazone</option>
                                    <option value='3'>Virement bancaire</option>
                                </select>
                    </div>

                    <div class='form-group'>                           
                            <label for="type" >Le momtant</label>
                            <input type="number" min='0' step='1' id="momtant" placeholder='euro' name="momtant"   />
                    </div>

                    {button()}
                    
                </form>

                </div> 
                    <div id='response-message'>
                </div>

            </div>  
        ); 
  }
export default AddCashback;

