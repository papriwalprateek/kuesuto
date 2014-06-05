
 App.ContentRoute = Ember.Route.extend({
  model: function(params) {
  	
		return {has:"error",error:"this"};
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
				brd.push({"name":a[index],"url":"#"+value,"active":"current"});
			}
			else{
			brd.push({"name":a[index],"url":"#/"+value});
			}
		});
      	App.set('breadcrumbs',brd); 
  		}
	});

