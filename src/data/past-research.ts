export interface PastResearchProject {
  title: string;
  slug: string;
  description: string;
  image?: string; // Optional - some projects may not have images readily available
  externalLink?: string; // Link to original project page if available
}

export const pastResearchProjects: PastResearchProject[] = [
  {
    title: "Dynamic Focus Augmented Reality Display",
    slug: "dynamic-focus-ar",
    description:
      "Tackled fundamental limitations of existing near-eye displays for augmented reality, including limited field of view, low angular resolution, and fixed accommodative state. Proposed a new hybrid hardware design for NEDs using see-through deformable membrane mirrors to address the Vergence-Accommodation Conflict.",
    externalLink: "https://telepresence.web.unc.edu/research/dynamic-focus-augmented-reality-display/",
  },
  {
    title: "Immersive Learning from 3D Reconstruction of Dynamic Scenes",
    slug: "3d-reconstruction-dynamic",
    description:
      "Investigated 3D reconstruction of room-sized dynamic scenes containing moving humans and objects with significantly higher quality and fidelity than previously possible. Enabled immersive learning of rare and important situations through post-event, annotated, guided virtual reality experiences such as emergency medical procedures.",
    externalLink: "https://telepresence.web.unc.edu/research/3dreconstructiondynamic/",
  },
  {
    title: "Low Latency Display",
    slug: "low-latency-display",
    description:
      "Developed a low latency tracking and display system suitable for ultra-low latency, optical see-through, augmented reality head-mounted displays. The display ran at a very high frame rate, performing in-display corrections on supplied imagery to account for the latest tracking information.",
    externalLink: "https://telepresence.web.unc.edu/research/low-latency-displays/",
  },
  {
    title: "Pinlight Display",
    slug: "pinlight-display",
    description:
      "Presented a novel design for an optical see-through augmented reality display offering a wide field of view in a compact form factor approaching ordinary eyeglasses. Demonstrated a real-time prototype display with a 110-degree diagonal field of view.",
  },
  {
    title: "Office of the Future",
    slug: "office-of-the-future",
    description:
      "Combined computer vision and computer graphics for panoramic image display, tiled display systems, image-based modeling, and immersive environments. Goals included a better everyday graphical display environment and 3D tele-immersion capabilities allowing distant people to share a virtual office space.",
    externalLink: "http://www.cs.unc.edu/Research/ootf/",
  },
  {
    title: "3D Telepresence for Medical Consultation",
    slug: "3d-telepresence-medical",
    description:
      "Developed and tested 3D telepresence technologies for remote medical consultations between an advising healthcare provider and a distant advisee. Focused on real-time acquisition and novel view generation, network congestion handling, and tracking and displays for producing accurate 3D depth cues and motion parallax.",
    externalLink: "http://www.cs.unc.edu/Research/nlm/research.html",
  },
  {
    title: "Wall-to-Wall Telepresence",
    slug: "wall-to-wall-telepresence",
    description:
      "Enabled visualization of large 3D models on a multi-screen 2D display for telepresence applications. Experimented with large datasets such as reconstructed models of the Roman Colosseum and dense indoor room models, finding the visualization convincing for single users.",
  },
  {
    title: "Multi-view Teleconferencing",
    slug: "multi-view-teleconferencing",
    description:
      "Developed a two-site teleconferencing system supporting multiple people at each site while maintaining gaze awareness among all participants, providing unique views of the remote sites to each local participant.",
  },
  {
    title: "Avatar Telepresence",
    slug: "avatar",
    description:
      "Developed a one-to-many teleconferencing system in which a user inhabits an animatronic shader lamps avatar at a remote site, allowing the user to maintain gaze awareness with people at the remote location.",
  },
  {
    title: "Ultrasound / Medical Augmented Reality",
    slug: "ultrasound-medical-ar",
    description:
      "Developed a system allowing physicians to see directly inside a patient using augmented reality. Combined ultrasound echography imaging, laparoscopic range imaging, video see-through head-mounted displays, and high-performance graphics to create merged real and synthetic images.",
    externalLink: "http://www.cs.unc.edu/Research/us/",
  },
  {
    title: "Pixel-Planes & PixelFlow",
    slug: "pixel-planes",
    description:
      "Explored computer architectures for 3D graphics offering dramatically higher performance with wide flexibility since 1980. Provided useful systems for researchers in medical visualization, molecular modeling, and architectural design exploration requiring graphics power far beyond commercially available systems.",
    externalLink: "http://www.cs.unc.edu/~pxfl/",
  },
  {
    title: "Telecollaboration",
    slug: "telecollaboration",
    description:
      "Developed a distributed collaborative design and prototyping environment where researchers at geographically distributed sites could work together in real time. Embraced both desktop and immersive VR environments with shared virtual environments, collaborative VR, modeling and interaction, scene acquisition, and wide field of view tracking.",
    externalLink: "http://cs.brown.edu/stc/resea/telecollaboration/overview_telecollaboration.html",
  },
  {
    title: "Image-Based Rendering",
    slug: "image-based-rendering",
    description:
      "Investigated representing complex 3D environments with sets of depth-enhanced images rather than geometric primitives. Developed algorithms for processing depth-enhanced images to produce new images from arbitrary viewpoints not included in the original image set.",
    externalLink: "http://www.cs.unc.edu/~ibr/",
  },
  {
    title: "Wide-Area Tracking",
    slug: "wide-area-tracking",
    description:
      "Developed wide-area systems for 6D tracking of heads, limbs, and hand-held devices for head-mounted and head-tracked stereoscopic displays, providing users with the impression of being immersed in a simulated three-dimensional environment.",
  },
  {
    title: "Wide Area Visuals with Projectors",
    slug: "wide-area-visuals",
    description:
      "Developed a robust multi-projector display and rendering system that was portable and rapidly deployable in geometrically complex display environments. Achieved seamless geometric and photometric image projection with continuous self-calibration using pan-tilt-zoom cameras.",
    externalLink: "http://www.cs.unc.edu/Research/stc/Projects/wav.html",
  },
  {
    title: "3D Laparoscopic Visualization",
    slug: "3d-laparoscopic",
    description:
      "Designed and prototyped a three-dimensional visualization system to assist with laparoscopic surgical procedures. Combined 3D visualization, depth extraction from laparoscopic images, and six degree-of-freedom tracking to display merged real and synthetic imagery in a surgeon's video-see-through head-mounted display.",
    externalLink: "http://www.cs.unc.edu/Research/us/laparo.html",
  },
  {
    title: "Desktop 3D Telepresence",
    slug: "desktop-3d-telepresence",
    description:
      "Research into desktop-based 3D telepresence systems enabling remote collaboration with realistic depth cues and spatial awareness.",
  },
  {
    title: "Egocentric Body Pose Tracking",
    slug: "egocentric-body-pose",
    description:
      "Developed techniques for tracking body pose from an egocentric (first-person) perspective, with applications in virtual reality and human-computer interaction.",
  },
  {
    title: "Eye Tracking with 3D Pupil Localization",
    slug: "eye-tracking-3d",
    description:
      "Advanced eye tracking methods using 3D pupil localization for improved accuracy in gaze estimation and near-eye display applications.",
  },
  {
    title: "Holographic Near-Eye Display",
    slug: "holographic-near-eye",
    description:
      "Research into holographic techniques for near-eye displays, enabling more natural and comfortable augmented reality experiences with proper focus cues.",
  },
  {
    title: "Novel View Rendering using Neural Networks",
    slug: "novel-view-neural",
    description:
      "Explored the use of neural networks for generating novel viewpoints of scenes, combining deep learning with traditional rendering techniques for high-quality view synthesis.",
  },
];
