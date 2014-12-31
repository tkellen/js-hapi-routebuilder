module.exports = function (server, routes, prefix) {
  if (!prefix) {
    prefix = "";
  }
  Object.keys(routes).forEach(function (verb) {
     var endpoints = routes[verb];
     var method = verb.split(', ').map(function (method) {
       return method.trim();
     });
     Object.keys(endpoints).forEach(function (path) {
       var route = endpoints[path];
       var fullPath = prefix + (path !== '/' ? path : '');
       var config = {
         method: method,
         path: fullPath,
         handler: route
       };
       if (typeof route !== 'function') {
         // this mutates the route object but i don't think it matters.
         route.method = method;
         route.path = fullPath;
         config = route;
       }
       console.log(config);
       server.route(config);
     });
  });
  return server;
};
