![Image segmentation of a figure skater](https://raw.githubusercontent.com/jeffThompson/CreativeProgramming2/master/Images/Week05_ComputerVision/ImageSegmentation2.png)

TRACKING
====

### DUE: THURSDAY, MARCH 8  

We've now looked at how to traverse the pixels in an image, and manipulate them in different ways. The field of [Computer Vision](https://en.wikipedia.org/wiki/Computer_vision) (CV) all about using those pixels to extract information from images, whether that be the location of faces, analysis of a person's [gait](https://books.google.com/books?id=uClKDwAAQBAJ&pg=PT226&lpg=PT226&dq=computer+vision+identification+gait+stone+in+shoe&source=bl&ots=NBR0nFC6DL&sig=ZdH74-NGOj-sWCbV9MBM8tbFkmQ&hl=en&sa=X&ved=0ahUKEwjD_-mbnqPZAhVJwlkKHeBABcMQ6AEIKTAA#v=onepage&q=computer%20vision%20identification%20gait%20stone%20in%20shoe&f=false) or [emotional state](https://www.affectiva.com/emotion-ai-overview/), [identifying objects](https://www.kaggle.com/c/cifar-10) in a scene, and [self-driving cars](https://media.giphy.com/media/GQZ0ajY3o5tS/giphy.gif). Of course, this work can be applied to a range of uses like personal electronics, surveillance and military technologies, and, in our case, art!

While we'll be using more sophisticated tools like OpenCV library's face detection algorithms later, for now we will use color- and blob-tracking. These aren't always as robust, but are great for tracking things that the computer hasn't been trained on before (ie *not* faces) and are a great bridge between the image processing examples and what we'll do next.

Your assignment is to explore the idea of tracking. Think about visually compelling, creative, poetic, critical ways of using blob and color tracking in your sketch. Do you want this tracking to be passive, or something a person has to opt into as an interactive piece? How do you control the lighting or other conditions for the piece? What is the interface we see? Should the computer be visible at all?

(Wondering about face-tracking and other fun stuff? We're getting there soon, I promise! For this project, please do not use those features of the OpenCV library yet.)

**A TECH NOTE**  
As you're ideating your project, you'll have to think about *what* you track, but also *how* to accomplish it. Our brains are really good at extracting objects using data from our eyes (about 30% of the cortex is used for visual processing, while only 8% for touch and 3% for hearing) but making code do this is much harder. To extract a blob, we have to work with a binary (black and white) image, generally making bright objects white and everything else black:

![An example of a binary image](https://raw.githubusercontent.com/jeffThompson/CreativeProgramming2/master/Images/Week05_ComputerVision/ThresholdBlobs.jpg)

*Left: an example of a binary image. Right: using a cellphone flashlight to quickly prototype, and the input converted to binary, with a clear blob formed.*

In your piece, you'll need to control this in some way, such as:

* Use a white wall, against which most other things will seem dark (or vice versa)  
* Controlling the lighting (by checking out equipment from the Fab Lab, for example)  
* [Frame differencing](https://github.com/jeffThompson/CreativeProgramming2/blob/master/Code/Week05_ComputerVision/FrameDifferencing/FrameDifferencing.pde) to remove the background  
* Use an intentionally bright object as the thing to be tracked (a flashlight, LED, etc)  
* Embrace the glitch and don't worry about it!  

We'll work through the implementation details over the next three weeks, but it will be good to start thinking about the physical limitations/requirements now.

### DELIVERABLES  

* Scanned or photographed sketches  
* Finished *Tracking* project code  
* Documentation of your piece  
* A repository of your code uploaded to Github  
* A `REAMDE` file in your repo, including:  
  * A description of your project  
  * A screenshot of it running  
  * Links to any external documentation  
* Upload a screenshot of your project to Canvas, and add a link to your repo as a comment

### FOR THURSDAY, FEBRUARY 22  
Since we're not meeting as a class this week, I'd like you to look at some code examples (all under `Week 5: Computer Vision`. Run them on your computer, and read through the code, especially the comments, so you can see what they do. It's ok if you don't understand how they work entirely, but they should give you an idea of what's possible:

1. Testing Neighboring Pixels  
2. Kernel Filters  
3. Edge Detection  
4. Blob Detection  
5. Blob Detection (via webcam)  
6. Color Detection  

We'll go over these in detail next week. If you have any questions about the code, shoot me an email!

Please also start ideating for this project. For our next class, you should:

* Spend at least an hour making drawings in your sketchbook of ideas. Like before, try to come up with as many ideas as possible, and iterate on the ones you get excited about. The more you can map out on paper, the easier it will be to write your code.  
* Think about what you will track, and what that input will do – will it drive a system, change the display, generate other visuals, or something else entirely? What do you want the final piece to *look* and *feel* like for viewers?  
* Begin prototyping your project in code. You might want to fake the tracking part, using a black background and a white circle controlled by the mouse, or by having it track the flashlight on your phone. These are quick hacks to get a working input, so you can start on the aesthetic parts of your code.

We'll look together at your projects in progress, so please have some kind of interactive demo we can preview.

### FOR THURSDAY, MARCH 1  
For next week, continue prototyping your project. Work on integrating blob or color tracking, and getting the visuals closer to what they will be in the finished piece. We'll do small-group feedback sessions next week, and have time to work and trouble-shoot.

Please also draw up at least one rendering of how the piece will be installed, and how it will work. You can do this in Illustrator or Powerpoint (or 3D software, if you *really* want to). Annotate parts that aren't clear – think of this as a pitch to a potential client or exhibition. I've dropped some examples in the `Resources` folder – by no means the only way to do these kind of drawings, but should give you an idea of the details to include. **Print your finished rendering and bring it to class next week.**

### FOR THURSDAY, MARCH 8  
Finish project, machine learning readings. More info TBA soon.

### RESOURCES  

* The ever-helpful Daniel Shiffman has a great tutorial on [blob tracking](https://www.youtube.com/watch?v=ce-2l2wRqO8), and one where the [blobs persist even when lost temporarily](https://www.youtube.com/watch?v=r0lvsMPGEoY)  
* Writeup on [computer vision in art](http://www.flong.com/texts/essays/essay_cvad/), including some sample code, from Golan Levin  
* A nice, simple [tutorial that explains one method for blob detection](https://www.learnopencv.com/blob-detection-using-opencv-python-c/) using several thresholded versions of the input image  
* Lots more (mathy) explanations on [Wikipedia](https://en.wikipedia.org/wiki/Blob_detection)    
* Get yourself ready for blobs by watching the [1958 movie of the same name](https://en.wikipedia.org/wiki/The_Blob)  

### PROJECTS SHOWN  

* Philip Worthington's [*Shadow Monsters*](https://www.moma.org/calendar/exhibitions/1321) (see also [this image](https://cdn.hpm.io/wp-content/uploads/2015/06/21113000/shadow3.jpg) that shows a bit about how th piece works)  
* [*Messa di Voce*](http://www.flong.com/projects/messa/), a performance by Jaap Blink with interactive visualizations by Golan Levin, Zach Lieberman, and Joan La Barbara  
* Golan Levin and Kyle McDonald's [*Eyeshine*](http://www.flong.com/projects/eyeshine/) and [*Augmented Hand Series*](http://www.flong.com/projects/augmented-hand-series/) (with Chris Sugrue)  
* David Bowen's [*Fly Carving Device*](http://www.dwbowen.com/fly-carving-device)  
* David Rokeby's [*Giver of Names*](http://www.davidrokeby.com/gon.html)  
* More examples in this week's `Images` folder  

