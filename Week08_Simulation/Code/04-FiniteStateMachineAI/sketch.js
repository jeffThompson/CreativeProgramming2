 /*
FINITE STATE MACHINE AI
Jeff Thompson | 2015/21 | www.jeffreythompson.org

A "finite state machine" or FSM is a way of conceptualizing an 
entity that has specific and discreet states - in other words, the 
object can only have one state at a time. With well-chosen states,
we can create complex-seeming behavior that can mimic physical
conditions (how the entity moves) or emotional states (angry, curious,
idle).

For example, we can think of a zombie, but you can substitute the 
"attack" langauge for any other kind of behavior. Here are some common
game AI states:

IDLE          just stays still, only aware if something engages it directly
AWARE         searches for intruders, notices things like open doors
INTRIGUED     knows something is happening, abandons path to seek
ALERT         aware of the player and begins hunting them down
AGGRESSIVE    actively attacking the player
FLEEING       runs away from the player
DEAD          no longer aware, but may be revived (depending on the game)

Let's simplify our system a bit. By combining triggers with the resulting
action, we have what's called a State/Even Table:

1. idle until player is within a certain range
2. if within range, moves towards the player
3. if close enough, attacks
4. when attack is finished, flee from the player

Implementing this in code is easier than you'd think – we just need
some if/else statements to control the behavior. This example uses 
the Vector object, so if you haven't read about that yet, take a look
at the p5.js examples or the "SeekAndFlee" example here.

SEE ALSO
+  http://en.wikipedia.org/wiki/Finite-state_machine
+  https://software.intel.com/en-us/articles/designing-artificial-
   intelligence-for-games-part-1
+  http://gamedevelopment.tutsplus.com/tutorials/finite-state-machines-
   theory-and-implementation--gamedev-11867

CHALLENGES
1. Can you trigger the "flee" state to be triggered when the player
   attacks, maybe by clicking or hitting the spacebar?
2. Can you give the zombie a better "idle" state? Hint: try "sin()"
3. Can you make lots of zombies who all "listen" to each other and change
   states based on the state of their neighbor? For example, if one zombie
   is in "seek" mode, all zombies seek to the target. It will likely help
   if you convert this code to an object-oriented approach.

*/

let zombieIdleSpeed =   2;  // how fast can the zombie move?
let zombieRunSpeed =    4;  // diff speeds give more nuanced behavior
let zombieAttackSpeed = 6;

let idle =    0;            // states could just be #s, but giving
let seek =    1;            // them names makes them easier to track
let attack =  2;
let flee =    4;
let state =   idle;         // set initial state to idle

let player, zombie;         // positions, set in setup()
let zombieColor;            // change color depending on the state


function setup() {
  createCanvas(windowWidth, windowHeight);
  cursor(CROSS);
  
  // initial positions, use the mouse to move
  player = createVector(50, 50);
  zombie = createVector(width/2, height/2);
}


function draw() {
  background(230);
  
  // draw player and update the position
  fill(0,150,255);
  noStroke();
  ellipse(player.x, player.y, 40,40);
  player.x = mouseX;
  player.y = mouseY;
  
  // set the zombie's state depending on distance
  let dist = player.dist(zombie);
  if (dist > 300)     state = idle;  // further than 300px, wander
  else if (dist < 20) state = flee;  // close enough to touch you, run away
  
  // if we're not currently fleeing but we're within range,
  // either seek or attack
  if (state != flee) {
    if (dist <= 300 && dist > 100) state = seek;
    else if (dist <= 100)          state = attack;
  }
  
  // based on current state of the zombie, exhibit different
  // behavior and change color to indicate the state...
  
  // randomly wander about, looking for the player
  if (state === idle) {  
    zombie.x += random(-zombieIdleSpeed, zombieIdleSpeed);
    zombie.y += random(-zombieIdleSpeed, zombieIdleSpeed);
    zombieColor = color(0);
  }
  
  // normal seek AI behavior – for a description, see the
  // "SeekAndFlee" example in this repo
  else if (state === seek) {
    let direction = p5.Vector.sub(player, zombie);
    direction.normalize();
    direction.mult(zombieRunSpeed);
    zombie.add(direction);
    zombieColor = color(150,0,0);    // dark red
  }
  
  // attack state is like seek, but at a different speed (set at top)
  else if (state === attack) {
    let direction = p5.Vector.sub(player, zombie);
    direction.normalize();
    direction.mult(zombieAttackSpeed);
    zombie.add(direction);
    zombieColor = color(255,0,0);    // angry bright red!
  }
  
  // flee is the opposite of seek - subtract to move away
  else if (state == flee) {
    let direction = p5.Vector.sub(player, zombie);
    direction.normalize();
    direction.mult(zombieRunSpeed);
    zombie.sub(direction);
    zombieColor = color(100);        // a cowardly blue-green
  }
  
  // draw the zombie
  fill(zombieColor);
  ellipse(zombie.x, zombie.y, 40,40);
}

