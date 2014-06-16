
 App.RepoRoute = Ember.Route.extend({
  model: function(params) {
  	
		return $.getJSON('/api/v1/entities.json?addr='+params.addr);
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
		a.removeAt(0); //remove repo name from breadcumb
		
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
		brd.removeAt(0);//hiding repo maker i.e. dq for now
      	App.set('breadcrumbs',brd); 
  		}
	});

