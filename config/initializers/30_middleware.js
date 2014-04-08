var express = require('express')
    , poweredBy = require('connect-powered-by')
    , passport = require('passport');

var mongoose = require('mongoose');
var mongoStore = require('connect-mongodb');
var crypto = require('crypto');
var helpers = require('../../lib/helpers');

module.exports = function () {
    // Use middleware.  Standard [Connect](http://www.senchalabs.org/connect/)
    // middleware is built-in, with additional [third-party](https://github.com/senchalabs/connect/wiki)
    // middleware available as separate modules.
    if ('development' == this.env) {
        this.use(express.logger());
    }

    this.use(poweredBy('DownWiki'));
    this.use(express.favicon());
    this.use(express.static(__dirname + '/../../public'));
    this.use(express.bodyParser());
    this.use(express.cookieParser());
    this.use(express.methodOverride());
    this.use(express.session({ secret: 'This is a cat', store: new mongoStore({db: mongoose.connection.db})}));
    this.use(passport.initialize());
    this.use(passport.session());
    this.use(express.csrf(function(req) {
        if (! req.session.csrf_token )
            req.session.csrf_token = crypto.randomBytes(Math.ceil(24 * 3 / 4))
                .toString('base64').slice(0, 24);
        return req.session.csrf_token;
    }));
    this.use(function (req, res, next) {
        res.locals.csrftoken = req.csrfToken();
        next();
    });
    this.use(this.router);
    this.use(express.errorHandler());

    this.dynamicHelpers(helpers.dynamic);
    this.helpers(helpers.static);

    this.datastore(require('locomotive-mongoose'));
};
