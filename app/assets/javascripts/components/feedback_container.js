App.FeedbackContainerComponent = Ember.Component.extend({
  tagName:'span',
  isProcessing: false,
  isSlowConnection: false,
  timeout: null,
 
actions:{ 
  toggleBody: function() {
      if($('.reveal-modal-bgn').css('display')==='block'){     // for inactive background
          $('.reveal-modal-bgn').hide();
      }else{
        $('.reveal-modal-bgn').show();
      }
      this.toggleProperty('isShowingBody');
    },   
    save: function() {
     this.setProperties({
      isProcessing: true
    });
    this.set("timeout", setTimeout(this.slowConnection.bind(this), 2000)); 
 
  var data_send = {  
              content:this.get('content'),
              u_id:this.get('user')._id.$oid
            };
            console.log(data_send);
              var request = $.post("/api/v1/posts", data_send);
  request.then(this.success.bind(this), this.failure.bind(this));
  
  },
  addMore:function(){
    this.setProperties({
      saved: false,
      content:''
    })
  }
  },

  success: function(response) {
    this.reset();
    this.send('toggleBody');
    this.set('saved',true);
  },

  failure: function() {
    this.reset();
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