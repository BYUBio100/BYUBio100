document.getElementById("setBackground").addEventListener("click", function() {
    let selectedColor = document.getElementById("backgroundSelect").value;
    let gameBoard = document.getElementById("gameBoard");
    let gradient = `linear-gradient(to right, ${selectedColor} 0%, white 100%)`;
    gameBoard.style.background = `${gradient}, url('pattern.png')`;
    gameBoard.style.backgroundSize = "cover";
});

const colors = ["red", "pink", "orange", "yellow", "green", "navy", "purple", "cyan", "black", "white"];
let population = {};
let consumed = 0;

function initializeGame() {
    let gameBoard = document.getElementById("gameBoard");
    gameBoard.innerHTML = "";
    population = {};
    consumed = 0;
    document.getElementById("consumedCounter").textContent = "Consumed: 0";
    colors.forEach(color => population[color] = 10);
    renderDots();
    updateStats();
}

function renderDots() {
    let gameBoard = document.getElementById("gameBoard");
    Object.keys(population).forEach(color => {
        for (let i = 0; i < population[color]; i++) {
            let dot = document.createElement("div");
            dot.className = "dot";
            dot.style.backgroundColor = color;
            dot.style.top = `${Math.random() * 380}px`;
            dot.style.left = `${Math.random() * 580}px`;
            dot.addEventListener("click", function() {
                if (consumed < 75) {
                    this.remove();
                    population[color]--;
                    consumed++;
                    document.getElementById("consumedCounter").textContent = `Consumed: ${consumed}`;
                }
            });
            gameBoard.appendChild(dot);
        }
    });
}

document.getElementById("startGame").addEventListener("click", initializeGame);

document.getElementById("nextRound").addEventListener("click", function() {
    consumed = 0;
    document.getElementById("consumedCounter").textContent = "Consumed: 0";
});

document.getElementById("reproduce").addEventListener("click", function() {
    let newPopulation = {};
    Object.keys(population).forEach(color => {
        newPopulation[color] = population[color] * 3;
    });
    population = newPopulation;
    renderDots();
    updateStats();
});

function updateStats() {
    let statsTable = document.getElementById("stats");
    statsTable.innerHTML = "";
    let totalDots = Object.values(population).reduce((a, b) => a + b, 0);
    Object.keys(population).forEach(color => {
        let row = document.createElement("tr");
        let countCell = document.createElement("td");
        let percentCell = document.createElement("td");
        countCell.textContent = population[color];
        percentCell.textContent = ((population[color] / totalDots) * 100).toFixed(2) + "%";
        row.innerHTML = `<td>${color}</td>`;
        row.appendChild(countCell);
        row.appendChild(percentCell);
        statsTable.appendChild(row);
    });
}
