App.Router.map(function() {

  this.route("index", { path: "/*addr" });
  this.route('content', { path : '/*addr/o-:id' });
  
});

