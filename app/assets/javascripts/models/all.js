App.User = Ember.Model.extend({
	name: Ember.attr(),
	duples: Ember.hasMany("App.Duple", {key: 'duples', embedded: true}),
	spaces: Ember.hasMany("App.Space", {key: 'spaces', embedded: true})
});


/*
App.Space.FIXTURES=[{
  id: 99,
  name: 'Post Title',
  duples: [
    {
      id: 1,
      name: 'comment body one',
      value:'fasd'
    },
    {
      id: 2,
      name: 'comment body two',
	  value:'fasd'    
	}
  ]
}];
*/


App.Space = Ember.Model.extend({
	name: Ember.attr(),
    id:Ember.attr(),
    short_desc: Ember.attr(),
	duples: Ember.hasMany("App.Duple", {key: 'duples', embedded:true})
});
App.Duple = Ember.Model.extend({
	name: Ember.attr(),
	value: Ember.attr(Array)
});
App.User.adapter = App.ProfileAdapter.create();
App.Space.adapter = Ember.FixtureAdapter.create();
App.Duple.adapter = Ember.FixtureAdapter.create();

/*App.User.FIXTURES = [
  {
    id: 9,
  name: 'Vinay',
  duples:[
        {
            id: 3,
            name: 'User duple',
            value:['value is here']
          }
    ],
  spaces: [
    {
        id: 99,
        name: 'Post Title',
        duples: [
            {
            id: 1,
            name: 'Comment body one',
            value:['value is here']
            },
            {
            id: 2,
            name: 'Comment body two',
            value:['value is here']
            }
        ]
    }
    ]
}];
*/
//  newUser.get('duples').pushObject(newa)
//a = App.User.find(9).get('duples')   a.create({})

  