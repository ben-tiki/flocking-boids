# Active Matter Simulation
The model uses Viscek's model of self-propelled particles. Generating "bird like" agents or boids that behave like a flock of birds or school of fish.

### Parameters: 
1. ```velocity```: speed in which the boids traverse the universe.
2. ```noise```: random movement or "mistakes" boids make when evaluating the direction of motion of their neighbors. 
3. ```boxSize```: Universe which the boids can travel and are confined to.
4. ```interactionRadius```: Distance in which another boid is considered a neighbor. Perception or sight of the boid.
5. ```boidNumber```: amount of boids to populate the simulation.
6. ```boidSize```: size of the boids on the simulation.

### The model is based on the following rules:
1. Each boid has a position, velocity, and perception radius.
2. If the distance between two boids is less than a certain threshold (our interactionRadius), then the boids are considered neighbors.
3. Boids will match their direction towards the average direction of their neighbors.

## My Implementation
This project was developed without any sort of libraries or imports (js, css).

Some of the unique features of my implementation are:
 - The ability to change the parameters of the simulation in real time using the GUI and keybindings.
 - Unique spawn positions. (forming spirals, circles, grids and other patterns).
 - Different color options to create unique visualizations. (color depending on direction, position, time, neighbors, etc.).
 - Boids can start forming a custom letter or phrase. 
 - Boids can either travel the universe borders or be confined to the borders.
 - Boids can follow the current mouse position.
 - Boids can leave a trail behind them (creating cool patterns).
 - Boids can be either circles or triangles.

 ## Cool Examples
https://user-images.githubusercontent.com/101474762/203870601-ed02cd3d-e87e-4504-8b7e-bfaf9768e1c9.mp4
