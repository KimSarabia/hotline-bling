'use strict';


$(document).ready(init);

function init(){
  console.log('ready!');
  $('#cardHolder').on('click', '.card', clickCard);
  $('#addCards').click(addCards);

}

function addCards(){
  console.log('add:','add works');
  var numCards = $('#numCards').val();
  var $cards = [];

  for(var i = 0; i < numCards; i++){
    var $card = $('<div>').addClass('card');
    $card.text(); // how to grab info from card?
    $card.push()
  }
}

function clickCard(event){
  debugger;
}
