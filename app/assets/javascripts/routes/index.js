
 App.IndexRoute = Ember.Route.extend(App.CurrentUserHelper,{
  model: function(params) {
  	var _this = this;
  	App.set('a',this);
  	return $.ajax({
          url: 'api/v1/profiles.json',
          type: 'GET',
          dataType: 'json',
          success: function() { alert('hello!'); },
          error: function() { alert('boo!'); },
          beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Token '+_this.get("currentUser").oauth_token );}
        });           
  }
});

  	