function loadBooks() {
    var xhr = new XMLHttpRequest();
    var url = "../dataFiles/products.xml";
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            renderBooks(this);
        }
    };
    xhr.open('GET', url, true);
    xhr.send();
}

function renderBooks(xml) {
    var xmlDocument = xml.responseXML;
    var x = xmlDocument.getElementsByTagName("book");
    for (var i = 0; i < x.length; i++) {
        var id = x[i].getElementsByTagName("id")[0].childNodes[0].nodeValue;
        var price = x[i].getElementsByTagName("price")[0].childNodes[0].nodeValue;
        var description = x[i].getElementsByTagName("description")[0].childNodes[0].nodeValue;
        var title = x[i].getElementsByTagName("title")[0].childNodes[0].nodeValue;
        var image = x[i].getElementsByTagName("image")[0].childNodes[0].nodeValue;

        var article = document.createElement("article");
        article.setAttribute("class", "articleShadowCard product");

        var figure = document.createElement("figure");

        var a = document.createElement("a");
        a.setAttribute("href", "./comments.html");
        var img = document.createElement("img");
        img.setAttribute("src", `${image}`);

        a.appendChild(img);
        figure.appendChild(a);

        var h4Title = document.createElement("h4");
        h4Title.textContent = `${title} | ${price}`;

        var p = document.createElement("p");
        p.textContent = `${description}`;

        var addToCartBtn = document.createElement("a");
        addToCartBtn.onclick = addItemToCart;
        addToCartBtn.setAttribute("class", "goldBtn addToCartBtn");
        addToCartBtn.textContent = "Buy Book";
        addToCartBtn.setAttribute("productId", id);

        article.appendChild(figure);
        article.appendChild(h4Title);
        article.appendChild(p);
        article.appendChild(addToCartBtn);
        document.getElementById("booksListDiv").appendChild(article);
    }
}
function renderCartItems() {
    var products = JSON.parse(localStorage.getItem('cart'))["products"];
    var xhr = new XMLHttpRequest();
    var url = "../dataFiles/products.xml";
    var total = 0;
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var xmlDocument = this.responseXML;
            var x = xmlDocument.getElementsByTagName("book");
            for (var i = 0; i < x.length; i++) {
                var id = x[i].getElementsByTagName("id")[0].childNodes[0].nodeValue;
                if (products.includes(id)) {
                    var price = parseInt(x[i].getElementsByTagName("price")[0].childNodes[0].nodeValue);
                    var title = x[i].getElementsByTagName("title")[0].childNodes[0].nodeValue;
                    var image = x[i].getElementsByTagName("image")[0].childNodes[0].nodeValue;

                    total += price;

                    var tr = document.createElement("tr");
                    tr.setAttribute("id", `product${id}`);

                    var tdImg = document.createElement("td");
                    var figure = document.createElement("figure");

                    var img = document.createElement("img");
                    img.setAttribute("src", `${image}`);
                    figure.appendChild(img);

                    var figcaption = document.createElement("figcaption");
                    figcaption.textContent = title;
                    figure.appendChild(figcaption);
                    tdImg.appendChild(figure);

                    var tdQte = document.createElement("td");
                    var input = document.createElement("input");
                    input.onchange = calculatePriceForItem;
                    input.setAttribute("type", "number");
                    input.setAttribute("id", `quantity${id}`);
                    input.setAttribute("productId", `${id}`);
                    input.setAttribute("name", "quantity");
                    input.setAttribute("default", "1");
                    input.setAttribute("min", "1");
                    input.setAttribute("max", "100");
                    tdQte.appendChild(input);

                    var tdPrice = document.createElement("td");
                    tdPrice.textContent = `$${price}.00`;

                    var tdTotalItemPrice = document.createElement("td");
                    var p = document.createElement("p");
                    p.setAttribute("class", "itemTotal");
                    p.setAttribute("id", `totalItemPrice${id}`);
                    p.textContent = `$${price}.00`;
                    tdTotalItemPrice.appendChild(p);

                    tr.appendChild(tdImg);
                    tr.appendChild(tdQte);
                    tr.appendChild(tdPrice);
                    tr.appendChild(tdTotalItemPrice);

                    document.getElementById("cartTableId").appendChild(tr);
                }
            }
            var tdCartTotal = document.createElement("td");
            tdCartTotal.innerHTML = `<p id="cartTotalP"> The total is: $${total}.00</p>`;

            var tr = document.createElement("tr");
            tr.setAttribute("id", `cartTotalTr`)
            tr.appendChild(tdCartTotal);

            document.getElementById("cartTableId").appendChild(tr);
            calculateCartTotal();
        }
    };
    xhr.open('GET', url, true);
    xhr.send();
}

function addItemToCart(e) {
    var productId = e.target.getAttribute("productId");
    // if local storage is empty
    if (localStorage.getItem("cart") === null) {
        localStorage.setItem('cart', JSON.stringify({ 'products': [productId] }));
        // users can only add more quantity from the shopping cart page
    } else if (!JSON.parse(localStorage.getItem("cart"))["products"].includes(productId)) {
        var cart = JSON.parse(localStorage.getItem("cart"));
        cart["products"].push(productId);
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}

function calculatePriceForItem(e) {
    var productId = e.target.getAttribute("productId");
    var xhr = new XMLHttpRequest();
    var url = "../dataFiles/products.xml";
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var xmlDocument = this.responseXML;
            var x = xmlDocument.getElementsByTagName("book");
            for (var i = 0; i < x.length; i++) {
                var id = x[i].getElementsByTagName("id")[0].childNodes[0].nodeValue;
                if (productId == id) {
                    var price = parseInt(x[i].getElementsByTagName("price")[0].childNodes[0].nodeValue);
                    var qte = document.getElementById(`quantity${productId}`).value;
                    var totalItemPrice = document.getElementById(`totalItemPrice${id}`);
                    totalItemPrice.textContent = `$${price * qte}.00`;
                }
            }
            calculateCartTotal();
        }
    };
    xhr.open('GET', url, true);
    xhr.send();
}

function calculateCartTotal() {
    var prices = document.getElementsByClassName("itemTotal");
    var total = 0;
    for (var i = 0; i < prices.length; i++) {
        total += parseInt(prices[i].textContent.substring(1));
    }
    document.getElementById("cartTotalP").textContent = `The total is: $${total}.00`;
}

function checkout() {
    if (localStorage.getItem("cart") !== null) {
        localStorage.clear();
        window.location.href = "../html/home.html";
    } else {
        alert("Your cart is empty. Please add items to it before you checkout.");
        window.location.href = "../html/products.html";
    }
}