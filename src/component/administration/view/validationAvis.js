import React , {useEffect,useState} from 'react';
import cookie from 'cookie';
import MetaTags from 'react-meta-tags';
import {Link} from 'react-router-dom';
import axios from 'axios';
import localhost from '../../../_config';
import Moment from 'react-moment';
import 'moment/locale/fr';

const ValidationAvis=()=>{

    const [Rescategorie,setRescategorie]=useState([]);
    const [stop,setStop]=useState(0);
    const [stop2,setStop2]=useState(0);
    const [stop3,setStop3]=useState(0);
    const [Tchek,setTchek]=useState([]);
    const [resData,setResDate]=useState([]);

    useEffect(()=>{
        if(stop3 === 0){
            setelement(0);
        }
    })

    const getUrl=function getUrl(){

        if(window.location.pathname.split('/')[2] === 'prevalidation'){

            if(window.location.pathname.split('/')[3] === 'mission'){
                return ['mission',0];
            }else if(window.location.pathname.split('/')[3] === 'click'){
                return ['click',0];
            }
    
        }else if(window.location.pathname.split('/')[2] === 'comfirm-validation'){

            if(window.location.pathname.split('/')[3] === 'mission'){
                return ['mission',1];
            }else if(window.location.pathname.split('/')[3] === 'click'){
                return ['click',1];
            }

        }

    }

    const setelement= function setelement(e){
         
        document.getElementById('response').classList.replace('fade_up','fade_down');

                let formData= new FormData();
                formData.append("text",JSON.stringify(getUrl()));
                const url= localhost+'/controleur.php?p=getAvis'; 
                axios.post(url,formData)
                .then((res)=>{
                    if(stop === 0){
                        setResDate(res.data);
                        setStop(1)
                    }
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

            element.push(
                <div className='row table'>
                    <div className='inline-table'></div>
                    <div className='inline-table'>Nom</div>
                    <div className='inline-table'>Nbr start</div>
                    <div className='inline-table'>Avis</div>
                    <div className='inline-table'>date</div>
                </div>
            )
              for(var i=0;i<resData.length;i++ ){
                  element.push( 
                     <div id={'del-'+resData[i].id} className='content-view-validation row'>
                             <div className='inline-table'><input type='checkbox' onChange={checkio.bind(this,resData[i].id)} /></div>
                             <div className='avis'><b>{resData[i].name_users}</b></div>
                             <div className='avis'><b>{resData[i].nbr_start+' '}<span class="glyphicon glyphicon-star" aria-hidden="true"></span></b></div>
                             <div className='avis'><b>{resData[i].text_Avis}</b></div>
                             <div className='avis'><b><span class="glyphicon glyphicon-time" aria-hidden="true"></span><Moment fromNow>{resData[i].date}</Moment></b></div>
                     </div>
                  )
              }       
              return element;
          }
          
    }

    const selectAll= function selectAll(){

        var inputs = document.getElementsByTagName("input");
            
        if(document.getElementById('select_all').innerText === 'Tout selectionner'){
    
            var element5 = [];

            for(var i=0;i<resData.length;i++){
                element5.push(resData[i].id);
            }

            document.getElementById('select_all').innerText='tout deselectionner';

            for(var i = 0; i < inputs.length; i++) {
                if(inputs[i].type == "checkbox") {
                    inputs[i].checked = true ;
                }
            }

            setTchek(element5.sort((a,b)=>a-b));


        }else{

            document.getElementById('select_all').innerText='Tout selectionner';

            for(var i = 0; i < inputs.length; i++) {
                if(inputs[i].type == "checkbox") {
                    inputs[i].checked = false ;
                }
            }

            setTchek([]);

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

        const Accepter= function Accepter(){
            if(Tchek.length > 0){
                return <button className='btn-success'  onClick={()=>{ yesComfirm()}} >Accepter {nbrCheck()}</button>
            }
        }

        const refuser= function refuser(){
            if(Tchek.length > 0){
                return <button className='btn-warning' onClick={()=>{ NoComfirm()}} >refuser {nbrCheck()}</button>

            }
        }

        const yesComfirm = function yesComfirm(){

            console.log(Tchek)
         
            for(var i=0 ;i <Tchek.length;i++){
                document.getElementById('del-'+Tchek[i]).style.backgroundColor="#aaa";
            }

            document.getElementById('loader').style.display='block';
            let formData= new FormData();
            formData.append("text",Tchek);
            const url= localhost+'/controleur.php?p=SuccessAvis'; 
            axios.post(url,formData)
            .then((res)=>{

                console.log(res.data)
                    if(res.data == 'validation-success'){
                        for(var i=0 ;i <Tchek.length;i++){
                            document.getElementById('del-'+Tchek[i]).style.backgroundColor="transparent";
                        } 
                                setelement();
                                var inputs = document.getElementsByTagName("input");
                                document.getElementById('select_all').innerText='Tout selectionner';
                                    for(var i = 0; i < inputs.length; i++) {
                                            if(inputs[i].type == "checkbox") {
                                                inputs[i].checked = false ;
                                            }
                                    }
                                    setTchek([]);
                                        document.getElementById('loader').style.display='none';
                   }
             });
  
        }

        const NoComfirm = function NoComfirm(){
            
            for(var i=0 ;i <Tchek.length;i++){
                document.getElementById('del-'+Tchek[i]).style.backgroundColor="#aaa";
            }

            document.getElementById('loader').style.display='block';
            let formData= new FormData();
            formData.append("text",Tchek);

            const url= localhost+'/controleur.php?p=NoComfirm'; 
            axios.post(url,formData)
            .then((res)=>{
  
                    if(res.data == 'validation-success'){

                        for(var i=0 ;i <Tchek.length;i++){
                            document.getElementById('del-'+Tchek[i]).style.backgroundColor="transparent";
                        } 
                                setelement();
                        
                                var inputs = document.getElementsByTagName("input");
                                
                                document.getElementById('select_all').innerText='Tout selectionner';

                                for(var i = 0; i < inputs.length; i++) {
                                        if(inputs[i].type == "checkbox") {
                                            inputs[i].checked = false ;
                                        }
                                }
                        
                                setTchek([]);
                        
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

 
 
 
    return (
            <div> 
                
                 <MetaTags>
                     <title>Administration | validation </title>
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
                            <h1><span class="glyphicon glyphicon-thumbs-up"   aria-hidden="true"></span><b>Validation des avis</b></h1>
                        </div>

                        
                        <div id='content-view-admin'>
                            <div className='view-menu'>
                                <ul>
                                        <li>
                                          <button id='select_all' className='btn btn-primary' onClick={()=>
                                            {selectAll();}
                                          } >
                                            Tout selectionner 
                                          </button>
                                        </li>

                                        <li>
                                            {Accepter()}
                                        </li>

                                        <li>
                                            {refuser()}
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
export default ValidationAvis;

