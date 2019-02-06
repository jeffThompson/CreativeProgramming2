![A wooden printing block from India, used to make textiles](https://raw.githubusercontent.com/jeffThompson/CreativeProgramming2/master/Images/Week01_BlockPrinting/WoodenPrintingBlocks_India.jpg)

# BLOCK PRINTS

### DUE MONDAY, FEBRUARY 11  

To get started with the semester, we'll do a quick project to get you back into writing code. It will give you the opportunity to try a (perhaps) new way of printing your work: wood block prints. Block printing dates back thousands of years, though instead of using chisels to carve the image we'll use a laser-cutter to go directly from a PDF to the printing block.

Your assignment is to make a black-and-white image (no grayscale values) in Processing, cut a block using the laser-cutter, and print an edition of 10 prints. We'll exchange prints so everyone gets a full set from the class.

## DELIVERABLES  
To turn in the project, please upload the following files to Canvas:  
* Output PDF from your sketch  
* Scan of one of your prints  

Additionally, you'll need to produce 10 good quality prints, enough to share with the class.

## PROJECT TIMELINE  
* **Jan 28:** Project assigned, create sketch, laser-etch your printing block  
* **Feb 4:** Printing demo and printing in class, finish your edition as necessary, scan one of your prints  
* **Feb 11:** Project due, critique, exchange prints  

## CHALLENGE PROMPTS  
1. Can you try to design a pattern that is intended to repeat? Try printing it in a grid, like wallpaper or textiles  
2. Can you write your code to be an interactive tool for making the pattern? Don't worry about buttons and a UI, but it could include things like using the mouse position to change parameters, a key to regenerate random elements, and a button to save it as a unique PDF. (Hint: try using `map()` and `randomSeed()` with the mouse coordinates.)  

## FOR MONDAY, FEBRUARY 4  
For next week, please create a sketch in Processing and etch your printing block using the laser-cutter. You're welcome to use any shape drawing and image processing code you like in Processing. You might want to look at some of the historical block-printing examples for inspiration, or early computer art which made amazing images using just black pens on paper.

## FOR MONDAY, FEBRUARY 11  
For next week, please finish the edition of your prints (see the `Resources` folder for a diagram to lay them out). You should have 10 good-quality prints: prints should look as close to the same as possible, with even inking and clean margins. When done, please scan one of the prints (there's a scanner in the back of the Lab) and upload to Canvas the scan and the PDF you used to cut your block.

Please also be sure to have Chrome and a text editor (I suggest Sublime Text) installed on your computer for next week!

**SKETCH FORMAT**  
* Black or white only, no grayscale!  
* Black will be cut away, white will print black  
* Blue (`color(0,0,255)`) stroke can be used for vector engraving  
* Your image will be reversed when printed, so beware if you use text!  
* Save as a PDF file  

Have trouble seeing your little sketch? Open the PDF for a larger view.

The basic structure:  

    import processing.pdf.*;

    void setup() {
      size(216,216);    // 3x3" at 72 dpi
  
      beginRecord(PDF, "LastnameFirstname.pdf");
  
      // drawing stuff here
      background(255);
  
      // fill should be black if you want that area to be
      // the paper or white if you want it to be printed in ink
      fill(0);
  
      // stroke can be off (noStroke()) or blue (color(0,0,255))
      // to do a vector etching
      stroke(0,0,255);

      // if using stroke the thickness **MUST** be
      // set to 0.072 otherwise you'll have weird issues
      // with the lasercutter :(
      strokeWeight(0.072);
  
      endRecord();
}

**LASER-CUTTER SETTINGS**  
The workers in the Fab Lab should be able to help you, but to be sure you get a great-looking block, here are the settings you should use.

* Open your file on the Fab Lab computer in Acrobat  
* `File > Print...` and be sure `VLS4` is the "printer", hit `Print`  
* Turn on the lasercutter  
* Click the lasercutter icon at the bottom of the screen  
* Place the cutting jig at `0,0` on the laser cutter, put your block in the square hole  
* Move your image to `1,1` in the software – important!  
* Click `Settings` and select...
  * `Materials > Natural > Wood > Medium Density Fiberboard...`  
  * Thickness should be set to `0.75`  
  * Raster and vector engrave set to `+25%` (a little higher for a deeper cut)  
  * Click `Apply` and close  
  * Open settings again to verify everything got saved  
* Turn on the exhaust and air assist  
* Click the `Run` button in the software  
* Be sure to watch your cut as it runs – if there is fire or a problem, hit the `Pause` button on the machine or open the door!

If you have any issues, such as poor cut quality, check that the lens is clean. Any other problems, contact Jeff.

## PROJECTS AND THINGS SHOWN  
* [The Met's online collection of woodblock prints](https://www.metmuseum.org/art/collection/search#!?q=woodblock%20print&perPage=20&searchField=All&showOnly=withImage&sortBy=relevance&offset=0&pageSize=0) (including some amazing images of the printing blocks themselves)  
* The Honolulu Museum of Art has over [10,000 Japanese *ukiyo-e* woodblock prints](https://honolulumuseum.org/art/collections/5785-new-japanese-woodblock-prints), many of which are online  
* The Library of Congress also has [a collection of over 2,500 pre-1915 Japanese woodblock prints](https://www.loc.gov/collections/japanese-fine-prints-pre-1915) viewable online  
* Some wood engravings (a unique process where the end-grain is carved) from the [V&A's extensive online collection](https://collections.vam.ac.uk/search/?limit=15&narrow=1&quality=1&materialsearch=wood+engraving&technique%5B%5D=AAT53303&offset=0&slug=0)  
* [William Morris' amazing wallpaper patterns](https://www.vam.ac.uk/articles/william-morris-and-wallpaper-design), all printed using woodblocks    
* A short video on [fabric printing in India](https://www.youtube.com/watch?v=0qnKcpAgNEM)  
