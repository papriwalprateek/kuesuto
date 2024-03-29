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
      if($('.reveal-modal-bgn').css('display')==='block'){     // for inactive background
          $('.reveal-modal-bgn').hide();
      }else{
        $('.reveal-modal-bgn').show();
      }
      this.toggleProperty('isShowingBody');
      this.set('vall',[{name:""}]);
    }
  ,
  save: function() {
     this.setProperties({
      dupleSaveFailed: false,
      isProcessing: true
    });
    this.set("timeout", setTimeout(this.slowConnection.bind(this), 2000)); 
  var pt = "Profile";
  if(this.get('space_id')!==undefined){
    pt = "Space";
  }
  var data_send = {  
              value:this.values(),
              name:this.get('name'),
              parent:this.get('parent'),
              parentType:pt
            };

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
   moreFields: function(){
        this.get('vall').pushObject({name:""});
        
    } 
  });





