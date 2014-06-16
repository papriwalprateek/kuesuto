App.Dq = Ember.Object.extend({
  init: function() {
    // Setup
  },

  find: function(name, id) {
    return $.ajax({
          url: '/api/v1/profiles.json',
          type: 'GET',
          dataType: 'json',
          success: function() {  },
          error: function() {  }
        }).then(function(response){
          return response;
        });           
  
  }
});


