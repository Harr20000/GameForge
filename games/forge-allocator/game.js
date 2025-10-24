// --- Configuration ---
const GAME_DURATION = 60; // Seconds
const INITIAL_RESOURCES = {
    metal: 100,
    energy: 50,
};

// Blueprint Name, Cost, and Value (Score)
const BLUEPRINTS = [
    { name: 'Basic Sword', metal: 20, energy: 5, value: 50 },
    { name: 'Iron Shield', metal: 30, energy: 10, value: 80 },
    { name: 'Energy Cell', metal: 10, energy: 20, value: 60 },
    { name: 'War Hammer', metal: 50, energy: 15, value: 150 },
    { name: 'Flux Capacitor', metal: 15, energy: 35, value: 100 },
    { name: 'Light Armor', metal: 40, energy: 25, value: 120 },
    { name: 'Power Core', metal: 25, energy: 5, value: 40 }
];

// --- Global Game State ---
let inventory = { ...INITIAL_RESOURCES };
let score = 0;
let timeLeft = GAME_DURATION;
let gameInterval;
let gameActive = false;
let selectedBlueprints = [];

// --- DOM Elements ---
const metalValueEl = document.getElementById('metalValue');
const energyValueEl = document.getElementById('energyValue');
const timerValueEl = document.getElementById('timerValue');
const scoreDisplayEl = document.getElementById('scoreDisplay');
const blueprintListEl = document.getElementById('blueprintList');
const buildButton = document.getElementById('buildButton');
const resultMessageEl = document.getElementById('resultMessage');

// --- Game Functions ---

/**
 * Initializes the game state and starts the main loop.
 */
function startGame() {
    if (gameActive) return;

    // Reset state
    inventory = { ...INITIAL_RESOURCES };
    score = 0;
    timeLeft = GAME_DURATION;
    gameActive = true;
    selectedBlueprints = [];
    
    updateDisplay();
    renderBlueprints();
    startTimer();

    buildButton.textContent = 'Forge Selected Items!';
    resultMessageEl.textContent = 'Forge as much as you can!';
}

/**
 * Handles the game timer countdown.
 */
function startTimer() {
    clearInterval(gameInterval); // Clear any existing timer

    gameInterval = setInterval(() => {
        timeLeft--;
        timerValueEl.textContent = timeLeft;

        if (timeLeft <= 10) {
            timerValueEl.style.color = '#e74c3c'; // Red for low time
        } else {
            timerValueEl.style.color = '#f1c40f'; // Yellow otherwise
        }

        if (timeLeft <= 0) {
            gameOver();
        }
    }, 1000);
}

/**
 * Stops the game and displays the final score.
 */
function gameOver() {
    clearInterval(gameInterval);
    gameActive = false;
    buildButton.textContent = 'Game Over! Click to Restart';
    buildButton.disabled = false; // Enable for restart
    resultMessageEl.textContent = `Time's up! Your final item value is: $${score}`;
    resultMessageEl.style.color = '#2ecc71'; // Green

    // Optional: Hide blueprints or make them unselectable
    blueprintListEl.innerHTML = '';
}

/**
 * Updates all resource, score, and timer displays.
 */
function updateDisplay() {
    metalValueEl.textContent = inventory.metal;
    energyValueEl.textContent = inventory.energy;
    scoreDisplayEl.textContent = `Value: $${score}`;

    // Disable button if nothing is selected or if game is over
    buildButton.disabled = !gameActive || selectedBlueprints.length === 0;
}

/**
 * Renders the list of blueprints to the DOM.
 */
function renderBlueprints() {
    blueprintListEl.innerHTML = ''; // Clear existing list

    BLUEPRINTS.forEach((blueprint, index) => {
        const div = document.createElement('div');
        div.className = 'blueprint';
        div.dataset.index = index; // Store index for easy lookup

        const info = document.createElement('div');
        info.className = 'blueprint-info';
        info.innerHTML = `<strong>${blueprint.name}</strong> (Value: $${blueprint.value})`;

        const cost = document.createElement('div');
        cost.className = 'blueprint-cost';
        cost.textContent = `Requires: ${blueprint.metal} Metal, ${blueprint.energy} Energy`;

        div.appendChild(info);
        div.appendChild(cost);
        
        // Add click listener
        div.addEventListener('click', toggleSelection);
        blueprintListEl.appendChild(div);
    });
}

/**
 * Toggles a blueprint's selection state and updates the selected list.
 */
function toggleSelection(event) {
    if (!gameActive) return;
    
    const div = event.currentTarget;
    const index = parseInt(div.dataset.index);

    if (div.classList.contains('selected')) {
        div.classList.remove('selected');
        // Remove from selected list
        selectedBlueprints = selectedBlueprints.filter(i => i !== index);
    } else {
        div.classList.add('selected');
        // Add to selected list
        selectedBlueprints.push(index);
    }

    updateDisplay(); // Update button state
}

/**
 * Calculates resource costs and attempts to build the selected items.
 */
function handleBuild() {
    if (!gameActive || selectedBlueprints.length === 0) {
        startGame(); // If game is over or button says 'Start Game'
        return;
    }

    let totalMetalCost = 0;
    let totalEnergyCost = 0;
    let totalValueGained = 0;
    
    const blueprintsToBuild = selectedBlueprints.map(i => BLUEPRINTS[i]);

    // 1. Calculate total costs and value
    blueprintsToBuild.forEach(bp => {
        totalMetalCost += bp.metal;
        totalEnergyCost += bp.energy;
        totalValueGained += bp.value;
    });

    // 2. Check resource constraints
    if (inventory.metal >= totalMetalCost && inventory.energy >= totalEnergyCost) {
        // Success: Deduct resources and update score
        inventory.metal -= totalMetalCost;
        inventory.energy -= totalEnergyCost;
        score += totalValueGained;

        resultMessageEl.textContent = `✅ FORGED! Gained $${totalValueGained}.`;
        resultMessageEl.style.color = '#2ecc71';
        
    } else {
        // Failure: Not enough resources
        resultMessageEl.textContent = '❌ ERROR: Insufficient resources for selection!';
        resultMessageEl.style.color = '#e74c3c';
    }

    // 3. Reset Selections
    selectedBlueprints = [];
    document.querySelectorAll('.blueprint.selected').forEach(el => {
        el.classList.remove('selected');
    });

    // 4. Update UI
    updateDisplay();
}

// --- Event Listeners and Initialization ---

buildButton.addEventListener('click', handleBuild);

// Initial setup on load
document.addEventListener('DOMContentLoaded', () => {
    // The button will be used to start the game initially
    buildButton.textContent = 'Start Game';
    buildButton.disabled = false;
    
    // Render the initial blueprints so the player can strategize before starting
    renderBlueprints(); 
    updateDisplay();
});