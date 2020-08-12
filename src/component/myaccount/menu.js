import React , {useEffect,useState} from 'react';
import MetaTags from 'react-meta-tags';
import axios from 'axios';
import { useCookies } from "react-cookie";
import Moment from 'react-moment';
import 'moment/locale/fr';
import parse from 'html-react-parser';
import localhost from '../../_config'
import Carre from "../cashback/loader/rarre";
import Long from "../cashback/loader/long";
import Empiler from "../cashback/loader/empiler";
import All_data from "../cashback/loader/all_data";
import { Link, Redirect } from 'react-router-dom';

const Menu=(data)=>{

    const [cookie,Setcookie,removeCookie]=useCookies(null);
    useEffect(()=>{
        focusClick()
    })

    const focusClick= function focusClick(){

        for(var i=0;i< document.getElementsByClassName('menu-my').length;i++){
            document.getElementsByClassName('menu-my')[i].classList ='menu-my'
        }
        
        if(document.getElementById(window.location.pathname.split('/')[2])){
            document.getElementById(window.location.pathname.split('/')[2]).classList.add('active-myacount');
        }
  
    }

    return (
            <div> 
                 <div className='menu-content-account'>
                                <ul>
                                    <li onClick={()=>{ focusClick() }} id='tableau-de-bord' className='menu-my active-myacount'><Link to='/MyaccountInfo/tableau-de-bord'><span class="glyphicon glyphicon-calendar" aria-hidden="true"></span> Tableau de bord</Link></li>
                                    <li onClick={()=>{ focusClick() }} id='Historique' className='menu-my' ><Link to='/MyaccountInfo/Historique'><span class="glyphicon glyphicon-list-alt" aria-hidden="true"></span> Historique de payement</Link></li>
                                    <li onClick={()=>{ focusClick() }} id='Mes-informations' className='menu-my' ><Link to='/MyaccountInfo/Mes-informations'><span class="glyphicon glyphicon-file" aria-hidden="true"></span> Mes informations</Link></li>
                                    <li onClick={()=>{ focusClick() }} id='Notification' className='menu-my' ><Link to='/MyaccountInfo/Notification'> <span class="glyphicon glyphicon-bell" aria-hidden="true"></span>Notification</Link></li>
                                    <li onClick={()=>{ focusClick() }} id='livre-or' className='menu-my' ><Link to='/MyaccountInfo/livre-or'> <span class="glyphicon glyphicon-comment" aria-hidden="true"></span>Laisser un avis</Link></li>
                                    <li onClick={()=>{ focusClick() }} id='Parraignage'className='menu-my' ><Link  to='/MyaccountInfo/Parraignage'> <span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>Parraignage</Link></li>
                                    <li onClick={()=>{ 
                                        removeCookie('_lo');
                                        window.location.replace('/connexion')
                                     }}><Link><span class="glyphicon glyphicon-off" aria-hidden="true"></span> Se deconnecter</Link></li>
                                </ul>
                </div>

            </div>  
        ); 
  }
export default Menu;

