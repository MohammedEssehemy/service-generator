'use strict';
const _ = require('lodash');
const af_to_lb = function(af) {
  if (!af || typeof af !== 'object') return;
  return _.reduce(af, (agg, val, key) => {
    if (!key.endsWith('$')) {
      let obj = {
        min: val.min,
        max: val.max,
        default: val.defaultValue,
        required: !val.optional,
      };
      if (val.autoform.type === 'number') {
        obj.type = 'number';
      } else if (val.autoform.type === 'select2') {
        obj.type = 'array';
      } else if (val.autoform.type === 'select-checkbox') {
        obj.type = 'array';
      } else if (val.autoform.type === 'date') {
        obj.type = 'date';
      } else {
        obj.type = 'string';
      }
      agg[key] = obj;
    }
    return agg;
  }, {});
};

const schema_to_model = function({name, schema}, app, options) {
  const dataSource = options.dataSource;
  const new_model = app.loopback.createModel({
    name,
    properties: af_to_lb(schema),
  });
  app.model(new_model, {
    dataSource,
    public: true,
    options: {
      remoting: {
        sharedMethods: {
          '*': false,
          find: true,
          findOne: true,
          findById: true,
          create: true,
        },
      },
    },
  });
  new_model.afterRemote('**', function(ctx, model, next) {
    let req = ctx.req;
    let res = ctx.res;
    if (ctx.result) {
      if (Array.isArray(ctx.result)) {
        ctx.result.forEach(function(item) {
          item.schema = schema_to_af(item.schema);
        });
      } else {
        ctx.result.schema = schema_to_af(ctx.result.schema);
      }
    }
    next();
  });
};

const schema_to_af = function(schema) {
  return _.mapKeys(schema, (val, key)=>key.replace('#', '.'));
};
module.exports = {
  af_to_lb,
  schema_to_model,
  schema_to_af,
};
