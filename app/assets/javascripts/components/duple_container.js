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

    }
  }
  
  
  });





