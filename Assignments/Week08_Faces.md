![](https://raw.githubusercontent.com/jeffThompson/CreativeProgramming2/master/Images/Week08_Faces/PowerGoo_FaceSwapPredescessor.png)

FACES
====

### DUE: THURSDAY, APRIL 12  

>"How can a computer be made to recognize a human face? This question remains unanswered, because pattern recognition by computer is still too crude to achieve automatic identification of objects as complex as faces." <br>– [Leon D. Harmon](https://archive.org/details/DTIC_ADA004159)

> "Who sees the human face correctly: the photographer, the mirror, or the painter?" <br>– Picasso

This project is a wide-open exploration: make something about *faces*. Any language, any output format, any topic. The idea is for you to deeply investigate an idea and make something that you're really excited about. 

We'll be doing tutorials in machine learning during this time, but your project doesn't need to engage any of those tools, or computer vision or OpenCV. Instead, think about topics and tools that you want to spend time with.

(We'll also look at projects related to machine learning and the arts throughout the next few weeks.)

### TIMELINE  

* **March 8:** Project assigned, discussion of machine learning history and context.  
* **March 15:** Spring break, no class! Work on the project.  
* **March 22:** Sketches and research materials due, creating and comparing vectors.  
* **March 29:** Python refresher, ML tutorials.  
* **April 5:** Work in progress crit, ML tutorials. Final project proposal assigned.  
* **April 12:** Project due! Crit and discussion of final project ideas.  

### FOR THURSDAY, MARCH 22:  
During the next two weeks, start planning and researching your project. For the week after break, please bring in at least 30 things related to your project: sketches of what it might look like or do, inspiration images, quotes from articles or books, scientific research, etc. Everything should be either cut out of your sketchbook or printed, so we can lay everything out and talk. Please also write 1-2 paragraphs describing your project in the clearest terms you can, so we can quickly get the gist. You're not locked into this idea, and it's ok if it morphs while you're working on it, but this will help define the scope of what you want to do.

**UPDATE: Since we had a snow day and won't be able to talk about this assignment together, please take a look at the example projects below. As usual, they're just to get you thinking!**

### FOR THURSDAY, MARCH 29:  
For next week, continue working on the project. We'll have an in-progress crit on April 5, so you should have something concrete to demo then.

Please also install [Anaconda](https://www.anaconda.com/download), which is a virtual environment manager for Python. It will help you install the requried libraries for the machine learning demos, and keep everything neat and tidy. (If you already use another system and would prefer to stick with that, by all means.)

* Go to [anaconda.com/download](https://www.anaconda.com/download)  
* **Download the Python 2.7 version, not Python 3!**  
* Install it on your computer and open the `Anaconda Navigator` app  
* Create an environment (called `CreativeProgramming2` or something like that)  
* Once it's created, install the `scikit-learn`, `scikit-image`, `pillow` libraries  
* Optionally, you can also install `ffmpeg`, `ipython`, and `ipython-notebook`  

(See the `Resources` folder for screenshots on creating an environment and installing libraries.) Please do this at least a few days ahead of class, to make sure it works right. Email me if something doesn't work and I can try to help.

### FOR THURSDAY, APRIL 5:  
For next week, please have work ready for an in-progress critique. This should be a working prototype or in some way far enough along to not require a ton of explanation. If you need to fake elements (like mouse interaction instead of blob tracking) that's totally fine. Consider bringing sketches and other materials that help contextualize your project.

### FOR THURSDAY, APRIL 12:  
Finish project, write final project proposal. Details TBD soon.

### RESOURCES  

* Lots of online face and emotion recognition tools, like [this one from Amazon](https://console.aws.amazon.com/rekognition), [this one from Google](https://cloud.google.com/vision/docs/detecting-faces), and 
* Some excellent libraries (in addition to OpenCV's tools) including [OpenFace](https://cmusatyalab.github.io/openface) and [JavaCV](https://github.com/bytedeco/javacv)  
* Some of these references are a bit out of date, but [Daniel Shiffman's workshop Face It](https://github.com/shiffman/Face-It) has some great resources and examples  
* [Chernoff faces](https://en.wikipedia.org/wiki/Chernoff_face) are an interesting model for data visualization involving faces  
* A lot of vision research points to our sight being driven by contrast, much like the edges in neural networks. For example, [this article on toad vision](https://en.wikipedia.org/wiki/Feature_detection_%28nervous_system%29#In_toad_vision), which links to [this crazy video](https://av.tib.eu/media/15148#t=0,00:25)  
* Do you see faces in random objects? It's a phenomenon called [pareidolia](https://en.wikipedia.org/wiki/Pareidolia)  
* [Facial Action Coding System (FACS)](https://en.wikipedia.org/wiki/Facial_Action_Coding_System), a system to numerically encode facial expressions  
* Face recognition can be [tricked by invisible infrared light](https://boingboing.net/2018/03/26/the-threaten-from-infrared.html), making the computer think you're someone else  

### PROJECTS SHOWN  

* [*Human Traits*](http://patricktresset.com/new/project/human-traits-2015/) by Patrick Tresset  
* Some really great projects by Rafael Lozano-Hemmer, including [*Blow Up*](http://www.lozano-hemmer.com/blow_up.php) and [*Zoom Pavilion*](http://www.lozano-hemmer.com/zoom_pavilion.php)  
* [*MegaPixels: Face Database Query*](https://ahprojects.com/notebook/2017/megapixels/) and [*CV Dazzle*](https://cvdazzle.com/) by Adam Harvey
* [*Facial Weaponization Suite*](http://www.zachblas.info/works/facial-weaponization-suite/) and [*Face Cages*](http://www.zachblas.info/works/face-cages/) by Zach Blas  
* Matthew Plummer-Fernandez's eerie [*Unique Visitors*](http://unique-visitors.tumblr.com/) breeds random 3D faces until they are recognized by OpenCV  
* Heather Dewey-Hagborg's [*Stranger Visions*](http://deweyhagborg.com/projects/stranger-visions), where she collected gum and other trash from public spaces in NYC, extracted the DNA, and reconstructed 3D faces  
* [*People Staring at Computers*](https://vimeo.com/25958231) by Kyle McDonald  
* [*Face Maker* app](http://prostheticknowledge.tumblr.com/post/169232693186/face-maker-ios-app-by-tim-sears-for-iphone-x-lets) by Tim Sears  
* Using only darkroom technology, Nancy Burson's [*Composite Silver Prints*](http://nancyburson.com/composite-silver-prints/)  
* [*Cheese*](http://christianmoeller.com/Cheese) by Christian Moeller, which asks viewers to smile as long as possible  
* Daito Manabe's [*Face Projection*](http://www.daito.ws/en/work/face-projection.html#5) experiments  
* One of Mario Klingemann's [many neural network face experiments](https://www.youtube.com/watch?v=5h4R959O0cY&feature=youtu.be) (see also his [Flickr feed](https://www.flickr.com/photos/quasimondo/albums))  
* The super weird painting [*The Jurist*](https://www.giuseppe-arcimboldo.org/The-Jurist-1566.html) from 1566 by Guiseppe Arcimboldo, which shows a figure made out of raw chicken, fish, and a pile of books  
* Some examples from my own practice, using my blog as a digital sketchbook to record random experiments: [photo-merging eight faces in Photoshop](http://www.jeffreythompson.org/blog/2013/12/17/photomerged-faces/) and [degrading a photo of a face until OpenCV no longer recognizes it](http://www.jeffreythompson.org/blog/2012/05/22/no-longer-a-face/)  
* Find lots of other face-related projects by [searching Prosthetic Knowledge](http://prostheticknowledge.tumblr.com/tagged/face)  
* And [another great list](https://github.com/kylemcdonald/AppropriatingNewTechnologies/wiki/Faces-in-Media-Art) from Kyle McDonald  

### NON-FACE MACHINE-LEARNING PROJECTS  
Some projects that aren't about faces, but use machine learning that we've looked at:

* Two great tutorials on Generative Adversarial Networks, one from [O'Reilly](https://www.safaribooksonline.com/oriole/saf-generative-adversarial-networks-for-beginners) and the other from [OpenAI](https://blog.openai.com/generative-models/)  
* See also tools like [pix2pix](https://affinelayer.com/pixsrv/)  
* Memo Atken's [*Learning to See*](https://vimeo.com/260612034)  
* Mario Klingeman's [*X Degrees of Separation*](http://quasimondo.com/)  
* [*Empty Apartments*](http://emptyapartments.net/), a project by Drift Station (yours truly)  

