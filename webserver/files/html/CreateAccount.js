var username;
var password;
var confirmPassword;
var userType;

function body_onload() {
	registerBtn.onclick = registerBtn_onclick;
	signInBtn.onclick = signInBtn_onclick;
	mainPageBtn.onclick = mainPageBtn_onclick;
}

function registerBtn_onclick() {
	if (usernameInput.value.length <= 0) {
		alert("Username is required.");
		usernameInput.focus();
	}
	else if (passwordInput.value.length <= 0) {
		alert("Password is required.");
		passwordInput.focus();
	}
	else if (confirmPasswordInput.value.length <= 0) {
		alert("Please confirm your password");
		confirmPasswordInput.focus();
	}
	else {
		username = usernameInput.value;
		password = passwordInput.value;
		confirmPassword = confirmPasswordInput.value;
		if (password !== confirmPassword) {
			alert("Your Passwords Do Not Match.");
		}
		else {
			attemptCreateAccount();
		}
	}
}

function signInBtn_onclick() {
	location.href = "SignIn.html";
}

function mainPageBtn_onclick() {
	location.href = "MainPage.html";
}

function attemptCreateAccount() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			console.log(this.responseText);
			var response = this.responseText;
			checkResponse(response);
		}
	};
	xmlhttp.open("GET", "createaccount.php?username=" + username + "&password=" + password, true);
	xmlhttp.send();
}

function checkResponse(response) {
	if (response === "true") {
		alert("Account successfully created.");
		sessionStorageSet("CurrentUser", username);
		sessionStorageSet("LoggedIn", true);
		location.href = "Mainpage.html";
	}
	if (response === "false") {
		alert("Username has already been taken.");
	}
}
