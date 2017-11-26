import {Template} from 'meteor/templating';

Template.registerHelper('equal', (v1, v2) => {
  return v1 === v2;
});
