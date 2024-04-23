"use strict"
const baseUrl = "http://172.19.0.12:8761/api"

document.getElementById("form").style.visibility = "hidden";
const updateForm = document.querySelector("#updateModal form")
const updateModal = new bootstrap.Modal('#updateModal')

const modalName = document.querySelector("#modalName")
const modalBrand = document.querySelector("#modalBrand")
const modalRange = document.querySelector("#modalRange")
const modalFormat = document.querySelector("#modalFormat")
const modalQty = document.querySelector("#modalQty")
const modalUnit = document.querySelector("#modalUnit")

displayTable();

function generateTable(teas) {
    const table = document.createElement("table");
    table.classList.add("table", "table-striped");
    const thead = document.createElement("thead");
    const tr = document.createElement("tr");
    const titles = ["Megnevezés", "Gyártó", "Fajta", "Kiszerelés", "Mennyiség", "Ár", "Admin"];

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
        `${tea.price} Ft`,
        ""
        
    ]

    //törlés gomb
    const btnTorol = document.createElement("button")
    btnTorol.setAttribute("type", "button")
    btnTorol.classList.add("btn", "btn-danger", "mx-3")
    btnTorol.append(document.createTextNode("Törlés"))
    btnTorol.addEventListener("click", (evt) => {
        evt.preventDefault()

        fetch(`${baseUrl}/teas/${tea['id']}`, {
            "method": "delete",
            "headers": {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
    })

    //módosítás gomb
    const updateBtn = document.createElement("button")
    updateBtn.setAttribute("type", "button")
    updateBtn.classList.add("btn", "btn-warning", "my-3")
    updateBtn.append(document.createTextNode("Módosítás"))
    updateBtn.addEventListener("click", (evt) => {
        evt.preventDefault()
        modalName.value = tea["name"]
        modalBrand[tea["brand_id"]].selected = true //tea["brand_id"] //
        modalFormat.value = tea["format"]
        modalQty.value = tea["qty"]                  
        modalRange.value = tea["range"]
        modalUnit.value = tea["unit"]
       

        console.log(updateModal)

        updateForm.dataset.id = tea["id"]

        updateModal.show()
    })




    for (const content of contents) {
        let td = document.createElement("td")
        td.innerText = content
        td.append(btnTorol)
        td.append(updateBtn)
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




let ujtermek = document.getElementById("newBtn")
ujtermek.addEventListener("click", () => {
    document.getElementById("form").style.visibility = "visible"
})

const xsubmit = document.querySelector("form")
const mentGomb = document.getElementById("ment")
mentGomb.classList.add("btn", "btn-success")
console.log(xsubmit)
xsubmit.addEventListener("submit", sendNewTea)



updateForm.addEventListener("submit",(evt) => {
    evt.preventDefault()

    const id = updateForm.dataset.id

    const fd = new FormData(updateForm)
    
    fetch(`${baseUrl}/tea/${id}`, {
        "method" : "put",
        "headers" : {
            "Content-Type" : "application/json",
            "Accept" : "application/json"
        },
        "body" : JSON.stringify(Object.fromEntries(fd.entries()))
    })
    .then(response => response.json())
    .then(tea => {
        console.log(tea)

        const row = document.querySelector(`[data-id="${tea.id}"]`)
        document.querySelector(`[data-id="${tea.id}"] td:nth-of-type(2)`).innerText = tea.name
        document.querySelector(`[data-id="${tea.id}"] td:nth-of-type(3)`).innerText = tea.brand_id

        updateModal.hide()
    })
    .catch(err => console.log(err))
})