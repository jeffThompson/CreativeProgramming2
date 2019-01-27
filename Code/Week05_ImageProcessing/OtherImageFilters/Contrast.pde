
PImage contrast(PImage in, float amount) {
  
  /*
  Contrast is the amount of variation between light and
  dark in an image – higher contrast means lighter lights 
  and darker darks. The math of this is a bit tricky, but 
  that's why the internet exists, right?
  
  Mostly via this example:
  http://stackoverflow.com/q/13500289/1167783
  */
  
  // calculate the amount of contrast based on mouse position
  // 0-4 is what our algorithm expects, so convert to that
  amount = map(amount, -255,255, 0,4);

  // go through each pixel and modify
  for (int i=0; i<in.pixels.length; i++) {
    float r = in.pixels[i] >> 16 & 0xFF;
    float g = in.pixels[i] >> 8 & 0xFF;
    float b = in.pixels[i] & 0xFF;
    
    // map RGB values to a range of 0–1
    r = map(r, 0,255, 0,1);
    g = map(g, 0,255, 0,1);
    b = map(b, 0,255, 0,1);
    
    // apply the formula for changing contrast
    r = (((r - 0.5) * amount) + 0.5) * 255.0;
    g = (((g - 0.5) * amount) + 0.5) * 255.0;
    b = (((b - 0.5) * amount) + 0.5) * 255.0;
    
    // make sure we don't go past 0-255 range
    r = constrain(r, 0,255);
    g = constrain(g, 0,255);
    b = constrain(b, 0,255);
    
    // update the pixel value
    in.pixels[i] = color(r, g, b);
  }
  in.updatePixels();
  
  // send back the filtered image
  return in;
}