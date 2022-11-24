// --------------------------------- STATUS -----------------------------------
function displayStatusMenu() {
    if (showStatus) {
        document.getElementById("number-boids-display").innerHTML = "Number of Birds: " + boidNumber;
        document.getElementById("boid-size-display").innerHTML = "Bird Size: " + boidSize;
        document.getElementById("boid-velocity-display").innerHTML = "Bird Velocity: " + velocity.toFixed(1);
        document.getElementById("interaction-radius-display").innerHTML = "Interaction Radius: " + interactionRadius;
        document.getElementById("boid-noise-display").innerHTML = "Noise: " + noise.toFixed(2);
    }
}

// --------------------------------- FOCUS ----------------------------------
// draw an identifier arond focused boid and connect with straight lines to its neighbors
function drawFocus() {
    if (showFocus) {
        ctx.beginPath();
        ctx.setLineDash([]);
        ctx.arc(x_positions[focusedBoid], y_positions[focusedBoid], interactionRadius, 0, 2 * PI);
        ctx.strokeStyle = "#FFFF00";
        ctx.stroke();

        for (let b = 0; b < boidNumber; b++) {
            let distance =
                pow(x_positions[b] - x_positions[focusedBoid], 2) +
                pow(y_positions[b] - y_positions[focusedBoid], 2);
            if (distance < interactionRadius ** 2 && distance > 0) {
                ctx.beginPath();
                ctx.moveTo(x_positions[focusedBoid], y_positions[focusedBoid]);
                ctx.lineTo(x_positions[b], y_positions[b]);
                ctx.strokeStyle = "#FFFF00";
                ctx.stroke();
                ctx.closePath();
            }
        }
    }
}

// modal that includes: position, angle, neighbors and quadrant
function displayFocusMenu() {
    if (showFocus) {
        let focusBird = document.getElementById("focus-boid-display");
        focusBird.innerHTML = "Bird " + focusedBoid;
        document.getElementById("boid-position-display").innerHTML = "Position: (" + x_positions[focusedBoid].toFixed(0) + ", " + y_positions[focusedBoid].toFixed(0) +")";
        document.getElementById("boid-angle-display").innerHTML = "Angle: " + theta[focusedBoid].toFixed(2);
        document.getElementById("boid-neighbors-display").innerHTML = "Neighbors: " + neighbor_array[focusedBoid];
        document.getElementById("boid-quadrant-display").innerHTML = "Quadrant: " + getQuadrant(focusedBoid);
    }
}