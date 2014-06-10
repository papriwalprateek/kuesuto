App.ContentView = Ember.View.extend({
didInsertElement:function(){
	$('div.card').hide();
	$($('div.contentcard')[0]).show();
	
	$($('div.entitynavbutton')[0]).addClass('entitynavactive');
}
});
