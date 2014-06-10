App.Router.map(function() {

  this.route("repo", { path: "/repo/*addr" });
  this.resource("repos", { path: "/repo" });
  this.resource("lists", { path: '/list' });
  this.route('index', { path : '/' });
  this.route('contri', { path : '/contributions' });  
  this.route('bin',{ path : '/bin'})
});

