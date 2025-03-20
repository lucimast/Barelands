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
  },
  {
    "id": "5d7766d0-4898-49ff-8e1f-1d68ffde74d0",
    "title": "Nara Lanterns",
    "category": "Night Sky",
    "image": "/uploads/0c699b59-09d5-498b-96b1-fee1d146d1a8.jpg",
    "description": "Beautiful landscape photograph of Nara Lanterns",
    "location": "Japan",
    "featured": false,
    "dateAdded": "2025-03-20T09:56:24.784Z"
  },
  {
    "id": "7cb6c094-084f-4246-970a-4d8303d1175f",
    "title": "Passo Giau Vertical",
    "category": "Mountains",
    "image": "/uploads/4ac52a48-ce6b-4c41-be3d-8175fac59611.jpg",
    "description": "Beautiful landscape photograph of the Dolomites",
    "location": "Dolomites, Italy",
    "featured": true,
    "dateAdded": "2025-03-20T09:56:24.784Z"
  },
  {
    "id": "6d215144-8604-4912-aea8-2560a2c71611",
    "title": "Iguazu Falls",
    "category": "Forests",
    "image": "/uploads/a32a74b2-3425-478d-b77f-709994739d48.jpg",
    "description": "Beautiful landscape photograph of Iguazu Falls",
    "location": "Brazil",
    "featured": true,
    "dateAdded": "2025-03-20T09:56:24.784Z"
  },
  {
    "id": "c5e9bd41-bb7a-4d25-814d-5f36b7a6018a",
    "title": "Greek Coast",
    "category": "Oceans",
    "image": "/uploads/ac1d9140-5825-440b-8a0c-221d94a247fa.jpg",
    "description": "Beautiful Greek coastal landscape",
    "location": "Greece",
    "featured": true,
    "dateAdded": "2025-03-20T09:56:24.784Z"
  },
  {
    "id": "78ffb2b0-3027-409d-b1fd-6145a2b752fa",
    "title": "Windmills Leros Night",
    "category": "Night Sky",
    "image": "/uploads/c12ce531-80bc-40c3-8b14-f54382ab341e.jpg",
    "description": "Windmills under the night sky",
    "location": "Leros, Greece",
    "featured": true,
    "dateAdded": "2025-03-20T09:56:24.785Z"
  },
  {
    "id": "28b20bbe-a70d-4fc9-8ba0-9d30d6f39a70",
    "title": "Cadini di Misurina",
    "category": "Mountains",
    "image": "/uploads/c8715667-721a-465d-bedc-df749afbd870.jpg",
    "description": "Mountain view with wildflowers in the foreground",
    "location": "Dolomites, Italy",
    "featured": false,
    "dateAdded": "2025-03-20T09:56:24.785Z"
  },
  {
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
    "featured": true,
    "dateAdded": "2025-03-20T09:56:24.785Z"
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
  name: "@mybarelands",
  title: "Landscape Photography",
  bio: [
    "Exploring Barelands",
    "Looking Farther to Look Deeper",
    "Fine art landscape photography capturing the beauty of remote locations around the world."
  ],
  avatar: "/avatar.jpg",
  socialLinks: {
    instagram: "https://instagram.com/mybarelands",
  },
}; 