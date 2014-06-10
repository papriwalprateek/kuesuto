App.ContentTabsView = Ember.View.extend({
classNames: ['panel','entitynavbutton'],
click: function(evt) {
	$('div.contentcard').hide();
	$('div.commitcard').hide();
   $('div#'+this._context.tile_title).show();
	var elem = document.getElementById('mySwipe');
	window.mySwipe = Swipe(elem, {});
 }
 
});
