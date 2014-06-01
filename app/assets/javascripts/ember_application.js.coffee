#= require handlebars
#= require ember
#= require ember-data
#= require_self
#= require app

# for more details see: http://emberjs.com/guides/application/
window.App = Ember.Application.create( current_path: '')

Ember.Handlebars.registerBoundHelper "renderCard", (content, options) ->
  options.hash.content = content
  return Ember.Handlebars.helpers.view.call(this, App.Label, options)
  
App.Label = Ember.View.extend(
  tagName: "span"
  classNames: "label"
  template: Ember.Handlebars.compile("{{view.content}}")
)