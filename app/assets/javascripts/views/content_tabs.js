App.ContentTabsView = Ember.View.extend({
classNames: ['panel'],
click: function(evt) {
	$('div.card').hide();
   $('div#'+this._context.tile_title).show();
  }
});
