App.EditorContainerComponent = Ember.Component.extend({
  
  willDestroyElement: function() {
    this.$('textarea').destroy();
  },

  didInsertElement: function() {
    $('textarea').html5_editor({
  	 'toolbar-items': [
          
          [
                ['ul', '• list', 'Unordered list'],
                ['ol', '1. list', 'Ordered list']
            ],
            [
                ['link', 'Link', 'Insert Link'],
                ['image', 'Image', 'Insert Image']
            ],
            [
                ['bold', 'B', 'Bold'],
                ['italic', 'I', 'Italicize'],
                ['underline', 'U', 'Underline'],
              
            ]
        ]}
  	
  );

  },
  
  keyUp: function() {
    this.doUpdate();
  },

  click: function() {
    this.doUpdate();
  },

  doUpdate: function() {
    var content = this.$('.html5-editor').html();
    this.set('content', content);
  }
});





