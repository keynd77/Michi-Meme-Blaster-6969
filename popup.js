const container = document.getElementById("imageContainer");
const allBtn = document.getElementById("allBtn");
const randomBtn = document.getElementById("randomBtn");
const darkModeToggle = document.getElementById("darkModeToggle");
const batchSize = 20;
let images = [];
let loadedCount = 0;
let currentMode = "all";

fetch("images.json")
    .then(response => response.json())
    .then(data => {
        images = data;
        loadAllImages();
    })
    .catch(error => console.error("❌ Error loading images:", error));

function loadAllImages() {
    container.innerHTML = "";
    loadedCount = 0;
    loadNextBatch();
}

function loadNextBatch() {
    if (currentMode !== "all") return;
    const batch = images.slice(loadedCount, loadedCount + batchSize);
    batch.forEach(url => addImage(url));
    loadedCount += batch.length;
}

function loadRandomImages() {
    container.innerHTML = "";
    let shuffled = [...images].sort(() => 0.5 - Math.random());
    let selected = shuffled.slice(0, 4);
    selected.forEach(url => addImage(url));
}

function addImage(url) {
    const img = document.createElement("img");
    img.src = url;
    img.loading = "lazy";
    container.appendChild(img);
}

window.addEventListener("scroll", () => {
    if (currentMode === "all" && window.innerHeight + window.scrollY >= document.body.scrollHeight - 50) {
        loadNextBatch();
    }
});

allBtn.addEventListener("click", () => {
    currentMode = "all";
    loadAllImages();
});

randomBtn.addEventListener("click", () => {
    currentMode = "random";
    loadRandomImages();
});

const enableDarkMode = () => {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
};

const disableDarkMode = () => {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
};

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
    enableDarkMode();
}

