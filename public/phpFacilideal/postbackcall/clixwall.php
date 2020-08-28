<?php 


	require '../__autolaod.php';
	use classes\UseDatabase;
	
	$secret_password = 'Timo12300@';
	$password = $_REQUEST['pwd'];
	$payout = $_REQUEST['c'];
	$user = trim($_REQUEST['u']);
	$type = trim($_REQUEST['t']);
	$status = trim($_REQUEST['s']);
	$cname = $_REQUEST['cname'];

	if($password == $secret_password)
	{
		if ($status == '1')
		{
			$tab = explode("-", $user); 
			$uid = $tab[0];
			
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
					'Clixwall', 
					'".$cname."', 
					'".$payout."',
					'".date('d/m/Y à H:i:s')."',
					'0',
					'". $_SERVER['REMOTE_ADDR']."')"
				);
				 
			}
			else
			{	
				echo '';
			}
			exit('Gains crédités !');
		}
		else
		{
			if($type == '1')
			{
				echo '';
			}
			else
			{
				echo '';
			}
			exit('Done');
		}			
	}
	else
	{
		die();
	}
?>