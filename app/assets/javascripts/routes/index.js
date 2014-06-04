
 App.IndexRoute = Ember.Route.extend({
  model: function(params) {
  	
    return $.getJSON('/api/v1/entities.json?addr='+params.addr);
  },
  beforeModel: function() {
    Ember.$("body").addClass("loading");
  },
  afterModel: function() {
    Ember.$("body").removeClass("loading");
  }
});
 