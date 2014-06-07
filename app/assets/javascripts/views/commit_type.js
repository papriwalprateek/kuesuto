App.CommitTypeView = Ember.View.extend({
	didInsertElement: function(){
  		  $("div.commit_fields").hide();
        	
  		  $("input[name$='type_of_commit']").click(function() {
        	var test = $(this).val();
        	$("div.commit_fields").hide();
        	$("#commit_" + test).show();
    	});
  	}
  
	});