App.EntitiesRoute = Ember.Route.extend
  
  model: (params)->
      App.Entity.get_by_addr(params.addr)
    