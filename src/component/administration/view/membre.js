import React , {useEffect,useState} from 'react';
import axios from 'axios';
import MetaTags from 'react-meta-tags';
import {Link} from 'react-router-dom';
import localhost from '../../../_config';
import Moment from 'react-moment';
import 'moment/locale/fr';

const MembreAdmin=()=>{
 
    const [redirecturl,setRedirect]=useState(false);
    const [resData,setresData]=useState([]);
    const [stop2,setstop2]=useState(0);
    const [stop3,setstop3]=useState(0);
    
    useEffect(()=>{
        if(stop3 === 0){
            findUSerAll()
        } 
    })
    
    const find= function find(e){
       
        setstop2(0);
       
        e.preventDefault();
        setresData([]);
        if(document.getElementById('search')){
            if(document.getElementById('search').value != ''){
                
                    let formData= new FormData();
                    formData.append("text",JSON.stringify(document.getElementById('search').value));
                    const url= localhost+'/controleur.php?p=findUserName'; 
                    axios.post(url,formData)
                    .then((res)=>{

                        setresData(res.data);
                        setTimeout(()=>{
                            setstop2(1);
                        },500)
                    
                    });
            }else{
                findUSerAll();
            }
        }
    }

    const findUSerAll= function findUSerAll(){

                    let formData= new FormData();
                    formData.append("text",'null');
                    const url= localhost+'/controleur.php?p=findUser'; 
                    axios.post(url,formData)
                    .then((res)=>{

                        setresData(res.data);

                        setTimeout(()=>{
                            setstop3(1);
                        },500)
                    
                    });
    }

    const loader= function loader(){
        if(stop3 === 1 || stop2 === 1){
            return data();
        }else if(stop2 === 0){
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

    
    const data= function data(){
         
        var element =[];

         if(resData.length == 0){

            return <center><h1>Aucune resultat</h1></center>;

         }else{
            element.push(

                <div className='row table'>
                    <div className='inline-table' style={{width:'5vh',textAlign:'center'}}>ID</div>
                    <div className='inline-table' style={{width:'15vh'}}>Nom</div>
                    <div className='inline-table'>Prenom</div>
                    <div className='inline-table'><i class="glyphicon glyphicon-time" aria-hidden="true"></i></div>
                    <div className='inline-table' style={{width:'10vh'}}>argent</div>
                    <div className='inline-table' style={{width:'35vh',textAlign:'start'}}></div>
                </div>
            )
             for(var i=0;i<resData.length;i++ ){
                 element.push( 
                    <div id={'del-'+resData[i].id} className='content-view-table row'>
                            <div className='inline-table' style={{width:'5vh',textAlign:'center'}}>{resData[i].id}</div>
                            <div className='inline-table' style={{width:'15vh'}}>{resData[i].nom}</div>
                            <div className='inline-table'>{resData[i].prenom}</div>
                            <div className='inline-table'>  <i class="glyphicon glyphicon-time" aria-hidden="true"></i>
                            <Moment fromNow>{resData[i].date_Inscription}</Moment></div>
                            <div className='inline-table' style={{width:'10vh'}}>
                                {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(resData[i].argent*1)}
                            </div>
                                <div className='inline-table'>
                                    <Link to={'/administration/ViewMembre/'+resData[i].id} className='btf btn-success'>Verifier</Link>
                                </div>
                    </div>
                 )
                 
                }       

             return element;
         }
        
    }
    return (
            <div> 
                 <MetaTags>
                     <title>Administration | membre</title>
                </MetaTags>

                <div className='container-admin' data-aos="fade-left">
                        <div id='titre-admin' >
                            <h1><span class="glyphicon glyphicon-user"  aria-hidden="true"></span><b>Membre</b></h1>
                        </div>

                        <div className='form-input-seach-admin'>
                            <form method="POST" onSubmit={(e)=>{find(e)}}>
                                    <input type='text' placeholder='chercher un utilisateur' id='search' name='search-cashback'/>
                                    <button type="button" onClick={(e)=>{find(e)}}>
                                        <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
                                    </button>
                            </form>
                        </div>

                        {loader()}
                </div>
            
            </div> 
 
        ); 
  }
export default MembreAdmin;

