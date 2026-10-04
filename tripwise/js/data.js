// TripWise - Data Store

const DESTINATIONS = [
  {
    id: "goa",
    name: "Goa",
    country: "India",
    category: ["Beach", "Budget", "Adventure", "Party"],
    tag: "Beach Paradise",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    reviews: 1240,
    budget: "₹18,000",
    budgetValue: 18000,
    travelEstimates: {
      Flight: { minFare: 5500, maxFare: 12000, duration: "1h 15m", distanceKm: 420 },
      Train: { minFare: 1200, maxFare: 3000, duration: "10h", distanceKm: 590 },
      Bus: { minFare: 1500, maxFare: 3500, duration: "10h", distanceKm: 450 },
      Car: { minFare: 8000, maxFare: 13000, duration: "9h", distanceKm: 450, perVehicle: true }
    },
    duration: "4 Days / 3 Nights",
    bestTime: "Nov - Feb",
    description: "Sun-kissed beaches, vibrant nightlife, Portuguese heritage, and seafood delicacies make Goa the ultimate tropical getaway.",
    highlights: ["Baga Beach Sunset", "Dudhsagar Waterfalls", "Old Goa Churches", "Water Sports at Calangute"],
    food: ["Goan Fish Curry", "Bebinca", "Pork Vindaloo", "Feni Cocktail"],
    hotelArea: "North Goa (Near Baga/Candolim) for nightlife, South Goa for serene luxury",
    dailySpend: "₹3,500 / day"
  },
  {
    id: "manali",
    name: "Manali",
    country: "India",
    category: ["Mountains", "Adventure", "Budget", "Family"],
    tag: "Himalayan Wonderland",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviews: 980,
    budget: "₹22,000",
    budgetValue: 22000,
    travelEstimates: {
      Flight: { minFare: 10000, maxFare: 22000, duration: "6h 30m", distanceKm: 1500 },
      Train: { minFare: 2200, maxFare: 5500, duration: "30h", distanceKm: 1900 },
      Bus: { minFare: 3500, maxFare: 7500, duration: "32h", distanceKm: 1900 },
      Car: { minFare: 30000, maxFare: 50000, duration: "30h", distanceKm: 1900, perVehicle: true }
    },
    duration: "5 Days / 4 Nights",
    bestTime: "Oct - June",
    description: "Snow-capped Himalayan peaks, pine forests, Solang valley adventures, and cozy mountain cafes await in Manali.",
    highlights: ["Solang Valley Paragliding", "Atal Tunnel Drive", "Old Manali Cafes", "Hadimba Temple"],
    food: ["Siddu", "Trout Fish", "Chha Gosht", "Hot Thukpa"],
    hotelArea: "Old Manali for cozy vibes, Mall Road for convenience",
    dailySpend: "₹4,000 / day"
  },
  {
    id: "jaipur",
    name: "Jaipur",
    country: "India",
    category: ["History", "Culture", "Budget", "Family"],
    tag: "The Pink City",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    reviews: 1450,
    budget: "₹15,000",
    budgetValue: 15000,
    travelEstimates: {
      Flight: { minFare: 5000, maxFare: 12000, duration: "2h", distanceKm: 1000 },
      Train: { minFare: 1500, maxFare: 4000, duration: "22h", distanceKm: 1350 },
      Bus: { minFare: 2200, maxFare: 5000, duration: "20h", distanceKm: 1200 },
      Car: { minFare: 18000, maxFare: 30000, duration: "18h", distanceKm: 1200, perVehicle: true }
    },
    duration: "3 Days / 2 Nights",
    bestTime: "Oct - March",
    description: "Immerse yourself in royal heritage, grand palaces, bustling bazaars, and opulent Rajasthani architecture.",
    highlights: ["Amber Fort Light Show", "Hawa Mahal Viewpoint", "City Palace Tour", "Chokhi Dhani Dinner"],
    food: ["Dal Baati Churma", "Pyaaz Kachori", "Laal Maas", "Ghevar"],
    hotelArea: "MI Road or C-Scheme for central access to forts and markets",
    dailySpend: "₹3,200 / day"
  },
  {
    id: "kerala",
    name: "Kerala",
    country: "India",
    category: ["Nature", "Relaxation", "Family", "Romantic"],
    tag: "God's Own Country",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviews: 1620,
    budget: "₹28,000",
    budgetValue: 28000,
    travelEstimates: {
      Flight: { minFare: 7000, maxFare: 16000, duration: "2h 20m", distanceKm: 1000 },
      Train: { minFare: 1800, maxFare: 5000, duration: "24h", distanceKm: 1400 },
      Bus: { minFare: 2500, maxFare: 6000, duration: "22h", distanceKm: 1250 },
      Car: { minFare: 18000, maxFare: 32000, duration: "21h", distanceKm: 1250, perVehicle: true }
    },
    duration: "6 Days / 5 Nights",
    bestTime: "Sep - March",
    description: "Tranquil backwaters, Alleppey houseboats, Munnar tea estates, and lush Ayurvedic wellness retreats.",
    highlights: ["Alleppey Houseboat Cruise", "Munnar Tea Plantations", "Periyar Wildlife Safari", "Kovalam Beach"],
    food: ["Appam with Stew", "Kerala Sadya", "Karimeen Pollichathu", "Puttu and Kadala"],
    hotelArea: "Munnar (Tea Hillside) & Alleppey Backwater Resorts",
    dailySpend: "₹4,500 / day"
  },
  {
    id: "dubai",
    name: "Dubai",
    country: "UAE",
    category: ["International", "Luxury", "Family", "Shopping"],
    tag: "City of Superlatives",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    reviews: 2100,
    budget: "₹75,000",
    budgetValue: 75000,
    travelEstimates: {
      Flight: { minFare: 16000, maxFare: 32000, duration: "4h 30m", distanceKm: 2500 }
    },
    duration: "5 Days / 4 Nights",
    bestTime: "Nov - April",
    description: "Futuristic skyscrapers, desert safaris, luxury shopping malls, and world-record attractions.",
    highlights: ["Burj Khalifa At The Top", "Desert Safari with BBQ", "Dubai Mall Fountain Show", "Palm Jumeirah"],
    food: ["Shawarma", "Al Harees", "Luqaimat", "Camel Burger"],
    hotelArea: "Downtown Dubai or Dubai Marina",
    dailySpend: "₹12,000 / day"
  },
  {
    id: "bali",
    name: "Bali",
    country: "Indonesia",
    category: ["International", "Beach", "Romantic", "Adventure"],
    tag: "Island of the Gods",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviews: 1890,
    budget: "₹65,000",
    budgetValue: 65000,
    travelEstimates: {
      Flight: { minFare: 28000, maxFare: 48000, duration: "10h", distanceKm: 5800 }
    },
    duration: "6 Days / 5 Nights",
    bestTime: "April - Oct",
    description: "Sacred water temples, emerald rice terraces, surf beaches, cliffside clubs, and tropical villas.",
    highlights: ["Ubud Rice Terraces", "Tanah Lot Temple Sunset", "Nusa Penida Island Tour", "Seminyak Beach Club"],
    food: ["Nasi Goreng", "Babi Guling", "Sate Lilit", "Smoothie Bowls"],
    hotelArea: "Ubud for culture & jungle views, Seminyak for beachside night vibes",
    dailySpend: "₹9,500 / day"
  },
  {
    id: "paris",
    name: "Paris",
    country: "France",
    category: ["International", "Romantic", "Culture", "Luxury"],
    tag: "City of Light",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviews: 3100,
    budget: "₹1,20,000",
    budgetValue: 120000,
    travelEstimates: {
      Flight: { minFare: 45000, maxFare: 78000, duration: "13h", distanceKm: 7200 }
    },
    duration: "6 Days / 5 Nights",
    bestTime: "April - Oct",
    description: "Iconic Eiffel Tower, world-class art galleries, chic fashion boulevards, and gourmet patisseries.",
    highlights: ["Eiffel Tower Sparkle", "Louvre Museum Tour", "Seine River Cruise", "Montmartre & Sacré-Cœur"],
    food: ["Croissants & Coffee", "Escargots", "Duck Confit", "Macarons"],
    hotelArea: "Le Marais or 7th Arrondissement near Eiffel Tower",
    dailySpend: "₹18,000 / day"
  },
  {
    id: "tokyo",
    name: "Tokyo",
    country: "Japan",
    category: ["International", "Culture", "Shopping", "Adventure"],
    tag: "Future Meets Tradition",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80",
    rating: 4.95,
    reviews: 2400,
    budget: "₹1,35,000",
    budgetValue: 135000,
    travelEstimates: {
      Flight: { minFare: 38000, maxFare: 70000, duration: "12h", distanceKm: 6600 }
    },
    duration: "7 Days / 6 Nights",
    bestTime: "March - May & Oct - Nov",
    description: "Neon lit skyscrapers, tranquil Shinto shrines, bullet trains, anime culture, and legendary culinary art.",
    highlights: ["Shibuya Crossing", "Senso-ji Temple", "Mount Fuji Day Trip", "Akihabara Tech District"],
    food: ["Tonkotsu Ramen", "Fresh Sushi at Tsukiji", "Wagyu Beef", "Matcha Parfait"],
    hotelArea: "Shinjuku or Shibuya for central transport hub",
    dailySpend: "₹16,000 / day"
  }
];

