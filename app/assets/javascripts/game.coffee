# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

$ ->
	# When user hovers over column, change background colour
	$('.container-slot').mouseover ->
		# get column number from id
		col = parseId($(this).attr('id'))[0]

		# highlight column
		colSelector = '.col-' + col
		$(colSelector).addClass('container-slot-focus');
		return

	$('.container-slot').mouseleave ->
		# get column number from id
		col = parseId($(this).attr('id'))[0]

		# remove highlight of column
		colSelector = '.col-' + col
		$(colSelector).removeClass('container-slot-focus');
		return


parseId = (idStr) ->
	parsedIdStr = idStr.split('-')
	id = parsedIdStr.pop()

	return [id ,parsedIdStr]