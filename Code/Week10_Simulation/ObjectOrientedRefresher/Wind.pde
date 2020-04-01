
class Wind {
  
  // Perlin-noise driven wind!
  
  float speedInc =       0.03;    // max amt change each frame
  float maxSpeed =       0.8;     // total max wind speed
  
  float noiseOffset =    0;       // position in the Perlin noise
  float noiseIncrement = 0.1;     // speed to step through the noise
  
  PVector force;                  // final computed wind force
  
  
  Wind() {
    
    // not much here – start the wind's force at 0
    force = new PVector(0,0);    
  }
  
  
  void update() {
    
    // update the value from Perlin noise
    noiseOffset += noiseIncrement;
    float noiseValue = noise(noiseOffset);
    
    // convert the Perlin noise value (0-1) to the
    // desired wind speed
    force.x += map(noiseValue, 0,1, -speedInc,speedInc);
    
    // finally, make sure the wind stays within the 
    // desired range (otherwise it can get really huge)
    force.x = constrain(force.x, -maxSpeed, maxSpeed);
  }
}
