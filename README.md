# hapi-routebuilder
> Simple declarative route configuration for Hapi without leaky abstractions.

### Motivation

Hapi embraces an imperative approach to configuring routes. This means that registering multiple routes requires multiple method calls, so that one ends up with a file that may look something to the effect of:

```js
var hapi = require('hapi');
var server = new hapi.Server();
server.connection({ port: 3000 });

server.route({
  method: 'get',
  path: '/profile',
  handler: fnOne,
  config: {
    validate: {
      /* validation rules here */
    }
  }
});
server.route({
  method: 'get',
  path: '/about',
  handler: aboutFn
});
server.route({
  method: 'post',
  path: '/login',
  handler: loginFn
});
server.route({
  method: ['get', 'post'],
  path: '/logout',
  handler: logoutFn
})
// ...and so on
```

This works fine, but some people prefer a declarative approach for the sake of tidiness, readability, or organization. The declarative approach to the above code would read like the following:

```js
var routes = {
  get: {
    '/profile': {
      handler: fnOne,
      config: {
        validate: {
          /* validation rules here */
        }
      }
    }
    '/about': aboutFn
  },
  post: {
    '/login': loginFn
  },
  "get,post": {
    '/logout': logoutFn
  }
};
```

While hapi doesn't provide any mechanism to work with such an object (you could export a plugin from your route files, but, ugh) this library does.

### Example

```js
var hapi = require('hapi');
var routeBuilder = require('hapi-routebuilder');
var server = new hapi.Server();
server.connection({ port: 3000 });

// this would typically be exported from a routes.js
// file somewhere in your code
var routes = {
  get: {
    '/profile': {
      handler: fnOne,
      config: {
        validate: {
          /* validation rules here */
        }
      }
    }
    '/about': aboutFn
  },
  post: {
    '/login': loginFn
  },
  "get,post": {
    '/logout': logoutFn
  }
};

routeBuilder(server, routes, '/optional-prefix');
```

### Release History

* 2014-12-31 - v0.1.0
  - Initial release
