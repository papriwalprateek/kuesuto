
 App.MeRoute = Ember.Route.extend(App.CurrentUserHelper,{
  //model: function(params) {
  //	var _this = this; 
  //  return App.st.get('profile',_this.get("currentUser").oauth_token);
  //}
  model: function(params){
//    return App.User.adapter.get(this.get('currentUser').oauth_token);
      return this.store.find('profile',this.get('currentUser')._id.$oid);
  }
});

  	
