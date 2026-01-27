import { useState, useEffect } from "react";
import MenuItemCard from "../components/MenuItemCard";
import Loading from "../components/Loading";

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch menu categories
        const categoriesResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/menu-categories/`);
        if (!categoriesResponse.ok) throw new Error('Failed to fetch categories');
        const categoriesData = await categoriesResponse.json();
        
        // Fetch menu items
        const itemsResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/menu-items/`);
        if (!itemsResponse.ok) throw new Error('Failed to fetch menu items');
        const itemsData = await itemsResponse.json();
        
        setCategories(["All", ...categoriesData.map(cat => cat.name)]);
        setMenuItems(itemsData);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredItems = selectedCategory === "All" 
    ? menuItems 
    : menuItems.filter(item => item.menu_category_name === selectedCategory);

  if (loading) {
    return <Loading message="Loading menu..." />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">Error: {error}</p>
          <p className="text-gray-600 mt-2">Make sure the Django backend is running on http://localhost:8000</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16 text-center">
        <h1 className="text-4xl font-bold">Delicious Menu Options</h1>
        <p className="mt-3 text-lg text-indigo-100">
          Choose from our wide variety of catering options
        </p>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition ${
                selectedCategory === category
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <MenuItemCard key={item.id} menuItem={item} />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No items found in this category</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default Menu;
