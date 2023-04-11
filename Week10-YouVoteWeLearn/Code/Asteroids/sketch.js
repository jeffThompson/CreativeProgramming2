/*
ASTEROIDS
Jeff Thompson | 2013 | jeffreythompson.org

https://freeasteroids.org

See the other Javascript files for more details!

CHALLENGES
1. Can you draw a more interesting shape for our
   asteroids? (Hint: try using randomized vertices,
   created in the constructor))
2. Can you make the asteroids move across the 
   screen? Can you remove them if they go offscreen?
3. Could you limit the number of bullets available?

*/

let ship;
let bullets;
let enemies;
let score = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noCursor();

  // create our ship in the center
  ship = new Ship();

  // and an empty list of bullets
  bullets = [];

  // make a few enemies too
  enemies = [];
  for (let i=0; i<3; i++) {
    let e = new Enemy();
    enemies.push(e);
  }
}

function draw() {
  background(220);

  fill(0);
  noStroke();
  text('SCORE: ' + score, 15,20);
  
  // use left/right to rotate the ship,
  // up to move forward
  // note: keyIsDown() lets us check for
  // multiple key presses at once!
  if (keyIsDown(UP_ARROW)) {
    ship.update(MOVE);
  }
  if (keyIsDown(LEFT_ARROW)) {
    ship.update(LEFT);
  }
  if (keyIsDown(RIGHT_ARROW)) {
    ship.update(RIGHT);
  }
  if (keyIsDown(32)) {         // 32 = space in ASCII
    let b = new Bullet(ship);
    bullets.push(b);
  }
  ship.display();

  // update and draw the bullets
  for (let i=0; i<bullets.length; i++) {
    bullets[i].update();
    bullets[i].display();
  }

  // and finally go through the enemies!
  // note we do this in reverse order; this is
  // so we can remove one that is hit (trying
  // this in normal order would cause an error,
  // since the length of the list would change!)
  for (let i=enemies.length-1; i>=0; i-=1) {
    enemies[i].update();

    // the isHit variable will be set to true
    // in the update() function if it hits an enemy
    if (enemies[i].isHit) {
      // remove the current enemy from the list!
      // (and update the score)
      enemies.splice(i, 1);
      score += 1;
    }
    // if not hit, display as usual
    else {
      enemies[i].display();
    }
  }

  // randomly generate some new enemies
  // (or when we've destroyed them all!)
  if (random(0, 100) < 0.5 || enemies.length === 0) {
    enemies.push(new Enemy());
  }
}

