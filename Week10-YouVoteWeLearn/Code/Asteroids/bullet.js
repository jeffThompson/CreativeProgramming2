class Bullet {
  constructor(ship) {
    // set the bullet's position to the ship
    // (we have to use copy() otherwise the
    // ship will move with the bullet!)
    this.position = ship.position.copy();

    // fancy math!
    // this calculates the amount we need to move
    // the bullet in x/y to travel at a particular angle
    // we give it the ship's angle, then multiply by
    // 5 (or any other number) to give it a speed
    this.speed = createVector(
      cos(ship.angle) * 5,
      sin(ship.angle) * 5
    );
  }
  update() {
    this.position.add(this.speed);
  }
  display() {
    fill(255, 150, 0);
    noStroke();
    circle(this.position.x, this.position.y, 8);
  }
}

