var locomotive = require('locomotive')
  , Controller = locomotive.Controller
  , connectEnsureLogin = require('connect-ensure-login');

var mainController = new Controller();

mainController.before('*', connectEnsureLogin.ensureLoggedIn({ redirectTo: '/login' }));

mainController.index = function() {
  this.render();
};

module.exports = mainController;
