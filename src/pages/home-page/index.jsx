import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import FeaturedPackages from './components/FeaturedPackages';
import AIRecommendationTeaser from './components/AIRecommendationTeaser';
import TrustIndicators from './components/TrustIndicators';
import QuickSearch from './components/QuickSearch';
import InteractiveElements from './components/InteractiveElements';
import NewsletterSection from './components/NewsletterSection.jsx';

const HomePage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [featuredPackages, setFeaturedPackages] = useState([]);

  // Mock featured packages data
  const mockFeaturedPackages = [
    {
      id: 1,
      title: "Royal Rajasthan Heritage Tour",
      description: "Explore magnificent palaces and forts of Rajasthan",
      image: "https://media.istockphoto.com/id/1224021113/photo/indian-cameleers-camel-driver-with-camel-silhouettes-in-dunes-on-sunset-jaisalmer-rajasthan.jpg?s=2048x2048&w=is&k=20&c=7jfwu64-qz1QkDyB24lih3bwbgQYlKfF3ePozOU7shA=",
      price: 45000,
      originalPrice: 55000,
      duration: 8,
      rating: 4.8,
      reviews: 324,
      discount: 18,
      isPopular: true,
      highlights: ["Jaipur City Palace", "Udaipur Lake Palace", "Jodhpur Fort"]
    },
    {
      id: 2,
      title: "Kerala Backwaters & Hill Stations",
      description: "Serene backwaters and misty hills of Kerala",
      image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&h=400&fit=crop",
      price: 32000,
      originalPrice: null,
      duration: 6,
      rating: 4.6,
      reviews: 198,
      discount: null,
      isPopular: false,
      highlights: ["Alleppey Houseboat", "Munnar Tea Gardens", "Kochi Fort"]
    },
    {
      id: 3,
      title: "Goa Beach Paradise",
      description: "Pristine beaches and vibrant nightlife of Goa",
      image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&h=400&fit=crop",
      price: 18000,
      originalPrice: 22000,
      duration: 4,
      rating: 4.4,
      reviews: 456,
      discount: 18,
      isPopular: true,
      highlights: ["Baga Beach", "Old Goa Churches", "Dudhsagar Falls"]
    },
    {
      id: 4,
      title: "Kashmir Valley Paradise",
      description: "Breathtaking beauty of the Kashmir Valley",
      image: "https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=600&h=400&fit=crop",
      price: 52000,
      originalPrice: 65000,
      duration: 9,
      rating: 4.9,
      reviews: 289,
      discount: 20,
      isPopular: true,
      highlights: ["Dal Lake Shikara", "Gulmarg Gondola", "Pahalgam Valley"]
    }
  ];

  // Initialize data
  useEffect(() => {
    const initializeData = async () => {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setFeaturedPackages(mockFeaturedPackages);
      setIsLoading(false);
    };

    initializeData();
  }, []);

  // Navigation handlers
  const handleDiscoverTours = () => {
    navigate('/tour-package-discovery');
  };

  const handleAIRecommender = () => {
    navigate('/ai-destination-recommender');
  };

  const handlePackageClick = (packageId) => {
    navigate(`/tour-package-details?id=${packageId}`);
  };

  const handleQuickSearch = (searchData) => {
    // Navigate to tour discovery with search parameters
    const params = new URLSearchParams();
    if (searchData?.destination) params?.append('destination', searchData?.destination);
    if (searchData?.budget) params?.append('budget', searchData?.budget);
    if (searchData?.duration) params?.append('duration', searchData?.duration);
    
    navigate(`/tour-package-discovery?${params?.toString()}`);
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden ">
      {/* Hero Section */}
      <HeroSection
        onDiscoverTours={handleDiscoverTours}
        onAIRecommender={handleAIRecommender}
      />

      {/* Quick Search */}
      <QuickSearch onSearch={handleQuickSearch} />

      {/* Featured Tour Packages */}
      <FeaturedPackages
        packages={featuredPackages}
        isLoading={isLoading}
        onPackageClick={handlePackageClick}
      />

      {/* AI Recommendation Teaser */}
      <AIRecommendationTeaser onGetRecommendations={handleAIRecommender} />

      {/* Trust Indicators */}
      <TrustIndicators />

      {/* Interactive Elements */}
      <InteractiveElements />

      {/* Newsletter Section */}
      <NewsletterSection />
    </div>
  );
};

export default HomePage;