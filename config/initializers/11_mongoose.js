var mongoose = require('mongoose');


mongoose.connect();
console.log('async connect mongoose');
var mongooseTypes = require("mongoose-types");
mongooseTypes.loadTypes(mongoose);