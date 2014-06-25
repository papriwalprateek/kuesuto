App.ListcreateContainerComponent = Ember.Component.extend({
  tagName:'div',
  listSaveFailed: false,
  isProcessing: false,
  isSlowConnection: false,
  timeout: null,
  entities: [{name:""},{name:""}],
  values:function(){
    var arr = [];
    var a = this.$('#search');
    a.each(function( index ) {
      arr.push( $(this).typeahead('val'));
    });

    return arr;
  },

  moreFields: function(){
    this.get('entities').pushObject({name:""});

  },

  toggleBody: function() {
      if($('.reveal-modal-bg').css('display')==='block'){     // for inactive background
          $('.reveal-modal-bg').hide();
      }else{
        $('.reveal-modal-bg').show();
      }
      this.toggleProperty('isShowingBody');
    }
  ,
  save: function() {
     this.setProperties({
      listSaveFailed: false,
      isProcessing: true
    });
    this.set("timeout", setTimeout(this.slowConnection.bind(this), 2000)); 
  //var arr =[];
  //$.map(this.get('entities'),function(val,i){
  //  arr.push(val.name);
  //});
  var data_send = {  
              name:this.get('name'),
              user:this.get('currentUser')._id.$oid,
              entities:this.values()
            };
            console.log(data_send);
    var request = $.post("/api/v1/lists", {list:data_send});
  request.then(this.success.bind(this), this.failure.bind(this));
  },

  success: function(response) {
    this.reset();
    this.toggleBody();
  },

  failure: function() {
    this.reset();
    this.set("listSaveFailed", true);
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





