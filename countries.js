let searchInputEl = document.getElementById("searchInput");
let resultCountriesEl = document.getElementById("resultCountries");
let spinnerEl = document.getElementById("spinner");
let countriesList;
getCountries();
/*function caa(j) {
    //loading.classList.toggle("d-none");
    for (let i of j) {

        let {
            name,
            flag,
            population
        } = i;

        if (name === ip.value) {
            console.log(name, flag, population);

            let cdiv = document.createElement("div");
            cdiv.setAttribute("class", "d-flex", "flex-row");
            cdiv.classList.add("country-card");

            let l = document.createElement("img");
            l.src = flag;
            l.classList.add("country-flag");
            cdiv.appendChild(l);

            //let b2 = document.createElement("br");
            //cdiv.appendChild(b2);


            let ccdiv = document.createElement("div");
            ccdiv.setAttribute("class", "ml-2");

            let t = document.createElement("h1");
            t.textContent = name;
            t.classList.add("country-name");
            ccdiv.appendChild(t);

            //let b1 = document.createElement("br");
            //ccdiv.appendChild(b1);

            let d = document.createElement("p");
            d.textContent = population;
            d.classList.add("country-population");
            ccdiv.appendChild(d);
            cdiv.appendChild(ccdiv);


            maindiv.appendChild(cdiv);
        }


    }
}


ip.addEventListener("keyup", function() {
    if (event.key === "Enter") {
        //console.log(event.target);
        maindiv.textContent = "";
        let object = {
            method: "GET"
            headers: {
                "Content-Type": "Application/json",
                Accept: "Application/json",
                Authorization: "Bearer 4cf55dab20a60904c42dbd8c80a095850d91b7a2112440a409ef2b19708284a5"
            }
        };

        fetch("https://apis.ccbp.in/countries-data", object)
            .then(function(response) {
                //ip.textContent = "";
                return response.json();
            })
            .then(function(j) {
                //let { result } = j;
                //console.log(j);
                caa(j);
            });
    }


});*/



function getCountries() {
    let url = "https://apis.ccbp.in/countries-data";
    let options = {
        method: "GET"
    };
    resultCountriesEl.textContent = "";

    spinnerEl.classList.remove("d-none");
    resultCountriesEl.classList.add("d-none");

    //Making an HTTP request (GET method) using fetch
    fetch(url, options)
        .then(function (response) {
            return response.json();
        })
        .then(function (jsonData) {
            resultCountriesEl.classList.remove("d-none");
            spinnerEl.classList.add("d-none");
            countriesList = jsonData;
            displaySearchResults();
        });
}

function createAndAppendCountry(country) {

    let countryEl = document.createElement("div");
    countryEl.classList.add("country-card", "col-11", "col-md-5", "mr-auto", "ml-auto", "d-flex", "flex-row");
    resultCountriesEl.appendChild(countryEl);


    let countryFlagEl = document.createElement("img");
    countryFlagEl.src = country.flag;
    countryFlagEl.classList.add("country-flag", "mt-auto", "mb-auto");
    countryEl.appendChild(countryFlagEl);


    let countryInfoEl = document.createElement("div");
    countryInfoEl.classList.add("d-flex", "flex-column", "ml-4");
    countryEl.appendChild(countryInfoEl);


    let countryNameEl = document.createElement("p");
    countryNameEl.textContent = country.name;
    countryNameEl.classList.add("country-name");
    countryInfoEl.appendChild(countryNameEl);


    let countryPopulationEl = document.createElement("p");
    countryPopulationEl.textContent = country.population;
    countryPopulationEl.classList.add("country-population");
    countryInfoEl.appendChild(countryPopulationEl);
}


let searchInputVal = "";

function displaySearchResults() {
    for (let country of countriesList) {
        let countryName = country.name;

        if (countryName.includes(searchInputVal)) {
            createAndAppendCountry(country);
        }
    }
}

function onChangeSearchInput(event) {
    searchInputVal = event.target.value;
    getCountries();
}

searchInputEl.addEventListener("keyup", onChangeSearchInput);