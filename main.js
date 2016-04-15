'use strict';

$(document).ready(init);

var woes = [];
var changeWoe = false;
var isAlpha = false;
var isPhone = false;
var isAlphaEmail = false;
var isBirth = false;
var editObj;

function init() {
  updateList();
  var $body = $('#body');

  $('#add').click(add);
  $body.on('click', '.remove', remove);
  $body.on('click', '.edit', edit);
  $body.on('click', '#editConfirm', confirm);
  $body.on('click', '.select',(select));
  $('#removeSelected').click(removeSelected);
  $('#sortAlpha').click(sortAlpha);
  $('#sortAlphaEmail').click(sortAlphaEmail);
  $('#sortBirth').click(sortBirth);
  $('#revealAll').click(revealAll);
  $('#revealFriends').click(revealFriends);
  $('#revealFamily').click(revealFamily);
  $('#revealCustom').click(revealCustom);
}

function add() {
  console.log('add',add);
  var $newNameVal = $('#newName').val();
  var $newPhoneVal = $('#newPhone').val();
  var $newEmailVal = $('#newEmail').val();
  if ( (!$newNameVal) && (!$newPhoneVal && !$newEmailVal)) {
    alert("At least enter a name, phone number, or email.");
    return;
  };
  var woe = {};
  woe.name = $newNameVal;
  woe.phone = $newPhoneVal;
  woe.email = $newEmailVal;
  woe.group = _.uniq($('#newGroup').val().toLowerCase().split(/\W/)) ;
  woe.birthday = $('#newBirthday').val();
  woes.push(woe);
}
