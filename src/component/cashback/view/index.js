import React, { Component, useEffect } from "react";
import MetaTags from "react-meta-tags";
import Carre from "../loader/rarre";
import Long from "../loader/long";
import Empiler from "../loader/empiler";
import All_data from "../loader/all_data";
import axios from "axios";
import localhost from "../../../_config";
import { withCookies, Cookies } from 'react-cookie';
import { Link ,Redirect } from "react-router-dom";
import Moment from 'react-moment';
import 'moment/locale/fr';
import parse from 'html-react-parser';
import Avis from './avis';
import Footer from '../../footer/index';
import { findDOMNode } from 'react-dom';
import $ from 'jquery';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stop: 0,
      result: [],
      Boutique: [],
      url: window.location.pathname.split("/")[2],
      ckeck: 0,
      stop2:0,
      resultCoupons:[],
      stop3:0,
      idViewCoupons:null,
      resHisto:[],
      redirect:false,
      gliphicon:false,
      gliphiconaApropos:true
    };
  }

  componentWillReceiveProps=()=>{
  }

  componentWillMount = () => {
    
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });

    if (this.state.stop === 0) {
      this.getFindData();
    }

    this.setState({
      url: window.location.pathname.split("/")[2],
      ckeck: 1,
    });

    function copy() {
        var copyText = document.querySelector("#input");
        copyText.select();
        document.execCommand("copy");
      }

        if( document.querySelector("#copy")){
            document.querySelector("#copy").addEventListener("click", copy);
        }
        
  };

  redirect=()=>{
    if(this.state.redirect === true){
      return <Redirect to='/connexion' />
    }
  }

  componentWillUpdate = () => {
    if (this.state.ckeck === 1) {

        if (this.state.url != window.location.pathname.split("/")[2]) {

          window.scrollTo({
              top: 0,
              behavior: "smooth",
          });

            if(document.getElementById('hero-cashback-scroll') && 
            document.getElementById('img-cashback') && 
            document.getElementById('hero-cashback-scroll') &&
            document.getElementById('container-view-all')  &&
            document.getElementById('active-cashback')  &&
            document.getElementById('hero-cashack-view')  
              ){
            
                document.getElementById('hero-cashback-scroll').style.position='relative';
                document.getElementById('hero-cashback-scroll').style.height='35vh';
                document.getElementById('container-view-all').style.top='0';
                document.getElementById('img-cashback').style='width:25vh;height= 25vh';
                document.getElementById('active-cashback').style.padding='2vh 4vh';
                document.getElementById('hero-cashack-view').style.margin='0 0 2vh 0';  
                document.getElementById('hero-cashack-view').style.height='70%';  
                
            }

            this.setState({
              stop: 0,
              result: [],
              Boutique: [],
              url: window.location.pathname.split("/")[2],
              stop2:0,
              resultCoupons:[]
            });
        }
    }

    if(this.state.stop === 0) {
      this.getFindData();
    }

    window.addEventListener('scroll',function(){

      if(document.getElementById('hero-cashback-scroll') && 
          document.getElementById('img-cashback') && 
          document.getElementById('hero-cashback-scroll') &&
          document.getElementById('container-view-all')  &&
          document.getElementById('active-cashback')  &&
          document.getElementById('hero-cashack-view')  
        ){

        if(window.screen.width <= 414){

              if(window.pageYOffset > 100){

                document.getElementById('hero-cashback-scroll').style.height= '31vh';
                document.getElementById('img-cashback').style.width='10vh';
                document.getElementById('hero-cashback-scroll').style.position='fixed';
                document.getElementById('container-view-all').style.top='50vh';
                document.getElementById('active-cashback').style.padding='0.5vh 1vh';
                document.getElementById('hero-cashack-view').style.margin='0 0 0.25vh 0'; 
                document.getElementById('hero-cashack-view').style.height='75%';  
      
              }else{  

                document.getElementById('hero-cashback-scroll').style.position='relative';
                document.getElementById('hero-cashback-scroll').style.height='50vh';
                document.getElementById('container-view-all').style.top='0';
                document.getElementById('img-cashback').style='width:15vh;height= 15vh';
                document.getElementById('active-cashback').style.padding='2vh 4vh';
                document.getElementById('hero-cashack-view').style.margin='0 0 2vh 0';  
                document.getElementById('hero-cashack-view').style.height='70%';
                
              }
       }else{

        if(window.pageYOffset > 100){

          document.getElementById('hero-cashback-scroll').style.height= '23vh';
          document.getElementById('img-cashback').style.width='15vh';
          document.getElementById('hero-cashback-scroll').style.position='fixed';
          document.getElementById('container-view-all').style.top='50vh';
          document.getElementById('active-cashback').style.padding='0.75vh 2vh';
          document.getElementById('hero-cashack-view').style.margin='0 0 0.25vh 0'; 
          document.getElementById('hero-cashack-view').style.height='75%';  

        }else{  

          document.getElementById('hero-cashback-scroll').style.position='relative';
          document.getElementById('hero-cashback-scroll').style.height='35vh';
          document.getElementById('container-view-all').style.top='0';
          document.getElementById('img-cashback').style='width:25vh;height= 25vh';
          document.getElementById('active-cashback').style.padding='2vh 4vh';
          document.getElementById('active-cashback').style.padding='2vh 4vh';

          document.getElementById('hero-cashack-view').style.margin='0 0 2vh 0';  
          document.getElementById('hero-cashack-view').style.height='70%';
          
        }

       }
      }
    })

  };

  start=()=>{

    if(this.state.gliphicon === false){
      const el= findDOMNode(this.refs.toggle);   
      $(el).slideUp(1);
    }

  }

  getFindData=(id)=>{

    const { cookies } = this.props;

    if( cookies.get('_lo') != null){
      var data =[
        this.WatsCategorie(window.location.pathname.split("/")[2]),
        cookies.get('_lo').id,
      ];
    }else{
      var data =[
        this.WatsCategorie(window.location.pathname.split("/")[2]),
        null,
      ];
    }
     

    let formData = new FormData();
    formData.append("text",JSON.stringify(data));
    const url = localhost + "/controleur.php?p=getCashbackName";
        axios.post(url, formData).then((res)=>{
          console.log(res.data);
            setTimeout(() => {
                this.setState({
                result: res.data[0][0],
                Boutique: res.data[1],
                stop: 1,
                resHisto:res.data[2]
                });
            }, 400);
                if(this.state.stop2 === 0){
                    this.viewCoupons(res.data[0][0].id);
                }
        });
  };

  WatsCategorie = (e) => {
    var text = "";

    for (var i = 0; i < e.split("-").length; i++) {
      if (i === e.split("-").length - 1) {
        text = text + e.split("-")[i];
      } else {
        text = text + e.split("-")[i] + " ";
      }
    }

    return text;

  };

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
          <li data-aos='fade-in'>
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
              }}
            >
                <div className='link-btn-suggestion'>
                    <center>
                        <img src={this.state.Boutique[i].url_img}/>
                       

                        <div className='view-link-suggestion'>
                            <strike>
                                {this.state.Boutique[i].Ancien+''}
                            </strike>
                            <b>
                                {this.state.Boutique[i].Nouveaux+''}
                                <span class="glyphicon glyphicon-circle-arrow-up" aria-hidden="true"></span>
                            </b>
                        </div>
                    </center>

                </div>
            </Link>
          </li>
        );
      }

      return (
        <div className="boutique-categoie">
          <h1>Boutique Similaire</h1>
          {BoutiqueAll}
        </div>
      );
    } else {
      return <h2>Aucune Boutique Similaire</h2>;
    }
  };

  activecahback=()=>{

    const { cookies } = this.props;

    if(cookies.get('_lo') != null){
      var data =[
        cookies.get('_lo').id,
        this.state.result.id,
        this.state.result.categorie,
        cookies.get('_lo').nom+' '+cookies.get('_lo').prenom,
        this.state.result.Nouveaux,
        this.state.result.nom,
      ];

      let formData = new FormData();
      formData.append("text",JSON.stringify(data));
      const url = localhost + "/controleur.php?p=addCashbackHistory";
          axios.post(url, formData).then((res)=>{
            console.log(res.data);
            if(res.data === 'add-histo-success'){

                this.setState({
                  resHisto:['hello']
                });

                document.getElementById('resCoupns').style.display='block';
                document.getElementById('backgrondcoupons').style.display='block';

                document.getElementById('resCoupns').innerHTML='<div class="redirection"><h3> REDIRECTION VERS LE BOUTIQUE... </h3></div>';
                setTimeout(()=>{
                  window.open(this.state.result.link)
                  this.close()
                },700);

            }
          });
    }else{
      
      document.getElementById('resCoupns').style.display='block';
      document.getElementById('backgrondcoupons').style.display='block';
      this.setState({
        stop3:2,
      })
       
    }

  }

  desactivecashback=()=>{

    const { cookies } = this.props;

      var data =[
        cookies.get('_lo').id,
        this.state.result.id,
      ];

      let formData = new FormData();
      formData.append("text",JSON.stringify(data));
      const url = localhost + "/controleur.php?p=deleteCashbackHistory";
          axios.post(url, formData).then((res)=>{
            console.log(res.data);
            if(res.data === 'delete-histo-success'){
              this.setState({
                resHisto:[]
              });
            }

          });

  }

  button=()=>{

    if(this.state.resHisto.length > 0){
      return  <button id='active-cashback' className='active-cashback act-d' onClick={()=>{
              this.desactivecashback()
              }} >desactive le cashback</button>
    }else{
      return  <button id='active-cashback' className='active-cashback act-c' onClick={()=>{
                this.activecahback()
              }} >Active le cashback</button>
    }

  }

  handletoggle=()=>{
    const el= findDOMNode(this.refs.toggle);  
    this.setState({
      gliphicon:!this.state.gliphicon
    }) 
    $(el).slideToggle();

  }

  handletoggleapropos=()=>{

    const el= findDOMNode(this.refs.apropos);  
    this.setState({
      gliphiconaApropos:!this.state.gliphiconaApropos
    }) 
    $(el).slideToggle();

  }

  gliphicon=(a)=>{

    if(this.state.gliphicon === false){
        return <span class="glyphicon glyphicon-chevron-down" id='gliphicon' aria-hidden="true"></span>
    }else{
        return <span class="glyphicon glyphicon-chevron-up" id='gliphicon' aria-hidden="true"></span>
    }
  }

  gliphiconAppros=(a)=>{

    if(this.state.gliphiconaApropos === false){
        return <span class="glyphicon glyphicon-chevron-down" id='gliphicon' aria-hidden="true"></span>
    }else{
        return <span class="glyphicon glyphicon-chevron-up" id='gliphicon' aria-hidden="true"></span>
    }
  }

  trike=()=>{

    if(this.state.result.Ancien != ''){

      return <strike> {this.state.result.Ancien}</strike>

    }

  }

  viewStart=(e)=>{

    var  element=[];
    
      for(var i=0;i < 6;i++){

          if(i <= e){
            
            element.push(
                <li style={{color:'white'}}>
                <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
                </li>
            )
    
          }else{

            element.push(
                <li style={{color:'white'}}>
                <span className="glyphicon glyphicon-star-empty" aria-hidden="true"></span>
                </li>
            )
    
          }

      }

        return element;
  
  }


  data = () => {
    
    if (this.state.stop === 1) {
      return (
        <div style={{width:'100%',overflowX:'hidden',overflowY:'hidden'}}>
          <div id='hero-cashback-scroll'>
            <div id='hero-cashack-view'>
              <div className='hero-row-container'>
                  <div id="row">
                      <div className="col-md-4">
                          <div id='img-cashback'>
                            <img src={this.state.result.url_img} />
                          </div>
                      </div>

                      <div className="col-md-8">
                          <h1>{this.state.result.nom}</h1>
                          <div className='cashback-view-explication'>
                               <p>
                                   {this.state.result.nbr_coupons+' réductions disponibles'}
                               </p>
                               <ul>
                                  {this.viewStart(this.state.result.nbr_total_star/this.state.result.total_avis)}
                               </ul>
                               <b>{this.state.result.total_avis+' avis'}</b>
                          </div>
                      </div>

                  </div>
              </div>
            </div>
            <div className="cashback-add-historique">
                <div className='row'>
                  <div className="col-md-4">
                  </div>
                  
                  <div className="col-md-8">
                          <b >
                            {this.trike()}
                          </b>
                          <p>
                            {this.state.result.Nouveaux}
                            <span class="glyphicon glyphicon-circle-arrow-up" naria-hidden="true"></span>
                            <strong style={{fontSize:'2vh'}}>
                              remboursés sur vos achats
                            </strong>
                          </p>

                            {this.button()}
                  </div>
                </div>
                </div>
          </div>

          <div id="container-view-all">

            <div className='row'>
              <div className="col-md-4">
              </div>
              <div className="col-md-8">
                <div className="Condition-cashback" >
                  <div className='btn-condition' onClick={()=>{
                    this.handletoggle()
                  }}>Condition D'utilisation {this.gliphicon()}</div>
                    <div id='condition' ref='toggle'>
                      {parse(this.state.result.Condition_c)}
                    </div>
                </div>
              </div>
            </div>

            <div className='row'>
              
              <div className="col-md-4">
                <div className="apropos-cashback">
                <div className='btn-condition' onClick={()=>{
                    this.handletoggleapropos()
                  }}>à propos {this.gliphiconAppros()}</div>
                  <div id='apropos' ref='apropos'>
                    {parse(this.state.result.apropos)}
                  </div>
                </div>
                <Avis data={this.state.result.id} text={[this.state.result.nom,this.state.result.total_avis,(this.state.result.nbr_total_star/this.state.result.total_avis)]} />
              </div>
         
              <div className="col-md-8">
                  <h1 style={{ fontSize:' 3vh',color: 'rgb(2, 109, 242)',fontFamily : 'Fredoka One'}}>
                      Les meilleurs codes promo <b>{this.state.result.nom}</b>
                  </h1>

                  {this.viewCouponsResult()}

                  {this.BoutiqueView()}
             
                  <div id='description' className='view-active' >
                    <h1 style={{ fontSize:' 3vh',color: 'rgb(2, 109, 242)',fontFamily : 'Fredoka One'}}>
                        Description
                    </h1>
                    <div id='description-content' data-aos='fade-in'>
                      {parse(this.state.result.description)}
                    </div>
                </div>
            </div>
           </div>
          </div>
        </div>

      );
    } else {
      return (
        <div>
           <div id='hero-cashback-scroll'>
            <div id='hero-cashack-view'>
              <div className='hero-row-container'>
                  <div id="row">
                      <div className="col-md-4">
                         <Carre />
                      </div>

                      <div className="col-md-8">
                        <Long />
                      </div>
                  </div>
                  </div>
                  </div>
              </div>
            <div className="container-view-all">
              <div className='row'>
              <div className="col-md-4 img-view">
                <Empiler />
              </div>
              <div className="col-md-8 contennt-titre-view">
                <All_data />
              </div>
          </div>
        </div>
        </div>

      );
    }
  };

  viewCoupons=(e)=>{
    let formData = new FormData();

    formData.append(
      "text",
      JSON.stringify(e)
    );

    const url = localhost + "/controleur.php?p=ViewCoupons";

    axios.post(url, formData).then((res) => {
                this.setState({
                    resultCoupons: res.data,
                    stop2:1
                });
    });

  }

  viewCouponsResult=()=>{

      if(this.state.stop2 === 1){
          return this.resultCouponsALL();
      }else{
          return <All_data />
      }

  }

  resultCouponsALL=()=>{

        var data = this.state.resultCoupons;
        var element=[];

        if(data.length > 0){
            for(var i=0;i< data.length;i++){

              if(data[i].code === ''){
                
                element.push(

                    <div className='allCoupons'  >
                      <div className='row'>
    
                                <div className='inline-block-id-2'>
                                    <h1>
                                      {data[i].somme}
                                    </h1>
                                </div>
    
                                <div className='inline-block-id-6'>
                                    <h3>
                                        <Link to='#' onClick={
                                           this.openLink.bind(this,data[i].link)
                                        }>
                                            {parse(data[i].title)}
                                        </Link>
                                    </h3>
                                </div>

                                <div className='inline-block-id-4'>
                                    <div className='btn-coupons' style={{backgroundColor:'royalblue',color:'white',lineHeight:'6vh'}}
                                      onClick={this.openLink.bind(this,data[i].link)}>
                                        Voir l'offre
                                    </div>
                                </div>

                              </div>

                              <div className='row'>

                                  <div className='inline-block-id-2'>

                                  </div>

                                  <div className='inline-block-id-6'>
                                     <i class="glyphicon glyphicon-ok-sign" aria-hidden="true"></i><b>Vérifié</b>
                                  </div>

                                  <div className='inline-block-id-4'>
                                    <center>
                                        <button onClick={this.slideFind.bind(this,data[i].id)}>
                                            Voir les conditions
                                          </button>
                                      </center>
                                  </div>

                              </div>
                              <div className='row'>
                                <div className='inline-block-id-2'>

                                </div>
                                <div className='inline-block-id-10'>
                                  <div id={'coupons_'+data[i].id} ref={'coupons_'+data[i].id} className='coupons-condition'>
                                      {parse(data[i].description)}
                                  </div>
                                </div>
                              </div>

                        
                    </div>
                )
              }else{
                element.push(
                  <div className='allCoupons'>
                    <div className='row'>

                              <div className='inline-block-id-2'>
                                  <h1>
                                    {data[i].somme}
                                  </h1>
                              </div>

                              <div className='inline-block-id-6'>
                                  <h3>
                                      <Link to='#' onClick={
                                         this.openLink.bind(this,data[i].link)
                                      }>
                                          {parse(data[i].title)}
                                      </Link>
                                  </h3>
                                  
                              </div>

                              <div className='inline-block-id-4'>
                                
                                <div className='code-coupons-hidden'>
                                    <div className='code-coupons'>

                                        <div id={'coupons-'+data[i].id} className='btn-coupons up' onClick={ this.openCoupons.bind(this,data[i].id) }>
                                        Code coupons <span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span>
                                        </div>
                                        <div className='btn-coupons down'>
                                          <div id={'coupons-down-'+data[i].id} className='coupons-down' >
                                            <input id={"input-code-"+data[i].id} className='text-copie-code' value={data[i].code}  type="text"/>
                                              <button id={"copy-"+data[i].id} onClick={this.copy.bind(this,data[i].id)}><span class="glyphicon glyphicon-duplicate" aria-hidden="true"></span></button>
                                            </div>
                                          </div>
                                        </div>
                                    </div>
                                </div>

                                </div>

                              <div className='row'>
                                  <div className='inline-block-id-2'>

                                  </div>
                                  <div className='inline-block-id-6'>
                                  <i class="glyphicon glyphicon-ok-sign" aria-hidden="true"></i><b>Vérifié</b>
                                  </div>
                                  <div className='inline-block-id-4'>
                                    <center>
                                      <button  onClick={this.slideFind.bind(this,data[i].id)}>
                                          Voir les conditions
                                        </button>
                                    </center>
                                      
                                  </div>
                              </div>

                              <div className='row'>

                                <div className='inline-block-id-2'>

                                </div>

                                <div className='inline-block-id-10'>
                                  <div id={'coupons_'+data[i].id} ref={'coupons_'+data[i].id} className='coupons-condition'>
                                      {parse(data[i].description)}
                                  </div>
                                </div>

                              </div>
                  </div>
              )

              }
             
            }

            return element;

        }else{
            return <p>
                Aucune Coupons Disponible pour le moment.
            </p>;
        }
  }

  copy=(e,id)=>{
    id.preventDefault()
    document.getElementById('input-code-'+e).select();
    document.getElementById('copy-'+e).innerHTML='<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>'
    document.execCommand('copy')
  }

   openCoupons= function openCoupons(i,id){
    id.preventDefault();
    const { cookies } = this.props;

    if(cookies.get('_lo') != null){
      
        document.getElementById('coupons-'+i).style='left:-2vh';
        document.getElementById('coupons-down-'+i).style='left:3px';

    } 
}

  slideFind=(e,id)=>{
    id.preventDefault();

    const el= findDOMNode(document.getElementById('coupons_'+e));    
      $(el).slideToggle();

  }

  openLink=(e,id)=>{
    id.preventDefault();
    window.open(e)
  }

  viewCode=(e,id)=>{
    id.preventDefault();
    document.getElementById('resCoupns').style.display='block';
    document.getElementById('backgrondcoupons').style.display='block';
    let formData = new FormData();
    formData.append("text",JSON.stringify(e));
    const url = localhost + "/controleur.php?p=PlusCoupns";
        axios.post(url, formData).then((res)=>{
            if(res.data === 'histo-coupons-add'){
                for(var i=0;i< this.state.resultCoupons.length;i++){
                    if(this.state.resultCoupons[i].id === e){
                        setTimeout(()=>{
                            this.setState({
                                stop3:1,
                                idViewCoupons: this.state.resultCoupons[i]
                            })
                        },500);
                        break;
                    }
                }
            }
        });
  }

  datModalCoupons=()=>{

      if(this.state.stop3 === 1){
        return <div className='view-coupons-get-code'>
            <div style={{
                width:'100%',
                margin:'1vh auto'
            }} >
                <p>
                    Copiez le code coupons 
                </p>
            <input id="input-code"  className='text-copie-code' value={this.state.idViewCoupons.code}  type="text"/>
                    <button id="copy" onClick={()=>{
                        document.getElementById('input-code').select();
                        document.getElementById('copy').innerHTML='<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>'
                        document.execCommand('copy')
                    }}><span class="glyphicon glyphicon-duplicate" aria-hidden="true"></span></button>
            </div>
            <br/>
            <br/>
            <h1>Condition d'utilisation</h1>
              {parse(this.state.idViewCoupons.description)}
            </div>
      }else  if(this.state.stop3 === 2){
        return <div className='view-coupons-get-code'>
                    <div className='modal-reso'>
                      <center>
                        <img  src='/img/Ok.png'/>
                        <p>
                        Connecter / inscription pour utiliser active se service
                      </p>
                      </center>
                     
                      <Link to='/inscription'>
                                  inscription
                      </Link>
                      <Link to='/connexion'>
                                  connexion
                      </Link>
                    </div>
                </div>
      }else{
        return <Empiler />
      }
  }
  date=(e)=>{

    var now=new Date(); // date actuelle
    var later=new Date(e); // premier janvier 2013
    var result=later.getTime()-now.getTime(); // différence en millisecondes depuis le premier janvier 1970 (voir getTime() pour mieux comprendre)
    var jours=parseInt(result/86400000);

    if(jours < 10){
        return <div style={{color:'red'}}>
                    <span class="glyphicon glyphicon-time" aria-hidden="true"></span>Expire <Moment fromNow>{' '+e}</Moment>
                </div>
    }else{
        return <div style={{color:'green'}}>
                    <span class="glyphicon glyphicon-time" aria-hidden="true"></span>Expire <Moment fromNow>{' '+e}</Moment>
               </div>
    }
  }

  close=()=>{
    document.getElementById('resCoupns').style.display='none';
    document.getElementById('backgrondcoupons').style.display='none';
        this.setState({
            stop3:0,
            idViewCoupons: null
        })
  }

  

  render() {
    return (
      <div>
       {this.start()}
        {this.redirect()}
        <MetaTags>
          <title> cashback</title>
        </MetaTags>
        {this.data()}
        <div id='backgrondcoupons' onClick={()=>{
            this.close();
        }} >
           
        </div>
        <div id='resCoupns'>
                {this.datModalCoupons()}
        </div>

      <Footer />

      </div>
    );
  }
}

export default withCookies(Index);
