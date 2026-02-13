export interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  description: string;
  email: string;
  website?: string;
  linkedin?: string;
}

// Active people (alphabetical by last name), per user's specified list
export const activeMembers: TeamMember[] = [
  {
    name: "Praneeth Chakravarthula",
    role: "Assistant Professor",
    image: "/people/praneeth.jpeg",
    bio: "Computational imaging, AR/VR, nano-optics, human-computer interaction",
    description:
      "Dr. Chakravarthula leads research in computational imaging and visual computing. His work focuses on developing novel optical systems and algorithms for next-generation displays, cameras, and human-computer interaction. He has made significant contributions to the fields of holographic displays, computational cameras, and augmented reality.",
    email: "cpk@cs.unc.edu",
    website: "https://www.cs.unc.edu/~cpk/",
  },
  {
    name: "Henry Fuchs",
    role: "Federico Gil Distinguished Professor",
    image: "/people/henry-fuchs.jpg",
    bio: "Computer graphics, virtual reality, telepresence, 3D reconstruction",
    description:
      "Prof. Fuchs is one of the pioneers of computer graphics and virtual reality research. He has been at UNC since 1978, leading groundbreaking work on Pixel-Planes, Office of the Future, and telepresence systems.",
    email: "fuchs@cs.unc.edu",
    website: "https://henryfuchs.web.unc.edu/",
  },
  {
    name: "Adrian Ilie",
    role: "Senior Research Scientist",
    image: "/people/adrian-ilie.jpg",
    bio: "3D reconstruction, image-based rendering, visual computing systems",
    description:
      "Dr. Ilie is a Senior Research Scientist specializing in 3D reconstruction and image-based rendering techniques.",
    email: "adyilie@cs.unc.edu",
    website: "http://www.cs.unc.edu/~adyilie/index.htm",
  },
  {
    name: "Jade Kandel",
    role: "Graduate Student",
    image: "/people/jade-kandel.jpg",
    bio: "Visual computing, digital art, computer graphics",
    description:
      "Jade is a graduate student working at the intersection of visual computing and digital art.",
    email: "jadekandel@gmail.com",
    website: "https://jadekandel.wixsite.com/jadesart",
  },
  {
    name: "Kurtis Keller",
    role: "Research Associate and Engineer",
    image: "/people/kurtis-keller.jpg",
    bio: "Applied engineering lab, hardware systems, visual computing infrastructure",
    description:
      "Kurtis is a Research Associate and Engineer in the Applied Engineering Lab, supporting hardware and systems for visual computing research.",
    email: "keller@cs.unc.edu",
    website: "https://www.cs.unc.edu/~keller/",
  },
  {
    name: "Jayden Lim",
    role: "Undergraduate Student",
    image: "/people/jayden-lim.png",
    bio: "Visual computing, research engineering",
    description:
      "Jayden is an undergraduate student contributing to visual computing research projects.",
    email: "jaylim@unc.edu",
  },
  {
    name: "Jim Mahaney",
    role: "Lab Manager",
    image: "/people/jim-mahaney.jpg",
    bio: "Lab operations, equipment management, research support",
    description:
      "Jim manages the lab facilities and supports the day-to-day operations of the research group.",
    email: "mahaney@cs.unc.edu",
  },
  {
    name: "Ashley Neall",
    role: "Undergraduate Student",
    image: "/people/ashley-neall.jpg",
    bio: "Visual computing, research engineering",
    description:
      "Ashley is an undergraduate student working on visual computing research projects.",
    email: "aneall@unc.edu",
    website: "https://aneall.github.io/",
  },
  {
    name: "Andrei State",
    role: "Senior Research Scientist",
    image: "/people/andrei-state.jpg",
    bio: "Augmented reality, 3D tracking, near-eye displays, medical applications",
    description:
      "Dr. State is a Senior Research Scientist in Graphics with extensive experience in augmented reality, tracking, and medical visualization systems.",
    email: "andrei@cs.unc.edu",
    website: "http://www.cs.unc.edu/~andrei/",
  },
  {
    name: "Pranav Wagh",
    role: "Undergraduate Student",
    image: "/people/pranav-wagh.jpg",
    bio: "Visual computing, research engineering",
    description:
      "Pranav is an undergraduate student contributing to research in visual computing.",
    email: "pawagh@unc.edu",
  },
  {
    name: "Qian Zhang",
    role: "Graduate Student",
    image: "/people/qian-zhang.jpg",
    bio: "3D reconstruction, telepresence, visual computing",
    description:
      "Qian is a graduate student working on 3D reconstruction and telepresence systems.",
    email: "qzane@cs.unc.edu",
    website: "https://www.qzane.com/",
  },
];
