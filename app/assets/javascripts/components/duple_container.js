App.DupleContainerComponent = Ember.Component.extend({
  tagName:'span',
   dupleSaveFailed: false,
  isProcessing: false,
  isSlowConnection: false,
  timeout: null,
  ecName:null,
  a:[],
 values: function(){
  var arr = [];
  var a = this.$('.editor');
  _this = this;
  a.each(function( index ) {arr.push(_this.remScript($(this).html()));});
  return arr;
  
},
remScript: function(a){
    var div = document.createElement('div');
    div.innerHTML = a;
    var scripts = div.getElementsByTagName('script');
    var i = scripts.length;
    while (i--) {
      scripts[i].parentNode.removeChild(scripts[i]);
    }
    a = div.innerHTML;
    return a;
},

updateVal:function(){
  this.set('duple.value',this.values());
},
  actions: {
  	toggleEdit: function(){
  		this.toggleProperty('isEditing');
      if(this.get('isEditing')){
      }
      else{
        this.get('duple').rollback();
      }
      
  	},
    toggleBody: function() {

    	if($('.reveal-modal-bg').css('display')=='block'){   // for inactive background
    		  $('.reveal-modal-bg').hide();
          this.set('isEditing',false);
          this.get('duple').rollback();
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
      this.updateVal();
      this.set('a',this.get('duple.value'));
      newArr = this.get('a').slice();
      this.set('duple.value', newArr);
      newArr.pushObject('Start here....');
      console.log(newArr);
    } 
  },
  update: function() {
     this.setProperties({
      dupleSaveFailed: false,
      isProcessing: true
    });
    this.set("timeout", setTimeout(this.slowConnection.bind(this), 2000)); 
    this.updateVal();
    this.get('duple').save().then(this.success.bind(this), this.failure.bind(this));

  },

  success: function(response) {
    this.reset();
    this.send('toggleBody');
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



