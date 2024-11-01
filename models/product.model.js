const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
    {
        partner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Partner",
            required: [true, "Please provide the ObjectId for the partner"],
        },
        
        name: {
            type: String,
            required: [true, "Please provide the product's name"],
            lowercase: true,
        }
    }
)

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;