
// test that we have the required div containers to run tests
test( "container exists", function() {
	var $panel = $('.main-panel form')[0];
	ok( $panel, "Panel exists");
});

// test that there are now rows to begin with
test( "no rows", function() {
	ok(typeof($('.row')[0]) == 'undefined', "No rows as expected");
});

// test that we can add rows by clicking the add-row button
test( "add row", function() {
	var $addbtn = $( '.add-row');
	$addbtn.trigger( "click" ); // click the add-row button
	ok(typeof($('.row')[0]) != 'undefined', "We have something, it may not be a row");
	ok($('.row').length == 1, "We have one row");
	$addbtn.trigger( "click" ); // click the add-row button
	ok($('.row').length == 2, "We can click add row twice");
});

// test that we can turn guides on and off
test( "toggle guides", function() {
	var $guideschk = $( '.guides' );
	//$('.main-panel form').addClass('show-guides');
	$guideschk.trigger( "click" );
	ok( !$( '.main-panel form').hasClass('show-guides'), "Add guides works");
	$guideschk.trigger( "click" );
	ok( $( '.main-panel form').hasClass('show-guides'), "Remove guides works");
});
