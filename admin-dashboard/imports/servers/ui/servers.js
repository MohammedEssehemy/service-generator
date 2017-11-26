import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import 'meteor/dburles:mongo-collection-instances';
import {Template} from 'meteor/templating';
import './servers.html';

const Servers = Mongo.Collection.get('servers');
Template.servers.onCreated(function() {
  Meteor.subscribe('servers');
});

Template.servers.helpers({});
