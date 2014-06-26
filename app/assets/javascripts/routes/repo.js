
 App.RepoRoute = Ember.Route.extend({
   model: function(params) {
  		var addr = params.addr.split("/i:");
		this.controllerFor('repo').set('item',addr[1]);
		return App.est.get(addr[0]);
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

 App.RepoController = Ember.ObjectController.extend({
   // needs: [],
    item:"nothing",
    tile:function(){
    		arr = this.get('model.tiles');
    		t ={};
    		it = this.get('item');
    		if(it==="nothing"){
    			t = arr[0].tile_nodes;
    		}
    		else{
    		$.each(arr,function(i,v){
    			if(it==v.tile_title){
    				t=v.tile_nodes;
    			}

    		})}
    		return t;    		
    }.property('item'),
    actions:{
    	addK:function(){
    			$('div.contentcard').hide();
   				$('div.commitcard').show();
   				$('div.entitynavbutton').removeClass('entitynavactive');
    	}
    }
 
 });
 

