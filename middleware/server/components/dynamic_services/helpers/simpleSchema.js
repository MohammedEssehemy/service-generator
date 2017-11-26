'use strict';
const SimpleSchema = require('simpl-schema').default;
SimpleSchema.extendOptions(['autoform']);

const serviceSchema = new SimpleSchema({
  name: {
    type: String,
    regEx: /^\w+$/,
  },
  schema: {
    type: Object,
    blackbox: true,
    custom: function() {
      debugger;
      new SimpleSchema(this.vale);
    },
  },
});

module.exports = {
  serviceSchema,
};
