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

    activName.textContent = `Activty: ${data.activity}`;
    activType.textContent = `Type: ${data.type}`;
    activParticipants.textContent = `Participants: ${data.participants}`;
    activPrice.textContent = `Price: $ ${data.price}`;
    activDuration.textContent = `Duration: ${data.duration}`;
};

