import React , {useEffect,useState} from 'react';
import MetaTags from 'react-meta-tags';
import {Link} from 'react-router-dom';
import axios from 'axios';
import localhost from '../../../_config';
import 'moment/locale/fr';

const Mission=()=>{

    const [stop2,setStop2]=useState(0);
    const [stop3,setStop3]=useState(0);
    const [Tchek,setTchek]=useState([]);
    const [resData,setResDate]=useState([]);
    const [cate,setCat]=useState(0);

    useEffect(()=>{
        if(stop3 === 0){
            setelement(0);
        }
    })

    const setelement= function setelement(e){
         
        document.getElementById('response').classList.replace('fade_up','fade_down');

            let formData= new FormData();
                formData.append("text",e);
                const url= localhost+'/controleur.php?p=ViewMission'; 
                axios.post(url,formData)
                .then((res)=>{
                       setResDate(res.data);
                       setStop2(1);
                       setStop3(1);
                       if(document.getElementById('response')){
                        document.getElementById('response').classList.replace('fade_down','fade_up');
                       }
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
                <div className='inline-table' style={{width:'15vh'}}>Titre</div>
                <div className='inline-table'>renumeration</div>
                <div className='inline-table'>used/today</div>
                <div className='inline-table' style={{width:'10vh'}}>Prenium</div>
                <div className='inline-table' style={{width:'10vh'}}>Etat</div>
                <div className='inline-table' style={{width:'35vh',textAlign:'start'}}>action</div>
            </div>
        )

         if(resData.length == 0){

            return <center><h1>Aucune information</h1></center>;

         }else{

             for(var i=0;i<resData.length;i++ ){
                 element.push( 
                    <div id={'del-'+resData[i].id} className='content-view-table row'>
                        <div className='inline-table'><input type='checkbox'   onChange={checkio.bind(this,resData[i].id)} /></div>
                        <div className='inline-table' style={{width:'15vh'}}>{resData[i].nom}</div>
                        <div className='inline-table'>{resData[i].remuneration}</div>
                        <div className='inline-table'>{resData[i].used}/{resData[i].used_today}</div>
                        <div className='inline-table' style={{width:'10vh'}}>{Prenium(resData[i].premium)}</div>  
                        <div className='inline-table' style={{width:'10vh'}}>{gliphicon(resData[i].actif)}</div>  
                        <div className='inline-table' style={{width:'35vh'}}>{btnActive(resData[i].actif,resData[i].id)}{PreniumBtn(resData[i].premium,resData[i].id)}<Link to={'/administration/mission-update/'+resData[i].id} className='btf btn-success'>Modifier</Link></div>
                    </div>
                 )
             }       

             return element;
         }
        
    }

    const gliphicon = function gliphicon(e){

        if (e == 1) {
           return  <div style={{color:'green',textAlign:'center'}} >
                        <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
                   </div> 

        } else if (e == 0) {
         return <div style={{color:'red',textAlign:'center'}} >
                    <span className="glyphicon glyphicon-remove-sign" aria-hidden="true"></span>
                </div> 
        }
    }

    const Prenium = function Prenium(e){

        if (e == 1) {
           return  <div className='alert alert-success' style={{padding:'0.5vh'}}>Prenium</div>
        }  
        
    }

    const btnActive= function btnActive(e,id){

        if(e == 0){
            return <button onClick={activer.bind(this,id)} className='btf btn-success'>Aciver </button>
        }else{
            return <button onClick={activer.bind(this,id)} className='btf btn-warning'>Desactiver</button>
        }

    }

    const PreniumBtn= function PreniumBtn(e,id){

        if(e == 0){
            return <button onClick={PremiumAtive.bind(this,id)} className='btf btn-success'>Aciver P</button>
        }else{
            return <button onClick={PremiumAtive.bind(this,id)} className='btf btn-warning'>Desactiver P</button>
        }

    }

    const activer = function activer(id,e){
      
        e.preventDefault()
        document.getElementById('loader').style.display='block';
        document.getElementById('del-'+id).style.backgroundColor="#aaa";
        let formData= new FormData();
        formData.append("text",id);
        const url= localhost+'/controleur.php?p=MissionStatus'; 
        axios.post(url,formData)
        .then((res)=>{

                if(res.data == 'mission-actif-success'){
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
 

    const PremiumAtive = function PremiumAtive(id,e){
      
        e.preventDefault()
        document.getElementById('loader').style.display='block';
        document.getElementById('del-'+id).style.backgroundColor="#aaa";
        let formData= new FormData();
        formData.append("text",id);
        const url= localhost+'/controleur.php?p=PrenuimMission'; 
        axios.post(url,formData)
        .then((res)=>{

                if(res.data == 'mission-premium-success'){
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

    const deleteAll= function deleteAll(){

        document.getElementById('loader').style.display='block';
          setTchek([]);

            for(var i=0 ;i <Tchek.length;i++){
                document.getElementById('del-'+Tchek[i]).style.backgroundColor="#aaa";
            }

                document.getElementById('loader').style.display='block';
                let formData= new FormData();
                formData.append("text",Tchek);
                const url= localhost+'/controleur.php?p=deleteMission'; 
                axios.post(url,formData)
                .then((res)=>{
                        if(res.data == 'mission-delete-success'){
                            
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
                            <h1><span class="glyphicon glyphicon-lock"  aria-hidden="true"></span><b>Mission</b></h1>
                        </div>
                    
                        <div id='content-view-admin'>
                            <div className='view-menu'>
                                <ul>
                                        <li>
                                      
                                        </li>

                                        <li>
                                        </li>

                                        <li>
                                        </li>

                                        <li>
                                            {btnDelete()}
                                        </li>

                                </ul>
                            </div>
                        </div>

                        <div id='response' className='fade_up'>
                            {loader()}
                        </div>

                    </div> 
                    <div class="float-right" data-aos="zoom-in">
                        <Link to='/administration/mission-add' className='btn btn-admin-add'>+</Link>
                    </div>
              
                </div> 
        ); 
  }
export default Mission;

