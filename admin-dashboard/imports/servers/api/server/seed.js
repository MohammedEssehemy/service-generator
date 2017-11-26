import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import 'meteor/dburles:mongo-collection-instances';

const Servers = Mongo.Collection.get('servers');

const sample_server = {
  name: 'looopback-local',
  host: 'http://localhost',
  port: 3000,
  secret: "hoshhhhh that's secret"
};

if (!Servers.findOne({name: sample_server.name})) {
  Servers.insert(sample_server);
}
