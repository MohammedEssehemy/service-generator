import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import 'meteor/aldeed:collection2-core';

const Permissions = new Mongo.Collection('permissions',
  {idGeneration: 'MONGO'});

Permissions.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

export const permissionsSchema = new SimpleSchema({
  name: String,
  description: String
});

Permissions.attachSchema(permissionsSchema);

if (Meteor.isServer) {
  Meteor.startup(function() {
    Permissions._ensureIndex('name', {unique: true});
  });
}
