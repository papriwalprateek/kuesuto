App.Entity = Ember.Object.extend({})


App.Entity.reopenClass get_by_addr: (addr) ->
  $.getJSON("http://localhost:3000/api/v1/entities?addr=" + addr ).then (response) ->
    entities = []
    response.entities.forEach (child) ->
      a = App.Entity.create child
      a.set("url","#/"+a.type)
      entities.push a
      return
    entities   