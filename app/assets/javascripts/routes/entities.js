App.EntitiesRoute = Ember.Route.extend({
  beforeModel: function() {
    Ember.$("body").addClass("loading");
  },
  model: function(params) {
    return {has: "error",error:"this"};
  },
  afterModel: function() {
    Ember.$("body").removeClass("loading");
  }
});