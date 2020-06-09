const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: { type: String },
    items: [
        {
            icon: { type: String },
            link: { type: String },
            title: { type: String }
        }
    ]
});
module.exports = mongoose.model("Ad", schema,"ads");
