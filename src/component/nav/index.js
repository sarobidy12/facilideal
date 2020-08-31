import React , {Component}from 'react';
import { Link,Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { findDOMNode } from 'react-dom';
import $ from 'jquery';
import localhost from "../../_config";
import All_data from '../cashback/loader/all_data';
import Carre from '../cashback/loader/rarre';
import axios from "axios";

class Nav extends Component {

    constructor(props) {
        super(props);
        this.state = {
            redirecturl: 0,
            gliphicon:false,
            redirect:false,
            viewCategorie:false,
            Boutique:[],
            stop3:0,
            nom:null,
            img:null
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

    media=()=>{
        if(window.screen.width <= 414){
            return <Link onClick={()=>{ this.onglet('Acceuill') }}   to='/'><img src='/img/coupons-media.png' style={{width:'5vh'}} /></Link>
        }else{
            return <Link onClick={()=>{ this.onglet('Acceuill') }}   to='/'><img src='/img/logo.png' /></Link>
        }
    }

    view = function view(){
       if(window.location.pathname.split('/')[1] != 'admin' && window.location.pathname.split('/')[1] != 'administration'  ){
        return  <header>
                    <div className='Header_logo'>
                        {this.media()}
                    </div>

                    <div className='search_magasin'>
                        <ul>
                            <li>
                                 <Link 
                                    onClick={()=>{
                                        this.openCategorie();
                                    }}
                                 
                                 ><i class="glyphicon glyphicon-menu-hamburger" aria-hidden="true"></i>categorie</Link>
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

        const el= findDOMNode(document.getElementById('categorie_view'));
        $(el).slideUp();
            this.setState({
                viewCategorie:false
            })
      
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

    openCategorie=()=>{
        const el= findDOMNode(document.getElementById('categorie_view'));

            this.setState({
                viewCategorie:!this.state.viewCategorie
            }) 
            
                    $(el).slideToggle();
    }

    generateUrl=(e)=>{

        var text ='';
    
        for(var i=0;i<e.split(' ').length;i++){
            if(i === (e.split(' ').length - 1)){
                text = text + e.split(' ')[i] 
            }else{
                text = text + e.split(' ')[i]+'-' 
            }
        }
    
        return text;
    
    };

    getCAtegorie=()=>{
        const cookies = new Cookies();
        var element =[];

        if(cookies.get('_categorieAndSousCAtegorie')){
            for(var i=0;i<cookies.get('_categorieAndSousCAtegorie').length;i++ ){
                element.push(
                        <li id={'categorie-'+cookies.get('_categorieAndSousCAtegorie')[i].id}
                            className='categorie_mouse'
                            onClick={()=>{this.close()}}
                            onMouseOver={this.hover.bind(this,cookies.get('_categorieAndSousCAtegorie')[i].id)}>
                            <Link
                            to={'/cashbackView/'+this.generateUrl(cookies.get('_categorieAndSousCAtegorie')[i].nom_categorie)}>
                                {cookies.get('_categorieAndSousCAtegorie')[i].nom_categorie}
                            </Link>
                        </li>
                )
            }
        }

      
       return element;
    }

    hover=(e,id)=>{
        id.preventDefault();
            for(var i=0;i < document.getElementsByClassName('categorie_mouse').length;i++){
                document.getElementsByClassName('categorie_mouse')[i].classList='categorie_mouse'
            }
                document.getElementById('categorie-'+e).classList.add('active_hover');
                    this.getCategorieName(e);
                    this.getFindData(e);
    }


    RenderCategorieImg=()=>{

        if(this.state.stop3 === 1){

            return <div>
                <h1>
                    {this.state.nom}
                </h1>
                                    <ul>
                                        <li>
                                            {this.BoutiqueView()}
                                        </li>
                                        <li>
                                            <img src={this.state.img}  />
                                            <Link
                                                onClick={()=>{
                                                    this.close();
                                                }}
                                                className='link-nav-categorie'
                                                to={'/cashbackView/'+this.WatsUrl(this.state.nom)}
                                            >
                                            Plus de boutique
                                            <span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span>
                                            </Link>
                                        </li>
                                    </ul>
                   </div>

        }else{

            return <div>
                        <All_data />
                   </div>
        }

    }

    WatsUrl = (e) => {
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

    BoutiqueView=()=>{

        var BoutiqueAll = [];
    
         if (0 < this.state.Boutique.length) {
           for (var i = 0; i < this.state.Boutique.length; i++) {
             BoutiqueAll.push(
                 <Link
                   to={
                     "/cashbackAndCoupons/" +
                        this.WatsUrl(this.state.Boutique[i].nom)
                   }
                   onClick={()=>{
                     window.scrollTo({
                       top: 0,
                       behavior: "smooth",
                    });
                    this.close();
                   
                   }}

                   className='selection-moment-nav'
                   data-aos='fade-in'
                 >
                     <div >
                            <img src={this.state.Boutique[i].url_img} style={{
                                height:'15vh'
                            }}/>
                                 <div className='view-link-suggestion'>
                                 <strike>
                                     {this.state.Boutique[i].Ancien+''}
                                 </strike>
                                 <b>
                                     {this.state.Boutique[i].Nouveaux+''}
                                     <span class="glyphicon glyphicon-circle-arrow-up" aria-hidden="true"></span>
                                 </b>
                             </div>
    
                     </div>
                 </Link>
             );
           }
    
           return <div>
                        <h2>séléction du moment</h2>
                        {BoutiqueAll}
                   </div>
           
           
         } else {
           return <h2>Aucune selection du moment</h2>;
         }
    
    };

    getCategorieName=(e)=>{
        
        const cookies = new Cookies();
        for (var i = 0; i < cookies.get('_categorieAndSousCAtegorie').length; i++) {
                if(cookies.get('_categorieAndSousCAtegorie')[i].id === e) {
                        this.setState({
                            nom:cookies.get('_categorieAndSousCAtegorie')[i].nom_categorie,
                            img:cookies.get('_categorieAndSousCAtegorie')[i].url_img
                        })
                         break;
                }
        }
    };
    
    getFindData=(id)=>{
        this.setState({
            stop3:0
        });
        let formData = new FormData();
        formData.append("text",JSON.stringify(id));
        const url = localhost + "/controleur.php?p=getCashbackSelection";
            axios.post(url, formData).then((res)=>{
                setTimeout(()=>{
                    this.setState({
                        Boutique:res.data,
                        stop3:1
                    })
                },500)
            });
    };

    backgroundNav=()=>{
        if(this.state.viewCategorie){
            return  <div id='backgrondNav_categorie_view' ref='fadeOut' onClick={()=>{
                                const el= findDOMNode(document.getElementById('categorie_view'));
                                    $(el).slideUp();
                                        this.setState({
                                            viewCategorie:false
                                        })
                    }}>
                    </div>
        }
    }

    render() {

        return (
                <div> 
                    {this.redirect()}
                    {this.view()}

                    <div id='categorie_view'>
                        <div className='categorie_view'>
                            <ul>
                                {this.getCAtegorie()}
                            </ul>
                        </div>
                                <div id='view_categorie'>
                                 {this.RenderCategorieImg()}
                                <div>
                            </div>
                        </div>
 
                    </div>

                    <div id='sidebarHeader' >
                        {this.navLog()}
                    </div>

                    <div id='backgrondNav' ref='fadeOut' onClick={()=>{
                        this.close();
                    }}>
                    </div>
                   {this.backgroundNav()}
                </div>
            ); 
    }
}
export default Nav;

