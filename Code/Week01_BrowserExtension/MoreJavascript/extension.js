(function() {
// put your extension code inside here – do not delete 
// the lines above or the last line either!

	function multiply(a, b) {
		var result = a * b;
		console.log(result);
	}
	multiply(2, 3);

	function divide(a, b) {
		var result = a / b;
		return result;
	}
	console.log( divide(4, 5) );

	// TIMEOUTS
	// red, green, blue
	// console.log('red');
	// console.log('green');
	// console.log('blue');

	// console.log('red');
	// setTimeout( function() {
	// 	console.log('blue');
	// }, 2000);		// in milliseconds
	// console.log('green');

	// // INTERVAL
	// function fireworks(numBooms) {
	// 	var count = 0;
	// 	var interval = setInterval(boom, 1000);

	// 	function boom() {
	// 		count += 1;
	// 		if (count == numBooms) {
	// 			clearInterval(interval);
	// 		}
	// 		else {
	// 			console.log('boom!');
	// 		}
	// 	}
	// }
	// fireworks(10);

	// CALLBACKS
	// $('h1').slideUp(2000).slideDown(2000);

	// callback hell
	$('p').click( function() {
		$(this).hide(2000, function() {
			console.log('This text is inside a callback!');
		});
	});

	// easing
	$('img').click( function() {
		$(this).animate(
			{ width: '800px', height: '800px' },
			2000,
			'linear',
			printImageSource
		);
		return false;		// don't follow the link
	});

	function printImageSource() {
		// attribute
		var source = $(this).attr('src');
		console.log(source);
	}

	console.log('Getting earthquake data...');
	$.ajax({
		type: 'GET',
		url: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.csv',
		dataType: 'text',
		success: function(data) { countEarthquakes(data); },
		error: function() { console.log('oops, error!'); }
	});

	function countEarthquakes(data) {
		// regular expressions
		var lines = data.split('\n');
		var numEarthquakes = lines.length;
		console.log('There were ' + numEarthquakes + ' earthquakes in the last week.');
	}













	

// do not delete the line below!
})();
