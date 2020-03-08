
import netP5.*;
import oscP5.*;

OscP5 osc;
int found;

// pose
float poseScale;
PVector posePosition = new PVector();
PVector poseOrientation = new PVector();

// gesture
float mouthHeight, mouthWidth;
float eyeLeft, eyeRight;
float eyebrowLeft, eyebrowRight;
float jaw;
float nostrils;


void setup() {
  size(640, 480, P3D);

  osc = new OscP5(this, 8338);
  osc.plug(this, "found", "/found");
  osc.plug(this, "poseScale", "/pose/scale");
  osc.plug(this, "posePosition", "/pose/position");
  osc.plug(this, "poseOrientation", "/pose/orientation");
  osc.plug(this, "mouthWidthReceived", "/gesture/mouth/width");
  osc.plug(this, "mouthHeightReceived", "/gesture/mouth/height");
  osc.plug(this, "eyeLeftReceived", "/gesture/eye/left");
  osc.plug(this, "eyeRightReceived", "/gesture/eye/right");
  osc.plug(this, "eyebrowLeftReceived", "/gesture/eyebrow/left");
  osc.plug(this, "eyebrowRightReceived", "/gesture/eyebrow/right");
  osc.plug(this, "jawReceived", "/gesture/jaw");
  osc.plug(this, "nostrilsReceived", "/gesture/nostrils");
}


void draw() {  
  background(255);
  
  if (found > 0) {
    translate(posePosition.x, posePosition.y);
    scale(poseScale);
    
    stroke(0);
    noFill();
    ellipse(-20, eyeLeft * -9, 20, 7);
    ellipse(20, eyeRight * -9, 20, 7);
    ellipse(0, 20, mouthWidth* 3, mouthHeight * 3);
    ellipse(-5, nostrils * -1, 7, 3);
    ellipse(5, nostrils * -1, 7, 3);
    
    rectMode(CENTER);
    fill(0);
    rect(-20, eyebrowLeft * -5, 25, 5);
    rect(20, eyebrowRight * -5, 25, 5);
  }
}
