import React , {useEffect,useState} from 'react';
import cookie from 'cookie';
import MetaTags from 'react-meta-tags';
import {Link} from 'react-router-dom';
import axios from 'axios';
import localhost from '../../../_config';
import Moment from 'react-moment';
import 'moment/locale/fr';

const Cashback=()=>{

    const [Rescategorie,setRescategorie]=useState([]);
    const [stop,setStop]=useState(0);
    const [stop2,setStop2]=useState(0);
    const [stop3,setStop3]=useState(0);
    const [Tchek,setTchek]=useState([]);
    const [TchekaddHome,setTchekaddHome]=useState([]);
    const [Tchekremove,setTchekremove]=useState([]);
    const [resData,setResDate]=useState([]);
    const [cate,setCat]=useState(0);

    useEffect(()=>{
        getCategorie();
        if(stop3 === 0){
            setelement(0);
        }
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

    const categorieRes = function categorieRes(){
        var element =[];
        for(var i=0;i<Rescategorie.length;i++ ){
            element.push(
                <option value={Rescategorie[i].id}>{Rescategorie[i].nom_categorie}</option>
            )
        }
        return element;
    }

    const inputChange = function inputChange (event){
        
        event.preventDefault();
        setStop2(0);
        setTchekremove([]);
        setTchekaddHome([]);
        setTchek([]);
        setelement(event.target.value);
        setCat(event.target.value);

    }

    const setelement= function setelement(e){
         
        document.getElementById('response').classList.replace('fade_up','fade_down');

            let formData= new FormData();
                formData.append("text",JSON.stringify(e));
                const url= localhost+'/controleur.php?p=gethistocashback'; 
                axios.post(url,formData)
                .then((res)=>{
                    console.log(res.data);
                        setResDate(res.data);
                        setStop2(1);
                        setStop3(1);
                        document.getElementById('response').classList.replace('fade_down','fade_up');
                        var inputs = document.getElementsByTagName("input");
                        for(var i = 0; i < inputs.length; i++) {
                            if(inputs[i].type == "checkbox") {
                                inputs[i].checked = false;
                            }
                        } 
                });

    }

    const data= function data(){
         
        var element =[];
        element.push(
            <div className='row table'>
                    <div className='inline-table'></div>
                    <div className='inline-table' style={{width:'25vh'}}>Nom de la boutique</div>
                    <div className='inline-table'>Utilisateur</div>
                    <div className='inline-table'>cashback</div>
                    <div className='inline-table'>Date</div>
                    <div className='inline-table'>Ip</div>
            </div>
        )

         if(resData.length == 0){
             return <center><h1>Aucune information</h1></center>;
         }else{
             for(var i=0;i<resData.length;i++ ){
                 element.push( 
                    <div id={'del-'+resData[i].id} className='content-view-table row'>
                            <div className='inline-table'><input type='checkbox'  onChange={checkio.bind(this,resData[i].id)} /></div>
                            <div className='inline-table' style={{width:'25vh'}}>{resData[i].cashback_name}</div>
                            <div className='inline-table'>{resData[i].name_users}</div>
                            <div className='inline-table'>{resData[i].cashback_p}</div>
                            <div className='inline-table'><i class="glyphicon glyphicon-time" aria-hidden="true"></i><Moment fromNow>{resData[i].date}</Moment></div>
                            <div className='inline-table'>{resData[i].ip_historique}</div>
                    </div>
                 )
             }       
             return element;
         }
        
    }


    const activer = function activer(id,e){
      
        e.preventDefault()

        document.getElementById('loader').style.display='block';
        document.getElementById('del-'+id).style.backgroundColor="#aaa";
        let formData= new FormData();
        formData.append("text",id);
        const url= localhost+'/controleur.php?p=CashbackStatus'; 
        axios.post(url,formData)
        .then((res)=>{

                if(res.data == 'cashback-status-home-success'){
                        setTchekremove([]);
                        setTchekaddHome([]);
                        setTchek([]);
                            if(cate === 0){
                                setelement(0);
                            }else{
                                setelement(cate);
                            }
                                document.getElementById('del-'+id).style.backgroundColor="transparent";
                                document.getElementById('loader').style.display='none';
               }

         });

    }

        const checkio = function checkio(io,e){

            var element5 = [];

            for(var i=0;i< Tchek.length;i++ ){
                if(Tchek[i] != io){
                    element5.push(Tchek[i]);
                }
            }  

                if(!Tchek.includes(io)){
                    element5.push(io);
                }

                    setTchek(element5.sort((a,b)=>a-b));
                    document.getElementById('del-'+io).style.backgroundColor='transparent';

        }
        
        const nbrCheck= function nbrCheck(e){
                if(Tchek.length > 0){
                    return '( '+Tchek.length+' )';
                }
        }

        const btnAdd= function btnAdd(){
            if(Tchek.length > 0){
                return <button className='btn-success'  onClick={()=>{ comfirme()}} >comfirme{nbrCheck()}</button>
            }
        }

        const btnRemove= function btnRemove(){
            if(Tchek.length > 0){
                return <button className='btn-warning' onClick={()=>{ refuse()}} >Refuser{nbrCheck()}</button>
            }
        }

        const comfirme = function comfirme(){
            
            for(var i=0 ;i <Tchek.length;i++){
                document.getElementById('del-'+Tchek[i]).style.backgroundColor="#aaa";
            }

            document.getElementById('loader').style.display='block';
            let formData= new FormData();
            formData.append("text",Tchek);
            const url= localhost+'/controleur.php?p=CashbackcomfirmeAdmin'; 
            axios.post(url,formData)
            .then((res)=>{
  
                    if(res.data == 'validation-success'){

                        for(var i=0 ;i <Tchek.length;i++){
                            document.getElementById('del-'+Tchek[i]).style.backgroundColor="transparent";
                        }
                     
                            setTchek([]);
    
                            if(cate === 0){
                                setelement(0);
                            }else{
                                setelement(cate);
                            }

                        document.getElementById('loader').style.display='none';
                   }
             });
        }

        const refuse = function refuse(){
            
            for(var i=0 ;i <Tchek.length;i++){
                document.getElementById('del-'+Tchek[i]).style.backgroundColor="#aaa";
            }

            document.getElementById('loader').style.display='block';
            let formData= new FormData();
            formData.append("text",Tchek);
            const url= localhost+'/controleur.php?p=CashbackRefuAdmin'; 
            axios.post(url,formData)
            .then((res)=>{
  
                    if(res.data == 'validation-refu-success'){

                        for(var i=0 ;i <Tchek.length;i++){
                            document.getElementById('del-'+Tchek[i]).style.backgroundColor="transparent";
                        }
                     
                            setTchek([]);
    
                            if(cate === 0){
                                setelement(0);
                            }else{
                                setelement(cate);
                            }

                                document.getElementById('loader').style.display='none';
  
                   }

             });
  
        }

    const loader = function loader(){
        
        if(stop2 == 1){
            return data();
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


    const gliphicon = function gliphicon(e){
        if (e == 1) {
            return  <div style={{color:'green',textAlign:'center'}} >
                        <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
                   </div> 

        }else if (e == 0) {
            return <div style={{color:'red',textAlign:'center'}} >
                    <span className="glyphicon glyphicon-remove-sign" aria-hidden="true"></span>
                </div> 
        }
    }
 
    return (
            <div> 
                
                 <MetaTags>
                     <title>Administration | coupons view</title>
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
                        <div id='titre-admin'>
                            <h1><span class="glyphicon glyphicon-bookmark"   aria-hidden="true"></span><b>Cashback</b></h1>
                        </div>
                        
                        <div id='content-view-admin'>
                            <div className='view-menu'>
                                <ul>
                                        <li>
                                            <select name="categorie" onChange={inputChange} style={{width :" 250px",border: '0.5vh solid #aaa',borderRadius:'1vh',padding:'1vh'}}>
                                                <option value='0'>Toute categorie</option>
                                                {categorieRes()}
                                            </select>
                                        </li>

                                        <li>
                                            {btnAdd()}
                                        </li>

                                        <li>
                                            {btnRemove()}
                                        </li>
                                     
                                </ul>
                            </div>
                        </div>

                        <div id='response' className='fade_up'>
                            {loader()}
                        </div>

                    </div> 
                    <div className="float-right" data-aos="zoom-in">
                                <Link to='/administration/cashback-add' className='btn btn-admin-add'>+</Link>
                    </div>
                </div> 
        ); 
  }
export default Cashback;

