App.Entity = Ember.Object.extend({});

App.Entity.reopenClass({
  get_by_addr: function(addr) {
    return $.getJSON("/api/v1/entities?addr=" + addr).then(function(response) {
      var a;
      a = App.Entity.create(response);
      return a;
    });
  }
});