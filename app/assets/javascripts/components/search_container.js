App.SearchContainerComponent = Ember.Component.extend({
  didInsertElement:function(){
  	 t = this.$('#search').typeahead({
	hint: true,
	highlight: true,
	minLength: 2
	},
	{
	name: 'search',
	displayKey: 'value',
	source: App.suggestions.ttAdapter(),
	 templates: {
	empty: [
	'<div class="empty-message">',
	'Sorry, No results',
	'</div>'
	].join('\n'),
	suggestion: Handlebars.compile("{{value}}")
	}
	});
  	 if(this.get('name')===undefined){
	  t.on("typeahead:selected", function(event, item) {
	  	 url = "/repo/"+item.data+"/"+item.value;
	  	 window.location = url;
       // console.log(this);
        //_this.get('').transitionToRoute('repo', {query:item.data+item.value});
      });

      t.on("typeahead:autocompleted", function(event, item) {
     	 url = "/repo/"+item.data+"/"+item.value;
	  	 window.location = url;
        });
  	}
  }
  });

