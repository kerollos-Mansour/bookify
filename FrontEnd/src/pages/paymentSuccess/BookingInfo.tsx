import React, { useState, useEffect } from "react";
import { Calendar, MapPin, Minus, Plus } from "lucide-react";
import { Logo, ProgressSteps } from "./PaymentSuccess";
import { useNavigate } from "react-router-dom";
import PageTransition from "../../components/pageTransition/pageTransition";

interface Hotel {
  name: string;
  location: string;
  image: string;
}

interface PriceBreakdown {
  pricePerNight: number;
  nights: number;
  subtotal: number;
  serviceFee: number;
  total: number;
}

export default function BookingInfo() {
  const [hotel] = useState<Hotel>({
    name: "Blue Origin Farms",
    location: "Galle, Sri Lanka",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
  });

  const [checkInDate, setCheckInDate] = useState<string>("2025-01-20");
  const [checkOutDate, setCheckOutDate] = useState<string>("2025-01-22");
  const [nights, setNights] = useState<number>(2);
  const [pricePerNight] = useState<number>(200);

  useEffect(() => {
    if (checkInDate && checkOutDate) {
      const start = new Date(checkInDate);
      const end = new Date(checkOutDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setNights(diffDays);
    }
  }, [checkInDate, checkOutDate]);

  const handleNightsChange = (newNights: number) => {
    if (newNights < 1) return;
    setNights(newNights);

    const start = new Date(checkInDate);
    start.setDate(start.getDate() + newNights);
    setCheckOutDate(start.toISOString().split("T")[0]);
  };

  function getPriceBreakdown(): PriceBreakdown {
    const subtotal = pricePerNight * nights;
    const serviceFee = subtotal * 0.1;
    const total = subtotal + serviceFee;

    return {
      pricePerNight,
      nights,
      subtotal,
      serviceFee,
      total,
    };
  }

  const priceBreakdown = getPriceBreakdown();
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 pt-6 px-4">
        <Logo />
        <ProgressSteps currentStep={1} />
        <div className="flex flex-col items-center gap-4 my-6">
          <h2 className="text-2xl font-bold text-blue-900">
            Booking Information
          </h2>
          <p className="text-gray-500 text-center">
            Please fill up the blank fields below
          </p>
        </div>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6 w-110">
              <div className="bg-white rounded-lg shadow-sm p-4">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-64 object-cover rounded-lg mb-3"
                />
                <h3 className="text-xl font-bold text-gray-800">
                  {hotel.name}
                </h3>
                <div className="flex items-center text-gray-500 text-sm mt-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{hotel.location}</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  How long you will stay?
                </h3>
                <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
                  <button
                    onClick={() => handleNightsChange(nights - 1)}
                    className="w-10 h-10 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center justify-center transition"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="text-xl font-semibold text-gray-800">
                    {nights} Days
                  </span>
                  <button
                    onClick={() => handleNightsChange(nights + 1)}
                    className="w-10 h-10 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center justify-center transition"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Pick a Date
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Check-in Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="date"
                        value={checkInDate}
                        onChange={(e) => setCheckInDate(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Check-out Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="date"
                        value={checkOutDate}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                        min={checkInDate}
                        className="w-full pl-10 pr-4 py-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>

                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">
                        Number of Nights:
                      </span>
                      <span className="text-lg font-bold text-purple-900">
                        {nights} {nights === 1 ? "Night" : "Nights"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Price Breakdown
                </h3>

                <div className="space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>
                      ${priceBreakdown.pricePerNight} × {priceBreakdown.nights}{" "}
                      {priceBreakdown.nights === 1 ? "night" : "nights"}
                    </span>
                    <span>${priceBreakdown.subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-gray-600">
                    <span>Service Fee (10%)</span>
                    <span>${priceBreakdown.serviceFee.toFixed(2)}</span>
                  </div>

                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">You will pay</span>
                      <span className="text-2xl font-bold text-purple-900">
                        ${priceBreakdown.total.toFixed(2)} USD
                      </span>
                    </div>
                    <div className="text-right text-sm text-gray-500 mt-1">
                      per {priceBreakdown.nights}{" "}
                      {priceBreakdown.nights === 1 ? "Day" : "Days"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4 mt-12 mb-10">
            <button
              onClick={() => navigate("/payment-success")}
              className="w-64 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Book Now
            </button>
            <button className="w-64 bg-gray-100 text-gray-600 py-3 rounded-lg font-medium">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
