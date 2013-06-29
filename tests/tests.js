// helper function to add a new row
function addnewrow() {
	$( '.add-row').trigger( "click" );
};

// ensure that all rows are removed after each test
module( "form-builder", {
	teardown: function() {
		$('.ui-sortable').remove();
	}
});

// test that we have the required div containers to run tests
test( "container exists", function() {
	var $panel = $('.main-panel form')[0];
	ok( $panel, "Panel exists on-load as expected");
});

// test that we can add rows by clicking the add-row button
test( "add remove rows", function() {
	equal(typeof($('.ui-sortable')[0]), 'undefined', "No rows on-load as expected");
	//var $addbtn = $( '.add-row');
	//$addbtn.trigger( "click" ); // click the add-row button
	addnewrow();
	equal($('.ui-sortable').length, 1, "We have exactly one row-like item");
	addnewrow();
	equal($('.ui-sortable').length, 2, "Clicking add-row twice gives us exactly two row-like items");
	$('.row').trigger( 'click' ); // select a row
	equal($('.selected').length, 1, "Selected a row");
	$('.delete-item').trigger( 'click' ); // click the delete button
	equal($('.ui-sortable').length, 1, "Delete a single row");
	$('.row').trigger( 'click' );  // select a row
	$('.delete-item').trigger( 'click' ); // click the delete button
	equal($('.ui-sortable').length, 0, "Delete last row");
	$('.main-panel').trigger( 'click' );  // make sure nothing's selected
	equal($('.delete-item').prop('disabled'), true, "Ensure delete button is disabled when nothing selected");
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
	$('#default-width').slider('value', 4);
	equal(main.getDefaultWidth(), 4, "Change to 4");
	$('#default-width').slider('value', 12); // reset to 12 after test so other tests run
});

// test properties of an item
test( 'item properties', function() {
	addnewrow();
	newItem = '<div class="col col-1">';
	newItem += '<label for="control_1">Label 1</label>';
	newItem += '<input type="text" id="control_1" placeholder="" name="control_1">';
	newItem += '</div>';
	$('.ui-sortable').append(newItem);
	$('.col').trigger('click');
	equal($('#properties-id').val(), 'control_1', 'can view item properties');
	
	$('#properties-label').val('hello');
	$('#properties-label').trigger('input');
	equal($("label[for='control_1']").text(), 'hello', 'can change item label');
	
	$('#properties-width').val('4');
	$('#properties-width').trigger('input');
	ok($('.col').hasClass('col-4'), 'can change item width');
});

test( 'form html', function() {
	equal(formhtml(), '<form class="show-guides"></form>', 'we can get the html that the form generates');
});
