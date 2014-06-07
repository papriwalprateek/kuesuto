App.CommitFormView = Ember.View.extend({
  property:'',
  type:function(){return $('input[name="cfproperty"]:checked').val();}.property(),
  content: '',
  resourceUrl:'',
  notFilled:true,
  successfully_saved:false,
  submitFailed: false,
  isProcessing: false,
  isSlowConnection: false,
  timeout: null,
  
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
    	$('div.commit_fields').hide();
    	this.setProperties({
    	  submitFailed: false,
    	  isProcessing: true,
    	  notFilled: false
    	  
   	 	});
   	 this.set("timeout", setTimeout(this.slowConnection.bind(this), 25000));
	
    	var request = $.post("/api/v1/entities", 
    		{
    				p:{	content:this.get('content'),
    					property:this.get('property'),
    					resourceUrl:this.get('resourceUrl'),
    					content_type:$('input[name="type_of_commit"]:checked').val()
    				
    				}
    			}
    	);
    	request.then(this.success.bind(this), this.failure.bind(this));
 	},	
	
  	success: function() {
  	  this.reset();
  	  this.set('notFilled',false);
  	  	this.set('successfully_saved',true);

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