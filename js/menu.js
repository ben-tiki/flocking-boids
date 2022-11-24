// set slider initial values
document.getElementById("boids-number").value = boidNumber;
document.getElementById("boids-velocity").value = velocity;
document.getElementById("boids-interaction-radius").value = interactionRadius;
document.getElementById("boids-noise").value = noise;
document.getElementById("boids-size").value = boidSize;

// populate the menu information with the current values
document.getElementById("boids-number-value").innerHTML = boidNumber;
document.getElementById("boids-velocity-value").innerHTML = velocity;
document.getElementById("boids-interaction-radius-value").innerHTML = interactionRadius;
document.getElementById("boids-noise-value").innerHTML = noise;
document.getElementById("boids-size-value").innerHTML = boidSize;

document.getElementById("spawn-options").value = startingPosition;
document.getElementById("color-options").value = colorOption;


// sync sliders
document.getElementById("boids-number").addEventListener("input", function () {
    boidNumber = parseInt(this.value);
    startingPosition = document.getElementById("spawn-options").value;
    if (boidNumber > x_positions.length) {
        for (let i = x_positions.length; i < boidNumber; i++) {
            x_positions[i] = Math.random() * canvas.width;
            y_positions[i] = Math.random() * canvas.height;
            theta[i] = Math.random() * 2 * Math.PI;
            vector_x[i] = Math.cos(theta[i]);
            vector_y[i] = Math.sin(theta[i]);
        }
    }
    document.getElementById("boids-number-value").innerHTML = boidNumber;
});