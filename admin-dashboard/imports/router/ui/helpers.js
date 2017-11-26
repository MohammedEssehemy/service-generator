import {Meteor} from 'meteor/meteor';
import {Router} from 'meteor/iron:router';
import {Template} from 'meteor/templating';

Template.registerHelper('url_hash', function() {
  return Router.current().params.hash;
});

Template.registerHelper('url_param_value', function(param_name) {
  return Router.current().params.query[param_name];
});

Template.registerHelper('url_param_check', function(param_name, param_value) {
  return Router.current().params.query[param_name] === param_value;
});
