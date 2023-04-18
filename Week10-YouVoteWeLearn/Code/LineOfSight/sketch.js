/*
LINE OF SIGHT
Jeff Thompson | 2015/21 | www.jeffreythompson.org

Hide behind objects! This example uses a simple algorithm to
test of you can be seen by drawing a line between you and
another object – if that line collides with an obstacle, you 
are hidden; if not, you can be seen. This can be useful if you
want something to change behavior if it can see an object.

To test if an object is visible, we just check line/line 
collision between the line-of-sight and all four edges of 
the object. For more collision detection examples, see: 
http://jeffreythompson.org/collision-detection

CHALLENGES
1. Can you wrap up the four line/line tests into a 
   single function?
2. This system isn't quite perfect, especially when you're 
   right at the edge of the obstacle. Can you come up with 
   a better test that takes this into account? Hint: try two 
   lines that are tangent to "you".
3. Can you make this work if the obstacle is rotated?

*/

let obstacleSize = 300;    // size of the obstacle you can hide behind

let you, other, obstacle;  // position for you, the other person, and the obstacle
let feedbackText;          // text to display if you're seen or hidden


function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // initial location for everything
  you =      createVector(100, 100);
  other =    createVector(width-100, height-100);
  obstacle = createVector(width/2, height/2);
  
  // font setup
  textFont('Georgia');
  textSize(24);
  textAlign(CENTER, BOTTOM);
}


function draw() {
  background(50);
  
  // obstacle
  noStroke();
  fill(255,150,150);
  rectMode(CENTER);
  rect(obstacle.x, obstacle.y, obstacleSize,obstacleSize);
  rectMode(CORNER);
  
  // you
  you.x = mouseX;
  you.y = mouseY;
  fill(255,0,0);
  circle(you.x, you.y, 50);
  
  // other
  fill(0,150,255);
  circle(other.x, other.y, 50);
  
  // line between the two
  // (not necessary, just for visualizing)
  stroke(255,150);
  line(you.x, you.y, other.x, other.y);
  
  // check if in line of sight – if ANY of these 
  // are true, you are hidden
  let top = lineLine(
    you.x, you.y, 
    other.x, other.y, 
    obstacle.x-obstacleSize/2, obstacle.y-obstacleSize/2, 
    obstacle.x+obstacleSize/2, obstacle.y-obstacleSize/2
  );
  let left = lineLine(
    you.x, you.y, 
    other.x, other.y, 
    obstacle.x+obstacleSize/2, obstacle.y-obstacleSize/2, 
    obstacle.x+obstacleSize/2, obstacle.y+obstacleSize/2
  );
  let bottom = lineLine(
    you.x, you.y, 
    other.x, other.y, 
    obstacle.x-obstacleSize/2, obstacle.y+obstacleSize/2, 
    obstacle.x+obstacleSize/2, obstacle.y+obstacleSize/2
  );
  let right = lineLine(
    you.x, you.y, 
    other.x, other.y, 
    obstacle.x-obstacleSize/2, obstacle.y-obstacleSize/2, 
    obstacle.x-obstacleSize/2, obstacle.y+obstacleSize/2
  );
  
  // change text at bottom depending on whether you 
  // are seen or not
  if (top || left || bottom || right) {
    feedbackText = 'Where did you go?';
  }
  else {
    feedbackText = 'I see you!';
  }
  
  // display hidden or seen text
  fill(255);
  noStroke();
  text(feedbackText, width/2, height-50);
}


// find if our line of sight is hitting one of the 
// edges of the obstacle
function lineLine(x1, y1, x2, y2, x3, y3, x4, y4) {
  let uA = ((x4-x3)*(y1-y3) - (y4-y3)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
  let uB = ((x2-x1)*(y1-y3) - (y2-y1)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
  
  // collision?
  if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
    return true;
  }
  else {
    return false;
  }
}



