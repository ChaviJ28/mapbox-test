module.exports = {
    createBusRoute: async (reqBody) => {
        var db = require("../models/busRoute"),
            newObj = null;

        newObj = new db({
            busNo: reqBody.busNo,
            from: reqBody.from,
            to: reqBody.to,
            distance: reqBody.distance
        });
        await newObj.save();
        return newObj;
    },

    listBusRoute: async (searchCriteria) => {
        var db = require("../models/busRoute")
        return db.find({});
    },

    createUserDevice: async (reqBody) => {
        var db = require("../models/userDevice"),
            newObj = null;

        newObj = new db({
            name: reqBody.name,
            type: reqBody.type,
            ip: reqBody.ip,
        });
        await newObj.save();
        return newObj;
    },

    listuserDevice: async (searchCriteria) => {
        var db = require("../models/userDevice")
        return db.find({});
    },

    createTrackRecord: async (reqBody) => {
        var db = require("../models/trackRecord"),
            newObj = null;

        newObj = new db({
            ip: reqBody.ip,
            userDevice: reqBody.userDevice,
            busRoute: reqBody.busRoute,
            coordinates: {
                x: reqBody.x,
                y: reqBody.y
            }
        });
        await newObj.save();
        return newObj;
    },

    listTrackRecord: async (searchCriteria) => {
        var db = require("../models/trackRecord")
        return db.find({});
    },
}
