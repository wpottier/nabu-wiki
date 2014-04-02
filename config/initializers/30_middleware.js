var express = require('express')
    , poweredBy = require('connect-powered-by')
    , passport = require('passport');

var mongoose = require('mongoose');
var mongoStore = require('connect-mongodb');

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
    this.use(this.router);
    this.use(express.errorHandler());

    this.datastore(require('locomotive-mongoose'));
};
