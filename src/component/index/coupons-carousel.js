import React , {useEffect, useState} from 'react';
import { Link ,Redirect } from 'react-router-dom';
import Moment from 'react-moment';
import 'moment/locale/fr';
import localhost from '../../_config';
import axios from 'axios';
import { useCookies } from "react-cookie";
import parse from 'html-react-parser';

const Coupons=()=>{

    const [count, setCount] = useState(1);
    const [countAuto, setCountAuto] = useState(1);
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
            if(stopSend == 0){
                setCoupon(res.data);
                setStopSend(1)
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
            document.getElementById('All-carousel').scrollTo(2000,0);
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

    const redirectConexion=()=>{

        if(redirect === true){
          return <Redirect to='/connexion' />
        }

      }
    
    const WatsUrl = (e) => {
        var text = "";
        for (var i = 0; i < e.split(" ").length; i++) {
        if (i === e.split(" ").length - 1) {
            text = text + e.split(" ")[i];
        } else {
            text = text + e.split(" ")[i] + "-";
        }
        }
        return text;
    };

    const all = function all(){

        var data = [];

        if(stopSend === 1){

            for(var i =0; i< coupon.length;i++){
                
                data.push(
                    <div id='coupons-content' data-aos='fade-up'>
                            <div className='img-background-coupons'>
                                         <Link to={'/cashbackAndCoupons/'+WatsUrl(coupon[i].cashbackName)}>
                                            Voir l'offre
                                        </Link>
                                <div style={{width:'100%',height:'100%',backgroundImage:'url('+coupon[i].link_img+')'}} className='bg-img-coupons-home'>
                                       
                                </div>
                            </div>
                            <div className='img-coupons-home'>
                            <img src= {coupon[i].url_img_fond} alt="Acheter "/>  
                            </div>
                                <h2>
                                    {parse(coupon[i].title)}
                                </h2>
                                
                    </div>
                )
            }
      
            return data;

        }else{

            return <div className='loader-gif'>
                        <center>
                            <img src='/img/loader1.gif'/>
                        </center>
                   </div>;

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

