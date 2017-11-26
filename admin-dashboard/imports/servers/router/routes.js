import {Router} from 'meteor/iron:router';
import './../ui/servers';

Router.route('/servers', function(req, res) {
  this.render('servers');
}, {name: 'servers'});
