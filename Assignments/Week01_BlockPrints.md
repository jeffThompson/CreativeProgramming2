![A wooden printing block from India, used to make textiles](https://raw.githubusercontent.com/jeffThompson/CreativeProgramming2/master/Images/Week01_BlockPrinting/WoodenPrintingBlocks_India.jpg)

# BLOCK PRINTS

For our first project, we'll do a quick project to get you back into writing code and that will give you the opportunity to try a (perhaps) new way of outputting your projects: wood block prints. Block printing dates back thousands of years, though instead of using chisels we'll use a thoroughly 21st-century tool: the laser-cutter.

You assignment is to make a black-and-white image (no grayscale) in Processing, cut a block using the laser-cutter, and print an edition. We'll exchange prints so everyone gets a full set from the class.

## DELIVERABLES  
To turn in the project, please upload the following files to Canvas:  
* Output image from your sketch  
* Scan of one of your prints  

Additionally, you'll need to produce 9 good quality prints, enough to share with the class.

## PROJECT TIMELINE  
* **Jan 28:** Project assigned, create sketch, laser-etch your printing block  
* **Feb 4:** Etching press demo and printing in class, finish your edition as necessary, scan one of your prints  
* **Feb 11:** Project due, critique, exchange prints  

## FOR MONDAY, FEBRUARY 4  
For next week, please create a sketch in Processing and etch your printing block using the laser-cutter. You're welcome to use any shape drawing and image processing code you like in Processing. You might want to look at some of the historical block-printing examples for inspiration, or early computer art which made amazing images using just black pens on paper.

**SKETCH FORMAT**  
* Black or white only, no grayscale!  
* Black will be cut away, white will print black  
* Blue (`color(0,0,255)`) stroke can be used for vector engraving  
* Your image will be reversed when printed, so beware if you use text!  
* Save as a PDF file  

The basic structure:  

    import processing.pdf.*;

    void setup() {
      size(900,900);    // 3x3" at 300 dpi
  
      beginRecord(PDF, "LastnameFirstname.pdf");
  
      // drawing stuff here
      background(255);
  
      // fill should be black (color(0)) or 
      // white (color(255)) only, no grayscale!
  
      // stroke can be off (noStroke()) or blue (color(0,0,255))
      // to do a vector etching
  
      endRecord();
    }

**LASER-CUTTER SETTINGS**  
The workers in the Fab Lab should be able to help you, but to be sure you get a great-looking block, here are the settings you should use.

* Open your file on the Fab Lab computer in Acrobat  
* `File > Print...` and be sure `VLS4` is the "printer", hit `Print`  
* Turn on the lasercutter  
* Click the lasercutter icon at the bottom of the screen  
* Move your image to `0,0`  
* Click `Settings` and select...
  * `Materials > Wood > Fiberboard...`  
  * Thickness should be set to `0.75`  
  * Raster and vector engrave set to `10%` (a little higher for a deeper cut)  
  * Click `Apply` and close  
  * Open settings again to verify everything got saved  
* Turn on the exhaust and air assist  
* Place your block at `0,0` and be sure it is straight  
* Click the `Run` button in the software  
* Be sure to watch your cut – if there is fire or a problem, hit the `Pause` button on the machine or open the door!

If you have any issues, such as poor cut quality, check that the lens is clean. Any other problems, contact Jeff.

## PROJECTS AND THINGS SHOWN  
* [The Met's online collection of woodblock prints](https://www.metmuseum.org/art/collection/search#!?q=woodblock%20print&perPage=20&searchField=All&showOnly=withImage&sortBy=relevance&offset=0&pageSize=0) (including some amazing images of the printing blocks themselves)  
* The Honolulu Museum of Art has over [10,000 Japanese *ukiyo-e* woodblock prints](https://honolulumuseum.org/art/collections/5785-new-japanese-woodblock-prints), many of which are online  
* The Library of Congress also has [a collection of over 2,500 pre-1915 Japanese woodblock prints](https://www.loc.gov/collections/japanese-fine-prints-pre-1915) viewable online  
* Some wood engravings (a unique process where the end-grain is carved) from the [V&A's extensive online collection](https://collections.vam.ac.uk/search/?limit=15&narrow=1&quality=1&materialsearch=wood+engraving&technique%5B%5D=AAT53303&offset=0&slug=0)  
* [William Morris' amazing wallpaper patterns](https://www.vam.ac.uk/articles/william-morris-and-wallpaper-design), all printed using woodblocks    
* [Fabric printing in India](https://www.youtube.com/watch?v=0qnKcpAgNEM)  
