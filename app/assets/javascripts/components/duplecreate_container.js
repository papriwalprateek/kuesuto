App.DuplecreateContainerComponent = Ember.Component.extend({
  tagName:'span',
  dupleSaveFailed: false,
  isProcessing: false,
  isSlowConnection: false,
  timeout: null,

  actions: {
    toggleBody: function() {
      this.toggleProperty('isShowingBody');
    }
     

  },
   saveDuple: function() {
    this.setProperties({
      dupleSaveFailed: false,
      isProcessing: true
    });

    this.set("timeout", setTimeout(this.slowConnection.bind(this), 1));

    var request = $.post("/api/v1/duples", 
    			{
    				parent_id:this.get('currentUser._id.$oid'),
    					value:[this.get('value')],
    					name:this.get('name'),
    					parent_type:"User"
    				
    				
    			}
    );
    request.then(this.success.bind(this), this.failure.bind(this));
  },

  success: function() {
    this.reset();
    this.toggleProperty('isShowingBody');
    // sign in logic
  },

  failure: function() {
    this.reset();
    this.set("dupleSaveFailed", true);
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





