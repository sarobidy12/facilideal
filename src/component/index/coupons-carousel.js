import React , {useEffect, useState} from 'react';
import { Link ,Redirect } from 'react-router-dom';
import Moment from 'react-moment';
import 'moment/locale/fr';
import localhost from '../../_config';
import axios from 'axios';
import { useCookies } from "react-cookie";

const Coupons=()=>{

    const [count, setCount] = useState(1);
    const [coupon, setCoupon] = useState([])
    const [id, setId] = useState(null);
    const [redirect,setredirect]=useState(false);
    const [stopSend,setStopSend]=useState(0);
    const [cookies, setCookie] = useCookies(null);
  
    useEffect(()=>{
         getData();
    })

    const getData= function getData(){

        let formData= new FormData();
        formData.append("text","ko");
        const url= localhost+'/controleur.php?p=GETCouponsHome';
        axios.post(url,formData)
        .then((res)=>{
            setStopSend(1);
            if(stopSend == 0){
                setCoupon(res.data);
            }
        })
    }

    useEffect(()=>{

        if(count == 0){
            setCount(3);
            document.getElementById(3).style.backgroundColor='rgb(7, 249, 178)';
        }else if(count == 1){
            document.getElementById('All-carousel').scrollTo(0,0);
        }else if(count == 2){
            document.getElementById('All-carousel').scrollTo(1000,0);
        }else if(count == 3){
            document.getElementById('All-carousel').scrollTo(1800,0);
        }else if(count == 4){
            setCount(1);
            document.getElementById(1).style.backgroundColor='rgb(7, 249, 178)';

        }
        for(var i=0;i < document.getElementsByClassName('btn-fast').length;i++){
            document.getElementsByClassName('btn-fast')[i].style["background-color"]='#aaa';
        }
        if( document.getElementById(count)){
            document.getElementById(count).style.backgroundColor='rgb(7, 249, 178)';
        }
    })

    const openCoupons= function openCoupons(i,id){
        id.preventDefault();

        if(cookies._lo != null){
            document.getElementById('coupons-'+i).style='left:2vh';
        }else{
            setredirect(true);
        }
        
    }

    const redirectConexion=()=>{

        if(redirect === true){
          return <Redirect to='/connexion' />
        }

      }
    
    const all = function all(){

        var data = [];

        for(var i =0; i< coupon.length;i++){
            data.push(
                <div id='coupons-content' data-aos='fade-up'>
                        <center>
                            <img src='/img/coupons/1.png' alt="Acheter "/>
                            </center>
                            <h2>
                                {coupon[i].title}
                                {this}
                            </h2>
                            
                            <p>Economise  {coupon[i].somme} % <span className="glyphicon glyphicon-upload" aria-hidden="true"></span></p>
                            <div className='code-coupons'>
                                <div id={'coupons-'+coupon[i].id} className='btn-coupons up' onClick={ openCoupons.bind(this,coupon[i].id) }>
                                        Code coupons
                                </div>
                                <div className='btn-coupons down'>
                                    {coupon[i].code}
                                </div>
                            </div>
                            <b>
                                {date(coupon[i].end_date)}
                            </b> 
                            <br/>
                            <br/>
                            <img src='/img/loader1.gif'/>
                       
                </div>
            )
        }

        return data;
    }

    
    const date=(e)=>{
        var now=new Date(); // date actuelle
        var later=new Date(e); // premier janvier 2013
        var result=later.getTime()-now.getTime(); // différence en millisecondes depuis le premier janvier 1970 (voir getTime() pour mieux comprendre)
        var jours=parseInt(result/86400000);
    
        if(jours < 10){
            return <div style={{color:'red'}}>
                        <i class="glyphicon glyphicon-time" aria-hidden="true"></i>Expire <Moment fromNow>{' '+e}</Moment>
                    </div>
        }else{
            return <div style={{color:'green'}}>
                        <i class="glyphicon glyphicon-time" aria-hidden="true"></i>Expire <Moment fromNow>{' '+e}</Moment>
                   </div>
        }
      }
    

    return (
            <div>
                {redirectConexion()}
                 <div className='container'>
                        <div id='coupons'>
                         <h1><span><img src="/img/coupons.png"/></span>Les coupons Disponibles {id}</h1>

                        <div id='All-carousel'>
                            
                         <button className='btn btn-plus none'  onClick={()=>{ if(count > 0 ) {setCount(count -1 ) }}} ><span class="glyphicon glyphicon-menu-left" aria-hidden="true"></span></button>
                         <button className='btn btn-moins none'onClick={()=>{ if(count < 4 ) {setCount(count + 1 ) } }} ><span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span></button>

                            <div id='carousel'>
                                {all()}
                            </div>
                            
                        </div>
                      
                        <div className='slide-fast'>
                                <div id="1" className='btn-fast' onClick={()=>{  setCount(1)  }}>
                                         
                                </div>
                                <div id="2" className='btn-fast' onClick={()=>{  setCount(2)  }}>
                                            
                                </div>
                                <div id="3" className='btn-fast' onClick={()=>{  setCount(3)  }}>
                                      
                                </div>
                        </div>
                      
                        </div>
                 </div>
                   
            </div>
        ); 
  }
export default Coupons;

