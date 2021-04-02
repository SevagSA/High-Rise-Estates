function loadComments() {
    var xhr = new XMLHttpRequest();
    var url = "../php/comments.php";
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var comments = JSON.parse(this.responseText)[0]["data"];
            renderComments(comments);
        }
    };
    xhr.open('GET', url, true);
    xhr.send();
}

function renderComments(comments) {
    for (var i = 0; i < comments.length; i++) {
        var comment = comments[i];
        var title = comment["title"];
        var date = comment["date"];
        var post = comment["post"];
        var user = comment["user"];

        // building html
        var article = document.createElement("article");
        article.setAttribute("class", "testimonialsCard");

        var infoDiv = document.createElement("div");
        infoDiv.setAttribute("class", "testimonialInfoDiv");

        var h2 = document.createElement("h2");
        h2.setAttribute("class", "testimonialTitle");
        h2.textContent = title;
        infoDiv.appendChild(h2);

        var dateP = document.createElement("p");
        dateP.setAttribute("class", "testimonialDate");
        dateP.textContent = date;
        infoDiv.appendChild(dateP);

        var postP = document.createElement("p");
        postP.setAttribute("class", "testimonialPost");
        postP.textContent = post;
        infoDiv.appendChild(postP);

        var figure = document.createElement("figure");

        var img = document.createElement("img");
        img.setAttribute("class", "testimonialsCardImg");
        img.setAttribute("src", "../assets/avatar.svg");
        figure.appendChild(img);

        var figcaption = document.createElement("figcaption");
        figcaption.setAttribute("class", "testimonialUser");
        figcaption.textContent = user;
        figure.appendChild(figcaption);

        article.appendChild(infoDiv);
        article.appendChild(figure);
        document.getElementById("testimonialListDiv").appendChild(article);
    }
}