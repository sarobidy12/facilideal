import React , {  useEffect }from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const Nav=()=>{

    const [cookies, setCookie,removeCookie] = useCookies(null);
    
     useEffect(()=>{
         if(window.location.pathname.split('/')[1] != 'admin' && window.location.pathname.split('/')[1] != 'administration'  ){

            if(document.getElementById('link_Login') && document.getElementById('link_hover_block')){
                document.getElementById('link_Login').addEventListener("mouseover", func, false);
                document.getElementById('link_hover_block').addEventListener("mouseover", func, false);
                document.getElementById('link_Login').addEventListener("mouseout", func1, false);
                document.getElementById('link_hover_block').addEventListener("mouseout", func1, false);
   
                    function func()
                    {
                        document.getElementById('link_hover_block').style.display='block';
                    }
   
                    function func1()
                    {  
                        document.getElementById('link_hover_block').style.display='none';
                    }
            }
            
         }
     })

    const onglet= function onglet(a){
        for(var i =0;i < document.getElementsByClassName('link_header').length;i++){
            document.getElementsByClassName('link_header')[i].classList='link_header';
        }
        document.getElementById(a).classList.add('active_link_header');
    }

    const navLog= function navLog(){
        if(cookies._lo != null){
            return <ul>
                        <li>
                            <Link id='Acceuill' onClick={()=>{ onglet('Acceuill') }}  className='link_header active_link_header' to='/'>Acceuill</Link>
                        </li>
                        <li>
                            <Link id='cashback'  onClick={()=>{ onglet('cashback') }} className='link_header' to='/cashback'>cashback</Link>
                        </li>
                        <li>
                            <Link id='Mission' onClick={()=>{ onglet('Mission') }} className='link_header' to='/Mission'>Mission</Link>
                        </li>
                        <li>
                            <Link id='Click' onClick={()=>{ onglet('Click') }} className='link_header' to='/Click'>Click</Link>
                        </li>
                        <li>
                            <Link id='offerwall' onClick={()=>{ onglet('offerwall') }} className='link_header' to='/offerwall'>offerwall</Link>
                        </li>
                        <li>
                            <Link id='Boutique' onClick={()=>{ onglet('Boutique') }} className='link_header' to='/Boutique'>Boutique</Link>
                        </li>
                        <li>
                            <Link id="link_Login" className='link_Login' to='/MyaccountInfo/tableau-de-bord'><span class="glyphicon glyphicon-user" aria-hidden="true"></span>{cookies._lo.prenom}</Link>
                            <div id='link_hover_block' className="link_hover_block">
                                <ul>
                                    <li>
                                        <Link  to='/MyaccountInfo/tableau-de-bord'>tableau de bord</Link>
                                    </li>
                                    <li>
                                        <Link  to='/MyaccountInfo/Historique'>Payement</Link>
                                    </li>
                                    <li>
                                        <Link  to='/MyaccountInfo/Mes-informations'>Coordonnee</Link>
                                    </li>
                                    <li>
                                        <Link  to='/MyaccountInfo/Notification'>Notification</Link>
                                    </li>
                                    <li>
                                        <Link  to='/MyaccountInfo/Parraignage'>Parraignage</Link>
                                    </li> 
                                    <li>
                                        <Link  onClick={()=>{ 
                                        removeCookie('_lo');
                                        window.location.replace('/connexion')
                                     }}  >Se deconnecter</Link>
                                    </li>
                                </ul>
                            </div>
                        
                        </li>
                    </ul>
        }else{
            return  <ul>
                        <li>
                            <Link id='Acceuill' onClick={()=>{ onglet('Acceuill') }}  className='link_header active_link_header' to='/'>Acceuill</Link>
                        </li>
                        <li  >
                            <Link id='Boutique' onClick={()=>{ onglet('Boutique') }}  className='link_header' to='/Boutique'>Boutique</Link>
                        </li>
                        <li>
                            <Link id='Gagnants'  onClick={()=>{ onglet('Gagnants') }} className='link_header' to='/Gagnants'>Gagnants</Link>
                        </li>
                        <li>
                            <Link id='Contact'   onClick={()=>{ onglet('Contact') }} className='link_header' to='/Contact'>Contact</Link>
                        </li>
                        <li>
                            <Link className='link_sign'  to='/inscription'>s'inscrire</Link>
                        </li>
                        <li>
                            <Link className='link_Login'   to='/connexion'>se connecter</Link>
                        </li>
                    </ul>
        }
    }

    const view = function view(){
       if(window.location.pathname.split('/')[1] != 'admin' && window.location.pathname.split('/')[1] != 'administration'  ){
        return  <header>
                    <div className='Header_logo'>
                        <h1><Link   onClick={()=>{ onglet('Acceuill') }}   to='/'>Facilideal</Link></h1>
                    </div>

                    <div className='header_rigth'>
                        {navLog()}
                    </div>
                </header>
       }
    }

    return (
            <div>  
               {view()}
            </div>
        ); 
  }
export default Nav;

