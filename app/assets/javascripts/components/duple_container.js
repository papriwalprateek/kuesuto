App.DupleContainerComponent = Ember.Component.extend({
  tagName:'span',
  actions: {
    toggleBody: function() {
      this.toggleProperty('isShowingBody');
    }
  }
  
  
  });





