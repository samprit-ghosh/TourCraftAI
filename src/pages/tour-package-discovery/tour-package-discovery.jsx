import { useMemo, useState } from "react";
import Button from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";

const recommendations = [
    {
        id: 1,
        title: "Coorg Coffee Plantation Tour",
        type: "Nature",
        location: "Karnataka",
        days: "4 days",
        duration: 4,
        price: 22000,
        match: "92%",
        rating: 4.5,
        image: "https://www.trawell.in/blog/wp-content/uploads/2017/08/Coorg.jpg",
        places: "3 places",
        transport: "Car",
        description: "Experience the lush coffee plantations and scenic beauty of Coorg, known as the Scotland of India.",
        highlights: [
            "Coffee plantation tour and tasting",
            "Visit Abbey Falls and Raja's Seat",
            "Trekking in the Western Ghats",
            "Spice plantation visit",
            "Local Kodava culture experience",
            "Wildlife spotting"
        ]
    },
    {
        id: 2,
        title: "Andaman Island Paradise",
        type: "Beach",
        location: "Andaman",
        days: "6 days",
        duration: 6,
        price: 48000,
        match: "88%",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1715940093974-8836926f3f41?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        places: "4 places",
        transport: "Flight & Ferry",
        description: "Explore the pristine beaches, coral reefs, and unique history of the Andaman Islands.",
        highlights: [
            "Snorkeling at Elephant Beach",
            "Visit Cellular Jail and light show",
            "Radhanagar Beach (Asia's best beach)",
            "Scuba diving experience",
            "Limestone caves at Baratang",
            "Island hopping"
        ]
    },
    {
        id: 3,
        title: "Meghalaya Living Root Bridges",
        type: "Adventure",
        location: "Meghalaya",
        days: "7 days",
        duration: 7,
        price: 35000,
        match: "85%",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1753287268418-290993de07e7?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        places: "5 places",
        transport: "Car",
        description: "Discover the natural wonders and unique living root bridges of Meghalaya, the abode of clouds.",
        highlights: [
            "Visit double-decker living root bridge",
            "Explore Cherrapunji and Mawsynram",
            "Swimming in natural pools and waterfalls",
            "Caving adventures",
            "Traditional Khasi culture experience",
            "Scenic viewpoints and trekking"
        ]
    },
];

const tours = [
    {
        id: 4,
        title: "Royal Rajasthan Heritage Tour",
        type: "Cultural",
        location: "Rajasthan",
        days: "8 days",
        duration: 8,
        places: "5 places",
        transport: "AC Bus",
        discount: "18% OFF",
        price: 42000,
        image: "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/09/12/ff/48.jpg",
        description: "Experience the royal heritage of Rajasthan with visits to majestic forts, palaces, and vibrant markets.",
        highlights: [
            "Visit the iconic Taj Mahal at sunrise",
            "Experience royal heritage of Udaipur",
            "Explore Amber Fort in Jaipur",
            "Traditional Rajasthani performances",
            "Shopping in vibrant bazaars",
            "Authentic Rajasthani cuisine"
        ]
    },
    {
        id: 5,
        title: "Kerala Backwaters & Hill Stations",
        type: "Nature",
        location: "Kerala",
        days: "6 days",
        duration: 6,
        places: "4 places",
        transport: "Car",
        price: 30000,
        image: "https://plus.unsplash.com/premium_photo-1694475205503-d6c6a71f03bc?q=80&w=1201&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "Explore the serene backwaters, lush hill stations, and rich cultural heritage of God's Own Country.",
        highlights: [
            "Houseboat stay in Alleppey backwaters",
            "Tea plantation tour in Munnar",
            "Kathakali dance performance",
            "Spice garden visit",
            "Beach relaxation in Kovalam",
            "Ayurvedic wellness experience"
        ]
    },
    {
        id: 6,
        title: "Goa Beach Paradise",
        type: "Beach",
        location: "Goa",
        days: "4 days",
        duration: 4,
        places: "3 places",
        transport: "Flight",
        discount: "18% OFF",
        price: 18000,
        image: "https://plus.unsplash.com/premium_photo-1753044646160-22fb1494064f?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "Enjoy the sun, sand, and vibrant nightlife of India's most popular beach destination.",
        highlights: [
            "Relax on famous beaches like Calangute and Baga",
            "Explore Portuguese heritage in Old Goa",
            "Dolphin watching cruise",
            "Visit spice plantations",
            "Enjoy vibrant nightlife and seafood",
            "Water sports activities"
        ]
    },
];

