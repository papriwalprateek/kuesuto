App.EntitiesRoute = Ember.Route.extend
  beforeModel: ->
    
    # Assume the 'loading' class displays an overlay with a loading animation
    Ember.$("body").addClass "loading"
    return

  model: (params)->
      App.Entity.get_by_addr(params.addr)
      
  afterModel: ->
    Ember.$("body").removeClass "loading"
    return
    