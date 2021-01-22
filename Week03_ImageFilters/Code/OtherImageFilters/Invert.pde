
PImage invert(PImage in) {
  
  // inverts the color of each pixel by subtracting
  // its value from 255 – easy!
  
  // go through each pixel and modify
  in.loadPixels();
  for (int i=0; i<in.pixels.length; i++) {
    
    // get rgb values from this pixel
    float r = in.pixels[i] >> 16 & 0xFF;
    float g = in.pixels[i] >> 8 & 0xFF;
    float b = in.pixels[i] & 0xFF;
    
    // subtract the color value from 255
    r = 255-r;
    g = 255-g;
    b = 255-b;
    
    // update the pixel value
    in.pixels[i] = color(r, g, b);
  }
  in.updatePixels();
  
  // send back the filtered image
  return in;
}