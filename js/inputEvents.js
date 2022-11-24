// -------------------------- KEYBOARD ------------------------------
const pause = () => {
    if (paused) {
        paused = false;
        document.getElementById("pause-info").style.visibility = "hidden";
        requestAnimationFrame(main);
    } else if (!paused) {
        paused = true;
        document.getElementById("pause-info").style.visibility = "visible";
    }
};

const reset = () => {
    elapsedTime = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (startingPosition in spawnOptionsDict) {
        spawnOptionsDict[startingPosition]();
    }
};

const addBird = () => {
    x_positions.push(Math.random() * canvas.width);
    y_positions.push(Math.random() * canvas.height);
    theta.push(Math.random() * PI * 2);
    vector_x.push(Math.cos(theta[theta.length - 1]) * velocity);
    vector_y.push(Math.sin(theta[theta.length - 1]) * velocity);
    boidNumber += 1;
};

const save = () => {
  let link = document.createElement("a");
  link.download = "canvas.png";
  link.href = canvas.toDataURL();
  link.click();
};

const removeBird = () => {
    if (boidNumber > 0) {
        x_positions.pop();
        y_positions.pop();
        theta.pop();
        vector_x.pop();
        vector_y.pop();
        boidNumber -= 1;
    }
};

const speedUp = () => {
    velocity += 0.1;
    for (let b = 0; b < boidNumber; b++) {
        vector_x[b] = Math.cos(theta[b]) * velocity;
        vector_y[b] = Math.sin(theta[b]) * velocity;
    }
};

const speedDown = () => {
    velocity -= 0.1;
    for (let b = 0; b < boidNumber; b++) {
        vector_x[b] = Math.cos(theta[b]) * velocity;
        vector_y[b] = Math.sin(theta[b]) * velocity;
    }
};

const upNoise = () => {
    noise += 0.1;
};

const downNoise = () => {
    if (noise > 0) {
        noise -= 0.1;
    }
};

const upInteractionRadius = () => {
    interactionRadius += 1;
};

const downInteractionRadius = () => {
    if (interactionRadius > 0) {
        interactionRadius -= 1;
    }
};

const upSize = () => {
    boidSize += 0.5;
};

const downSize = () => {
    if (boidSize > 0) {
        boidSize -= 0.5;
    }
};

const displayInteractionRadius = () => {
    showInteractionRadius = !showInteractionRadius;
};

const toggleOptions = () => {
    showMenu = !showMenu;
    if (showMenu == true) {
        document.getElementById("options-modal").style.visibility = "visible";
    }
    if (showMenu == false) {
        document.getElementById("options-modal").style.visibility = "hidden";
    }
};

const toggleStatus = () => {
    showStatus = !showStatus;
    if (showStatus == true) {
        document.getElementById("status-modal").style.visibility = "visible";
    }
    if (showStatus == false) {
        document.getElementById("status-modal").style.visibility = "hidden";
    }
};

const toggleFocusBird = () => {
    showFocus = !showFocus;

    if (showFocus == true) {
        document.getElementById("focus-modal").style.visibility = "visible";
    }
    if (showFocus == false) {
        document.getElementById("focus-modal").style.visibility = "hidden";
    }
};

const nextFocus = () => {
    if (focusedBoid < boidNumber - 1) {
        focusedBoid += 1;
    } else if (focusedBoid == boidNumber - 1) {
        focusedBoid = 0;
    }
};

const prevFocus = () => {
    if (focusedBoid > 0) {
        focusedBoid -= 1;
    } else if (focusedBoid == 0) {
        focusedBoid = boidNumber - 1;
    }
};

const hideAll = () => {
    showInteractionRadius = false;
    showMenu = false;
    showStatus = false;
    showFocus = false;
    document.getElementById("top-menu").style.visibility = "hidden";
    document.documentElement.style.cursor = "none";
};

// -------------------------- BINDINGS ------------------------------
// keybindings
const keyBindings = {
    r: reset,
    a: addBird,
    d: removeBird,
    s: save,
    "+": speedUp,
    "-": speedDown,
    m: upNoise,
    n: downNoise,
    k: upInteractionRadius,
    j: downInteractionRadius,
    ArrowUp: upSize,
    ArrowDown: downSize,
    i: displayInteractionRadius,
    o: toggleOptions,
    t: toggleStatus,
    f: toggleFocusBird,
    ArrowRight: nextFocus,
    ArrowLeft: prevFocus,
    p: pause,
    Escape: hideAll,
};

