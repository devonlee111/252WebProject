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
	postReplyBtn.onclick = function() {
		var xmlhttp = new XMLHttpRequest();
		xml,onreadystatechange = function() {
			if (this.readyState === 4 && this.status === 200) {
				var response = this.responseText;
				retrieveResponses();
			}
		}
	};
	var replyMessage = replyInput.value;
	xmlhttp.open("GET", "postreply.php?topic=" + topic + "&message=" + replyMessage + "&user=" + currentUser, true);
	xmlhttl.send();	
}

function retrieveResponses() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readState === 4 && this.status === 200) {
			var response = this.responseText;
			document.getElementById("discussionThreadData").innerHTML = '' + response + '';
		}
	};
	xmlhttp.open("GET", "getdiscussion.php?topic=" + topic, true);
}
