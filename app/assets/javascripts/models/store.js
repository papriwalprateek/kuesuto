var cache ={};
App.Store = Ember.Object.extend({
  init: function() {
    // Setup
  },

  find: function(name, id) {
  	var adapter = this.container.lookup('adapter:'+name);
  	return adapter.find(name, id).
  	then(function(record){

  		return record;
  	});

    
  }
});
