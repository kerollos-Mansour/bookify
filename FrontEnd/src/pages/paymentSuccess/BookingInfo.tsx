import React, { useState, useEffect } from "react";
import { Calendar, MapPin, Minus, Plus, AlertCircle, Info } from "lucide-react";
import { Logo, ProgressSteps } from "./PaymentSuccess";
import { useNavigate, useLocation } from "react-router-dom";
import PageTransition from "../../components/pageTransition/pageTransition";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useCreateBookingMutation } from "../../store/api/booking.api";
import { useCreatePaymentIntentMutation } from "../../store/api/payment.api";
import { Hotel } from "../../types/hotel.type";
import { Room } from "../../types/rooms.type";

export default function BookingInfo() {
  const navigate = useNavigate();
  const location = useLocation();
  const { room, hotel } =
    (location.state as { room: Room; hotel: Hotel }) || {};
  const user = useSelector((state: RootState) => state.auth.user);

  // States
  const [checkInDate, setCheckInDate] = useState<string>(
    new Date(Date.now() + 86400000).toISOString().split("T")[0] // Tomorrow
  );
  const [checkOutDate, setCheckOutDate] = useState<string>(
    new Date(Date.now() + 86400000 * 3).toISOString().split("T")[0] // 3 days later
  );
  const [nights, setNights] = useState<number>(2);
  const [guests, setGuests] = useState<number>(1);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Mutations
  const [createBooking, { isLoading: isBookingLoading }] =
    useCreateBookingMutation();
  const [createPaymentIntent, { isLoading: isPaymentLoading }] =
    useCreatePaymentIntentMutation();

  useEffect(() => {
    if (!room || !hotel) {
      // Redirect or show error if accessed directly
      // navigate("/");
    }
  }, [room, hotel, navigate]);

  useEffect(() => {
    if (checkInDate && checkOutDate) {
      const start = new Date(checkInDate);
      const end = new Date(checkOutDate);
      if (end > start) {
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setNights(diffDays);
      } else {
        setNights(0);
      }
    }
  }, [checkInDate, checkOutDate]);

  const handleNightsChange = (newNights: number) => {
    if (newNights < 1) return;
    setNights(newNights);

    const start = new Date(checkInDate);
    start.setDate(start.getDate() + newNights);
    setCheckOutDate(start.toISOString().split("T")[0]);
  };

  const calculatePrice = () => {
    const pricePerNight = room?.price?.discounted || room?.price?.original || 0;
    const subtotal = pricePerNight * nights;
    const serviceFee = subtotal * 0.1; // 10% service fee
    const total = subtotal + serviceFee;
    return { pricePerNight, subtotal, serviceFee, total };
  };

  const { pricePerNight, subtotal, serviceFee, total } = calculatePrice();

  const handleBookNow = async () => {
    setErrorMsg(null);
    if (!user) {
      navigate("/login", { state: { from: location } });
      return;
    }
    if (!room || !hotel) {
      setErrorMsg("Missing room or hotel information.");
      return;
    }
    if (nights < 1) {
      setErrorMsg("Please select valid dates.");
      return;
    }
    try {
      // 1. Create Booking
      const bookingData = {
        userId: user.id,
        hotelId: hotel._id, // Handle consistent ID
        roomId: room._id, // or room._id
        checkIn: checkInDate,
        checkOut: checkOutDate,
        nights,
        guests,
        subTotal: subtotal,
        pricePerNight,
        totalPrice: total,
        currency: "USD",
        paymentMethod: "stripe" as const,
        // Dummy values to satisfy backend validator
        // status: "pending",
        // bookingNumber: 1,
      };
      console.log(bookingData);

      const bookingResponse = await createBooking(bookingData).unwrap();



      const responseData = (bookingResponse as any).data || bookingResponse;
      const createdBooking = responseData.booking || responseData;
      const bookingId = createdBooking._id || createdBooking.id;

      if (!bookingId) {
        console.error("Failed to extract ID from:", createdBooking);
        throw new Error("Failed to get booking ID.");
      }

      // 2. Create Payment Intent
      const paymentResponse = await createPaymentIntent({
        bookingId,
        currency: "usd",
      }).unwrap();

      // paymentResponse should contain { status: "success", data: { clientSecret: ... } }
      // The controller returns: { data: paymentIntent } where paymentIntent is output of service createPaymentIntent
      // service returns { clientSecret: paymentIntent.client_secret }

      const clientSecret =
        (paymentResponse as any).data?.clientSecret ||
        (paymentResponse as any).clientSecret;

      if (!clientSecret) {
        throw new Error("Failed to initialize payment.");
      }

      // 3. Navigate to checkout
      navigate("/checkout", {
        state: {
          clientSecret,
          bookingId,
        },
      });
    } catch (err: any) {
      console.error("Booking Error:", err);
      setErrorMsg(
        err?.data?.message ||
          err?.message ||
          "Something went wrong. Please try again."
      );
    }
  };

  if (!room || !hotel) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-center px-4">
        <AlertCircle className="w-16 h-16 text-yellow-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Details Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          We couldn't find the room details you selected.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Return Home
        </button>
      </div>
    );
  }

  const isLoading = isBookingLoading || isPaymentLoading;

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 pt-6 px-4 pb-20">
        <Logo />
        <ProgressSteps currentStep={1} />
        <div className="flex flex-col items-center gap-4 my-6">
          <h2 className="text-2xl font-bold text-blue-900">
            Booking Information
          </h2>
          <p className="text-gray-500 text-center">
            Review your trip details before payment
          </p>
        </div>

        {errorMsg && (
          <div className="max-w-6xl mx-auto mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            {errorMsg}
          </div>
        )}

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Hotel Details Column */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm p-6 overflow-hidden">
                <div className="aspect-video w-full rounded-xl overflow-hidden mb-4 bg-gray-200">
                  <img
                    src={
                      room.images[0] || (hotel.images && hotel.images[0]) || ""
                    }
                    alt={hotel.name}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {hotel.name}
                </h3>
                <h4 className="text-lg font-medium text-blue-600 mb-3">
                  {room.name}
                </h4>
                <div className="flex items-center text-gray-500 text-sm">
                  <MapPin className="w-4 h-4 mr-1 text-red-500" />
                  <span>
                    {hotel.location
                      ? `${hotel.city || "Unknown City"}`
                      : hotel.city || "Location available"}
                  </span>
                </div>

                {/* Amenities Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {room.amenities && (
                    <>
                      <span className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600 flex items-center gap-1">
                        <Info className="w-3 h-3" /> {room.amenities.size}
                      </span>
                      <span className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                        Max {room.amenities.sleeps} Guests
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Booking Form Column */}
            <div className="space-y-6">
              {/* Duration Card */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-800">Your Stay</h3>
                  <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-lg">
                    <button
                      onClick={() => handleNightsChange(nights - 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm text-gray-600 hover:text-blue-600 disabled:opacity-50"
                      disabled={nights <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-bold text-gray-900 min-w-[3rem] text-center">
                      {nights} Night{nights !== 1 && "s"}
                    </span>
                    <button
                      onClick={() => handleNightsChange(nights + 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm text-gray-600 hover:text-blue-600"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Check-in
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={checkInDate}
                        onChange={(e) => setCheckInDate(e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border-0 rounded-xl font-medium text-gray-700 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                      />
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Check-out
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={checkOutDate}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                        min={checkInDate}
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border-0 rounded-xl font-medium text-gray-700 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                      />
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-600">
                      Guests
                    </label>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setGuests(Math.max(1, guests - 1))}
                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center font-medium">
                        {guests}
                      </span>
                      <button
                        onClick={() =>
                          setGuests(
                            Math.min(room.amenities.sleeps || 4, guests + 1)
                          )
                        }
                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  Price Details
                </h3>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>
                      ${pricePerNight.toLocaleString()} × {nights} nights
                    </span>
                    <span className="font-medium text-gray-900">
                      ${subtotal.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between text-gray-600">
                    <span className="flex items-center gap-1">
                      Service Fee (10%)
                      <Info className="w-3 h-3 text-gray-400" />
                    </span>
                    <span className="font-medium text-gray-900">
                      ${serviceFee.toLocaleString()}
                    </span>
                  </div>

                  <div className="border-t border-dashed border-gray-200 pt-4 mt-4">
                    <div className="flex justify-between items-end">
                      <div>
                        <span className="block text-gray-500 text-xs mb-1">
                          Total due today
                        </span>
                        <span className="text-3xl font-bold text-blue-900 leading-none">
                          ${total.toLocaleString()}
                        </span>
                      </div>
                      <div className="text-right text-xs bg-green-50 text-green-700 px-2 py-1 rounded">
                        Full Refund info handled by property
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 mt-12 mb-10">
            <button
              onClick={handleBookNow}
              disabled={isLoading}
              className="w-full max-w-sm bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex justify-center items-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                "Confirm Booking"
              )}
            </button>
            <button
              onClick={() => navigate(-1)}
              className="text-gray-500 hover:text-gray-800 font-medium text-sm"
            >
              Cancel and go back
            </button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
