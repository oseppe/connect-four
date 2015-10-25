# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

$ ->
	playerOneColor = 'slot-player-one'
	playerTwoColor = 'slot-player-two'
	gameboard = new Gameboard(playerOneColor, playerTwoColor, 6, 7)

	checker = new LastChipMethod(gameboard.rows, gameboard.columns, 4);
	gameboard.setChecker(checker);

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
		# check if game has ended
		return if gameboard.finished
		
		# get column number from id
		col = parseId($(this).attr('id'))['id']
		
		# process user's turn
		turnData = gameboard.dropChip(col)

		if turnData['place']['row'] != -1
			
			slotId = getSlotId(turnData['place'])

			# change slot color
			$(slotId).removeClass('slot-empty')
			$(slotId).addClass(turnData["chipColor"])
			
			changeNotification(turnData)

		return

  # # Reset game
  # $('#new-game').click (e) ->
  #   e.preventDefault()
  #   gameboard.restart
  #   $(this).removeClass('new-game-emphasis')
  #   return

# 
# Change the notification
# 
# @param object hash
# @return
changeNotification = (turnData) ->
	# NOTE: checking order is important.
	# ALWAYS FIRST check if there is a win THEN check if there is a draw 

	# FIRST check if win
	if turnData['win']
    # change notification based on who won
		switch(turnData['player'])
    	when 1
        $('.notification').html('<h3><font class="notification-font-player-one">PLAYER 1 WINS!</font></h3>')

    	when 2
        $('.notification').html('<h3><font class="notification-font-player-two">PLAYER 2 WINS!</font></h3>')

    # $('#new-game').addClass('new-game-emphasis')
    emphaziseNewGame()

	# THEN check if draw.
	else if turnData['draw']
    # change notification to draw
		$('.notification').html('<h3><font class="notification-font-draw">ITS A DRAW!</font></h3>')
  # $('#new-game').addClass('new-game-emphasis')
  emphaziseNewGame()

	else
    # change notification based on who's turn is it
		switch(turnData['player'])
    	when 1
        $('.notification').html('<h3><font class="notification-font-player-two">PLAYER 2</font> turn</h3>')
        
    	when 2
        $('.notification').html('<h3><font class="notification-font-player-one">PLAYER 1</font> turn</h3>')
	        
		
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

# 
# Construct the notification
# 
# @param object hash
# @return
emphaziseNewGame = () ->
  $('#new-game').addClass('new-game-emphasis')
  return