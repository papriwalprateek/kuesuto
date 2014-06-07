App.ContentView = Ember.View.extend({
didInsertElement:function(){
	$('div.card').hide();
	$($('div.contentcard')[0]).show();
}
});
