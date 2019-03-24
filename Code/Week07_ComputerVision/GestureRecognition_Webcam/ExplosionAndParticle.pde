
// Explosion objects – by using a class we can keep track
// of each of these individually and give them unique attributes
// like the number of particles and its lifespan
class Explosion {
  
  long startTime;        // keep track of when the explosion started*
  long lifespan;         // random lifespan for when it should be deleted
  long age;              // current age of the explosion
  
  // *why are these all "long" variables
  // since time is measured in milliseconds since the program started,
  // time values can get really big really fast
  // a "long" is an integer that can get larger than the standard int
  // making it perfect for keeping track of time!
  
  Particle[] particles;  // array of Particle objects (see below)
  
  
  Explosion(float x, float y) {
    
    // create a random number of particles for this explosion
    particles = new Particle[ int(random(20,200)) ];
    for (int i=0; i<particles.length; i++) {
      particles[i] = new Particle(x,y);
    }   
    
    // save the current time as its start and set a random lifespan
    startTime = millis();
    lifespan = int(random(3000,8000));    // 3-8 seconds
  }
  
  void update() {
    age = millis()-startTime;        // keep track of the explosion's age
    for (Particle p : particles) {   // update (move) each of the particles
      p.update();
    }
  }
  
  void display() {
    for (Particle p : particles) {
      p.display();
    }
  }
}


// each explosion has an array of Particle objects!
class Particle {
  
  PVector pos;        // current position of the particle
  PVector velocity;   // it's speed/direction
  float dia;          // diameter (randomly set below)
  
  
  Particle (float x, float y) {
    
    // start at explosion's center (plus a little random offset)
    pos = new PVector(x+random(-3,3), y+random(-3,3));
    
    // give the particle a random speed and diameter
    velocity = new PVector( random(-8,8), random(-8,8) );
    dia = random(2,10);
  }
  
  void update() {
    pos.add(velocity);
  }
  
  void display() {
    fill(255,200);
    noStroke();
    ellipse(pos.x, pos.y, dia,dia);
  }
}
