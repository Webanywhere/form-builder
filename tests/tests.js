
// test that we have the required div containers to run tests
test( "container exists", function() {
	var $panel = $('.main-panel form')[0];
	ok( $panel, "Panel exists on-load as expected");
});

// test that there are now rows to begin with
test( "no rows", function() {
	ok(typeof($('.row')[0]) == 'undefined', "No rows on-load as expected");
});

// test that we can add rows by clicking the add-row button
test( "add row", function() {
	var $addbtn = $( '.add-row');
	$addbtn.trigger( "click" ); // click the add-row button
	ok(typeof($('.row')[0]) != 'undefined', "We've added something like a row, it may not be exactly a row");
	ok($('.row').length == 1, "We have exactly one row-like item");
	$addbtn.trigger( "click" ); // click the add-row button
	ok($('.row').length == 2, "Clicking add-row twice gives us exactly two row-like items");
});

// test that we can turn guides on and off
test( "toggle guides", function() {
	var $guideschk = $( '.guides' );
	//$('.main-panel form').addClass('show-guides');
	$guideschk.trigger( "click" );
	ok( !$( '.main-panel form').hasClass('show-guides'), "Clicking the guides checkbox toggles on the guides class");
	$guideschk.trigger( "click" );
	ok( $( '.main-panel form').hasClass('show-guides'), "Clicking the guides checkbox a second time toggles off the guides class");
});

// test that we can get a default width
test( 'default width', function() {
	equal(main.getDefaultWidth(), 12, "Default to 12");
	$('#default-width').slider('value', 4)
	equal(main.getDefaultWidth(), 4, "Change to 4");
});
