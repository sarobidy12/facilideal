import React , {useEffect,useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const NavAdmin=()=>{
    
  useEffect(()=>{
    var url = window.location.pathname;
    var categorie = url.split('/');
    var element = categorie[2];

      for(var i =0;i < document.getElementsByClassName('onglet').length;i++){
          document.getElementsByClassName('onglet')[i].classList='onglet';
      }

      if( document.getElementById(element)){
        document.getElementById(element).classList='onglet active-nav-admin'
      }

     if(sessionStorage.getItem('Admin-login') == null){
        window.location.replace('/admin');
     }

  })
  
    return (
            <div> 
               <div id='nav-admin'>
                      <ul>
                      
                          <li >
                            <Link >
                                  <span className="glyphicon glyphicon-tasks" ></span><b>Menu</b>
                            </Link> 
                          </li>

                          <li id='membre' className='onglet active-nav-admin'>
                            <Link to="/administration/membre/" >
                                  <span className="glyphicon glyphicon-user " ></span><b>Membre</b>
                            </Link> 
                          </li>

                          <li id='membre' className='onglet active-nav-admin'>
                            <Link to="/administration/tendance/" >
                                  <span className="glyphicon glyphicon-globe" ></span><b>tendance</b>
                            </Link> 
                          </li>
                          
                          
                          <li id='Mission' className='onglet'>
                              <Link to="/administration/Mission/">
                                  <span className="glyphicon glyphicon-lock" ></span><b>Mission</b>
                              </Link>
                          </li>

                          <li id='payment' className='onglet'>
                              <Link to="/administration/payment">
                                  <span className="glyphicon glyphicon-credit-card" > </span><b>payment</b>
                              </Link>
                          </li>
                          <li id='boutique' className='onglet'>
                              <Link to="/administration/boutique/">
                                  <span className="glyphicon glyphicon-shopping-cart" ></span><b>Boutique</b>
                              </Link>
                          </li>
                          <li id='cashback' className='onglet'>
                              <Link to="/administration/cashback/">
                                  <span className="glyphicon glyphicon-bookmark" ></span><b>CashBack</b>
                              </Link>
                          </li>
                          <li id='coupons' className='onglet'>
                              <Link to="/administration/coupons/">
                                  <span className="glyphicon glyphicon-tags" ></span><b>Coupons</b>
                              </Link>
                          </li>
                          <li id='categorie' className='onglet'>
                              <Link to="/administration/categorie/">
                                  <span className="glyphicon glyphicon-th-list" ></span><b>categorie</b>
                              </Link>
                          </li>
                          <li id='histori_cashback' className='onglet'>
                              <Link to="/administration/histori_cashback/">
                                  <span className="glyphicon glyphicon-book" ></span><b>historique de cashback</b>
                              </Link>
                          </li>
                          <li id='coupons' className='onglet'>
                              <Link to="/administration/reseaux-affiliation">
                                  <span  className="glyphicon glyphicon-random"  ></span><b>Réseaux d'affiliation</b>
                              </Link>
                          </li>
                          <li id='newletter' className='onglet'>
                              <Link to="/administration/newletter/">
                                  <span className="glyphicon glyphicon-send" ></span><b>New letter</b>
                              </Link>
                          </li>
                          <li id='validation' className='onglet'>
                              <Link to="/administration/validation/">
                                  <span className="glyphicon glyphicon-thumbs-up" ></span><b>Validation</b>
                              </Link>
                          </li>

                          <li id='validation' className='onglet'>
                              <Link to="/administration/UpdateRgpd/">
                                  <span className="glyphicon glyphicon-book" ></span><b>RGPD</b>
                              </Link>
                          </li>

                          <li id='validation' className='onglet'>
                              <Link to="/administration/deconnexion/" 
                                onClick={()=>{
                                    sessionStorage.removeItem('Admin-login')
                                }}
                              >
                                  <span className="glyphicon glyphicon-off" ></span><b>Deconnexion</b>
                              </Link>
                          </li>
                      </ul>
               </div>
                        
            </div>
        ); 
  }
export default NavAdmin;

