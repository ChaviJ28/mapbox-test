const mongoose = require("mongoose");


var busRouteSchema = mongoose.Schema({
    busNo: String,
    from: String,
    to: String,
    distance: String,
    created_at: { type: Date, default: Date.now() }
});

module.exports = mongoose.model("busRoute", busRouteSchema);

