const Booking = require("../models/bookingModel");

exports.createBooking = async (req, res) => {
  try {
    const { userId, hotelId, roomId, checkIn, checkOut, guests } = req.body;

    // Basic validation
    if (!userId || !hotelId || !roomId || !checkIn || !checkOut || !guests) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (checkInDate >= checkOutDate) {
      return res.status(400).json({
        success: false,
        message: "Invalid dates",
      });
    }

    const nights = Math.ceil(
      (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
    );

    const room = await Room.findById(roomId);
    const totalPrice = (room?.pricePerNight || 100) * nights;

    const booking = new Booking({
      userId,
      hotelId,
      roomId,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests,
      totalPrice,
      status: "pending",
    });

    await booking.save();

    res.status(201).json({
      success: true,
      message: "Booking created",
      bookingId: booking._id,
      bookingReference: booking.bookingReference,
      totalPrice,
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({
      success: false,
      message: "Error creating booking",
    });
  }
};
exports.getBooking = async (req, res) => {
  // 1. Find by bookingReference OR _id
  // 2. Populate hotel, room, user info
  // 3. Return with virtual fields (duration, pricePerNight)
};

exports.cancelBooking = async (req, res) => {
  // 1. Check if booking can be cancelled (based on dates)
  // 2. Apply cancellation policy
  // 3. Calculate refund amount
  // 4. Update status to "cancelled"
  // 5. Send cancellation email
};
