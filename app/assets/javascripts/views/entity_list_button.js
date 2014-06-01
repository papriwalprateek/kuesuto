App.EntityListButton = Ember.View.extend({
  tagName: "a",
  list:["ad"],
  attributeBindings: ['href'],
  click: function() {
    ii = this.get('parentView');
      i = App.EmberCanvasInstance.indexOf(ii)+1;
      j = App.EmberCanvasInstance.toArray().length;
      k = i;
      console.log(i);
      console.log(j);
      while(k< j){
        App.EmberCanvasInstance.removeAt(i);
        k = k+1;
        console.log(k);
      }
      history.pushState(null, document.title, this.href);
    this.get('controller').send('gett', this.href);
	return false;
  }
});