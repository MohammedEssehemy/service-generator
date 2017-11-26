import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {Tracker} from 'meteor/tracker';
import {Template} from 'meteor/templating';
import {Session} from 'meteor/session';
import {HTTP} from 'meteor/http';
import jwt from 'jsonwebtoken';
import $ from 'jquery';
import 'jquery-ui-sortable';
import 'formBuilder';
// import {patch} from './ar_patch.js';
import './add_service.html';

const Servers = Mongo.Collection.get('servers');

Template.add_service.onRendered(function() {
  // hide className, and options value field
  $('body').append('<style type="text/css">.form-group.className-wrap, input.option-value{display:none !important}</style>');
  const fbTemplate = $('#fbEditor');
  const form = fbTemplate.formBuilder({
    i18n: {
      locale: 'en-US',
      // location: './',
      // extension: '.lang',
      // preloaded: {
      //   'en-US': patch
      // }
    },
    // controlPosition: 'left',
    sortableControls: true,
    editOnAdd: true,
    // disabledActionButtons: ['data', 'clear', 'save'],
    showActionButtons: false,
    // typeUserDisabledAttrs: {
    //   'textarea': ['subtype']
    // },
    typeUserAttrs: {
      'textarea': {
        subtype: {
          label: ' النوع ',
          options: {
            'textarea': ' مساحة نصية عادية ',
            'tinyMCE': ' مساحة نصية مع أدوات تنسيق '
          }
        }
      }
    },
    disableFields: [
      // 'text',
      // 'textarea',
      'header',
      'autocomplete',
      'file',
      // 'date',
      'paragraph',
      // 'select',
      // 'radio-group',
      // 'number',
      'hidden',
      // 'checkbox-group',
      'button'
    ],
    disabledAttrs: [
      'access',
      // 'className',
      'description',
      'inline',
      // 'label',
      // 'max',
      // 'maxlength',
      // 'min',
      // 'multiple',
      'name',
      // 'options',
      'other',
      'placeholder',
      // 'required',
      'rows',
      'step',
      'style',
      // 'subtype',
      'toggle',
      'value'
    ]
  });
  form.promise.then(formInstance => {
    this.form = formInstance;
    // Tracker.autorun(() => {
  // let departmentSchema = Session.get('departmentSchema');
  // if (form && departmentSchema) {
  // let formData = JSON.stringify(af_to_fb(departmentSchema));
  // formInstance.actions.setData(formData);
  // }
    // });
  });
});
Template.add_service.helpers({});
Template.add_service.events({
  'submit #add_service'(e, template) {
    e.preventDefault();
    let service_name = $('[name="service_name"]').val();
    let selected_id = new Mongo.ObjectID($('[name="server"]').val());
    let server = Servers.findOne(selected_id);
    let formData = template.form.actions.getData();
    debugger;
    token = jwt.sign({}, server.secret, {expiresIn: 60 * 5});
    HTTP.call('POST', `${server.host}:${server.port}${server.endpoint}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`
        },
        data: {name: service_name, schema: formData}
      }, (err, res)=>{
        debugger;
      });
  }
});

Template.add_service.onDestroyed(function() {});
