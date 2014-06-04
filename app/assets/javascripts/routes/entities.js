App.IndexRoute = Ember.Route.extend({
  model: function(params) {
    return {has: "error",error:"this"};
  }
});
 