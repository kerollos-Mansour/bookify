import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFlightBooking } from "../../context/flightBookingContext";
import { MdCheck, MdPerson, MdEmail, MdPhone } from "react-icons/md";
import PageTransition from "../../components/pageTransition/pageTransition";

interface PassengerFormData {
  type: "adult" | "child" | "infant";
  title: "Mr" | "Mrs" | "Ms" | "Miss" | "Dr";
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  passportNumber: string;
  nationality: string;
}

export default function PassengerInformation() {
  const navigate = useNavigate();
  const { state, setPassengers, setContactInfo, getTotalPrice } =
    useFlightBooking();

  const [passengers, setLocalPassengers] = useState<PassengerFormData[]>(
    Array.from({ length: state.searchParams.passengers }, () => ({
      type: "adult",
      title: "Mr",
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      passportNumber: "",
      nationality: "",
    }))
  );

  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  const updatePassenger = (
    index: number,
    field: keyof PassengerFormData,
    value: string
  ) => {
    const updated = [...passengers];
    updated[index] = { ...updated[index], [field]: value };
    setLocalPassengers(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate
    const allValid = passengers.every(
      (p) => p.firstName && p.lastName && p.dateOfBirth
    );

    if (!allValid || !contactEmail || !contactPhone) {
      alert("Please fill in all required fields");
      return;
    }

    // Save to context
    setPassengers(passengers);
    setContactInfo(contactEmail, contactPhone);

    // Navigate to checkout
    navigate("/checkout?type=flight");
  };

  if (!state.departingFlight) {
    navigate("/");
    return null;
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-alternate dark:bg-[#0F172A] pt-20">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <MdCheck className="text-green-600" />
              Choose departing flight
            </span>
            <span>→</span>
            {state.returningFlight ? (
              <span className="flex items-center gap-2">
                <MdCheck className="text-green-600" />
                Choose returning flight
              </span>
            ) : null}
            {state.returningFlight && <span>→</span>}
            <span className="font-semibold text-card-foreground">
              Passenger Information
            </span>
            <span>→</span>
            <span>Review & Pay</span>
          </div>

          {/* Flight Summary */}
          <div className="bg-card border border-card-border rounded-xl p-6 mb-6">
            <h2 className="text-xl font-bold text-card-foreground mb-4">
              Trip Summary
            </h2>

            {/* Departing */}
            <div className="pb-4 border-b border-card-border mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-card-foreground">
                  Departing Flight
                </h3>
                <span className="text-sm text-muted-foreground capitalize">
                  {state.departingClass}
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                {state.departingFlight.airline} •{" "}
                {state.departingFlight.flightNumber}
              </div>
              <div className="text-sm">
                {state.departingFlight.departure.airport.code} →{" "}
                {state.departingFlight.arrival.airport.code}
              </div>
              <div className="text-lg font-bold text-blue-600 mt-2">
                $
                {state.departingFlight.pricing[state.departingClass!].price *
                  state.searchParams.passengers}
              </div>
            </div>

            {/* Returning */}
            {state.returningFlight && state.returningClass && (
              <div className="pb-4 border-b border-card-border mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-card-foreground">
                    Returning Flight
                  </h3>
                  <span className="text-sm text-muted-foreground capitalize">
                    {state.returningClass}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {state.returningFlight.airline} •{" "}
                  {state.returningFlight.flightNumber}
                </div>
                <div className="text-sm">
                  {state.returningFlight.departure.airport.code} →{" "}
                  {state.returningFlight.arrival.airport.code}
                </div>
                <div className="text-lg font-bold text-blue-600 mt-2">
                  $
                  {state.returningFlight.pricing[state.returningClass].price *
                    state.searchParams.passengers}
                </div>
              </div>
            )}

            {/* Total */}
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-card-foreground">
                Total
              </span>
              <span className="text-2xl font-bold text-blue-600">
                ${getTotalPrice()}
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Passenger Forms */}
            {passengers.map((passenger, index) => (
              <div
                key={index}
                className="bg-card border border-card-border rounded-xl p-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <MdPerson className="text-blue-600 text-xl" />
                  <h3 className="text-lg font-semibold text-card-foreground">
                    Passenger {index + 1}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-card-foreground mb-2">
                      Title *
                    </label>
                    <select
                      value={passenger.title}
                      onChange={(e) =>
                        updatePassenger(index, "title", e.target.value)
                      }
                      className="w-full px-4 py-2 border border-card-border bg-background text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="Mr">Mr</option>
                      <option value="Mrs">Mrs</option>
                      <option value="Ms">Ms</option>
                      <option value="Miss">Miss</option>
                      <option value="Dr">Dr</option>
                    </select>
                  </div>

                  {/* Type */}
                  <div>
                    <label className="block text-sm font-medium text-card-foreground mb-2">
                      Type *
                    </label>
                    <select
                      value={passenger.type}
                      onChange={(e) =>
                        updatePassenger(index, "type", e.target.value)
                      }
                      className="w-full px-4 py-2 border border-card-border bg-background text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="adult">Adult (12+)</option>
                      <option value="child">Child (2-11)</option>
                      <option value="infant">Infant (0-2)</option>
                    </select>
                  </div>

                  {/* First Name */}
                  <div>
                    <label className="block text-sm font-medium text-card-foreground mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={passenger.firstName}
                      onChange={(e) =>
                        updatePassenger(index, "firstName", e.target.value)
                      }
                      className="w-full px-4 py-2 border border-card-border bg-background text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className="block text-sm font-medium text-card-foreground mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={passenger.lastName}
                      onChange={(e) =>
                        updatePassenger(index, "lastName", e.target.value)
                      }
                      className="w-full px-4 py-2 border border-card-border bg-background text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <label className="block text-sm font-medium text-card-foreground mb-2">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      value={passenger.dateOfBirth}
                      onChange={(e) =>
                        updatePassenger(index, "dateOfBirth", e.target.value)
                      }
                      className="w-full px-4 py-2 border border-card-border bg-background text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  {/* Passport Number */}
                  <div>
                    <label className="block text-sm font-medium text-card-foreground mb-2">
                      Passport Number (Optional)
                    </label>
                    <input
                      type="text"
                      value={passenger.passportNumber}
                      onChange={(e) =>
                        updatePassenger(index, "passportNumber", e.target.value)
                      }
                      className="w-full px-4 py-2 border border-card-border bg-background text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Nationality */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-card-foreground mb-2">
                      Nationality (Optional)
                    </label>
                    <input
                      type="text"
                      value={passenger.nationality}
                      onChange={(e) =>
                        updatePassenger(index, "nationality", e.target.value)
                      }
                      className="w-full px-4 py-2 border border-card-border bg-background text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* Contact Information */}
            <div className="bg-card border border-card-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-card-foreground mb-4">
                Contact Information
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">
                    <MdEmail className="inline mr-2" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-card-border bg-background text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">
                    <MdPhone className="inline mr-2" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full px-4 py-2 border border-card-border bg-background text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    placeholder="+1 234 567 8900"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 px-6 py-3 border border-card-border rounded-lg font-semibold hover:bg-muted transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Continue to Payment
              </button>
            </div>
          </form>
        </div>
      </div>
    </PageTransition>
  );
}
