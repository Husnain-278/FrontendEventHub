const BookingCard = ({ booking }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-500';
      case 'Pending':
        return 'bg-yellow-500';
      case 'Rejected':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300">
      
      <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
        <div className="flex justify-between items-start">
          <div className="text-white">
            <h3 className="text-2xl font-bold">{booking.customer_name}</h3>
            <p className="text-indigo-100 mt-1">{booking.customer_email}</p>
          </div>
          <span className={`${getStatusColor(booking.status)} text-white px-4 py-1 rounded-full text-sm font-semibold`}>
            {booking.status}
          </span>
        </div>
      </div>

      <div className="p-6 space-y-4">
        
        {/* Venue & Event Details */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-500 text-sm">Venue</p>
            <p className="font-semibold text-gray-800">{booking.venue}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Event Type</p>
            <p className="font-semibold text-gray-800">{booking.event_type}</p>
          </div>
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-500 text-sm">📅 Date</p>
            <p className="font-semibold text-gray-800">{booking.event_date}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">🕒 Time</p>
            <p className="font-semibold text-gray-800">{booking.event_time}</p>
          </div>
        </div>

        {/* Guests Count */}
        <div>
          <p className="text-gray-500 text-sm">👥 Number of Guests</p>
          <p className="font-semibold text-gray-800">{booking.guests_count} people</p>
        </div>

        {/* Cost Breakdown */}
        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Chairs Cost:</span>
            <span className="font-semibold">Rs {booking.chairs_cost.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Food Cost:</span>
            <span className="font-semibold">Rs {booking.food_cost.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Event Cost:</span>
            <span className="font-semibold">Rs {booking.event_cost.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-lg font-bold border-t pt-2 mt-2">
            <span className="text-indigo-600">Total Cost:</span>
            <span className="text-indigo-600">Rs {booking.total_cost.toLocaleString()}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <button className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition">
            View Details
          </button>
          <button className="flex-1 px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg text-sm hover:bg-indigo-50 transition">
            Edit Booking
          </button>
        </div>
      </div>

    </div>
  );
};

export default BookingCard;
