# CREATING GITHUB REPOSITORIES  

Github is a popular site for sharing code projects. It allows you to share your work with others, participate in open-source projects, and can be a great professional tool. (It's also fantastic for version control and collaboration on larger projects!)

In previous semesters, you've interacted with Github through course materials. This semester, you'll be turning in your remaining projects as Github repositories. While Github has a ton of complex functions and can even be accessed through the command line, for our purposes we'll just be creating and updating repos.


## INSTALL THE GITHUB DESKTOP APP  

First, download and install the [Github Desktop app](https://desktop.github.com/). This is free software that will let you create and manage repositories without any complex commands.


## A MINIMAL REPOSITORY  

Any repository you create should include at least the following:  

* Your code (which should be clean and commented)  
* At least one screenshot of it running  
* A `README` file explaining what the project is  

Optionally, you may want to include:  

* A video of the piece running  
* A license (Github lets you create them in the app!)  
* Tutorial files explaining how the piece works  


## CREATE YOUR REPO  

1. In the Github app, go to `File > New Repository...`  
2. Add the following info:  
	* Name for your repo (this will also be the folder it's in)  
	* Description (you can change this later)  
	* Set where the repo should live on your computer  
	* Check `Initialize with a README`  
	* Add a license now, if you want!  
3. Click `Create Repository`  
4. Move your files to the folder that Github creates  
5. Update the `README.md` file that was created (see section below for editing Markdown)  
6. Go to `Repository > Repository Settings > Ignored Files...`  
	* Add folders by name followed by `/` (ex: `Test/` will ignore all files in the `Test` folder)  
	* Add types of files you want to ignore with `*` (ex: `*.tiff` will ignore all `TIFF` files, which might be very large versions for printing that don't need to be included)  
7. When ready, click the `Publish Repo` button in the upper-right corner – this may take a while the first time, especially if you have any large files in the repo  
8. Check that it appears online correctly, update the `README`, etc so it's ready for the public to view  


## UPDATE YOUR REPO  

As you make changes, you will want to update the repo online.  

* Open the Github app and select your repo  
* Check the files you want to update  
* Add a "commit message" that describes what you've changed  
* Click the `Push origin` button to upload the changes  
* Repeat for any other changes – you can batch multiple files under the same update but generally it's better to chunk them by type  
	* Don't include generic commit messages like "update"  
	* Be specific! Things like "fixed image loading problem" or "cleaned up readme" is much better  


## EDITING MARKDOWN  

Github's default `README` format uses Markdown, an amazing and straightforward way of creating rich text in a simple text file. Originally created by John Gruber, Github extends this functionality to include text headers, links, images, tables, and even images and YouTube videos!

[For a full explanation of the Markdown syntax, see this page.](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) You can also view the syntax of any Markdown file on Github (including this one and all our assignments!) by clicking on the `Raw` button in the upper-right corner when viewing the file.

A basic template might look like this:  

    ![Alt text for the screenshot](https://www.github.com/url/to/a/screenshot/in/your/repo)  

    # REPO NAME  
    A paragraph explaining the project, what it does, etc.

    ## INSTRUCTIONS  
    Optionally, include sections like instructions to run the piece, install diagrams, required code libraries, etc.

You can also edit Markdown files directly on the Github website, which gives a nice realtime preview and is great for beginners. Remember that your repo is the public-facing version of your project: spell-check your work and take time to make everything look nice, it counts for a lot!

