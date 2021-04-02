var shownListings = [];

function getSearchResults() {
    var xhr = new XMLHttpRequest();
    var url = '../dataFiles/listings.json';
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            displaySearchResults(JSON.parse(this.responseText));
        }
    };
    xhr.open('GET', url, true);
    xhr.send();
}

function displaySearchResults(listings) {
    var searchResultsSection = document.getElementById("searchResults");
    var query = document.getElementById("searchQuery").value.toLowerCase();
    var searchSomethingP = document.getElementById("searchSomethingP");
    if (query !== '') {
        for (var i = 0; i < listings.length; i++) {
            var id = listings[i]["Id"];
            listings[i]["Area"] = listings[i]["Area"].toLowerCase();
            if (listings[i]["Area"].includes(query) && !shownListings.includes(id)) {
                shownListings.push(id);
                searchSomethingP.setAttribute("hidden", true);
                searchResultsSection.appendChild(renderListings(listings[i]));
            }
        }
    } else {
        searchResultsSection.innerHTML = "";
        searchSomethingP.removeAttribute("hidden");
        shownListings = [];
    }
}

function getAllListings() {
    var xhr = new XMLHttpRequest();
    var url = '../dataFiles/listings.json';
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            displayAllListings(JSON.parse(this.responseText));
        }
    };
    xhr.open('GET', url, true);
    xhr.send();
}

function displayAllListings(listings) {
    for (var i = 0; i < listings.length; i++) {
        document.getElementById("allListingsDiv").appendChild(renderListings(listings[i]));
    }
}

function renderListings(listing) {
    var area = listing["Area"];
    var name = listing["Name"];
    var price = listing["Price"];
    var bed = listing["Bed"];
    var bath = listing["Bath"];
    var sqft = listing["Sqft"];
    var image = listing["Image"];

    var figure = document.createElement("figure");
    figure.setAttribute("class", "listingCard");

    var img = document.createElement("img");
    img.setAttribute("class", "listingCardImg");
    img.setAttribute("src", image);

    var figcaption = document.createElement("figcaption");
    figcaption.textContent = `${name} | ${area} | ${bed} Bed | ${bath} Bath | ${sqft} SQFT | ${price}`;

    figure.appendChild(img);
    figure.appendChild(figcaption);
    return figure;
}