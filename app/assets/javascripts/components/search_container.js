App.SearchContainerComponent = Ember.Component.extend({
  didInsertElement:function(){
  	suggestions = new Bloodhound({
	datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
	queryTokenizer: Bloodhound.tokenizers.whitespace,
	remote: {url:'/api/v1/autocomplete.json?query=%QUERY',
	filter: function(response){
  	  //format the data here
  	  return response.autocomplete;
  	}
	}
	});
 
	suggestions.initialize();
	 t = this.$('#search').typeahead({
	hint: true,
	highlight: true,
	minLength: 2
	},
	{
	name: 'search',
	displayKey: 'value',
	source: suggestions.ttAdapter(),
	 templates: {
	empty: [
	'<div class="empty-message">',
	'Sorry, No results',
	'</div>'
	].join('\n'),
	suggestion: Handlebars.compile("{{value}}")
	}
	});
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
  });

