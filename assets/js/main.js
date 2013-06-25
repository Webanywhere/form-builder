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
							newItem = '<div class="col-'+width+' col">';
							newItem += '<label for="control_'+nControl+'">Label '+nControl+'</label>';
							newItem += '<input type="text" id="control_'+nControl+'" placeholder="">';
							newItem += '</div>';
							break;
						case 'textarea':
							newItem = '<div class="col-'+width+' col">';
							newItem += '<label for="control_'+nControl+'">Label '+nControl+'</label>';
							newItem += '<textarea id="control_'+nControl+'" placeholder="" rows="3"></textarea>';
							newItem += '</div>';
							break;
						case 'textarea':
							newItem = '<div class="col-'+width+' col">';
							newItem += '<label for="control_'+nControl+'">Label '+nControl+'</label>';
							newItem += '<textarea id="control_'+nControl+'" placeholder="" rows="3"></textarea>';
							newItem += '</div>';
							break;
						case 'select':
							newItem = '<div class="col-'+width+' col">';
							newItem += '<label for="control_'+nControl+'">Label '+nControl+'</label>';
							newItem += '<select id="control_'+nControl+'">';
							newItem += '<option value="1">Option 1</option>';
							newItem += '<option value="2">Option 2</option>';
							newItem += '</textarea>';
							newItem += '</div>';
							break;
						case 'selectmultiple':
							newItem = '<div class="col-'+width+' col">';
							newItem += '<label for="control_'+nControl+'">Label '+nControl+'</label>';
							newItem += '<select id="control_'+nControl+'" multiple="multiple">';
							newItem += '<option value="1">Option 1</option>';
							newItem += '<option value="2">Option 2</option>';
							newItem += '</select>';
							newItem += '</div>';
							break;
						case 'checklist':
							newItem = '<div class="col-'+width+' col">';
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
							newItem = '<div class="col-'+width+' col">';
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
			event.stopPropagation();
		});

		$('.main-panel').on('click', function(event) {
			$('.col, .row').removeClass('selected');
			$('.delete-item').attr('disabled', true);
		})
	}

	var setDeleteHandler = function() {
		$('.delete-item').click(function(event) {
			$('.selected').remove();
		});
	}

	return {
		'getDefaultWidth': getDefaultWidth
	}

}(window.jQuery);