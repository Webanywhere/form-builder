var main = function($) {
	var nControl = 0;

	$(function() {
		setGuidesHandler();
		setAddRowHandler();
		setControlsHandler();
		setupDefaultWidth();
		setSelectHandler();
		setDeleteHandler();
	});

	var setGuidesHandler = function() {
		$('.guides').click(function(event) {
			if ($(this).is(':checked')) {
				$('.main-panel form').addClass('show-guides');
			} else {
				$('.main-panel form').removeClass('show-guides');
			}
		});
	}

	var setAddRowHandler = function() {
		$('.add-row').click(function(event) {
			var newRow = $('<div class="row"></div>');
			$('.main-panel form').append(newRow);
			var options = {
				'accept': '.control',
				'connectWith': '.row',
				'placeholder': 'placeholder',
				'stop': function(event, ui) {
					var item = $(ui.item[0]);
					var width = getDefaultWidth();
					nControl++;
					switch (item.attr('data-control')) {
						case 'input':
							newItem = '<div class="col col-'+width+'">';
							newItem += '<label for="control_'+nControl+'">Label '+nControl+'</label>';
							newItem += '<input type="text" id="control_'+nControl+'" placeholder="" name="control_'+nControl+'">';
							newItem += '</div>';
							break;
						case 'textarea':
							newItem = '<div class="col col-'+width+'">';
							newItem += '<label for="control_'+nControl+'">Label '+nControl+'</label>';
							newItem += '<textarea id="control_'+nControl+'" placeholder="" rows="3" name="control_'+nControl+'"></textarea>';
							newItem += '</div>';
							break;
						case 'select':
							newItem = '<div class="col col-'+width+'">';
							newItem += '<label for="control_'+nControl+'">Label '+nControl+'</label>';
							newItem += '<select id="control_'+nControl+'">';
							newItem += '<option value="1">Option 1</option>';
							newItem += '<option value="2">Option 2</option>';
							newItem += '</textarea>';
							newItem += '</div>';
							break;
						case 'selectmultiple':
							newItem = '<div class="col col-'+width+'">';
							newItem += '<label for="control_'+nControl+'">Label '+nControl+'</label>';
							newItem += '<select id="control_'+nControl+'" multiple="multiple">';
							newItem += '<option value="1">Option 1</option>';
							newItem += '<option value="2">Option 2</option>';
							newItem += '</select>';
							newItem += '</div>';
							break;
						case 'checklist':
							newItem = '<div class="col col-'+width+'">';
							newItem += '<div class="checkbox">';
							newItem += '<label>';
							newItem += '<input type="checkbox" value="">';
							newItem += 'Label A'
							newItem += '</label>';
							newItem += '</div>';
							newItem += '<div class="checkbox">';
							newItem += '<label>';
							newItem += '<input type="checkbox" value="">';
							newItem += 'Label B'
							newItem += '</label>';
							newItem += '</div>';
							newItem += '</div>';
							break;
						case 'radiolist':
							newItem = '<div class="col col-'+width+'">';
							newItem += '<div class="radio">';
							newItem += '<label>';
							newItem += '<input type="radio" value="">';
							newItem += 'Label A'
							newItem += '</label>';
							newItem += '</div>';
							newItem += '<div class="radio">';
							newItem += '<label>';
							newItem += '<input type="radio" value="">';
							newItem += 'Label B'
							newItem += '</label>';
							newItem += '</div>';
							newItem += '</div>';
							break;
						default:
							// Error: fail silently
							return false;
					}

					item.replaceWith(newItem);
				}
			};

			$(newRow).sortable(options);
		});
	}

	var setControlsHandler = function() {
		var options = {
			revert: 'invalid',
			helper: 'clone',
			connectToSortable: '.row'
		};
		$('.control').draggable(options);
	}

	var setupDefaultWidth = function() {
		var options = {
			'min': 1,
			'max': 12,
			'value': 12
		}
		$('#default-width').slider(options);
	}

	var getDefaultWidth = function() {
		return $('#default-width').slider('value');
	}

	var setSelectHandler = function() {
		$('.main-panel form').on('click', '.col, .row', function(event) {
			$('.col, .row').removeClass('selected');
			$(this).addClass('selected');
			$('.delete-item').attr('disabled', false);
			updateProperties();
			event.stopPropagation();
		});

		$('.main-panel').on('click', function(event) {
			$('.col, .row').removeClass('selected');
			$('.delete-item').attr('disabled', true);
			updateProperties();
		})
	}

	var setDeleteHandler = function() {
		$('.delete-item').click(function(event) {
			$('.selected').remove();
			updateProperties();
		});
	}

	var updateProperties = function() {
		var selected = $('.col.selected');
		if (selected.length) {
			selected = $(selected[0]);

			// Clear previous properties
			$('.properties').html('');

			// Add Id handler
			var id = selected.find('label').attr('for');
			$('.properties').append('<label>Id</label><input type="text" value="'+id+'" id="properties-id">');
			$('#properties-id').bind('input propertychange', function(event) {
				var value = $(this).val();
				selected.find('label').attr('for', value);
				selected.find('input[type=text]').attr('id', value);
				selected.find('input[type=text]').attr('name', value);
				selected.find('textarea').attr('id', value);
				selected.find('textarea').attr('name', value);
				
			});

			// Add Width handler
			var classes = selected.attr('class').split(/\s+/);
			var columnClass = _.find(classes, function(item) {
				return item.match(/^col\-[0-9]+$/);
			});
			var width = parseInt(columnClass.match(/^col\-([0-9]+)$/)[1]);
			$('.properties').append('<label>Width (1-12)</label><input type="text" value="'+width+'" id="properties-width">');
			$('#properties-width').bind('input propertychange', function(event) {
				var value = parseInt($(this).val());
				if (value >= 1 && value <= 12) {
					_.each(_.range(1,13), function(element) {
						selected.removeClass('col-'+element);
					})
					console.log(width);
					selected.addClass('col-'+value);
				}
				
			});

			// Add Label handler
			var label = selected.find('label').text();
			$('.properties').append('<label>Label</label><input type="text" value="'+label+'" id="properties-label">');
			$('#properties-label').bind('input propertychange', function(event) {
				var value = $(this).val();
				selected.find('label').text(value);
			});

			


			$('.properties, .properties-title').show();
		} else {
			$('.properties, .properties-title').hide();
		}
	}

	return {
		'getDefaultWidth': getDefaultWidth
	}

}(window.jQuery);

function formhtml() {
	return($('#form').html());
};
