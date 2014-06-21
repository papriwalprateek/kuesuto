App.Router.map(function() {

  this.route("repo", { path: "/repo/*addr" });
  this.resource("repos", { path: "/repo" });
  this.resource("lists", { path: '/list' });
  this.resource("list",{ path: "/list/*addr"});
  this.route('index', { path : '/' });
  this.route('me',{path:'/me'});
  this.route('contri', { path : '/contributions' });  
  this.route('bin',{ path : '/bin'})
});


App.Router.reopen({
   location: 'history'
});
