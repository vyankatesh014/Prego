
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const categories = [
  {
    title: "Healthy Food",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    description: "Nutritious options for a balanced lifestyle."
  },
  {
    title: "High Protein",
    image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80",
    description: "Boost your energy with protein-rich foods."
  },
  {
    title: "Weight Loss",
    image: "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80",
    description: "Smart picks to help you reach your goals."
  },
  {
    title: "Immunity Boost",
    image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80",
    description: "Support your immune system with these foods."
  }
];

const HealthPicks = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { axios } = useAppContext();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Healthy Food");

  // Function to fetch products based on category
  const fetchProducts = async (category) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/product/list?healthCategory=${encodeURIComponent(category)}`);
      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Effect to fetch products when category changes
  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Category Navigation Bar */}
      <div className="sticky top-16 z-40 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex space-x-8">
              {categories.map((cat) => (
                <button
                  key={cat.title}
                  onClick={() => setSelectedCategory(cat.title)}
                  className={`${
                    selectedCategory === cat.title
                      ? "text-green-700 border-b-2 border-green-700"
                      : "text-gray-600 hover:text-green-700"
                  } px-3 py-2 text-sm font-medium transition-colors duration-200`}
                >
                  {cat.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{selectedCategory}</h1>
              <p className="mt-1 text-sm text-gray-500">
                {categories.find(cat => cat.title === selectedCategory)?.description}
              </p>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-4">
                  <img
                    src={product.image[0]}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-md"
                  />
                  <h3 className="mt-4 text-lg font-semibold text-gray-900">{product.name}</h3>
                  <p className="mt-1 text-gray-500">${product.price}</p>
                  <button
                    onClick={() => navigate(`/products/${product.category.toLowerCase()}/${product._id}`)}
                    className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-200"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthPicks;