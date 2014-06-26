
 App.RepoRoute = Ember.Route.extend({
   model: function(params) {
  	var addr = params.addr.split("/i:");
    return App.est.get(addr[0]).then(function(response){
    if(response.has ==="tiles"){
      if(addr[1]===undefined){
        t =  response.tiles[0];
      }
      else{
         $.each(response,function(i,v){
            if(addr[1]==v.tile_title){
             t=v.tile_nodes;
           };
         });        
      }
    }
    else{
      t  = response;
    }
    return t;
    });

   // return t;
},
  setupController: function(controller, model) {
        controller.set('model', model);
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
    item:"",
  
    actions:{
    	addK:function(){
    			$('div.contentcard').hide();
   				$('div.commitcard').show();
   				$('div.entitynavbutton').removeClass('entitynavactive');
    	}
    }
 
 });
 