const SAMPLE_ITINERARIES = {
  "goa": {
    destination: "Goa",
    duration: "4 Days / 3 Nights",
    budget: 25000,
    travelers: "2 Adults",
    routes: ["Pune", "Mumbai", "Goa", "Gokarna"],
    weather: { temp: "29°C", condition: "Sunny & Pleasant", humidity: "65%", wind: "12 km/h" },
    weatherForecast: [
      { day: "Day 1", temp: "30°C", condition: "Sunny", icon: "sun" },
      { day: "Day 2", temp: "29°C", condition: "Clear Sky", icon: "sun" },
      { day: "Day 3", temp: "28°C", condition: "Partly Cloudy", icon: "cloud-sun" },
      { day: "Day 4", temp: "31°C", condition: "Breezy Sunset", icon: "wind" }
    ],
    days: [
      {
        day: 1,
        title: "Arrival & Coastal Chill",
        activities: [
          { time: "10:00 AM", title: "Arrival & Resort Check-in", desc: "Arrive in North Goa, check into beach resort, welcome drinks & refreshment.", category: "Hotel", icon: "hotel" },
          { time: "01:30 PM", title: "Seafood Lunch at Brittos", desc: "Enjoy authentic Goan fish curry and prawns by Baga Beach.", category: "Food", icon: "utensils" },
          { time: "04:30 PM", title: "Fort Aguada & Lighthouse Visit", desc: "Explore 17th-century Portuguese fort overlooking Arabian Sea.", category: "Sightseeing", icon: "camera" },
          { time: "07:30 PM", title: "Sunset & Beach Shack Dinner", desc: "Relax with live acoustic music, bonfire and tropical cocktails.", category: "Nightlife", icon: "moon" }
        ]
      },
      {
        day: 2,
        title: "Heritage & Culture Exploration",
        activities: [
          { time: "09:00 AM", title: "Old Goa Heritage Walk", desc: "Visit Basilica of Bom Jesus and Se Cathedral (UNESCO Heritage).", category: "History", icon: "landmark" },
          { time: "12:30 PM", title: "Spice Plantation Tour & Buffet", desc: "Guided walk through aromatic organic spice farms with traditional Goan lunch.", category: "Culture", icon: "leaf" },
          { time: "04:00 PM", title: "Fontainhas Latin Quarter Stroll", desc: "Walk through colorful Portuguese heritage lanes in Panjim.", category: "Sightseeing", icon: "map-pin" },
          { time: "07:00 PM", title: "Mandovi River Sunset Cruise", desc: "1-hour luxury cruise with folk dance performances and music.", category: "Activity", icon: "ship" }
        ]
      },
      {
        day: 3,
        title: "Water Sports & Thrill Adventure",
        activities: [
          { time: "08:30 AM", title: "Calangute Water Sports Package", desc: "Parasailing, Jet Ski, Banana Boat ride and Speedboat thrills.", category: "Adventure", icon: "zap" },
          { time: "01:00 PM", title: "Lunch at Curlies Anjuna", desc: "Cliffside dining with sea view and electronic chilled beats.", category: "Food", icon: "utensils" },
          { time: "03:30 PM", title: "Anjuna Flea Market & Shopping", desc: "Shop handmade souvenirs, boho dresses, handicrafts and jewelry.", category: "Shopping", icon: "shopping-bag" },
          { time: "09:00 PM", title: "Club Night at Thalassa / Tito's", desc: "Greek ambient dining followed by dancing at Goa's premier club.", category: "Nightlife", icon: "music" }
        ]
      },
      {
        day: 4,
        title: "Morning Chill & Departure",
        activities: [
          { time: "09:00 AM", title: "Leisure Breakfast by Pool", desc: "Enjoy smooth juices, continental breakfast and morning dip.", category: "Relaxation", icon: "coffee" },
          { time: "11:30 AM", title: "Check-out & Souvenir Shopping", desc: "Pick up cashew nuts, feni, and local Goan bakery sweets.", category: "Shopping", icon: "gift" },
          { time: "02:00 PM", title: "Return Airport/Station Transport", desc: "Board flight/train with unforgettable Goan memories.", category: "Transport", icon: "plane" }
        ]
      }
    ],
    budgetBreakdown: {
      transport: 8750, // 35%
      hotel: 6250,     // 25%
      food: 3750,      // 15%
      activities: 3750,// 15%
      emergency: 2500  // 10%
    }
  }
};

