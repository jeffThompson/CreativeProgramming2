
import java.awt.image.BufferedImage;    // required imports
import javax.imageio.plugins.jpeg.*;
import javax.imageio.*;
import javax.imageio.stream.*;

/*
JPEG COMPRESSION
Jeff Thompson | 2016 | www.jeffreythompson.org

For web-based images, controlling the compression of a JPG
can optimize file size for faster loading. The built-in save()
command in Processing doesn't give us this control, but we can
use Java's ImageIO to add this functionality.

You'll see how gnarly and messy "normal" Java code can be compared
with Processing, which hides much of that – hopefully this makes
you grateful for the work done by all the contributors to Processing!
 
CHALLENGE:
+ Can you wrap the code below into a saveJPG() function, passing
  the input image, output filename, and compression level as
  arguments?
 
*/


// set the amount of compression
// 1.0 = no compression, largest image file
// 0.5 = 50% compression
// 0.0 = 100% compression, smallest image file
float compressionLevel = 0.1;

// image to load
String imageFilename =  "../Test.jpg";

// and filename to save the compressed version to
String outputFilename = sketchPath("") + "Compressed.jpg";


void setup() {
  size(900,700);
  println(outputFilename);
  
  // load the image to compress
  // you could also access the sketch's pixel array using get()
  PImage img = loadImage(imageFilename);
  img.loadPixels();

  // some Java code requires it be run in a try/catch statement, which
  // will throw errors if something goes wrong – most Processing code
  // skips this, but using external code like this may require it
  try {

    // setup our JPG output
    JPEGImageWriteParam jpegParams = new JPEGImageWriteParam(null);
    jpegParams.setCompressionMode(ImageWriteParam.MODE_EXPLICIT);
    jpegParams.setCompressionQuality(compressionLevel);
    final ImageWriter writer = ImageIO.getImageWritersByFormatName("jpg").next();
    writer.setOutput(new FileImageOutputStream(new File(outputFilename)));

    // output to a BufferedImage object
    // first create the object, then write the pixel data to it
    BufferedImage out = new BufferedImage(img.width, img.height, BufferedImage.TYPE_INT_RGB);
    for (int i=0; i<img.pixels.length; i++) {
      out.setRGB(i%img.width, i/img.width, img.pixels[i]);
    }

    // save it!
    writer.write(null, new IIOImage(out, null, null), jpegParams);
  }
  
  // if any errors occur, print them
  catch (Exception e) {
    println(e);
  }
  
  // load the compressed image and display it onscreen
  img = loadImage(outputFilename);
  image(img, 0,0);
}