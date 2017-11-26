import {Mongo} from 'meteor/mongo';
export const objectIdSchemaDefinition = {
  type: Mongo.ObjectID,
  blackbox: true,
  autoValue: function() {
    if (typeof this.value === 'string') {
      return new Mongo.ObjectID(this.value);
    }
  }
};
