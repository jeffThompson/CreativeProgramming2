![A wooden printing block from India, used to make textiles](https://raw.githubusercontent.com/jeffThompson/CreativeProgramming2/master/Images/Week01_BlockPrinting/WoodenPrintingBlocks_India.jpg)

# BLOCK PRINTS

**DUE MONDAY, FEBRUARY 10**  

To get started with the semester, we'll do a quick project to get you back into writing code. It will give you the opportunity to try a (perhaps) new way of printing your work: block prints. Block printing dates back thousands of years, though instead of using chisels to carve the image we'll use a laser-cutter to go directly from a TIFF to the printing block. In this case, our block is made of a laser-cuttable rubber but you can also use a similar process with wood!

Your assignment is to make a black-and-white image (no grayscale values) in Processing, cut a block using the laser-cutter, and print an edition of 12 prints. We'll exchange prints so everyone gets a full set from the class.


## DELIVERABLES  
To turn in the project, please upload the following files to Canvas:  
* Output from your sketch  
* Scan of one of your prints  

Additionally, you'll need to produce 12 good quality prints, enough to share with the class.


## PROJECT TIMELINE  
* **Jan 27:** Project assigned, create at least three variations on your sketch, laser-print the results  
* **Feb 3:** Laser-cutter and printing demo, printing in class (finish outside class as necessary), scan one of your prints  
* **Feb 10:** Project due, critique, exchange prints  


## STRETCH GOALS  
1. Can you try to design a pattern that is intended to repeat? Try printing it in a grid, like wallpaper or textiles  
2. Can you write your code to be an interactive tool for making the pattern? Don't worry about buttons and a UI, but it could include things like using the mouse position to change parameters, a key to regenerate random elements, and a button to save it as a unique TIFF. (Hint: try using `map()` and `randomSeed()` with the mouse coordinates.)  


## FOR MONDAY, FEBRUARY 3  
For next week, please create a sketch for your printing block (see `Sketch Format and Template` below). Once you have something you like, make at least three variations, tweaking the code and outputting to TIFF files. Print these on the laser printer and bring to class for feedback. These might be small changes, different runs with random numbers, or major changes to the code.

Some details to consider (see the [`Resources` folder for more details](https://github.com/jeffThompson/CreativeProgramming2/blob/master/Resources/LaserCuttingRubberStamps.md)):  
* Black or white only, no grayscale!  
* Black will be cut away, white will print with ink (reverse of what you'll see when printing)  
* Your image will be reversed horizontally when printed, so beware if you use text!  
* Save as a TIFF file  

The basic structure:  

    void setup() {
      size(900,900);    // 3x3" at 300 dpi
      background(0);
  
      // fill should be black if you want that area to be
      // the paper or white if you want it to be printed in ink
      fill(255);
      noStroke();

      // or you can use stroke!
      stroke(255);
      strokeWeight(3);

      // add your drawing commands here!
  
      // save to file (with a unique filename)
      save("LastnameFirstname-v1.tiff");
    }

You're welcome to use any shape drawing you know in Processing! You might also want to look at some of the historical block-printing examples for inspiration, or early computer art which made amazing images using just black pens on paper!


## FOR MONDAY, FEBRUARY 10  
For next week, please finish the edition of your prints. You should have 12 good-quality prints: prints should look as close to the same as possible, with even inking and clean margins. When done, please scan one of the prints (there's a scanner in the back of the Lab). Upload to Canvas the scan and the TIFF you used to cut your block.


## PROJECTS AND THINGS SHOWN  
* [The Met's online collection of woodblock prints](https://www.metmuseum.org/art/collection/search#!?q=woodblock%20print&perPage=20&searchField=All&showOnly=withImage&sortBy=relevance&offset=0&pageSize=0) (including some amazing images of the printing blocks themselves)  
* The Honolulu Museum of Art has over [10,000 Japanese *ukiyo-e* woodblock prints](https://honolulumuseum.org/art/collections/5785-new-japanese-woodblock-prints), many of which are online  
* The Library of Congress also has [a collection of over 2,500 pre-1915 Japanese woodblock prints](https://www.loc.gov/collections/japanese-fine-prints-pre-1915) viewable online  
* Some wood engravings (a unique process where the end-grain is carved) from the [V&A's extensive online collection](https://collections.vam.ac.uk/search/?limit=15&narrow=1&quality=1&materialsearch=wood+engraving&technique%5B%5D=AAT53303&offset=0&slug=0)  
* [William Morris' amazing wallpaper patterns](https://www.vam.ac.uk/articles/william-morris-and-wallpaper-design), all printed using woodblocks    
* A short video on [fabric printing in India](https://www.youtube.com/watch?v=0qnKcpAgNEM)  

