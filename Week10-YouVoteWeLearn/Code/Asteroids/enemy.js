class Enemy {
  constructor() {
    this.position = createVector(
      random(50, width-50),
      random(50, height-50)
    );
    this.dia = int(random(10, 30));
    
    this.angle = random(0, TWO_PI);
    this.rotationSpeed = radians(random(-2,2));
    
    // keep track of whether this enemy has been
    // hit or not
    this.isHit = false;
  }
  update() {
    // spin around!
    this.angle += this.rotationSpeed;

    // check if hit by a bullet
    for (let i=0; i<bullets.length; i++) {
      // vectors give us a really easy way to calculate distance!
      let d = this.position.dist(bullets[i].position);
      
      // if the distance is less than the enemy's diameter,
      // it's a hit! (and return immediately to avoid any
      // unecessary looping))
      if (d < this.dia/2) {
        this.isHit = true;
        return;
      }
    }
  }
  display() {
    push();
    translate(this.position.x, this.position.y);
    rotate(this.angle);
    fill(0,150,255);
    noStroke();
    rectMode(CENTER);
    square(0,0, this.dia);
    pop();
  }
}

