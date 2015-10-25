# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

$ ->
	checker = 'aa'
	playerOneColor = 'slot-player-one'
	playerTwoColor = 'slot-player-two'
	gameboard = new Gameboard(checker, playerOneColor, playerTwoColor, 6, 7)

	# When user hovers over column, change background colour
	$('.container-slot').mouseover ->
		# get column number from id
		col = parseId($(this).attr('id'))['id']

		colSelector = '.col-' + col

		# highlight column
		$(colSelector).addClass('container-slot-focus');
		return

	# When user leaves column, return original background colour
	$('.container-slot').mouseleave ->
		# get column number from id
		col = parseId($(this).attr('id'))['id']

		colSelector = '.col-' + col

		# remove highlight of column
		$(colSelector).removeClass('container-slot-focus');
		return

	# Drop a token when user clicks column
	$('.container-slot').click ->
		# get column number from id
		col = parseId($(this).attr('id'))['id']
		# process user's turn
		turnData = gameboard.dropChip(col)

		if turnData['place']['row'] != -1
			
			slotId = getSlotId(turnData['place'])

			# change slot color
			$(slotId).removeClass('slot-empty')
			$(slotId).addClass(turnData["chipColor"])
			# TODO: check if win

		return

# 
# Use slot coordinate to construct slot id
#
# @param string
# @return string
getSlotId = (slotCoord) ->
	slot = '#slot-' + slotCoord['row'] + '-' + slotCoord['col']

	return slot

# 
# Extract id from string
#
# @return object hash
parseId = (idStr) ->
	parsedIdStr = idStr.split('-')
	id = parsedIdStr.pop()

	return { id:id, parsedIdStr:parsedIdStr }