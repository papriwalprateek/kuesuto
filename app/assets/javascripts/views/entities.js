App.EntitiesView = Ember.ContainerView.extend({
classNames :["row","explorer"],
didInsertElement : function(){
	App.set("EmberCanvasInstance",this);
	this.pushObject(App.ExplorerList.create());
},
childViews : []

});
//App.EmberCanvas = Ember.CollectionView.extend({
 // classNames: ['a-collection'],
//  content: ['A','B','C'],
//  itemViewClass: Ember.View.extend({
//    template: Ember.Handlebars.compile("the letter: {{view.content}}")
//  }),
 //   didInsertElement : function(){
  //      App.set("EmberCanvasInstance", this);
  //  }
//});

//someItemsView.appendTo('body');