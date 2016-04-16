'use strict';

$(document).ready(init);

var contacts = [];
var editingContact = false;

var editObj;

function init() {
  loadFromStorage();
  updateList();
  var $list = $('#list');

  $('#submit').click(add);
  $list.on('click', '.remove', remove);
  $list.on('click', '.edit', edit);
  $list.on('click', '#editConfirm', confirm);
  $list.on('click', '.select',(select));
  $('#removeSelected').click(removeSelected);

  $('#showAll').click(showAll);
  $('#showFriends').click(showFriends);
  $('#showFamily').click(showFamily);
  $('#showCustom').click(showCustom);
}


function add() {
  var $newNameVal = $('#first_name').val();
  var $newPhoneVal = $('#icon_telephone').val();
  var $newEmailVal = $('#email').val();
  if ( (!$newNameVal) && (!$newPhoneVal && !$newEmailVal)) {
    alert("At least enter a name, phone number, or email.");
    return;
  };
  var contact = {};
  contact.name = $newNameVal;
  contact.phone = $newPhoneVal;
  contact.email = $newEmailVal;
  contact.group = _.uniq($('#newGroup').val().toLowerCase().split(/\W/)) ;
  contact.birthday = $('.datepicker').val();
  contacts.push(contact);

  saveToStorage();
  updateList();
}

function saveToStorage(){
  localStorage.contacts = JSON.stringify(contacts);
}

function loadFromStorage(){
  if (!localStorage.contacts) {
    localStorage.contacts = '[]';
  };
  contacts = JSON.parse(localStorage.contacts);
}

function updateList(){
  var $contactList = $('#list');
  $contactList.empty();
  var $contacts = $('<div>').addClass('list').attr('contacts-table', "list");
  contacts.forEach(function(contact){
    var $newRow = $('<div>').addClass('row item');
    $newRow.append($('<div>').addClass('col-sm-3 name').text(contact.name) );
    $newRow.append($('<div>').addClass('col-sm-1 phone').text(contact.phone) );
    $newRow.append($('<div>').addClass('col-sm-2 email').text(contact.email) );
    $newRow.append($('<div>').addClass('col-sm-2 group').text(contact.group) );
    $newRow.append($('<div>').addClass('col-sm-2 birthday').text(contact.birthday) );

  });
  $contactList.append($contacts);
  $("#total").text(contacts.length);
}


function remove(){
  if (editingContact) { alert("Finish editing your contact or close the edit form"); return; };
  var index = $(this).closest('.item').index();
  contacts.splice(index, 1);
  updateList();
  saveToStorage();
}

function select(){
  var $item = $(this).closest('.item');
  $item.find("*").toggleClass('strike');
  $item.toggleClass('selected');
};

function removeSelected(){
  if (editingContact) { alert("Finish editing your contact or close the edit form"); return; };
  var $item = $('.item');
  var indexes = [];
  $item.each(function(index){
    if ($item.eq(index).hasClass('selected')) {
      indexes.push(index);
    };
  });
  if (indexes.length) {
    _.pullAt(contacts, indexes);
  };
  updateList();
  saveToStorage();
};



function showAll(){
  $('.item').removeClass('hide');
};

function showFriends(){
  var $item = $('.item');
  $item.addClass('hide');
  $item.each(function(index){
    if ( _.includes($item.eq(index).children(".group").text().split(/\W/), 'friends') ) {
      $item.eq(index).removeClass('hide');
    }
  });
};
