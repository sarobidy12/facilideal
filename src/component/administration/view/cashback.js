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
                const url= localhost+'/controleur.php?p=ViewCashback'; 
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
        element.push(
            <div className='row table'>
                <div className='inline-table'></div>
                <div className='inline-table' style={{width:'15vh'}}>Titre</div>
                <div className='inline-table'>coupons</div>
                <div className='inline-table'>used</div>
                <div className='inline-table'>expirer</div>
                <div className='inline-table'>status</div>
                <div className='inline-table'>acceuil</div>
                <div className='inline-table' style={{width:'10vh'}}>premium</div>
                <div className='inline-table'>action</div>
            </div>
        )

         if(resData.length == 0){
             return <center><h1>Aucune information</h1></center>;

         }else{
             for(var i=0;i<resData.length;i++ ){
                 element.push( 
                    <div id={'del-'+resData[i].id} className='content-view-table row'>
                            <div className='inline-table'><input type='checkbox'   onChange={checkio.bind(this,autoMat(resData[i].id,resData[i].add_home))} /></div>
                            <div className='inline-table' style={{width:'15vh'}}><b>{resData[i].nom}</b></div>
                            <div className='inline-table'><b>{resData[i].nbr_coupons+' '}</b><span class="glyphicon glyphicon-tags" aria-hidden="true"></span></div>
                            <div className='inline-table'><b>{resData[i].visit}</b></div>
                            <div className='inline-table'><b><Moment fromNow>{resData[i].end_date}</Moment></b></div>
                            <div className='inline-table'><b>{gliphicon(resData[i].actif)}</b></div>
                            <div className='inline-table'><b>{gliphicon(resData[i].add_home)}</b></div>
                            <div className='inline-table' style={{width:'7vh',textAlign:'start'}}><b>{gliphicon(resData[i].premium)}</b></div>
                            <div className='inline-table'>{btnActive(resData[i].actif,resData[i].id)}{btnValider(resData[i].premium,resData[i].id)}<Link to={'/administration/cashback-update/'+resData[i].id} className='btf btn-success'>Modifier</Link></div>
                    </div>
                 )
             }       
             return element;
         }
        
    }

    const btnActive= function btnActive(e,id){

        if(e == 0){
            return <button onClick={activer.bind(this,id)} className='btf btn-success'>Aciver</button>
        }else{
            return <button onClick={activer.bind(this,id)} className='btf btn-warning'>Desactiver</button>
        }

    }

    const btnValider= function btnValider(e,id){

        if(e == 0){
            return <button onClick={Valider.bind(this,id)} className='btf btn-success'>valider</button>
        }else{
            return <button onClick={Valider.bind(this,id)} className='btf btn-warning'>non-valider</button>
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

    const Valider = function Valider(id,e){
      
        e.preventDefault()

        document.getElementById('loader').style.display='block';
        document.getElementById('del-'+id).style.backgroundColor="#aaa";
        let formData= new FormData();
        formData.append("text",id);
        const url= localhost+'/controleur.php?p=cashbackPrenium'; 
        axios.post(url,formData)
        .then((res)=>{
                if(res.data == 'cashback-prenium-success'){
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

    const autoMat = function autoMat(id,e){

        if (e == 1) {
            return  id+'/yes';
        } else if (e == 0) {
            return  id+'/non';
        }
    }

    const checkio = function checkio(io,e){

        var element5 = [];
        var element6 = [];
        var element7 = [];

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

            if(io.split('/')[1]+'' == 'yes' ){
                
                for(var i=0;i< Tchekremove.length;i++ ){
                    if(Tchekremove[i] != id){
                        element6.push(Tchekremove[i]);
                    }
                }  
    
                if(!Tchekremove.includes(id)){
                    element6.push(id);
                }

                setTchekremove(element6.sort((a,b)=>a-b));

            }
     
            if(io.split('/')[1]+'' == 'non'){

                    for(var i=0;i< TchekaddHome.length;i++ ){
                            if(TchekaddHome[i] != id){
                                element7.push(TchekaddHome[i]);
                            }
                    }
        
                    if(!TchekaddHome.includes(id)){
                        element7.push(id);
                    }
        
                    if(element7.length <= 10){
                        setTchekaddHome(element7.sort((a,b)=>a-b));
                    }

            }  

        document.getElementById('del-'+id).style.backgroundColor='transparent';


        }
        
        const nbrCheck= function nbrCheck(e){

            if(e === 'add'){
                if(TchekaddHome.length > 0){
                    return '( '+TchekaddHome.length+' )';
                }
            }else if(e ==='remove'){
                if(Tchekremove.length > 0){
                    return '( '+Tchekremove.length+' )';
                }
            }else{
                if(Tchek.length > 0){
                    return '( '+Tchek.length+' )';
                }
            }
        
        }

        const btnAdd= function btnAdd(){
            if(TchekaddHome.length > 0){
                return <button className='btn-success'  onClick={()=>{ addHome()}} >Ajouter a l'acceuill {nbrCheck('add')}</button>
            }
        }

        const btnRemove= function btnRemove(){
            if(Tchekremove.length > 0){
                return <button className='btn-warning' onClick={()=>{ RemoveHome()}} >retirer de l'acceuill {nbrCheck('remove')}</button>

            }
        }

        const btnDelete= function btnDelete(){
            if(Tchek.length > 0){
                return  <button  className='btn-danger' onClick={()=>{ deleteAll()}} >Suprimer {nbrCheck()}</button>
            }
        }

        const addHome = function addHome(){

            
            for(var i=0 ;i <TchekaddHome.length;i++){
                document.getElementById('del-'+TchekaddHome[i]).style.backgroundColor="#aaa";
            }

            document.getElementById('loader').style.display='block';
            let formData= new FormData();
            formData.append("text",TchekaddHome);
            const url= localhost+'/controleur.php?p=CashbackAddHome'; 
            axios.post(url,formData)
            .then((res)=>{
  
                    if(res.data == 'cashback-add-home-success'){

                        for(var i=0 ;i <TchekaddHome.length;i++){
                            document.getElementById('del-'+TchekaddHome[i]).style.backgroundColor="transparent";
                        }
                    
                            setTchekremove([]);
                            setTchekaddHome([]);
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

        const RemoveHome = function RemoveHome(){
            
            for(var i=0 ;i <Tchekremove.length;i++){
                document.getElementById('del-'+Tchekremove[i]).style.backgroundColor="#aaa";
            }

            document.getElementById('loader').style.display='block';
            let formData= new FormData();
            formData.append("text",Tchekremove);
            const url= localhost+'/controleur.php?p=CashbackRemoveHome'; 
            axios.post(url,formData)
            .then((res)=>{
  
                    if(res.data == 'cashback-remove-home-success'){

                        for(var i=0 ;i <Tchekremove.length;i++){
                            document.getElementById('del-'+Tchekremove[i]).style.backgroundColor="transparent";
                        }
                    
                            setTchekremove([]);
                            setTchekaddHome([]);
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
                const url= localhost+'/controleur.php?p=deletecashback'; 
                axios.post(url,formData)
                .then((res)=>{
                        if(res.data == 'cashback-delete-success'){
                            
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
                    <div className="float-right" data-aos="zoom-in">
                                <Link to='/administration/cashback-add' className='btn btn-admin-add'>+</Link>
                    </div>
                </div> 
        ); 
  }
export default Cashback;

