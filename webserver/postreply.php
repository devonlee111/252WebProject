<?php
	//postreply.php
	$_GET = array();
	foreach($argv as $key => $pair) {
		if ($key == 0) {
			continue;
		}
		list($key, $value) = explode("=", $pair);
		$_GET[$key] = $value;
	}
	$server = "webserverdatabase.clhpvrxrhwvh.us-east-2.rds.amazonaws.com";
	$username = "Admin252";
	$password = "252Database";
	$database = "WebServer";
	
	$topic = $_GET["topic"];
	$message = $_GET["message"];
	$fixedMessage = str_replace('%20', ' ', $message);
	$user = $_GET["user"];
	$conn = new mysqli($server, $username, $password, $database);

	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}

	$sqlinsert = "INSERT INTO discussions (topic, message, date, user) VALUES('" . $topic . "','" .  $fixedMessage . "',CURDATE(),'" . $user . "')";
	$result = $conn->query($sqlinsert);
	if ($result = true) {
		echo "true";
	}
	else {
		echo "false";
	}
	$conn->close();
?>