const FLOW_STEPS = [
  { num: 1, title: "Destination", desc: "Choose where you want to go", icon: "compass", color: "from-blue-500 to-teal-400" },
  { num: 2, title: "Dates", desc: "Select your travel dates", icon: "calendar", color: "from-teal-400 to-emerald-400" },
  { num: 3, title: "Budget", desc: "Set your spending limit", icon: "wallet", color: "from-emerald-400 to-yellow-400" },
  { num: 4, title: "Transport", desc: "Choose best travel mode", icon: "plane", color: "from-yellow-400 to-amber-500" },
  { num: 5, title: "Hotel", desc: "Find comfortable stays", icon: "building", color: "from-amber-500 to-orange-500" },
  { num: 6, title: "Activities", desc: "Discover things to do", icon: "sparkles", color: "from-orange-500 to-purple-500" },
  { num: 7, title: "Itinerary", desc: "Generate full trip plan", icon: "map", color: "from-purple-500 to-indigo-600" }
];

const AI_WORKFLOW_STEPS = [
  { step: "01", title: "User Preferences", desc: "Destination, dates, style & budget inputs", icon: "user-check", bg: "bg-blue-50 text-blue-600 border-blue-200" },
  { step: "02", title: "AI Analysis", desc: "Processing 50,000+ data points & weather models", icon: "cpu", bg: "bg-teal-50 text-teal-600 border-teal-200" },
  { step: "03", title: "Destination Match", desc: "Recommending tailored spots & local highlights", icon: "map-pin", bg: "bg-purple-50 text-purple-600 border-purple-200" },
  { step: "04", title: "Stays & Transport", desc: "Filtering top flights, trains & hotels", icon: "home", bg: "bg-amber-50 text-amber-600 border-amber-200" },
  { step: "05", title: "Activity Selection", desc: "Curating hidden gems, dining & adventure", icon: "heart", bg: "bg-rose-50 text-rose-600 border-rose-200" },
  { step: "06", title: "Schedule Optimization", desc: "Minimizing transit time between spots", icon: "clock", bg: "bg-indigo-50 text-indigo-600 border-indigo-200" },
  { step: "07", title: "Personalized Plan", desc: "Generating day-wise itinerary & budget split", icon: "file-text", bg: "bg-emerald-50 text-emerald-600 border-emerald-200" },
  { step: "08", title: "Final Trip Dashboard", desc: "Interactive plan ready to edit, save & share", icon: "check-circle", bg: "bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-lg shadow-teal-500/20" }
];

