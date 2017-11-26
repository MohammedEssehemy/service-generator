import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import 'meteor/dburles:mongo-collection-instances';

const Servers = Mongo.Collection.get('servers');
Meteor.publish('servers', function() {
  const current_user = Meteor.user();
  if (!current_user || !current_user.has_permission('administrator')) return this.ready();
  return Servers.find({});
});
