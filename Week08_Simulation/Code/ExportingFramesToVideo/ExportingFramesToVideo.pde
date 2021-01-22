
/*
EXPORTING FRAMES TO VIDEO
Jeff Thompson | 2020 | jeffreythompson.org

Want to create a video of a sketch but it runs too
slowly? Have thousands of objects you're simulating
and your computer bogs down? Trying to optimize sketches
to run in real-time can be incredibly challenging, but
exporting frames to video can be a great solution.

In this example, we render enough frames for 30 seconds
of video, which we can then combine into a video file.

Some other benefits of saving frames instead of
running your sketch in real-time includes:
+ Can be any resolution! Even if you don't have a 4k 
  monitor you can create videos at that resolution.
+ Sometimes it's faster! If we run our sketch in setup()
  only, Processing doesn't actually have to display
  the frames, which can make the sketch run faster.

TO CREATE YOUR VIDEO
1. Install ffmpeg, a command-line tool for video
   - Mac: install Homebrew, then the command "brew install ffmpeg"
   - PC: go to the FFMPEG site and download the pre-compiled version
   - Linux: run "sudo apt-get install ffmpeg"
2. In your terminal, navigate to your sketch's folder
3. FFMPEG has lots of options, but try this:
   
     ffmpeg -y -r 24 -i output/%06d.png -c:v libx264 -profile:v high 
     -crf 20 -pix_fmt yuv420p MySweetVideo.mp4

4. Hit return; it may take a while to render but you should see
   lots of text scroll by – if it ends without an error, you're
   all set! (try previewing your video file to be sure)

CHALLENGES
+ Can you convert an old sketch of yours to render frames at a higher
  resolution?
+ Can you add feedback while the rendering is happening, using the
  println() command?

*/


int fps =       24;        // what frame rate do we want for our video?
int duration =  10;        // video duration in seconds

// calculate the number of frames to render – this is
// the desired frame-rate of the video * duration in seconds
int numFrames = duration * fps;


void setup() {
  
  // larger than we might be able to see on
  // our monitor!
  size(3840, 2160);    // 4k video
  
  // render some frames!
  // this is done in a separate function, making the setup()
  // easy to read, but you could also do it here too
  println("rendering frames...");
  for (int i=1; i<=numFrames; i++) {
    println(i + " / " + numFrames);
    renderFrame(i);
  }
  
  // having some kind of feedback using println() is really
  // helpful, especially since we can't see anything onscreen
  // while the sketch is running – helps us see how much time
  // is left and if the sketch has crashed
  
  // when done, quit – not we don't run anything
  // in the draw() since we don't care about seeing
  // the frames as they are recorded
  exit();
}


void renderFrame(int whichFrame) {
  background(50);
  
  // do something computationally complex
  // (well, or at least time consuming: here we draw a bunch
  // of squares slowly rotating)
  float spacing = 50;
  for (float y=spacing; y<height-spacing; y+=spacing) {
    for (float x=spacing; x<width-spacing; x+=spacing) {
      pushMatrix();
      translate(x, y);
      float angle = map(whichFrame, 0,numFrames, 0,TWO_PI) + map(x, spacing,width-spacing, 0,TWO_PI);
      rotate(angle);
      fill(255);
      noStroke();
      rectMode(CENTER);
      square(0,0, spacing/2);
      popMatrix();
    }
  }
  
  // save the frame to file
  // note we put the frames in a folder (which keeps your
  // sketch folder from getting all cluttered up) and we
  // use sequential filenames, which will be key when
  // converting them to video later!
  // (the nf() command adds zeroes to a number, which help
  // keep them in order – ie so that 10 isn't followed by 100)
  String folder = "output/";
  String filename = nf(whichFrame, 6) + ".png";
  save(folder + filename);
}
