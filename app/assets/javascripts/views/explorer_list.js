App.ExplorerList = Ember.View.extend({
  templateName: 'explorerlist',
  listBinding:["asd"],
  didInsertElement : function(){
	App.set("asd",this);
}

});