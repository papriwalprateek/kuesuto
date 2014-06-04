App.EntitiesRoute = Ember.Route.extend({
  beforeModel: function() {
    Ember.$("body").addClass("loading");
  },
  model: function(params) {
    return App.Entity.get_by_addr(params.addr);
  },
  afterModel: function() {
    Ember.$("body").removeClass("loading");
     
  }
});
 