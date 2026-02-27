export interface Sermon {
  id: string;
  title: string;
  speaker: string;
  date: string;
  series?: string;
  slug: string;
  videoUrl?: string;
  audioUrl?: string;
  notes?: string;
  pdfUrl?: string;
  thumbnail?: string;
}

export interface ChurchEvent {
  id: string;
  title: string;
  date: string;
  endDate?: string;
  location: string;
  description: string;
  slug: string;
  image?: string;
  registrationEnabled: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  author: string;
  date: string;
  body: string;
  slug: string;
  featuredImage?: string;
  category: string;
  excerpt?: string;
}

export interface Staff {
  id: string;
  name: string;
  title: string;
  bio: string;
  photo?: string;
  email?: string;
}

export interface SmallGroup {
  id: string;
  name: string;
  leader: string;
  day: string;
  time: string;
  location: string;
  description: string;
  capacity: number;
  currentMembers: number;
}

export interface GalleryAlbum {
  id: string;
  title: string;
  date: string;
  photos: string[];
}

export interface Member {
  id: string;
  name: string;
  email: string;
  phone?: string;
  photo?: string;
  groups: string[];
  isApproved: boolean;
}

export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}
