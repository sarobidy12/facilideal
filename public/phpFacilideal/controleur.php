<?php

require '__autolaod.php';
use classes\UseDatabase;

if(htmlspecialchars($_GET['p']) == 'newLetter'){

   $f= explode(',',$_POST['text']);
   
        if(filter_var($f[1], FILTER_VALIDATE_EMAIL)){
                if(UseDatabase::ifNull('new_letter',' email = "'.$f[1].'"')){
                    UseDatabase::insert('new_letter(prenom,email)','VALUE("'.$f[0].'","'.$f[1].'")');
                    echo json_encode('new_letter_add');
                }else{
                    echo json_encode('io');
                }
        }else{
            echo json_encode('erreur_new_letter_email');
        }

}else if(htmlspecialchars($_GET['p']) == 'populaire'){

    $data = 
        [
            [
                'id'=>'1',
                'nom'=>'io',
                'renumeration'=>'10%',
                'data_expiration'=>'2010'
            ],
            [
                'id'=>'1',
                'nom'=>'io',
                'renumeration'=>'10%',
                'data_expiration'=>'2010'
            ],
            [
                'id'=>'1',
                'nom'=>'io',
                'renumeration'=>'10%',
                'data_expiration'=>'2010'
            ]
        ];

    echo json_encode($data);

}else if(htmlspecialchars($_GET['p']) == 'loginAdmin'){
 
    $tar = explode(',',$_POST['text']);
    $email =  htmlspecialchars($tar[0]);    
    $passeword =  sha1(md5(($tar[1]))); 

    $a=UseDatabase::ifNull('admin','a_name="'.$email.'"');

        if($a){

            if($a->a_passord == $passeword){
                echo json_encode('success-log-admin');
            }else{
                echo json_encode('error-mdp-admin');
            }

        }else{
            echo json_encode('error-log-admin');
        }

}else if(htmlspecialchars($_GET['p']) == 'categorie'){

    echo json_encode(UseDatabase::query('categorie'));
            
}else if(htmlspecialchars($_GET['p']) == 'souscategorie'){

    echo json_encode(UseDatabase::query('sous_categorie','id_categorie='.$_POST['text']));
            
}else if(htmlspecialchars($_GET['p']) == 'addCoupons'){

    UseDatabase::insert('coupons(
                                title,
                                description,
                                code,
                                somme,
                                cashback,
                                link,
                                start_date,
                                end_date
                            )',"
                            VALUE(
                                '".json_decode($_POST['text'])[0]."',
                                '".addslashes(json_decode($_POST['text'])[1])."',
                                '".json_decode($_POST['text'])[2]."',
                                '".json_decode($_POST['text'])[3]."',
                                '".json_decode($_POST['text'])[4]."',
                                '".json_decode($_POST['text'])[5]."',
                                NOW(),
                                '".json_decode($_POST['text'])[6]."'
                        )");
 
                        UseDatabase::updateW("cashback","nbr_coupons = nbr_coupons+1",'id = '.json_decode($_POST['text'])[4]);

    echo json_encode('add-success-coupons');  
    
}else if(htmlspecialchars($_GET['p']) == 'ViewCoupons'){

    if(json_decode($_POST['text']) == 0){
        $ViewCoupons = UseDatabase::query('coupons');
    }else{
        $ViewCoupons = UseDatabase::query('coupons','cashback='.json_decode($_POST['text']));
    }

    echo json_encode( $ViewCoupons);  

}else if(htmlspecialchars($_GET['p']) == 'deleteCoupons'){

    $tar = explode(',',$_POST['text']); 

    for($i=0;$i < count($tar);$i++){
        UseDatabase::delete('coupons',$tar[$i]);
    }

    echo json_encode('delete-success');  

}else if(htmlspecialchars($_GET['p']) == 'CouponsAddHome'){

    $tar = explode(',',$_POST['text']); 

        for($i=0;$i < count($tar);$i++){
            UseDatabase::update('coupons','add_home = 1',$tar[$i]);
        }

            echo json_encode('coupons-add-home-success');  

}else if(htmlspecialchars($_GET['p']) == 'CouponsRemoveHome'){

    $tar = explode(',',$_POST['text']); 

        for($i=0;$i < count($tar);$i++){
            UseDatabase::update('coupons','add_home = 0',$tar[$i]);
        }

            echo json_encode('coupons-remove-home-success');  

}else if(htmlspecialchars($_GET['p']) == 'CouponsStatus'){

            UseDatabase::update('coupons','status = !status',$_POST['text']);

            echo json_encode('coupons-status-home-success');  

}else if(htmlspecialchars($_GET['p']) == 'getCouponsId'){

    echo json_encode(UseDatabase::prepare('coupons','id ='.$_POST['text']));  

}else if(htmlspecialchars($_GET['p']) == 'UpdateCoupons'){

    UseDatabase::update('coupons','
                                title = "'.json_decode($_POST['text'])[0].'",
                                description = "'.json_decode($_POST['text'])[1].'",
                                code = "'.json_decode($_POST['text'])[2].'",
                                somme = "'.json_decode($_POST['text'])[3].'",
                                link = "'.json_decode($_POST['text'])[4].'",
                                end_date = "'.json_decode($_POST['text'])[5].'"
                            ',json_decode($_POST['text'])[6]);

    echo json_encode('update-success-coupons');  
    
}else if(htmlspecialchars($_GET['p']) == 'addCashback'){

    if(UseDatabase::exist('cashback','nom ="'.json_decode($_POST['text'])[7].'"')){
        
            UseDatabase::insert('cashback(
                    affiliation,
                    Ancien,
                    Nouveaux,
                    categorie,
                    sous_categorie,
                    link,
                    url_img,
                    nom,
                    description,
                    Condition_c,
                    start_date,
                    end_date
                )',"
                VALUE(
                    '".json_decode($_POST['text'])[0]."',
                    '".json_decode($_POST['text'])[1]."',
                    '".json_decode($_POST['text'])[2]."',
                    '".json_decode($_POST['text'])[3]."',
                    '".json_decode($_POST['text'])[4]."',
                    '".json_decode($_POST['text'])[5]."',
                    '".json_decode($_POST['text'])[6]."',
                    '".json_decode($_POST['text'])[7]."',
                    '".addslashes(json_decode($_POST['text'])[8])."',
                    '".addslashes(json_decode($_POST['text'])[9])."',
                    NOW(),
                    '".json_decode($_POST['text'])[10]."'
                )");  

                echo json_encode('add-success-cashback');  
    }else{
        echo json_encode('add-already-exist-cashback');  
    }
   

}else if(htmlspecialchars($_GET['p']) == 'ViewCashback'){

    if(json_decode($_POST['text']) == 0){
        $ViewCoupons = UseDatabase::query('cashback');
    }else{
        $ViewCoupons = UseDatabase::query('cashback','categorie='.json_decode($_POST['text']));
    }

    echo json_encode( $ViewCoupons);  

}else if(htmlspecialchars($_GET['p']) == 'CashbackStatus'){

    UseDatabase::update('cashback','actif = !actif',$_POST['text']);

        echo json_encode('cashback-status-home-success');  

}else if(htmlspecialchars($_GET['p']) == 'CashbackAddHome'){

    $tar = explode(',',$_POST['text']); 

        for($i=0;$i < count($tar);$i++){
            UseDatabase::update('cashback','add_home = 1',$tar[$i]);
        }

            echo json_encode('cashback-add-home-success');  

}else if(htmlspecialchars($_GET['p']) == 'CashbackRemoveHome'){

    $tar = explode(',',$_POST['text']); 

        for($i=0;$i < count($tar);$i++){
            UseDatabase::update('cashback','add_home = 0',$tar[$i]);
        }

            echo json_encode('cashback-remove-home-success');  

}else if(htmlspecialchars($_GET['p']) == 'deletecashback'){

    $tar = explode(',',$_POST['text']); 

        for($i=0;$i < count($tar);$i++){
            UseDatabase::delete('cashback',$tar[$i]);
            UseDatabase::deleteAll('coupons','cashback='.$tar[$i]);
        }

            echo json_encode('cashback-delete-success');  

}else if(htmlspecialchars($_GET['p']) == 'CashbackValider'){

    UseDatabase::update('cashback','valid = !valid',$_POST['text']);

    echo json_encode('cashback-valider-home-success');  

}else if(htmlspecialchars($_GET['p']) == 'getCashbackId'){

    echo json_encode(UseDatabase::prepare('cashback','id ='.$_POST['text']));  

}else if(htmlspecialchars($_GET['p']) == 'UpdateCashback'){

            UseDatabase::update('cashback',"
                Ancien ='".json_decode($_POST['text'])[0]."',
                Nouveaux  ='".json_decode($_POST['text'])[1]."',
                link  ='".json_decode($_POST['text'])[2]."',
                url_img  ='".json_decode($_POST['text'])[3]."',
                nom  ='".json_decode($_POST['text'])[4]."',
                description  ='".json_decode($_POST['text'])[5]."',
                Condition_c  ='".json_decode($_POST['text'])[6]."',
                end_date ='".json_decode($_POST['text'])[7]."'         
            ", json_decode($_POST['text'])[8]); 

                echo json_encode('update-success-cashback');  
    
}else if(htmlspecialchars($_GET['p']) == 'addClick'){
 
    UseDatabase::insert('clics(
        nom,
        url,
        pays,
        remuneration,
        actif,
        date
    )',"
    VALUE(
        '".json_decode($_POST['text'])[0]."',
        '".json_decode($_POST['text'])[1]."',
        '".json_decode($_POST['text'])[2]."',
        '".json_decode($_POST['text'])[3]."',
        '1',
        NOW()
    )"); 
    
    echo json_encode('add-success-click');  

}else if(htmlspecialchars($_GET['p']) == 'ViewClick'){

    echo json_encode(UseDatabase::query('clics'));  

}else if(htmlspecialchars($_GET['p']) == 'ClickStatus'){

    UseDatabase::update('clics','actif = !actif',$_POST['text']);
        echo json_encode('click-status-home-success');  

}else if(htmlspecialchars($_GET['p']) == 'deleteClick'){

    $tar = explode(',',$_POST['text']); 

        for($i=0;$i < count($tar);$i++){
            UseDatabase::delete('clics',$tar[$i]);
        }

            echo json_encode('cashback-delete-success');  

}else if(htmlspecialchars($_GET['p']) == 'getClickId'){

    echo json_encode(UseDatabase::prepare('clics','id ='.$_POST['text']));  

}else if(htmlspecialchars($_GET['p']) == 'UpdateClick'){
 
    UseDatabase::update('clics','
        nom =  "'.json_decode($_POST['text'])[0].'",
        url ="'.json_decode($_POST['text'])[1].'",
        pays ="'.json_decode($_POST['text'])[2].'",
        remuneration="'.json_decode($_POST['text'])[3].'"
    ',json_decode($_POST['text'])[4]); 
    
    echo json_encode('update-success-click');  

}else if(htmlspecialchars($_GET['p']) == 'addMission'){
 
    UseDatabase::insert('mission(
        nom,
        url,
        description,
        pays,
        remuneration,
        montant,
        date,
        valid,
        regie,
        annonceur,
        quota,
        premium
    )',"
    VALUE(
        '".json_decode($_POST['text'])[0]."',
        '".json_decode($_POST['text'])[1]."',
        '".json_decode($_POST['text'])[2]."',
        '".json_decode($_POST['text'])[3]."',
        '".json_decode($_POST['text'])[4]."',
        '".json_decode($_POST['text'])[5]."',
        NOW(),
        '".json_decode($_POST['text'])[6]."',
        '".json_decode($_POST['text'])[7]."',
        '".json_decode($_POST['text'])[8]."',
        '".json_decode($_POST['text'])[9]."',
        '".json_decode($_POST['text'])[10]."'
    )"); 

    echo json_encode('add-success-mission');    

}else if(htmlspecialchars($_GET['p']) == 'ViewMission'){

    echo json_encode(UseDatabase::query('mission'));  

}else if(htmlspecialchars($_GET['p']) == 'PrenuimMission'){

    UseDatabase::update('mission','premium = !premium ',$_POST['text']);
        echo json_encode('mission-premium-success');  

}else if(htmlspecialchars($_GET['p']) == 'MissionStatus'){

    UseDatabase::update('mission','actif = !actif ',$_POST['text']);
        echo json_encode('mission-actif-success');  

}else if(htmlspecialchars($_GET['p']) == 'cashbackPrenium'){

    UseDatabase::updateW('cashback','premium = 0 ','premium = 1');
    UseDatabase::update('cashback','premium = !premium ',$_POST['text']);

        echo json_encode('cashback-prenium-success');  

}else if(htmlspecialchars($_GET['p']) == 'deleteMission'){

    $tar = explode(',',$_POST['text']); 

        for($i=0;$i < count($tar);$i++){
            UseDatabase::delete('mission',$tar[$i]);
        }

            echo json_encode('mission-delete-success');  

}else if(htmlspecialchars($_GET['p']) == 'getMissionId'){

    echo json_encode(UseDatabase::prepare('mission','id ='.$_POST['text']));  

}else if(htmlspecialchars($_GET['p']) == 'register'){

    if (filter_var(json_decode($_POST['text'])[0], FILTER_VALIDATE_EMAIL)) {

        if(UseDatabase::exist('users','email = "'.json_decode($_POST['text'])[0].'"')){

            UseDatabase::insert('users(
                email,
                mdp,
                nom,
                prenom,
                idParrain,
                date_Inscription
            )','VALUE(
                "'.json_decode($_POST['text'])[0].'",
                "'.md5(sha1(json_decode($_POST['text'])[1])).'",
                "'.json_decode($_POST['text'])[2].'",
                "'.json_decode($_POST['text'])[3].'",
                "'.json_decode($_POST['text'])[4].'",
                NOW()
            )');

            echo json_encode('add-user-success');  

        }else{
            echo json_encode('email-elready');  
        }

    }else{
        
        echo json_encode('error-email');  
        
    }

}else if(htmlspecialchars($_GET['p']) == 'comfirmUsers'){

    UseDatabase::updateW('users','comfirm = 1','email = "'.$_POST['text'].'"');
    echo json_encode('comfirm-users-success');  

}else if(htmlspecialchars($_GET['p']) == 'loginUsers'){

   if(!UseDatabase::exist('users','email = "'.json_decode($_POST['text'])[0].'"')){

        $a = UseDatabase::prepare('users','email = "'.json_decode($_POST['text'])[0].'"')[0];

            if($a->comfirm*1 === 1){

                if($a->mdp === md5(sha1(json_decode($_POST['text'])[1]))){
                    echo json_encode($a);  
                }else{
                    echo json_encode('password-no');  
                }

            }else{
                echo json_encode('users-no-comfirm');  
            }

   }else{

        echo json_encode('users-noFound');  

   }

}else if(htmlspecialchars($_GET['p']) == 'UsersBymail'){
 
         echo json_encode(UseDatabase::prepare('users','email = "'.json_decode($_POST['text']).'"')[0]);  
 
}else if(htmlspecialchars($_GET['p']) == 'deletecategorie'){

    $tar = explode(',',$_POST['text']); 

        for($i=0;$i < count($tar);$i++){
            UseDatabase::delete('categorie',$tar[$i]);
            UseDatabase::deleteAll('sous_categorie','id_categorie='.$tar[$i].'+0');
        }

            echo json_encode('categorie-delete-success');  

}else if(htmlspecialchars($_GET['p']) == 'addCategorie'){

        UseDatabase::insert('categorie(nom_categorie,url_img)','VALUE("'.json_decode($_POST['text'])[0].'","'.json_decode($_POST['text'])[1].'")');
        echo json_encode('add-categorie-success');  
    
}else if(htmlspecialchars($_GET['p']) == 'getCAtegorieId'){

    echo json_encode(UseDatabase::prepare('categorie','id ='.$_POST['text']));  

}else if(htmlspecialchars($_GET['p']) == 'UpdateCategorie'){
 
    UseDatabase::update('categorie',

            'nom_categorie="'.json_decode($_POST['text'])[0].'",
        url_img="'.json_decode($_POST['text'])[1].'"',
    
    json_decode($_POST['text'])[2]); 

        echo json_encode('update-success-categorie');  

}else if(htmlspecialchars($_GET['p']) == 'deleteSouscategorie'){

    $tar = explode(',',$_POST['text']); 

        for($i=0;$i < count($tar);$i++){
            UseDatabase::delete('sous_categorie',$tar[$i]);
        }

            echo json_encode('categorie-sous-delete-success');  

}else if(htmlspecialchars($_GET['p']) == 'addSousCategorie'){

    UseDatabase::insert('sous_categorie(nom_sous_categorie,id_categorie)','

        VALUE(
        "'.json_decode($_POST['text'])[0].'",
        "'.json_decode($_POST['text'])[1].'")
        ');

        echo json_encode('add-categorie-success');  

}else if(htmlspecialchars($_GET['p']) == 'addAffiliation'){
 
    UseDatabase::insert('affilliation(
        nom,
        url,
        pays,
        descirpion,
        actif,
        date
    )',"
    VALUE(
        '".json_decode($_POST['text'])[0]."',
        '".json_decode($_POST['text'])[1]."',
        '".json_decode($_POST['text'])[2]."',
        '".json_decode($_POST['text'])[3]."',
        '1',
        NOW()
    )"); 
    
    echo json_encode('add-affilliation-click');  

}else if(htmlspecialchars($_GET['p']) == 'Viewaffilliation'){

     echo json_encode( UseDatabase::query('affilliation'));  

}else if(htmlspecialchars($_GET['p']) == 'AffilliationStatus'){

    UseDatabase::update('affilliation','actif = !actif',$_POST['text']);
    echo json_encode('affilliation-status-home-success');  

}else if(htmlspecialchars($_GET['p']) == 'affiliation'){

    echo json_encode(UseDatabase::query('affilliation'));

}else if(htmlspecialchars($_GET['p']) == 'deleteaffiliation'){

    $tar = explode(',',$_POST['text']); 

    for($i=0;$i < count($tar);$i++){
        UseDatabase::delete('affilliation',$tar[$i]);
        UseDatabase::deleteAll('cashback','affiliation = '.$tar[$i].'+0');
    }

    echo json_encode('affilliation-success');  

}else if(htmlspecialchars($_GET['p']) == 'categorieAndSoucategorie'){
    echo json_encode([UseDatabase::query('categorie'),UseDatabase::query('sous_categorie')]);
}else if(htmlspecialchars($_GET['p']) == 'GetcategorieName'){

    echo json_encode(UseDatabase::query('categorie','nom_categorie='.$_POST['text']));  

}else if(htmlspecialchars($_GET['p']) == 'getCashbackName'){

    echo json_encode(
        [
            UseDatabase::prepare('cashback','nom="'.json_decode($_POST['text'])[0].'"'),
            UseDatabase::query('cashback','sous_categorie="'.UseDatabase::prepare('cashback','nom="'.json_decode($_POST['text'])[0].'"')[0]->sous_categorie.'" ORDER BY RAND() LIMIT 4'),
            UseDatabase::query('histo_cashback','id_user="'.json_decode($_POST['text'])[1].'" AND id_cashback="'.UseDatabase::prepare('cashback','nom="'.json_decode($_POST['text'])[0].'"')[0]->id.'"'),
        ]);

}else if(htmlspecialchars($_GET['p']) == 'PlusCoupns'){

    UseDatabase::update('coupons',"visits=visits+1 ,last_visit=NOW() ",json_decode($_POST['text']));
    UseDatabase::update('coupons','visits_today=visits_today+1',json_decode($_POST['text'])." AND DATE(last_visit)=DATE(NOW()) ");
    echo json_encode('histo-coupons-add');

}else if(htmlspecialchars($_GET['p']) == 'addavis'){

  //  if(UseDatabase::exist('avis_cashback','id_cashback="'.json_decode($_POST['text'])[0].'" AND id_users="'.json_decode($_POST['text'])[2].'"')){

            UseDatabase::insert('avis_cashback(
                id_cashback,
                avis,
                id_users,
                user_name,
                nbr_start,
                date_time 
            )',"
            VALUE(
                '".json_decode($_POST['text'])[0]."',
                '".json_decode($_POST['text'])[1]."',
                '".json_decode($_POST['text'])[2]."',
                '".json_decode($_POST['text'])[3]."',
                '".json_decode($_POST['text'])[4]."',
                NOW()
            )");

            echo json_encode('add-avis-success');  
    // }else{
    //     echo json_encode('add-avis-faild');  
        
    // }

    
}else if(htmlspecialchars($_GET['p']) == 'ViewAvis'){

    echo json_encode(UseDatabase::query('avis_cashback','id_cashback="'.json_decode($_POST['text']).'"'));

}else if(htmlspecialchars($_GET['p']) == 'getMyparraaignageId'){

    echo json_encode(UseDatabase::query('users','idParrain="'.json_decode($_POST['text']).'"'));

}else if(htmlspecialchars($_GET['p']) == 'FindMission'){

    echo json_encode([
            UseDatabase::query('mission'),
            UseDatabase::query('historique_action','idUser="'.json_decode($_POST['text']).'"')
        ]);

}else if(htmlspecialchars($_GET['p']) == 'addHistorique'){
  
              UseDatabase::insert('historique_action(
                  idUser,
                  offerwall,
                  idOffre,
                  remuneration,
                  dateUsTime,
                  ip 
              )',"
              VALUE(
                  '".json_decode($_POST['text'])[0]."',
                  '".json_decode($_POST['text'])[1]."',
                  '".json_decode($_POST['text'])[2]."',
                  '".json_decode($_POST['text'])[3]."',
                  NOW(),
                  '".$_SERVER['REMOTE_ADDR']."'
              )");
    
              if(json_decode($_POST['text'])[1] === 'mission'){
                UseDatabase::update('mission',"used=used+1 ,last_visit=NOW() ",json_decode($_POST['text'])[2]);
                UseDatabase::update('mission','used_today=used_today+1',json_decode($_POST['text'])[2]." AND DATE(last_visit)=DATE(NOW()) ");

              }else{
                  
                UseDatabase::update('clics',"used=used+1 ,last_visit=NOW() ",json_decode($_POST['text'])[2]);
                UseDatabase::update('clics','used_today=used_today+1',json_decode($_POST['text'])[2]." AND DATE(last_visit)=DATE(NOW()) ");
 
              }
                  
                        echo json_encode('add-histo-success'); 

}else if(htmlspecialchars($_GET['p']) == 'FindClick'){

    echo json_encode([
            UseDatabase::query('clics'),
            UseDatabase::query('historique_action','idUser="'.json_decode($_POST['text']).'"')
        ]);

}else if(htmlspecialchars($_GET['p']) == 'addboutique'){
  
                UseDatabase::insert('boutique(
                    id_type,
                    somme 
                )',"
                VALUE(
                    '".json_decode($_POST['text'])[0]."',
                    '".json_decode($_POST['text'])[1]."'
                )");
            
                    echo json_encode('add-boutique-success'); 

}else if(htmlspecialchars($_GET['p']) == 'ViewBoutique'){

    echo json_encode(UseDatabase::query('boutique'));

}else if(htmlspecialchars($_GET['p']) == 'deleteBoutique'){

    UseDatabase::delete('boutique',json_decode($_POST['text']));
    echo json_encode('delete-succes-boutique');

}else if(htmlspecialchars($_GET['p']) == 'addHistoVirementBancaire'){
  
    UseDatabase::insert('histo_boutique(
        id_users,
        id_type_boutique,
        fullname,
        bankname,
        iban,
        rib,
        prix,
        date,
        time 
    )',"
    VALUE(
        '".json_decode($_POST['text'])[0]."',
        '".json_decode($_POST['text'])[1]."',
        '".json_decode($_POST['text'])[2]."',
        '".json_decode($_POST['text'])[3]."',
        '".json_decode($_POST['text'])[4]."',
        '".json_decode($_POST['text'])[5]."',
        '".json_decode($_POST['text'])[6]."',
        NOW(),
        NOW()
       
    )");

        echo json_encode('add-histo-payment-success'); 

}else if(htmlspecialchars($_GET['p']) == 'addHistoAmazone'){
  
    UseDatabase::insert('histo_boutique(
        id_users,
        id_type_boutique,
        fullname,
        emailamazon,
        prix,
        date,
        time 
    )',"
    VALUE(
        '".json_decode($_POST['text'])[0]."',
        '".json_decode($_POST['text'])[1]."',
        '".json_decode($_POST['text'])[2]."',
        '".json_decode($_POST['text'])[3]."',
        '".json_decode($_POST['text'])[4]."',
        NOW(),
        NOW()       
    )");

        echo json_encode('add-histo-payment-success'); 

}else if(htmlspecialchars($_GET['p']) == 'addHistopaypal'){
  
    UseDatabase::insert('histo_boutique(
        id_users,
        id_type_boutique,
        fullname,
        emailpaypal,
        prix,
        date,
        time 
    )',"
    VALUE(
        '".json_decode($_POST['text'])[0]."',
        '".json_decode($_POST['text'])[1]."',
        '".json_decode($_POST['text'])[2]."',
        '".json_decode($_POST['text'])[3]."',
        '".json_decode($_POST['text'])[4]."',
        NOW(),
        NOW()
       
    )");

        echo json_encode('add-histo-payment-success'); 

}else if(htmlspecialchars($_GET['p']) == 'getCountAll'){
  
        echo json_encode([
            UseDatabase::count('historique_action','offerwall="mission" AND etat=0')[0],
            UseDatabase::count('historique_action','offerwall="mission" AND etat=1')[0],
            UseDatabase::count('historique_action','offerwall="click" AND etat=0')[0],
            UseDatabase::count('historique_action','offerwall="click" AND etat=1')[0],
            UseDatabase::count('avis_utilisateur','etat=0')[0]
        ]); 

}else if(htmlspecialchars($_GET['p']) == 'getVAlidationPrevalidation'){
  
   if(json_decode($_POST['text'])[0] == 'mission' || json_decode($_POST['text'])[0] == 'click') {

      echo json_encode(UseDatabase::query('historique_action','offerwall="'.json_decode($_POST['text'])[0].'" AND etat="'.json_decode($_POST['text'])[1].'"')); 

   }

}else if(htmlspecialchars($_GET['p']) == 'comfirmValidaton'){

    $tar = explode(',',$_POST['text']); 

        for($i=0;$i < count($tar);$i++){
            UseDatabase::update('historique_action','etat = etat+1',$tar[$i]);
        }

            echo json_encode('validation-success');  

}else if(htmlspecialchars($_GET['p']) == 'comfirmValidatonRefuser'){

    $tar = explode(',',$_POST['text']); 

        for($i=0;$i < count($tar);$i++){

            UseDatabase::insert('notification_users(
                iduser,
                message,
                type,
                etat,
                data_c
              )',"
              VALUE(
                    '". UseDatabase::prepare('historique_action','id="'.$tar[$i].'"')[0]->idUser."',
                    '".htmlspecialchars("Votre demnade à été refusé de reessayer plut tard")."',
                    '".UseDatabase::prepare('historique_action','id="'.$tar[$i].'"')[0]->offerwall."',
                    '0',
                    NOW()
               )");
               
            UseDatabase::delete('historique_action',$tar[$i]);

        }

            echo json_encode('validation-success');  

}else if(htmlspecialchars($_GET['p']) == 'SuccesscomfirmValidaton'){

    $tar = explode(',',$_POST['text']); 

        for($i=0;$i < count($tar);$i++){

             UseDatabase::update('historique_action','etat = etat+1',$tar[$i]);
             UseDatabase::update('users',
             'argent="'.(UseDatabase::prepare('users','id="'.UseDatabase::prepare('historique_action','id="'.$tar[$i].'"')[0]->idUser.'"')[0]->argent +
             UseDatabase::prepare('historique_action','id="'.$tar[$i].'"')[0]->remuneration).'"',
             UseDatabase::prepare('historique_action','id="'.$tar[$i].'"')[0]->idUser
             );

                 UseDatabase::insert('notification_users(
                    iduser,
                    message,
                    type,
                    etat,
                    data_c
                  )',"
                  VALUE(
                        '". UseDatabase::prepare('historique_action','id="'.$tar[$i].'"')[0]->idUser."',
                        '".htmlspecialchars("Votre compte à bien été credite de ".UseDatabase::prepare('historique_action','id="'.$tar[$i].'"')[0]->remuneration)." €',
                        '".UseDatabase::prepare('historique_action','id="'.$tar[$i].'"')[0]->offerwall."',
                        '1',
                        NOW()
                   )");

        }
        
            echo json_encode('validation-success');  

}else if(htmlspecialchars($_GET['p']) == 'findUserId'){

    echo json_encode(UseDatabase::query('users','id="'.json_decode($_POST['text']).'"')[0]);

}else if(htmlspecialchars($_GET['p']) == 'histoBoutique'){

    echo json_encode(UseDatabase::query('histo_boutique'));

}else if(htmlspecialchars($_GET['p']) == 'getComfirmationBoutique'){

    echo json_encode(UseDatabase::query('histo_boutique','id="'.json_decode($_POST['text']).'"')[0]);

}else if(htmlspecialchars($_GET['p']) == 'ComfirmPayment'){

        UseDatabase::update('users',
        'argent="'.(UseDatabase::prepare('users','id="'.UseDatabase::prepare('histo_boutique','id="'.json_decode($_POST['text']).'"')[0]->id_users.'"')[0]->argent -
        UseDatabase::prepare('histo_boutique','id="'.json_decode($_POST['text']).'"')[0]->prix).'"',
        UseDatabase::prepare('histo_boutique','id="'.json_decode($_POST['text']).'"')[0]->id_users
        );
        
        UseDatabase::insert('notification_users(
                    iduser,
                    message,
                    type,
                    etat,
                    data_c
        )',"
        VALUE(
            '".UseDatabase::prepare('histo_boutique','id="'.json_decode($_POST['text']).'"')[0]->id_users."',
            '".htmlspecialchars("Votre payment à bien été effectuer de ".UseDatabase::prepare('histo_boutique','id="'.json_decode($_POST['text']).'"')[0]->prix)." €',
            'Mode de payemennt',
            '1',
             NOW()
        )");

            UseDatabase::update('histo_boutique','etat= 1',json_decode($_POST['text']));

                echo json_encode('validation-success');  

}else if(htmlspecialchars($_GET['p']) == 'RefusePayment'){

            UseDatabase::insert('notification_users(
                    iduser,
                    message,
                    type,
                    etat,
                    data_c
            )',"
            VALUE(
            '".UseDatabase::prepare('histo_boutique','id="'.json_decode($_POST['text']).'"')[0]->id_users."',
            '".htmlspecialchars("Votre payment à été refuse de ".UseDatabase::prepare('histo_boutique','id="'.json_decode($_POST['text']).'"')[0]->prix)." €',
            'Mode de payemennt',
            '0',
            NOW()
            )");

            UseDatabase::update('histo_boutique','etat= 2',json_decode($_POST['text']));

                echo json_encode('validation-success');   

}else if(htmlspecialchars($_GET['p']) == 'getMyNotification'){

    echo json_encode(UseDatabase::query('notification_users','iduser="'.json_decode($_POST['text']).'" ORDER BY  id DESC'));

}else if(htmlspecialchars($_GET['p']) == 'deleteNotification'){

    UseDatabase::deleteAll('notification_users','iduser="'.json_decode($_POST['text']).'"');
    echo json_encode('delete-success');

}else if(htmlspecialchars($_GET['p']) == 'getMyhistorique'){

    echo json_encode(UseDatabase::query('histo_boutique','id_users="'.json_decode($_POST['text']).'" ORDER BY  id DESC'));

}else if(htmlspecialchars($_GET['p']) == 'deletehistorique'){

    UseDatabase::deleteAll('histo_boutique','id_users="'.json_decode($_POST['text']).'"');
    echo json_encode('delete-success');

}else if(htmlspecialchars($_GET['p']) == 'getMyMission'){

    echo json_encode(UseDatabase::query('historique_action','idUser="'.json_decode($_POST['text']).'" AND offerwall="mission" ORDER BY  id DESC'));

}else if(htmlspecialchars($_GET['p']) == 'getMyClick'){

    echo json_encode(UseDatabase::query('historique_action','idUser="'.json_decode($_POST['text']).'" AND offerwall="click" ORDER BY  id DESC'));

}else if(htmlspecialchars($_GET['p']) == 'addCashbackHistory'){

    UseDatabase::insert('histo_cashback(
            id_user,
            id_cashback,
            id_categorie_cashback,
            name_users,
            cashback_p,
            cashback_name,
            date,
            ip_historique
    )',"
    VALUE(
        '".json_decode($_POST['text'])[0]."',
        '".json_decode($_POST['text'])[1]."',
        '".json_decode($_POST['text'])[2]."',
        '".json_decode($_POST['text'])[3]."',
        '".json_decode($_POST['text'])[4]."',
        '".json_decode($_POST['text'])[5]."',
        NOW(),
        '".$_SERVER['REMOTE_ADDR']."'
    )");

        UseDatabase::update('cashback','visit= visit + 1',json_decode($_POST['text'])[1]);

            echo json_encode('add-histo-success');   

}else if(htmlspecialchars($_GET['p']) == 'deleteCashbackHistory'){

    UseDatabase::deleteAll('histo_cashback',"
            id_user = '".json_decode($_POST['text'])[0]."' AND 
            id_cashback = '".json_decode($_POST['text'])[1]."'
       ");

        UseDatabase::update('cashback','visit= visit - 1',json_decode($_POST['text'])[1]);

            echo json_encode('delete-histo-success');   

}else if(htmlspecialchars($_GET['p']) == 'getMyCashback'){

    echo json_encode(UseDatabase::query('histo_cashback','id_user="'.json_decode($_POST['text']).'" ORDER BY id DESC'));

}else if(htmlspecialchars($_GET['p']) == 'gethistocashback'){

    if(json_decode($_POST['text']) == 0){
        $ViewCoupons = UseDatabase::query('histo_cashback','etat=0');
    }else{
        $ViewCoupons = UseDatabase::query('histo_cashback','id_categorie_cashback='.json_decode($_POST['text']).' AND etat=0');
    }

    echo json_encode( $ViewCoupons);  

}else if(htmlspecialchars($_GET['p']) == 'CashbackcomfirmeAdmin'){

    $tar = explode(',',$_POST['text']); 

        for($i=0;$i < count($tar);$i++){
            UseDatabase::update('histo_cashback','etat = 1',$tar[$i]);
            UseDatabase::insert('notification_users(
                iduser,
                message,
                type,
                etat,
                data_c
              )',"
              VALUE(
                    '". UseDatabase::prepare('histo_cashback','id="'.$tar[$i].'"')[0]->id_user."',
                    '".htmlspecialchars("votre cashnack dans la boutique ".UseDatabase::prepare('cashback','id="'.UseDatabase::prepare('histo_cashback','id="'.$tar[$i].'"')[0]->id_cashback.'"')[0]->nom." ")." à bien été comfirmé',
                    'cashback',
                    '1',
                    NOW()
               )");
        }

            echo json_encode('validation-success');  

}else if(htmlspecialchars($_GET['p']) == 'CashbackRefuAdmin'){

    $tar = explode(',',$_POST['text']); 

        for($i=0;$i < count($tar);$i++){
            UseDatabase::update('histo_cashback','etat = 2',$tar[$i]);
            UseDatabase::insert('notification_users(
                iduser,
                message,
                type,
                etat,
                data_c
              )',"
              VALUE(
                    '". UseDatabase::prepare('histo_cashback','id="'.$tar[$i].'"')[0]->id_user."',
                    '".htmlspecialchars("votre cashnack dans la boutique ".UseDatabase::prepare('cashback','id="'.UseDatabase::prepare('histo_cashback','id="'.$tar[$i].'"')[0]->id_cashback.'"')[0]->nom." ")." à bien été refusé',
                    'cashback',
                    '0',
                    NOW()
               )");
        }

        echo json_encode('validation-refu-success');  

}else if(htmlspecialchars($_GET['p']) == 'mofifie_usera'){

    UseDatabase::update('users',"
        email  ='".json_decode($_POST['text'])[0]."',
        nom ='".json_decode($_POST['text'])[1]."',
        prenom  ='".json_decode($_POST['text'])[2]."',
        adresse  ='".json_decode($_POST['text'])[3]."',
        ville  ='".json_decode($_POST['text'])[4]."',
        codePostal  ='".json_decode($_POST['text'])[5]."',
        pays  ='".json_decode($_POST['text'])[6]."',
        telephone  ='".json_decode($_POST['text'])[7]."'
    ", json_decode($_POST['text'])[8]); 

        echo json_encode('update-success-users');  

} else if(htmlspecialchars($_GET['p']) == 'mofifie_mdp'){

    UseDatabase::update('users','
       mdp = "'.md5(sha1(json_decode($_POST['text'])[0])).'"
    ', json_decode($_POST['text'])[1]); 

        echo json_encode('modification-mdp-success');  

}else if(htmlspecialchars($_GET['p']) == 'ViewCashbackComfirme'){

    if(json_decode($_POST['text']) == 0){
        $ViewCoupons = UseDatabase::query('cashback','actif=1');
    }else{
        $ViewCoupons = UseDatabase::query('cashback','categorie='.json_decode($_POST['text'].' AND actif=1'));
    }

    echo json_encode( $ViewCoupons);  

}else if(htmlspecialchars($_GET['p']) == 'ViewCashbackSousCategorieComfirme'){

    $id= UseDatabase::prepare('sous_categorie','nom_sous_categorie="'.json_decode($_POST['text']).'"')[0]->id;
    echo json_encode(UseDatabase::query('cashback','sous_categorie="'.$id.'" AND actif=1'));  

}else if(htmlspecialchars($_GET['p']) == 'findCachbackName'){

    echo json_encode(UseDatabase::query('cashback',"nom LIKE '%".json_decode($_POST["text"])."%' AND actif=1"));  

}else if(htmlspecialchars($_GET['p']) == 'addAvis'){

    UseDatabase::insert('avis_utilisateur(
            id_user,
            name_users,
            nbr_start,
            text_Avis,
            date
    )',"
    VALUE(
        '".json_decode($_POST['text'])[0]."',
        '".json_decode($_POST['text'])[1]."',
        '".addslashes(json_decode($_POST['text'])[2])."',
        '".addslashes(json_decode($_POST['text'])[3])."',
        NOW()
    )");

        echo json_encode('add-histo-success');   

}else if(htmlspecialchars($_GET['p']) == 'findUserName'){

    echo json_encode(UseDatabase::query('users',"nom LIKE '%".json_decode($_POST["text"])."%'"));  

}else if(htmlspecialchars($_GET['p']) == 'findUser'){

    echo json_encode(UseDatabase::query('users'));  

}else if(htmlspecialchars($_GET['p']) == 'getUserId'){
    
    echo json_encode(UseDatabase::prepare('users','id='.json_decode($_POST['text'].''))[0]);  

}else if(htmlspecialchars($_GET['p']) == 'UpdateArgent'){

    UseDatabase::update('users',"
    argent  ='".json_decode($_POST['text'])[0]."'
    ", json_decode($_POST['text'])[1]); 

        echo json_encode('update-money-users');  

}else if(htmlspecialchars($_GET['p']) == 'getAvis'){
    
    echo json_encode(UseDatabase::query('avis_utilisateur','etat= 0'));  

}else if(htmlspecialchars($_GET['p']) == 'SuccessAvis'){

    $tar = explode(',',$_POST['text']); 

        for($i=0;$i < count($tar);$i++){

            UseDatabase::insert('notification_users(
                iduser,
                message,
                type,
                etat,
                data_c
              )',"
              VALUE(
                    '".UseDatabase::prepare('avis_utilisateur','id="'.$tar[$i].'"')[0]->id_user."',
                    '".addslashes(htmlspecialchars("Votre avis a ete valide par l'administrateur desormais il apparitra dans la page d'acceuille"))."',
                    'Commentaire',
                    '1',
                    NOW()
               )");
               
            UseDatabase::update('avis_utilisateur','etat=1',$tar[$i]);

        }

            echo json_encode('validation-success');  

}else if(htmlspecialchars($_GET['p']) == 'NoComfirm'){

    $tar = explode(',',$_POST['text']); 

        for($i=0;$i < count($tar);$i++){

            UseDatabase::delete('avis_utilisateur',$tar[$i]);

        }

            echo json_encode('validation-success');  

}else if(htmlspecialchars($_GET['p']) == 'getTemoignage'){
    
    echo json_encode(UseDatabase::query('avis_utilisateur','etat= 1  ORDER BY rand() LIMIT 6'));  

}else if(htmlspecialchars($_GET['p']) == 'GetRecent'){

    echo json_encode(UseDatabase::query('cashback','add_home = 1 ORDER BY rand() LIMIT 5'));

}else if(htmlspecialchars($_GET['p']) == 'GetPopulaire'){

    echo json_encode(UseDatabase::query('cashback','add_home = 1 ORDER BY visit DESC LIMIT 5'));

}else if(htmlspecialchars($_GET['p']) == 'GETCouponsHome'){

    echo json_encode(UseDatabase::query('coupons','add_home = 1 ORDER BY visits DESC LIMIT 10'));

}

?>