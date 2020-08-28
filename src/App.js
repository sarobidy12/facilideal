import React , {  useEffect,useState }from 'react';
import axios from 'axios';
import { BrowserRouter , Route } from 'react-router-dom';
import MessengerCustomerChat from 'react-messenger-customer-chat';
import './App.css';
import Index from './component/index/index'; 
import IndexAdmin from './component/administration/view/index'; 
import LoginAdmin from './component/administration/admin'; 
import NotFound from './component/notFound/notFound'; 
import LienParaignage from './component/users/sign/paraignage'

import Sign from './component/users/sign/index'; 
import Login from './component/users/login/index'; 
import cashback from './component/cashback/index'; 
import Contact from './component/contact/index'; 
import cashbackSouscategorie from './component/cashback/souscategorie/index'; 

import cashbackGetAuto from './component/cashback/viewAllUrl/index'; 
import cashbackAndCoupons from './component/cashback/view/index'; 
import Findcashback from './component/cashback/findCashaback/index';

import Comfirm from './component/users/comfirm/index'; 

import AdminBoutique from './component/administration/view/boutique';
import Admincashback from './component/administration/view/cashback';
import Admincoupons from './component/administration/view/coupons';
import Adminmembre from './component/administration/view/membre';
import Adminmission from './component/administration/view/mission';
import Adminnewletter from './component/administration/view/newletter';
import Adminvalidation from './component/administration/view/validation';
import AdminCategorie from './component/administration/view/categorie';
import AdminRGPD from './component/administration/view/rgdp';
import AdminReseauxAffiliation from './component/administration/view/reseauxAffiliation';
import AdminReseauxPayement from './component/administration/view/payement';
import AdminReseauxPayementComfirmation from './component/administration/view/comfirmation_payment';

import AdminhistoriCashack from './component/administration/view/historique_cashback';

import AdminAddBoutique from './component/administration/add/boutique';
import AdminAddcashback from './component/administration/add/cashback';
import AdminAddcoupons from './component/administration/add/coupons';
import AdminAddmission from './component/administration/add/mission';
import AdminAddCategorie from './component/administration/add/categorie';
import AdminAddSousCategorie from './component/administration/add/sous_categorie';
import AdminAddREseaux from './component/administration/add/reseaux';
import AdminViewMembre from './component/administration/view/viewMembre';

import AdminUpdatCoupons from './component/administration/update/coupons';
import AdminUpdatCashback from './component/administration/update/cashback';
import AdminUpdatMission from './component/administration/update/mission';
import AdminUpdatcategorie from './component/administration/update/categorie';
import AdminVAlidationPrevalidation from './component/administration/view/validation_prevalidation';
import AdminValidationAvis from './component/administration/view/validationAvis';


import HeaderUser from './component/nav/index';

import Parraignage from './component/myaccount/paraignage';
import Notification from './component/myaccount/notification';
import Informations from './component/myaccount/informations';
import Historique from './component/myaccount/Historique';
import TableauBord from './component/myaccount/tableau_de_bord';
import Avis from './component/myaccount/avis';

import Mission from './component/mission/index';
import Boutique from './component/boutique/index';
import Gagnants from './component/gagnant/index';
import Offerwall from './component/offerwall/index';
import Offerwalls from './component/offerwall/offerwalls';

import RGPD from './component/RGPD/index';

import Aos from 'aos';
import "aos/dist/aos.css";
import localhost from './_config';
import { useCookies } from 'react-cookie';

