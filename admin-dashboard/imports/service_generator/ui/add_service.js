import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {Tracker} from 'meteor/tracker';
import {Template} from 'meteor/templating';
import {Session} from 'meteor/session';
import $ from 'jquery';
import 'jquery-ui-sortable';
import 'formBuilder';
// import {patch} from './ar_patch.js';
import './add_service.html';

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
    let serviceName = $('[name="service_name"]').val();
    let formData = template.form.actions.getData();
    Meteor.call('sendService', serviceName, formData, (err, res) => {
      if (err) {
        console.log(err)
        Bert.alert('Yes, I do Mind!', 'danger', 'growl-top-right');
      } else {
        Bert.alert("NOICE", "success")
      }
    })
  }
});

Template.add_service.onDestroyed(function() {});
