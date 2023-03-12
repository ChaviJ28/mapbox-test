const mongoose = require("mongoose");


var trackRecordSchema = mongoose.Schema({
    ip: String,
    userDevice: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userDevice"
    },
    busRoute: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "busRoute"
    },
    coordinates: {
        x: { type: String },
        y: { type: String }
    },
    created_at: { type: Date, default: Date.now() }
});

module.exports = mongoose.model("trackRecord", trackRecordSchema);
