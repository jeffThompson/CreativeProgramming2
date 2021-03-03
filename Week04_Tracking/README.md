![Grid of images of a figure skater, processed using "image segmentation," where the computer is able to do something your brain can do so easily: tell objects apart](Images/ImageSegmentation2.png)

# TRACKING

### TLDR  
* Project that uses tracking to create an interactive experience  
* [For Thurs, March 11](#for-thursday-march-11):  
  * At least 10 project sketches (digital or in your sketchbook)  
  * Rough version of your code with tracking working  
* [For Thurs, March 18](#for-thursday-march-18):  
  * A repository with your project's code  
  * A `README` file in your repo, including:  
    * A description of your project  
    * Three screenshots of it running  
  * Upload link to repo in Canvas (no need to upload screenshots or code)  

***

### ASSIGNMENT  
In the last project, welooked at how to traverse the pixels in an image and manipulate them in different ways. The field of [computer vision](https://en.wikipedia.org/wiki/Computer_vision) (CV) all about using those pixels to extract information from images, whether that be the location of faces, analysis of a person's [gait](https://books.google.com/books?id=uClKDwAAQBAJ&pg=PT226&lpg=PT226&dq=computer+vision+identification+gait+stone+in+shoe&source=bl&ots=NBR0nFC6DL&sig=ZdH74-NGOj-sWCbV9MBM8tbFkmQ&hl=en&sa=X&ved=0ahUKEwjD_-mbnqPZAhVJwlkKHeBABcMQ6AEIKTAA#v=onepage&q=computer%20vision%20identification%20gait%20stone%20in%20shoe&f=false) or [emotional state](https://www.affectiva.com/emotion-ai-overview/), [identifying objects](https://www.kaggle.com/c/cifar-10) in a scene, and [self-driving cars](https://giphy.com/gifs/producthunt-self-driving-cars-l0Ex7BYYtv4NXR6z6/fullscreen). These technologies are increasingly embedded (and often unseen) in our devices and tools, and are used in contexts ranging from taking better selfies to surveillance and the military. This makes computer vision an exciting but politically complicated tool for making art (Friedrich Kittler: "The entertainment industry is, in every conceivable sense of the word, an abuse of army equipment" – we'll talk more about this and other issues around computers seeing and making decisions as part of the next project).

Your assignment is to explore computer vision in a way that is visual, creative, poetic, and/or critical of those tools. You can use color tracking, optical flow, and/or blob or object detection (we'll get to face and skeleton tracking next, so please hold off on that for now!).

Some things to think about:  
* What do you track: an everyday object, custom-made object that's part of the visual experience?  
* Is that object a conceptual/poetic part of the piece or a tool like a mouse?  
* What format/audience you want your project to engage: a game for a brand, an interactive visual experience for a gallery, etc?  
* Can you use other topics we've covered: randomness, collage, etc?  
* Or non-code processes: hand-drawn images, graphics created in Illustrator, photographs?  

**A TECHNICAL ASIDE**  
Our brains are really good at seeing patterns and extracting objects using data from our eyes: about 30% of the cortex is used for visual processing, while only 8% for touch and 3% for hearing. You may find yourself frustrated that the computer glitches out while tracking colors or identifying objects: remember how bananas it is that it can do this at all! (And lots of interesting reading to be found on how we see, what happens when we form a mental picture, etc.)

*Above: "image segmentation," a process where the computer is able to do something your brain can do so easily: tell objects apart*

***

### CODE EXAMPLES/VIDEOS  
* [Video tutorials for this week]()  
* [Code examples in the `p5.js` Editor](https://editor.p5js.org/jeffThompson/collections/sw-DMai_t)  

***

### FOR THURSDAY, MARCH 11  
This week you should start ideating and prototyping your project.

**IDEATION DRAWINGS**  
Spend at least an hour making at 10 (or more) drawings of ideas for the project in your sketchbook (or digitally). Try to come up with as many ideas as possible and iterate on the ones you get excited about. What will you track? What visuals will we see? How will the piece evolve over time? Consider using diagrammatic marks (arrows, annotations) too.

**ROUGH PROTOTYPE**  
After you're done drawing, look over everything and figure out what is most exciting to you. Start building a rough prototype in code, with a focus on the core interaction rather than visual fluff. For example, if you want to make one-player pong by tracking a banana, get the COCO model working and figure out the basic mechanics for collision. You can work on the visuals too, but be sure the main tech is working first (you'll refine the visuals next week).

No need to turn in anything on Canvas this week – bring your sketchbook/drawings and rough code to class.

***

### FOR THURSDAY, MARCH 18  
For next week, please finish your project and create a Github repository with a `README` file and three screenshots of your piece running. (See the `Resources` folder for more info on creating a repo and working with Markdown files.)

When you're done, submit a link to your repo on Canvas.

***

### INSPIRATION  
* David Bowen's [*Cloud Tweets*](http://www.dwbowen.com/cloud-tweets) and [*Fly Carving Device*](http://www.dwbowen.com/fly-carving-device)  
* Chris Milk's [*The Treachery of Sanctuary*](http://milk.co/treachery)  
* Rafael Lozano-Hemmer's [*Bifurcation*](http://www.lozano-hemmer.com/bifurcation.php) and [*People on People*](http://www.lozano-hemmer.com/people_on_people.php)  
* Philip Schütte/Random Studio's [*SUN*](https://www.creativeapplications.net/js/three-js/sun-suns-cycle-as-an-interactive-playful-experience/)  
* Philip Worthington's [*Shadow Monsters*](https://www.moma.org/calendar/exhibitions/1321) (see also [this image](https://cdn.hpm.io/wp-content/uploads/2015/06/21113000/shadow3.jpg) that shows a bit about how the piece works)  
* [*Messa di Voce*](http://www.flong.com/projects/messa/), a performance by Jaap Blink with interactive visualizations by Golan Levin, Zach Lieberman, and Joan La Barbara  
* Golan Levin and Kyle McDonald's [*Eyeshine*](http://www.flong.com/projects/eyeshine/) and [*Augmented Hand Series*](http://www.flong.com/projects/augmented-hand-series/) (with Chris Sugrue)  
* David Rokeby's [*Giver of Names*](http://www.davidrokeby.com/gon.html)  
* Dan Deacon's score for [*Rat Film*](https://www.npr.org/sections/allsongs/2017/10/13/557324946/how-dan-deacon-collaborated-with-rats-to-make-his-latest-film-score)  
* Samsung's [*Windows into the Future*](https://projectfoyer.com/kadewe/), which includes some great behind-the-scenes info  
* This pretty fun [Harry Potter World wand](https://www.youtube.com/watch?v=iKUC0EbHw20), which lets you control things around the park (using infrared blob tracking!)  
* Adam Harvey's [visualization of how face detection in OpenCV sees a face](https://vimeo.com/12774628) 


***

### RESOURCES  
* Writeup on [computer vision in art](http://www.flong.com/archive/texts/essays/essay_cvad/index.html) from Golan Levin  
* A nice, simple [tutorial that explains one method for blob detection](https://www.learnopencv.com/blob-detection-using-opencv-python-c/) using several thresholded versions of the input image  
* If your project is a game or otherwise involves collision, I [built a whole tutorial site on the topic](http://www.jeffreythompson.org/collision-detection) that might be helpful!  
* Get yourself ready for blobs by watching the [1958 movie of the same name](https://www.youtube.com/watch?v=TdUsyXQ8Wrs)  

