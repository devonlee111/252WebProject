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
	$return = "";
	$server = "webserverdatabase.clhpvrxrhwvh.us-east-2.rds.amazonaws.com";
	$username = "Admin252";
	$password = "252Database";
	$database = "WebServer";
	
	$topic = $_GET["topic"];
	mysql_connect($server, $username, $password);
	mysql_select_db($database);

	$sql = "(SELECT message, user FROM discussions WHERE topic='" . $topic . "') ORDER BY date DESC";
	$result = mysql_query($sql);
	$loops = 0;
	$return = "";
	while($row = mysql_fetch_assoc($result)) {
		//if ($loops == 5) {
		//	break;
		//}
		
		$return .= "<p1><strong>" . $row['user'] . "</strong><br>" . $row['message'] . "</p1><br><br>";
		$loops++;
	}
	echo $return;
	mysql_free_result($result);
?>
