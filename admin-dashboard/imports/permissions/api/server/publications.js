import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import 'meteor/dburles:mongo-collection-instances';
const Permissions = Mongo.Collection.get('permissions');

Meteor.publish(null, function() {
  return Permissions.find();
});
