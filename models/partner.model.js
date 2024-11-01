const mongoose = require("mongoose");


const PartnerSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide the name for the partner"],
            lowercase: true, // makes use the name is always saved as lowercase
            unique: true, // make use that the partner is not duplicated
        }
    }
)


const Partner = mongoose.model("Partner", PartnerSchema);

module.exports = Partner;