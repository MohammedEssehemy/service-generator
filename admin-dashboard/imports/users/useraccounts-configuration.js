import {AccountsTemplates} from 'meteor/useraccounts:core';

/**
 * The useraccounts package must be configured for both client and server to work properly.
 * See the Guide for reference (https://github.com/meteor-useraccounts/core/blob/master/Guide.md)
 */

AccountsTemplates.configure({
  showForgotPasswordLink: true,
  continuousValidation: true,
  // forbidClientAccountCreation:true,
});

AccountsTemplates.addField({
  _id: 'username',
  type: 'text',
  displayName: 'username',
  required: true
});
AccountsTemplates.addField({
  _id: 'department',
  type: 'text',
  displayName: 'department',
  required: true
});

AccountsTemplates.configureRoute('signIn', {
  name: 'login',
  path: '/login',
});

AccountsTemplates.configureRoute('signUp', {
  name: 'register',
  path: '/register',
});

AccountsTemplates.configureRoute('forgotPwd', {
  name: 'forgotPwd',
  path: '/forgot-password',
});

AccountsTemplates.configureRoute('resetPwd', {
  name: 'resetPwd',
  path: '/reset-password',
});
