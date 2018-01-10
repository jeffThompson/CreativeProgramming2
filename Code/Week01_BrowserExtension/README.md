
BROWSER EXTENSION TUTORIAL
====

This code includes a demo of basic Javascript syntax and ways to interact with the webpage elements:

* HTML [Document Object Model](https://en.wikipedia.org/wiki/Document_Object_Model) (or DOM), the objects that make up a webpage like text and images  
* [Cascading Style Sheets](https://en.wikipedia.org/wiki/Cascading_Style_Sheets) (or CSS), the properties that define DOM objects like font size and background color

Further in the code, we manipulate a page to add doggo flair, including images of cute puppers and changing all links. This README includes a description of the basic parts you'll need to build a browser extension, install, and test it. For more info on CSS, Javascript, and JQuery, see the `Resources` section at the bottom.

- - -

### FILES
While there are lots of ways to structure an extension, we need at least two files: some Javascript to run and a "manifest" file.

**EXTENSION.JS**  
Your code! This is the extension code itself, which is called by `background.js` when the button is pressed. This isn't the only way to handle this, but it keeps the rest of the code tucked away and the messy bits hidden (based on [this template code](https://gist.github.com/danharper/8364399)).

**BACKGROUND.JS**  
A script that runs constantly, waiting for the extension button to be clicked. No need to change this if using our template, but if you wanted the extension to run automatically or access other parts of the Chrome API, you'd likely need to do it here.

**MANIFEST.JSON**  
A metadata file in [JSON format](https://en.wikipedia.org/wiki/JSON) that lists properties and permissions for your extension. Comments aren't allowed in JSON files, so here's info about each section.

* `name`, `description`, `version`, etc: information about the extension itself and who made it – you'll need to update this for your project  
* `browser_action`: interface elements for your extension...  
  * `default_title`: popup text that appears when the user hovers over the extension's button, telling us what it does  
  * `default_icon`: path to a png icon file (should be 19x19px)  
* `permissions`: what access your extension should have...  
  * `tabs`: allow access to the list of tabs that are open, and let us change their contents  
  * `<all_urls>`: let us access and change any page (we could also list a specific url, or use the `*` for wildcard selection – for example, `*.gov` would only change pages with the US government [TLD](https://en.wikipedia.org/wiki/Top-level_domain))  
* `background`: path to the `background.js` script (see info above)  
* `content_scripts`: extra Javascript files to load that need to be seen by all parts of the extension (in this case we need JQuery, so it gets listed here)  
* `manifest_version`: tells Chrome which version of the manifest spec this is (leave at 2)

- - -

### INSTALLING YOUR EXTENSION

Once you're ready to try your extension, you'll have to add it to your browser.

* In the address bar, type `chrome://extensions`  
* Check box that says `Developer mode`  
* Click `Load unpacked extension...` and navigate to the folder with your code in it  
* Check the `Enabled` box to activate your extension  
* If you make changes to the `manifest.json` file, you can reload the extension from this page – you can also delete your extension from here, if you want  

### SEEING CHANGES  
If you're just changing the `extension.js` file, you don't need to reload the extension itself. 

Instead:  
* Save the `extension.js` file  
* Click the extension button again  
* If the page is messed up, you can refresh it before running the extension again  

- - -

### TECHNICAL RESOURCES  
While by no means exhaustive, below are some useful information on what properties can be manipulated through HTML and CSS, some of the ways JQuery can interact with a page's content, and other resources for developing extensions.

**HTML AND CSS**  
Some useful links for tags and properties to manipulate:

* A [list of all valid HTML tags](https://www.w3schools.com/tags/) that you might consider targeting  
* A [list of CSS properties](https://www.w3schools.com/cssref/default.asp), which should give you an idea of what parameters you can change on a page  

**JQUERY**  
Some of the ways JQuery can interact with a page's content:

* [Selecting elements](https://api.jquery.com/category/selectors)  
* [Manipulating the DOM](https://api.jquery.com/category/manipulation)  
* [Effects, including animation](https://api.jquery.com/category/effects)  

**EXTENSIONS**  
The official Chrome extension documentation (gets super complex really quickly, but might be useful):

* [Sample extensions](https://developer.chrome.com/extensions/samples)  
* [Commands to access Chrome via Javascript](https://developer.chrome.com/extensions/api_index)  
* Other (mostly fancy) things extensions can do in the [developer's guide](https://developer.chrome.com/extensions/devguide)  
* [How to publish your finished extension](https://developer.chrome.com/extensions/hosting)  

**PORTING TO FIREFOX**  
It shouldn't take too much work to get your extension to work in Firefox as well. See [this guide](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Porting_a_Google_Chrome_extension) for more info.

