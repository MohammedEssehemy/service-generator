import {Meteor} from 'meteor/meteor';
import {Router} from 'meteor/iron:router';
import {Meta} from 'meteor/yasinuslu:blaze-meta';
// import {AccountsTemplates} from 'meteor/useraccounts:core';

if(Meteor.isClient){
  // helpers
  import '/imports/helpers/template_helpers';
  import './ui/helpers';
  // layouts
  import '/imports/ui/layouts/applicationLayout';
  // ui templates
  import '/imports/ui/pages/home/home';
  import '/imports/ui/pages/notFound.html';
  import '/imports/ui/pages/loading.html';

Meta.config({
  options: {
    title: 'MFA Archive',
    suffix: 'Project Title'
  }
});
}

Router.configure({layoutTemplate: 'ApplicationLayout', loadingTemplate: 'loading'});

Router.plugin('dataNotFound', {dataNotFoundTemplate: 'notFound'});
Router.plugin('loading', {loadingTemplate: 'loading'});

Router.route('/', function(req, res) {
  this.render('home');
}, {name: 'home'});
