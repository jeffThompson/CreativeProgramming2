
void found(int i) {
  println("found: " + i);
  found = i;
}

void poseScale(float s) {
  println("scale: " + s);
  poseScale = s;
}

void posePosition(float x, float y) {
  println("pose position\tX: " + x + " Y: " + y );
  posePosition.set(x, y, 0);
}

void poseOrientation(float x, float y, float z) {
  println("pose orientation\tX: " + x + " Y: " + y + " Z: " + z);
  poseOrientation.set(x, y, z);
}

void mouthWidthReceived(float w) {
  println("mouth Width: " + w);
  mouthWidth = w;
}

void mouthHeightReceived(float h) {
  println("mouth height: " + h);
  mouthHeight = h;
}

void eyeLeftReceived(float f) {
  println("eye left: " + f);
  eyeLeft = f;
}

void eyeRightReceived(float f) {
  println("eye right: " + f);
  eyeRight = f;
}

void eyebrowLeftReceived(float f) {
  println("eyebrow left: " + f);
  eyebrowLeft = f;
}

void eyebrowRightReceived(float f) {
  println("eyebrow right: " + f);
  eyebrowRight = f;
}

public void jawReceived(float f) {
  println("jaw: " + f);
  jaw = f;
}

void nostrilsReceived(float f) {
  println("nostrils: " + f);
  nostrils = f;
}

// all other OSC messages end up here
void oscEvent(OscMessage m) {
  if (m.isPlugged() == false) {
    println("UNPLUGGED: " + m);
  }
}
