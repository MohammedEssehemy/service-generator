import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {Accounts} from 'meteor/accounts-base';
import 'meteor/dburles:mongo-collection-instances';

let admin_user = {
  username: 'admin',
  email: 'admin@admin.com',
  password: 'P@ssw0rd',
  profile: { },
  permissions: ['administrator']
};

let regular_user = {
  username: 'user',
  email: 'user@user.com',
  password: 'P@ssw0rd',
  profile: { },
  permissions: []
};

if (!Meteor.users.find({username: admin_user.username}).count()) {
  let user_id = Accounts.createUser(admin_user);
  Meteor.users.update({
    username: admin_user.username},
  {$set: {permissions: admin_user.permissions}
  });
}

if (!Meteor.users.find({username: regular_user.username}).count()) {
  Accounts.createUser(regular_user);
}
