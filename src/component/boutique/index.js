import React , {useEffect,useState} from 'react';
import axios from 'axios';
import MetaTags from 'react-meta-tags';
import {Link} from 'react-router-dom'; 
import localhost from '../../_config';
import Carre from "../cashback/loader/rarre";
import Long from "../cashback/loader/long";
import Empiler from "../cashback/loader/empiler";
import All_data from "../cashback/loader/all_data";
import { useCookies } from "react-cookie";
import Footer from "../footer/index";

const Boutique=()=>{

    const [stop3,setStop3]=useState(0);
    const [resData,setResDate]=useState([]);
    const [dataPayment,setDataPayment]=useState([]);
    const [sommePayment,setsommePayment]=useState([]);
    const [desable,setDesable]=useState(false);
    const [cookies, setCookie] = useCookies(null);

    useEffect(()=>{

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

        if(stop3 === 0){
            setelement(0);
        }
    })

    const setelement= function setelement(e){
         
            let formData= new FormData();
                formData.append("text",e);
                const url= localhost+'/controleur.php?p=ViewBoutique'; 
                axios.post(url,formData)
                .then((res)=>{
                       setResDate(res.data);
                       setTimeout(()=>{
                        setStop3(1);
                       },500)
                });

    }

    const setData = function setData(){

        var amazone=[];
        var virement=[];
        var paypal=[];

        for(var i=0;i < resData.length;i++){

            if(resData[i].id_type === '1'){
                paypal.push(resData[i]);
            }else if(resData[i].id_type === '2'){
                amazone.push(resData[i]);
            }else if(resData[i].id_type === '3'){
                virement.push(resData[i])
            }

        }


        //select amazone

        var dataAmozone=[];
        for(var a=0;a < amazone.length;a++){
            dataAmozone.push(
            <div className='boutique-content'>
                    <center>
                        <img src={'/img/'+amazone[a].id_type+'.png'}/>
                    </center>
                    <h2>
                      {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(amazone[a].somme*1)}
                    </h2>
                    <button onClick={buttonDelete.bind(this,amazone[a])}>
                            Commander
                        </button>
                     
            </div>)
        }

        //select virement 
        var dataVirement=[];

        for(var a=0;a < virement.length;a++){
            dataVirement.push(
            <div className='boutique-content'>
                    <center>
                        <img src={'/img/'+virement[a].id_type+'.png'}/>
                    </center>
                    <h2>
                      {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(virement[a].somme*1)}

                    </h2>
                    <button onClick={buttonDelete.bind(this,virement[a])}>
                            Commander
                        </button>

            </div>)
        }

        //selct papal
        var dataPaypal=[];
        for(var a=0;a < paypal.length;a++){
            dataPaypal.push(
            <div className='boutique-content'>
                    <center>
                        <img src={'/img/'+paypal[a].id_type+'.png'}/>
                    </center>
                      <h2>
                      {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(paypal[a].somme*1)}
                      </h2> 
                    <button onClick={buttonDelete.bind(this,paypal[a])}>
                            Commander
                        </button>
            </div>)
        }

        return <div className='boutique-content-all-btn'>
                    <div>
                        <h1>Amazone</h1>
                        {dataAmozone}
                    </div>
                    <div>
                        <h1>Virement bancaire</h1>
                        {dataVirement}
                    </div>
                    <div>
                        <h1>Paypal</h1>
                        {dataPaypal}
                    </div>
                </div>;
    }

    const buttonDelete= function buttonDelete(e,id){
        id.preventDefault();
        document.getElementById('resCoupns').style.display='block';
        document.getElementById('backgrondcoupons').style.display='block';

        if(cookies._lo != null){

            if(cookies._lo.argent*1 >= e.somme*1){
                setDataPayment(e.id_type*1);
                setsommePayment(e.somme*1);
            }else{
                setDataPayment(6);
            }

        }else{
            setDataPayment(5);
        }

    }

    const loader= function loader(){
        if(stop3 === 1){
            return <div className="container-view-all">
                        <div className='row'>
                            <div className='col-md-4'>
                                <div className='boutique-left'>
                                    <h1>Boutique </h1>
                                    <img src='/img/boutique.png'/>
                                </div>
                            </div>
                                <div className='col-md-8'>
                                            {setData()}
                                </div> 
                    </div> 
                    </div> 
                }else{
                    return  <div className="container-view-all">

                            <div className="row">
                                <div className="col-md-4">
                                    <Empiler />
                                </div>

                                <div className="col-md-8">
                                    <Empiler />
                                    <Empiler />
                                    <Empiler />
                                </div>
                            </div>
                        
                        </div> 
                }

    }

    const button= function button(){
        if(desable === false){
            return  <button className='btn btn-facil'>
                        Commander
                    </button>
        }else{
            return  <button disabled className='btn btn-facil'>
                            chargement...
                    </button>
        }
    }
    
    const close= function close(){
        document.getElementById('resCoupns').style.display='none';
        document.getElementById('backgrondcoupons').style.display='none';
        setDataPayment(null);
        setDesable(false);

    }

    const datModalCoupons= function datModalCoupons(){

        if(dataPayment*1 === 1){
            return <div className='popup-boutique'>
                        <center>
                            <img src={'/img/'+dataPayment*1+'.png'}/>
                        </center>
                        <form method='POST' onSubmit={(e)=>{ addPaypal(e) }}>

                            <div className='form-group'>
                                <label>
                                    Votre nom complet
                                </label>
                                <input type='text' value={cookies._lo.nom+' '+cookies._lo.prenom} id="nom_complet_paypal" />
                            </div>
                            <div className='form-group'>
                                <label>
                                    Votre email paypal
                                </label>
                                <input type='email' id="email_paypal" />
                            </div>
                            {button()}
                        </form>

                    </div>
        }else if(dataPayment*1 === 2){
            return  <div className='popup-boutique'>
                        <center>
                            <img src={'/img/'+dataPayment*1+'.png'}/>
                        </center>
                        <form method='POST' onSubmit={(e)=>{ addamazone(e) }}>

                            <div className='form-group'>
                                <label>
                                    Votre nom complet
                                </label>
                                <input type='text' value={cookies._lo.nom+' '+cookies._lo.prenom} id="nom_complet_amazone" />
                            </div>
                            <div className='form-group'>
                                <label>
                                    Votre email pour recevoir le code
                                </label>
                                <input type='email' id="email_amazone" />
                            </div>
                            {button()}

                        </form>
                    </div>

        }else if(dataPayment*1 === 3){

                return <div className='popup-boutique'>
                    <center>
                        <img src={'/img/'+dataPayment*1+'.png'}/>
                    </center>
                    <form method='POST'>
                        <div className='form-group'>
                            <label>
                                Votre nom complet
                            </label>
                            <input type='text' value={cookies._lo.nom+' '+cookies._lo.prenom} id="nom_complet_bank" />
                        </div>
                        <div className='form-group'>
                            <label>
                                Nom de la banque
                            </label>
                            <input type='text' id="nom_bank"/>
                        </div>
                        <div className='form-group'>
                            <label>
                                Votre IBAN
                            </label>
                            <input type='text' id="Iban_bank" />
                        </div>
                        <div className='form-group'>
                            <label>
                                Votre RIB
                            </label>
                            <input type='number' min='0' step='1' id="RibBAnk" />
                        </div>
                        <button className='btn btn-facil' onClick={(e)=>{ addBank(e) }}>
                            Commander
                        </button>
                    </form>
                    
                </div>
        }else if(dataPayment === 6){

            return <div className='popup-boutique'>
                        <div className='message-comfirmaion'>
                            <button  onClick={()=>{
                                        close();
                                    }}>
                                    Ferme
                                </button>
                            <center>
                                <img src='/img/solde.png' />
                            </center>
                                <h1>
                                    Votre solde est insufissant pour effectuez se virement
                                </h1>
                                
                        </div>
                    </div>

        }else if(dataPayment === 5){

            return <div className='popup-boutique'>
                        <div className='message-comfirmaion'>
                        <button onClick={()=>{
                                        close();
                                    }}>
                                    Ferme
                                </button>
                                <h1>
                                  connecter vous pour utiliser se service
                                </h1>
                        </div>
                    </div>

        }else{
           return <div className='popup-boutique'>
                    <div className='message-comfirmaion'>
                    <button  onClick={()=>{
                                    close();
                                }}>
                                Ferme
                            </button>
                        <center>
                            <img src='/img/amico.png' />
                        </center>
                            <h1>
                                Votre demande a ete pris en compte et verifier consulter regulierement votre 
                                historique sur votre compte pour comfirmer
                            </h1>
                         
                    </div>
                  </div>
        }
         
    }

    const addBank= function addBank(e){

        e.preventDefault();

                    var data=[
                        cookies._lo.id,
                        dataPayment,
                        document.getElementById('nom_complet_bank').value,
                        document.getElementById('nom_bank').value,
                        document.getElementById('Iban_bank').value,
                        document.getElementById('RibBAnk').value,
                        sommePayment
                    ]
            
                        if(
                            document.getElementById('nom_complet_bank').value != '' &&
                            document.getElementById('nom_bank').value != '' &&
                            document.getElementById('Iban_bank').value != '' &&
                            document.getElementById('RibBAnk').value != '' 
                        ){

                            setDesable(true);
                            
                            let formData= new FormData();
                            formData.append("text",JSON.stringify(data));
                            const url= localhost+'/controleur.php?p=addHistoVirementBancaire'; 
                            axios.post(url,formData)
                            .then((res)=>{
                              setDesable(false);

                                    if(res.data === 'add-histo-payment-success'){
                                        setDataPayment(4);
                                      setDesable(false);

                                    }
                            });

                        }else{
                            setDesable(false);
                            alert('veuiller remplir tout les champs');
                        }
                  
    }

    const addamazone= function addamazone(e){

        e.preventDefault();

        var data=[
            cookies._lo.id,
            dataPayment,
            document.getElementById('nom_complet_amazone').value,
            document.getElementById('email_amazone').value,
            sommePayment
        ]
        if(
            document.getElementById('nom_complet_amazone').value != '' &&
            document.getElementById('email_amazone').value != ''
        ){
            setDesable(true);
                   
            let formData= new FormData();
            formData.append("text",JSON.stringify(data));
            const url= localhost+'/controleur.php?p=addHistoAmazone'; 
            axios.post(url,formData)
            .then((res)=>{
                  setDesable(false);
                    if(res.data === 'add-histo-payment-success'){
                        setDataPayment(4);
                    }
            });

        }else{
            setDesable(false);
            alert('veuiller remplir tout les champs');
        }

    }

    const addPaypal= function addPaypal(e){

          e.preventDefault();
  
          var data=[
              cookies._lo.id,
              dataPayment,
              document.getElementById('nom_complet_paypal').value,
              document.getElementById('email_paypal').value,
              sommePayment
          ]
          if(
              document.getElementById('nom_complet_paypal').value != '' &&
              document.getElementById('email_paypal').value != ''
          ){
              setDesable(true);
              let formData= new FormData();
              formData.append("text",JSON.stringify(data));
              const url= localhost+'/controleur.php?p=addHistopaypal'; 
              axios.post(url,formData)
              .then((res)=>{
                    setDesable(false);
                      if(res.data === 'add-histo-payment-success'){
                          setDataPayment(4);
                      }
              });
          }else{
              alert('veuiller remplir tout les champs');
              setDesable(false);
          }
  
      }

    return (
            <div> 
                 <MetaTags>
                     <title>Boutique</title>
                </MetaTags>
                <div className='boutique-view'>
                    {loader()}
                <Footer/>

                </div>
                <div id='backgrondcoupons' onClick={()=>{
                     close();
                }} >
           
        </div>

        <div id='resCoupns'>
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
                {datModalCoupons()}
        </div>
            </div>
        ); 
  }
export default Boutique;

