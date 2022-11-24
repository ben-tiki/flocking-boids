// ----------------------- ANIMATION OPTIONS -------------------------
var paused = false,
    showMenu = false,
    showStatus = false,
    showFocus = false,
    focusedBoid = 0,

    boidSeparation = 5,
    wallCollision = false,
    followMouse = false,
    startingPosition = "circle",

    showInteractionRadius = false,
    trailOption = "soft",
    mainColor = "#FF0000",
    colorOption = "direction",
    boidShape = "triangle";
    mouseX = 0,
    mouseY = 0,
    neighbor_count = 0;

// ------------------------- PARAMETERS ------------------------------
// simulation parameters
var velocity = 1.5,
    noise = 0.5,
    boxSize = canvas.width,
    interactionRadius = 30,
    boidNumber = 500,
    boidSize = 2;

var elapsedTime = 0;

// initialize empty arrays
x_positions = [];
y_positions = [];
theta = [];
vector_x = [];
vector_y = [];

// initializes boid positions (function at helpers.js)
if (startingPosition in spawnOptionsDict) {
  spawnOptionsDict[startingPosition]();
}

for (let b = 0; b < boidNumber; b++) {
  theta[b] = Math.random() * Math.PI * 2;
  vector_x[b] = Math.cos(theta[b]) * velocity;
  vector_y[b] = Math.sin(theta[b]) * velocity;
}

// ------------------------- FUNCTIONS -------------------------------
function drawTrail() {
    switch (trailOption) {
        case "none":
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            break;

        case "soft":
            ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            break;

        case "hard":
            break;
    }
}

function drawShape(index) {
  switch (boidShape) {
      case "triangle":
          ctx.beginPath();
          ctx.moveTo(x_positions[index] + boidSize * 2.5 * cos(theta[index]), y_positions[index] + boidSize * 2.5 * sin(theta[index]));
          ctx.lineTo(x_positions[index] + boidSize * cos(theta[index] + PI / 2), y_positions[index] + boidSize * sin(theta[index] + PI / 2));
          ctx.lineTo(x_positions[index] + boidSize * cos(theta[index] - PI / 2), y_positions[index] + boidSize * sin(theta[index] - PI / 2));
          break;

      case "circle":
          ctx.beginPath();
          ctx.arc(x_positions[index], y_positions[index], boidSize, 0, 2 * PI);
          break;
  }
}

function drawColor(index) {
    switch (colorOption) {
        case "none":
            ctx.fillStyle = mainColor;
            break;

        case "center":
            ctx.fillStyle = "hsl(" + (index * 360 / boidNumber) + ", 100%, 50%)";
            break;
        
        case "quadrant":
            ctx.fillStyle = "hsl(" + (atan2(y_positions[index] - canvas.height / 2, x_positions[index] - canvas.width / 2) * 180 / PI + 180) + ", 100%, 50%)";
            break;
          
        case "neighbors":
            ctx.fillStyle = "hsl(240, 100%, " + (neighbor_count * 100 / boidNumber * 6) + "%)";
            break;

        case "direction":
            ctx.fillStyle = "hsl(" + (theta[index] * 360) / (2 * PI) + ", 100%, 50%)";
            break;

        case "position":
            ctx.fillStyle = "hsl(" + (atan2(y_positions[index], x_positions[index]) * 360) / (2 * PI) + ", 100%, 50%)";
            break;

        case "time":
            ctx.fillStyle = "hsl(" + (elapsedTime * 360) / 5000 + ", 100%, 50%)";
            break;

        case "mouse":
            let mouseDistance = sqrt(pow(mouseX - x_positions[index], 2) + pow(mouseY - y_positions[index], 2));
            let hoverColor = 200 - (mouseDistance * 500) / (canvas.width / 2);
            ctx.fillStyle = "hsl(0, 0%, " + hoverColor + "%)";
        break;
    }
    ctx.fill();
    ctx.closePath();
}

// ---------------------------- MAIN ---------------------------------
// simulation main loop
function main() {

  if (paused) {
    return;
  }

  drawTrail();

  // viscek model
  // take track of amount of neighbors for each boid
  neighbor_array = [];

  let sx, sy;

  for (let b = 0; b < boidNumber; b++) {

    // apply forces to each boid
    x_positions[b] += vector_x[b];
    y_positions[b] += vector_y[b];
    
    // separate boids
    if (boidSeparation > 0) {
      separateBoids(b, x_positions, y_positions);
    }
  }

  let mean_theta = theta;
  for (let b = 0; b < boidNumber; b++) {

    // draw the boids
    sx = 0;
    sy = 0;
    neighbor_count = 0;

    for (let i = 0; i < boidNumber; i++) {

      let distance = (x_positions[i] - x_positions[b]) ** 2 + (y_positions[i] - y_positions[b]) ** 2;

      if (distance < interactionRadius ** 2 && distance > 0) {
        sx += cos(theta[i]);
        sy += sin(theta[i]);
        neighbor_count += 1;
      }
    }

    neighbor_array[b] = neighbor_count;

    mean_theta[b] = atan2(sy, sx);

    // add random movement to each boid
    theta[b] = mean_theta[b] + (random() - 0.5) * noise;

    // functions at helpers.js
    switch (true) {
      case wallCollision:
        collideWall(b, x_positions, y_positions);
        break;
      default:
        travelSide(b, x_positions, y_positions);
    }

    if (followMouse == true) {
      seekMouse();
    }

    // update the vectors for each boid
    vector_x[b] = velocity * cos(theta[b]);
    vector_y[b] = velocity * sin(theta[b]);

    drawShape(b);
    drawColor(b);

    drawInteractionRadius(b);
  }
  
  requestAnimationFrame(main);
  displayStatusMenu();
  drawFocus();
  displayFocusMenu();

  elapsedTime += 1;

}

// -------------------------- ANIMATION ------------------------------
requestAnimationFrame(main);