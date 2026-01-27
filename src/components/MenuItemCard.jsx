const MenuItemCard = ({ menuItem }) => {
  const category = menuItem.menu_category_name || menuItem.category;
  
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300">
      
      <div className="relative">
        <img
          src={menuItem.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"}
          alt={menuItem.name}
          className="h-56 w-full object-cover group-hover:scale-105 transition duration-300"
        />

        <span className="absolute top-3 right-3 bg-black/70 text-white px-3 py-1 text-sm rounded-full">
          {category}
        </span>

        {!menuItem.is_available && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold">
              Not Available
            </span>
          </div>
        )}
      </div>

      <div className="p-5 space-y-3">
        <h3 className="text-xl font-semibold text-gray-800">
          {menuItem.name}
        </h3>

        <p className="text-gray-500 text-sm flex items-center gap-1">
          🍽️ {category}
        </p>

        <div className="flex justify-between items-center pt-3">
          <p className="text-indigo-600 font-bold">
            Rs {menuItem.price_per_head} <span className="text-sm text-gray-400">/ person</span>
          </p>

          {/* <button 
            disabled={!menuItem.is_available}
            className={`px-4 py-2 rounded-lg text-sm transition ${
              menuItem.is_available 
                ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {menuItem.is_available ? 'Add to Menu' : 'Unavailable'}
          </button> */}
        </div>
      </div>

    </div>
  );
};

export default MenuItemCard;
