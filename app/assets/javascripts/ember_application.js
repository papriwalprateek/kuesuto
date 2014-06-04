//= require handlebars
//= require ember
//= require ember-data
//= require_self
//= require app

window.App = Ember.Application.create({
  current_path: '',
  rootElement: ".ember-root-class"
});

Ember.Handlebars.registerHelper("ifeq", function(a, b, options) {
  return Ember.Handlebars.bind.call(options.contexts[0], a, options, true, function(result) {
    return result === b;
  });
});
