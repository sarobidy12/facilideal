<?php


require '../__autolaod.php';
use classes\UseDatabase;

	if (!empty($_GET['o_name']) AND !empty($_GET['amount']) AND !empty($_GET['oid']) AND !empty($_GET['user_id']) AND !empty($_GET['sig']))
	{
		$cle_secrete = '6bac1d34a6bf636298ebddcf576e4b0c';
		$oid = $_GET['oid'];
		$offer = $_GET['o_name'];
		$coins = $_GET['amount'];
		$subid = $_GET['user_id'];
		$ip = $_GET['ip'];
		$sig = $_GET['sig'];

		$hash = ''.$oid.'-'.$subid.'-'.$cle_secrete.'';

		if ($sig == md5($hash))
		{
			$tab = explode("-", $subid); 
			$uid = $tab[0];

			$montantRev = (0.30 * $coins) / 1000;
			
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
				'OfferToro', 
				'".$offer."', 
				'".$montantRev."',
				'".date('d/m/Y à H:i:s')."',
				'0',
				'". $ip."')"
			);

			echo 1;
		}
	}
?>