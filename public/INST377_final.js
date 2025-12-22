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

async function loadSavedActiv() {
    const savedList = document.getElementById("savedList");
    if (!savedList) return;

    const response = await fetch("/api/savedActivities");
    const data = await response.json();

    if(!response.ok) {
        savedList.innerHTML = `<p>Error loading saved activities.</p>`;
        return;
    }
    setList("savedActivities", Array.isArray(data) ? data : []);
    renderSaved();
}

async function handleSaveClick() {
  if (!currentActivity) return;

  const data = {
    activity_key: currentActivity.key,
    activity: currentActivity.activity,
    type: currentActivity.type,
    participants: currentActivity.participants,
    price: currentActivity.price,
    duration: currentActivity.duration
  };

  const response = await fetch("/api/savedActivity", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    alert(`Save failed.`);
    return;
  }

  await loadSavedActiv();
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
          const row = document.createElement("div");
          row.style.display = "flex";
          row.style.justifyContent = "space-between";
          row.style.alignItems = "center";
          row.style.gap = "10px";
          row.style.padding = "6px 0";

          const label = document.createElement("span");
          label.textContent = activity.activity;

          const btn = document.createElement("button");
          btn.className = "btn btnPrimary";
          btn.textContent = "Save";
          btn.type = "button";
          btn.addEventListener("click", () => {
            currentActivity = {
              key: activity.key,
              activity: activity.activity,
              type: activity.type,
              participants: activity.participants,
              price: activity.price,
              duration: activity.duration
            };
            handleSaveClick();
            addRecent(currentActivity);
          });

          row.appendChild(label);
          row.appendChild(btn);
          resultsDiv.appendChild(row);
        });
    }
}

// Saved function functionality page

function renderSaved() {
    const savedList = document.getElementById("savedList");
    if (!savedList) return;

    const saved = getList("savedActivities");
    savedList.innerHTML = saved.length
        ? saved.map(a => `<p>${a.activity}</p>`).join("")
        : "<p>No Activities Saved</p>";

        renderSavedTypeChart();
}

function renderRecent() {
    const recentList = document.getElementById("recentList");
    if (!recentList) return;

    const recent = getList("recentActivities");
    recentList.innerHTML = recent.length
        ? recent.map(a => `<p>${a.activity}</p>`).join("")
        : "<p>No Recent Activities</p>";
}

// Saved function for the chart

let savedTypeChart = null;

function renderSavedTypeChart(){
    const canvas = document.getElementById("savedTypeChart");
    if(!canvas) return;

    const saved = getList("savedActivities");
    const counts = {};
    saved.forEach(a => {
        const too = (a.type || "unknown").toLowerCase();
        counts[too] = (counts[too] || 0) + 1;
    });
    const labels = Object.keys(counts);
    const values = Object.values(counts);

    if(labels.length === 0){
        if(savedTypeChart) savedTypeChart.destroy();
        savedTypeChart = null;
        return;
    }

    savedTypeChart = new Chart(canvas, {
        type: "bar",
        data:{
            labels,
            datasets: [{
                label: "Saved Activities",
                data: values,
                backgroundColor: "#E21833",
                borderRadius: 6
            }]
        },



        options: {
            responsive: true,
            plugins:{
                legend:{
                    display:false
                },
            },
                scales:{
                    y: {beginAtZero: true, ticks: {precision: 0}}
                }
            
        }
    });
}

window.onload = () => {
  if (document.getElementById("savedList")) {
    loadSavedActiv();
    renderRecent();
    renderSavedTypeChart();
  }
};

// Movie box fetch call 

// Using the sample movies api 

// genre box output
async function loadGenres(){

    const genreSelect = document.getElementById("movieGenre");
    if(!genreSelect) return;

    const genres = ["action", "animation", "comedy", "drama", "horror", "family", "mystery"];

    genreSelect.innerHTML =  `<option value="">Select a genre</option>`;
    genres.forEach(g => {
        const option = document.createElement("option");
        option.value = g;

        option.textContent = g.charAt(0).toUpperCase() + g.slice(1);
        genreSelect.appendChild(option);
    });
}

async function recommendMovie(){
    const genre = document.getElementById("movieGenre").value;
    const movieBox = document.getElementById("movieBox");
    const movieTitle = document.getElementById("movieTitle");
    const movieMeta = document.getElementById("movieMeta");

    if (genre === ""){
        alert("Please select a genre first.");
        return;
    }

    movieBox.style.display = "block";
    movieTitle.textContent = "Loading..";
    movieMeta.textContent = "";

    try{

        const response = await fetch(`https://api.sampleapis.com/movies/${genre}`);
        const data = await response.json();

        if(!Array.isArray(data) || data.length === 0){

            movieTitle.textContent = "No movies found for this genre.";
            return;
        }

        const randomMovie = data[Math.floor(Math.random() * data.length)];

        movieTitle.textContent = randomMovie.title ?? "Movie Pick";
        movieMeta.textContent = `Year: ${randomMovie.year ?? "N/A"} | Rating: ${randomMovie.imdbRating ?? randomMovie.rating ?? "N/A"}`;
    } catch (error) {
        console.error(error);
        movieTitle.textContent = "Error loading movie recommendation.";
    }
}
document.addEventListener("DOMContentLoaded", () => {
    loadGenres();

    const movieBtn = document.getElementById("movieBtn");
    if (movieBtn) {
        movieBtn.addEventListener("click", recommendMovie);


    }
});







