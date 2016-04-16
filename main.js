// gh-pages
'use strict';

$(document).ready(init);

var contacts = [];
var editingContact = false;

var editObj;

function init() {
  loadFromStorage();
  updateList();
  var $list = $('#list');

  $('#add').click(add);
  $list.on('click', '.remove', remove);
  $list.on('click', '.edit', edit);
  $list.on('click', '#editConfirm', confirm);
  $list.on('click', '.select',(select));
  $('#removeSelected').click(removeSelected);
  $('#showAll').click(showAll);
}


function add() {
  var $newNameVal = $('#newName').val();
  var $addPhoneVal = $('#addPhone').val();
  var $addEmailVal = $('#addEmail').val();
  if ( (!$newNameVal) && (!$addPhoneVal && !$addEmailVal)) {
    sweetAlert("Oops...", "At least enter a name, phone number, or email.", "error");
    return;
  };
  var contact = {};
  contact.name = $newNameVal;
  contact.phone = $addPhoneVal;
  contact.email = $addEmailVal;
  contact.birthday = $('#addBirthday').val();
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
  var $contacts = $('<div>').addClass('container').attr('id', "list");
  contacts.forEach(function(contact){
    var $newRow = $('<div>').addClass('row item');
    $newRow.append($('<div>').addClass('col-sm-3 name').text(contact.name) );
    $newRow.append($('<div>').addClass('col-sm-1 phone').text(contact.phone) );
    $newRow.append($('<div>').addClass('col-sm-2 email').text(contact.email) );
    $newRow.append($('<div>').addClass('col-sm-2 group').text(contact.group) );
    $newRow.append($('<div>').addClass('col-sm-2 birthday').text(contact.birthday) );
    var $icons = $('<div>').addClass('col-sm-2 row');
    $icons.append($('<span>').addClass('remove col-sm-4').text('\u27F0'));
    $icons.append($('<input />', { type: 'checkbox'}).addClass('select col-sm-4'));
    $icons.append($('<span>').addClass('edit col-sm-4').text('\u270E'));
    $newRow.append($icons);
    $contacts.append($newRow);
  });
  $contactList.append($contacts);
  $("#total").text(contacts.length);
}


function remove(){
  if (editingContact) {
    sweetAlert("Oops...", "Please finish editing or close the window!", "error");
    return;
  };
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
  if (editingContact) {
    sweetAlert("Oops...", "Please finish editing or close the window!", "error");
    return;
  };

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

function edit(){
  var $this = $(this);
  var $parent = $this.closest('.item');
  var index = $parent.index();
  if ($parent.hasClass("isEditing")) {
    closeEditForm();
  } else if(!editingContact) {
    editingContact = true;
    editObj = {};
    $parent.addClass("isEditing");
    $parent.attr("id", "previous");
    $parent.children(".name").attr("id", "previousName");
    $parent.children(".phone").attr("id", "previousPhone");
    $parent.children(".email").attr("id", "previousEmail");
    $parent.children(".birthday").attr("id", "previousBirthday");
    $parent.children(".group").attr("id", "previousGroup");
    editObj.name = $("#previousName").text();
    editObj.phone = $("#previousPhone").text();
    editObj.email = $("#previousEmail").text();
    editObj.birthday = $("#previousBirthday").text();
    editObj.group = $("#previousGroup").text().split(/\W/);

    var $editForm = $('<div>').addClass('row editing').attr("id", "editForm");
    $editForm.append($('<span>').addClass('col-sm-1').text('Name:'));
    $editForm.append($('<input>').addClass('col-sm-4').attr({type: "text", id: "editName", value: editObj.name} ) );

    $editForm.append($('<span>').addClass('col-sm-1').text('Phone:'));
    $editForm.append($('<input>').addClass('col-sm-2').attr({type: "number", id: "editPhone", step: "1", min: "0", value: editObj.phone} ) );

    $editForm.append($('<span>').addClass('col-sm-1').text('Email:'));
    $editForm.append($('<input>').addClass('col-sm-3').attr({type: "text", id: "editEmail", value: editObj.email} ) );

    var $editForm2 = $('<div>').addClass('row editing').attr("id", "editForm2");
    $editForm2.append($('<span>').addClass('col-sm-1').text('Groups:'));
    $editForm2.append($('<input>').addClass('col-sm-5').attr({type: "text", id: "editGroup", value: editObj.group} ) );

    $editForm2.append($('<span>').addClass('col-sm-2').text('Birthday:'));
    $editForm2.append($('<input>').addClass('col-sm-3').attr({type: "date", id: "editBirthday", value: editObj.birthday} ) );

    $editForm2.append($('<div>').addClass('col-sm-1 btn btn-default').text('Confirm').attr("id", "editConfirm"));
    $parent.after($editForm, $editForm2);
  }


};

function confirm(){
  editObj.name = $('#editName').val();
  editObj.phone = $('#editPhone').val();
  editObj.email = $('#editEmail').val();
  editObj.birthday = $('#editBirthday').val();
  editObj.group = _.uniq( $('#editGroup').val().toLowerCase().split(/\W/) );
  var index = $('#previous').index();
  contacts[index].name = editObj.name;
  contacts[index].phone = editObj.phone;
  contacts[index].email = editObj.email;
  contacts[index].birthday = editObj.birthday;
  contacts[index].group = editObj.group;
  closeEditForm();
  updateList();
  saveToStorage();
};

function closeEditForm(){
  editObj = {};
  var $previous = $("#previous");
  $previous.children(".type").removeAttr("id");
  $previous.children(".amount").removeAttr("id");
  $previous.removeClass("isEditing");
  $previous.removeAttr("id");
  $("#editForm").remove();
  $("#editForm2").remove();
  editingContact = false;
};

function showAll(){
  $('.item').removeClass('hide');
};
