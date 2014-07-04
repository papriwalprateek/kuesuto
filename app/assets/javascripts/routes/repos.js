App.ReposRoute = Em.Route.extend({
  // activate: function() {},
  // deactivate: function() {},
  // setupController: function(controller, model) {},
  // renderTemplate: function() {},
  // beforeModel: function() {},
  // afterModel: function() {},
  
  model: function() {
      return [{
		'url':'dq/algorithms',
		'name':'Algorithms',
		'description':'This is a huge collection of algorithms. It contains articles, videos, definition, pseudocode, algorithm and many other things.',
		'e_count':419,
		'd_count':3045},
	{	'url':'dq/osconcepts',
		'name':'Operating System Concepts',
		'description':'It contains numerous concepts related to Operating system. It contains articles, videos, lectures, definitions, diagrams.',
		'e_count':101,
		'd_count':985}];
 }
});


