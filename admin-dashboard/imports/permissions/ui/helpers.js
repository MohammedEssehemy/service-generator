import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {Template} from 'meteor/templating';
import {EJSON} from 'meteor/ejson';

const Permissions = Mongo.Collection.get('permissions');
Template.registerHelper('permissions', function() {
  return Permissions.find().fetch()
    .map(perm=>({label: perm.name, value: perm.name}));
});
