let currentActivity = null;

function getList(key) {
  return JSON.parse(localStorage.getItem(key) || "[]");
}
function setList(key, arr) {
  localStorage.setItem(key, JSON.stringify(arr));
}

function addRecent(activity) {
  const recent = getList("recentActivities").filter(a => a.key !== activity.key);
  recent.unshift(activity);
  setList("recentActivities", recent.slice(0, 5));
  renderRecent();
}

function handleSaveClick() {
  if (!currentActivity) return;

  const saved = getList("savedActivities");
  if (!saved.some(a => a.key === currentActivity.key)) {
    saved.unshift(currentActivity);
    setList("savedActivities", saved);
  }
  renderSaved();
}

async function loadRandActiv() {
    const response = await fetch("https://bored-api.appbrewery.com/random");
    
    const data = await response.json();

    const container = document.getElementById("randActivDiv");
    const activName = document.getElementById("activName");
    const activType = document.getElementById("activType");
    const activParticipants = document.getElementById("activParticipants");
    const activPrice = document.getElementById("activPrice");
    const activDuration = document.getElementById("activDuration");

    container.style.display = "block";

    currentActivity = {
        key: data.key,
        activity: data.activity,
        type: data.type,
        participants: data.participants,
        price: data.price,
        duration: data.duration
    };

    activName.textContent = `Activity: ${data.activity}`;
    activType.textContent = `: ${data.type}`;
    activParticipants.textContent = `: ${data.participants}`;
    activPrice.textContent = `: $ ${data.price}`;
    activDuration.textContent = `: ${data.duration}`;

    addRecent(currentActivity);
}

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

function renderSaved() {
    const savedList = document.getElementById("savedList");
    if (!savedList) return;

    const saved = getList("savedActivities");
    savedList.innerHTML = saved.length
        ? saved.map(a => `<p>${a.activity}</p>`).join("")
        : "<p>No Activities Saved</p>";
}

function renderRecent() {
    const recentList = document.getElementById("recentList");
    if (!recentList) return;

    const recent = getList("recentActivities");
    recentList.innerHTML = recent.length
        ? recent.map(a => `<p>${a.activity}</p>`).join("")
        : "<p>No Recent Activities</p>";
}

window.onload = () => {
  if (document.getElementById("savedList")) {
    renderSaved();
    renderRecent();
  }
};

// Movie box fetch call 

async function loadGenres(){

    const genreSelect = document.getElementById("movieGenre");
    if(!genreSelect) return;

    const genres = ["action", "animation", "comedy", "drama", "horror", "family", "mystery"];

    genreSelect.innerHTML `<option value="">Select a genre</option>`;
    genres.forEach(g => {
        const option = document.createElement("option");
        option.value = g;

        option.textContent = g.charAt(0).toUpperCase() + g.slice(1);
        genreSelect.appendChild(option);
    });
}





