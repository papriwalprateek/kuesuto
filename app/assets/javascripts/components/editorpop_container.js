App.EditorpopContainerComponent = Ember.Component.extend({
  container: null,
  actions: {
   
 
  },
  didInsertElement:function(){
	this.set('container',this.$('.editor'))
	this.get('container').popline();
//more options ({disable: ["link", "blockquote"]}); ({position: 'relative'}); popline({mode: 'view'});
	this.$('.editor').html(this.get('text'));
		_this = this;
	
		this.get('container').bind('click keyup cut copy paste', function(event) {
			_this.set('text',$(this).html());
		});
	}
    
  });





