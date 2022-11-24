// --------------------------- MATH ----------------------------------
// math functions and constants
const { cos, sin, atan2, sqrt, PI, random, floor, pow } = Math;

// ---------------------------- HELPERS ------------------------------
// avoid overclipping between boids
function separateBoids(b, x_positions, y_positions) {
    for(let i = 0; i < boidNumber; i++) {
        if (i != b) {
            let distance = ((x_positions[b] - x_positions[i]) ** 2 + (y_positions[b] - y_positions[i]) ** 2);
            if (distance < boidSeparation ** 2) {
                x_positions[b] += (x_positions[b] - x_positions[i]) / distance;
                y_positions[b] += (y_positions[b] - y_positions[i]) / distance;
            }
        }
    }
}

// boids travel across the screen
function travelSide(b) {
    if (x_positions[b] > canvas.width) {
        x_positions[b] = x_positions[b] - canvas.width;
    } else if (x_positions[b] < 0) {
        x_positions[b] = x_positions[b] + canvas.width;
    }

    if (y_positions[b] > canvas.height) {
        y_positions[b] = y_positions[b] - canvas.height;
    } else if (y_positions[b] < 0) {
        y_positions[b] = y_positions[b] + canvas.height;
    }
}

// boids bounce off the walls
function collideWall(b) {
    let desired = 0;
    let steer = 0;

    if (x_positions[b] < 10) {
        desired = atan2(0 - y_positions[b], canvas.width - x_positions[b]);
        steer = desired - theta[b];
        theta[b] += steer;
    } else if (x_positions[b] > canvas.width - 10) {
        desired = atan2(0 - y_positions[b], 0 - x_positions[b]);
        steer = desired - theta[b];
        theta[b] += steer;
    }

    if (y_positions[b] < 10) {
        desired = atan2(canvas.height - y_positions[b], 0 - x_positions[b]);
        steer = desired - theta[b];
        theta[b] += steer;
    } else if (y_positions[b] > canvas.height - 10) {
        desired = atan2(0 - y_positions[b], 0 - x_positions[b]);
        steer = desired - theta[b];
        theta[b] += steer;
    }
}

function getQuadrant(focusedBoid) {
    if (x_positions[focusedBoid] > canvas.width / 2) {
        if (y_positions[focusedBoid] > canvas.height / 2) {
            return 4;
        } else {
            return 1;
        }
    } else {
        if (y_positions[focusedBoid] > canvas.height / 2) {
            return 3;
        } else {
            return 2;
        }
    }
}

function drawInteractionRadius(b) {
    if (showInteractionRadius) {
        ctx.beginPath();
        ctx.setLineDash([5, 5]);
        ctx.arc(x_positions[b], y_positions[b], interactionRadius, 0, 2 * PI);
        ctx.strokeStyle = "white";
        ctx.stroke();
        ctx.closePath();
    }
}

function seekMouse() {
    if (mouseX != 0 && mouseY != 0) {
        for (let i = 0; i < boidNumber; i++) {
            let desired = atan2(mouseY - y_positions[i], mouseX - x_positions[i]);
            let steer = desired - theta[i];
            theta[i] += steer;
        }
    }
}

// ---------------------------- SPAWN OPTIONS --------------------------------
function spawnRandom() {
    for (let i = 0; i < boidNumber; i++) {
        x_positions[i] = random() * canvas.width;
        y_positions[i] = random() * canvas.height;
    }
}

function spawnCircle() {
    for (let i = 0; i < boidNumber; i++) {
        x_positions[i] = canvas.width / 2 + 200 * cos((i * 2 * PI) / boidNumber);
        y_positions[i] = canvas.height / 2 + 200 * sin((i * 2 * PI) / boidNumber);
    }
}

function spawnSinWave() {
    for (let i = 0; i < boidNumber; i++) {
        x_positions[i] = i * 10;
        y_positions[i] = canvas.width / 4 + 100 * sin(x_positions[i] / 100);
    }
}

function spawnGrid() {
    let x = 0,
        y = 0,
        x_increment = canvas.width / sqrt(boidNumber),
        y_increment = canvas.height / sqrt(boidNumber);

    for (let i = 0; i < boidNumber; i++) {
        x_positions[i] = x;
        y_positions[i] = y;
        x += x_increment;
        if (x > canvas.width) {
            x = 0;
            y += y_increment;
        }
    }
}

function spawnOval() {
    let phi = (1 + sqrt(5)) / 2;
    let das = 0;
    for (let i = 0; i < boidNumber; i++) {
        das += (2 * PI) / phi;
        x_positions[i] = canvas.width / 2 + (canvas.width / 2 - 100) * cos(das);
        y_positions[i] = canvas.height / 2 + (canvas.height / 2 - 100) * sin(das);
    }
}

function spawnRhomboid() {
    let das = 0;
    for (let i = 0; i < boidNumber; i++) {
        das += (2 * PI) / 1.618;
        x_positions[i] = canvas.width / 2 + (canvas.width / 2 - 100) * cos(das) * cos(das) * cos(das);
        y_positions[i] = canvas.height / 2 + (canvas.height / 2 - 100) * sin(das) * sin(das) * sin(das);
    }
}

function spawnSpirograph() {
    let r = 50,
        t = 0,
        R = 500;
    for (let i = 0; i < boidNumber; i++) {
        x_positions[i] = (R + r) * cos(t) - r * cos(((R + r) * t) / r);
        y_positions[i] = (R + r) * sin(t) - r * sin(((R + r) * t) / r);
        t += (2 * PI) / boidNumber;
    }
}

function spawnSpiral() {
    let radius = 0;
    let angle = 0;
     for (let i = 0; i < boidNumber; i++) {
        radius += 0.75;
        angle += (Math.PI * 2) / 50;
        x_positions[i] = canvas.width / 2 + radius * Math.cos(angle);
        y_positions[i] = canvas.height / 2 + radius * Math.sin(angle);

    }
}

function spawnletter() {
    let inputElement = document.getElementById("input"),
        spacing = 5;

    boidNumber = 250;

    function generatePositions(inputText) {ctx.fillText(inputText.toUpperCase(), 0, 10);

        let data32 = new Uint32Array(ctx.getImageData(0, 0, canvas.width, canvas.height).data.buffer);

        let boidCount = 0;
        for (let i = 0; i < data32.length; i++) {
            if (data32[i] !== 0) {
                x_positions[boidCount] = (i % canvas.width) * spacing * 2;
                y_positions[boidCount] = Math.floor(i / canvas.width) * spacing * 2;

                boidCount++;
            }
            if (boidCount >= boidNumber) {
                break;
            }
        }

        // get horizontal distance bewteen first and last boid
        let letterDistance = x_positions[boidCount - 1] - x_positions[0];

        // center the boids
        for (let i = 0; i < boidCount; i++) {
            x_positions[i] = x_positions[i] - letterDistance / 2 + canvas.width / 2;
            y_positions[i] = y_positions[i] + canvas.height / 3;
        }

        boidNumber = boidCount;
    }

    generatePositions(inputElement.value);
    inputElement.onkeyup = function () {
        generatePositions(this.value);
    };
}

// final spawn dictionary
const spawnOptionsDict = {
    random: spawnRandom,
    circle: spawnCircle,
    wave: spawnSinWave,
    grid: spawnGrid,
    oval: spawnOval,
    rhomboid: spawnRhomboid,
    spirograph: spawnSpirograph,
    spiral: spawnSpiral,
    letter: spawnletter
};