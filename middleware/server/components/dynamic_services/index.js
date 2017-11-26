'use strict';
const initialize_collection = require('./initialize_collection');
const initialize_services = require('./initialize_services');
const routes = require('./routes');
// const jwt = require
module.exports = function(app, options) {
  if (!options.modelName) options.modelName = 'dynamic_services';
  options.dataSource = app.dataSources[options.dataSource];
  initialize_collection(app, options);
  initialize_services(app, options);
  routes(app, options);
};
