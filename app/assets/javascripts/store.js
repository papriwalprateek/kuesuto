/*var cache ={};
App.ApplicationStore = Ember.Object.extend({  
  get:function (name,token) {	
	//if (cache['profile'] ) {
    //  return cache['profile'];
    //}
    var ad;
    if(name=='profile'){
    	ad = App.ProfileAdapter.create(); //adapter = this.container.lookup('adapter:' + name);
    }
    return ad.userData(token).then(function(record) {
      cache['profile'] = cache['profile'] || {};
      cache['profile'] = record;
      return record;
    });	   
  }
});
App.st = App.ApplicationStore.create();*/

App.ApplicationStore = DS.Store.extend({
})
//App.ApplicationAdapter = DS.ActiveModelAdapter.extend({
 // namespace: 'api/v1'
//});

var attr = DS.attr,
    hasMany = DS.hasMany,
    belongsTo = DS.belongsTo;

App.Parent = DS.Model.extend({
  duples: hasMany('duples')
});


App.Profile = App.Parent.extend({
    name: attr('string'),
    spaces: hasMany('space')
});

App.Space = App.Parent.extend({
  name: attr('string'),
  short_desc: attr('string'),
  userId:attr('string'),
  profile: belongsTo('profile',{inverse:'spaces'})
});

App.Duple = DS.Model.extend({
  name: attr('string'),
  value:attr('array'),
  parent:DS.belongsTo('parent', { polymorphic: true, async:false, inverse: 'duples' })
});

App.ApplicationAdapter = DS.RESTAdapter.extend({
  namespace: 'api/v1',
});

DS.ArrayTransform = DS.Transform.extend({
  deserialize: function(serialized) {
    return (Ember.typeOf(serialized) == "array")
        ? serialized 
        : [];
  },

  serialize: function(deserialized) {
   
   var type = Ember.typeOf(deserialized);
    if (type == 'array') {
        return deserialized
    } else if (type == 'string') {
        return deserialized.split(',').map(function(item) {
            return jQuery.trim(item);
        });
    } else {
        return [];
    }
  }
});

App.register("transform:array", DS.ArrayTransform);

App.ApplicationSerializer = DS.RESTSerializer.extend({
 serializePolymorphicType: function(record, json, relationship) {
  json["parentType"] = record.parentType;
 //overriding ember data serializer for polymorphic relationship
}
});