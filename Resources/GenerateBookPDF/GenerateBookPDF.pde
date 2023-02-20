/*
  GENERATE BOOK PDF
  Jeff Thompson | 2023 | jeffreythompson.org
  
  A little Processing program to create a book PDF from a
  bunch of image files. Your files need to be named in
  sequential order for your book with leading zeros:
  
  Correct:       Won't work:
  01.png         FirstPage.png
  02.png         NextPage.png
  03.png         LastPage1.png
  
  Just run the sketch, selected your folder, and two 
  PDFs will be created!
  
  Book-PREVIEW.pdf   Lets you see your book the way it
                     will appear when done – great for
                     testing layout etc
  
  Book-PRINT.pdf     File ready for printing – order will
                     look really funky but will come out
                     right once folded and put together
  
  Need to make sure your page order is correct? Try
  changing the "debug" variable below to true. This will
  print page numbers on everything so you can verify
  the book is correct!
*/

import processing.pdf.*;
import java.util.Arrays;

// display page numbers (for making sure
// everything is working right)
boolean debug = false;

void settings() {
  // overall page size (inches x resolution) 
  size(11*72, int(8.5*72));
}

void setup() {  
  // let the user select the folder
  // when selected, will run the callback function
  // createPDF(), which is below...
  println("Choose a folder with your book's pages – note their filenames should be in sequential order with leading zeros!");
  selectFolder("Select the folder with your pages...", "createPDF");
}

void createPDF(File dir) {  
  // grab a list of the files and sort by name
  println("- looking for files...");
  String[] files = dir.list();
  Arrays.sort(files);
  println("- found " + files.length);
  
  // get the input folder as a string
  // (and the correct path separator, depending
  // on your operating system)
  String path = dir.getAbsolutePath() + File.separator;
  
  // create a preview pdf (which will appear like the book)
  println("\n" + "Creating preview PDF...");
  createPreviewPDF(files, path);
  println("- done!");
  
  // and create a print pdf (whose page order will be
  // funky but will look right when folded
  println("\n" + "Creating print PDF...");
  createPrintPDF(files, path);
  println("- done!");
  
  // bye!
  exit();
}

void createPreviewPDF(String[] files, String path) {
  // create the pdf object
  PGraphicsPDF pdf = (PGraphicsPDF) beginRecord(PDF, "Book-PREVIEW.pdf");
  beginRecord(pdf);

  // add the images to the pages
  int x = width/2;
  for (int i=0; i<files.length; i++) {
    PImage img = loadImage(path + files[i]);
    image(img, x,0, width/2,height);
    
    // if debug is on, setup text to
    // display the page numbers
    if (debug) {
      fill(0, 150, 255);
      noStroke();
      textSize(72);
      textAlign(CENTER, CENTER);
      
      text(i+1, x+width/4,height/2);  // +1 since the loop starts at 0
    } 
    
    // next image on the opposite side
    // (or the next page)
    x += width/2;
    if (x >= width) {
      x = 0;
      pdf.nextPage();
    }
  }
  
  // save the pdf
  println("- saving...");
  endRecord();
}

void createPrintPDF(String[] files, String path) {
  // same as the preview, just a different filename!
  PGraphicsPDF pdf = (PGraphicsPDF) beginRecord(PDF, "Book-PRINT.pdf");
  beginRecord(pdf);
  
  // page numbers are extra helpful here to
  // verify our weird order is correct
  if (debug) {
    fill(0, 150, 255);
    noStroke();
    textSize(72);
    textAlign(CENTER, CENTER);
  }

  // for the print file, every other page will 
  // have the early pages on the right side
  // this variable lets us flip that as we go
  // through all the pages
  boolean opposite = true;
  
  // go halfway through, since we'll also draw the
  // last pages with this loop too!
  for (int i=0; i<files.length/2; i++) {
    
    // load the page from the start of the book (offset
    // by "i") and from the end (offset by the number
    // of pages minus "i")
    PImage start = loadImage(path + files[i]);
    PImage end =   loadImage(path + files[files.length-1-i]);
    
    // start image on the right, end on the left
    if (opposite) {
      image(start, width/2,0, width/2,height);
      if (debug) text(i+1, width-width/4,height/2);
      
      image(end, 0,0, width/2,height);
      if (debug) text(files.length-i, width/4,height/2);
    }
    // start on the left, end on the right
    else {
      image(start, 0,0, width/2,height);
      if (debug) text(i+1, width/4,height/2);
      
      image(end, width/2,0, width/2,height);
      if (debug) text(files.length-i, width-width/4,height/2);
    }
    
    // flip the boolean variable each time
    // through the for-loop!
    opposite = !opposite;
    
    // only create a new page if we're *not* at
    // the end of our loop
    if (i < files.length/2 - 1) {
      pdf.nextPage();
    }    
  }
  
  // save the pdf
  println("- saving...");
  endRecord();
}
