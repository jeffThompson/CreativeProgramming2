(function() {
// put your extension code inside here – do not delete 
// the lines above or the last line either!

	/*
	FUNCTIONS, CALLBACKS, AND ASYNCRONOUS CODE
	Jeff Thompson | jeffreythompson.org | 2018

	Below are some more advanced uses of Javascript:
	+ creating custom functions for reusing code
	+ how Javascript can run syncronously (as most code
	  does) or asyncronously
	+ the setTimeout() and setInterval() functions
	+ callbacks for running a function after some
	  asyncronous code finishes

	NOTE:
	Running this entire example all at once will produce
	some really confusing output in the console. For a 
	easier experience, comment out everything and try
	a section at a time.

	*/

	// FUNCTIONS
	// like most languages, Javascript lets us move code
	// into functions, cleaning up and allowing us to
	// reuse code

	// here's a simple function that multiplies two numbers
	function multiply(a, b) {
		var result = a * b;
		console.log(result);
	}
	multiply(2, 3);

	// sending a variable back from a function is easy too
	// note that this is formatted a lot like Processing, but
	// we don't have to specify the type of variable it returns
	function divide(a, b) {
		var result = a / b;
		return result;
	}
	console.log( divide(4, 5) );

	// you may note that this code is itself wrapped in a function!
	// the syntax is called an "anonymous, self-invoking function" which
	// means that it has no name, and automatically executes when the
	// script is run

	// ASYNCRONOUS CODE
	// Javascript code can be a combination of syncronous code (one line
	// executes and everything waits until it is done before moving on) and
	// asyncronous code (a process kicks off, but code further down can be
	// run while it is waiting to complete)
	// this paradigm can be really confusing if you're new to Javascript (and
	// even if you're not) but is helpful when doing things like timing events
	// and loading large data files from a server

	// TIMEOUTS
	// a timeout (essentially a delay) is a common asyncronous function
	// if it was syncronous, you'd think the code below would print "red blue
	// green", but actually...
	console.log('red');				// 1. print 'red'
	setTimeout( function() {		// 2. create function to be executed in 2 sec
		console.log('blue');		// 4. after 2 sec, print 'blue'
	}, 2000);
	console.log('green');			// 3. print 'green' (not this happens while the
									// setTimeout() function is running!)

	// similarly, the setInterval() command can trigger a repeating event
	// at a specified interval – here we wrap it into a complete function
	// that stops after a certain number of "booms"
	function fireworks(numBooms) {
		console.log('Fireworks:');

		// create a timer that automatically calls the "boom" function
		// every 1000 milliseconds until we stop it
		var interval = setInterval(boom, 1000);

		var count = 0;					// keep track of the number of booms

		function boom() {				// called by setInterval() automatically
			count += 1;					// update the current count
			if (count == numBooms) {	// if we've reached the specified number of booms...
				clearInterval(id);		// ...stop the setInterval()
			}
			else {
				console.log('boom!');	// otherwise, print a 'boom!'
			}
		}
	}
	fireworks(10);						// run our fireworks function 10 times

	// CALLBACKS
	// another common use of asyncronous is to chain events together, especially 
	// when we may not know how long they will take to complete – to do this, functions
	// can specify a function to be triggered when they are done

	// a simple example is to chain together JQuery commands – one will happen
	// after the previous finishes
	$('h1').slideUp(2000).slideDown(2000);

	// here, when a paragraph element is clicked, we hide it over a period of
	// 1000ms, then print some info to the console when it's done
	$('p').click( function() {
		$(this).hide(2000, function() {
			console.log('This text is inside a callback function. It is printed when the hide() function is finished.');
		});
	});

	// the callback function above is written inside the click() function, but
	// we can also specify a separate function to run
	function printImageSource() {
		var source = $(this).attr('src');			// 3. get image source (note $(this) gets passed in)
		console.log(source);						// 4. function prints the image source
	}

	$('img').click( function() {					// 1. when an image is clicked...
		$(this).animate(							// 2. animate it...
			{ width: '800px', height: '800px' },	// 2a. ...change it's size
			2000, 									// 2b. ...over a period of 2 seconds
			'linear', 								// 2c. ...with linear easing
			printImageSource						// 2d. ...when done, run the function above
		);
		return false;								// 5. all done, don't follow the link!
	});

	// loading data from a file is another common reason to use a callback
	// (since we don't know exactly how long the process will take)
	// here we use ajax (which stands for Asyncronous Javascript and XML) to load
	// realtime earthquake data from the US Geological Survey
	console.log('Getting earthquake data...');
	$.ajax({
		type:     'GET',
		url:      'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.csv',
		dataType: 'text',
		success:  function(data) { countEarthquakes(data); },
		error: 	  function() { printErrorMessage(); }
	});

	// if everything loaded ok, the countEarthquakes() function is run
	// if not, print an error message, also using a custom function
	function countEarthquakes(data) {
		var lines = data.split('\n');
		var numEarthquakes = lines.length;
		console.log('There were ' + numEarthquakes + ' earthquakes in the last week.');
	}
	function printErrorMessage() {
		console.log('error loading earthquake data!');
	}

// do not delete the line below!
})();
