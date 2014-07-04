App.ListcreateContainerComponent = Ember.Component.extend({
  tagName:'div',
  listSaveFailed: false,
  isProcessing: false,
  isSlowConnection: false,
  timeout: null,
  entities: [],
  actions:{
    removeEntity:function(entity){
      arr = this.get('entities');
      i =  arr.indexOf(entity);
      this.get('entities').removeAt(i,1);    
  }
  },
  toggleBody: function() {
      if($('.reveal-modal-bgn').css('display')==='block'){     // for inactive background
          $('.reveal-modal-bgn').hide();
      }else{
        $('.reveal-modal-bgn').show();
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
  var arr =[];
  $.map(this.get('entities'),function(val,i){
    arr.push(val.name);
  });
  var data_send = {  
              name:this.get('name'),
              user:this.get('currentUser')._id.$oid,
              entities:arr
            };
    var request = $.post("/api/v1/lists", {list:data_send});
  request.then(this.success.bind(this), this.failure.bind(this));
  },

  success: function(response) {
    this.reset();
    this.toggleBody();
    this.sendAction("action", response.list);

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
