(function() {
// put your extension code inside here – do not delete 
// the lines above or the last line either!

	/*
	PUPPIFY
	Jeff Thompson | 2017 | jeffreythompson.org

	A browser extension that adds some doggo flair to any
	website (plus Javascript and JQuery basics).

	Designed to work on Wikipedia pages, since it uses
	Wikipedia-specific classes and IDs. Will work on
	other pages, but not as well.

	*/

	// we can print text to the console, just
	// like the println() command in processing
	// to open the console, go to:
	//   View > Developer > JavaScript Console
	console.log('Get ready for my cool extension!');

	// strings in javascript, like in python, are
	// noted with either single or double quotes

	// variables are not typed, also like python
	var pi = 3.14;
	pi *= 5;
	console.log('PI x 5 = ' + pi);

	// for loops are just like processing, except
	// that we don't have to use 'var' with i
	for (i=0; i<3; i++) {
		console.log(i);
	}

	// this is all great, but since our extension will
	// be interacting with a web-page, we really want
	// to access the page's elements – this is possible
	// using plain js, but the very popular library
	// jquery makes this MUCH easier and our code cleaner

	// try these on a wikipedia entry...

	// get all the section headlines using their class name
	// note this returns an array of items
	var headlines = $('.mw-headline');
	console.log('We found ' + headlines.length + ' headlines');

	// we can get unique objects by their id
	// here we extract the text from the page's subtitle
	var subtitle = $('#siteSub').text();
	console.log(subtitle);

	// likely more useful for us, we can get all instances
	// of a particular html tag, such as paragraphs
	var paragraphs = $('p');

	// we can iterate these elements, too
	for (i=0; i<paragraphs.length; i++) {
		var p = $(paragraphs[0]);
		console.log(p.text());
	}

	// we can also do this in a more jquery-like way
	$('li').each( function() {
		console.log( $(this).text() );
	});

	// this weird, nested syntax with things inside
	// parentheses inside parentheses is common to
	// jquery – cleanly formatted code is a must!
	
	// now that we can search the dom, we can also
	// make changes to it – any css attribute can
	// be manipulated by jquery very easily!

	// change the background color of every element
	$('*').css( { 'background-color': 'rgb(255,192,203)' });

	// we can also change more than one css property
	$('p').css( {
		'font-style': 'italic',
		'text-decoration': 'line-through'
	});

	// the destination of links can also be changed:
	// change all links to images of cute doggos
	$('a').attr('href', 'https://www.facebook.com/heckindoggos');

	// we can do more complex searches and change text too
	// get all list elements inside the sidebar
	$('#mw-panel li').each( function() {

		// since each <li> tag includes a link, we can insert
		// fully-formed html right into the document
		$(this).html('<a href="https://en.wikipedia.org/wiki/Puppy">Puppers</a>');
	});

	// one more: split each paragraph into words, random insert some
	// hearts, and put the sentence back together
	$('p').each( function() {
		var words = $(this).text().split(' ');	// split words into an array
		var output = '';						// output string
		for (i=0; i<words.length; i++) {
			output += words[i];					// add the word
			if (Math.random() < 0.2) {			// 20% chance of a heart!
				output += ' &hearts;';
			}
			output += ' ';						// add a space
		}
		$(this).html(output);					// update the paragraph text
	});

	// just like we changed the destination of a link, we can change
	// other "attributes" as well, such as the url of images

	// an array of urls to cute doggo images
	var doggos = [ 'b/b1/ACD_Silverbarn%27s_Ronja_x.jpg', '1/17/Westie_pups.jpg', '7/71/St._Bernard_puppy.jpg', 'f/ff/Raskal.jpg' ];
	
	// go through each image on the page
	$('img').each( function() {

		// pick a random image to use
		// note that random() returns a number 0–1, so we have to scale
		// it to the number of images, then convert it to an integer
		var which = Math.floor(Math.random() * doggos.length);

		// change the image's source url
		$(this).attr('src', 'https://upload.wikimedia.org/wikipedia/commons/' + doggos[which]);
	});

	// finally, we can make changes that happen smoothly using jquery's
	// animate() command – it changes the style of an element, with a
	// second parameter setting the duration in milliseconds
	$('h1').animate( { 'font-size': '72px' }, 3000);


// do not delete the line below!
})();
