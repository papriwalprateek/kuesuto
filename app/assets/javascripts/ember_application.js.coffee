#= require handlebars
#= require ember
#= require ember-data
#= require_self
#= require app

# for more details see: http://emberjs.com/guides/application/
window.App = Ember.Application.create( 
  current_path: ''
  rootElement: ".ember-root-class"
  
)

Ember.Handlebars.registerHelper "ifeq", (a, b, options) ->
  Ember.Handlebars.bind.call options.contexts[0], a, options, true, (result) ->
    result is b

