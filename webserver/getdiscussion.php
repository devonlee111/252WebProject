<?php
	//signin.php
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
	
	$user = $_GET["topic"];
	$conn = new mysqli($server, $username, $password, $database);
		
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}

	$sql = "SELECT name, password FROM users";
	$result = $conn->query($sql);

	if ($result->num_rows > 0) {
		while($row = $result->fetch_assoc()) {
			if ($user == $row["name"] && $pass == $row["password"]) {
				$return = "true";
			}
		}
	}
	echo $return;
	$conn->close();
?>
