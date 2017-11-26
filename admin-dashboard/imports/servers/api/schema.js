import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Servers = new Mongo.Collection('servers', {idGeneration: 'MONGO'});

Servers.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

export const servers_schema = new SimpleSchema({
  name: String,
  host: String,
  port: {
    type: SimpleSchema.Integer,
    defaultValue: 80
  },
  endpoint: {
    type: String,
    defaultValue: '/admin/dynamic_services'
  },
  secret: String
});

Servers.attachSchema(servers_schema);
