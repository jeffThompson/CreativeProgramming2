
// functions called when we receive an OSC message
// each of these looks for the address pattern listed in setup()
// and passes the value received to the appropriate variable

public void found(int numFound) {
  if (numFound > 0) {
    println("\n" + "found: " + numFound + " face(s)");
  }
  numFacesFound = numFound;
}

public void poseScale(float s) {
  println("- scale:             " + s);
  poseScale = s;
}

public void posePosition(float x, float y) {
  println("- pose position:     " + x + ", " + y );
  posePosition.set(x, y, 0);
}

public void poseOrientation(float x, float y, float z) {
  println("- pose orientation:  " + x + ", " + y + ", " + z);
  poseOrientation.set(x, y, z);
  
  // calculate the angle of the face too
  angle = atan2(poseOrientation.y, poseOrientation.x);
  println("- face angle:        " + degrees(angle) + "º");
}

public void mouthWidthReceived(float w) {
  println("- mouth width:       " + w);
  mouthWidth = w;
}

public void mouthHeightReceived(float h) {
  println("- mouth height:      " + h);
  mouthHeight = h;
}

public void eyeLeftReceived(float f) {
  println("- eye left:          " + f);
  eyeLeft = f;
}

public void eyeRightReceived(float f) {
  println("- eye right:         " + f);
  eyeRight = f;
}

public void eyebrowLeftReceived(float f) {
  println("- eyebrow left:      " + f);
  eyebrowLeft = f;
}

public void eyebrowRightReceived(float f) {
  println("- eyebrow right:     " + f);
  eyebrowRight = f;
}

public void jawReceived(float f) {
  println("- jaw:               " + f);
  jaw = f;
}

public void nostrilsReceived(float f) {
  println("- nostrils:          " + f);
  nostrils = f;
}

public void rawReceived(float[] points) {
  //printArray(points);
  rawFace = points;
}

// all other OSC messages end up here
void oscEvent(OscMessage m) {
  //if(m.isPlugged() == false) {
  //  println("\n" + "UNPLUGGED: " + m + "\n");
  //}
}
