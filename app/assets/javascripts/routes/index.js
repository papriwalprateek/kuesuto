
 App.IndexRoute = Ember.Route.extend(App.CurrentUserHelper,{
  //model: function(params) {
  //	var _this = this; 
  //  return App.st.get('profile',_this.get("currentUser").oauth_token);
  //}
  model: function(){
//    return App.User.adapter.get(this.get('currentUser').oauth_token);
      return App.est.getK();
  }
});

  	
    App.LoadingRoute = Ember.Route.extend({
        activate: function(){
            this._super();
            
            // add some loading indication here
        },
        deactivate: function(){
            this._super();
            // remove loading indication
        }
});