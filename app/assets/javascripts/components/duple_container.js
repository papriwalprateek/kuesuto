App.DupleContainerComponent = Ember.Component.extend({
  tagName:'span',
   dupleSaveFailed: false,
  isProcessing: false,
  isSlowConnection: false,
  timeout: null,
 
  actions: {
  	toggleEdit: function(){
  		this.toggleProperty('isEditing');
  	},
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
    delete: function(a) {
    	$.ajax({
    	url: '/api/v1/duples/'+a.id,
    	type: 'DELETE',
    	success: function(result) {
        // Do something with the result    	
		  a.deleteRecord();
    	}
		});
	  $('.reveal-modal-bg').hide();
	  },

   moreFields: function(){
        this.get('vall').pushObject({name:""});
        
    } 
  },
  update: function() {
     this.setProperties({
      dupleSaveFailed: false,
      isProcessing: true
    });
    this.set("timeout", setTimeout(this.slowConnection.bind(this), 2000)); 
  var data_send = {  
              value:this.get('value'),
              name:this.get('name')};
   // App.set('a',this.get('parent'));
    //d = App.Profile.store.createRecord('duple',data_send).save().then(this.success.bind(this), this.failure.bind(this));
  },

  success: function(response) {
    this.reset();
    this.toggleBody();
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





/*
  values: function(){
	var arr = [];
	var a = this.$('.editor');
	a.each(function( index ) {arr.push($(this).html());});
	return arr;
	
}
  save: function() {
     this.setProperties({
      dupleSaveFailed: false,
      isProcessing: true
    });
    this.set("timeout", setTimeout(this.slowConnection.bind(this), 2000)); 
  var data_send = {  
              value:this.values(),
              name:this.get('name'),
              parent:this.get('parent')};
    App.set('a',this.get('parent'));
    d = App.Profile.store.createRecord('duple',data_send).save().then(this.success.bind(this), this.failure.bind(this));
  },

  success: function(response) {
    this.reset();
    this.toggleBody();
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

*/



