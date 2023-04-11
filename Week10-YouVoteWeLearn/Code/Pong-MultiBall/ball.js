class Ball {
  constructor() {
    this.dia = 20;
    this.respawn();
  }
  update() {
    this.position.add(this.speed);

    // collision with paddle, reverse!
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
      random(-2, -5),
      random(-5, 5)
    );
  }
  checkCollision(p) {
    if (this.position.x - this.dia/2 < p.x + p.w/2 &&
        this.position.y > p.y - p.h/2 &&
        this.position.y < p.y + p.h/2 &&
        this.speed.x < 0) {
          return true;
    }
    return false;
  }
}

