# CREATING GITHUB REPOSITORIES  

### TLDR  
* [Install Github Desktop](#install-the-github-desktop-app)  
* [Minimal repository](#a-minimal-repository)  
* [Create a repository](#create-your-repo)  
* [Writing Markdown files](#writing-markdown-files)  
* [Publish your repository](#publishing-your-repo)  
* [Update your repository](#update-your-repo)  

Github is a popular site for sharing code projects. It allows you to share your work with others, participate in open-source projects, and can be a great professional tool. (It's also fantastic for version control and collaboration on larger projects!)

In Creative Programming 1, you used Github to access course materials. This semester, you'll become more familiar with the platform by turning in your remaining projects as Github repositories. While Github has a ton of complex functions and can even be accessed through the command line, for our purposes we'll just be creating and updating repos.

***

### INSTALL THE GITHUB DESKTOP APP  

First, download and install the [Github Desktop app](https://desktop.github.com/). This is free software that will let you create and manage repositories without any complex commands.

***

### A MINIMAL REPOSITORY  

A [*repository*](https://en.wikipedia.org/wiki/Repository_(version_control)) is a place (local on your computer or with a service like Github) that not only keeps all your files but allows others to view and download your project (if you've enabled that) and keeps previous versions of files too.

Any repository you create should include at least the following:  

* Your code (which should be clean and commented)  
* Any supporting files required for your project  
* A `README` file explaining what the project is (more details below)  
* For creative projects, at least one screenshot of the piece running  

Optionally, you may want to include:  

* Link to a video of the piece running  
* A license for your project (Github lets you create them in the app!)  
* Tutorial (in the `README` or a separate file) explaining how to install and run the piece and/or how it works  
* Citations to projects that inspired yours, code or tutorials that you used, etc  

***

### CREATE YOUR REPO  

1. In the Github app, go to `File > New Repository...`  
2. Add the following info:  
	* Name for your repo (this will also be the folder it's in)  
	* Description (you can change this later)  
	* Set where the repo should live on your computer  
	* Check `Initialize with a README`  
	* Add a license now, if you want!  
3. Click `Create Repository`  
4. Move your files to the folder that Github creates  

Your repo is technically ready, but you'll want to do a few more things before publishing it.

**UPDATE `README` file**  
The `README.md` file that was created when you made the repo is super minimal, so you'll want to add more to it. See the [next section for more info on editing Markdown](#writing-markdown-files).

**IGNORED FILES**  
There may be files/folders in your project that you don't want included in the repo. You can change what files are ignored by going to `Repository > Repository Settings > Ignored Files...`.

* Folders: name of the folder followed by `/` (ex: `Test/` will ignore all files in the `Test` folder)  
* Files: name of specific files (ex: `.DS_Store`)  
* File types: `*` followed by extension (ex: `*.tiff` will ignore all `tiff` files in all folders)  

***

### WRITING MARKDOWN FILES  

Github's default `README` format uses Markdown, an amazing and straightforward way of creating rich text in a simple text file. Originally created by [John Gruber](https://en.wikipedia.org/wiki/John_Gruber), Markdown lets you include text, headers, links, images, tables, and even images and YouTube videos!

[For a full explanation of the Markdown syntax, see this page.](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) You can also view the syntax of any Markdown file on Github (including this one and all our assignments!) by clicking on the `Raw` button in the upper-right corner when viewing the file.

A basic template might look like this:  

    ![Alt text for the screenshot](https://www.github.com/url/to/a/screenshot/in/your/repo)  

    # REPO NAME  
    A paragraph explaining the project, what it does, etc.

    ### INSTRUCTIONS  
    Optionally, include sections like instructions to run the piece, install diagrams, required code libraries, etc.

You can edit Markdown files in any text editor or directly on the Github website, which gives a nice realtime preview and is great for beginners. Remember that your repo is the public-facing version of your project: spell-check your work and take time to make everything look nice, it counts for a lot!

***

### PUBLISHING YOUR REPO  
When everything is ready, click the `Publish Repo` button in the upper-right corner of the Github Desktop app. This may take a while the first time, especially if you have any large files in the repo.

Once everything is uploaded, check that it appears online correctly. Update the `README`, filenames, etc so it's ready for the public to view. Don't worry if something looks wrong! In the next section we'll look at how to update your repository.

You can change settings for your repo, such as its name and visibility, on the repo's site.

***

### UPDATE YOUR REPO  

As you make changes to your project, you will want to update the repo online:

* Open the Github app and select your repo  
* Check/uncheck the files you want to update  
* Add a "commit message" that describes what you've changed, then click `Commit to master`  
* When all of the files you've changed have been committed, click the `Push origin` button to upload the changes  
* Repeat for any other changes – you can batch multiple files under the same update but generally it's better to chunk them by type  
	* Don't include generic commit messages like "update"  
	* Be specific! Things like "fixed image loading problem" or "cleaned up readme" is much better  

Creating great repos is an art and takes practice!

