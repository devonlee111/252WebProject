var currentUser;
var topic;

function body_onload() {
	var page = location.pathname;
	if (page.indexOf("M416.html" !== -1)) {
		topic = "M416"
	}
	else {
		topic = "M416";
	}
	currentUser = sessionStorageGet("CurrentUser", null);
	postReplyBtn.onclick = postReplyBtn_onclick;
	retrieveResponses();
}

function postReplyBtn_onclick() {
	if (sessionStorageGet("LoggedIn", false) === "false") {
		alert("You Must Be Logged In To Post Replies.");
	}
	else {
		var xmlhttp = new XMLHttpRequest();
		postReplyBtn.onclick = function() {
			xmlhttp.onreadystatechange = function() {
				if (this.readyState === 4 && this.status === 200) {
					var response = this.responseText;
					location.reload();
				}
			}
		};
		var replyMessage = replyTextarea.value;
		xmlhttp.open("GET", "postreply.php?topic=" + topic + "&message=" + replyMessage + "&user=" + currentUser, true);
		xmlhttp.send();
	}
}

function retrieveResponses() {
	console.log("retrieving responses");
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState === 4 && this.status === 200) {
			document.getElementById("replylist").innerHTML = '' + this.responseText + '';
		}
	};
	xmlhttp.open("GET", "getdiscussion.php?topic=" + topic, true);
	xmlhttp.send();
}
