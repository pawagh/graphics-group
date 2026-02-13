export interface Publication {
  title: string;
  slug: string;
  authors: string;
  meta: string;
  image: string;
  link: string;
  tags: string[];
}

export const publications: Publication[] = [
  {
    title: "Beating bandwidth limits for large aperture broadband nano-optics",
    slug: "beating-bandwidth-limits-for-large-aperture-broadband-nano-optics",
    authors:
      "Johannes E Fröch*, Praneeth Chakravarthula*, Jipeng Sun, Ethan Tseng, Shane Colburn, Alan Zhan, Forrest Miller, Anna Wirth-Singh, Quentin AA Tanguy, Zheyi Han, Karl F Böhringer, Felix Heide, Arka Majumdar",
    meta: "Nature Communications 2025",
    image: "/publication-photos/1cm-metalens.PNG",
    link: "https://www.nature.com/articles/s41467-025-58208-4",
    tags: ["Journal", "Nature Communications", "2025"]
  },
  {
    title:
      "DOF-GS: Adjustable Depth-of-Field 3D Gaussian Splatting for Post-Capture Refocusing, Defocus Rendering and Blur Removal",
    slug: "dof-gs-adjustable-depth-of-field-3d-gaussian-splatting-for-post-capture-refocusing-defocus-rendering-and-blur-removal",
    authors: "Yujie Wang, Baoquan Chen*, Praneeth Chakravarthula*",
    meta: "CVPR 2025",
    image: "/publication-photos/dof-gs.PNG",
    link: "https://arxiv.org/abs/2405.17351",
    tags: ["Conference", "CVPR", "2025"]
  },
  {
    title:
      "Event fields: Capturing light fields at high speed, resolution, and dynamic range",
    slug: "event-fields-capturing-light-fields-at-high-speed-resolution-and-dynamic-range",
    authors:
      "Ziyuan Qu, Zihao Zou, Vivek Boominathan, Praneeth Chakravarthula, Adithya Pediredla",
    meta: "CVPR 2025",
    image: "/publication-photos/eventfield.png",
    link: "https://arxiv.org/abs/2412.06191",
    tags: ["Conference", "CVPR", "2025"]
  },
  {
    title: "Present and Future of Everyday-use Augmented Reality Eyeglasses",
    slug: "present-and-future-of-everyday-use-augmented-reality-eyeglasses",
    authors: "Praneeth Chakravarthula",
    meta: "IEEE Computer Graphics and Applications 2025",
    image: "/publication-photos/diss-impact.PNG",
    link: "https://www.cs.unc.edu/~cpk/data/papers/IEEE_Dissertation_Impact.pdf",
    tags: ["Journal", "IEEE CG&A", "2025"]
  },
  {
    title:
      "Multimodal Neural Acoustic Fields for Immersive Virtual Reality and Telepresence",
    slug: "multimodal-neural-acoustic-fields-for-immersive-virtual-reality-and-telepresence",
    authors:
      "Guansen Tong, Jonathan Leung, Haosheng Shi, Liujie Zheng, Shengze Wang, Xi Peng, Grace Fei, Praneeth Chakravarthula",
    meta: "Best Paper Honorable Mention, IEEE VR (TVCG) 2025",
    image: "/publication-photos/neural-acoustic-fields.PNG",
    link: "https://www.cs.unc.edu/~cpk/data/papers/Neural_acoustic_fields.pdf",
    tags: ["Conference", "IEEE VR", "2025"]
  },
  {
    title: "Perceptually-Guided Acoustic Foveation",
    slug: "perceptually-guided-acoustic-foveation",
    authors:
      "Xi Peng, Kenneth Chen, Iran Roman, Juan Pablo Bello, Qi Sun*, Praneeth Chakravarthula*",
    meta: "IEEE VR 2025",
    image: "/publication-photos/acoustic-foveation.PNG",
    link: "https://www.cs.unc.edu/~cpk/data/papers/Perceptually_Guided_Acoustic_Foveation.pdf",
    tags: ["Conference", "IEEE VR", "2025"]
  },
  {
    title: "FlatTrack: Eye-tracking with ultra-thin lensless cameras",
    slug: "flattrack-eye-tracking-with-ultra-thin-lensless-cameras",
    authors:
      "Purvam Jain, Althaf M. Nazar, Salman S. Khan, Kaushik Mitra, Praneeth Chakravarthula",
    meta: "Best Paper Award, GMCV & WACV 2025",
    image: "/publication-photos/flat-track.PNG",
    link: "https://arxiv.org/abs/2501.15450",
    tags: ["Conference", "WACV", "2025"]
  },
  {
    title: "Spatially Varying Nanophotonic Neural Networks",
    slug: "spatially-varying-nanophotonic-neural-networks",
    authors:
      "Kaixuan Wei*, Xiao Li*, Johannes Froech*, Praneeth Chakravarthula, James Whitehead, Ethan Tseng, Arka Majumdar, Felix Heide",
    meta: "Science Advances 2024",
    image: "/publication-photos/SVONN.jpeg",
    link: "https://light.princeton.edu/publication/svn3/",
    tags: ["Journal", "Science Advances", "2024"]
  },
  {
    title:
      "End-to-End Hybrid Refractive-Diffractive Lens Design with Differentiable Ray-Wave Model",
    slug: "end-to-end-hybrid-refractive-diffractive-lens-design-with-differentiable-ray-wave-model",
    authors:
      "Xinge Yang, Matheus Souza, Kunyi Wang, Praneeth Chakravarthula, Qiang Fu, Wolfgang Heidrich",
    meta: "SIGGRAPH Asia 2024",
    image: "/publication-photos/hybrid-optic.PNG",
    link: "https://vccimaging.org/Publications/Yang2024HybridLens/",
    tags: ["Conference", "SIGGRAPH Asia", "2024"]
  },
  {
    title:
      "Cross-Domain Synthetic-to-Real In-the-Wild Depth and Normal Estimation for 3D Scene Understanding",
    slug: "cross-domain-synthetic-to-real-in-the-wild-depth-and-normal-estimation-for-3d-scene-understanding",
    authors: "Jay Bhanushali, Manivannan Muniyandi, Praneeth Chakravarthula",
    meta: "Best Paper Award, OmniCV & CVPR 2024",
    image: "/publication-photos/road2code.PNG",
    link: "#",
    tags: ["Conference", "CVPR", "2024"]
  },
  {
    title:
      "Neural Etendue Expander for Ultra-Wide-Angle High-Fidelity Holographic Display",
    slug: "neural-etendue-expander-for-ultra-wide-angle-high-fidelity-holographic-display",
    authors:
      "Ethan Tseng, Seung-Hwan Baek, Grace Kuo, Nathan Matsuda, Andrew Maimone, Praneeth Chakravarthula, Qiang Fu, Wolfgang Heidrich, Douglas Lanman, Felix Heide",
    meta: "Nature Communications 2024",
    image: "/publication-photos/neural-etendue.PNG",
    link: "#",
    tags: ["Journal", "Nature Communications", "2024"]
  },
  {
    title:
      "Point Spread Function-inspired Deformable Convolutional Network for Holographic Displays",
    slug: "point-spread-function-inspired-deformable-convolutional-network-for-holographic-displays",
    authors:
      "Mi Zhou, Shuming Jiao, Praneeth Chakravarthula, Yang Yue, Ping Su, Ercan Engin Kuruoglu, Zihan Geng",
    meta: "SPIE 2024",
    image: "/publication-photos/deformable-psf-holo.PNG",
    link: "#",
    tags: ["Conference", "SPIE", "2024"]
  },
  {
    title: "Thin On-Sensor Nanophotonic Array Cameras",
    slug: "thin-on-sensor-nanophotonic-array-cameras",
    authors:
      "Praneeth Chakravarthula, Jipeng Sun, Xiao Li, Chenyang Lei, Gene Chou, Mario Bijelic, Johannes Froesch, Arka Majumdar, Felix Heide",
    meta: "SIGGRAPH Asia 2023",
    image: "/publication-photos/metalens-array.png",
    link: "#",
    tags: ["Conference", "SIGGRAPH Asia", "2023"]
  },
  {
    title:
      "Seeing with Sound: Long-Range Acoustic Beamforming for Automotive Scene Understanding",
    slug: "seeing-with-sound-long-range-acoustic-beamforming-for-automotive-scene-understanding",
    authors:
      "Praneeth Chakravarthula, Jim Aldon D'Souza, Ethan Tseng, Joe Bartusek, Felix Heide",
    meta: "CVPR 2023",
    image: "/publication-photos/sound.png",
    link: "#",
    tags: ["Conference", "CVPR", "2023"]
  },
  {
    title: "Stochastic Light Field Holography",
    slug: "stochastic-light-field-holography",
    authors:
      "Florian Schiffers, Praneeth Chakravarthula, Nathan Matsuda, Grace Kuo, Ethan Tseng, Douglas Lanman, Felix Heide, Oliver Cossairt",
    meta: "ICCP 2023",
    image: "/publication-photos/stochastic-LF.PNG",
    link: "#",
    tags: ["Conference", "ICCP", "2023"]
  },
  {
    title:
      "End-to-End Compression-Aware Computer-Generated Holography",
    slug: "end-to-end-compression-aware-computer-generated-holography",
    authors:
      "Mi Zhou, Hao Zhang, Shuming Jiao, Praneeth Chakravarthula, Zihan Geng",
    meta: "Optics Express 2023",
    image: "/publication-photos/holo-compress.png",
    link: "#",
    tags: ["Journal", "Optics Express", "2023"]
  },
  {
    title: "Hexagonal Diffractive Optical Elements",
    slug: "hexagonal-diffractive-optical-elements",
    authors:
      "Yidan Zheng, Qiang Fu, Hadi Amata, Praneeth Chakravarthula, Felix Heide, Wolfgang Heidrich",
    meta: "Optics Express 2023",
    image: "/publication-photos/hexdoe.PNG",
    link: "#",
    tags: ["Journal", "Optics Express", "2023"]
  },
  {
    title:
      "ChromaCorrect: Prescription Correction in Virtual Reality Headsets through Perceptual Guidance",
    slug: "chromacorrect-prescription-correction-in-virtual-reality-headsets-through-perceptual-guidance",
    authors: "Ahmet Guzel, Jeanne Beyazian, Praneeth Chakravarthula, Kaan Aksit",
    meta: "Biomedical Optics Express 2023",
    image: "/publication-photos/chromacorrect.PNG",
    link: "#",
    tags: ["Journal", "Biomedical Optics Express", "2023"]
  },
  {
    title:
      "Visual perception of noise in a simulated holographic display – a user study",
    slug: "visual-perception-of-noise-in-a-simulated-holographic-display-a-user-study",
    authors:
      "Andreas Georgiou, Joel Kollin, Charlie Hewitt, Praneeth Chakravarthula, Brian Guenter",
    meta: "Elsevier Displays 2022",
    image: "/publication-photos/speed-perception.PNG",
    link: "#",
    tags: ["Journal", "Elsevier Displays", "2022"]
  },
  {
    title: "Pupil-aware Holography",
    slug: "pupil-aware-holography",
    authors:
      "Praneeth Chakravarthula, Seung-Hwan Baek, Florian Schiffers, Ethan Tseng, Grace Kuo, Andrew Maimone, Nathan Matsuda, Oliver Cossairt, Douglas Lanman, Felix Heide",
    meta: "Spotlight Poster ICCP 2022, SIGGRAPH Asia 2022",
    image: "/publication-photos/pupil-holography.png",
    link: "#",
    tags: ["Conference", "SIGGRAPH Asia", "2022"]
  },
  {
    title: "FoV-NeRF: Foveated Neural Radiance Fields for Virtual Reality",
    slug: "fov-nerf-foveated-neural-radiance-fields-for-virtual-reality",
    authors:
      "Nianchen Deng, Zhenyi He, Jiannan Ye, Budmonde Duinkharjav, Praneeth Chakravarthula, Xubo Yang, Qi Sun",
    meta: "Best Paper Award, IEEE TVCG 2022",
    image: "/publication-photos/fovnerf.jpg",
    link: "#",
    tags: ["Conference", "IEEE TVCG", "2022"]
  },
  {
    title:
      "Neural 3D Gaze: 3D Pupil Localization and Gaze Tracking based on Anatomical Eye Model and Neural Refraction Correction",
    slug: "neural-3d-gaze-3d-pupil-localization-and-gaze-tracking-based-on-anatomical-eye-model-and-neural-refraction-correction",
    authors:
      "Conny Lu, Praneeth Chakravarthula, Kaihao Liu, Xixiang Liu, Siyuan Li, Henry Fuchs",
    meta: "ISMAR 2022",
    image: "/publication-photos/ntu-ismar-2019.png",
    link: "#",
    tags: ["Conference", "ISMAR", "2022"]
  },
  {
    title:
      "Image Features Influence Reaction Time: A Learned Probabilistic Perceptual Model for Saccade Latency",
    slug: "image-features-influence-reaction-time-a-learned-probabilistic-perceptual-model-for-saccade-latency",
    authors:
      "Budmonde Duinkharjav, Praneeth Chakravarthula, Rachel Albert, Anjul Patney, Qi Sun",
    meta: "Best Paper Award, SIGGRAPH 2022",
    image: "/publication-photos/saccade-reaction.png",
    link: "#",
    tags: ["Conference", "SIGGRAPH", "2022"]
  },
  {
    title: "Hogel-free Holography",
    slug: "hogel-free-holography",
    authors:
      "Praneeth Chakravarthula, Ethan Tseng, Henry Fuchs, Felix Heide",
    meta: "SIGGRAPH 2022",
    image: "/publication-photos/hogel-free.png",
    link: "#",
    tags: ["Conference", "SIGGRAPH", "2022"]
  },
  {
    title:
      "Joint Neural Phase Retrieval and Compression for Energy- and Computation-Efficient Holography on the Edge",
    slug: "joint-neural-phase-retrieval-and-compression-for-energy-and-computation-efficient-holography-on-the-edge",
    authors:
      "Yujie Wang*, Praneeth Chakravarthula*, Qi Sun, Baoquan Chen",
    meta: "Best Paper Honorable Mention, SIGGRAPH 2022",
    image: "/publication-photos/jpeg_comp_holo.PNG",
    link: "#",
    tags: ["Conference", "SIGGRAPH", "2022"]
  },
  {
    title: "Seeing Through Obstructions with Diffractive Cloaking",
    slug: "seeing-through-obstructions-with-diffractive-cloaking",
    authors:
      "Zheng Shi, Yuval Bahat, Seung-Hwan Baek, Qiang Fu, Hadi Amata, Xiao Li, Praneeth Chakravarthula, Wolfgang Heidrich, Felix Heide",
    meta: "SIGGRAPH 2022",
    image: "/publication-photos/obstruction-free.png",
    link: "#",
    tags: ["Conference", "SIGGRAPH", "2022"]
  },
  {
    title: "Towards Everyday-use Augmented Reality Eyeglasses",
    slug: "towards-everyday-use-augmented-reality-eyeglasses",
    authors: "Praneeth Chakravarthula",
    meta: "IEEE VR Best Dissertation Award, Ph.D. Dissertation 2021",
    image: "/publication-photos/thesis.png",
    link: "#",
    tags: ["Dissertation", "2021"]
  },
  {
    title:
      "Gaze-contingent Retinal Speckle Suppression for Perceptually-Matched Foveated Holographic Displays",
    slug: "gaze-contingent-retinal-speckle-suppression-for-perceptually-matched-foveated-holographic-displays",
    authors:
      "Praneeth Chakravarthula, Zhan Zhang, Okan Tursun, Piotr Didyk, Qi Sun, Henry Fuchs",
    meta: "IEEE TVCG 2021",
    image: "/publication-photos/fov-speckle.jpg",
    link: "#",
    tags: ["Conference", "IEEE TVCG", "2021"]
  },
  {
    title:
      "Learned Hardware-in-the-loop Phase Retrieval for Holographic Near-Eye Displays",
    slug: "learned-hardware-in-the-loop-phase-retrieval-for-holographic-near-eye-displays",
    authors:
      "Praneeth Chakravarthula, Ethan Tseng, Tarun Srivastava, Henry Fuchs, Felix Heide",
    meta: "SIGGRAPH Asia 2020",
    image: "/publication-photos/hil-sigasia-2020.jpg",
    link: "#",
    tags: ["Conference", "SIGGRAPH Asia", "2020"]
  },
  {
    title:
      "DeepCGH: 3D Computer-Generated Holography Using Deep Learning",
    slug: "deepcgh-3d-computer-generated-holography-using-deep-learning",
    authors:
      "M. Hossein Eybposh, Nicholas W. Caira, Mathew Atisa, Praneeth Chakravarthula, Nicolas C. Pégard",
    meta: "Best Paper Award, Optics Express 2020",
    image: "/publication-photos/deepcgh-2020.png",
    link: "#",
    tags: ["Journal", "Optics Express", "2020"]
  },
  {
    title:
      "Improved vergence and accommodation via Purkinje Image tracking with multiple cameras for AR eyeglasses",
    slug: "improved-vergence-and-accommodation-via-purkinje-image-tracking-with-multiple-cameras-for-ar-eyeglasses",
    authors:
      "Xinran Lu, Praneeth Chakravarthula, Yujie Tao, Steven Chen, Henry Fuchs",
    meta: "ISMAR 2020",
    image: "/publication-photos/purkinje-tracker-ismar-2020.png",
    link: "#",
    tags: ["Conference", "ISMAR", "2020"]
  },
  {
    title:
      "Towards Eyeglasses-style Holographic Near-eye Displays with Statically Expanded Eyebox",
    slug: "towards-eyeglasses-style-holographic-near-eye-displays-with-statically-expanded-eyebox",
    authors:
      "Xinxing Xia, Yunqing Guan, Andrei State, Praneeth Chakravarthula, Tat-Jen Cham, Henry Fuchs",
    meta: "ISMAR 2020",
    image: "/publication-photos/eyebox-exp-ismar-2020.png",
    link: "#",
    tags: ["Conference", "ISMAR", "2020"]
  },
  {
    title:
      "Computing high-quality phase-only holograms for holographic displays",
    slug: "computing-high-quality-phase-only-holograms-for-holographic-displays",
    authors:
      "Praneeth Chakravarthula, Yifan Peng, Joel Kollin, Felix Heide, Henry Fuchs",
    meta: "Optical Design Award, SPIE Photonics West 2020",
    image: "/publication-photos/spie-2020-holo.PNG",
    link: "#",
    tags: ["Conference", "SPIE", "2020"]
  },
  {
    title: "Wirtinger Holography for Near-Eye Displays",
    slug: "wirtinger-holography-for-near-eye-displays",
    authors:
      "Praneeth Chakravarthula, Yifan Peng, Joel Kollin, Henry Fuchs, Felix Heide",
    meta: "SIGGRAPH Asia 2019", 
    image: "/publication-photos/wirt-holo.jpg",
    link: "#",
    tags: ["Conference", "SIGGRAPH Asia", "2019"]
  },
  {
    title:
      "Towards a Switchable AR/VR Near-eye Display with Accommodation-Vergence and Eyeglass Prescription Support",
    slug: "towards-a-switchable-arvr-near-eye-display-with-accommodation-vergence-and-eyeglass-prescription-support",
    authors:
      "Xinxing Xia, Yunqing Guan, Andrei State, Praneeth Chakravarthula, Kishore Rathinavel, Tat-Jen Cham, Henry Fuchs",
    meta: "IEEE TVCG (presented at ISMAR 2019",
    image: "/publication-photos/apaned-vr-2019.PNG",
    link: "#",
    tags: ["Conference", "IEEE TVCG", "2019"]
  },
  {
    title: "Manufacturing Application Driven Near-Eye Displays",
    slug: "manufacturing-application-driven-near-eye-displays",
    authors:
      "Kaan Aksit, Praneeth Chakravarthula, Kishore Rathinavel, Youngmo Jeong, Rachel Albert, Henry Fuchs, David Luebke",
    meta: "Best Paper Nominee, IEEE TVCG (presented at IEEE VR 2019)",
    image: "/publication-photos/appned-etech.png",
    link: "#",
    tags: ["Conference", "IEEE TVCG", "2019"]
  },
  {
    title:
      "focusAR: Auto-focus Augmented Reality Eyeglasses for both Real World and Virtual Imagery",
    slug: "focusar-auto-focus-augmented-reality-eyeglasses-for-both-real-world-and-virtual-imagery",
    authors:
      "Praneeth Chakravarthula, David Dunn, Kaan Aksit, Henry Fuchs",
    meta: "Best Paper Award, Talk, IEEE TVCG (presented at SIGGRAPH Asia 2018, ISMAR 2018)",
    image: "/publication-photos/focusAR.PNG",
    link: "#",
    tags: ["Conference", "IEEE TVCG", "SIGGRAPH Asia", "2018"]
  },
  {
    title: "Steerable Application-Adaptive Near-Eye Displays",
    slug: "steerable-application-adaptive-near-eye-displays",
    authors:
      "Kishore Rathinavel, Praneeth Chakravarthula, Kaan Aksit, Josef Spjut, Ben Boudaoud, Turner Whitted, David Luebke, Henry Fuchs",
    meta: "Best in Show Award, SIGGRAPH 2018 Emerging Technologies",
    image: "/publication-photos/aosl.PNG",
    link: "#",
    tags: ["Conference", "SIGGRAPH", "2018"]
  },
  {
    title:
      "Mitigating vergence-accommodation conflict for near-eye displays via deformable beamsplitters",
    slug: "mitigating-vergence-accommodation-conflict-for-near-eye-displays-via-deformable-beamsplitters",
    authors: "David Dunn, Praneeth Chakravarthula, Qian Dong, Henry Fuchs",
    meta: "Best Optical Design Award, SPIE Digital Optics for Immersive Displays 2018",
    image: "/publication-photos/spie-vac-2018.PNG",
    link: "#",
    tags: ["Conference", "SPIE", "2018"]
  },
  {
    title:
      "Towards Varifocal Augmented Reality Displays using Deformable Beamsplitter Membranes",
    slug: "towards-varifocal-augmented-reality-displays-using-deformable-beamsplitter-membranes",
    authors:
      "David Dunn, Praneeth Chakravarthula, Qian Dong, Kaan Aksit, Henry Fuchs",
    meta: "SID Display Week 2018",
    image: "/publication-photos/sid-2018.PNG",
    link: "#",
    tags: ["Conference", "SID Display Week", "2018"]
  },
  {
    title:
      "Penetra3D: A penetrable, interactive, 360-degree viewable display",
    slug: "penetra3d-a-penetrable-interactive-360-degree-viewable-display",
    authors: "Praneeth Chakravarthula, Pattie Maes",
    meta: "IEEE 3DUI 2015",
    image: "/publication-photos/penetra3d-2015.PNG",
    link: "#",
    tags: ["Conference", "IEEE 3DUI", "2015"]
  },
  {
    title:
      "Single access point based indoor localization technique for augmented reality gaming for children",
    slug: "single-access-point-based-indoor-localization-technique-for-augmented-reality-gaming-for-children",
    authors:
      "Praneeth Chakravarthula, Ravi Poovaiah, Ajanta Sen, Priya Ganadas",
    meta: "IEEE TechSym 2014",
    image: "/publication-photos/spunk-2014.PNG",
    link: "#",
    tags: ["Conference", "IEEE TechSym", "2014"]
  }
]; 