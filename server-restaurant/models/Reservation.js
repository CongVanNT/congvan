const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  phone: String,
  reservationDate: { type: Date, required: true },
  timeSlot: { type: String, required: true },
  numberOfGuests: { type: Number, required: true },
});

const Reservation = mongoose.model("Reservation", ReservationSchema);
module.exports = Reservation;
