
App.ListExploreButtonView = Ember.View.extend({
  tagName: 'a',
  attributeBindings: ['href'],
  href: function() {
		var url_temp = this._context.toLowerCase();
        return '/#'+App.currentpath+'/%@'.fmt(url_temp);
    }.property()

});