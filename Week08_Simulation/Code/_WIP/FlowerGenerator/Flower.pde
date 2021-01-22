
class Flower {
  PVector center;
  
  float diskRadius = 100;
  
  float rayFloretLength = 150;
  float rayFloretWidth =  30;
  
  float stemWidth = diskRadius/3;
  
  
  Flower(float x, float y) {
    center = new PVector(x, y);
  }
  
  
  void display() {
    fill(0,150,0);
    rect(center.x-stemWidth/2,center.y, stemWidth,height);
    
    pushMatrix();
    translate(center.x, center.y);
    
    float angle = 0;
    while (angle < TWO_PI*3) {
      pushMatrix();
      rotate(angle);
      translate(0, -diskRadius-rayFloretLength/2.4);
      
      fill(230,230,0, 200);
      ellipse(0,0, rayFloretWidth, rayFloretLength);
      
      popMatrix();
      
      angle += radians(23);
    }
    
    fill(180,180,0);
    circle(0,0, diskRadius*2);
    
    popMatrix();
  }  
}
  
