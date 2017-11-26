import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import 'meteor/dburles:mongo-collection-instances';
import {Template} from 'meteor/templating';

const Servers = Mongo.Collection.get('servers');

Meteor.subscribe('servers');
Template.registerHelper('servers', ()=>{
  return Servers.find({});
});
