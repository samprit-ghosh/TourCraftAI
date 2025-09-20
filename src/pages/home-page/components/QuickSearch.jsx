import { useState } from "react";
// import Button from "../../../components/ui/Button";

const QuickSearch = () => {
  const [formData, setFormData] = useState({
    startLocation: "",
    destination: "",
    days: 3,
    budget: 10000,
    travelStyle: "relaxed",
    interests: []
  });

  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const travelStyles = [
    { id: "relaxed", name: "Relaxed", icon: "🌴" },
    { id: "moderate", name: "Moderate", icon: "🚶" },
    { id: "fast-paced", name: "Fast-paced", icon: "⚡" }
  ];

  const interestsList = [
    { name: "Adventure", icon: "🧗" },
    { name: "Culture", icon: "🎭" },
    { name: "Food", icon: "🍜" },
    { name: "Nature", icon: "🌿" },
    { name: "Shopping", icon: "🛍️" },
    { name: "History", icon: "🏛️" },
    { name: "Photography", icon: "📸" },
    { name: "Wildlife", icon: "🐘" },
    { name: "Beaches", icon: "🏖️" },
    { name: "Nightlife", icon: "🌃" }
  ];
  const [activeTab, setActiveTab] = useState("form");
  const [selectedField, setSelectedField] = useState(null);

  const timeIcons = {
    Morning: "🌅",
    Afternoon: "☀️",
    Evening: "🌇",
    Night: "🌙"
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // keep numeric ranges as numbers
    const parsedValue =
      name === "days" || name === "budget" ? Number(value) : value;
    setFormData((prev) => ({
      ...prev,
      [name]: parsedValue
    }));
  };

  const handleInterestToggle = (interest) => {
    setFormData((prev) => {
      const interests = [...prev.interests];
      if (interests.includes(interest)) {
        return { ...prev, interests: interests.filter((i) => i !== interest) };
      } else {
        return { ...prev, interests: [...interests, interest] };
      }
    });
  };
  const handleBlur = () => {
    setSelectedField(null);
  };

  const generateItinerary = async () => {
    setLoading(true);
    setError("");

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

      const prompt = `
        Create a detailed travel itinerary with the following details:
        - Start location: ${formData.startLocation}
        - Destination: ${formData.destination}
        - Duration: ${formData.days} days
        - Budget: ₹${formData.budget.toLocaleString()}
        - Travel style: ${formData.travelStyle}
        - Interests: ${formData.interests.join(", ") || "General"}
        
        Please provide a day-by-day plan with:
        1. Activities for each day with time suggestions
        2. Estimated costs for each major activity
        3. Transportation options between locations
        4. Food and accommodation suggestions within the budget
        5. Any important tips or recommendations
        
        Format the response as a JSON object with this structure:
        {
          "summary": "Brief overview of the trip",
          "totalEstimatedCost": "Overall cost estimate",
          "days": [
            {
              "day": 1,
              "title": "Day 1 title",
              "activities": [
                {
                  "time": "Morning",
                  "description": "Activity description",
                  "cost": "Estimated cost"
                }
              ],
              "accommodation": "Suggestion",
              "food": "Suggestions",
              "transportation": "Options"
            }
          ],
          "tips": ["Tip 1", "Tip 2"]
        }
      `;

      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-goog-api-key": apiKey
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt
                  }
                ]
              }
            ]
          })
        }
      );

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();

      // Extract the text from the response
      const responseText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

      // Try to parse the JSON from the response
      try {
        // The response might include markdown formatting, so we need to extract the JSON
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsedItinerary = JSON.parse(jsonMatch[0]);
          setItinerary(parsedItinerary);
        } else {
          // If we can't parse JSON, just display the text response
          setItinerary({
            summary: "AI-generated itinerary",
            days: [],
            rawResponse: responseText
          });
        }

        // Automatically open results tab once itinerary is ready
        setActiveTab("result");
      } catch (parseError) {
        console.error("Error parsing JSON response:", parseError);
        setItinerary({
          summary: "AI-generated itinerary",
          days: [],
          rawResponse: responseText
        });
        setActiveTab("result");
      }
    } catch (err) {
      console.error("Error generating itinerary:", err);
      setError("Failed to generate itinerary. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-orange-50 rounded-2xl p-6 mb-8 border border-orange-100 relative">
      {/* Full-screen attractive loader overlay (shown while loading) */}
      {loading && (
        <div
          aria-busy="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-black/30 to-transparent backdrop-blur-sm"
        >
          <div className="bg-white/90 dark:bg-gray-900/80 rounded-3xl p-8 w-[92%] max-w-3xl shadow-2xl border border-orange-100">
            <div className="flex items-center space-x-6">
              {/* Animated compass / globe */}
              <div className="w-28 h-28 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center shadow-lg animate-[spin_4s_linear_infinite]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-16 h-16 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.364-6.364-1.414 1.414M7.05 16.95l-1.414 1.414M16.95 16.95l1.414 1.414M7.05 7.05L5.636 5.636"
                  />
                  <circle cx="12" cy="12" r="3" className="opacity-60" />
                </svg>
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800 mb-1">
                  TourCraft AI is crafting your personalized itinerary
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  This may take a few moments. Optimizing routes, costs and
                  activities for the best experience...
                </p>

                {/* animated dots + skeleton preview */}
                <div className="flex items-center space-x-4">
                  <div className="flex space-x-2">
                    <span className="w-3 h-3 bg-orange-500 rounded-full animate-bounce animation-delay-0"></span>
                    <span className="w-3 h-3 bg-orange-500 rounded-full animate-bounce animation-delay-200"></span>
                    <span className="w-3 h-3 bg-orange-500 rounded-full animate-bounce animation-delay-400"></span>
                  </div>

                  <div className="flex-1">
                    <div className="h-3 bg-gray-200 rounded-full w-3/4 mb-2 animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded-full w-1/2 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>

            <style>{`
              .animation-delay-0 { animation-delay: 0ms; }
              .animation-delay-200 { animation-delay: 150ms; }
              .animation-delay-400 { animation-delay: 300ms; }
              @keyframes bounce {
                0%, 100% { transform: translateY(0); opacity: 0.9; }
                50% { transform: translateY(-8px); opacity: 1; }
              }
              .animate-bounce { animation: bounce 800ms infinite; }
              .animate-[spin_4s_linear_infinite] { animation: spin 4s linear infinite; }
              @keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
            `}</style>
          </div>
        </div>
      )}

      <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
        ✨ TourCraft AI
      </h2>

      {/* Tab Navigation */}
      <div className="flex border-b border-orange-200 mb-6">
        <button
          className={`py-3 px-6 font-medium text-sm rounded-t-lg transition-all ${
            activeTab === "form"
              ? "bg-white border-t border-l border-r border-orange-200 text-orange-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("form")}
        >
          🗺️ Plan Your Trip
        </button>
        <button
          className={`py-3 px-6 font-medium text-sm rounded-t-lg transition-all ${
            activeTab === "result"
              ? "bg-white border-t border-l border-r border-orange-200 text-orange-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => itinerary && setActiveTab("result")}
          disabled={!itinerary}
        >
          📋 Your Itinerary
        </button>
      </div>

      {/* Form Section */}
      {activeTab === "form" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left Column - Form */}
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-xl shadow-sm border border-orange-100">
              <div className="flex items-center mb-3">
                <div className="bg-orange-100 p-2 rounded-lg mr-3">
                  <span className="text-orange-600 text-xl">📍</span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Starting Location
                  </label>
                  <input
                    type="text"
                    name="startLocation"
                    value={formData.startLocation}
                    onChange={handleInputChange}
                    placeholder="e.g., Delhi"
                    className="w-full mt-1 px-4 py-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border border-orange-100">
              <div className="flex items-center mb-3">
                <div className="bg-orange-100 p-2 rounded-lg mr-3">
                  <span className="text-orange-600 text-xl">🏁</span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Destination
                  </label>
                  <input
                    type="text"
                    name="destination"
                    value={formData.destination}
                    onChange={handleInputChange}
                    placeholder="e.g., Goa"
                    className="w-full mt-1 px-4 py-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border border-orange-100">
              <div className="flex items-center mb-3">
                <div className="bg-orange-100 p-2 rounded-lg mr-3">
                  <span className="text-orange-600 text-xl">📅</span>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Trip Duration: {formData.days} day
                    {formData.days > 1 ? "s" : ""}
                  </label>
                  <input
                    type="range"
                    name="days"
                    min="1"
                    max="30"
                    value={formData.days}
                    onChange={handleInputChange}
                    className="w-full h-2 bg-orange-100 rounded-lg appearance-none cursor-pointer range-lg [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1 day</span>
                    <span>30 days</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border border-orange-100">
              <div className="flex items-center mb-3">
                <div className="bg-orange-100 p-2 rounded-lg mr-3">
                  <span className="text-orange-600 text-xl">💰</span>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Budget: ₹{formData.budget.toLocaleString()}
                  </label>
                  <input
                    type="range"
                    name="budget"
                    min="3000"
                    max="100000"
                    step="5000"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full h-2 bg-orange-100 rounded-lg appearance-none cursor-pointer range-lg [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>₹3,000</span>
                    <span>₹1,00,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Travel Style & Interests */}
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-xl shadow-sm border border-orange-100">
              <div className="flex items-center mb-4">
                <div className="bg-orange-100 p-2 rounded-lg mr-3">
                  <span className="text-orange-600 text-xl">🚶</span>
                </div>
                <label className="block text-sm font-medium text-gray-700">
                  Travel Style
                </label>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {travelStyles.map((style) => (
                  <button
                    key={style.id}
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, travelStyle: style.id }))
                    }
                    className={`p-3 rounded-xl border transition-all flex flex-col items-center ${
                      formData.travelStyle === style.id
                        ? "bg-orange-50 border-orange-300 text-orange-700 shadow-sm"
                        : "bg-white text-gray-700 border-orange-200 hover:bg-orange-50"
                    }`}
                  >
                    <span className="text-2xl mb-1">{style.icon}</span>
                    <span className="text-sm font-medium">{style.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border border-orange-100">
              <div className="flex items-center mb-4">
                <div className="bg-orange-100 p-2 rounded-lg mr-3">
                  <span className="text-orange-600 text-xl">❤️</span>
                </div>
                <label className="block text-sm font-medium text-gray-700">
                  Interests
                </label>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {interestsList.map((interest) => (
                  <button
                    key={interest.name}
                    type="button"
                    onClick={() => handleInterestToggle(interest.name)}
                    className={`p-3 rounded-xl border transition-all flex flex-col items-center ${
                      formData.interests.includes(interest.name)
                        ? "bg-orange-50 border-orange-300 text-orange-700 shadow-sm"
                        : "bg-white text-gray-700 border-orange-200 hover:bg-orange-50"
                    }`}
                  >
                    <span className="text-xl mb-1">{interest.icon}</span>
                    <span className="text-xs font-medium">{interest.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={generateItinerary}
                disabled={
                  loading || !formData.startLocation || !formData.destination
                }
                className={`w-full py-4 rounded-xl font-medium text-white transition-all flex items-center justify-center ${
                  loading || !formData.startLocation || !formData.destination
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl"
                }`}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Generating Your Plan...
                  </>
                ) : (
                  <>
                    <span className="mr-2">✨</span> Generate AI Itinerary
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Results Section */}
      {activeTab === "result" && (
        <div className="border-t border-orange-200 pt-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-6 flex items-center">
              <span className="text-red-600 text-xl mr-3">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
            🗺️ Your Personalized Itinerary
          </h3>

          {itinerary && (
            <>
              {itinerary.rawResponse ? (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-orange-100">
                  <p className="whitespace-pre-wrap text-gray-700">
                    {itinerary.rawResponse}
                  </p>
                </div>
              ) : (
         <>
  {/* Trip Summary */}
  <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 sm:p-6 rounded-2xl mb-6 sm:mb-8 border border-orange-200">
    <div className="flex flex-col xs:flex-row items-start xs:items-center">
      <div className="bg-orange-100 p-2 sm:p-3 rounded-xl mb-3 xs:mb-0 xs:mr-4">
        <span className="text-orange-600 text-2xl sm:text-3xl">📌</span>
      </div>
<div className="min-w-0">
  <h4 className="font-semibold text-base xs:text-lg sm:text-xl mb-1 sm:mb-2 text-orange-800 break-words">
    Trip Summary
  </h4>

  <p className="text-gray-700 mb-2 sm:mb-3 text-sm xs:text-base sm:text-lg break-words leading-relaxed">
    {itinerary.summary}
  </p>

  <div className="flex flex-col xs:flex-row xs:items-center bg-white p-2 sm:p-3 rounded-lg border border-orange-200 text-sm xs:text-base sm:text-lg gap-1 xs:gap-2">
    <span className="text-orange-600">💰</span>
    <span className="font-medium text-orange-700 break-words min-w-0">
      Total Estimated Cost: {itinerary.totalEstimatedCost}
    </span>
  </div>
</div>

    </div>
  </div>

  {/* Days */}
  <div className="space-y-6">
    {itinerary.days.map((day) => (
      <div
        key={day.day}
        className="bg-white rounded-2xl shadow-sm border border-orange-100 overflow-hidden"
      >
        {/* Day Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-3 sm:p-4 text-white">
          <h4 className="font-bold text-lg sm:text-xl flex items-center break-words">
            <span className="mr-2">📅</span> {day.title}
          </h4>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
            {/* Activities */}
            <div className="lg:col-span-2 min-w-0">
              <h5 className="font-semibold mb-4 flex items-center text-gray-700 text-base sm:text-lg">
                <span className="mr-2">⏰</span> Daily Activities
              </h5>
              <div className="space-y-4">
                {day.activities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex flex-col xs:flex-row xs:items-start p-3 sm:p-4 bg-orange-50 rounded-lg border border-orange-100"
                  >
                    <div className="bg-white p-2 rounded-lg mb-2 xs:mb-0 xs:mr-4 shadow-sm">
                      <span className="text-xl sm:text-2xl">
                        {timeIcons[activity.time] || "⏱️"}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0 mb-2 xs:mb-0">
                      <div className="font-medium text-gray-800 text-base sm:text-lg truncate">
                        {activity.time}
                      </div>
                      <p className="text-gray-600 mt-1 text-sm sm:text-base break-words">
                        {activity.description}
                      </p>
                    </div>
                    <div className="bg-orange-100 text-orange-700 px-3 py-1 rounded-lg text-sm sm:text-base font-medium text-center min-w-[70px] sm:min-w-[90px]">
                      {activity.cost}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Side Info */}
            <div className="space-y-4 min-w-0">
              <div className="bg-orange-50 p-3 sm:p-4 rounded-xl border border-orange-200">
                <h5 className="font-semibold mb-2 flex items-center text-orange-700 text-base sm:text-lg">
                  <span className="mr-2">🏨</span> Accommodation
                </h5>
                <p className="text-sm sm:text-base text-orange-600 break-words">
                  {day.accommodation}
                </p>
              </div>

              <div className="bg-orange-50 p-3 sm:p-4 rounded-xl border border-orange-200">
                <h5 className="font-semibold mb-2 flex items-center text-orange-700 text-base sm:text-lg">
                  <span className="mr-2">🍽️</span> Food
                </h5>
                <p className="text-sm sm:text-base text-orange-600 break-words">
                  {day.food}
                </p>
              </div>

              <div className="bg-orange-50 p-3 sm:p-4 rounded-xl border border-orange-200">
                <h5 className="font-semibold mb-2 flex items-center text-orange-700 text-base sm:text-lg">
                  <span className="mr-2">🚗</span> Transportation
                </h5>
                <p className="text-sm sm:text-base text-orange-600 break-words">
                  {day.transportation}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>

  {/* Tips */}
  {itinerary.tips && itinerary.tips.length > 0 && (
    <div className="mt-6 sm:mt-8 bg-orange-50 p-4 sm:p-6 rounded-2xl border border-orange-200">
      <h4 className="font-semibold mb-4 flex items-center text-orange-800 text-base sm:text-lg">
        <span className="mr-2">💡</span> Travel Tips
      </h4>
      <ul className="space-y-2">
        {itinerary.tips.map((tip, index) => (
          <li key={index} className="flex items-start text-sm sm:text-base">
            <span className="text-orange-600 mr-2">•</span>
            <span className="text-orange-700 break-words">{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  )}

  {/* Back Button */}
  <div className="mt-6 sm:mt-8 flex justify-center">
    <button
      onClick={() => setActiveTab("form")}
      className="px-5 sm:px-6 py-2.5 sm:py-3 bg-orange-100 text-orange-700 rounded-lg font-medium hover:bg-orange-200 transition text-base sm:text-lg"
    >
      ← Back to Planner
    </button>
  </div>
</>

              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default QuickSearch;