function App() {

  const [cookie,Setcookie,removecookie]=useCookies([]);
  const [cookies, setCookie,removeCookie] = useCookies(null);
  const [stop,setStop]=useState(0);

  useEffect(()=>{

    Aos.init({
      duration : 1500
    })

    let formData= new FormData();
    formData.append("text",'text');
    const url= localhost+'/controleur.php?p=categorieAndSoucategorie'; 
    axios.post(url,formData)
    .then((res)=>{

        if(stop === 0){
          var data = [];
                for(var i=0;i< res.data[0].length;i++){
                 var SousCategorie =[];
                   for(var b=0;b < res.data[1].length;b++){
                        if(res.data[0][i].id === res.data[1][b].id_categorie){
                          SousCategorie.push(res.data[1][b]);
                       }
                   }
                   data.push({
                            id:res.data[0][i].id,
                            nom_categorie:res.data[0][i].nom_categorie,
                            url_img:res.data[0][i].url_img,
                            souscategorie:SousCategorie
                        })
                }
            setCookie('_categorieAndSousCAtegorie',data);
            setStop(1);
        }
    });
    
  },[]);

 
  return (
    <BrowserRouter>
      <HeaderUser/>
            <Route path="/" component={Index} exact />
            <Route path="/administration/" component={IndexAdmin}  />
            <Route path="/admin" component={LoginAdmin}  />

            <Route path="/administration/boutique" component={AdminBoutique}  />
            <Route path="/administration/cashback" component={Admincashback}  />
            <Route path="/administration/coupons" component={Admincoupons}  />
            <Route path="/administration/membre" component={Adminmembre}  />
            <Route path="/administration/mission" component={Adminmission}  />
            <Route path="/administration/newletter" component={Adminnewletter}  />
            <Route path="/administration/validation" component={Adminvalidation}  />
            <Route path="/administration/categorie/" component={AdminCategorie}  />
            <Route path="/administration/reseaux-affiliation" component={AdminReseauxAffiliation}  />
            <Route path="/administration/histori_cashback/" component={AdminhistoriCashack}  />
            <Route path="/administration/UpdateRgpd/" component={AdminRGPD}  />

            <Route path="/administration/payment" component={AdminReseauxPayement}  />
            <Route path="/administration/payment-comfirmation/:id" component={AdminReseauxPayementComfirmation}  />
          
            <Route path="/administration/reseaux-add" component={AdminAddREseaux}  />
            <Route path="/administration/boutique-add" component={AdminAddBoutique}  />
            <Route path="/administration/cashback-add" component={AdminAddcashback}  />
            <Route path="/administration/coupons-add" component={AdminAddcoupons}  />
            <Route path="/administration/mission-add" component={AdminAddmission}  />
            <Route path="/administration/categorie-add" component={AdminAddCategorie}  />
            <Route path="/administration/add-sous-categorie/:id" component={AdminAddSousCategorie}  />
            <Route path="/administration/coupons-update/:id" component={AdminUpdatCoupons}  />
            <Route path="/administration/cashback-update/:id" component={AdminUpdatCashback}  />
            <Route path="/administration/mission-update/:id" component={AdminUpdatMission}  />
            <Route path="/administration/categorie-update/:id" component={AdminUpdatcategorie}  />
            <Route path="/administration/prevalidation/:id" component={AdminVAlidationPrevalidation} />
            <Route path="/administration/comfirm-validation/:id" component={AdminVAlidationPrevalidation} />
            <Route path="/administration/validation-avis" component={AdminValidationAvis} />
            <Route path="/administration/ViewMembre/:id" component={AdminViewMembre} />
            
            <Route path="/categorie" component={cashback} />
            <Route path="/Gagnants" component={Gagnants} />
            <Route path="/casbackCategorie/:app/:id" component={cashbackSouscategorie} />
            <Route path="/findCashback/:id" component={Findcashback} />

            <Route path="/cashbackView/:id" component={cashbackGetAuto} />
            <Route path="/cashbackAndCoupons/:id" component={cashbackAndCoupons} />
            <Route path="/inscription" component={Sign} />
            <Route path="/connexion" component={Login} />
            <Route path="/comfirmation-users" component={Comfirm} />
            <Route path="/Parraignage/:id/:id" component={LienParaignage} />

            <Route path="/MyaccountInfo/Parraignage" component={Parraignage} />
            <Route path="/MyaccountInfo/tableau-de-bord" component={TableauBord} />
            <Route path="/MyaccountInfo/Historique" component={Historique} />
            <Route path="/MyaccountInfo/Mes-informations" component={Informations} />
            <Route path="/MyaccountInfo/Notification" component={Notification} />
            <Route path="/MyaccountInfo/livre-or" component={Avis} />

            <Route path="/Mission" component={Mission} />
            <Route path="/Offerwall" component={Offerwall} />
            <Route path="/Offerwalls/:id" component={Offerwalls} />
            <Route path="/Boutique" component={Boutique} />
            <Route path="/Contact" component={Contact} />

            <Route path="/politique-de-confidentialiter" component={RGPD} />

            <MessengerCustomerChat
              pageId = "101168218368541"
              appId = "3321703071194475"
            />
    </BrowserRouter>
  
  );
}

export default App;