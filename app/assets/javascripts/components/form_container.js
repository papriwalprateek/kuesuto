App.FormContainerComponent = Ember.Component.extend({
vall:[{name:''}], 
values: function(){
	var arr = [];
	var a = this.$('.editor');
	a.each(function( index ) {arr.push($(this).html());});
	return arr;
	
},
 actions:{
 	
 	  moreFields: function(){
        this.get('vall').pushObject({name:""});
        //console.log(this.values());
    } 
 },
 didInsertElement:function(){
 	
 }
});
