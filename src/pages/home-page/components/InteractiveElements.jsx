import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const InteractiveElements = () => {
  const navigate = useNavigate();

  const destinationQuickLinks = [
    {
      name: 'Rajasthan',
      image: 'https://media.istockphoto.com/id/493440458/photo/indian-women-carrying-on-their-heads-water-from-local-well.jpg?s=2048x2048&w=is&k=20&c=QYOUBrtC_tapPr57DAfFdcOL6oQpC4-cSwcDCqngXY8=',
      packages: 45,
      startingPrice: 25000,
      color: 'from-orange-500 to-red-500'
    },
    {
      name: 'Kerala',
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=300&h=200&fit=crop',
      packages: 32,
      startingPrice: 20000,
      color: 'from-green-500 to-emerald-500'
    },
    {
      name: 'Kashmir',
      image: 'https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=300&h=200&fit=crop',
      packages: 28,
      startingPrice: 35000,
      color: 'from-blue-500 to-indigo-500'
    },
    {
      name: 'Goa',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=300&h=200&fit=crop',
      packages: 38,
      startingPrice: 15000,
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  const seasonalSuggestions = [
    {
      season: 'Winter (Dec-Feb)',
      icon: 'Snowflake',
      title: 'Perfect for North India',
      destinations: ['Rajasthan', 'Delhi', 'Agra', 'Goa'],
      description: 'Ideal weather for exploring palaces, forts, and beaches',
      color: 'text-blue-600 bg-blue-50'
    },
    {
      season: 'Summer (Mar-May)',
      icon: 'Sun',
      title: 'Hill Stations Calling',
      destinations: ['Shimla', 'Manali', 'Kashmir', 'Darjeeling'],
      description: 'Escape the heat in cool mountain destinations',
      color: 'text-orange-600 bg-orange-50'
    },
    {
      season: 'Monsoon (Jun-Sep)',
      icon: 'CloudRain',
      title: 'Lush Green Beauty',
      destinations: ['Kerala', 'Coorg', 'Munnar', 'Western Ghats'],
      description: 'Experience nature at its greenest and most beautiful',
      color: 'text-green-600 bg-green-50'
    },
    {
      season: 'Post-Monsoon (Oct-Nov)',
      icon: 'Leaf',
      title: 'Festival Season',
      destinations: ['West Bengal', 'Odisha', 'Northeast', 'Punjab'],
      description: 'Perfect time for festivals and cultural experiences',
      color: 'text-purple-600 bg-purple-50'
    }
  ];

  const handleDestinationClick = (destination) => {
    navigate(`/tour-package-discovery?destination=${destination?.toLowerCase()}`);
  };

  const handleSeasonalClick = (destinations) => {
    navigate(`/tour-package-discovery`);
  };

  // Format price in INR
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    })?.format(price);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Destination Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Explore by Destination
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Quick access to our most popular destinations with instant package discovery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinationQuickLinks?.map((destination, index) => (
              <motion.div
                key={destination?.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleDestinationClick(destination?.name)}
                className="relative cursor-pointer group"
              >
                <div className="relative overflow-hidden rounded-xl shadow-lg">
                  <img
                    src={destination?.image}
                    alt={destination?.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${destination?.color} opacity-60`} />
                  
                  <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                    <h3 className="text-2xl font-bold mb-2">{destination?.name}</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm opacity-90">{destination?.packages} packages</p>
                        <p className="text-lg font-semibold">
                          From {formatPrice(destination?.startingPrice)}
                        </p>
                      </div>
                      <Icon name="ArrowRight" size={20} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Seasonal Travel Suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Best Time to Travel
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Plan your perfect trip with our seasonal travel suggestions and weather insights
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {seasonalSuggestions?.map((season, index) => (
              <motion.div
                key={season?.season}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg ${season?.color}`}>
                    <Icon name={season?.icon} size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-foreground">
                        {season?.title}
                      </h3>
                      <span className="text-sm text-muted-foreground">
                        {season?.season}
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-3">
                      {season?.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {season?.destinations?.map((dest, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                        >
                          {dest}
                        </span>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSeasonalClick(season?.destinations)}
                      iconName="MapPin"
                    >
                      Explore Packages
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Travel Tips Teaser */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 text-center"
        >
          <Icon name="Lightbulb" size={48} className="mx-auto mb-4 text-primary" />
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Need Travel Tips?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Get insider tips, local insights, and travel hacks from our experienced team. 
            Make your journey memorable with expert guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              iconName="BookOpen"
            >
              Read Travel Guide
            </Button>
            <Button
              variant="outline"
              iconName="MessageCircle"
            >
              Chat with Expert
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InteractiveElements;