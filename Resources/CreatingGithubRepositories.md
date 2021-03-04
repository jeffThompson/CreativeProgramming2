# CREATING GITHUB REPOSITORIES  
 
* [Install Github Desktop](#install-the-github-desktop-app)  
* [Minimal repository](#a-minimal-repository)  
* [Create a repository](#create-your-repo)  
* [Writing Markdown files](#readme-and-markdown)  
* [Publish your repository](#publishing-your-repo)  
* [Update your repository](#update-your-repo)  

Github is a popular site for sharing code projects. It allows you to share your work with others, participate in open-source projects, and can be a [great professional tool](https://happygitwithr.com/big-picture.html#what-is-the-payoff). (It's also fantastic for version control and collaboration on larger projects!)

In Creative Programming 1, you used Github to access course materials. This semester, you'll become more familiar with the platform by turning in your remaining projects as Github repositories. While Github has a ton of complex functions and can even be accessed through the command line, for our purposes we'll just be creating and updating repos.

***

### INSTALL THE GITHUB DESKTOP APP  

First, download and install the [Github Desktop app](https://desktop.github.com/). This is free software that will let you create and manage repositories without any complex commands.

***

### A MINIMAL REPOSITORY  

A [*repository*](https://en.wikipedia.org/wiki/Repository_(version_control)) is a combination of a location where project files are located and software that keeps track of changes to those files. Services like Github make this whole process easier, plus provide the opportunity for others to view and download your project, and keeps a backup of all your files for you. As [Jenny Bryan and Jim Hester put it](https://happygitwithr.com/big-picture.html): think of Github as Microsoft Word's `Track Changes` on steroids.

Any repository you create should include at least the following:  

* Your code (which should be clean and commented)  
* Any supporting files required for your project such as images, fonts, and other Javascript files  
* A `README` file explaining what the project is (more details below)  
* For creative projects, at least one screenshot of the piece running  

Optionally, you may want to include:  

* Link to a video of the piece running and/or more images  
* A license for your project (Github lets you add them when creating your repo!)  
* Tutorial explaining how to install and run the piece and/or how it works (in the `README` or a separate file)  
* Citations to projects that inspired yours, code or tutorials that you used, etc  

***

### CREATE YOUR REPO  

1. In the Github app, go to `File > New Repository...`  
2. Add the following info:  
	* Name for your repo (this will also be the name of the folder for your project)  
	* Description (you can change this later)  
	* Set where the repo should live on your computer  
	* Check `Initialize with a README`  
	* Add a [license](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/licensing-a-repository) now, if you want!  
3. Click `Create Repository`  
4. Move your files to the folder that Github creates  

**IGNORED FILES**  
There may be files/folders in your project that you don't want included in the repo. These might be large files like print-res images or screen recordings, files or folders with notes or WIP, files that list API keys or passwords, etc. You can change what files are ignored by going to `Repository > Repository Settings > Ignored Files...`:  

* Folders: name of the folder followed by `/` (ex: `Test/` will ignore all files in the `Test` folder)  
* Files: name of specific files (ex: `.DS_Store`)  
* File types: `*` followed by extension (ex: `*.tiff` will ignore all `tiff` files in all folders)  

***

### `README` AND MARKDOWN  
One thing every repository needs is a [`README` file](https://en.wikipedia.org/wiki/README): this document, usually a simple text file of some kind, outlines the project, tells us what it is for, and gives us other helpful information like how to run it or what extra code libraries you used. Github's default `README` format uses Markdown, an amazing and straightforward way of creating rich text in a simple text file. Originally created by [John Gruber](https://en.wikipedia.org/wiki/John_Gruber), Markdown lets you include text, headers, links, images, tables, and even images and YouTube videos!

[For a full explanation of the Markdown syntax, see this page.](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) You can also view the syntax of any Markdown file on Github (including this one and all our assignments!) by clicking on the `Raw` button in the upper-right corner when viewing the file.

A basic template might look like this:  

    ![Alt text for the screenshot](https://www.github.com/url/to/a/screenshot/in/your/repo)  

    # PROJECT NAME  
    A paragraph or two explaining the project, what it does, etc

    ### INSTRUCTIONS, ETC  
    Optionally, include sections like instructions to run the piece, install diagrams, required code libraries, etc

You can edit Markdown files in any text editor or directly on the Github website, which gives a nice realtime preview and is great for beginners. Remember that your repo is the public-facing version of your project: spell-check your work and take time to make everything look nice, it counts for a lot!

***

### PUBLISHING YOUR REPO  
When everything is ready, click the `Publish Repo` button in the upper-right corner of the Github Desktop app. This may take a while the first time, especially if you have any large files in the repo.

Once everything is uploaded, check that it appears online correctly. Update the `README`, filenames, etc so it's ready for the public to view. Don't worry if something looks wrong! In the next section we'll look at how to update your repository.

***

### UPDATE YOUR REPO  

As you make changes to your project, you will want to update the repo on Github to reflect those changes:

* Open the Github app and select your repo  
* Check/uncheck the files you want to update  
* Add a "commit message" that describes what you've changed, then click `Commit to master`  
* When all of the files you've changed have been committed, click the `Push origin` button to upload the changes  
* Repeat for any other changes – you can batch multiple files under the same update but generally it's better to chunk them by type  
	* Don't include generic commit messages like "update"  
	* Be specific! Things like "fixed image loading problem" or "cleaned up readme" is much better  

If you change a file on the Github website (for example, if you edit your `README` file), you'll want to `pull` those changes to your computer. In the Github app, click the `Fetch origin` button, which syncs the list of files between your computer and Github. Then click `Pull origin` to download the changed files.

You can change settings for your repo, such as its name and visibility, on the repo's site.

