App.ApplicationController = Ember.Controller.extend({
  currentUser: function(){
  	return window.anand_hash;
  }.property(),
  model:function(){
  	return ['a','b','c','d']
  },
  actions: {
    feedback: function(){
		this.set('showingFeedback',true);
		 if($('.reveal-modal-bgn').css('display')==='block'){     // for inactive background
	          $('.reveal-modal-bgn').hide();
	      }else{
	        $('.reveal-modal-bgn').show();
	      }
    }
  }
  

});
