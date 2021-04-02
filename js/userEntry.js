function login() {
    var xhr = new XMLHttpRequest();
    var url = '../php/login.php';
    var username = document.getElementById('usernameLogin').value;
    var password = document.getElementById('passwordLogin').value;
    var params = `user=${username}&password=${password}`;
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            var status = data["val"];
            if (status === 1) {
                document.cookie = "token=" + data["token"];
                window.location.href = "../html/home.html";
            } else if (status === 0) {
                alert("A user with the provided credentials was not found.");
            } else if (status === -1) {
                alert("Invalid request.");
            }
        }
    };
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send(params);
}

function register() {
    var email = document.getElementById('emailRegister').value
    var password = document.getElementById("passwordRegister").value;
    var passwordVerification = document.getElementById("validatePassword").value;
    var firstName = document.getElementById("firstNameRegister").value;
    var lastName = document.getElementById("lastNameRegister").value;
    if (/^[a-zA-Z0-9][a-zA-Z0-9\_\.\-]{0,15}@[a-zA-Z][a-zA-Z0-9\.]{0,22}\.(com|ca|qc\.ca)$/.test(email)) {
        if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/.test(password)) {
            if (passwordVerification === password) {
                var xhr = new XMLHttpRequest();
                var url = "../php/register.php";
                var params = `first+name=${firstName}&last+name=${lastName}&email=${email}&password=${password}`;
                xhr.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        alert(this.responseText);
                    }
                };
                xhr.open('POST', url, true);
                xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                xhr.send(params);
                window.location.href = "../html/index.html";
            } else {
                alert("Your passwords do not match.");
            }
        } else {
            alert("Password must be minimum 8 characters using at least 1 uppercase letter, 1 lowercase letter, " +
                "1 number and 1 special character from the following special characters: '@$!%*?&#'.");
        }
    } else {
        alert("Your email must have a username of 1-15 chars starting with an alphanumeric char & containing only " +
            "alphanumeric chars and '_', '.' and '-'. The username must be followed by the '@' char. The domain " +
            "must start with an alphanumeric character and contain 1-22 alphanumberic chars and '.'. The extension " +
            "of the email must be on of the following: .com, .ca or .qc.ca");
    }
}