
 App.IndexRoute = Ember.Route.extend(App.CurrentUserHelper,{
  model: function(params) {
  	var _this = this;
  	return $.ajax({
          url: '/api/v1/profiles.json',
          type: 'GET',
          dataType: 'json',
          success: function() {  },
          error: function() {  },
          beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Token '+_this.get("currentUser").oauth_token );}
        }).then(function(response){
          return response;
        });           
  }
});

  	
    App.LoadingRoute = Ember.Route.extend({
        activate: function(){
            this._super();
            console.log("loading loading loading");
            // add some loading indication here
        },
        deactivate: function(){
            this._super();
            // remove loading indication
        }
});