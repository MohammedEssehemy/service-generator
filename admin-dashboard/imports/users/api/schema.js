import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import {objectIdSchemaDefinition} from '/imports/helpers/schemas';
import 'meteor/dburles:collection-helpers';

Meteor.users.deny({
  update() { return true; }
});

const profileSchema = new SimpleSchema({});

export const userSchema = new SimpleSchema({
  username: {
    type: String,
    optional: true
  },
  emails: {
    type: Array,
    optional: false
  },
  'emails.$': {
    type: Object
  },
  'emails.$.address': {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },
  'emails.$.verified': {
    type: Boolean
  },
  createdAt: {
    type: Date
  },
  profile: {
    type: profileSchema,
    optional: true
  },
  permissions: {
    type: Array,
    defaultValue: []
  },
  'permissions.$': {
    type: String
  },
  services: {
    type: Object,
    optional: true,
    blackbox: true
  },
  // In order to avoid an 'Exception in setInterval callback' from Meteor
  heartbeat: {
    type: Date,
    optional: true
  }
});

Meteor.users.attachSchema(userSchema);

Meteor.users.helpers({
  get_permissions() {
    return this.permissions;
  },
  has_permission(permission) {
    let user_perms = this.get_permissions();
    return user_perms.includes(permission);
  },
  has_any_permission(permissions) {
    let user_perms = this.get_permissions();
    return permissions.some((perm)=>user_perms.includes(perm));
  },
  has_all_permission(permissions) {
    let user_perms = this.get_permissions();
    return permissions.every((perm)=>user_perms.includes(perm));
  }
});
