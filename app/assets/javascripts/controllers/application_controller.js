App.ApplicationController = Ember.Controller.extend({
  currentUser: function(){
  	return window.anand_hash;
  }.property()
});