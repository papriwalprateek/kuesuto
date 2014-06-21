App.SpacecreateContainerComponent = Ember.Component.extend({
  tagName:'span',
  spaceSaveFailed: false,
  isProcessing: false,
  isSlowConnection: false,
  timeout: null,

  toggleBody: function() {
      this.toggleProperty('isShowingBody');
      
     }
  ,
  saveSpace: function() {
    this.setProperties({
      spaceSaveFailed: false,
      isProcessing: true
    });
    this.set("timeout", setTimeout(this.slowConnection.bind(this), 2000));
    
	
	var data_send = {   userId:this.get('currentUser._id.$oid'),
    					        short_desc:this.get('short_desc'),
    					        name:this.get('name'),
                      profile:this.get('profile')
					         };
    s = App.Profile.store.createRecord('space',data_send).save().then(this.success.bind(this), this.failure.bind(this));
	
	/*var request = $.post("/api/v1/spaces", data_send);
    request.then(this.success.bind(this), this.failure.bind(this));
*/  
  },

  success: function(response) {
    this.reset();
    this.toggleProperty('isShowingBody');
         /*   a = App.user.get('spaces');
            a.create({
              name:response.name,
              short_desc:response.short_desc,
              _id:response._id,
              id:response._id.$oid
            });*/
    

   
    // sign in logic
  },

  failure: function() {
    this.reset();
    this.set("spaceSaveFailed", true);
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





