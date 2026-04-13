export interface Person {
  id: string;
  name: string;
  role: 'faculty' | 'phd' | 'ms' | 'undergrad' | 'postdoc' | 'alumni' | 'visitor';
  title: string;
  email: string;
  photoPath: string;
  bio: string;
  website: string;
  googleScholar: string;
  github: string;
  twitter: string;
  interests: string[];
  alumniYear?: number;
  alumniPosition?: string;
}

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  year: number;
  venue: string;
  abstract: string;
  pdfPath: string;
  pdfUrl: string;
  doi: string;
  semanticScholarId: string;
  bibtex: string;
  keyContributions: string;
  tags: string[];
  featured: boolean;
}

export interface ResearchProject {
  id: string;
  title: string;
  description: string;
  imagePath: string;
  tags: string[];
  publicationIds: string[];
  active: boolean;
  order: number;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  summary: string;
  link: string;
  type: 'award' | 'paper' | 'talk' | 'media' | 'hiring' | 'other';
}
