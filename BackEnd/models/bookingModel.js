const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  hotelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "hotels",
    required: true,
  },
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "rooms",
    required: true,
  },
  checkIn: {
    type: Date,
    required: true,
    validate: {
      validator: function (date) {
        return date > new Date();
      },
      message: "Check-in date must be in the future",
    },
  },
  checkOut: {
    type: Date,
    required: true,
    validate: {
      validator: function (date) {
        return date > this.checkIn;
      },
      message: "Check-out must be after check-in",
    },
  },
  guests: { type: Number, default: 1, max: 10, required: true },
  totalPrice: { type: Number, required: true, min: 0 },
  currency: { type: String, required: true },
  status: {
    type: String,
    required: true,
    default: "pending",
    enum: ["pending", "confirmed", "cancelled", "completed", "no-show"],
  },
  paymentInfo: {
    type: mongoose.Schema.ObjectId,
    enum: ["credit_card", "debit_card", "paypal", "cash", "bank_transfer"],
    required: true,
  },
  paymentMethod: { type: String,  unique: true },
  transactionId: { type: String },
});

const Booking = mongoose.model("Booking", bookingSchema);
