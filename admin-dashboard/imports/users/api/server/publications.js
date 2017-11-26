import {Meteor} from 'meteor/meteor';

Meteor.publish(null, function() {
  let current_user_id = Meteor.userId();
  if (!current_user_id) return this.ready();
  return Meteor.users.find(current_user_id, {fields: {permissions: 1}});
});
Meteor.publish('users', function() {
  let current_user = Meteor.user();
  if (!current_user) return this.ready();
  if (current_user.has_permission('administrator')) {
    return Meteor.users.find({}, {
      fields: adminFields,
    });
  } else if (current_user.has_permission('view_users')) {
    return Meteor.users.find({}, {
      fields: publicFields,
    });
  }
  // return Meteor.users.find({'profile.department': current_user.profile.department}, {
  //   fields: publicFields,
  // });
});

const adminFields = {
  'username': 1,
  'emails': 1,
  'profile.department': 1
};

const publicFields = {
  'username': 1,
  'profile.department': 1
};
