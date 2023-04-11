class Paddle {
  constructor() {
    this.w = 15;
    this.h = 100;
    
    this.x = this.w / 2;
    this.y = height/2;
  }
  update() {
    this.y = mouseY;
  }
  display() {
    fill(0,150,255);
    noStroke();
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h);
  }
}