// keydown event listener
document.addEventListener("keydown", (event) => {
    const keyName = event.key;
    if (keyName in keyBindings) {
        keyBindings[keyName]();

        document.getElementById("boids-number").value = boidNumber;
        document.getElementById("boids-velocity").value = velocity;
        document.getElementById("boids-interaction-radius").value = interactionRadius;
        document.getElementById("boids-noise").value = noise;
        document.getElementById("boids-size").value = boidSize;

        document.getElementById("boids-number-value").innerHTML = boidNumber;
        document.getElementById("boids-velocity-value").innerHTML = velocity.toFixed(1);
        document.getElementById("boids-interaction-radius-value").innerHTML = interactionRadius;
        document.getElementById("boids-noise-value").innerHTML = noise.toFixed(1);
        document.getElementById("boids-size-value").innerHTML = boidSize;
    }
});

// ---------------------------- MOUSE -------------------------------
// top menu
const topMenu = document.getElementById("top-menu");
setTimeout(() => {
    topMenu.style.visibility = "hidden";
    document.documentElement.style.cursor = "none";
}, 6000);

// --------------------------- MODALS --------------------------------
document.getElementById("focus-icon").addEventListener("click", function () {
    showFocus = !showFocus;
    if (showFocus) {
        document.getElementById("focus-modal").style.visibility = "visible";
    } else {
        document.getElementById("focus-modal").style.visibility = "hidden";
    }
});

document.getElementById("status-icon").addEventListener("click", function () {
    showStatus = !showStatus;
    if (showStatus) {
        document.getElementById("status-modal").style.visibility = "visible";
    } else {
        document.getElementById("status-modal").style.visibility = "hidden";
    }
});

document.getElementById("options-icon").addEventListener("click", function () {
    showMenu = !showMenu;
    if (showMenu) {
        document.getElementById("options-modal").style.visibility = "visible";
    } else {
        document.getElementById("options-modal").style.visibility = "hidden";
    }
});

// --------------------------- BUTTONS -------------------------------
document.getElementById("boids-bounce").addEventListener("click", function () {
    wallCollision = true;
});

document.getElementById("boids-travel").addEventListener("click", function () {
    wallCollision = false;
});

document.getElementById("trail-none").addEventListener("click", function () {
    trailOption = "none";
});

document.getElementById("trail-soft").addEventListener("click", function () {
    trailOption = "soft";
});

document.getElementById("trail-hard").addEventListener("click", function () {
    trailOption = "hard";
});

document.getElementById("mouse-follow").addEventListener("click", function () {
    followMouse = true;
});

document.getElementById("mouse-ignore").addEventListener("click", function () {
    followMouse = false;
});

document.getElementById("color-options").addEventListener("change", function () {
    colorOption = document.getElementById("color-options").value;
});

document.getElementById("spawn-options").addEventListener("change", function () {
    startingPosition = document.getElementById("spawn-options").value;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (startingPosition in spawnOptionsDict) {
        spawnOptionsDict[startingPosition]();
    }
    for (let b = 0; b < boidNumber; b++) {
        theta[b] = Math.random() * Math.PI * 2;
        vector_x[b] = Math.cos(theta[b]) * velocity;
        vector_y[b] = Math.sin(theta[b]) * velocity;
    }
});

document.getElementById("control-keybind").addEventListener("click", function () {
    let keybinds = document.getElementById("key-bindings");
    if (keybinds.style.visibility == "hidden") {
        keybinds.style.visibility = "visible";
    } else {
        keybinds.style.visibility = "hidden";
    }
});

// --------------------------- MOUSE MMOVEMENT -----------------------
// add new boid on mouse coordinates on click
canvas.addEventListener("mousedown", function (e) {

  switch (paused){
    case true:
      paused = false;
      requestAnimationFrame(main);
      document.getElementById("pause-info").style.visibility = "hidden";
      break;

    case false:
      x_positions.push(e.clientX);
      y_positions.push(e.clientY);
      theta.push(Math.random() * PI * 2);
      vector_x.push(Math.cos(theta[theta.length - 1]) * velocity);
      vector_y.push(Math.sin(theta[theta.length - 1]) * velocity);
      boidNumber += 1;

      break;
  }
});

canvas.addEventListener("mousemove", function (event) {
    mouseX = event.clientX;
    mouseY = event.clientY;

    topMenu.style.visibility = "visible";
    document.documentElement.style.cursor = "auto";
});