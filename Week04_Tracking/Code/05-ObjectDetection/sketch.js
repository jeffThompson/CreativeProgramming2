/*
OBJECT DETECTION (with TensorFlow.js)
Jeff Thompson | 2021 | jeffreythompson.org

Note! This example doesn't run super well in the
p5.js Editor – you may have a better experience
downloading and running this example locally.

In the past few years, we've seen a huge jump in
performance and availability of new tools for
helping computers see and identify objects in the
world. This example uses TensorFlow.js, the
Javascript version of Google's widely-used (and
suuuuper complicated) library TensorFlow.

In this example, TensorFlow.js loads COCO (Common 
Objects in Context), a long-used machine-learning 
model sponsored by Microsoft and Facebook. It is 
trained on about 330k images of 91 different objects. 
For each image, a human drew an outline around that 
object, which is then fed into a neural network 
that crunched the pixels from all of those images, 
resulting in a rather compact 'model' that can be 
used on images the system has never seen before!

Another benefit to AI models like this is they
are really robust in all lighting conditions, 
unlike our color-tracking code! (Of course, as a
trade-off they are way more complicated, may have
bias in their training data, and can have a
negative environmental impact.)

More about COCO:
+ https://cocodataset.org
+ List of objects that COCO can identify
  in CocoObjects.txt (in this folder)

BASED ON
+ https://github.com/tensorflow/tfjs-models/tree/master/coco-ssd

CHALLENGES
1. Can you find the center of an object's bounding
   box and draw a shape there?
2. Can you watch for a specific object and use it's
   x/y (or center) coordinates to display a shape
   or image onscreen?
3. Can you create a loading screen while the model
   is being loaded?

*/

let video;  // webcam input
let model;  // coco-ssd model


function setup() {
  createCanvas(640, 480);

  // start video as usual
  video = createCapture(VIDEO);
  video.hide();

  // load the coco-ssd model (this can take
  // quite a while), when done, set our
  // model to the loaded one
  console.log('loading model...');
  cocoSsd.load().then(cocoSsd => {
    console.log('- loaded');
    model = cocoSsd;
  });

  // what's the weird => symbol mean?
  // it's an 'arrow function'!
  // read more about them here:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
}


function draw() {
  image(video, 0,0);

  // if the webcam is working and the model
  // has been loaded, go ahead...
  if (video.width > 0 && model !== undefined) {
    
    // tensorflow.js requires the input to
    // be in a specific format – we grab the
    // all the pixels (from 0,0 to width,height)
    // from 'drawingContext' (our canvas)...
    const imgData = drawingContext.getImageData(0,0, width, height);
    
    // ...and feed that into the model to 
    // find objects in the frame!
    model.detect(imgData).then(predictions => {
      
      // the predictions come back as a list
      for (let p of predictions) {
        
        // includes a bounding box
        // for the object
        let x = p.bbox[0];
        let y = p.bbox[1];
        let w = p.bbox[2];
        let h = p.bbox[3];
        stroke(255);
        noFill();
        rect(x,y, w,h);

        // as well as the name of the object
        // and a score (0–1), telling us the
        // confidence that this is correct
        fill(255);
        noStroke();
        text(p.class + ': ' + nf(p.score, 0,4), x+10,y+15);
      }
    });
  }
}

