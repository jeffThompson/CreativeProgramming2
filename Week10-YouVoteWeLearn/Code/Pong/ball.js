class Ball {
  constructor() {
    this.dia = 20;

    // set the initial position/speed
    this.respawn();
  }
  update() {
    // add the speed to the position to
    // move the ball (note the weird syntax
    // when using vectors))
    this.position.add(this.speed);

    // collision with paddle, reverse!
    // (and add 1 to the score)
    let hit = this.checkCollision(paddle);
    if (hit) {
      this.speed.x *= -1;
      score += 1;
    }
    // past left edge, respawn!
    // (and reduce score by 1)
    if (this.position.x < 0) {
      this.respawn();
      score -= 1;
    }
    // bounce off left edge
    if (this.position.x > width - this.dia/2) {
      this.speed.x *= -1;
    }
    // bounce off top/bottom too
    if (this.position.y < this.dia/2 || this.position.y > height - this.dia/2) {
      this.speed.y *= -1;
    }
  }
  display() {
    fill(0);
    noStroke();
    circle(this.position.x, this.position.y, this.dia);
  }
  respawn() {
    this.position = createVector(width-this.dia*2, height/2);
    this.speed = createVector(
      random(-2, -5),  // always to the left!
      random(-5, 5)
    );
  }
  checkCollision(p) {
    // this looks intimidating but is pretty
    // simple once you unpack it...
    // 1. if past the right edge of the paddle, AND
    // 2. below the top of the paddle, AND
    // 3. above the bottom of the paddle, AND 
    // 4. if moving left (helps prevent the dreaded
    //    wiggle when hitting the paddle)
    if (this.position.x - this.dia/2 < p.x + p.w/2 && 
        this.position.y > p.y - p.h/2 &&
        this.position.y < p.y + p.h/2 &&
        this.speed.x < 0) {
          // if all of those things are true,
          // return true!
          return true;
    }
    // otherwise, return false
    return false;
  }
}

