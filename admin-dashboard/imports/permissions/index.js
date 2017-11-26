import {Meteor} from 'meteor/meteor';
import './api/schema';
import './api/methods';

if (Meteor.isServer){
  import './api/server/publications';
  import './api/server/seed';
}
if(Meteor.isClient){
  // import './router/routes.js';
  import './ui/helpers';
}
