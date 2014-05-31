App.IndexRoute = Ember.Route.extend 
  renderTemplate: () ->
    this.render('ember_canvas')
  model: ->
      App.Entity.get_by_addr(window.location.href.split("/repo/")[1])
  actions: 
    gett: (gurl) ->
      console.log("inside here")
      App.set("asd",this)
      App.Entity.get_by_addr(gurl)
      a = App.ExplorerList.create()   
      App.EmberCanvasInstance.pushObject(a)
      