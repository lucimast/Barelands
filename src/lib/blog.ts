export interface BlogPost {
  id: string;
  title: string;
  date: string;
  content: string;
  image?: string;
  tags: string[];
  featured: boolean;
  slug: string;
}

export const blogPosts: BlogPost[] = [
  {
  id: "1743100360040",
  title: "An Evening in Hamnoy",
  date: "2025-03-27",
  content: "Hamnoy is arguably the most charming village in Lofoten. Spending an evening there admiring the infinite sunset was a delight. Right beside the bridge that links it to neighbouring villages, I found these beautiful flowers. What better could I ask for as a foreground? A shame there were no clouds in the sky, but, hey, who can complain about such a beautiful day? ",
  image: "https://res.cloudinary.com/dnafz7ugo/image/upload/v1743100027/landscape-photos/evvp9auohwgqxjlv6jaj.jpg",
  tags: [
    "#Norway"
  ],
  featured: false,
  slug: "an-evening-in-hamnoy"
}
];
