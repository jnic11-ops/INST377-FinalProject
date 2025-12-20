async function loadRandActiv() {
    const response = await fetch("https://bored-api.appbrewery.com/random");
    
    const data = await response.json();

    const container = document.getElementById("randActivDiv");
    const activName = document.getElementById("activName");
    const activType = document.getElementById("activType");
    const activParticipants = document.getElementById("activParticipants");
    const activPrice = document.getElementById("activPrice");
    const activLink = document.getElementById("activLink");

    container.style.display = "block";

    activName.textContent = `Activity: ${data.activity}`;
    activType.textContent = `: ${data.type}`;
    activParticipants.textContent = `: ${data.participants}`;
    activPrice.textContent = `: $ ${data.price}`;
    activDuration.textContent = `: ${data.duration}`;
};

// Filter box fetch 

async function loadFilteredActivities(){
    const type = document.getElementById("typeFilter").value;
    const participants = document.getElementById("participantsFilter").value;
    const maxPrice = parseFloat(document.getElementById("priceFilter").value);

    let url = `https://bored-api.appbrewery.com/filter?participants=${participants}`;
    if (type !== ""){
        url += `&type=${type}`;

        const response = await fetch(url);
        const data = await response.json();

        const resultsDiv = document.getElementById("resultsActiv");
        resultsDiv.innerHTML="";


        const filtered = data.filter(activity => Number(activity.price) <= maxPrice);

        if (filtered.length === 0) {
            resultsDiv.textContent = "No results found.";
         return;
        }

        filtered.slice(0, 10).forEach(activity => {
        const p = document.createElement("p");
        p.textContent = activity.activity;
        resultsDiv.appendChild(p);
        });
    }



}


