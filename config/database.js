mongoose = require('mongoose');
// ziQd47gzK4KKeSf7
// mongodb+srv://surujbhalichavi:<password>@mapbox-local-test.nrrcqrs.mongodb.net/?retryWrites=true&w=majority
// mongoUrl = "mongodb://localhost:27017/mapbox-test";


mongoUrl = process.env.mongoUrl;
const options = {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.connect(mongoUrl, options)
    .then(() => console.log("connection successful"))
    .catch(err => console.log(err))

module.exports = mongoose