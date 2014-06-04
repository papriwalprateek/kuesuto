
 App.IndexRoute = Ember.Route.extend({
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

		var a = App.currentpath.split('/');
 
		a.removeAt(0);
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
				brd.push({"name":decodeURI(a[index]),"url":"#"+value,"active":"current"});
			}
			else{
			brd.push({"name":a[index],"url":"#/"+value});
			}
		});
      	App.set('breadcrumbs',brd); 
  		}
	});

