
 App.IndexRoute = Ember.Route.extend(App.CurrentUserHelper,{
  model: function(params) {
  	var _this = this;
  	return $.ajax({
          url: 'api/v1/profiles.json',
          type: 'GET',
          dataType: 'json',
          success: function() {  },
          error: function() {  },
          beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Token '+_this.get("currentUser").oauth_token );}
        });           
  }
});

  	