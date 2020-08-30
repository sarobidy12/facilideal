<?php


require '../phpFacilideal/__autolaod.php';

use classes\UseDatabase;

	$key = '709f763365607348e32fe195c4291572';

	$id = $_GET['id']; // ID of this transaction.
	$uid = $_GET['uid']; // ID of the user which performed this transaction. 
	$oid = $_GET['oid']; // ID of the offer or direct payment method.
	$coins = $_GET['new']; // Number of in-game currency your user has earned by completing this offer.
	$total = $_GET['total']; // Total number of in-game currency your user has earned on this App.
	$sig = $_GET['sig']; // Security hash used to verify the authenticity of the postback.
	$ipuser = '';
	
	if(!(is_numeric($id) && is_numeric($oid) && is_numeric($coins) && is_numeric($total)))
	exit('0'); // Fail.

	$result = 1;

	$sig_compare = md5($id . ':' . $coins . ':' . $uid . ':' . $key);

	// Only accept if the Security Hash matches what we have.
	if($sig == $sig_compare)
	{
			$tab = explode("-", $uid); 
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
				'Superrewards', 
				'".$oid."', 
				'".$montantRev."',
				'".date('d/m/Y à H:i:s')."',
				'0',
				'".$ipuser."')"
			); 
			echo "1";
	}
	else
	{
		$result = 0; // Security hash incorrect. Fail.
	}

	echo $result;
?>