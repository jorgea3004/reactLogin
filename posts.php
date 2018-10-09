<?php
$user = $_POST['user'];
$pass = $_POST['pass'];
if(isset($user) && strlen($user)>0 && isset($pass) && strlen($pass)>0 ){
	$return = 'Usuario aceptado';
	$status = true;
} else {
	$return = 'Usuario NO aceptado';
	$status = false;
}
$json['status'] = json_encode($status);
$json['msg'] = json_encode($return);
echo json_encode($json);
?>