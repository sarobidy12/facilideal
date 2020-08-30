<?php


require '../phpFacilideal/__autolaod.php';

use classes\UseDatabase;
	// Votre clé secrète
	$cle_secrete = 'umm5VGuSAs';
	
	// Paramètres envoyées
	$subid = $_REQUEST['subid']; // 0
	$name = $_REQUEST['name'];
	$ipuser = $_REQUEST['ip'];
	$amount = $_REQUEST['amount'];
	$hash = $_REQUEST['hash'];
	
	// On vérifie si la clé secrète est correcte
	if ($hash != md5($cle_secrete)) {
		echo 0; // Clé incorrecte !
		exit();
	}
	
	$tab = explode("-", $subid); 
	$uid = $tab[0];

	$montantRev = (0.30 * $amount) / 1000;

	UseDatabase::insert('historique_action(
		idUser,
		offerwall,
		idOffre,
		remuneration,
		dateUsTime,
		ip
	)',"
	VALUES( 
		'".$uid."',
		'Offerwolf', 
		'".$name."', 
		'".$montantRev."',
		'".date('d/m/Y à H:i:s')."',
		'0',
		'". $ipuser."')"
	);

	echo 1;

	die();
?>