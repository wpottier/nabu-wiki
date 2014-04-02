var locomotive = require('locomotive')
  , Controller = locomotive.Controller;

var securityController = new Controller();

securityController.login = function() {
    this.render();
};

module.exports = securityController;
