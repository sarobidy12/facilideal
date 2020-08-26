import React , {Component}from 'react';
import { Link,Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { findDOMNode } from 'react-dom';
import $ from 'jquery';

class Nav extends Component {

    constructor(props) {
        super(props);
        this.state = {
            redirecturl: 0,
            gliphicon:false,
            redirect:false
        };
      }
 
    componentDidMount=()=>{
  
        for(var i =0;i < document.getElementsByClassName('link_header').length;i++){
            document.getElementsByClassName('link_header')[i].classList='link_header';
        }
        
            if(document.getElementById(window.location.pathname.split('/')[1]+'')){
                document.getElementById(window.location.pathname.split('/')[1]+'').classList.add('active_link_header');
            }else if(document.getElementById(window.location.pathname.split('/')[1]+'') === null){
                document.getElementById('Acceuill').classList.add('active_link_header');
            }
 
    }

    onglet= function onglet(a){
        for(var i =0;i < document.getElementsByClassName('link_header').length;i++){
            document.getElementsByClassName('link_header')[i].classList='link_header';
        }
        document.getElementById(a).classList.add('active_link_header');
        this.close();
    }

    handletoggle=()=>{
      const el= findDOMNode(this.refs.toggle);  
      this.setState({
        gliphicon:!this.state.gliphicon
      }) 
      $(el).slideToggle();
    }

    gliphicon=()=>{

        if(this.state.gliphicon === false){
            return <span class="glyphicon glyphicon-chevron-down" id='gliphicon' aria-hidden="true"></span>
        }else{
            return <span class="glyphicon glyphicon-chevron-up" id='gliphicon' aria-hidden="true"></span>
        }

    }

    navLog= function navLog(){

        const cookies = new Cookies();
        console.log(cookies.get('_lo'));
        if(cookies.get('_lo')){
            return <ul>
                     <li>
                            <div id='link_view_btn'>
                                <center>
                                    <img src='/img/users.png' />
                                </center>
                                <Link id="link_Login" className='link_Login_c' onClick={()=>{
                                    this.handletoggle();
                                }}>
                                {this.gliphicon()}  {cookies.get('_lo').nom+' '+cookies.get('_lo').prenom}
                                </Link>
                                    <div id='slideView' ref='toggle'>
                                         <ul>
                                            <li onClick={()=>{ this.close() }}><Link to='/MyaccountInfo/tableau-de-bord'><span class="glyphicon glyphicon-calendar" aria-hidden="true"></span> Tableau de bord</Link></li>
                                            <li onClick={()=>{ this.close() }}><Link to='/MyaccountInfo/Historique'><span class="glyphicon glyphicon-list-alt" aria-hidden="true"></span> Historique de payement</Link></li>
                                            <li onClick={()=>{ this.close() }}><Link to='/MyaccountInfo/Mes-informations'><span class="glyphicon glyphicon-file" aria-hidden="true"></span> Mes informations</Link></li>
                                            <li onClick={()=>{ this.close() }}><Link to='/MyaccountInfo/Notification'> <span class="glyphicon glyphicon-bell" aria-hidden="true"></span>Notification</Link></li>
                                            <li onClick={()=>{ this.close() }}><Link to='/MyaccountInfo/livre-or'> <span class="glyphicon glyphicon-comment" aria-hidden="true"></span>Laisser un avis</Link></li>
                                            <li onClick={()=>{ this.close() }}><Link  to='/MyaccountInfo/Parraignage'> <span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>Parraignage</Link></li>
                                            <li onClick={()=>{ 
                                                cookies.remove('_lo', { path: '/' });
                                                window.location.replace('/connexion');
                                            }}>
                                            <Link to='#'><span class="glyphicon glyphicon-off" aria-hidden="true"></span> Se deconnecter</Link></li>
                                        </ul>
                                    </div>
                                    </div>
                        </li>
                        <li>
                            <Link id='Acceuill' onClick={()=>{ this.onglet('Acceuill') }}  className='link_header active_link_header' to='/'>
                                <span class="glyphicon glyphicon-home" aria-hidden="true"></span>
                                Acceuill
                            </Link>
                        </li>
                        <li>
                            <Link id='categorie'  onClick={()=>{ this.onglet('categorie') }} className='link_header' to='/categorie'>
                                <span class="glyphicon glyphicon-menu-hamburger" aria-hidden="true"></span>
                                categorie
                            </Link>
                        </li>
                        <li>
                            <Link id='Mission' onClick={()=>{ this.onglet('Mission') }} className='link_header' to='/Mission'>
                                <span class="glyphicon glyphicon-briefcase" aria-hidden="true"></span>
                                Mission
                            </Link>
                        </li>
                      
                        <li>
                            <Link id='offerwall' onClick={()=>{ this.onglet('offerwall') }} className='link_header' to='/offerwall'>
                                <span class="glyphicon glyphicon-gift" aria-hidden="true"></span>
                                offerwall
                            </Link>
                        </li>
                        <li>
                            <Link id='Gagnants'  onClick={()=>{ this.onglet('Gagnants') }} className='link_header' to='/Gagnants'>
                                <span class="glyphicon glyphicon-bookmark" aria-hidden="true"></span>
                                Gagnants
                             </Link>
                        </li>
                        <li>
                            <Link id='Boutique' onClick={()=>{ this.onglet('Boutique') }} className='link_header' to='/Boutique'>
                                <span class="glyphicon glyphicon-shopping-cart" aria-hidden="true"></span>
                                Boutique
                            </Link>
                        </li>
                   
                    </ul>
        }else{
            return  <ul>
                      <li>
                            <Link id='Acceuill' onClick={()=>{ this.onglet('Acceuill') }}  className='link_header active_link_header' to='/'>
                                <span class="glyphicon glyphicon-home" aria-hidden="true"></span>
                                    Acceuill
                            </Link>
                        </li>
                        <li  >
                            <Link id='Boutique' onClick={()=>{ this.onglet('Boutique') }}  className='link_header' to='/Boutique'>
                                <span class="glyphicon glyphicon-shopping-cart" aria-hidden="true"></span>
                                Boutique
                            </Link>
                        </li>
                        <li>
                            <Link id='Gagnants'  onClick={()=>{ this.onglet('Gagnants') }} className='link_header' to='/Gagnants'>
                            <span class="glyphicon glyphicon-bookmark" aria-hidden="true"></span>
                             Gagnants
                             </Link>
                        </li>
                        
                        <li>
                            <Link id='Contact'   onClick={()=>{ this.onglet('Contact') }} className='link_header' to='/Contact'>
                            <span class="glyphicon glyphicon-envelope" aria-hidden="true"></span>
                                Contact
                            </Link>
                        </li>

                        <li>
                            <Link className='link_sign' onClick={()=>{ this.close() }} to='/inscription'>s'inscrire</Link>
                        </li>

                        <li>
                            <Link className='link_Login' onClick={()=>{ this.close() }} to='/connexion'>se connecter</Link>
                        </li> 

                    </ul>
        }
    }
    
    redirect= function redirect(){
        if(this.state.redirect === true){
            return <Redirect to={'/findCashback/'+document.getElementById('search').value} />
        }
    }

    find= function find(e){
        e.preventDefault();
        if(document.getElementById('search')){
            if(document.getElementById('search').value != ''){
                this.setState({
                    redirect:true
                })
            }
        }
    }

      view = function view(){
       if(window.location.pathname.split('/')[1] != 'admin' && window.location.pathname.split('/')[1] != 'administration'  ){
        return  <header>
                    <div className='Header_logo'>
                        <h1><Link   onClick={()=>{ this.onglet('Acceuill') }}   to='/'><img src='/img/logo.png' /></Link></h1>
                    </div>

                    <div className='search_magasin'>
                        <ul>
                            <li>
                                 <Link to='/categorie'><i class="glyphicon glyphicon-menu-hamburger" aria-hidden="true"></i>categorie</Link>
                            </li>
                            <li>
                            <form method="POST" onSubmit={(e)=>{this.find(e)}}>
                                    <input type='text' autocomplete="off" onChange={()=>{
                                        this.setState({
                                            redirect:false
                                        })
                                    }} placeholder='chercher une boutique' id='search' name='search-cashback'/>
                                    <button type="button" onClick={(e)=>{this.find(e)}}>
                                        <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
                                    </button>
                            </form>
                            </li>
                        </ul>
                    </div>

                    <div className='header_rigth'>
                        <div className='span-humberger' onClick={()=>{
                                this.open();
                            }} >
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        {/* {navLog()} */}
                    </div>
                </header>
       }
    }
    
    close=()=>{

        document.getElementById('sidebarHeader').style.right='-50vh';
        const el2= findDOMNode(this.refs.fadeOut);   
        $(el2).fadeOut(500);

        this.setState({
            gliphicon:false
        }) 

    }

    open=()=>{

        const el= findDOMNode(this.refs.toggle);   
        $(el).slideUp(1);
        document.getElementById('sidebarHeader').style.right='0';
        document.getElementById('backgrondNav').style.display='block';
    }

  render() {

    return (
            <div> 
                {this.redirect()}
                {this.view()}

                <div id='sidebarHeader' >
                    {this.navLog()}
                </div>

                <div id='backgrondNav' ref='fadeOut' onClick={()=>{
                     this.close();
                }} >
                </div>
            </div>
        ); 
  }
}
export default Nav;

