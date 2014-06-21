App.ApplicationController = Ember.Controller.extend({
  currentUser: function(){
  	return window.anand_hash;
  }.property(),
  model:function(){
  	return ['a','b','c','d']
  },
  actions:{
  	 
  }
  

});