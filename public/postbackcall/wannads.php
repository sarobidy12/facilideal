<?php

require '../phpFacilideal/__autolaod.php';

use classes\UseDatabase;
	$secret = "a04d5a9091"; // check your app info at www.wannads.com
	$sub_id = isset($_GET['subId']) ? $_GET['subId'] : null;
	$transactionId = isset($_GET['transId']) ? $_GET['transId'] : null;
	$campaign_name = isset($_GET['campaign_name']) ? $_GET['campaign_name'] : null;
	$campaign_name = addslashes($campaign_name);
	$coins = isset($_GET['reward']) ? $_GET['reward'] : null;
	$signature = isset($_GET['signature']) ? $_GET['signature'] : null;
	$status = isset($_GET['status']) ? $_GET['status'] : null;
	$ipuser = isset($_GET['userIp']) ? $_GET['userIp'] : "0.0.0.0";
	// validate signature
	if (md5($sub_id.$transactionId.$coins.$secret) != $signature)
	{
	    echo "ERROR: Signature doesn't match";
	    return;
	}
	else
	{
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
				'Wannads', 
				'".$campaign_name."', 
				'".$montantRev."',
				'".date('d/m/Y à H:i:s')."',
				'".$ipuser."')"
			); 
 
			echo "1";
			
		}
else	if ($status == 2)
		{
			echo '';
		}

		die();
	}
?>