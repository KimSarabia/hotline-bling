'use strict';

$(document).ready(init);

var contacts = [];

function init() {
  updateList();
  var $body = $('#body');

  $('#add').click(add);
  $body.on('click', '#editConfirm', confirm);
  $('#sortAlpha').click(sortAlpha);
  $('#sortAlphaEmail').click(sortAlphaEmail);
  $('#sortBirth').click(sortBirth);
  $('#getAll').click(getAll);
  $('#getWoes').click(getWoes);
  $('#getFam').click(getFam);
  $('#showCustom').click(showCustom);
}

function add() {
  var $newNameVal = $('#newName').val();
  var $newPhoneVal = $('#newPhone').val();
  var $newEmailVal = $('#newEmail').val();
  if ( (!$newNameVal) && (!$newPhoneVal && !$newEmailVal)) {
    alert("Please enter your name, email, and number.");
    return;
  };
  var contact = {};
  contact.name = $newNameVal;
  contact.phone = $newPhoneVal;
  contact.email = $newEmailVal;
  contact.group = _.uniq($('#newGroup').val().toLowerCase().split(/\W/)) ;
  contact.birthday = $('#newBirthday').val();
  contacts.push(contact);

  updateList();
}

function updateList(){
  var $contactList = $('#body');
  $contactList.empty();
  var $contacts = $('<div>').addClass('container').attr('id', "body");
  contacts.forEach(function(contact){
    var $newRow = $('<div>').addClass('row item');
    $newRow.append($('<div>').addClass('col-sm-3 name').text(contact.name) );
    $newRow.append($('<div>').addClass('col-sm-1 phone').text(contact.phone) );
    $newRow.append($('<div>').addClass('col-sm-2 email').text(contact.email) );
    $newRow.append($('<div>').addClass('col-sm-2 group').text(contact.group) );
    $newRow.append($('<div>').addClass('col-sm-2 birthday').text(contact.birthday) );
    var $icons = $('<div>').addClass('col-sm-2 row');
    $icons.append($('<input />', { type: 'url'}).addClass('select col-sm-4'));
    $newRow.append($icons);
    $contacts.append($newRow);
  });
  $contactList.append($contacts);
  $("#total").text(contacts.length);
}

function getAll(){
  $('.item').removeClass('hide');
};

function getWoes(){
  var $item = $('.item');
  $item.addClass('hide');
  $item.each(function(index){
    if ( _.includes($item.eq(index).children(".group").text().split(/\W/), 'friends') ) {
      $item.eq(index).removeClass('hide');
    }
  });
};

function getFam(){
  var $item = $('.item');
  $item.addClass('hide');
  $item.each(function(index){
    if ( _.includes($item.eq(index).children(".group").text().split(/\W/), 'family') ) {
      $item.eq(index).removeClass('hide');
    }
  });
};

function showCustom(){
  var $customFilter = $('#customFilter');
  var array = $customFilter.val().toLowerCase().split(/\W/);
  var $item = $('.item');
  $item.addClass('hide');
  $item.each(function(index){
    array.forEach(function(entry){
      if ( _.includes($item.eq(index).children(".group").text().split(/\W/), entry) ) {
        $item.eq(index).removeClass('hide');
      }
    });
  });
};
