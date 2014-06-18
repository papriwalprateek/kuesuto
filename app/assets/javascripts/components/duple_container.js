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
    delete: function() {
      App.set('d',this);
      
      this.toggleProperty('isDeleting');

    }
  }
  
  
  });