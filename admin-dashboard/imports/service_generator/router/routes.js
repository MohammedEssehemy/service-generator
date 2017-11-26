import {Router} from 'meteor/iron:router';
import './../ui/add_service';

Router.route('/service', function(req, res) {
  this.render('add_service');
}, {name: 'service'});
