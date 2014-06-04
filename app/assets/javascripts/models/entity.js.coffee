App.Entity = Ember.Object.extend({})


App.Entity.reopenClass get_by_addr: (addr) ->
  $.getJSON("/api/v1/entities?addr=" + addr ).then (response) ->
    a = App.Entity.create response
    a