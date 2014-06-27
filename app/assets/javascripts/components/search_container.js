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
	suggestion: Handlebars.compile("{{v}}")
	}
	});
  	 if(this.get('name')===undefined){
	  t.on("typeahead:selected", function(event, item) {
	  	 if(item.t==="k"){
	  	 	arr = item.v.split(" ")
	  	 	url = "/repo/"+App.addrs[item.d]+"/i:"+arr[arr.length-1];
	  	 }else if(item.t==="l"){
	  	 url ="/list/"+item.d;
	  	}else if(item.t==="e"){
	  		url = "/repo/"+item.d;
	  	}
	  	 window.location = url;
	  	
       // console.log(this);
        //_this.get('').transitionToRoute('repo', {query:item.data+item.value});
      });

      t.on("typeahead:autocompleted", function(event, item) {
     	   if(item.t==="k"){
	  	 	arr = item.v.split(" ")
	  	 	url = "/repo/"+App.addrs[item.d]+"/i:"+arr[arr.length-1];
	  	 }else if(item.t==="l"){
	  	 url ="/list/"+item.d;
	  	}else if(item.t==="e"){
	  		url = "/repo/"+item.d;
	  	}
	  	 window.location = url;
        });
  	}
  }
  });

