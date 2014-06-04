
 App.IndexRoute = Ember.Route.extend({
  model: function() {
    return $.getJSON('/api/v1/entities.json?addr=dq');
  }
});
 