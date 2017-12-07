<?php
	//createaccount.php
	$_GET = array();
	foreach($argv as $key => $pair) {
		if ($key == 0) {
			continue;
		}
		list($key, $value) = explode("=", $pair);
		$_GET[$key] = $value;
	}
	$return = "false";
	$server = "webserverdatabase.clhpvrxrhwvh.us-east-2.rds.amazonaws.com";
	$username = "Admin252";
	$password = "252Database";
	$database = "WebServer";
	
	$user = $_GET["username"];
	$pass = $_GET["password"];
	$conn = new mysqli($server, $username, $password, $database);
		
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}

	$sql = "SELECT name, password FROM users";
	$result = $conn->query($sql);

	if ($result->num_rows == 0) {
		$return = "true";
		$sql = "INSERT INTO users (name, password) VALUES('" . $user . "','" . $pass . "')";
		$conn->query($sql);
	}
	echo $return;
	$conn->close();
?>
