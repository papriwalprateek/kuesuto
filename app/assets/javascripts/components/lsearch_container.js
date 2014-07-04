App.LsearchContainerComponent = Ember.Component.extend({
  didInsertElement:function(){
 	suggestions = new Bloodhound({

 datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
 queryTokenizer: Bloodhound.tokenizers.whitespace,
 remote: {url:'/api/v1/autocompletes.json?query=%QUERY',
  filter: function(response){
     return response.autocompletes;
   }
 }
});
  suggestions.initialize();
    _this=this;
  	 t = this.$('#search').typeahead({
	hint: true,
	highlight: true,
	minLength: 2
	},
	{
	name: 'search',
	displayKey: 'v',
	source: suggestions.ttAdapter(),
	 templates: {
	empty: [
	'<div class="empty-message">',
	'Sorry, No results',
	'</div>'
	].join('\n'),
	suggestion: Handlebars.compile("{{v}}")

	}
	});
  	 if(this.get('name')===undefined){
	  t.on("typeahead:selected", function(event, item) {
	  	 // console.log(this);
        _this.get('entities').pushObject({"name":item.v});
        _this.$('#search').typeahead('val', '');
      });

      t.on("typeahead:autocompleted", function(event, item) {
     	    _this.get('entities').pushObject({"name":item.v});
         _this.$('#search').typeahead('val', '');
      });
  	}
  }
  });

