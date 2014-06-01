App.EntitiesRoute = Ember.Route.extend
  
  model: (params)->
      App.Entity.get_by_addr(params.addr)
  actions: 
    gett: (gurl) ->
      console.log("inside here")
      App.set("asd",this)
      App.Entity.get_by_addr(gurl)
      a = App.ExplorerList.create()   
      App.EmberCanvasInstance.pushObject(a)
      App.set(gurl,a) 
      this.controller.set('list',[])
  setupController: (controller, model) ->
    controller.set('list', ['fas','asd'])
    controller.set('model',model)
  