<?php


	require '../__autolaod.php';
	use classes\UseDatabase;

	$user_password = 'SA3V5730aA1GVy0KliGYTubT18pvWX2';
	$sent_pw = $_GET['pwd'];
	$credited = intval($_GET['c']);
	$subid = trim($_GET['usr']);
	$rate = trim($_GET['r']);
	$type  = intval($_GET['t']);
	$transaction = trim($_GET['none']);

		if ($credited == '1')
		{
			$tab = explode("-", $subid); 
			$uid = $tab[0];

			$montantRev = $rate;
				
			if ($type == '1')
			{

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
					'PTCWall', 
					'".$transaction."', 
					'".$montantRev."',
					'".date('d/m/Y à H:i:s')."',
					'0',
					'".$_SERVER['REMOTE_ADDR']."')"
				);
	
			}
	else	if ($type == '2') 
			{	
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
					'PTCWall', 
					'".$transaction."', 
					'".$montantRev."',
					'".date('d/m/Y à H:i:s')."',
					'0',
					'".$_SERVER['REMOTE_ADDR']."')"
				);
			}
		}
else	if ($credited == '2')
		{
			if($type == '1')
			{
				echo '';
			}
	else	if ($type == '2')
			{
				echo '';
			}
		}
?>