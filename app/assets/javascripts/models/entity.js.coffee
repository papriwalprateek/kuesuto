App.Entity = Ember.Object.extend({})


App.Entity.reopenClass get_by_addr: (addr) ->
  $.getJSON("http://localhost:3000/api/v1/entities?addr=/dq/" + addr ).then (response) ->
    entities = []
    response.entities.forEach (child) ->
      entities.push App.Entity.create child
      return
    entities   