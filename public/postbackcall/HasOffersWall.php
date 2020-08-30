<?php


require '../phpFacilideal/__autolaod.php';

use classes\UseDatabase;

    $secret_password = 'timothee12300';
    $password = $_REQUEST['pwd'];
    $payout = $_REQUEST['c'];
    $user = trim($_REQUEST['u']);
    $type = 1;
    $status = trim($_REQUEST['s']);
    $cname = $_REQUEST['cname'];

    if($password == $secret_password)
    {
	    if ($status == '1')
	    {
	        $tab = explode("-", $user); 
			$uid = $tab[0];

			$user = $pdo->query("SELECT hashId FROM users WHERE hashId = '".$uid."'");
			$dones_user = $user->fetch(PDO::FETCH_ASSOC);
			$idMembre = $dones_user['hashId'];
			
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
					'hasofferswall', 
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
		die('Failed');
	}
?>