App.EditorpopContainerComponent = Ember.Component.extend({
  container: null,
  actions: {
   
 
  },
  didInsertElement:function(){
	this.set('container',this.$('.editor'))
	this.get('container').popline();
//more options ({disable: ["link", "blockquote"]}); ({position: 'relative'}); popline({mode: 'view'});
  }
  
  
  
  });