function IconSearch() {
    return (
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
        </svg>
    );
}

function IconGrid() {
    return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M3 3h8v8H3zM13 3h8v8h-8zM3 13h8v8H3zM13 13h8v8h-8z" />
        </svg>
    );
}

function IconList() {
    return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
        </svg>
    );
}

export default function Packagediscovery() {
    const [query, setQuery] = useState("");
    const [view, setView] = useState("list"); // 'grid' or 'list'
    const [sortBy, setSortBy] = useState("Most Relevant");
    const navigate = useNavigate();

    const handleTourClick = (tour) => {
        navigate('/tour-package-details', { state: { tour } });
    };

    const filteredTours = useMemo(() => {
        let results = tours.filter((t) => {
            const q = query.trim().toLowerCase();
            if (!q) return true;
            return (
                t.title.toLowerCase().includes(q) ||
                (t.type && t.type.toLowerCase().includes(q)) ||
                (t.places && t.places.toLowerCase().includes(q)) ||
                (t.transport && t.transport.toLowerCase().includes(q))
            );
        });

        switch (sortBy) {
            case "Price: Low to High":
                results = [...results].sort((a, b) => a.price - b.price);
                break;
            case "Price: High to Low":
                results = [...results].sort((a, b) => b.price - a.price);
                break;
            case "Duration: Shortest":
                results = [...results].sort((a, b) => a.duration - b.duration);
                break;
            case "Most Relevant":
            default:
                // Keep original order
                break;
        }
        return results;
    }, [query, sortBy]);

    const filteredRecommendations = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return recommendations;
        return recommendations.filter(
            (r) =>
                r.title.toLowerCase().includes(q) ||
                (r.location && r.location.toLowerCase().includes(q))
        );
    }, [query]);

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 mt-20 mb-20">
            <div className="max-w-7xl mx-auto">
                <header className="flex flex-col gap-4 mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold">
                            Discover Tour Packages
                        </h1>

                        <Button
                            size="lg"
                            className="px-6 sm:px-8"
                            iconName="Zap"
                            onClick={() => navigate("/ai-destination-recommender")}
                        >
                            Get AI Recommendations
                        </Button>

                        <p className="text-xs sm:text-sm text-gray-500 sm:ml-4 sm:mt-0 mt-1 text-center sm:text-left">
                            Personalized AI recommendations and curated tour packages
                        </p>
                    </div>


                    <div className="w-full flex flex-col sm:flex-row gap-3 items-stretch">
                        <div className="relative flex-1">
                            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                <IconSearch />
                            </div>
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search destinations, types..."
                                className="pl-10 pr-3 py-2 w-full rounded-lg border bg-white text-sm shadow-sm focus:ring-2 focus:ring-orange-300"
                            />
                        </div>

                        <div className="flex items-center gap-2 self-stretch justify-between sm:justify-start">
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setView("grid")}
                                    className={`p-2 rounded-md ${view === "grid"
                                            ? "bg-orange-500 text-white"
                                            : "bg-white border"
                                        }`}
                                    title="Grid view"
                                >
                                    <IconGrid />
                                </button>
                                <button
                                    onClick={() => setView("list")}
                                    className={`p-2 rounded-md ${view === "list"
                                            ? "bg-orange-500 text-white"
                                            : "bg-white border"
                                        }`}
                                    title="List view"
                                >
                                    <IconList />
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Recommendations */}
                <section className="mb-8">
                    <h2 className="text-lg font-bold mb-3">Recommended for you</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {filteredRecommendations.map((rec) => (
                            <article
                                key={rec.id}
                                className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg transition flex flex-col group cursor-pointer"
                                onClick={() => handleTourClick(rec)}
                            >
                                <div className="relative h-44 md:h-36 lg:h-44 overflow-hidden">
                                    <img
                                        src={rec.image}
                                        alt={rec.title}
                                        loading="lazy"
                                        className="w-full h-full object-cover transform transition duration-500 group-hover:scale-110 group-hover:brightness-90"
                                    />
                                    <div className="absolute top-3 left-3 bg-white/80 text-orange-600 px-2 py-1 rounded-md text-xs font-semibold">
                                        {rec.match} Match
                                    </div>
                                </div>
                                <div className="p-4 flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-semibold text-lg">{rec.title}</h3>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {rec.days} • {rec.location}
                                        </p>
                                    </div>
                                    <div className="mt-3 flex items-center justify-between">
                                        <div>
                                            <div className="text-lg font-bold">₹{rec.price.toLocaleString()}</div>
                                            <div className="text-xs text-gray-500">per person</div>
                                        </div>
                                        <div className="text-sm text-yellow-500 font-semibold">
                                            {rec.rating} ★
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                {/* Tour Packages header */}
                <section>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
                        <div>
                            <h2 className="text-xl font-bold">Tour Packages</h2>
                            <p className="text-xs sm:text-sm text-gray-500">
                                Choose from a variety of curated trips
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <label className="text-sm text-gray-600 hidden sm:block">Sort</label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="rounded-md border px-3 py-2 bg-white text-sm w-full sm:w-auto"
                            >
                                <option>Most Relevant</option>
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                                <option>Duration: Shortest</option>
                            </select>
                        </div>
                    </div>

                    {/* Tours list/grid */}
                    {filteredTours.length === 0 ? (
                        <div className="bg-white p-6 rounded-lg shadow text-center text-gray-500">
                            No packages found. Try a different search term.
                        </div>
                    ) : view === "grid" ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredTours.map((tour) => (
                                <article
                                    key={tour.id}
                                    className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg transition flex flex-col group cursor-pointer"
                                    onClick={() => handleTourClick(tour)}
                                >
                                    <div className="relative h-44 overflow-hidden">
                                        <img
                                            src={tour.image}
                                            alt={tour.title}
                                            loading="lazy"
                                            className="w-full h-full object-cover transform transition duration-500 group-hover:scale-110 group-hover:brightness-90"
                                        />
                                        {tour.discount && (
                                            <div className="absolute top-3 right-3 bg-orange-500 text-white text-xs px-2 py-1 rounded-md">
                                                {tour.discount}
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-4 flex-1 flex flex-col">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="text-lg font-bold">{tour.title}</h3>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    {tour.type} • {tour.days} • {tour.transport}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-lg font-bold">
                                                    ₹{tour.price.toLocaleString()}
                                                </div>
                                                <div className="text-xs text-gray-500">starting</div>
                                            </div>
                                        </div>

                                        <div className="mt-4 flex items-center justify-between">
                                            <button className="bg-orange-500 text-white px-3 py-2 rounded-lg hover:bg-orange-600 text-sm">
                                                View details
                                            </button>
                                            <button className="text-sm text-orange-600 underline">
                                                Share
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredTours.map((tour) => (
                                <article
                                    key={tour.id}
                                    className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition flex flex-col sm:flex-row group cursor-pointer"
                                    onClick={() => handleTourClick(tour)}
                                >
                                    <div className="w-full sm:w-36 md:w-48 h-40 sm:h-28 md:h-32 flex-shrink-0 relative overflow-hidden">
                                        <img
                                            src={tour.image}
                                            alt={tour.title}
                                            loading="lazy"
                                            className="w-full h-full object-cover transform transition duration-500 group-hover:scale-110 group-hover:brightness-90"
                                        />
                                        {tour.discount && (
                                            <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-md">
                                                {tour.discount}
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4 flex-1 flex flex-col">
                                        <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                                            <div className="flex-1">
                                                <h3 className="text-lg font-semibold">{tour.title}</h3>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    {tour.type} • {tour.places} • {tour.days}
                                                </p>
                                            </div>
                                            <div className="text-right w-full sm:w-auto">
                                                <div className="text-lg font-bold">
                                                    ₹{tour.price.toLocaleString()}
                                                </div>
                                                <div className="text-xs text-gray-500">per person</div>
                                            </div>
                                        </div>

                                        <div className="mt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                                            <div className="text-sm text-gray-600">
                                                Transport: {tour.transport}
                                            </div>
                                            <div className="flex items-center gap-2 self-stretch sm:self-auto justify-between sm:justify-start">
                                                <button className="bg-orange-500 text-white px-3 py-2 rounded-lg text-sm flex-1 sm:flex-none hover:bg-orange-600">
                                                    Book Now
                                                </button>
                                                <button className="text-sm text-gray-600 border px-3 py-2 rounded-lg flex-1 sm:flex-none text-center">
                                                    Details
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}