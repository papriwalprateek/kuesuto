App.ContentTabsCommitView = Ember.View.extend({
classNames: ['panel','callout','entitynavcommit'],
click: function(evt) {
	$('div.contentcard').hide();
   $('div.commitcard').show();
}
});
