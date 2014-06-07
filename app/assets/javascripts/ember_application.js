//= require handlebars
//= require ember
//= require ember-data
//= require_self
//= require app

window.App = Ember.Application.create({
  currentpath: '',
  rootElement: "#content_yield"
});

Ember.Handlebars.registerHelper("ifeq", function(a, b, options) {
  return Ember.Handlebars.bind.call(options.contexts[0], a, options, true, function(result) {
    return result === b;
  });
});
Ember.Handlebars.helper('unUnderscore', function(value, options) {
  
  return Ember.String.capitalize(value.replace("_"," "));
});
