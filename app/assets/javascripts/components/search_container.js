App.SearchContainerComponent = Ember.Component.extend({
  didInsertElement:function(){
  	 t = this.$('#search').typeahead({
	hint: true,
	highlight: true,
	minLength: 2
	},
	{
	name: 'search',
	displayKey: 'v',
	source: App.suggestions.ttAdapter(),
	 templates: {
	empty: [
	'<div class="empty-message">',
	'Sorry, No results',
	'</div>'
	].join('\n'),
	suggestion: function(data){
		var typ = "";
		if(data.t==="k"){typ="Knowledge item";}
		else if(data.t==="e"){typ="Entity";}
		else{typ="List";}
		return '<div style="font-family:Georgia;"><div>'+data.v+'</div><div style="font-size:0.8em;color:#aaa;">'+typ+'</div></div>';
		}

	}
	});
  	 if(this.get('name')===undefined){
	  t.on("typeahead:selected", function(event, item) {
	  	 url ="/"+item.d;
	  	 window.location = url;
       // console.log(this);
        //_this.get('').transitionToRoute('repo', {query:item.data+item.value});
      });

      t.on("typeahead:autocompleted", function(event, item) {
     	 url = "/"+item.d;
	  	 window.location = url;
        });
  	}
  }
  });

