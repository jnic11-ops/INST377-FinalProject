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

