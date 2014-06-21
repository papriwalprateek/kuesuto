App.IndexController = Ember.Controller.extend({
  needs: ['application'],
  currentUser: Ember.computed.alias('controllers.application.currentUser'),
  actions:{
  	toggleBody: function() {

      this.toggleProperty('isShowingBody');

      if($('.reveal-modal-bg').css('display')=='block'){   // for inactive background
          $('.reveal-modal-bg').hide();
      }else{

         
        $('.reveal-modal-bg').show();
      }
      return false;
    }

  }
});

