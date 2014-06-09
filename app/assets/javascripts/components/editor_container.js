App.EditorContainerComponent = Ember.Component.extend({
  e:null,
  willDestroyElement: function() {
   //we can destroy textarea if needed later from here
  },

  didInsertElement: function() {
    var el = $("textarea").cleditor(
    	{
    	 // width not including margins, borders or padding
        height:       250, // height not including margins, borders or padding
        controls:     // controls to add to the toolbar
          "bold italic underline subscript superscript " +
          " bullets numbering " +
          "image link unlink",
        useCSS:       false, // use CSS to style HTML when possible (not supported in ie)
        docType:      // Document type contained within the editor
          '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">',
        docCSSFile:   // CSS file used to style the document contained within the editor
          "",
        bodyStyle:    // style to assign to document body contained within the editor
          "margin:4px; font:10pt Arial,Verdana; cursor:text"
    		
    		
    	}
    	    	
    )[0];
    this.set('e',el);
    var a = this;
    console.log($(el.doc.body));
    $(el.doc.body).on('keyup', function(event) {
    	var content = el.doc.body.innerHTML;
    
    	a.set('content', content);
    	return false;
    	
    });
  },
  
 // keyUp: function() {
  //  this.doUpdate();
 // },

  click: function() {
  	
    this.doUpdate();
  
  },

  doUpdate: function() {
   var content = this.get('e').doc.body.innerHTML;
      this.set('content', content);
    return false;
  }
});





