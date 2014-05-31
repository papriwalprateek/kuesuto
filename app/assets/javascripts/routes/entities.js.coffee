App.EntitiesRoute = Ember.Route.extend
  model: ->
      App.Entity.get_by_addr('algorithms/sequence sorting/bubble sort')