import {T9n} from 'meteor/softwarerero:accounts-t9n';
import {Router} from 'meteor/iron:router';
import {AccountsTemplates} from 'meteor/useraccounts:core';
// import './../ui/users';

T9n.setLanguage('ar');
T9n.map('ar', {
  'department': 'القسم'
});

Router.plugin('ensureSignedIn', {
  except: ['home', 'register', 'login', 'forgotPwd']
});

Router.route('/logout', function(req, res) {
  AccountsTemplates.logout();
  this.next();
}, {name: 'logout'});
