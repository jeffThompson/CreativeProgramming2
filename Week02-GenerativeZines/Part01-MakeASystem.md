# PART 1: MAKE A SYSTEM

### TLDR
* Due Feb 7  
* Create a project in Visual Studio Code  
  * Set your canvas to `792 x 1224`  
* Make a system  
  * Create at least three good outputs  
  * Upload the images to Canvas
* Read [*The Rise of Long-Form Generative Art*](https://tylerxhobbs.com/essays/2021/the-rise-of-long-form-generative-art) by Tyler Hobbs  
  * Optional: [*So You Want to Build A Generator...*](https://galaxykate0.tumblr.com/post/139774965871/so-you-want-to-build-a-generator) by Kate Compton  
  * Optional: [*Flow Fields*](https://tylerxhobbs.com/essays/2020/flow-fields), also by Tyler Hobbs  
  * Optional: [*Generating Fantasy Maps*](http://mewo2.com/notes/terrain) by Martin O'Leary  

- - -

### CREATE A PROJECT  
Using Visual Studio Code and the `p5.js` extension, create a project on your computer. (See `Using An External Editor` in the `Resources` folder for more details.) Open the `sketch.js` file and make the canvas `792 x 1224 pixels`.

Why that size? The paper we'll use for our zines is `11 x 8.5 inches`, folded in half so each page is `5.5 x 8.5 inches`. Our sketches get saved as screen resolution, which is normally `72 pixels per inch` (though many displays are now much higher).

From this, we can calculate the size our sketch needs to be...

    5.5" x 72ppi = 396 pixels wide
    8.5" x 72ppi = 612 pixels high

That's kind of small, but doubling it gives us a good size! 

    5.5" x 144ppi = 792 pixels wide
    8.5" x 144ppi = 1224 pixels high

If you can't see everything, you can zoom in with your browser for a better view... can't do that with the online editor! When printing, we can scale the artwork to match the paper.

- - -

### MAKE A SYSTEM  
We'll start this project not thinking about zines but about systems. Generative art and design projects use custom-built, code-based systems packed with lots of variables. They can be tweaked to explore what the system is capable of creating. These systems also often employ randomness to shake up the combinations of variables. (In many ways, zines and books are like this too!)

If this is all sounding massively complicated, don't worry! We can think of "system" here as meaning: write some code that makes really varied, interesting output. Some circles with random diameters and placement could be a system, and with some careful tweaks it could be a really interesting one!

A few things that may be helpful:  
* `random()`  
* `map()`  
* for-loops, to create multiple shapes  
* functions, to make your code repeatable  
* limit your color palette and/or shapes you're using  

Play around until you find something interesting, then try to think of all the ways it can be transformed by changing different variables. When you have something that feels ready, add the `save()` command at the end of your sketch (be sure to add `noLoop()`!). Run it a bunch of times and pick your favorite three.

Please upload your images to Canvas (no need to turn in your code). We'll laser print them next week in the Fab Lab, workshop them, and then talk about typography in code and do some bookbinding.

