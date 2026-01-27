import { useEffect, useState } from 'react';
import Loading from '../components/Loading';

const BookEvent = () => {
  const [formData, setFormData] = useState({
    venue: '',
    eventType: '',
    customerName: '',
    customerEmail: '',
    eventDate: '',
    eventTime: '',
    guestsCount: '',
    selectedMenuItems: []
  });
  const [events, setEvents] = useState([])
  const [venues, setVenues] = useState([])
  const [menuItems, setMenuItems] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [submissionMessage, setSubmissionMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

 
  useEffect(()=>{
    const fetchData=async()=>{
      try {
        setLoading(true);
        //Load Event types
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/event-types/`)
        const data = await response.json()
        setEvents(data)
        //Load Venues
        const venue = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/venues/`)
        const venues_data = await venue.json()
        setVenues(venues_data)
        //Load Menu Items
        const menuItem = await  fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/menu-items/`)
        const menuItemsData = await menuItem.json()
        setMenuItems(menuItemsData)
      } catch (error) {
        // Handle error silently
      } finally {
        setLoading(false);
      }
    }
    fetchData()
  },[])
  
  

  // Get unique menu categories
  const menuCategories = ['All', ...new Set(menuItems.map(item => item.menu_category_name))];

  // Filter menu items by category
  const filteredMenuItems = selectedCategory === 'All' 
    ? menuItems.filter(item => item.is_available)
    : menuItems.filter(item => item.menu_category_name === selectedCategory && item.is_available);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Toggle menu item selection
  const toggleMenuItem = (itemId) => {
    setFormData(prev => ({
      ...prev,
      selectedMenuItems: prev.selectedMenuItems.includes(itemId)
        ? prev.selectedMenuItems.filter(id => id !== itemId)
        : [...prev.selectedMenuItems, itemId]
    }));
  };

  // Calculate costs
  const calculateCosts = () => {
    const selectedVenue = venues.find(v => v.id === parseInt(formData.venue));
    const selectedEvent = events.find(e => e.id === parseInt(formData.eventType));
    const guests = parseInt(formData.guestsCount) || 0;

    const chairsCost = selectedVenue ? guests * selectedVenue.price_per_chair : 0;
    const eventCost = selectedEvent ? selectedEvent.base_price : 0;
    
    const selectedItems = menuItems.filter(item => formData.selectedMenuItems.includes(item.id));
    const foodCost = guests * selectedItems.reduce((sum, item) => sum + item.price_per_head, 0);
    
    const totalCost = chairsCost + eventCost + foodCost;

    return { chairsCost, eventCost, foodCost, totalCost };
  };

  const costs = calculateCosts();

  if (loading) {
    return <Loading message="Loading booking form..." />;
  }

  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const bookingData = {
        venue: parseInt(formData.venue),
        event_type: parseInt(formData.eventType),
        customer_name: formData.customerName,
        customer_email: formData.customerEmail,
        event_date: formData.eventDate,
        event_time: formData.eventTime,
        guests_count: parseInt(formData.guestsCount),
        menu_items: formData.selectedMenuItems
      };

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/booking/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
      }

      const data = await response.json();
      
      setSubmissionMessage({
        type: 'success',
        text: 'Your booking is pending. We will send you an email when it\'s accepted.'
      });
      
      // Reset form
      setFormData({
        venue: '',
        eventType: '',
        customerName: '',
        customerEmail: '',
        eventDate: '',
        eventTime: '',
        guestsCount: '',
        selectedMenuItems: []
      });
      
      // Scroll to top to see message
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      setSubmissionMessage({
        type: 'error',
        text: 'Booking failed: ' + error.message
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12 sm:py-16 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold px-4">Book Your Perfect Event</h1>
        <p className="mt-3 text-base sm:text-lg text-indigo-100 px-4">
          Fill in the details and create your dream event
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Submission Message */}
        {submissionMessage && (
          <div className={`mb-6 p-4 rounded-lg flex items-start justify-between ${
            submissionMessage.type === 'success' 
              ? 'bg-green-50 border-2 border-green-500' 
              : 'bg-red-50 border-2 border-red-500'
          }`}>
            <div className="flex items-start gap-3">
              <span className="text-2xl">
                {submissionMessage.type === 'success' ? '✅' : '❌'}
              </span>
              <p className={`text-lg ${
                submissionMessage.type === 'success' 
                  ? 'text-green-800' 
                  : 'text-red-800'
              }`}>
                {submissionMessage.text}
              </p>
            </div>
            <button
              onClick={() => setSubmissionMessage(null)}
              className="text-gray-500 hover:text-gray-700 text-xl font-bold"
            >
              ×
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
          
          {/* Event Type Selection */}
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2">
              <span className="text-2xl sm:text-3xl">🎉</span>
              Select Event Type
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {events.map((event) => (
                <label
                  key={event.id}
                  className={`cursor-pointer group ${
                    formData.eventType === event.id.toString()
                      ? 'ring-4 ring-indigo-500'
                      : ''
                  }`}
                >
                  <input
                    type="radio"
                    name="eventType"
                    value={event.id}
                    checked={formData.eventType === event.id.toString()}
                    onChange={handleInputChange}
                    className="hidden"
                    required
                  />
                  <div className={`p-4 sm:p-6 rounded-xl border-2 transition ${
                    formData.eventType === event.id.toString()
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-300 bg-white'
                  }`}>
                    <div className="text-center">
                      <h3 className="font-semibold text-base sm:text-lg text-gray-800 mb-2">{event.name}</h3>
                      <p className="text-indigo-600 font-bold text-sm sm:text-base">Rs {event.base_price.toLocaleString()}</p>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Venue Selection */}
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2">
              <span className="text-2xl sm:text-3xl">🏛️</span>
              Choose Your Venue
            </h2>
            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
              {venues.map((venue) => (
                <label
                  key={venue.id}
                  className={`cursor-pointer ${
                    formData.venue === venue.id.toString()
                      ? 'ring-4 ring-indigo-500'
                      : ''
                  }`}
                >
                  <input
                    type="radio"
                    name="venue"
                    value={venue.id}
                    checked={formData.venue === venue.id.toString()}
                    onChange={handleInputChange}
                    className="hidden"
                    required
                  />
                  <div className={`rounded-xl border-2 overflow-hidden transition ${
                    formData.venue === venue.id.toString()
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-300'
                  }`}>
                    <img src={venue.image} alt={venue.name} className="h-40 w-full object-cover" />
                    <div className="p-4">
                      <h3 className="font-semibold text-lg text-gray-800">{venue.name}</h3>
                      <p className="text-gray-500 text-sm">📍 {venue.location}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm text-gray-600">👥 {venue.capacity}</span>
                        <span className="text-indigo-600 font-bold">Rs {venue.price_per_chair}/chair</span>
                      </div>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Menu Selection */}
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2">
              <span className="text-2xl sm:text-3xl">🍽️</span>
              Select Menu Items
            </h2>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
              {menuCategories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 sm:px-6 py-2 rounded-full font-medium transition text-sm sm:text-base ${
                    selectedCategory === category
                      ? 'bg-indigo-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Menu Items Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {filteredMenuItems.map((item) => (
                <label
                  key={item.id}
                  className={`cursor-pointer ${
                    formData.selectedMenuItems.includes(item.id)
                      ? 'ring-4 ring-green-500'
                      : ''
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.selectedMenuItems.includes(item.id)}
                    onChange={() => toggleMenuItem(item.id)}
                    className="hidden"
                  />
                  <div className={`p-4 rounded-xl border-2 transition ${
                    formData.selectedMenuItems.includes(item.id)
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-green-300'
                  }`}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">{item.name}</h4>
                        <p className="text-xs text-gray-500">{item.menu_category_name}</p>
                      </div>
                      {formData.selectedMenuItems.includes(item.id) && (
                        <span className="text-green-500 text-xl">✓</span>
                      )}
                    </div>
                    <p className="text-indigo-600 font-bold text-sm">
                      Rs {item.price_per_head}/person
                    </p>
                  </div>
                </label>
              ))}
            </div>

            {filteredMenuItems.length === 0 && (
              <p className="text-center text-gray-500 py-8">No items available in this category</p>
            )}
          </div>

          {/* Customer Details */}
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2">
              <span className="text-2xl sm:text-3xl">👤</span>
              Your Details
            </h2>
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Full Name *</label>
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Email Address *</label>
                <input
                  type="email"
                  name="customerEmail"
                  value={formData.customerEmail}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Event Date *</label>
                <input
                  type="date"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Event Time *</label>
                <input
                  type="time"
                  name="eventTime"
                  value={formData.eventTime}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-medium mb-2">Number of Guests *</label>
                <input
                  type="number"
                  name="guestsCount"
                  value={formData.guestsCount}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  placeholder="How many guests?"
                  min="1"
                  required
                />
              </div>
            </div>
          </div>

          {/* Cost Summary */}
          {formData.guestsCount && formData.venue && formData.eventType && (
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 text-white">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
                <span className="text-2xl sm:text-3xl">💰</span>
                Cost Summary
              </h2>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-indigo-400 text-sm sm:text-base">
                  <span>Chairs Cost ({formData.guestsCount} guests):</span>
                  <span className="font-semibold">Rs {costs.chairsCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-indigo-400 text-sm sm:text-base">
                  <span>Event Cost:</span>
                  <span className="font-semibold">Rs {costs.eventCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-indigo-400 text-sm sm:text-base">
                  <span>Food Cost ({formData.selectedMenuItems.length} items):</span>
                  <span className="font-semibold">Rs {costs.foodCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-lg sm:text-xl md:text-2xl font-bold pt-2">
                  <span>Total Cost:</span>
                  <span>Rs {costs.totalCost.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-center px-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full sm:w-auto px-8 sm:px-12 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition shadow-lg transform ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl hover:-translate-y-1'
              } text-white`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                'Confirm Booking 🎉'
              )}
            </button>
          </div>

        </form>
      </div>

    </div>
  );
};

export default BookEvent;
