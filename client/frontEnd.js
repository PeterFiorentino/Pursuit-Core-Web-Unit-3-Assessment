document.addEventListener("DOMContentLoaded", () => {
    let allButton = document.getElementById("all");
    allButton.addEventListener("click", loadAllSightings);

    let byResearcher = document.getElementById("byResearcher");
    byResearcher.addEventListener("click", loadByResearcher);
})

async function loadAllSightings() {
    console.log("all sightings have loaded")
    let sightingsURL = "http://localhost:3000/sightings"
    let list = document.getElementById("list");
    while(list.firstChild) {
        list.removeChild(list.firstChild)
    }
    try {
        await axios.get(sightingsURL)
        .then((response) => {
            console.log(response.data.payload)
            let sightings = response.data.payload;
            for(let i in response.data.payload) {
                console.log(i)
                let listItem = document.createElement("li");
                listItem.innerText = `${sightings[i].researcher} saw a ${sightings[i].species} in the ${sightings[i].habitat}`;
                list.appendChild(listItem)
            }
        })
    } catch (error) {
        console.log(error)
    }
}


async function loadByResearcher() {
    console.log("loading by researcher");
    
    let researcher = Number(document.querySelector("input").value);
    let sightingsURL = `http://localhost:3000/sightings/researchers/${researcher}`;
    let list = document.getElementById("list");
    while(list.firstChild) {
        list.removeChild(list.firstChild)
    }
    try {
        await axios.get(sightingsURL)
        .then((response) => {
            console.log(response.data.payload);
            let sightings = response.data.payload;
            for(let i in response.data.payload) {
                console.log(i)
                let listItem = document.createElement("li");
                listItem.innerText = `${sightings[i].researcher} saw a ${sightings[i].species} in the ${sightings[i].habitat}`;
                list.appendChild(listItem)
            }
        })
    } catch (error) {
        console.log(error)
    }
}
