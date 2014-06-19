App.DupleContainerComponent = Ember.Component.extend({
  tagName:'span',
  
  actions: {
    toggleBody: function() {

    	if($('.reveal-modal-bg').css('display')=='block'){   // for inactive background
    		  $('.reveal-modal-bg').hide();
  		}else{
  			$('.reveal-modal-bg').show();
  		}
      this.toggleProperty('isShowingBody');

    },
    toggleDelete: function() {

      this.toggleProperty('isDeleting');

    },
    delete: function(a) {
    	$.ajax({
    	url: '/api/v1/duples/'+a.id,
    	type: 'DELETE',
    	success: function(result) {
        // Do something with the result    	
		  a.deleteRecord();
    	}
		});
	  $('.reveal-modal-bg').hide();
	  }
  }
  });