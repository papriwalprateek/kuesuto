
App.ListsController = Ember.Controller.extend({
  needs: ['application'],
  currentUser: Ember.computed.alias('controllers.application.currentUser')
  
});
