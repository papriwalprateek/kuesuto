
App.ListsController = Ember.Controller.extend({
  needs: ['application'],
  currentUser: Ember.computed.alias('controllers.application.currentUser'),
    newList:function(data){
      console.log(data);
      this.transitionToRoute('/list/'+data.name);
    }
 
  
});
