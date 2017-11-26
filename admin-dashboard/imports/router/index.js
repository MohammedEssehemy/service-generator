import {Meteor} from 'meteor/meteor';
import './routes';
if (Meteor.isClient){
  import './ui/helpers';
}
