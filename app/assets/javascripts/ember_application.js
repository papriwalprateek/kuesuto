//= require handlebars
//= require ember
//= require ember-data
//= require_self
//= require app

window.App = Ember.Application.create({
  currentpath: '',

  rootElement: ".page",
 // ready: function(){  
//	App.set('suggestions',suggestions);
 // },
   LOG_ACTIVE_GENERATION: true,
  // log when Ember looks up a template or a view
  LOG_VIEW_LOOKUPS: true, 
});

Ember.Handlebars.registerHelper("ifeq", function(a, b, options) {
  return Ember.Handlebars.bind.call(options.contexts[0], a, options, true, function(result) {
    return result === b;
  });
});
Ember.Handlebars.registerHelper("ifneq", function(a, b, options) {
  return Ember.Handlebars.bind.call(options.contexts[0], a, options, true, function(result) {
    return !(result === b);
  });
});

Ember.Handlebars.helper('unUnderscore', function(value, options) {
  
  return Ember.String.capitalize(value.replace("_"," "));
});
