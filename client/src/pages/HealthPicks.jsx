import React from 'react'

const HealthPicks = () => {
  const categories = [
    {
      name: 'Healthy Food',
      path: '/health-picks/healthy-food',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'High Protein',
      path: '/health-picks/high-protein',
      image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Weight Loss',
      path: '/health-picks/weight-loss',
      image: 'https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Immunity Boost',
      path: '/health-picks/immunity-boost',
      image: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-primary">Health Picks Store</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {categories.map((cat) => (
          <a
            key={cat.name}
            href={cat.path}
            className="block bg-white rounded-xl shadow-lg hover:shadow-2xl transition overflow-hidden group border border-gray-100"
          >
            <img src={cat.image} alt={cat.name} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" />
            <div className="p-4 text-center">
              <h2 className="text-lg font-semibold text-gray-800 group-hover:text-primary mb-2">{cat.name}</h2>
              <span className="inline-block text-xs text-primary bg-primary/10 px-3 py-1 rounded-full">Explore</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

export default HealthPicks