import labConfig from '../../lab.config.json';

export interface LabConfig {
  lab: {
    name: string;
    shortName: string;
    university: string;
    department: string;
    description: string;
    logoPath: string;
    contactEmail: string;
  };
  pi: {
    name: string;
    title: string;
    email: string;
    photoPath: string;
    bio: string;
    website: string;
    googleScholar: string;
  };
  deployment: {
    siteUrl: string;
    vercelProjectName: string;
  };
  semanticScholar: {
    authorIds: Array<{ name: string; id: string; startYear: number }>;
    defaultStartYear: number;
  };
  social: {
    twitter: string;
    github: string;
    googleScholar: string;
    linkedin?: string;
    instagram?: string;
  };
  theme: {
    primaryColor: string;
    navyColor: string;
    accentColor: string;
    lightGray: string;
    white: string;
  };
}

export const config: LabConfig = labConfig as LabConfig;