const USER_JOURNEY_STEPS = [
  { stage: "Search", title: "Discover Places", desc: "Explore destinations matched with your vibe and budget.", icon: "search", color: "bg-blue-500" },
  { stage: "Compare", title: "Evaluate Options", desc: "Compare stays, flight costs, weather & travel times.", icon: "sliders", color: "bg-teal-500" },
  { stage: "Plan", title: "AI Generation", desc: "Generate minute-by-minute optimized daily schedules.", icon: "cpu", color: "bg-purple-500" },
  { stage: "Book", title: "Reserve Stays", desc: "Lock in best prices for hotels, transport & activities.", icon: "bookmark", color: "bg-amber-500" },
  { stage: "Travel", title: "Enjoy Journey", desc: "Navigate seamlessly with live weather & offline maps.", icon: "navigation", color: "bg-rose-500" },
  { stage: "Memories", title: "Share & Relive", desc: "Export itinerary PDF and log favorite moments.", icon: "heart", color: "bg-indigo-600" }
];

const FEATURES_DATA = [
  { icon: "sparkles", title: "AI Itinerary Generation", desc: "Tailor-made day-by-day itineraries generated in seconds powered by smart travel AI algorithms." },
  { icon: "compass", title: "Smart Recommendations", desc: "Curated attractions, secret view points, and local food places aligned with your personal interests." },
  { icon: "pie-chart", title: "Dynamic Budget Planning", desc: "Real-time expense allocation donut chart for transport, stays, food, activities and buffer." },
  { icon: "hotel", title: "Verified Stays & Transport", desc: "Smart comparisons for flights, trains, cars and neighborhood hotel recommendations." },
  { icon: "cloud-sun", title: "Live Weather Insights", desc: "Historical and real-time forecast analysis to ensure ideal outdoor activity planning." },
  { icon: "map-pin", title: "Visual Route Optimizer", desc: "Interactive map route diagram connecting starting city, layovers and destination spots." }
];
