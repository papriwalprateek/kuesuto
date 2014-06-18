App.ProfileAdapter = Ember.Object.extend({ 
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
	      		value:x.value
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
	      			value:y.value
	      		});
	      	};
	      };
          App.set('user',a);	
          return a;
        	
        });         
  
  }

});


      /*  return result.data.children.map(function(c) {
          return {id: c.id,
                  title: c.data.title,
                  domain: c.data.domain,
                  url: c.data.url};
        });*/

