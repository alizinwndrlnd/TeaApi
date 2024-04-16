"use strict"
const baseUrl = "http://172.19.0.12:8761/api"

document.getElementById("form").style.visibility = "hidden"; 

displayTable();

function generateTable(teas) {
    const table = document.createElement("table");
    table.classList.add("table", "table-striped");
    const thead = document.createElement("thead");
    const tr = document.createElement("tr");
    const titles = ["Megnevezés", "Gyártó", "Fajta", "Kiszerelés", "Mennyiség", "Ár"];

    for (let title of titles) {
        let th = document.createElement("th");
        th.appendChild(document.createTextNode(title));
        tr.appendChild(th);
    }

    thead.appendChild(tr);
    table.appendChild(thead);
    const tbody = document.createElement("tbody");

    for (const tea of teas) {
        const tr = generateRow(tea)
        tbody.appendChild(tr)
    }
    table.appendChild(tbody)
    return table

}

function displayTable() {
    
    fetch(baseUrl + "/teas")
        .then(response => {
            if (!response.ok) {
                throw Error("Hálózati hiba!")
            }
            return response.json()
        })
        .then(teas => {
            document.getElementById("teas").append(generateTable(teas))
        })
        .catch(err => {
            console.error(err)
            alert("A teák betöltése sikertelen")
        })

    // let teas = [
    //     {
    //       "id": 1,
    //       "brand": {
    //         "id": 1,
    //         "name": "Lipton",
    //         "slug": "lipton",
    //         "image": "lipton.png",
    //         "since": 1890,
    //         "country": "Egyesült Királyság"
    //       },
    //       "name": "Lipton natúr zöld tea 25 filter",
    //       "range": "green",
    //       "format": "tea bag",
    //       "qty": 25,
    //       "unit": "db",
    //       "price": 579,
    //       "image_url": "1.webp"
    //     },
    //     {
    //       "id": 2,
    //       "brand": {
    //         "id": 1,
    //         "name": "Lipton",
    //         "slug": "lipton",
    //         "image": "lipton.png",
    //         "since": 1890,
    //         "country": "Egyesült Királyság"
    //       },
    //       "name": "Lipton menta ízesítésű zöld tea 25 filter",
    //       "range": "green",
    //       "format": "tea bag",
    //       "qty": 25,
    //       "unit": "db",
    //       "price": 579,
    //       "image_url": "2.webp"
    //     }
    // ]; 

    // let table = generateTable(teas);
    // const teasDiv = document.getElementById("teas");
    // teasDiv.appendChild(table);


}

function generateRow(tea) {
    let tr = document.createElement("tr")
    const contents = [
        tea.name,
        tea.brand.name,
        tea.range,
        tea.format,
        `${tea.qty} ${tea.unit}`,
        `${tea.price} Ft`
    ]



    for (const content of contents) {
        let td = document.createElement("td")
        td.innerText = content
        tr.appendChild(td)
    }
    return tr

}

function sendNewTea(evt) {
    evt.preventDefault()
    alert(756767)
    let megnevezes = document.getElementById("name")
    let gyarto = document.getElementById("brand_id")
    let fajta = document.getElementById("range")
    let kiszereles = document.getElementById("format")
    let mennyiseg = document.getElementById("qty")
    let ar = document.getElementById("price")
    let egyseg = document.getElementById("unit")

    let newTea = 
        {
            "name": megnevezes.value,
            "brand_id": gyarto.value,
            "range": fajta.value,
            "format": kiszereles.value,
            "qty": mennyiseg.value,
            "unit": egyseg.value,
            "price": ar.value,
        }
console.log(newTea)
    fetch(baseUrl + "/teas", {
        method: 'POST',
        body: JSON.stringify(newTea),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'accept': 'application/json'
        }
    })
       
}


let ujtermek = document.getElementById("new")
ujtermek.addEventListener("click", document.getElementById("form").style.visibility = "visible" )

const xsubmit = document.querySelector("form")
console.log(xsubmit)
xsubmit.addEventListener("submit", sendNewTea)

