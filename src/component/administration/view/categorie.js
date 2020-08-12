
import React , {useEffect,useState} from 'react';
import cookie from 'cookie';
import MetaTags from 'react-meta-tags';
import {Link} from 'react-router-dom';
import axios from 'axios';
import localhost from '../../../_config';
import Moment from 'react-moment';
import 'moment/locale/fr';

const Click=()=>{

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
        if(stop3 === 0){
            setelement(0);
        }
    })

    const setelement= function setelement(e){
         
        document.getElementById('response').classList.replace('fade_up','fade_down');

            let formData= new FormData();
                formData.append("text",e);
                const url= localhost+'/controleur.php?p=categorie'; 
                axios.post(url,formData)
                .then((res)=>{

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

         if(resData.length == 0){

            return <center><h1>Aucune information</h1></center>;

         }else{

             for(var i=0;i<resData.length;i++ ){
                 element.push( 
                    <div id={'del-'+resData[i].id} className='content-view-table row'>
                        <div className='inline-table'><input type='checkbox' onChange={checkio.bind(this,resData[i].id)} /></div>
                 <div className='inline-table' style={{width:'25vh'}}>{resData[i].nom_categorie}</div>
                        <div className='inline-table'></div>
                        <div className='inline-table'></div>
                        <div className='inline-table'>
                            <Link to={'/administration/categorie-update/'+resData[i].id} className='btf btn-success'>Modifier</Link>
                        </div>  
                        <div className='inline-table'>
                            <Link to={'/administration/add-sous-categorie/'+resData[i].id} className='btf btn-success'>ajouter un sous categorie</Link>
                        </div>
                    </div>
                 )
             }       

             return element;
         }
        
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

          setTchekremove([]);
          setTchekaddHome([]);
          setTchek([]);

            for(var i=0 ;i <Tchek.length;i++){
                document.getElementById('del-'+Tchek[i]).style.backgroundColor="#aaa";
            }

                document.getElementById('loader').style.display='block';
                let formData= new FormData();
                formData.append("text",Tchek);
                const url= localhost+'/controleur.php?p=deletecategorie'; 
                axios.post(url,formData)
                .then((res)=>{
                        if(res.data == 'categorie-delete-success'){
                            
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
                    <title>Administration | categorie </title>
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
                            <h1><span class="glyphicon glyphicon-th-list"  aria-hidden="true"></span><b>categorie</b></h1>
                    </div>
                    
                        <div id='content-view-admin'>
                            <div className='view-menu'>
                                <ul>
                                        <li>
                                            {btnDelete()}
                                        </li>
                                        <li>
                                        </li>
                                        <li>
                                        </li>
                                        <li>
                                        </li>
                                </ul>
                            </div>
                        </div>

                        <div id='response' className='fade_up'>
                            {loader()}
                        </div>

                    </div> 
                    <div class="float-right" data-aos="zoom-in">
                        <Link to='/administration/categorie-add' className='btn btn-admin-add'>+</Link>
                    </div>
                </div> 
        ); 
  }
export default Click;

