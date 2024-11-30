const mongoose = require("mongoose");

const OpeningHoursSchema = new mongoose.Schema(
  {
    dayName: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
      match: /^(?:[01]?\d|2[0-3]):[0-5]\d$/,
    },
    endTime: {
      type: String,
      required: true,
      match: /^(?:[01]?\d|2[0-3]):[0-5]\d$/,
    },
    isClose: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const OpeningHours = mongoose.model("OpeningHours", OpeningHoursSchema);
module.exports = OpeningHours;
