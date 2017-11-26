'use strict';
const _ = require('lodash');
const fb_to_af = function(fb) {
  let i = 1;
  if (!Array.isArray(fb)) {
    return;
  }
  return fb.reduce((obj, ele, idx) => {
    let epoch_time = Date.now();
    let field_name = `fb_${epoch_time}_${i++}`;
    let defaultValue = ele.value || (ele.values && ele.values.filter(opt => opt.selected).map(opt => opt.label));
    let allowedValues = ele.values && ele.values.map(opt => opt.label);
    obj[field_name] = {
      label: ele.label,
      defaultValue,
      allowedValues,
      optional: true,
      min: ele.min && parseInt(ele.min),
      max: ele.max ? parseInt(ele.max) : ele.maxlength ? parseInt(ele.maxlength) : undefined,
      autoform: {
        multiple: ele.multiple,
      },
    };
    if (ele.type === 'number') {
      obj[field_name].type = 'Number';
      obj[field_name].autoform.type = 'number';
    } else if (ele.type === 'select') {
      if (ele.multiple) {
        obj[field_name].type = 'Array';
        obj[field_name].defaultValue = defaultValue;
        obj[field_name].autoform.type = 'select2';
        // replace dot with hash because mongo don't allow dotted keys
        obj[field_name + '#$'] = {type: 'String'};
      } else {
        obj[field_name].type = 'String';
        obj[field_name].defaultValue = defaultValue[0];
        obj[field_name].autoform.type = 'select2';
      }
    } else if (ele.type === 'checkbox-group') {
      obj[field_name].type = 'Array';
      obj[field_name].autoform.type = 'select-checkbox';
      // replace dot with hash because mongo don't allow dotted keys
      obj[field_name + '#$'] = {type: 'String'};
    } else if (ele.type === 'radio-group') {
      obj[field_name].type = 'String';
      obj[field_name].defaultValue = defaultValue && defaultValue[0];
      obj[field_name].autoform.type = 'select-radio';
    } else if (ele.type === 'date') {
      obj[field_name].type = 'Date';
      obj[field_name].autoform.type = 'date';
    } else if (ele.type === 'textarea') {
      obj[field_name].type = 'String';
      obj[field_name].autoform.type = ele.subtype;
    } else {
      obj[field_name].type = 'String';
      obj[field_name].autoform.type = ele.subtype || ele.type;
    }
    return obj;
  }, {});
};

const af_to_fb = function(af) {
  if (!af || typeof af !== 'object') return;
  return _.reduce(af, (agg, val, key) => {
    if (!key.endsWith('$')) {
      let obj = {
        name: key,
        label: val.label,
        className: 'form-control',
        min: val.min,
        max: val.max,
        maxlength: val.max,
        value: val.defaultValue,
        values: val.allowedValues && val.allowedValues.map(opt=>({value: opt, label: opt})),
        multiple: val.autoform.multiple,
      };
      if (val.autoform.type === 'number') {
        obj.type = 'number';
      } else if (val.autoform.type === 'select2') {
        obj.type = 'select';
      } else if (val.autoform.type === 'select-checkbox') {
        obj.type = 'checkbox-group';
      } else if (val.autoform.type === 'select-radio') {
        obj.type = 'radio-group';
      } else if (val.autoform.type === 'date') {
        obj.type = 'date';
      } else if (val.autoform.type === 'textarea') {
        obj.type = 'textarea';
        obj.subtype = 'textarea';
      } else if (val.autoform.type === 'tinyMCE') {
        obj.type = 'textarea';
        obj.subtype = 'tinyMCE';
      } else {
        obj.type = 'text';
        obj.subtype = val.autoform.type;
      }
      agg.push(obj);
    }
    return agg;
  }, []);
};

module.exports = {
  af_to_fb,
  fb_to_af,
};
