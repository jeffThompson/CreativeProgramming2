
// slightly modified from: 
// https://editor.p5js.org/kylemcdonald/sketches/rJg3gPc3Q
// that version via: 
// https://github.com/anvaka/oflow

// quickly copy image
function copyImage(src, dst) {
  let n = src.length;
  if (!dst || dst.length !== n) {
    dst = new src.constructor(n);
  }
  while (n--) {
    dst[n] = src[n];
  }
  return dst;
}


// quick way to check if two video frames
// are the same or not
function same(a1, a2, stride, n) {
  for (let i=0; i<n; i+=stride) {
    if (a1[i] !== a2[i]) {
      return false;
    }
  }
  return true;
}


// each region of flow in the image
class FlowZone {
  constructor (x, y, u, v) {
    this.pos = createVector(x, y);
    this.movement = createVector(u, v);
    this.angle = atan2(this.movement.y, this.movement.x);
    this.mag = dist(0,0, this.movement.x,this.movement.y);
  }
}


// calculates flow for the entire image
class FlowCalculator {
  constructor(step = 8) {
    this.step = step;
    this.zones;
    this.u;
    this.v;
  }

  // assumes rgba images, but only uses one channel
  calculate (oldImage, newImage, width, height) {
    var zones = [];
    var step = this.step;
    var winStep = step * 2 + 1;

    var A2, A1B2, B1, C1, C2;
    var u, v, uu, vv;
    uu = vv = 0;
    var wMax = width - step - 1;
    var hMax = height - step - 1;
    var globalY, globalX, localY, localX;

    for (globalY = step + 1; globalY < hMax; globalY += winStep) {
      for (globalX = step + 1; globalX < wMax; globalX += winStep) {
        A2 = A1B2 = B1 = C1 = C2 = 0;

        for (localY = -step; localY <= step; localY++) {
          for (localX = -step; localX <= step; localX++) {
            var address = (globalY + localY) * width + globalX + localX;

            var gradX = (newImage[(address - 1) * 4]) - (newImage[(address + 1) * 4]);
            var gradY = (newImage[(address - width) * 4]) - (newImage[(address + width) * 4]);
            var gradT = (oldImage[address * 4]) - (newImage[address * 4]);

            A2 += gradX * gradX;
            A1B2 += gradX * gradY;
            B1 += gradY * gradY;
            C2 += gradX * gradT;
            C1 += gradY * gradT;
          }
        }

        // system is not singular
        // (solving by Kramer method)
        var delta = (A1B2 * A1B2 - A2 * B1);
        if (delta !== 0) {
          var Idelta = step / delta;
          var deltaX = -(C1 * A1B2 - C2 * B1);
          var deltaY = -(A1B2 * C2 - A2 * C1);

          u = deltaX * Idelta;
          v = deltaY * Idelta;
        } 
        // singular system
        // (find optical flow in gradient direction)
        else {
          var norm = (A1B2 + A2) * (A1B2 + A2) + (B1 + A1B2) * (B1 + A1B2);
          if (norm !== 0) {
            var IGradNorm = step / norm;
            var temp = -(C1 + C2) * IGradNorm;

            u = (A1B2 + A2) * temp;
            v = (B1 + A1B2) * temp;
          } 
          else {
            u = v = 0;
          }
        }

        if (-winStep < u && u < winStep &&
            -winStep < v && v < winStep) {
          uu += u;
          vv += v;
          // let angle = atan2(globalY-v, globalX-u);
          zones.push(new FlowZone(globalX, globalY, u, v));
        }
      }
    }

    // the final data
    this.zones = zones;
    this.u = uu / zones.length,
    this.v = vv / zones.length
  }
}

