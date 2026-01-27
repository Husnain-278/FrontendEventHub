const EventCard = ({ event }) => {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300">
      
      <div className="relative">
        <img
          src={event.image}
          alt={event.name}
          className="h-56 w-full object-cover group-hover:scale-105 transition duration-300"
        />

        <span className="absolute top-3 right-3 bg-black/70 text-white px-3 py-1 text-sm rounded-full">
          🎉 {event.name}
        </span>
      </div>

      <div className="p-5 space-y-3">
        <h3 className="text-xl font-semibold text-gray-800">
          {event.name}
        </h3>

        <p className="text-gray-600 text-sm line-clamp-2">
          {event.description}
        </p>

        <div className="flex justify-between items-center pt-3">
          <p className="text-indigo-600 font-bold">
            Rs {event.base_price.toLocaleString()} <span className="text-sm text-gray-400">base price</span>
          </p>

          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition">
            Book Now
          </button>
        </div>
      </div>

    </div>
  );
};

export default EventCard;
