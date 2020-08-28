<?php


require '../__autolaod.php';
use classes\UseDatabase;

	if (!empty($_GET['campaign_name']) AND !empty($_GET['sid']) AND !empty($_GET['status']) AND !empty($_GET['ip']) AND !empty($_GET['vc_value']))
	{
		$campaign_name = $_GET['campaign_name'];
		$subid = $_GET['sid'];
		$status = $_GET['status'];
		$ip = $_GET['ip'];
		$vc_value = $_GET['vc_value'];
	
		if ($status == 1)
		{
			$tab = explode("-", $subid); 
			$uid = $tab[0];

			$montantRev = (0.30 * $vc_value) / 1000;

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
				'adworkmedia', 
				'".$campaign_name."', 
				'".$montantRev."',
				'".date('d/m/Y à H:i:s')."',
				'0',
				'".$ip."')"
			);
 
			echo 1;

		}
	}
?>