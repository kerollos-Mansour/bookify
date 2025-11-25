const fs = require("fs");
const path = require("path");

const dataPath = path.resolve(__dirname, "../mock-api/mock-data/hotels-data.json");

const roomTemplates = [
  {
    name: "Standard Double Room, Ocean View",
    images: ["/room1.png", "/room2.png"],
    amenities: {
      breakfast: true,
      parking: true,
      size: "312 sq ft",
      sleeps: 3,
      bedType: "2 Double Beds OR 1 King Bed",
      allInclusive: true,
      wifi: true,
    },
    refundable: {
      isRefundable: true,
      deadline: "Tue, Feb 3",
    },
    price: {
      original: 80517,
      discounted: 40447,
      currency: "EGP",
    },
  },
  {
    name: "Junior Suite, Ocean View",
    images: ["/room3.png", "/room4.png"],
    amenities: {
      breakfast: true,
      parking: true,
      size: "474 sq ft",
      sleeps: 3,
      bedType: "2 Double Beds OR 1 King Bed",
      allInclusive: true,
      wifi: true,
      bedrooms: 1,
    },
    refundable: {
      isRefundable: true,
      deadline: "Tue, Feb 3",
    },
    price: {
      original: 86362,
      discounted: 43368,
      currency: "EGP",
    },
  },
  {
    name: "Double Room, 2 Bedrooms, Ocean View",
    images: ["/room5.png", "/room1.png"],
    amenities: {
      breakfast: true,
      parking: true,
      size: "523 sq ft",
      sleeps: 6,
      bedType: "1 King Bed",
      allInclusive: true,
      wifi: true,
      bedrooms: 2,
    },
    refundable: {
      isRefundable: true,
      deadline: "Tue, Feb 3",
    },
    price: {
      original: 120512,
      discounted: 60256,
      currency: "EGP",
    },
  },
];

const amenityPresets = [
  [
    "Indoor pool",
    "Continental breakfast available",
    "Pets stay free",
    "Restaurant",
    "Full-service spa",
    "Free WiFi",
  ],
  [
    "Outdoor pool",
    "Rooftop bar",
    "Airport shuttle",
    "24/7 fitness center",
    "Valet parking",
    "Free WiFi",
  ],
  [
    "Beach cabanas",
    "All-inclusive meals",
    "Kids club",
    "Water sports gear",
    "Spa services",
    "Free WiFi",
  ],
];

const experiencePresets = [
  {
    title: "On the beach",
    description:
      "This Art Deco-style all-inclusive property sits right on the sand. Enjoy private cabanas, dedicated beach hosts, and effortless access to snorkeling, windsurfing, and surfing lessons.",
    heroImage: "/spa-main.png",
    gallery: ["/spa-main2.png", "/spa-main3.png"],
    guestQuote:
      "The beach was beautiful, clean, and swimmable with crystal clear water and stunning views.",
  },
  {
    title: "Skyline wellness",
    description:
      "Retreat to our skyline spa that overlooks the city. Steam rooms, Himalayan salt saunas, and expert therapists deliver a boutique wellness program tailored to each guest.",
    heroImage: "/spa-main2.png",
    gallery: ["/spa-main3.png", "/spa-main.png"],
    guestQuote:
      "Incredible spa menu and staff. Sunset treatments while overlooking the city were unforgettable.",
  },
  {
    title: "Desert-inspired rituals",
    description:
      "Reconnect at our desert-inspired sanctuary featuring plunge pools, aromatherapy lounges, and immersive wellness journeys curated by local healers.",
    heroImage: "/spa-main3.png",
    gallery: ["/spa-main.png", "/spa-main2.png"],
    guestQuote:
      "Peaceful, calming, and thoughtfully designed. Every treatment felt personalized.",
  },
];

function formatPrice(base, multiplier) {
  const original = Math.round(base.original * multiplier);
  const discounted = Math.round(base.discounted * multiplier);
  return {
    original,
    discounted,
    discount: original - discounted,
    currency: base.currency,
  };
}

function syncMockData() {
  const raw = fs.readFileSync(dataPath, "utf8");
  const data = JSON.parse(raw);

  if (!Array.isArray(data.hotels)) {
    throw new Error("Expected hotels array in mock data.");
  }

  const generatedRooms = [];
  const hotelDetails = [];

  data.hotels.forEach((hotel, index) => {
    const multiplier = 1 + index * 0.08;

    roomTemplates.forEach((template, templateIndex) => {
      const roomId = `${hotel.id}-room-${templateIndex + 1}`;
      generatedRooms.push({
        id: roomId,
        hotelId: hotel.id,
        name: template.name,
        images: template.images,
        amenities: template.amenities,
        refundable: template.refundable,
        price: formatPrice(template.price, multiplier),
      });
    });

    const amenities = amenityPresets[index % amenityPresets.length];
    const experience = experiencePresets[index % experiencePresets.length];

    hotelDetails.push({
      id: `${hotel.id}-detail`,
      hotelId: hotel.id,
      tagline: `${hotel.name} • ${hotel.city}`,
      reviewCount: 800 + index * 120,
      highlights: amenities.slice(0, 3),
      amenities,
      experience,
    });
  });

  data.rooms = generatedRooms;
  data.hotelDetails = hotelDetails;

  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  console.log("✅ Mock hotel data synced with rooms and details.");
}

syncMockData();

