'use strict';
const {schema_to_model} = require('./helpers/loopback_autoForm');
module.exports = function(app, options) {
  const modelName = options.modelName;
  const dataSource = options.dataSource;
  app.models[modelName].find().then(services=>{
    services.forEach(service=>{
      schema_to_model(service, app, options);
    });
  });
};
