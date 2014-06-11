
App.ListsPanelView = Ember.View.extend({
  tagName: 'a',
  attributeBindings: ['href'],
  href: function() {
		var url_temp = this._context.name;
		console.log(this);
        return '/#/list/%@'.fmt(url_temp);
    }.property()

});