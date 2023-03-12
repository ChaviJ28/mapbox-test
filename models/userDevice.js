const mongoose = require("mongoose");


var userDeviceSchema = mongoose.Schema({
    name: String,
    type: String,
    ip: String,
    created_at: { type: Date, default: Date.now() }
});

module.exports = mongoose.model("userDevice", userDeviceSchema);
