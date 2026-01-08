import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

const AIDestinationRecommender = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  // Form state
  const [preferences, setPreferences] = useState({
    startingPoint: '',
    budget: { min: 10000, max: 50000 },
    duration: 7,
    travelStyles: [],
    season: '',
    additionalRequirements: ''
  });

  const steps = [
    { id: 1, title: 'Starting Point', description: 'Where will you begin your journey?', icon: '📍' },
    { id: 2, title: 'Budget', description: 'Set your travel budget', icon: '💰' },
    { id: 3, title: 'Duration', description: 'Choose trip length', icon: '📅' },
    { id: 4, title: 'Style', description: 'Select travel preferences', icon: '🎯' },
    { id: 5, title: 'Season', description: 'Pick travel timing', icon: '🌤️' },
    { id: 6, title: 'Results', description: 'Get AI recommendations', icon: '✨' }
  ];

  // Starting point options (major Indian cities)
  const startingPointOptions = [
    { id: 'delhi', label: 'Delhi', icon: '🏛️' },
    { id: 'mumbai', label: 'Mumbai', icon: '🌃' },
    { id: 'bangalore', label: 'Bangalore', icon: '💻' },
    { id: 'chennai', label: 'Chennai', icon: '🏖️' },
    { id: 'kolkata', label: 'Kolkata', icon: '🎭' },
    { id: 'hyderabad', label: 'Hyderabad', icon: '🍛' },
    { id: 'ahmedabad', label: 'Ahmedabad', icon: '🪡' },
    { id: 'pune', label: 'Pune', icon: '🎓' },
    { id: 'jaipur', label: 'Jaipur', icon: '🏰' },
    { id: 'other', label: 'Other City', icon: '📍' }
  ];

  // Budget ranges
  const budgetRanges = [
    { id: 'budget', label: 'Budget Friendly', min: 3000, max: 15000 },
    { id: 'moderate', label: 'Moderate', min: 15000, max: 35000 },
    { id: 'premium', label: 'Premium', min: 35000, max: 75000 },
    { id: 'luxury', label: 'Luxury', min: 75000, max: 150000 }
  ];

  // Duration options
  const durationOptions = [
    { id: 'weekend', label: 'Weekend Getaway', days: 3 },
    { id: 'week', label: '1 Week', days: 7 },
    { id: 'fortnight', label: '2 Weeks', days: 14 },
    { id: 'month', label: '1 Month', days: 30 }
  ];

  // Travel style options
  const travelStyleOptions = [
    { id: 'adventure', label: 'Adventure', icon: '🧗' },
    { id: 'relaxation', label: 'Relaxation', icon: '🏖️' },
    { id: 'cultural', label: 'Cultural', icon: '🏛️' },
    { id: 'food', label: 'Food & Cuisine', icon: '🍲' },
    { id: 'shopping', label: 'Shopping', icon: '🛍️' },
    { id: 'photography', label: 'Photography', icon: '📸' },
    { id: 'wildlife', label: 'Wildlife', icon: '🐘' },
    { id: 'spiritual', label: 'Spiritual', icon: '🕉️' }
  ];

  // Season options
  const seasonOptions = [
    { id: 'summer', label: 'Summer (Mar-Jun)', icon: '☀️' },
    { id: 'monsoon', label: 'Monsoon (Jul-Sep)', icon: '🌧️' },
    { id: 'autumn', label: 'Autumn (Oct-Nov)', icon: '🍂' },
    { id: 'winter', label: 'Winter (Dec-Feb)', icon: '❄️' },
    { id: 'any', label: 'Any Season', icon: '🔄' }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleStartingPointChange = (startingPoint) => {
    setPreferences(prev => ({ ...prev, startingPoint }));
  };

  const handleBudgetChange = (budget) => {
    setPreferences(prev => ({ ...prev, budget }));
  };

  const handleDurationChange = (duration) => {
    setPreferences(prev => ({ ...prev, duration }));
  };

  const handleStyleChange = (styleId) => {
    setPreferences(prev => {
      const updatedStyles = prev.travelStyles.includes(styleId)
        ? prev.travelStyles.filter(id => id !== styleId)
        : [...prev.travelStyles, styleId];
      
      return { ...prev, travelStyles: updatedStyles };
    });
  };

  const handleSeasonChange = (season) => {
    setPreferences(prev => ({ ...prev, season }));
  };

  const handleNextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      generateRecommendations();
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Function to call Gemini API using the new SDK
  const generateRecommendations = async () => {
    setIsProcessing(true);
    
    try {
      if (!apiKey) {
        throw new Error("API key not found. Please set VITE_GEMINI_API_KEY in your .env file");
      }

      // Create GoogleGenAI instance
      const ai = new GoogleGenAI({
        apiKey: apiKey
      });

      // Get the starting point label
      const startingPointLabel = startingPointOptions.find(
        point => point.id === preferences.startingPoint
      )?.label || preferences.startingPoint;
      
      // Prepare the prompt for Gemini
      const prompt = `As a travel expert, recommend 4 destinations in India based on these preferences:
      - Starting from: ${startingPointLabel}
      - Budget: INR ${preferences.budget.min} to ${preferences.budget.max}
      - Duration: ${preferences.duration} days
      - Travel styles: ${preferences.travelStyles.join(', ')}
      - Preferred season: ${preferences.season}
      
      Please consider travel time and costs from the starting point to each destination.
      Provide recommendations in JSON format with this structure:
      [
        {
          "id": 1,
          "destination": "Destination Name",
          "state": "State Name",
          "confidenceScore": 85,
          "aiExplanation": "Detailed explanation why this matches user preferences",
          "costPerDay": 3000,
          "travelCostFromStart": 8000,
          "totalEstimate": ${preferences.duration * 3000 + 8000},
          "recommendedDays": ${preferences.duration},
          "travelTimeFromStart": "Travel time from starting point",
          "weather": {
            "condition": "weather condition",
            "temperature": "temperature range"
          },
          "bestMonths": "Best months to visit",
          "highlights": ["Highlight 1", "Highlight 2", "Highlight 3"],
          "matchingStyles": ["Style 1", "Style 2"]
        }
      ]
      
      IMPORTANT: Return ONLY the JSON array, no additional text, explanations, or markdown formatting.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview", // You can use "gemini-2.5-flash" if available
        contents: prompt
      });

      const responseText = response.text;

      // Try to parse the JSON from the response
      try {
        // Clean the response text - remove markdown code blocks if present
        let cleanedText = responseText
          .replace(/```json\s*/g, '')
          .replace(/```\s*/g, '')
          .trim();

        const parsedRecommendations = JSON.parse(cleanedText);
        setRecommendations(parsedRecommendations);
      } catch (parseError) {
        console.error("Error parsing JSON response:", parseError);
        console.log("Raw response:", responseText);
        
        // Fallback to mock data if parsing fails
        setRecommendations(getMockRecommendations());
      }
      
      // Add to conversation history
      const newEntry = {
        id: Date.now(),
        timestamp: new Date(),
        preferences: { ...preferences },
        results: recommendations
      };
      
      setConversationHistory(prev => [...prev, newEntry]);
      
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      // Fallback to mock data if API call fails
      setRecommendations(getMockRecommendations());
    }
    
    setTimeout(() => {
      setIsProcessing(false);
      setShowResults(true);
      setCurrentStep(6);
    }, 2000);
  };

  // Fallback mock recommendations (same as before)
  const getMockRecommendations = () => {
    const startingPointLabel = startingPointOptions.find(
      point => point.id === preferences.startingPoint
    )?.label || preferences.startingPoint;
    
    return [
      {
        id: 1,
        destination: 'Manali',
        state: 'Himachal Pradesh',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
        confidenceScore: 95,
        aiExplanation: `Perfect match for your adventure preferences and budget! Manali offers excellent trekking opportunities, stunning mountain views, and fits perfectly within your ${preferences.duration}-day timeframe. Well-connected from ${startingPointLabel} with overnight bus or flight options to Kullu.`,
        costPerDay: 2500,
        travelCostFromStart: 5000,
        totalEstimate: preferences.duration * 2500 + 5000,
        recommendedDays: preferences.duration,
        travelTimeFromStart: "12 hours by road",
        weather: {
          condition: 'pleasant',
          temperature: '15-25°C'
        },
        bestMonths: 'Mar-Jun, Sep-Nov',
        highlights: [
          'Rohtang Pass adventure activities',
          'Solang Valley paragliding',
          'Old Manali cafes and culture',
          'Hadimba Temple visit',
          'River rafting in Beas',
          'Local Himachali cuisine'
        ],
        matchingStyles: ['Adventure', 'Cultural', 'Photography']
      },
      {
        id: 2,
        destination: 'Goa',
        state: 'Goa',
        image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=600&fit=crop',
        confidenceScore: 88,
        aiExplanation: `Great choice for relaxation and beach activities! Goa's beaches, vibrant nightlife, and Portuguese heritage align well with your preferences. Multiple flight and train options available from ${startingPointLabel}.`,
        costPerDay: 3000,
        travelCostFromStart: 8000,
        totalEstimate: preferences.duration * 3000 + 8000,
        recommendedDays: preferences.duration,
        travelTimeFromStart: "2 hours flight",
        weather: {
          condition: 'sunny',
          temperature: '25-32°C'
        },
        bestMonths: 'Nov-Mar',
        highlights: [
          'Pristine beaches and water sports',
          'Portuguese colonial architecture',
          'Vibrant nightlife and beach shacks',
          'Spice plantations tour',
          'Dudhsagar waterfalls',
          'Local seafood cuisine'
        ],
        matchingStyles: ['Relaxation', 'Food & Cuisine', 'Cultural']
      }
    ];
  };

  const handleRefineSearch = () => {
    setShowResults(false);
    setCurrentStep(1);
  };

  const handleSaveToWishlist = (recommendationId, isSaved) => {
    // Mock wishlist functionality
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const recommendation = recommendations.find(r => r.id === recommendationId);
    
    if (isSaved && recommendation) {
      wishlist.push(recommendation);
    } else {
      const index = wishlist.findIndex(item => item.id === recommendationId);
      if (index > -1) {
        wishlist.splice(index, 1);
      }
    }
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  };

  const handleBookNow = (recommendation) => {
    navigate('/booking', { 
      state: { 
        prefilledData: {
          destination: recommendation.destination,
          duration: preferences.duration,
          budget: recommendation.totalEstimate
        }
      }
    });
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return preferences.startingPoint;
      case 2:
        return preferences.budget && preferences.budget.min && preferences.budget.max;
      case 3:
        return preferences.duration;
      case 4:
        return preferences.travelStyles.length > 0;
      case 5:
        return true; // Season is optional
      default:
        return true;
    }
  };

  const getStepProgress = () => {
    return ((currentStep - 1) / 5) * 100;
  };

  // Starting Point Selector Component
  const StartingPointSelector = () => {
    const [customCity, setCustomCity] = useState('');
    
    const handleStartingPointSelect = (pointId) => {
      if (pointId === 'other') {
        // If "Other" is selected, use the custom city value
        handleStartingPointChange(customCity);
      } else {
        handleStartingPointChange(pointId);
        setCustomCity('');
      }
    };
    
    const handleCustomCityChange = (e) => {
      const value = e.target.value;
      setCustomCity(value);
      if (value) {
        handleStartingPointChange(value);
      }
    };
    
    return (
      <div className="bg-white rounded-xl p-6 shadow-md">
        <h3 className="text-xl font-semibold mb-4">Where will you begin your journey?</h3>
        <p className="text-gray-600 mb-6">This helps us recommend destinations with convenient travel options</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {startingPointOptions.map((point) => (
            <div 
              key={point.id}
              className={`p-4 border-2 rounded-lg cursor-pointer text-center transition-all ${
                preferences.startingPoint === point.id || 
                (point.id === 'other' && preferences.startingPoint && !startingPointOptions.some(p => p.id === preferences.startingPoint))
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handleStartingPointSelect(point.id)}
            >
              <div className="text-2xl mb-2">{point.icon}</div>
              <h4 className="font-medium">{point.label}</h4>
            </div>
          ))}
        </div>
        
        {(preferences.startingPoint === 'other' || 
          (preferences.startingPoint && !startingPointOptions.some(p => p.id === preferences.startingPoint))) && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Enter your city:</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md"
              value={customCity}
              onChange={handleCustomCityChange}
              placeholder="Enter your city name"
            />
          </div>
        )}
        
        <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-100">
          <p className="text-sm text-orange-800">
            Starting from: {preferences.startingPoint 
              ? startingPointOptions.find(p => p.id === preferences.startingPoint)?.label || preferences.startingPoint
              : 'Not specified'}
          </p>
        </div>
      </div>
    );
  };

  // Budget Selector Component
  const BudgetSelector = () => {
    const [customMin, setCustomMin] = useState(preferences.budget.min);
    const [customMax, setCustomMax] = useState(preferences.budget.max);
    
    const handleRangeSelect = (range) => {
      handleBudgetChange({ min: range.min, max: range.max });
      setCustomMin(range.min);
      setCustomMax(range.max);
    };
    
    const handleCustomMinChange = (e) => {
      const value = parseInt(e.target.value) || 0;
      setCustomMin(value);
      handleBudgetChange({ min: value, max: customMax });
    };
    
    const handleCustomMaxChange = (e) => {
      const value = parseInt(e.target.value) || 0;
      setCustomMax(value);
      handleBudgetChange({ min: customMin, max: value });
    };
    
    return (
      <div className="bg-white rounded-xl p-6 shadow-md ">
        <h3 className="text-xl font-semibold mb-4">Select Your Budget Range (INR)</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {budgetRanges.map((range) => (
            <div 
              key={range.id}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                preferences.budget.min === range.min && preferences.budget.max === range.max
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handleRangeSelect(range)}
            >
              <h4 className="font-medium">{range.label}</h4>
              <p className="text-gray-600">₹{range.min.toLocaleString('en-IN')} - ₹{range.max.toLocaleString('en-IN')}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h4 className="font-medium mb-3">Or set a custom range:</h4>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Budget</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">₹</span>
                <input
                  type="number"
                  className="pl-8 pr-4 py-2 border border-gray-300 rounded-md w-full"
                  value={customMin}
                  onChange={handleCustomMinChange}
                  min="1000"
                  max="200000"
                />
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Budget</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">₹</span>
                <input
                  type="number"
                  className="pl-8 pr-4 py-2 border border-gray-300 rounded-md w-full"
                  value={customMax}
                  onChange={handleCustomMaxChange}
                  min="1000"
                  max="200000"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-100">
          <p className="text-sm text-orange-800">
            Selected Budget: ₹{preferences.budget.min.toLocaleString('en-IN')} - ₹{preferences.budget.max.toLocaleString('en-IN')}
          </p>
        </div>
      </div>
    );
  };

  // Duration Selector Component
  const DurationSelector = () => {
    return (
      <div className="bg-white rounded-xl p-6 shadow-md">
        <h3 className="text-xl font-semibold mb-4">How long is your trip?</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {durationOptions.map((option) => (
            <div 
              key={option.id}
              className={`p-4 border-2 rounded-lg cursor-pointer text-center transition-all ${
                preferences.duration === option.days
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handleDurationChange(option.days)}
            >
              <div className="text-2xl mb-2">📅</div>
              <h4 className="font-medium">{option.label}</h4>
              <p className="text-gray-600">{option.days} days</p>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Or specify custom duration (days):</label>
          <input
            type="number"
            className="w-full p-3 border border-gray-300 rounded-md"
            value={preferences.duration}
            onChange={(e) => handleDurationChange(parseInt(e.target.value) || 1)}
            min="1"
            max="60"
          />
        </div>
        
        <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-100">
          <p className="text-sm text-orange-800">
            Selected Duration: {preferences.duration} days
          </p>
        </div>
      </div>
    );
  };

  // Travel Style Selector Component
  const TravelStyleSelector = () => {
    return (
      <div className="bg-white rounded-xl p-6 shadow-md">
        <h3 className="text-xl font-semibold mb-4">What kind of experience are you looking for?</h3>
        <p className="text-gray-600 mb-6">Select all that apply</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {travelStyleOptions.map((style) => (
            <div 
              key={style.id}
              className={`p-4 border-2 rounded-lg cursor-pointer text-center transition-all ${
                preferences.travelStyles.includes(style.id)
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handleStyleChange(style.id)}
            >
              <div className="text-2xl mb-2">{style.icon}</div>
              <h4 className="font-medium">{style.label}</h4>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-100">
          <p className="text-sm text-orange-800">
            Selected Styles: {preferences.travelStyles.length > 0 
              ? preferences.travelStyles.map(id => travelStyleOptions.find(s => s.id === id)?.label).join(', ')
              : 'None selected'}
          </p>
        </div>
      </div>
    );
  };

  // Season Selector Component
  const SeasonSelector = () => {
    return (
      <div className="bg-white rounded-xl p-6 shadow-md">
        <h3 className="text-xl font-semibold mb-4">When are you planning to travel?</h3>
        <p className="text-gray-600 mb-6">This helps us recommend destinations with the best weather</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {seasonOptions.map((season) => (
            <div 
              key={season.id}
              className={`p-4 border-2 rounded-lg cursor-pointer text-center transition-all ${
                preferences.season === season.id
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handleSeasonChange(season.id)}
            >
              <div className="text-2xl mb-2">{season.icon}</div>
              <h4 className="font-medium">{season.label}</h4>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-100">
          <p className="text-sm text-orange-800">
            Selected Season: {preferences.season 
              ? seasonOptions.find(s => s.id === preferences.season)?.label
              : 'Not specified'}
          </p>
        </div>
      </div>
    );
  };

  // AI Processing Loader Component
  const AIProcessingLoader = () => {
    const [progress, setProgress] = useState(0);
    
    useEffect(() => {
      if (isProcessing) {
        const interval = setInterval(() => {
          setProgress(prev => {
            if (prev >= 100) {
              clearInterval(interval);
              return 100;
            }
            return prev + 10;
          });
        }, 300);
        
        return () => clearInterval(interval);
      } else {
        setProgress(0);
      }
    }, [isProcessing]);
    
    if (!isProcessing) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✨</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Analyzing your preferences</h3>
            <p className="text-gray-600 mb-6">Our AI is finding the perfect destinations for you</p>
            
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div 
                className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            
            <p className="text-sm text-gray-500">{progress}% complete</p>
          </div>
        </div>
      </div>
    );
  };

  // Recommendation Results Component
  const RecommendationResults = () => {
    const startingPointLabel = startingPointOptions.find(
      point => point.id === preferences.startingPoint
    )?.label || preferences.startingPoint;
    
    return (
      <div className="bg-white rounded-xl p-6 shadow-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">✨</span>
          </div>
          <h2 className="text-2xl font-semibold mb-2">Your Personalized Recommendations</h2>
          <p className="text-gray-600">
            Starting from {startingPointLabel}, we found {recommendations.length} perfect destinations
          </p>
        </div>
        
        <div className="space-y-6">
          {recommendations.map((rec) => (
            <div key={rec.id} className="border border-gray-200 rounded-xl overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img 
                    src={rec.image || `https://picsum.photos/seed/${rec.destination}-${rec.state}-india/600/400`}
                    alt={rec.destination} 
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="md:w-2/3 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold">{rec.destination}, {rec.state}</h3>
                      <div className="flex items-center mt-1">
                        <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          {rec.confidenceScore}% Match
                        </span>
                      </div>
                    </div>
                    <button 
                      className="text-gray-400 hover:text-red-500 transition-colors"
                      onClick={() => handleSaveToWishlist(rec.id, true)}
                    >
                      <span className="text-xl">❤️</span>
                    </button>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{rec.aiExplanation}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Estimated Cost</h4>
                      <p className="font-semibold">₹{rec.totalEstimate.toLocaleString('en-IN')}</p>
                      <p className="text-xs text-gray-500">
                        (₹{rec.costPerDay.toLocaleString('en-IN')}/day + ₹{rec.travelCostFromStart?.toLocaleString('en-IN') || 'N/A'} travel)
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Travel Time</h4>
                      <p className="font-semibold">{rec.travelTimeFromStart || 'Varies'}</p>
                      <p className="text-xs text-gray-500">From {startingPointLabel}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Best Time</h4>
                      <p className="font-semibold">{rec.bestMonths}</p>
                      <p className="text-xs text-gray-500">{rec.weather.condition} ({rec.weather.temperature})</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Highlights</h4>
                    <div className="flex flex-wrap gap-2">
                      {rec.highlights.slice(0, 4).map((highlight, i) => (
                        <span key={i} className="bg-gray-100 text-gray-800 text-xs px-2.5 py-0.5 rounded">
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Matches your preferences for:</h4>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {rec.matchingStyles.map((style, i) => (
                          <span key={i} className="bg-orange-100 text-orange-800 text-xs px-2.5 py-0.5 rounded">
                            {style}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 flex justify-center">
          <button 
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-6 rounded-lg transition-colors"
            onClick={handleRefineSearch}
          >
            Refine Search
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white pt-20 mb-20">
      {/* Header */}
      <div className="border-b border-orange-200">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✨</span>
            </div>
            <h1 className="font-bold text-3xl lg:text-4xl text-orange-800 mb-4">
              AI Destination Recommender
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Let our AI analyze your preferences and recommend the perfect destinations for your next adventure in India
            </p>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
        {!showResults ? (
          <>
            {/* Progress Steps */}
<div className="mb-8">
  {/* Mobile Stepper (Vertical) */}
  <div className="md:hidden">
    <div className="flex flex-col space-y-4 mb-6">
      {steps.slice(0, 5).map((step) => (
        <div key={step.id} className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold flex-shrink-0 ${
            currentStep >= step.id
              ? 'bg-orange-500 text-white'
              : 'bg-gray-200 text-gray-600'
          }`}>
            {currentStep > step.id ? '✓' : step.icon}
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-900">
              Step {step.id}: {step.title}
            </p>
            <p className="text-xs text-gray-600">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* Desktop Stepper (Horizontal) */}
  <div className="hidden md:block">
    <div className="flex items-center justify-between mb-4">
      {steps.slice(0, 5).map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
            currentStep >= step.id
              ? 'bg-orange-500 text-white'
              : 'bg-gray-200 text-gray-600'
          }`}>
            {currentStep > step.id ? '✓' : step.icon}
          </div>
          {index < 4 && (
            <div className={`w-12 lg:w-20 h-1 mx-2 ${
              currentStep > step.id ? 'bg-orange-500' : 'bg-gray-200'
            }`} />
          )}
        </div>
      ))}
    </div>
  </div>
  
  {/* Progress Bar - Show on both mobile and desktop */}
  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
    <div 
      className="bg-orange-500 h-2 rounded-full transition-all duration-300"
      style={{ width: `${getStepProgress()}%` }}
    />
  </div>

  <div className="text-center">
    <h2 className="font-semibold text-xl text-gray-900 mb-1">
      Step {currentStep}: {steps[currentStep - 1]?.title}
    </h2>
    <p className="text-gray-600">
      {steps[currentStep - 1]?.description}
    </p>
  </div>
</div>

            {/* Step Content */}
            <div className="max-w-2xl mx-auto">
              {currentStep === 1 && <StartingPointSelector />}
              {currentStep === 2 && <BudgetSelector />}
              {currentStep === 3 && <DurationSelector />}
              {currentStep === 4 && <TravelStyleSelector />}
              {currentStep === 5 && <SeasonSelector />}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <button
                  className={`py-2 px-4 rounded-lg border border-gray-300 transition-colors ${
                    currentStep === 1 
                      ? 'text-gray-400 cursor-not-allowed bg-gray-100' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={handlePrevStep}
                  disabled={currentStep === 1}
                >
                  ← Previous
                </button>

                <button
                  className={`py-2 px-6 rounded-lg transition-colors ${
                    canProceed()
                      ? 'bg-orange-500 text-white hover:bg-orange-600'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  onClick={handleNextStep}
                  disabled={!canProceed()}
                >
                  {currentStep === 5 ? 'Get Recommendations →' : 'Next →'}
                </button>
              </div>
            </div>

            {/* Conversation History */}
            {conversationHistory.length > 0 && (
              <div className="max-w-2xl mx-auto mt-12">
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="font-semibold text-lg text-gray-900 mb-4">
                    Previous Searches
                  </h3>
                  <div className="space-y-3">
                    {conversationHistory.slice(-3).map((entry) => (
                      <div key={entry.id} className="p-3 bg-orange-50 rounded-lg border border-orange-100">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-orange-700">
                            {entry.timestamp.toLocaleDateString()}
                          </span>
                          <span className="text-sm text-orange-600">
                            {entry.results.length} recommendations
                          </span>
                        </div>
                        <p className="text-sm text-gray-700">
                          From: {entry.preferences.startingPoint} • 
                          Budget: ₹{entry.preferences.budget.min.toLocaleString('en-IN')} - ₹{entry.preferences.budget.max.toLocaleString('en-IN')} • 
                          Duration: {entry.preferences.duration} days
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <RecommendationResults />
        )}
      </div>
      
      {/* AI Processing Loader */}
      <AIProcessingLoader />
    </div>
  );
};

export default AIDestinationRecommender;