class Ship {
  constructor() {
    this.speed = 3;
    this.angleIncrement = radians(3);
    this.position = createVector(width/2, height/2);
    this.angle = 0;
  }
  update(direction) {
    // MOVE for forward!
    // (kind of a hack, MOVE is a keyword usually
    // used to set the mouse cursor!)
    if (direction === MOVE) {
      this.position.x += cos(this.angle) * this.speed;
      this.position.y += sin(this.angle) * this.speed;

      if (this.position.x < 0) this.position.x = width;
      else if (this.position.x > width) this.position.x = 0;
      if (this.position.y < 0) this.position.y = height;
      else if (this.position.y > height) this.position.y = 0;
    }
    // RIGHT for clockwise, LEFT for counter-clockwise
    else if (direction === RIGHT) {
      this.angle += this.angleIncrement;
    }
    else if (direction === LEFT) {
      this.angle -= this.angleIncrement;
    }
  }
  display() {
    push();
    translate(this.position.x, this.position.y);
    rotate(this.angle);
    fill(0);
    noStroke();
    triangle(
      -10,  -10,
       10,   0,
      -10,   10
    );
    pop();
  }
}

