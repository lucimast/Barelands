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
    "featured": false,
    "dateAdded": "2025-03-20T09:56:24.784Z"
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
  },
  {
    "id": "1743099563347",
    "title": "Evening in Hamnoy",
    "category": "Mountains",
    "image": "https://res.cloudinary.com/dnafz7ugo/image/upload/v1743099529/landscape-photos/kp0xnlvne3pgyrmxbgle.jpg",
    "description": "",
    "location": "Lofoten, Norway",
    "featured": true,
    "dateAdded": "2025-03-27T18:19:23.347Z"
  },
  {
    "id": "1743159135812",
    "title": "Wind and Glow",
    "category": "Night Sky",
    "image": "https://res.cloudinary.com/dnafz7ugo/image/upload/v1743159043/landscape-photos/jn1mxeiugbwchtfc7tav.jpg",
    "description": "A time blending of long exposures taken on an incredibly windy spot",
    "location": "Menetes, Karpathos, Greece",
    "featured": true,
    "dateAdded": "2025-03-28T10:52:15.812Z"
  },
  {
    "id": "1743159352224",
    "title": "Mist and Flowers",
    "category": "Mountains",
    "image": "https://res.cloudinary.com/dnafz7ugo/image/upload/v1743159225/landscape-photos/jx0dbxsqcnwuu4e0yniz.jpg",
    "description": "A shot of a mountain river stream taken during a beautiful hike in the Dolomites, with their ever changing weather",
    "location": "Cornisello, Dolomites",
    "featured": true,
    "dateAdded": "2025-03-28T10:55:52.224Z"
  },
  {
    "id": "1743159500591",
    "title": "Endless Sunset",
    "category": "Mountains",
    "image": "https://res.cloudinary.com/dnafz7ugo/image/upload/v1743159407/landscape-photos/s4um6nq3bnqfvgnlam9b.jpg",
    "description": "This photo almost costed me an elbow. I got so mesmerized by the light and the atmosphere that I failed to notice how slippery the rocks were on this beach. So I fell badly on one of those and to protect my camera I pointed my elbow down. I still feel the pain if I think about it. though a couple of years later I think it was worth it",
    "location": "Vareid Beach, Lofoten",
    "featured": true,
    "dateAdded": "2025-03-28T10:58:20.591Z"
  },
  {
  id: "1743160172658",
  title: "Magical Lanterns",
  category: "Forests",
  image: "https://res.cloudinary.com/dnafz7ugo/image/upload/v1743159530/landscape-photos/jvzzjjljzs57gqpre1yo.jpg",
  description: "Just outside one of Nara's main temples",
  location: "Nara, Japan",
  featured: false,
  dateAdded: "2025-03-28T11:09:32.658Z"
},
  {
  id: "1743160329322",
  title: "White",
  category: "Mountains",
  image: "https://res.cloudinary.com/dnafz7ugo/image/upload/v1743160216/landscape-photos/gquer7iejqty41t99p3j.jpg",
  description: "One fine morning on the slopes",
  location: "Zermatt, Switzerland",
  featured: true,
  dateAdded: "2025-03-28T11:12:09.322Z"
},
  {
  id: "1743343660505",
  title: "Shizukana Yuhi",
  category: "Travel",
  image: "https://res.cloudinary.com/dnafz7ugo/image/upload/v1743343193/landscape-photos/wxtxubo0s9xd9q466wgr.png",
  description: "I took this picture at sunset during my last trip to Japan at the end of 2024. Shizukana Yuhi means tranquil sunset in Japanese. And this photo could not be named otherwise as I arrived at the temple 15 minutes before it closed and I was almost alone there. The temple itself is quite modern and some of its structures remind those of older and more famous ones, especially in Nikko. Anyway, such a nice scene with all the carps and the red temple gate in the background...",
  location: "Kousan-Ji Temple, Inland Sea, Japan",
  featured: true,
  dateAdded: "2025-03-30T14:07:40.505Z"
}
];

