 App.ListRoute = Ember.Route.extend({
   model: function(params) {
  		var addr = params.addr.split("/i:");
	if(addr[1]!==undefined){
    this.controllerFor('list').set('item',addr[1]);}
    else if(addr[1]==="add"){  
      this.controllerFor('list').set('item','add');
    }else{
      this.controllerFor('list').set('item','');
    }
    this.controllerFor('list').set('baddr',addr[0]);
		return App.est.getL(addr[0]);
  },
  beforeModel: function() {
    Ember.$("body").addClass("loading");
  },
  afterModel: function() {
    Ember.$("body").removeClass("loading");
  }
	});

 App.ListController = Ember.ObjectController.extend({   
    needs: ['application'],
   currentUser: Ember.computed.alias('controllers.application.currentUser'),
    rt:'list',
    baddr:"",
    item:"",
    updateCommitFields:function(){
      this.set('comContent','start here');
      this.set('comUrl','');
      this.set('comProperty','');
    }.observes('model'),
    breadcrumbs:function(){
      var a = decodeURI(this.get('baddr')).split('/');
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
        return brd;
    }.property('baddr'),
    tile:function(){
    		if(this.get('model.has')==='tiles'){
          if(this.get('item')!=="add"){          
        arr = this.get('model.tiles');
    		t ={};
    		it = this.get('item');
    		  if(it!==""){
    		    $.each(arr,function(i,v){
    		    	if(it===v.tile_title){
    		    		t=v.tile_nodes;
    		    	}
    		    });
          }else{
            t = arr[0].tile_nodes;
          }
    		return t; 
      }   		}
    }.property('model','item'),
    addUrl:function(){
      return this.get('baddr')+"/i:add"
    }.property('baddr'),
    actions:{
    	addK:function(){
        this.toggleProperty('commitOpen');
    	}
    },
    saveCommit:function(entity){
      m = this.get('model');
      var j;
      $.each(m.tiles,function(i,v){
              if(v.tile_title==="under_review"){
                j=1;
                m.tiles[i].tile_nodes.pushObject(entity);
              }
            });
      if(j!==1){
        m.tiles.pushObject({tile_title: "under_review",
            tile_url: this.get('baddr')+"/i:under_review",
            tile_nodes:[entity]});
      }
        this.set('model',m);
    }
 });
