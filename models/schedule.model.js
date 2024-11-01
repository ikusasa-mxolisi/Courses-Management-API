const { MongoOIDCError } = require("mongodb");
const mongoose = require("mongoose");

const ScheduleSchemma = mongoose.Schema(
    {
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: [true, "Please provide the ObjectId for the course"],
        },
        
        startDate: {
            type: Date,
            required: [true, "Please provide the start time of schedule"],
        },
        endDate: {
            type: Date,
            required: false
        }
    }
)

const Schedule = mongoose.model("Schedule", ScheduleSchemma);

module.exports = Schedule;