import { useState } from "react";
import BookingCard from "../components/BookingCard";
import bookings from "../data/bookings";

const Bookings = () => {
  const [selectedStatus, setSelectedStatus] = useState("All");

  const statuses = ["All", "Active", "Pending", "Rejected"];

  const filteredBookings = selectedStatus === "All" 
    ? bookings 
    : bookings.filter(booking => booking.status === selectedStatus);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16 text-center">
        <h1 className="text-4xl font-bold">Your Bookings</h1>
        <p className="mt-3 text-lg text-indigo-100">
          Manage and track all your event bookings
        </p>
      </div>

      {/* Status Filter */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-wrap gap-3 justify-center">
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-6 py-2 rounded-full font-medium transition ${
                selectedStatus === status
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid gap-8 lg:grid-cols-2">
          {filteredBookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>

        {filteredBookings.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No bookings found with this status</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default Bookings;
