App.CurrentUserHelper = {
  beforeModel: function() {
    if (!this.controllerFor('application').get('currentUser')) {
        return window.anand_hash;
    } 
  },
  currentUser: function() {
    return this.controllerFor('application').get('currentUser');
  }.property()
}