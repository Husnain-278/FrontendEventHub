import { useEffect, useState } from "react";
import VenueCard from "../components/VenueCard";
import Loading from "../components/Loading";

const Venues = () => {
  const [venues, setVenues] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(()=>{
    const getVenues=async()=>{
       try {
         setLoading(true);
         const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/venues/`)
         const data = await response.json()
         setVenues(data)
       } catch (error) {
         // Handle error silently
       } finally {
         setLoading(false);
       }
    }
    getVenues()
  }, [])

  if (loading) {
    return <Loading message="Loading venues..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12 sm:py-16 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold px-4">Find Your Perfect Venue</h1>
        <p className="mt-3 text-base sm:text-lg text-indigo-100 px-4">
          Book the best halls, marquees & event spaces
        </p>
      </div>

      {/* Venue Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {venues.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>
      </div>

    </div>
  );
};

export default Venues;
