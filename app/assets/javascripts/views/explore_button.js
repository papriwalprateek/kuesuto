App.ExploreButtonView = Ember.View.extend({
  tagName: 'a',
  attributeBindings: ['href'],
  href: function() {
  		var url_temp = (this._context.query.toLowerCase()).split('dq/')[1];
  		
        return '/#/repo/%@'.fmt(url_temp);
    }.property('query')

});
