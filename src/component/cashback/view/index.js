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
import Avis from './avis'
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
      redirect:false
    };
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

  };

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
          <li>
            <Link
              to={
                "/cashbackAndCoupons/" +
                this.WatsUrl(this.state.Boutique[i].nom)
              }
            >
                <div className='link-btn-suggestion'>
                    <center>
                        <img src={this.state.Boutique[i].url_img}/>
                        <h3>
                            {this.state.Boutique[i].nom}
                        </h3>
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
      this.setState({
        redirect:true
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
      return  <button onClick={()=>{
              this.desactivecashback()
              }} >desactive le cashback</button>
    }else{
      return  <button onClick={()=>{
                this.activecahback()
              }} >Active le cashback</button>
    }

  }
  data = () => {
    if (this.state.stop === 1) {
      return (
        <div>
          <div id="hero-cashack">
            <div id="row-hero">
              <div className="inline-block img-view">
                <img src={this.state.result.url_img} />
              </div>
              <div className="inline-block contennt-titre-view">
                <div className="cashback-add-historique">
                  <h1>{this.state.result.nom}</h1>
                  <strike> {this.state.result.Ancien}</strike>
                  <b className="opati">

                    {this.state.result.Nouveaux}
                    <span
                      class="glyphicon glyphicon-circle-arrow-up"
                      aria-hidden="true"
                    ></span>
                    <h2>remboursés sur vos achats</h2>
                  </b>
                  <br />
                 {this.button()}
                </div>
                 
              </div>
            </div>
          </div>

          <div className="container-view-all">
            <div className="inline-block img-view">
              <div className="Condition-cashback">
                <h1>Condition D'utilisation</h1>
                {parse(this.state.result.Condition_c)}
              </div>
            </div>

            <div className="inline-block contennt-titre-view">
                  <h1 style={{ fontSize:' 3vh',color: 'rgb(2, 109, 242)',fontFamily : 'Fredoka One'}}>
                    Les Coupons Disponible
                </h1>
              {this.viewCouponsResult()}

              {this.BoutiqueView()}
             
              <div id='description' className='view-active' >

                  <h1 style={{ fontSize:' 3vh',color: 'rgb(2, 109, 242)',fontFamily : 'Fredoka One'}}>
                      Description
                  </h1>

                  <div id='description-content'>
                     {parse(this.state.result.description)}
                  </div>
                  <Avis data={this.state.result.id}/>

              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div id="hero-cashack">
            <div id="row-hero">
              <div className="inline-block img-view">
                <Carre />
              </div>
              <div className="inline-block contennt-titre-view">
                <Long />
              </div>
            </div>
          </div>

          <div className="container-view-all">
            <div className="inline-block img-view">
              <Empiler />
            </div>
            <div className="inline-block contennt-titre-view">
             <All_data />
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
                element.push(
                    <div className='allCoupons'>
    
                                <div className='inline-block-id'>
                                    <h1>
                                    <span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>{data[i].somme}
                                    </h1>
                                </div>
    
                                <div className='inline-block-id'>
                                    <h3>
                                        <Link to='#' onClick={
                                           this.openLink.bind(this,data[i].link)
                                        }>
                                            {data[i].title}
                                        </Link>
                                    </h3>
                                    <p>
                                        Gagner  {data[i].somme} sur votre achats
                                    </p>
                                    {this.date(data[i].end_date)}
                                </div>
    
                                <div className='inline-block-id'>
                                    <div className='code-view' onClick={this.viewCode.bind(this,data[i].id) }>
                                        Voir le code
                                    </div>
                                </div>
                        
                    </div>
                )
            }
            return element;

        }else{
            return <p>
                Aucune Coupons Disponible pour le moment.
            </p>;

        }
        

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
      </div>
    );
  }
}

export default withCookies(Index);
