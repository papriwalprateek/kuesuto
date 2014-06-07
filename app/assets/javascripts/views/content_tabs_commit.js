App.ContentTabsCommitView = Ember.View.extend({
classNames: [],
click: function(evt) {
	$('div.contentcard').hide();
   $('div.commitcard').show();
}
});
