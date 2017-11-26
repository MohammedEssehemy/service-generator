import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {EJSON} from 'meteor/ejson';

Meteor.subscribe('users');

Template.registerHelper('colleagues', function() {
  return Meteor.users.find().fetch()
    .filter(doc=>doc.username !== Meteor.user().username)
    .map(user=>({label: user.username, value: user._id}));
});

Template.registerHelper('isAdmin', () => {
  return Meteor.user() && Meteor.user().has_permission('administrator');
});

Template.registerHelper('hasPermission', (permission) => {
  return Meteor.user() && Meteor.user().has_permission(permission);
});

Template.registerHelper('isCurrentUser', (userId) => {
  return EJSON.equals(Meteor.userId(), userId);
});

Template.registerHelper('folders_names', () =>{
  return Meteor.user() && Meteor.user().profile.folders.map(folder=>folder.name);
});
