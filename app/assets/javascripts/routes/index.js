
 App.IndexRoute = Ember.Route.extend({
  model: function(params) {
  	
    return $.getJSON('/api/v1/entities.json?addr='+params.addr);
  }
});
 