// Blog posts array to store blog content
export const blogPosts: BlogPost[] = [
{
    id: "iceland-photography",
    title: "Iceland: A Photographer's Paradise",
    excerpt: "With its dramatic waterfalls, volcanic landscapes, and ethereal light, Iceland offers endless opportunities for landscape photographers.",
    content: `
# Iceland: A Photographer's Paradise

Iceland has become one of the most sought-after destinations for landscape photographers, and for good reason. The island's dramatic and diverse landscapes offer an almost endless array of photographic opportunities.

## The Land of Fire and Ice

Iceland's nickname, "The Land of Fire and Ice," perfectly captures its contrasting landscapes. Massive glaciers sit alongside active volcanoes, creating scenes that seem almost otherworldly. The black sand beaches provide striking foregrounds for the crashing waves of the Atlantic Ocean.

## Chasing the Light

One of the most magical aspects of photographing in Iceland is the quality of light. During the summer months, the midnight sun provides hours of golden light, perfect for landscape photography. In winter, the short days mean you don't need to wake up early for sunrise shots, and the low angle of the sun creates dramatic shadows across the landscape all day.

And of course, there's the Northern Lights. From September to April, Iceland offers some of the best opportunities to capture this magical phenomenon.

## Planning Your Trip

If you're planning a photography trip to Iceland, consider the following:

1. **Weather and Seasons**: Each season offers different photographic opportunities. Summer brings midnight sun and lush landscapes, while winter offers Northern Lights and ice caves.
2. **Equipment**: Bring weather-sealed gear if possible, as Iceland's weather can change rapidly. A sturdy tripod is essential for the often windy conditions.
3. **Time**: Allow plenty of time at each location. The weather can change dramatically in minutes, creating entirely different scenes.

Iceland continues to inspire me with each visit, and I hope to share more photographs and stories from this incredible island in future posts.
    `,
    coverImage: "/uploads/974baeb1-25ba-44f1-8da8-b134ab07f10c.jpeg",
    relatedPhotoId: "4c5239b2-a9be-4bca-9f06-840dbd6fc05e",
    date: "2024-04-15",
    author: "Barelands"
  },
  {
    id: "finding-right-light",
    title: "The Art of Landscape Photography: Finding the Right Light",
    excerpt: "Light is perhaps the most crucial element in landscape photography. This post explores techniques for finding and working with different lighting conditions.",
    content: `
# The Art of Landscape Photography: Finding the Right Light

Light is often described as the most important element in photography, and nowhere is this more true than in landscape photography. The right light can transform an ordinary scene into something extraordinary, while even the most dramatic landscape can appear flat and uninspiring in poor light.

## The Golden Hours

Most landscape photographers are familiar with the "golden hours" - the period shortly after sunrise and before sunset when the sun is low in the sky, creating warm, directional light with long shadows. This light adds depth, texture, and dimension to landscapes.

During these times:
- The light has a warm, golden color that enhances natural colors
- Shadows are longer, adding depth and dimension
- The light is more directional, highlighting textures

## Blue Hour

The "blue hour" occurs just before sunrise and after sunset, when the sky takes on a deep blue color. This can be a magical time for photography, especially for scenes involving water or urban elements.

## Midday Light

While often avoided by landscape photographers, midday light can work well for:
- Deep canyons, where direct overhead light can illuminate otherwise shadowy areas
- Woodland scenes, where dappled light filters through the canopy
- Black and white photography, where harsh contrast can add drama

## Overcast and Stormy Conditions

Don't put your camera away when the sun disappears! Overcast and stormy conditions can create:
- Soft, diffused light perfect for waterfalls and forests
- Dramatic, moody skies that add emotion to landscapes
- Opportunities for long exposures to capture movement in clouds or water

## Planning for the Light

Tools like PhotoPills and The Photographer's Ephemeris can help you plan exactly where and when the sun (or moon) will appear in your composition. This kind of planning is invaluable for making the most of your time in the field.

Remember, there is no such thing as "bad light" - only light that may not suit your particular subject. Learning to work with different lighting conditions will expand your creative possibilities and help you capture the landscape in all its moods.
    `,
    coverImage: "/uploads/c8715667-721a-465d-bedc-df749afbd870.jpg",
    date: "2024-03-28",
    author: "Barelands"
  },
  {
    id: "patagonia-adventure",
    title: "Patagonia: A Photographer's Journey to the End of the World",
    excerpt: "Exploring the rugged landscapes of Patagonia offers unique challenges and rewards for landscape photographers. Here's my experience capturing this magnificent region.",
    content: `
# Patagonia: A Photographer's Journey to the End of the World

Patagonia has long been a dream destination for me as a landscape photographer. The region, which spans the southern areas of Argentina and Chile, is known for its dramatic mountains, pristine lakes, and ever-changing weather conditions.

## The Iconic Cuernos del Paine

My journey centered around Torres del Paine National Park in Chilean Patagonia. The iconic peaks of the Cuernos del Paine are among the most recognizable and photogenic mountain formations in the world. Their distinctive shape and the way they catch the first light of dawn create a scene that seems almost too perfect to be real.

Getting the shot required several days of patience. The Patagonian weather is notoriously unpredictable, with clear skies quickly giving way to powerful storms. I spent three mornings at the same location, waiting for the perfect combination of light and clouds. On the third morning, everything aligned - the peaks caught the golden light of sunrise while dramatic clouds swirled around them. The wait was absolutely worth it.

## Practical Challenges

Photographing in Patagonia presents unique challenges:

1. **Weather**: Be prepared for strong winds (up to 100 km/h) that can make tripod stability difficult. Always bring weights for your tripod.
   
2. **Accessibility**: Many of the best viewpoints require hiking, sometimes for several hours or days. Being physically prepared is essential.
   
3. **Equipment**: Bring backup equipment if possible, as repair options are limited. Weather sealing is crucial for your camera gear.

## The Best Time to Visit

While Patagonia can be photographed year-round, the most popular season is their summer (December to February), when days are longest and temperatures most moderate. However, the shoulder seasons of October-November and March-April offer fewer crowds and often more dramatic weather conditions, which can lead to more compelling photographs.

I'll never forget watching the alpenglow illuminate the mountains while the wind created patterns across the surface of Lago Pehoé. It was a moment that reminded me why I became a landscape photographer - to witness and capture these fleeting moments of natural beauty.
    `,
    coverImage: "/uploads/515980e8-cccc-43eb-bcd4-98f7a0e95179.jpg",
    relatedPhotoId: "4c5239b2-a9be-4bca-9f06-840dbd6fc05e",
    date: "2024-02-10",
    author: "Barelands"
  },
  {
  id: "1743178665112",
  title: "An evening in Hamnoy",
  excerpt: "A memorable journey to Lofoten's most charming village",
  content: "Hamnoy is arguably the most charming village in Lofoten. Spending an evening there admiring the infinite sunset was a delight. Right beside the bridge that links it to neighbouring villages, I found these beautiful flowers. What better could I ask for as a foreground? A shame there were no clouds in the sky, but, hey, who can complain about such a beautiful day?\n\n",
  coverImage: "https://res.cloudinary.com/dnafz7ugo/image/upload/v1743178621/h1ykzlzqbkoib8zdaqnm.jpg",
  relatedPhotoId: "1743099563347",
  date: "2025-03-28T16:17:45.112Z",
  author: "@mybarelands"
},
  {
  id: "1743184551767",
  title: "Iceland I miss you",
  excerpt: "Remembering my trip to Iceland two years ago",
  content: "Title: South Iceland: Where the Earth Breathes Beauty\n\nTwo years ago, I found myself standing on the edge of the world, or at least, that is how it felt. The southern coast of Iceland, with its raw, unfiltered beauty, is the kind of place that doesn't just ask for your attention, it demands it.\n\nAfter landing in Reykjavik, I traced the Ring Road southward, where glaciers meet black sand, waterfalls tumble from basalt cliffs, and the light has a mind of its own.\n\nAt Vik, I stood before Reynisfjara Beach, where the Atlantic crashes into jet black shores. The sea stacks loomed offshore like ancient watchmen, their dark silhouettes cut sharply against a pale sky. I arrived early, before the tour buses, before the sun. Just me, the wind, and the sound of waves rolling stones like distant thunder. I set up my tripod behind a natural basalt alcove and waited. When the sky finally lit with that elusive Icelandic pink and gold, the rocks glowed as if from within. It wasn't dramatic. It was subtle. And that made it unforgettable.\n\nFurther east, I spent a dusk hour at Jokulsarlon, the glacial lagoon. Icebergs floated silently past like sleeping giants. One broke apart in front of me, a slow motion crash that sent ripples through the mirrored water. Seals appeared, curious but cautious. I remember holding my breath as I clicked the shutter. Not because of the shot, but because some moments feel too sacred for sound.\n\nThe southern coast isn't postcard pretty. It is wilder than that. It shifts. It hums. And it reminds you that the world is still capable of surprising us, if we're willing to watch, wait, and witness.\n\nI didn't come home with perfect photos. But I came back with something better: images that feel. And in the end, that's what landscape photography is really about.",
  coverImage: "https://res.cloudinary.com/dnafz7ugo/image/upload/v1743184274/x82trmk7i9vy6pqnol2o.jpg",
  date: "2025-03-28T17:55:51.767Z",
  author: "@mybarelands"
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