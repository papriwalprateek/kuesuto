App.DupleContainerComponent = Ember.Component.extend({
  tagName:'span',
   dupleSaveFailed: false,
  isProcessing: false,
  isSlowConnection: false,
  timeout: null,
  ecName:null,
  ecValue:[],
 values: function(){
  var arr = [];
  var a = this.$('.editor');
  a.each(function( index ) {arr.push($(this).html());});
  return arr;
  
},

  actions: {
  	toggleEdit: function(){
  		this.toggleProperty('isEditing');
      if(this.get('isEditing')){
        this.set('ecName',this.get('duple.name'));
        this.set('ecValue',this.get('duple.value'));

        this.$(".editor").attr("contenteditable",true);
        this.$('.editor').popline();
      
      }
      else{
        //this.set('container',this.$('.editor'))
        this.$('.editor').popline("destroy");
        $(".editor").attr("contenteditable", this.id === "edit");       
        this.set('ecName',null);
        this.set('ecValue',null);
        
        //this.$('.editor').popline("destroy");
        //$(".editor").attr("contenteditable", this.id === "edit");
      }
      
  	},
    toggleBody: function() {

    	if($('.reveal-modal-bg').css('display')=='block'){   // for inactive background
    		  $('.reveal-modal-bg').hide();
          this.send('toggleEdit');
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
        var arr = this.get('ecValue');
        arr.pushObject("start typing here");
        this.get('duple').set('value',arr);
        this.$(".editor").attr("contenteditable",true);
        this.$('.editor').popline();
        App.set('a',this);

       // this.get('duple').rollback();
    } 
  },
  update: function() {
     this.setProperties({
      dupleSaveFailed: false,
      isProcessing: true
    });
    this.set("timeout", setTimeout(this.slowConnection.bind(this), 2000)); 
   var data_send = {  
              value:this.values(),
              name:this.get('name')};
  var p = this.get('duple');
  p.set("name", this.get('ecName'));
  p.set("value",this.values());
  //this.values().each(function(i){p.});
  p.save().then(this.success.bind(this), this.failure.bind(this));
 // $.post('/api/v1/duples/'+p.get(''))
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



