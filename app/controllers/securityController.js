var locomotive = require('locomotive')
  , formFilters = require('../../lib/filters/form')
  , Controller = locomotive.Controller;


var securityController = new Controller();

securityController._model = require('../models/user');

securityController.login = function() {
    this.render();
};


securityController.before('register', formFilters.convertModelForm);
securityController.register = function() {
    var self = this;

    if(this.req.method == 'POST') {
        this.form = this.form.bind(this.req.body);
        this.form.validate(function () {

            if (self.form.isValid()) {
                // Create new account object with form data
                if (self.form.data._csrf) delete self.form.data._csrf;
                var user = new self._model(self.form.data);
                console.log(user);
                // Save account object
                user.save(function (err) {
                    console.log(err);
                    if (err) {
                        self.req.flash('error', 'An error occured creating your account, have you already signed up?');

                        self.render();
                    } else {
                        /*self.confirmation_hash = account.confirmation_hash;
                        self.email = account.email;
                        self.render('email/confirm', { layout: 'email' }, function (err, html) {
                            if (err) return;
                            self.req.sendMail({
                                to: account.email
                                , subject: 'Activate your account'
                                , html: html
                            });
                        });*/

                        self.req.flash('info', 'Account created, please check your email!');
                        self.redirect(self.urlFor({ action: 'login' }));
                    }
                });
            }
            else {
                self.render();
            }
        });
    }
    else {
        this.render();
    }
};


module.exports = securityController;
