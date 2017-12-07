var username;
var password;

function body_onload() {
	sessionStorageSet("CurrentUser",  null);
	signInBtn.onclick = signInBtn_onclick;
	createAccountBtn.onclick = createAccountBtn_onclick;

	usernameInput.value = localStorageGet("Username", "");

	if (localStorageGet("Remember", false) === "false") {
		rememberChkBox.checked = false;
	}
	else {
		rememberChkBox.checked = localStorageGet("Remember", false);
	}

	if (usernameInput.value == "") {
		usernameInput.focus();
	}
	else {
		passwordInput.focus();
	}
}

function signInBtn_onclick() {
	if (usernameInput.value.length <= 0) {
		alert("Username is required.");
		usernameInput.focus();
	}
	else if (passwordInput.value.length <= 0) {
		alert("Password is requred.");
	}
	else {
		username = usernameInput.value;
		password = passwordInput.value;
		localStorageSet("Remember", rememberChkBox.checked);
		if (rememberChkBox.checked === true) {
			localStorageSet("Username", usernameInput.value);
		}
		else {
			localStorageSet("Username", "");
		}
		sessionStorageSet("CurrentUser", usernameInput.value);
		sessionStorageSet("Password", passwordInput.value);
		attemptLogin();
	}
}

function createAccountBtn_onclick() {
	location.href = "CreateAccount.html";
}

function attemptLogin() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			console.log(this.responseText);
			var response = this.responseText;
			checkResponse(response);
		}
	};
	xmlhttp.open("GET", "SignIn.php?username=" + username + "&password=" + password, true);
	xmlhttp.send();
}

function checkResponse(response) {
	if (response === "true") {
		sessionStorageSet("LoggedIn", true);
		location.href = "MainPage.html";
	}
	if (response === "false") {
		alert("Incorrect username or password.");
	}
}
