var cache ={};
App.EntityStore = Ember.Object.extend({  
  get:function (addr) {	
	if (cache[addr] ) {
      return cache[addr];
    }
    var ad;
    ad = App.EntityAdapter.create(); //adapter = this.container.lookup('adapter:' + name);
    return ad.get(addr).then(function(record) {
      cache[addr] = cache[addr] || {};
      cache[addr] = record;
      return record;
    });	   
  }
});
App.EntityAdapter = Ember.Object.extend({ 
  get: function(addr) {
    return $.ajax({
          url: '/api/v1/entities.json?addr='+addr,
          type: 'GET',
          dataType: 'json',
          success: function() {  },
          error: function() {  }
      }).then(function(response){return response;});
}
});
App.est = App.EntityStore.create();

/*App.ProfileAdapter = Ember.Object.extend({ 
  user: null,
  get: function(token) {
    return $.ajax({
          url: '/api/v1/profiles.json',
          type: 'GET',
          dataType: 'json',
          success: function() {  },
          error: function() {  },
          beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Token '+token );}
        }).then(function(response){
          //return response;
          App.set('a',response);
          a = App.User.create({});
	      du = a.get('duples');
	      sp = a.get('spaces');
	      for (var i = 0;i<=response.duples.length - 1; i++) {
	      	x = response.duples[i];
	      	d = du.create({
	      		name:x.name,
	      		value:x.value,
	      		id:x._id.$oid

	      	});
	      
	      };
	      for (var i = 0;i<=response.spaces.length - 1; i++) {
	      	x = response.spaces[i];
	      	d = sp.create({
	      		name:x.name,
	      		id:x._id.$oid,
	      		_id:x._id,
	      		short_desc:x.short_desc
	      	});

	      	dd = d.get('duples');
	      	for (var j = 0;j<=x.duples.length - 1; j++) {
	      		y = x.duples[j];
	      		dd.create({
	      			name:y.name,
	      			value:y.value,
	      			id:y._id.$oid,
	      			space_id:x._id.$oid
	      		});
	      	};
	      };
          App.set('user',a);	
          return a;
        	
        });         
  
  }

});
*/

      /*  return result.data.children.map(function(c) {
          return {id: c.id,
                  title: c.data.title,
                  domain: c.data.domain,
                  url: c.data.url};
        });*/

