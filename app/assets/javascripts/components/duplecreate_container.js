App.DuplecreateContainerComponent = Ember.Component.extend({
  tagName:'span',
  dupleSaveFailed: false,
  isProcessing: false,
  isSlowConnection: false,
  timeout: null,
  values: function(){
	var arr = [];
	var a = this.$('.editor');
	a.each(function( index ) {arr.push($(this).html());});
	return arr;
	
},

  toggleBody: function() {
      if($('.reveal-modal-bg').css('display')=='block'){     // for inactive background
          $('.reveal-modal-bg').hide();
      }else{
        $('.reveal-modal-bg').show();
      }
      this.toggleProperty('isShowingBody');
      this.set('vall',[{name:""}]);
    }
  ,
  saveDuple: function() {
    this.setProperties({
      dupleSaveFailed: false,
      isProcessing: true
    });
    this.set("timeout", setTimeout(this.slowConnection.bind(this), 2000));
    
	
	var data_send = {   parent_id:this.get('currentUser._id.$oid'),
    					value:this.values(),
    					name:this.get('name'),
    					parent_type:"User"}
    
    if(this.get('space_id')){
    	data_send["parent_id"] = this.get('space_id.$oid');
    	data_send["parent_type"] = "Space";
	}
	
	var request = $.post("/api/v1/duples", data_send);
    request.then(this.success.bind(this), this.failure.bind(this));
  },

  success: function(response) {
    this.reset();
    this.toggleBody();
    if(response.parent_type=="User"){
            a = App.user.get('duples');
            a.create({
              name:response.name,
              value:response.value
            });
    }else{
        a = App.Space.find(response.parent_id.$oid).get('duples');
            a.create({
              name:response.name,
              value:response.value
            });
    }

    //a.duples.pushObject();
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
  },
   moreFields: function(){
        this.get('vall').pushObject({name:""});
        
    } 
  });





