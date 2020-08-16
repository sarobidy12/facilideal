import React , {useEffect,useState} from 'react';
import axios from 'axios';
import MetaTags from 'react-meta-tags';
import {Link} from 'react-router-dom'; 
import localhost from '../../../_config';

const IndexAdmin=()=>{

    const [stop3,setStop3]=useState(0);
    const [resData,setResDate]=useState([]);

    useEffect(()=>{
        if(stop3 === 0){
            setelement(0);
        }
    })

    const setelement= function setelement(e){
         
        document.getElementById('response').classList.replace('fade_up','fade_down');

            let formData= new FormData();
                formData.append("text",e);
                const url= localhost+'/controleur.php?p=histoBoutique'; 
                axios.post(url,formData)
                .then((res)=>{
                       setResDate(res.data);
                       setStop3(1);
                       document.getElementById('response').classList.replace('fade_down','fade_up');
                });

    }

    const setData = function setData(){

        var amazone=[];
        var virement=[];
        var paypal=[];

        for(var i=0;i < resData.length;i++){

            if(resData[i].id_type_boutique === '1' && resData[i].etat === '0' ){
                paypal.push(resData[i]);
            }else if(resData[i].id_type_boutique === '2' && resData[i].etat === '0'){
                amazone.push(resData[i]);
            }else if(resData[i].id_type_boutique === '3' && resData[i].etat === '0'){
                virement.push(resData[i])
            }

        }


        //select amazone

        var dataAmozone=[];
        for(var a=0;a < amazone.length;a++){
            dataAmozone.push(
            <div>
                <ul>
                <li>{amazone[a].fullname}</li>
                <li>{'Somme :'+amazone[a].prix+' €'}</li>
                    <li>
                        <Link to={'/administration/payment-comfirmation/'+amazone[a].id}>
                                comfirme
                        </Link>
                    </li>
                </ul>
            </div>)
        }

        //select virement 
        var dataVirement=[];

        for(var a=0;a < virement.length;a++){
            dataVirement.push(
            <div>
                <ul>
                    <li>{virement[a].fullname}</li>
                    <li>{'Somme :'+virement[a].prix+' €'}</li>
                    <li>
                        <Link to={'/administration/payment-comfirmation/'+virement[a].id}>
                                comfirme
                        </Link>
                    </li>
                </ul>
            </div>)
        }

        //selct papal
        var dataPaypal=[];

        for(var a=0;a < paypal.length;a++){
            dataPaypal.push(
            <div >
                <ul>
                    <li>{paypal[a].fullname}</li>
                    <li>{'Somme :'+paypal[a].prix+' €'}</li>
                    <li>
                        <Link to={'/administration/payment-comfirmation/'+paypal[a].id}>
                                comfirme
                        </Link>
                    </li>
                </ul>
            </div>)
        }

        return <div className='boutique-admin-comfirm'>
                    <div>
                        <h2>Amazone</h2>
                        {dataAmozone}
                    </div>
                    <div>
                        <h2>Virement bancaire</h2>
                        {dataVirement}
                    </div>
                    <div>
                        <h2>Paypal</h2>
                        {dataPaypal}
                    </div>
                </div>;
    }

    const buttonDelete= function buttonDelete(e,id){

        id.preventDefault();
        setStop3(0);
        document.getElementById('response').classList.replace('fade_up','fade_down');
        let formData= new FormData();
            formData.append("text",JSON.stringify(e));
            const url= localhost+'/controleur.php?p=deleteBoutique'; 
            axios.post(url,formData)
            .then((res)=>{ 

                console.log(res.data);
                
                if(res.data === 'delete-succes-boutique'){
                    setelement();
                }
            });

    }

    const loader= function loader(){
        if(stop3 === 1){
            return setData();
        }else{
            return  <center>
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
        </center> 
        }

    }

    return (
            <div> 
                 <MetaTags>
                     <title>Administration | Boutique</title>
                </MetaTags>

                <div className='container-admin' data-aos="fade-left">
                        <div id='titre-admin' >
                            <h1><span className="glyphicon glyphicon-shopping-cart"  aria-hidden="true"></span><b>Comfirmation de payment </b></h1>
                        </div>

                        <div id='response' className='fade_up'>
                            {loader()}
                        </div>
                </div> 

                <div className="float-right" data-aos="zoom-in">
                    <Link to='/administration/boutique-add' className='btn btn-admin-add'>+</Link>
                </div>

            </div>
        ); 
  }
export default IndexAdmin;

