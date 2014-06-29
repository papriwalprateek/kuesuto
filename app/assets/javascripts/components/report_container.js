App.ReportContainerComponent = Ember.Component.extend({
  tagName:'span',
  reportSaveFailed: false,
  isProcessing: false,
  isSlowConnection: false,
  timeout: null,
 
actions:{
  toggleBody: function() {
      if($('.reveal-modal-bg').css('display')==='block'){     // for inactive background
          $('.reveal-modal-bg').hide();
      }else{
        $('.reveal-modal-bg').show();
      }
      this.toggleProperty('isShowingBody');
    }
  ,
  
    save: function() {
     this.setProperties({
      reportSaveFailed: false,
      isProcessing: true
    });
    this.set("timeout", setTimeout(this.slowConnection.bind(this), 2000)); 
 
  var data_send = {  
              reason:this.get('reason'),
              u_id:this.get('user')._id.$oid,
              e_id:this.get('entity')
            };
            console.log(data_send);
              var request = $.post("/api/v1/reports", {report:data_send});
  request.then(this.success.bind(this), this.failure.bind(this));
  
  }
  },

  success: function(response) {
    this.reset();
    this.send('toggleBody');
    this.set('saved',true);
  },

  failure: function() {
    this.reset();
    this.set("reportSaveFailed", true);
  },

  slowConnection: function() {
    this.set("isSlowConnection", true);
  },

  reset: function() {
    clearTimeout(this.get("timeout"));
    this.setProperties({
      isProcessing: false,
      isSlowConnection: false
    });
  }
  });





