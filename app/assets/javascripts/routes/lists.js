
 App.ListsRoute = Ember.Route.extend({
  model: function(params) {
			return $.getJSON('/api/v1/lists.json?all=true');
  },
  beforeModel: function() {
    Ember.$("body").addClass("loading");
  },
  afterModel: function() {
    Ember.$("body").removeClass("loading");
    _this = this;
      App.set('currentpath',_this.get('router.url'));
      	//App.set('breadcrumbs',brd); 
  		}
	});

