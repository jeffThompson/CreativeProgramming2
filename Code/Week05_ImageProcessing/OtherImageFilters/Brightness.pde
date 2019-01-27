
PImage brighten(PImage in, float amount) {
  
  // brightens individual pixels by a certain amount
  
  in.loadPixels();
  for (int i=0; i<in.pixels.length; i++) {
    
    // get the rgb values for this pixel
    float r = in.pixels[i] >> 16 & 0xFF;
    float g = in.pixels[i] >> 8 & 0xFF;
    float b = in.pixels[i] & 0xFF;
    
    // add the adjustment amount to color, 
    // making sure it doesn't go past the 0–255 range
    r += amount;
    r = constrain(r, 0,255);
    g += amount;
    g = constrain(g, 0,255);
    b += amount;
    b = constrain(b, 0,255);
    
    // change the pixel value
    in.pixels[i] = color(r, g, b);
  }
  in.updatePixels();
  
  // send back the filtered image
  return in;
}