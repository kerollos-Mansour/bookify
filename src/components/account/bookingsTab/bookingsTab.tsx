import React from "react";
import {
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { useGetUserBookingsQuery } from "../../../store/api/booking.api";
import { useAppSelector } from "../../../store/hooks";
import { Booking } from "../../../types";

export default function BookingsTab() {
  const user = useAppSelector((state) => state.auth.user);
  const { data: bookings = [], isLoading } = useGetUserBookingsQuery(
    user?.id || "",
    {
      skip: !user?.id,
    }
  );

  console.log(bookings)
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusBadge = (status?: string) => {
    const statusConfig = {
      confirmed: {
        icon: CheckCircle,
        color: "bg-green-100 text-green-700 border-green-200",
        label: "Confirmed",
      },
      pending: {
        icon: Clock,
        color: "bg-yellow-100 text-yellow-700 border-yellow-200",
        label: "Pending",
      },
      cancelled: {
        icon: XCircle,
        color: "bg-red-100 text-red-700 border-red-200",
        label: "Cancelled",
      },
      completed: {
        icon: CheckCircle,
        color: "bg-blue-100 text-blue-700 border-blue-200",
        label: "Completed",
      },
      "no-show": {
        icon: AlertCircle,
        color: "bg-gray-100 text-gray-700 border-gray-200",
        label: "No Show",
      },
    };

    const config =
      statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${config.color}`}
      >
        <Icon className="w-3.5 h-3.5" />
        {config.label}
      </span>
    );
  };

  const getPaymentStatusBadge = (status?: string) => {
    const statusConfig = {
      paid: {
        color: "bg-green-100 text-green-700",
        label: "Paid",
      },
      pending: {
        color: "bg-yellow-100 text-yellow-700",
        label: "Pending",
      },
      unpaid: {
        color: "bg-red-100 text-red-700",
        label: "Unpaid",
      },
      failed: {
        color: "bg-red-100 text-red-700",
        label: "Failed",
      },
    };

    const config =
      statusConfig[status as keyof typeof statusConfig] || statusConfig.unpaid;

    return (
      <span
        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${config.color}`}
      >
        {config.label}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="bg-card rounded-3xl shadow-sm overflow-hidden p-8 text-center animate-pulse">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mx-auto mb-4"></div>
        <div className="space-y-4">
          <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-2xl w-full"></div>
          <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-2xl w-full"></div>
        </div>
      </div>
    );
  }

  const upcomingBookings = bookings.filter(
    (b) => b.status === "confirmed" && new Date(b.checkIn) > new Date()
  );
  const pastBookings = bookings.filter(
    (b) => b.status === "completed" || new Date(b.checkOut) < new Date()
  );

  return (
    <div className="bg-card rounded-3xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-4 border-white/30">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <div className="text-white">
              <h2 className="text-2xl font-bold">My Bookings</h2>
              <p className="text-blue-100 text-sm">
                {bookings.length} total booking
                {bookings.length !== 1 ? "s" : ""} • {upcomingBookings.length}{" "}
                upcoming
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        {bookings.length === 0 ? (
          <div className="text-center py-16">
            <Calendar className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No bookings yet
            </h3>
            <p className="text-muted-foreground mb-6">
              Start planning your next adventure!
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Upcoming Bookings */}
            {upcomingBookings.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  Upcoming Trips
                </h3>
                <div className="space-y-4">
                  {upcomingBookings.map((booking) => (
                    <BookingCard
                      key={booking._id}
                      booking={booking}
                      formatDate={formatDate}
                      getStatusBadge={getStatusBadge}
                      getPaymentStatusBadge={getPaymentStatusBadge}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Past Bookings */}
            {pastBookings.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-gray-600" />
                  Past Trips
                </h3>
                <div className="space-y-4">
                  {pastBookings.map((booking) => (
                    <BookingCard
                      key={booking._id}
                      booking={booking}
                      formatDate={formatDate}
                      getStatusBadge={getStatusBadge}
                      getPaymentStatusBadge={getPaymentStatusBadge}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Stats Section */}
        {bookings.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {bookings.length}
                  </p>
                  <p className="text-sm text-foreground/70">Total Bookings</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-100 rounded-xl">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {upcomingBookings.length}
                  </p>
                  <p className="text-sm text-foreground/70">Upcoming</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <DollarSign className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    $
                    {bookings
                      .reduce((sum, b) => sum + b.totalPrice, 0)
                      .toFixed(0)}
                  </p>
                  <p className="text-sm text-foreground/70">Total Spent</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function BookingCard({
  booking,
  formatDate,
  getStatusBadge,
  getPaymentStatusBadge,
}: {
  booking: any;
  formatDate: (date: string) => string;
  getStatusBadge: (status?: string) => React.ReactElement;
  getPaymentStatusBadge: (status?: string) => React.ReactElement;
}) {
  return (
    <div className="bg-card/50 dark:bg-card border-2 border-input-border rounded-2xl p-6 hover:border-blue-300 transition-all hover:shadow-lg">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-bold text-foreground">
              Booking #{booking._id ? booking._id.slice(-8).toUpperCase() : "N/A"}
            </h3>
            {getStatusBadge(booking.status)}
          </div>
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <MapPin className="w-4 h-4" />
            <span>Hotel: {booking.hotelId?.name || booking.hotelId?._id || "Unknown Hotel"}</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-foreground">
            ${booking.totalPrice}
          </p>
          <p className="text-sm text-muted-foreground">
            {booking.currency || "USD"}
          </p>
        </div>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-4 mb-4 p-4 bg-muted/30 rounded-xl">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Check-in</p>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-600" />
            <p className="font-semibold text-foreground">
              {formatDate(booking.checkIn)}
            </p>
          </div>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Check-out</p>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-600" />
            <p className="font-semibold text-foreground">
              {formatDate(booking.checkOut)}
            </p>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="flex items-center justify-between pt-4 border-t border-input-border">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4" />
            <span>
              {booking.guests} guest{booking.guests !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>
              {booking.nights} night{booking.nights !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <DollarSign className="w-4 h-4" />
            <span>${booking.pricePerNight}/night</span>
          </div>
        </div>
        <div>{getPaymentStatusBadge(booking.paymentStatus)}</div>
      </div>
    </div>
  );
}
