// Wrap the entire game logic inside a DOMContentLoaded listener
document.addEventListener('DOMContentLoaded', startGame);

function startGame() {
    // --- Game Initialization ---
    const canvas = document.getElementById('gameCanvas');
    
    if (!canvas) {
        console.error("Canvas element 'gameCanvas' not found!");
        return; 
    }
    const ctx = canvas.getContext('2d');

    const LEVEL_DISPLAY = document.getElementById('levelDisplay');
    const SCORE_DISPLAY = document.getElementById('scoreDisplay');
    const STATUS_MESSAGE = document.getElementById('statusMessage');

    let game = {
        level: 1,
        score: 0,
        keys: {}, 
        car: {
            x: 400, 
            y: 550, 
            width: 30,  // Short side
            height: 50, // Long side
            angle: 0,   // 0 degrees (right)
            speed: 0,
            maxSpeed: 3,
            rotationSpeed: 0.05, 
            friction: 0.98, 
            acceleration: 0.2
        },
        parkingSpot: null,
        // *** NEW: State to prevent multiple wins in a single transition ***
        isLevelTransitioning: false
    };

    // --- Function to generate a random, challenging parking spot ---
    function generateParkingSpot() {
        const minX = 100;
        const minY = 100;
        const maxX = canvas.width - 100;
        const maxY = canvas.height - 100;

        game.parkingSpot = {
            x: Math.random() * (maxX - minX) + minX,
            y: Math.random() * (maxY - minY) + minY,
            // Spot dimensions are horizontal
            width: game.car.height + 10,  
            height: game.car.width + 10, 
            angle: 0
        };
        STATUS_MESSAGE.textContent = "New Level! Just get close and stop!";
    }

    // --- Input Handling ---
    window.addEventListener('keydown', (e) => {
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
            e.preventDefault();
        }
        game.keys[e.key] = true;
    });
    window.addEventListener('keyup', (e) => {
        game.keys[e.key] = false;
    });

    // --- Game Logic Updates: Car Movement ---
    function updateCar() {
        const car = game.car;
        
        // 1. Acceleration and Braking
        if (game.keys['ArrowUp']) {
            car.speed += car.acceleration;
            if (car.speed > car.maxSpeed) car.speed = car.maxSpeed;
        } else if (game.keys['ArrowDown']) {
            car.speed -= car.acceleration * 0.7; 
            if (car.speed < -car.maxSpeed / 2) car.speed = -car.maxSpeed / 2;
        } else {
            car.speed *= car.friction;
            if (Math.abs(car.speed) < 0.05) car.speed = 0;
        }

        // 2. Steering (Rotation)
        if (Math.abs(car.speed) > 0.1) {
            if (game.keys['ArrowLeft']) {
                car.angle -= car.rotationSpeed * (car.speed > 0 ? 1 : -1); 
            }
            if (game.keys['ArrowRight']) {
                car.angle += car.rotationSpeed * (car.speed > 0 ? 1 : -1);
            }
        }

        // 3. Position Update (The Physics!)
        car.x += car.speed * Math.cos(car.angle);
        car.y += car.speed * Math.sin(car.angle);

        // Keep car within boundaries
        const padding = 15;
        if (car.x < padding) car.x = padding;
        if (car.x > canvas.width - padding) car.x = canvas.width - padding;
        if (car.y < padding) car.y = padding;
        if (car.y > canvas.height - padding) car.y = canvas.height - padding;
    }

    // --- Game Logic: Win Condition (Position and Stop Only) ---
    function checkParkingWin() {
        // *** NEW: Immediately exit if already transitioning ***
        if (game.isLevelTransitioning) {
            return;
        }
        
        const car = game.car;
        const spot = game.parkingSpot;

        // 1. Check if the car is STOPPED
        if (Math.abs(car.speed) > 0.1) {
            STATUS_MESSAGE.style.color = 'black';
            STATUS_MESSAGE.textContent = "Park the car! Use the arrow keys (↑↓ to accelerate/brake, ←→ to steer).";
            return; 
        }

        // 2. Check POSITION: Calculate distance
        const dx = car.x - spot.x;
        const dy = car.y - spot.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const positionTolerance = 25; 

        if (distance > positionTolerance) {
            STATUS_MESSAGE.style.color = 'black';
            STATUS_MESSAGE.textContent = "Car stopped, but not close enough to the spot.";
            return; 
        }
        
        // --- WIN CONDITION MET! ---
        STATUS_MESSAGE.style.color = 'green';
        STATUS_MESSAGE.textContent = `PERFECT! You parked it in Level ${game.level}!`;

        // *** NEW: Start transition and disable further checks ***
        game.isLevelTransitioning = true;
        
        // Advance to the next level
        game.level++;
        game.score += 100;
        LEVEL_DISPLAY.textContent = game.level;
        SCORE_DISPLAY.textContent = game.score;

        // Reset car position and generate a new spot after a short delay
        setTimeout(() => {
            car.x = 400; 
            car.y = 550;
            car.speed = 0;
            car.angle = 0; 
            generateParkingSpot();
            
            // *** NEW: Re-enable checks after the transition ***
            game.isLevelTransitioning = false;
        }, 1500);
    }


    // --- Drawing Functions: Parking Spot ---
    function drawParkingSpot() {
        const spot = game.parkingSpot;
        
        ctx.save();
        ctx.translate(spot.x, spot.y);
        
        // Draw the spot outline
        ctx.strokeStyle = 'yellow';
        ctx.lineWidth = 4;
        ctx.setLineDash([10, 5]);
        ctx.strokeRect(-spot.width / 2, -spot.height / 2, spot.width, spot.height);
        
        // Semi-transparent yellow fill
        ctx.fillStyle = 'rgba(255, 255, 0, 0.4)';
        ctx.fillRect(-spot.width / 2, -spot.height / 2, spot.width, spot.height);

        ctx.restore();
    }

    // --- Drawing Functions: Car ---
    function drawCar() {
        const car = game.car;
        ctx.save();
        
        ctx.translate(car.x, car.y);
        ctx.rotate(car.angle); 
        
        // Draw the car body
        ctx.fillStyle = '#FF4081'; 
        // Use car.height for WIDTH (long side) and car.width for HEIGHT (short side)
        ctx.fillRect(-car.height / 2, -car.width / 2, car.height, car.width); 

        // Draw the front indicator (at the right edge)
        ctx.fillStyle = '#333';
        ctx.fillRect(car.height / 2 - 10, -car.width / 4, 10, car.width / 2);
        
        ctx.restore();
    }

    // --- Main Game Loop ---
    function gameLoop() {
        // 1. Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 2. Update all objects
        updateCar();
        checkParkingWin(); 

        // 3. Draw all objects
        drawParkingSpot(); 
        drawCar();

        // 4. Request next frame for smooth animation (this is the loop)
        requestAnimationFrame(gameLoop);
    }

    // Start the game by generating the spot and launching the loop
    generateParkingSpot(); 
    gameLoop();
}