
Flower flower;


void setup() {
  size(800, 800);
  surface.setLocation(displayWidth, 0);
  
  flower = new Flower(width/2, height/2);
}


void draw() {
  background(255);
  
  flower.display();
}


void keyPressed() {
  setup();
}
