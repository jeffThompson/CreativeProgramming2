
import gab.opencv.*;
import processing.video.*;

/*
VIDEO TO OPENCV
Jeff Thompson | 2020 | jeffreythompson.org

In addition to capturing from the webcam, we can also use
OpenCV to processing video files! This is great if you want
to use found footage or capture something that would be
difficult to use in real-time: dancers, animals, etc.

The process is basically the same, though: load a video file,
get a frame, and send that to OpenCV for processing.

*/


Movie mov;    // object for loading/playing movie
OpenCV cv;


void setup() {
  size(640, 360);

  // load the movie file and play it
  mov = new Movie(this, sketchPath("transit.mov"));   
  mov.play();
  mov.jump(0);   // start at the first frame
  mov.loop();    // loop it too!
}


void draw() {
  if (mov.available()) {
    
    // read the frame, display onscreen, and pass
    // to OpenCV
    mov.read();
    image(mov, 0,0);
    cv = new OpenCV(this, get(0,0,width,height));
    
    // after this, you can do the preprocessing, blob
    // tracking, etc like in the examples
    cv.brightness(100);
    cv.threshold(150);
    image(cv.getOutput(), 0, 0);
  }
}
