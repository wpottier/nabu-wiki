// Draw routes.  Locomotive's router provides expressive syntax for drawing
// routes, including support for resourceful routes, namespaces, and nesting.
// MVC routes can be mapped to controllers using convenient
// `controller#action` shorthand.  Standard middleware in the form of
// `function(req, res, next)` is also fully supported.  Consult the Locomotive
// Guide on [routing](http://locomotivejs.org/guide/routing.html) for additional
// information.

var passport = require('passport');

module.exports = function routes() {
  this.root('main#index');

  this.match('login', 'security#login', { via: 'get' });
  this.match('login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' }), { via: 'post' });

};
