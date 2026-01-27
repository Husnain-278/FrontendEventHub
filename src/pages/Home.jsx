import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';

const Home = () => {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    total_bookings: 0,
    total_venues: 0,
    total_event_types: 0,
    total_menu_items: 0
  });
  
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/event-stats/`);
        const data = await response.json();
        setStats(data);
      } catch (error) {
        // Silently fail and use default values
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);
  
  if (loading) {
    return <Loading message="Loading EventHub..." />;
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            Create Unforgettable Events
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-indigo-100 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
            Book the perfect venue, choose your event type, and customize your menu - all in one place
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <Link
              to="/venues"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-gray-100 transition text-base sm:text-lg"
            >
              Browse Venues
            </Link>
            <Link
              to="/bookings"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-indigo-700 text-white rounded-lg font-semibold hover:bg-indigo-800 transition text-base sm:text-lg border-2 border-white"
            >
              Book Your Event
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gray-800">
          Why Choose EventHub?
        </h2>
        
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
            <div className="text-5xl mb-4">🏛️</div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Premium Venues</h3>
            <p className="text-gray-600">
              Choose from our curated selection of top-tier venues across Pakistan
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
            <div className="text-5xl mb-4">🎊</div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">All Event Types</h3>
            <p className="text-gray-600">
              From weddings to corporate events, we handle everything
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
            <div className="text-5xl mb-4">✨</div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Easy Booking</h3>
            <p className="text-gray-600">
              Simple and fast booking process for your perfect event
            </p>
          </div>
        </div>
      </div>

      {/* Quick Links Section */}
      <div className="bg-white py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gray-800">
            Get Started
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <Link
              to="/venues"
              className="group bg-gradient-to-br from-indigo-500 to-indigo-600 p-6 sm:p-8 rounded-2xl text-white hover:shadow-2xl transition transform hover:-translate-y-1"
            >
              <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">🏛️</div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-2">Browse Venues</h3>
              <p className="text-indigo-100 text-sm sm:text-base">Find the perfect location for your event</p>
            </Link>

            <Link
              to="/bookings"
              className="group bg-gradient-to-br from-purple-500 to-purple-600 p-6 sm:p-8 rounded-2xl text-white hover:shadow-2xl transition transform hover:-translate-y-1"
            >
              <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">📅</div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-2">Book Your Event</h3>
              <p className="text-purple-100 text-sm sm:text-base">Quick and easy event booking</p>
            </Link>

            <Link
              to="/venues"
              className="group bg-gradient-to-br from-pink-500 to-pink-600 p-6 sm:p-8 rounded-2xl text-white hover:shadow-2xl transition transform hover:-translate-y-1"
            >
              <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">💎</div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-2">Premium Service</h3>
              <p className="text-pink-100 text-sm sm:text-base">Experience world-class event management</p>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
          <div>
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-indigo-600 mb-2">
              {stats.confirmed_bookings}+
            </div>
            <div className="text-gray-600 text-sm sm:text-base">Events Hosted</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-indigo-600 mb-2">
              {stats.total_venues}+
            </div>
            <div className="text-gray-600 text-sm sm:text-base">Premium Venues</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-indigo-600 mb-2">
              {stats.total_event_types}+
            </div>
            <div className="text-gray-600 text-sm sm:text-base">Event Types</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-indigo-600 mb-2">
              {stats.total_menu_items}+
            </div>
            <div className="text-gray-600 text-sm sm:text-base">Menu Items</div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;
