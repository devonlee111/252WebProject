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

	if ($result->num_rows > 0) {
		while($row = $result->fetch_assoc()) {
			if (strtolower($user) == strtolower($row["name"])) {
				echo "false";
				$conn->close();
				exit();
			}
		}
	}
	$sqlinsert = "INSERT INTO users (name, password) VALUES('" . $user . "','" .  $pass . "')";
	$result = $conn->query($sqlinsert);
	if ($result = true) {
		echo "true";
	}
	else {
		echo "false";
	}
	$conn->close();
?>
