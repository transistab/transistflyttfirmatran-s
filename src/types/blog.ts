export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  publishDate: string;
  readingTime: string;
  image: string;
  tags: string[];
  category: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
}