const VenueCard = ({ venue }) => {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300">
      
      <div className="relative">
        <img
          src={venue.image}
          alt={venue.name}
          className="h-56 w-full object-cover group-hover:scale-105 transition duration-300"
        />

        <span className="absolute top-3 right-3 bg-black/70 text-white px-3 py-1 text-sm rounded-full">
          👥 {venue.capacity}
        </span>
      </div>

      <div className="p-5 space-y-3">
        <h3 className="text-xl font-semibold text-gray-800">
          {venue.name}
        </h3>

        <p className="text-gray-500 text-sm flex items-center gap-1">
          📍 {venue.location}
        </p>

        <div className="flex justify-between items-center pt-3">
          <p className="text-indigo-600 font-bold">
            Rs {venue.price_per_chair} <span className="text-sm text-gray-400">/ chair</span>
          </p>

          
        </div>
      </div>

    </div>
  );
};

export default VenueCard;
