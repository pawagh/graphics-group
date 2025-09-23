import fs from 'fs';
import path from 'path';

export interface WebsiteContent {
  homepage: {
    aboutUs: string;
    labName: string;
    contactEmail: string;
    heroTitle: string;
    heroSubtitle: string;
  };
  footer: {
    address: string;
    university: string;
    email: string;
    socialLinks: {
      twitter: string;
      linkedin: string;
      instagram: string;
      github: string;
    };
  };
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
}

const CONTENT_FILE_PATH = path.join(process.cwd(), 'src/data/content.json');

export async function getWebsiteContent(): Promise<WebsiteContent> {
  try {
    const fileContent = fs.readFileSync(CONTENT_FILE_PATH, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error reading website content:', error);
    // Return default content if file doesn't exist
    return getDefaultContent();
  }
}

export async function updateWebsiteContent(updates: Partial<WebsiteContent>): Promise<boolean> {
  try {
    const currentContent = await getWebsiteContent();
    const updatedContent = { ...currentContent, ...updates };
    
    fs.writeFileSync(CONTENT_FILE_PATH, JSON.stringify(updatedContent, null, 2));
    return true;
  } catch (error) {
    console.error('Error updating website content:', error);
    return false;
  }
}

export async function updateHomepageContent(updates: Partial<WebsiteContent['homepage']>): Promise<boolean> {
  try {
    const currentContent = await getWebsiteContent();
    const updatedContent = {
      ...currentContent,
      homepage: { ...currentContent.homepage, ...updates }
    };
    
    fs.writeFileSync(CONTENT_FILE_PATH, JSON.stringify(updatedContent, null, 2));
    return true;
  } catch (error) {
    console.error('Error updating homepage content:', error);
    return false;
  }
}

function getDefaultContent(): WebsiteContent {
  return {
    homepage: {
      aboutUs: "Welcome to the Visual Computing and Augmented Intelligence Lab at UNC Chapel Hill. Our team is dedicated to advancing research in computational imaging, visual perception, and AI-driven solutions. We collaborate across disciplines to create transformative technologies that redefine the future of visual computing.",
      labName: "Visual Computing and Augmented Intelligence Lab",
      contactEmail: "cpk@cs.unc.edu",
      heroTitle: "VISUAL COMPUTING AND AUGMENTED INTELLIGENCE LAB",
      heroSubtitle: "Advancing the frontiers of computational imaging, AR/VR, and augmented intelligence"
    },
    footer: {
      address: "Sitterson 205",
      university: "University of North Carolina at Chapel Hill",
      email: "cpk@cs.unc.edu",
      socialLinks: {
        twitter: "https://x.com/unc_vcail",
        linkedin: "https://www.linkedin.com/company/unc-vcail",
        instagram: "https://www.instagram.com/unc_vcail",
        github: "https://github.com/unc-vcail"
      }
    },
    meta: {
      title: "Visual Computing and Augmented Intelligence Lab | UNC Chapel Hill",
      description: "The Visual Computing and Augmented Intelligence Lab at UNC Chapel Hill advances research in computational imaging, computer vision, AR/VR, nano-optics, and AI-driven solutions.",
      keywords: "visual computing, augmented intelligence, UNC, Chapel Hill, computational imaging, computer vision, AR, VR, nano-optics, research, Praneeth Chakravarthula"
    }
  };
}
