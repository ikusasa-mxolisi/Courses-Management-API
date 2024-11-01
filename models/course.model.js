const mongoose = require("mongoose");

const CourseSchema = mongoose.Schema(
    {
        product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "Please provide the ObjectId for the product"]
        },
        
        name: {
            type: String,
            required: [true, "Please provide the courses's name"],
            lowercase: true // makes sure that the name inserted is always lowercase
        }, 
        price: {
            type: Number,
            required: false
        },
        duration: {
            type: Number,
            required: false
        },
        code: {
            type: String,
            required: true, // it is always required
            unique: true, // makes sure the code is always unique
        }

})

const Course = mongoose.model("Course", CourseSchema);

module.exports = Course;