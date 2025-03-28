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

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  relatedPhotoId?: string; // Optional reference to a photo
  date: string; // ISO date string
  author: string;
};

// Updated categories to include Italy and Travel
export const photoCategories = ["All", "Mountains", "Deserts", "Forests", "Oceans", "Night Sky", "Italy", "Travel"];

// Photos imported from the user's local collection
export const photos: Photo[] = [
{
    "id": "4c5239b2-a9be-4bca-9f06-840dbd6fc05e",
    "title": "Cuernos Del Paine Beach",
    "category": "Mountains",
    "image": "/uploads/515980e8-cccc-43eb-bcd4-98f7a0e95179.jpg",
    "description": "Beautiful landscape photograph of Cuernos Del Paine Beach",
    "location": "Patagonia, Chile",
    "featured": true,
    "dateAdded": "2025-03-20T09:56:24.783Z"
  },{
    "id": "6d215144-8604-4912-aea8-2560a2c71611",
    "title": "Iguazu Falls",
    "category": "Forests",
    "image": "/uploads/a32a74b2-3425-478d-b77f-709994739d48.jpg",
    "description": "Beautiful landscape photograph of Iguazu Falls",
    "location": "Brazil",
    "featured": true,
    "dateAdded": "2025-03-20T09:56:24.784Z"
  },{
    "id": "336f4d1d-8897-4a0e-a945-88dcc034545b",
    "title": "Kallur Lighthouse",
    "category": "Oceans",
    "image": "/uploads/8d34fadc-14b9-4af6-af8e-9a57e4a15232.jpg",
    "description": "The famous lighthouse with ducks in the foreground",
    "location": "Faroe Islands, Denmark",
    "featured": true,
    "dateAdded": "2025-03-20T09:56:24.785Z"
  },
  {
    "id": "60bc93d2-d245-42cd-816e-5d91d13d98af",
    "title": "Matera Sunset",
    "category": "Night Sky",
    "image": "/uploads/c1fb53d7-542f-460e-9627-ca1a4ef9f754.jpg",
    "description": "A beautiful sunset over the ancient city",
    "location": "Matera, Italy",
    "featured": false,
    "dateAdded": "2025-03-20T09:56:24.785Z"
  },
  {
  id: "1743099563347",
  title: "Evening in Hamnoy",
  category: "Mountains",
  image: "https://res.cloudinary.com/dnafz7ugo/image/upload/v1743099529/landscape-photos/kp0xnlvne3pgyrmxbgle.jpg",
  description: "",
  location: "Lofoten, Norway",
  featured: true,
  dateAdded: "2025-03-27T18:19:23.347Z"
},,
  {
  id: "1743159135812",
  title: "Wind and Glow",
  category: "Night Sky",
  image: "https://res.cloudinary.com/dnafz7ugo/image/upload/v1743159043/landscape-photos/jn1mxeiugbwchtfc7tav.jpg",
  description: "A time blending of long exposures taken on an incredibly windy spot",
  location: "Menetes, Karpathos, Greece",
  featured: true,
  dateAdded: "2025-03-28T10:52:15.812Z"
}
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

// Updated personal details
export const aboutInfo: AboutInfo = {
  name: "Barelands",
  title: "Landscape Photography",
  bio: [],
  avatar: "/avatar.jpg",
  socialLinks: {
    instagram: "https://instagram.com/mybarelands",
  },
}; 