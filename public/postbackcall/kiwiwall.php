<?php

require '../phpFacilideal/__autolaod.php';

use classes\UseDatabase;

	// Your secret key can be found in your apps section by clicking on the "Secret Key" button
	$secret_key = '4D3a5DkMqkM4wAKCQ5U7LzAgnW39YB6N';

	// Get parameters
	$status = $_REQUEST['status'];
	$trans_id = $_REQUEST['trans_id'];
	$sub_id = $_REQUEST['sub_id'];
	$sub_id_2 = $_REQUEST['sub_id_2'];
	$gross = $_REQUEST['gross'];
	$coins = $_REQUEST['amount'];
	$offer_id = $_REQUEST['offer_id'];
	$offer_name = addslashes($_REQUEST['offer_name']);
	$app_id = $_REQUEST['app_id'];
	$ip_address = $_REQUEST['ip_address'];
	$signature = $_REQUEST['signature'];

	// Create validation signature
	$validation_signature = md5($sub_id . ':' . $coins . ':' . $secret_key);

	if ($signature != $validation_signature)
	{
	    // Signatures not equal - send error code
		echo 0;
		die();
	}
	
	// Validation was successful. Credit user process.
	echo 1;

		if ($status == 1)
		{
			$tab = explode("-", $sub_id); 
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
				'KiwiWall', 
				'".$offer_name."', 
				'".$montantRev."',
				'".date('d/m/Y à H:i:s')."',
				'0',
				'".$ip_address."')"
			);

		}else if($status == 2){
			echo '';
		}

		die();
?>
            