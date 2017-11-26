import {Mongo} from 'meteor/mongo';
import 'meteor/dburles:mongo-collection-instances';

const Permissions = Mongo.Collection.get('permissions');

let permissions_arr = [
  {name: 'administrator', description: 'system administrator, has all permissions'},
  {name: 'manipulate_users', description: 'add, edit, delete users'},
  {name: 'view_users', description: 'view users'},
];

permissions_arr.forEach(perm=>{
  if (!Permissions.find({name: perm.name}).count()) {
    Permissions.insert(perm);
  }
});
