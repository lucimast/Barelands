export type Photo = {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  location: string;
  featured?: boolean;
  dateAdded: string; // ISO date string
};

export const photoCategories = ["All", "Mountains", "Deserts", "Forests", "Oceans", "Night Sky"];

// These are placeholder images that will be replaced with your actual photos
export const photos: Photo[] = [
  {
    id: "1",
    title: "Mountain Twilight",
    category: "Mountains",
    image: "/hero.jpg",
    description: "Sunset view of mountain valley with mist",
    location: "Yosemite National Park, USA",
    featured: true,
    dateAdded: "2023-06-15T08:00:00Z",
  },
  {
    id: "2",
    title: "Alpine Majesty",
    category: "Mountains",
    image: "/mountains.jpg",
    description: "Morning light on mountain peaks with winter fog",
    location: "Julian Alps, Slovenia",
    featured: true,
    dateAdded: "2023-07-21T10:30:00Z",
  },
  {
    id: "3",
    title: "Desert Dunes",
    category: "Deserts",
    image: "/desert.jpg",
    description: "Endless dunes in the golden light of dawn",
    location: "Sahara Desert, Morocco",
    featured: false,
    dateAdded: "2023-08-05T15:45:00Z",
  },
  {
    id: "4",
    title: "Winter Reflections",
    category: "Mountains",
    image: "/winter.jpg",
    description: "Snowy mountain peaks reflecting in a crystal clear lake",
    location: "Canadian Rockies, Canada",
    featured: true,
    dateAdded: "2023-09-12T12:20:00Z",
  },
  {
    id: "5",
    title: "Cosmic Mountains",
    category: "Night Sky",
    image: "/night-sky.jpg",
    description: "The Milky Way arching over snow-capped mountains",
    location: "Swiss Alps, Switzerland",
    featured: false,
    dateAdded: "2023-10-08T21:15:00Z",
  },
  {
    id: "6",
    title: "Tuscan Dreams",
    category: "Forests",
    image: "/tuscany.jpg",
    description: "Rolling hills and cypress trees in the golden hour",
    location: "Tuscany, Italy",
    featured: false,
    dateAdded: "2023-11-30T09:45:00Z",
  },
];

export type AboutInfo = {
  name: string;
  title: string;
  bio: string[];
  avatar: string;
  socialLinks: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    flickr?: string;
  };
};

// This is placeholder about information that will need to be replaced with your actual info
export const aboutInfo: AboutInfo = {
  name: "Barelands",
  title: "Landscape Photography",
  bio: [
    "Barelands is dedicated to capturing the raw beauty of untouched landscapes from around the world.",
    "Our mission is to showcase the majesty of nature in its purest form, from towering mountain ranges to vast desert expanses.",
    "Each photograph tells a story of our planet's incredible diversity and natural splendor, inviting viewers to connect with these remarkable environments.",
  ],
  avatar: "/avatar.jpg", // You'll need to add an avatar image to your public folder
  socialLinks: {
    instagram: "https://instagram.com/barelands",
    facebook: "https://facebook.com/barelands",
    twitter: "https://twitter.com/barelands",
  },
}; 