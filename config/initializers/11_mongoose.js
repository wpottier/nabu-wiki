var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/downwiki');

var mongooseTypes = require("mongoose-types");
mongooseTypes.loadTypes(mongoose);