App.ContentView = Ember.View.extend({
didInsertElement:function(){
	$('div.card').hide();
	$($('div.card')[0]).show();
}
});
