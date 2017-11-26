import {Meteor} from 'meteor/meteor';
import {jQuery, $} from 'meteor/jquery';
import {Template} from 'meteor/templating';
import {Bert} from 'meteor/themeteorchef:bert';
import './users.html';

Template.users.helpers({
  users() {
    return Meteor.users.find({}).fetch();
  }
});

Template.users.onCreated(function appBodyOnCreated() {
  Template.instance().subscribe('users');
});

Template.users.events({
  'change [name="userRole"]': function(event, template) {
    let role = $(event.target).find('option:selected').val();

    // Meteor.call('Users.setRole', this._id, role, (error, response) => {
    //   if (error) {
    //     Bert.alert(error.reason, 'warning');
    //   }
    // });
  }
});
