App.SearchContainerComponent = Ember.Component.extend({
  didInsertElement:function(){
  	suggestions = new Bloodhound({
	datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
	queryTokenizer: Bloodhound.tokenizers.whitespace,
	remote: {url:'/api/v1/search.json?query=%QUERY',
	filter: function(response){
  	  //format the data here
  	  return response.search;
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
	suggestion: Handlebars.compile("<a href='/repo/dq/algorithms'>{{value}}</a>")
	}
	});
	App.set('a',this.get('applicationController'));
	  t.on("typeahead:selected", function(event, item) {
        console.log(this);
        _this.get('applicationController').transitionToRoute('repo', {query:item.data+item.value});
      });

      t.on("typeahead:autocompleted", function(event, item) {
       	alert(item.value);
      });

  }
  });

