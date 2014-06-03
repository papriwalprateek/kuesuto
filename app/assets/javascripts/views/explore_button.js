App.ExploreButtonView = Ember.View.extend({
  tagName: 'a',
  attributeBindings: ['href'],
  href: function() {
        return '#/%@'.fmt(this._context.query.toLowerCase());
    }.property('query')

});