'use strict';

module.exports = function(app, options) {
  const dataSource = options.dataSource;
  const modelName = options.modelName;
  const dynamicService = app.loopback.createModel({
    name: modelName,
    properties: {
      name: 'string',
      schema: 'object',
    },
    options: {
      indexes: {
        nameUnique: {
          keys: {name: 1},
          options: {unique: true},
        },
      },
    },
  });
  app.model(dynamicService, {
    dataSource,
    public: true,
    options: {
      remoting: {
        sharedMethods: {
          '*': false,
          find: true,
          findOne: true,
          findById: true,
        },
      },
    },
  });
};
