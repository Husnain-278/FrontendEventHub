import EventCard from "../components/EventCard";
import events from "../data/events";

const Events = () => {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16 text-center">
        <h1 className="text-4xl font-bold">Choose Your Event Type</h1>
        <p className="mt-3 text-lg text-indigo-100">
          From weddings to corporate events - we've got you covered
        </p>
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>

    </div>
  );
};

export default Events;
