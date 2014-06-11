
App.ListExploreButtonView = Ember.View.extend({
  tagName: 'a',
  attributeBindings: ['href'],
  href: function() {
	App.set('a',this);
		var url_temp = this._context.toLowerCase();
        return '/#'+App.currentpath+'/%@'.fmt(url_temp);
    }.property()

});