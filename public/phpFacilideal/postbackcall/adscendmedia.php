<?php

require '../__autolaod.php';
use classes\UseDatabase;

	if (!empty($_GET['name']) AND !empty($_GET['rate']) AND !empty($_GET['sub1']) AND !empty($_GET['status']) AND !empty($_GET['ip']))
	{
		$offer = $_GET['name'];
		$coins = $_GET['rate'];
		$subid = $_GET['sub1'];
		$status = $_GET['status'];
		$ip = $_GET['ip'];
	
		if ($status == 1)
		{
			$tab = explode("-", $subid); 
			$uid = $tab[0];

			 $montantRev = (0.30 * $coins);

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
									'AdscendMedia', 
									'".$offer."', 
									'".$montantRev."',
									'".date('d/m/Y à H:i:s')."',
									'0',
									'".$ip."')"
			);
			
			echo 1;
			
		}
	}
?>

