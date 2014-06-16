
 App.ListRoute = Ember.Route.extend({
  model: function(params) {
  		var a = params.addr.split('/')
  		
  		if(a[1]){
  		
			return $.getJSON('/api/v1/lists.json?l_name='+a[0]+'&e_name='+a[1]);}
  		else if(a[0]){
			return $.getJSON('/api/v1/lists.json?l_name='+a[0]);			
  			
  		}

  		return false;
  },
  beforeModel: function() {
    Ember.$("body").addClass("loading");
  },
  afterModel: function() {
    Ember.$("body").removeClass("loading");
    _this = this;
      App.set('currentpath',_this.get('router.url'));

		var a = decodeURI(App.currentpath).split('/');
 
		a.removeAt(0);
		a.removeAt(0); //remove list name from breadcumb
		
		var arr = jQuery.map( a, function( n, i ) {
		var count = 0;
		var as = "";
		while(count<i){
			as = as+"/"+a[count] ;
			count++;
		}
		return (as+"/"+n).substr(1);
		});
		var brd = [];
		$.each(arr, function( index, value ) {
			if(index==arr.length-1){
				brd.push({"name":a[index],"url":value,"active":"current"});
			}
			else{
			brd.push({"name":a[index],"url":value});
			}
		});
      	App.set('breadcrumbs',brd); 
  		}
	});

