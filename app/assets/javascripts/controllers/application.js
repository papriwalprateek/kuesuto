App.ApplicationController = Ember.ObjectController.extend({
  actions: {
    get: function(level){
      console.log("inside get");
    }
  },
  updateCurrentPath: function() {
    App.set('currentPath', this.get('currentPath'));
  }.observes('currentPath')
});