App.IndexController = Ember.Controller.extend({
  needs: ['application'],
  currentUser: Ember.computed.alias('controllers.application.currentUser'),
  actions:{
  	delSpace: function (a) {
  	  $.ajax({
    	url: '/api/v1/spaces/'+a.id,
    	type: 'DELETE',
    	success: function(result) {
        // Do something with the result    	
		  a.deleteRecord();
    	}
    });
  	   
  	},
  	toggleDel: function(a) {

      a.toggleProperty('isDeleting');

    },

  }
});