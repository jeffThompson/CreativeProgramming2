/*
BLOB DETECTION
Jeff Thompson | 2021 | jeffreythompson.org

Note! This example doesn't run super well in the
p5.js Editor – you may have a better experience
downloading and running this example locally.

Color detection is super simple with basic p5.js
commands; object detection is really complicated
and uses neural networks trained on hundreds of
thousands of images. Somewhere in the middle is
blob detection, which looks for areas of black
in a thresholded image.

Try out different images to see the way this
handles them (and the limitations too)! Note
that this won't be great for realtime video
without some extra optimization.

REQUIRES
+ Hull.js by Andrii Heonia
  https://github.com/AndriiHeonia/hull

CHALLENGES
1. Can you feed your webcam into the blob
   detection? You'll probably need to...
   + Keep the video resolution low (but you can
     scale up the points to fit the screen)
   + Check if there is a video frame before
     trying to run blob detection
   + Play with the concavity and resolution
     parameters when finding the blob
*/

let img;

function preload() {
  img = loadImage('images/RegularBlob.jpg');
  // img = loadImage('images/BlobWithHoles.jpg');
  // img = loadImage('images/TwoBlobs.jpg');

  // will need to uncomment filter(INVERT) for
  // this one to work :)
  // img = loadImage('images/DogOnFloor.jpg');
}


function setup() {
  createCanvas(img.width, img.height);
  noLoop();
}


function draw() {
  image(img, 0,0);

  /* you'll likely need to do some pre-processing 
     before finding blobs...
     1. threshold: create a binary image
     2. invert:    if your blob is white not black (optional)
     3. dilate:    fill holes and smooth edges
  */
  filter(THRESHOLD, 0.7);
  // filter(INVERT);
  filter(DILATE);  // might need to do more than once

  /* find the blob!
     arguments:
     1. where to look for blobs
        this =        canvas's pixels
        image/video = pixels from that
     2. concavity of blob (optional, 20 default)
        lower = tighter but slower
     3. resolution for searching (optional, 1 default)
        1 = look at every pixel
        2 = every other pixel, etc
  */
  let blob = new Blob(this, 20, 4);
  console.log(blob);

  // draw the original image and dim a bit so 
  // we can see the outlines better
  image(img, 0,0);
  fill(255, 100);
  noStroke();
  rect(0,0, width,height);

  // draw the blob's outline
  stroke(255,150,0);
  strokeWeight(3);
  noFill();
  beginShape();
  for (let pt of blob.outline) {
    vertex(pt.x, pt.y);
  }
  endShape();

  // ...and it's convex hull (outline
  // but with no concave edges)
  stroke(0,150,255);
  beginShape();
  for (let pt of blob.convexHull) {
    vertex(pt.x, pt.y);
  }
  endShape();

  // ...and it's bounding box
  stroke(0,150,150);
  rect(blob.bbox.x,
       blob.bbox.y,
       blob.bbox.w,
       blob.bbox.h
  );

  // ...show the centroid too!
  noStroke();
  fill(0,150,255);
  circle(blob.centroid.x, blob.centroid.y, 10);
}


// takes in an image (or the canvas) and finds
// blobs, plus some extra info too
class Blob {
  constructor(src, concavity, resolution) {
    
    // optional:
    // concavity determines how tightly the
    // the outline will keep to the blob
    // lower = more accurate but slower
    this.concavity = concavity || 20;

    // optional:
    // normally we'd look at every pixel in
    // the image, but changing this will
    // decrease the resolution for faster
    // processing
    // 1 = every pixel (default)
    // 2 = every other, etc
    this.resolution = resolution || 1;
    
    // blob variables
    this.w;
    this.h;
    this.outline;     // outline of the blob
    this.convexHull;  // convex hull (outline with no concavity)
    this.bbox;        // bounding box too

    // find the blobs!
    this.getOutline(src);
    
    // calculate centroid and bounding box using
    // the convex hull points
    this.getCentroid(this.convexHull)
    this.getBoundingBox(this.convexHull);

    // calculate the area
    // (using either the outline or convex hull)
    this.area = this.getArea(this.outline);
  }

  // use hull.js to get the outline of the blob!
  getOutline(src) {

    // get all the black pixels in the image
    src.loadPixels();
    let pts = [];
    for (let y=0; y<src.height; y+=this.resolution) {
      for (let x=0; x<src.width; x+=this.resolution) {
        let index = (y * src.width + x) * 4;
        if (src.pixels[index] < 127) {
          pts.push( [x, y ] );
        }
      }
    }

    // get the outline and convex hull!
    this.outline = hull(pts, this.concavity);
    this.convexHull = hull(pts, Infinity);

    // hull.js gives us points as [ x, y ]
    // convert to vector array instead
    for (let i=0; i<this.outline.length; i++) {
      this.outline[i] = createVector(this.outline[i][0], this.outline[i][1]);
    }
    for (let i=0; i<this.convexHull.length; i++) {
      this.convexHull[i] = createVector(this.convexHull[i][0], this.convexHull[i][1]);
    }
  }

  // calculate the center of the blob
  // via: https://bell0bytes.eu/centroid-convex
  getCentroid(pts) {
    let centroidX =   0;
    let centroidY =   0;
    let determinant = 0;
    let j = 0;
    for (let i=0; i<pts.length; i++) {
      if (i+1 === pts.length) {
        j = 0;
      }
      else {
        j = i+1;
      }

      let tempDeterminant = pts[i].x * pts[j].y - pts[j].x * pts[i].y;
      determinant += tempDeterminant;

      centroidX += (pts[i].x + pts[j].x) * tempDeterminant;
      centroidY += (pts[i].y + pts[j].y) * tempDeterminant;
    }

    centroidX /= 3 * determinant;
    centroidY /= 3 * determinant;

    this.centroid = createVector(centroidX, centroidY);
  }

  // calculate the bounding box of the blob
  getBoundingBox(pts) {
    let minX = Number.MAX_VALUE;
    let maxX = Number.MIN_VALUE;
    let minY = Number.MAX_VALUE;
    let maxY = Number.MIN_VALUE;
    for (let pt of pts) {
      if (pt.x < minX) {
        minX = pt.x;
      }
      else if (pt.x > maxX) {
        maxX = pt.x;
      }
      if (pt.y < minY) {
        minY = pt.y;
      }
      else if (pt.y > maxY) {
        maxY = pt.y;
      }
    }
    this.bbox = {
      x: minX,
      y: minY,
      w: maxX - minX,
      h: maxY - minY
    };
  }

  // calculate area using the shoelace formula
  // (can pass in the outline or convex hull)
  getArea(pts) {
    let sum1 = 0;
    let sum2 = 0;
    for (let i=0; i<pts.length-1; i++) {
      sum1 = sum1 + pts[i].x * pts[i+1].y;
      sum2 = sum2 + pts[i].y * pts[i+1].x;
    }
    sum1 = sum1 + pts[pts.length-1].x * pts[0].y;
    sum2 = sum2 + pts[0].x * pts[pts.length-1].y;
    return abs(sum1-sum2) / 2;
  }
}

