App.CommitFormView = Ember.View.extend({
  property:'',
  type:function(){return $('input[name="cfproperty"]:checked').val();}.property(),
  notFilled:true,
  successfully_saved:false,
  submitFailed: false,
  isProcessing: false,
  isSlowConnection: false,
  timeout: null,
  contenthtml: function(){
	return this.$('.editor').html();
	
},
  actions:{
     insertCode : function(){
       this.$('.editor').append("<br><pre>Enter code here</pre><br>");
    }
  },
  
  emptyurl:	function(){
  					if(this.get('resourceUrl')!=''){
    				return false;}
    			
    				return true;	
  			}.property('resourceUrl'),
  			
 
  			
	  resetfields:function(){
  		 clearTimeout(this.get("timeout"));
    	this.setProperties({
    	  isProcessing: false,
    	  
    	  isSlowConnection: false,
    	  notFilled:true,
    	  successfully_saved:false,
    	  submitFailed: false,
    	  content:'',
    	  property:'',
      	resourceUrl:''
    	});
  		},
  	submit: function() {
    	var content_type = $('input[name="type_of_commit"]:checked').val();
    	this.setProperties({
    	  submitFailed: false,
    	  isProcessing: true,
    	  notFilled: false
    	  
   	 	});
   	 this.set("timeout", setTimeout(this.slowConnection.bind(this), 2000));
	   _this = this;
    	var request = $.post("/api/v1/entities", 
    		{
    				p:{	content:this.get('text'),
    					property:this.get('property'),
    					url:this.get('resourceUrl'),
    					in_type:content_type,
    					parent_query:this.get('controller.query'),
            beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Token '+_this.get("currentUser").oauth_token );}    				
    				}
    			}
    	);
    	request.then(this.success.bind(this), this.failure.bind(this));
 	},	
	
  	success: function(data) {
  		this.reset();
  	  this.set('notFilled',false);
  	  this.set('successfully_saved',true);
      this.get("controller").send("saveCommit", data);
    // sign in logic
  	},

	  failure: function() {
	    this.reset();
	    this.set("submitFailed", true);
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