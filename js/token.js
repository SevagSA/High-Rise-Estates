window.addEventListener("load", function () {
    var xhr = new XMLHttpRequest();
    var url = '../php/validateToken.php';
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            if (getToken() != data["token"]) {
                window.location.href = "../html/index.html";
            }
        }
    };
    xhr.open('GET', url, true);
    xhr.send();
});

function getToken() {
    if (document.cookie.length != 0) {
        var cookiesArray = document.cookie.split("; ");
        for (var i = 0; i < cookiesArray.length; i++) {
            var nameValueArray = cookiesArray[i].split("=");
            if (nameValueArray[0] == "token") {
                return nameValueArray[1];
            }
        }
    } else {
        return "";
    }
}