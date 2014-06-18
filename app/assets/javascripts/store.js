var cache ={};
App.ApplicationStore = Ember.Object.extend({  
  get:function (name,token) {	
	//if (cache['profile'] ) {
    //  return cache['profile'];
    //}
    var ad;
    if(name=='profile'){
    	ad = App.ProfileAdapter.create(); //adapter = this.container.lookup('adapter:' + name);
    }
    return ad.userData(token).then(function(record) {
      cache['profile'] = cache['profile'] || {};
      cache['profile'] = record;
      return record;
    });	   
  }
});
App.st = App.ApplicationStore.create();
//App.Store = DS.Store.extend({
//})
//App.ApplicationAdapter = DS.ActiveModelAdapter.extend({
 // namespace: 'api/v1'
//});
