const mongoose = require('mongoose');

const theatreSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        filename: { type: String },
    },
    location: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("theatres", theatreSchema);