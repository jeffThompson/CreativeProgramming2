
/*
OBJECT-ORIENTED REFRESHER (with bonus snowstorm simulation)
Jeff Thompson | 2019/20 | jeffreythompson.org

For many projects, non-object-oriented code is totally adequate.
But as your projects get more complicated, using thinking about
how to divide things up with classes is well worth the effort. It
helps prevent spaghetti code that's difficult to update and let's
you easily clone hundreds or thousands of instances!

Here, we create a snowfall simulator. This is a fun little project
that quickly shows how many different variables you can add and
the ways that one variable can affect another. For example, the
wind's force can proportionately change the speed and direction
that a snowflake rotates! Subtle, but adds a lot.

This example assumes you already know the basics of how classes
work in Java, how to instantiate them and create/use methods.
If you need a refresher on the basics, see:
https://github.com/jeffThompson/CreativeProgramming1/tree/master/
Code/Week10_ObjectOrientedProgramming

CHALLENGES:
+ What other parameters can you add to the Snowflake class? What
  about randomized transparency or little doodads on the ends of
  each point?
+ Can you make the snowflakes "stick" to the ground instead of
  being deleted? (Hint: you could have their position stay fixed,
  but eventually your computer would slow down. Instead, try
  creating a PGraphics object and draw the flake to it.)

*/


int numFlakes = 500;          // how many snowflakes to generate

ArrayList<Snowflake> flakes;  // list of snowflake objects
Wind wind;                    // wind to apply to snowflakes


void setup() {
  size(800, 800);
  surface.setLocation(displayWidth,0);
  noCursor();
  
  // create an ArrayList of Snowflake objects
  flakes = new ArrayList<Snowflake>();
  for (int i=0; i<numFlakes; i++) {
    Snowflake f = new Snowflake();
    flakes.add(f);
  }
  
  // create Wind object too
  wind = new Wind();
}


void draw() {
  background(30, 40, 50);
  
  // update the wind's force
  wind.update();
  
  // go through all the snowflakes
  for (int i=0; i<flakes.size(); i++) {
    Snowflake f = flakes.get(i);
    
    // update their position and draw them
    f.update(wind);
    f.display();
    
    // if they're past the bottom of the screen,
    // remove them from the list and create a new one
    if (f.pos.y > height + f.outerRadius) {
      flakes.remove(i);
      flakes.add(new Snowflake());
    }
  }
}


// press any key to restart the simulation
void keyPressed() {
  setup();
}
