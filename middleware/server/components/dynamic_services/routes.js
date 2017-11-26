'use strict';
const bodyParser = require('body-parser');
const {fb_to_af} = require('./helpers/formBuilder_autoForm');
const {schema_to_model} = require('./helpers/loopback_autoForm');
const jwt = require('express-jwt');
const {serviceSchema} = require('./helpers/simpleSchema');
module.exports = function(app, options) {
  const modelName = options.modelName;
  const dataSource = options.dataSource;
  const router = app.loopback.Router();
  router.use(bodyParser.json());
  router.post('/', jwt({secret: options.secret}), (req, res, next) => {
    let service = {name: req.body.name, schema: fb_to_af(req.body.schema)};
    serviceSchema.clean(service, {mutate: true});
    serviceSchema.validate(service);
    schema_to_model(service, app, options);
    app.models[modelName].create(service);
  });
  // order app to use router
  app.use(options.path, router);
};
