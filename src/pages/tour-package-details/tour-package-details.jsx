import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function TourPackage() {
  const [groupSize, setGroupSize] = useState(2);
  const location = useLocation();
  const { tour } = location.state || {};

  // Default tour data if none is passed
  const defaultTour = {
    id: 4,
    title: "Royal Rajasthan Heritage Tour",
    type: "Cultural",
    days: "8 days",
    duration: 8,
    places: "5 places",
    transport: "AC Bus",
    discount: "18% OFF",
    price: 42000,
    image: "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/09/12/ff/48.jpg",
    location: "Rajasthan",
    description: "Experience the royal heritage of Rajasthan with visits to majestic forts, palaces, and vibrant markets.",
    highlights: [
      "Visit the iconic Taj Mahal at sunrise",
      "Experience royal heritage of Udaipur",
      "Explore Amber Fort in Jaipur",
      "Traditional Rajasthani performances",
      "Shopping in vibrant bazaars",
      "Authentic Rajasthani cuisine"
    ]
  };

  const selectedTour = tour || defaultTour;

  // Day-by-day plan (costs are per person)
  const getDaysPlan = () => {
    // Different itineraries based on tour type/location
    if (selectedTour.title.includes("Goa")) {
      return [
        {
          day: 1,
          title: "Arrival in Goa",
          desc: "Arrive at Goa airport, transfer to hotel, evening beach relaxation.",
          costPerPerson: 3000,
          icon: "🏖️",
        },
        {
          day: 2,
          title: "North Goa Beaches",
          desc: "Visit Calangute, Baga, and Anjuna beaches, water sports activities.",
          costPerPerson: 5000,
          icon: "🌊",
        },
        {
          day: 3,
          title: "South Goa & Portuguese Heritage",
          desc: "Explore Old Goa churches, Basilica of Bom Jesus, and Palolem beach.",
          costPerPerson: 4000,
          icon: "⛪",
        },
        {
          day: 4,
          title: "Spice Plantation & Departure",
          desc: "Visit spice plantation, lunch, then transfer to airport for departure.",
          costPerPerson: 3500,
          icon: "🌿",
        },
      ];
    } else if (selectedTour.title.includes("Andaman")) {
      return [
        {
          day: 1,
          title: "Arrival in Port Blair",
          desc: "Arrive at Port Blair, transfer to hotel, evening light and sound show at Cellular Jail.",
          costPerPerson: 4000,
          icon: "✈️",
        },
        {
          day: 2,
          title: "Havelock Island",
          desc: "Ferry to Havelock Island, visit Radhanagar Beach (rated among Asia's best).",
          costPerPerson: 6000,
          icon: "🏝️",
        },
        {
          day: 3,
          title: "Elephant Beach",
          desc: "Snorkeling and water activities at Elephant Beach.",
          costPerPerson: 5500,
          icon: "🤿",
        },
        {
          day: 4,
          title: "Neil Island",
          desc: "Visit Neil Island, natural rock formations, and Bharatpur Beach.",
          costPerPerson: 5000,
          icon: "🏞️",
        },
        {
          day: 5,
          title: "Port Blair Sightseeing",
          desc: "Visit Anthropological Museum, Corbyn's Cove Beach, and local markets.",
          costPerPerson: 4500,
          icon: "🏛️",
        },
        {
          day: 6,
          title: "Departure",
          desc: "Transfer to airport for departure with wonderful memories.",
          costPerPerson: 2000,
          icon: "👋",
        },
      ];
    } else {
      // Default Rajasthan tour
      return [
        {
          day: 1,
          title: "Arrival in Delhi",
          desc: "Arrive at Delhi, transfer to hotel, evening welcome dinner and briefing.",
          costPerPerson: 4000,
          icon: "🏨",
        },
        {
          day: 2,
          title: "Delhi Sightseeing",
          desc: "Full day city tour: Red Fort, Jama Masjid, Humayun's Tomb and Qutub Minar.",
          costPerPerson: 6000,
          icon: "🏛️",
        },
        {
          day: 3,
          title: "Agra - Taj Mahal",
          desc: "Drive to Agra, sunrise visit to the Taj Mahal, Agra Fort and local markets.",
          costPerPerson: 7500,
          icon: "🕌",
        },
        {
          day: 4,
          title: "Fatehpur Sikri & Jaipur",
          desc: "En route visit to Fatehpur Sikri, continue to Jaipur, evening at leisure.",
          costPerPerson: 6000,
          icon: "🛕",
        },
        {
          day: 5,
          title: "Jaipur - Amber Fort",
          desc: "Visit Amber Fort, City Palace, Jantar Mantar and local bazaars.",
          costPerPerson: 7500,
          icon: "🏰",
        },
        {
          day: 6,
          title: "Drive to Pushkar",
          desc: "Scenic drive to Pushkar, evening visit to the ghats and local markets.",
          costPerPerson: 6000,
          icon: "🛕",
        },
        {
          day: 7,
          title: "Drive to Udaipur",
          desc: "Transfer to Udaipur with picturesque stops, evening lakefront stroll.",
          costPerPerson: 5000,
          icon: "🚗",
        },
        {
          day: 8,
          title: "Udaipur - City Tour & Boat Ride",
          desc: "Explore City Palace, Jag Mandir and boat ride on Lake Pichola.",
          costPerPerson: 4500,
          icon: "⛵",
        },
      ];
    }
  };

  const days = getDaysPlan();
  const totalPerPerson = days.reduce((s, d) => s + d.costPerPerson, 0);
  const totalForGroup = totalPerPerson * groupSize;

  const formatINR = (n) => "₹" + n.toLocaleString("en-IN");

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center py-6 mt-20">
      <div className="max-w-6xl w-full grid md:grid-cols-3 gap-6">
        {/* Left Section - Tour Details */}
        <div className="md:col-span-2 space-y-6">
          {/* Image and Title */}
          <div className="overflow-hidden shadow-lg bg-white rounded-2xl">
            <img
              src={selectedTour.image}
              alt={selectedTour.title}
              className="w-full h-96 object-cover"
            />
            <div className="p-6">
              <h1 className="text-2xl font-bold mb-2">
                {selectedTour.title}
              </h1>
              <p className="text-gray-600">{selectedTour.location}</p>
              <p className="text-sm text-gray-500 mt-2">
                {selectedTour.days} | Group size: 2-15 People | Difficulty: Easy
              </p>
              <p className="text-orange-600 font-semibold mt-4">
                ⭐ 4.8 (247 reviews)
              </p>
              <p className="mt-3 text-gray-700">{selectedTour.description}</p>
            </div>
          </div>

          {/* Package Highlights */}
          <div className="bg-white shadow-md rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4">Package Highlights</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700">
              {selectedTour.highlights.map((highlight, index) => (
                <li key={index}>✔ {highlight}</li>
              ))}
            </ul>
          </div>

          {/* Day-by-day Plan */}
          <div className="bg-white shadow-md rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Day-by-day Itinerary</h2>
              <div className="text-sm text-gray-500">
                Total per person: <span className="font-medium">{formatINR(totalPerPerson)}</span>
              </div>
            </div>

            <div className="space-y-3">
              {days.map((d) => (
                <div key={d.day} className="flex items-start gap-4 p-3 rounded-lg border border-gray-100">
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-gray-50 rounded-full text-xl">
                    {d.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-semibold">
                        Day {d.day}: {d.title}
                      </h3>
                      <div className="text-sm text-gray-600">
                        <div>{formatINR(d.costPerPerson * groupSize)} total</div>
                        <div className="text-xs text-gray-400">({formatINR(d.costPerPerson)} per person)</div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{d.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* What's Included & Not Included */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white shadow-md rounded-2xl p-6">
              <h2 className="text-lg font-semibold mb-4">What's Included</h2>
              <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
                <li>All nights accommodation in 4-star hotels</li>
                <li>Daily breakfast and dinner</li>
                <li>All transfers and sightseeing by AC vehicle</li>
                <li>Professional English-speaking guide</li>
                <li>All monument entry fees</li>
                <li>All applicable taxes and charges</li>
                {selectedTour.title.includes("Goa") && <li>Beach equipment and water sports</li>}
                {selectedTour.title.includes("Andaman") && <li>Ferry transfers between islands</li>}
              </ul>
            </div>

            <div className="bg-white shadow-md rounded-2xl p-6">
              <h2 className="text-lg font-semibold mb-4">What's Not Included</h2>
              <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
                <li>International and domestic airfare</li>
                <li>Travel insurance coverage</li>
                <li>Personal expenses and shopping</li>
                <li>Lunch during the tour</li>
                <li>Tips and gratuities</li>
                <li>Emergency medical expenses</li>
                {selectedTour.title.includes("Goa") && <li>Alcohol and nightclub entries</li>}
                {selectedTour.title.includes("Andaman") && <li>Scuba diving and special activities</li>}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Section - Booking Form */}
        <div className="bg-white shadow-lg rounded-2xl sticky top-6 h-fit p-6 space-y-4">
          <h2 className="text-xl font-bold">Book This Package</h2>
          <div className="bg-gray-100 p-3 rounded-lg">
            <p className="text-sm text-gray-600">
              Package Cost × {groupSize} {groupSize > 1 ? "people" : "person"}
            </p>
            <p className="text-lg font-semibold">{formatINR(totalForGroup)}</p>
            <p className="text-xs text-gray-500 mt-1">({formatINR(totalPerPerson)} per person)</p>
          </div>

          <form
            className="space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              alert(`Inquiry sent for ${groupSize} people — total ${formatINR(totalForGroup)}`);
            }}
          >
            <div>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full border rounded-md p-2 text-sm"
                required
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full border rounded-md p-2 text-sm"
                required
              />
            </div>
            <div>
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full border rounded-md p-2 text-sm"
                required
              />
            </div>


            <div>
              <input
                type="text"
               value= {selectedTour.title}
                className="w-full border rounded-md p-2 text-sm"
                required
                disabled
              />
            </div>
           <div>
              <input
                type="number"
               placeholder= "7"
               min={1}
               max={30}
                className="w-full border rounded-md p-2 text-sm"
                required
                contentEditable
              />
            </div>
            <div>
              <input
                type="date"
                className="w-full border rounded-md p-2 text-sm"
                required
              />
            </div>
            <div>
              <select
                value={groupSize}
                onChange={(e) => setGroupSize(Number(e.target.value))}
                className="w-full border rounded-md p-2 text-sm"
              >
                {[...Array(15).keys()].map((n) => (
                  <option key={n + 1} value={n + 1}>
                    {n + 1} People
                  </option>
                ))}
              </select>
            </div>
            <div>
              <textarea
                placeholder="Special requirements..."
                className="w-full border rounded-md p-2 text-sm"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-md"
            >
              Send Booking Inquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}