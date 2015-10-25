// Generated by CoffeeScript 1.9.1
var getSlotId, parseId;

$(function() {
  var checker, gameboard, playerOneColor, playerTwoColor;
  checker = 'aa';
  playerOneColor = 'slot-player-one';
  playerTwoColor = 'slot-player-two';
  gameboard = new Gameboard(checker, playerOneColor, playerTwoColor, 6, 7);
  $('.container-slot').mouseover(function() {
    var col, colSelector;
    col = parseId($(this).attr('id'))['id'];
    colSelector = '.col-' + col;
    $(colSelector).addClass('container-slot-focus');
  });
  $('.container-slot').mouseleave(function() {
    var col, colSelector;
    col = parseId($(this).attr('id'))['id'];
    colSelector = '.col-' + col;
    $(colSelector).removeClass('container-slot-focus');
  });
  return $('.container-slot').click(function() {
    var col, slotId, turnData;
    col = parseId($(this).attr('id'))['id'];
    turnData = gameboard.dropChip(col);
    if (turnData['place']['row'] !== -1) {
      slotId = getSlotId(turnData['place']);
      $(slotId).removeClass('slot-empty');
      $(slotId).addClass(turnData["chipColor"]);
      if (turnData['draw']) {
        console.log("DRAW");
      }
    }
  });
});

getSlotId = function(slotCoord) {
  var slot;
  slot = '#slot-' + slotCoord['row'] + '-' + slotCoord['col'];
  return slot;
};

parseId = function(idStr) {
  var id, parsedIdStr;
  parsedIdStr = idStr.split('-');
  id = parsedIdStr.pop();
  return {
    id: id,
    parsedIdStr: parsedIdStr
  };
};