import React from 'react';
import Link from 'next/link';

export default function Publications() {
  const publications = [
    {
      title: "Beating bandwidth limits for large aperture broadband nano-optics",
      authors:
        "Johannes E Fröch*, Praneeth Chakravarthula*, Jipeng Sun, Ethan Tseng, Shane Colburn, Alan Zhan, Forrest Miller, Anna Wirth-Singh, Quentin AA Tanguy, Zheyi Han, Karl F Böhringer, Felix Heide, Arka Majumdar",
      meta: "Nature Communications 2025",
      image: "/images/beating-bandwidth-limits.png",
      link: "#"
    },
    {
      title:
        "DOF-GS: Adjustable Depth-of-Field 3D Gaussian Splatting for Post-Capture Refocusing, Defocus Rendering and Blur Removal",
      authors: "Yujie Wang, Baoquan Chen*, Praneeth Chakravarthula*",
      meta: "CVPR 2025",
      image: "/images/dof-gs.png",
      link: "#"
    },
    {
      title:
        "Event fields: Capturing light fields at high speed, resolution, and dynamic range",
      authors:
        "Ziyuan Qu, Zihao Zou, Vivek Boominathan, Praneeth Chakravarthula, Adithya Pediredla",
      meta: "CVPR 2025",
      image: "/images/event-fields.png",
      link: "#"
    },
    {
      title: "Present and Future of Everyday-use Augmented Reality Eyeglasses",
      authors: "Praneeth Chakravarthula",
      meta: "IEEE Computer Graphics and Applications 2025",
      image: "/images/everyday-ar-eyeglasses.png",
      link: "#"
    },
    {
      title:
        "Multimodal Neural Acoustic Fields for Immersive Virtual Reality and Telepresence",
      authors:
        "Guansen Tong, Jonathan Leung, Haosheng Shi, Liujie Zheng, Shengze Wang, Xi Peng, Grace Fei, Praneeth Chakravarthula",
      meta: "Best Paper Honorable Mention, IEEE VR (TVCG) 2025",
      image: "/images/multimodal-neural-acoustic.png",
      link: "#"
    },
    {
      title: "Perceptually-Guided Acoustic Foveation",
      authors:
        "Xi Peng, Kenneth Chen, Iran Roman, Juan Pablo Bello, Qi Sun*, Praneeth Chakravarthula*",
      meta: "IEEE VR 2025",
      image: "/images/acoustic-foveation.png",
      link: "#"
    },
    {
      title: "FlatTrack: Eye-tracking with ultra-thin lensless cameras",
      authors:
        "Purvam Jain, Althaf M. Nazar, Salman S. Khan, Kaushik Mitra, Praneeth Chakravarthula",
      meta: "Best Paper Award, GMCV & WACV 2025",
      image: "/images/flattrack.png",
      link: "#"
    },
    {
      title: "Spatially Varying Nanophotonic Neural Networks",
      authors:
        "Kaixuan Wei*, Xiao Li*, Johannes Froech*, Praneeth Chakravarthula, James Whitehead, Ethan Tseng, Arka Majumdar, Felix Heide",
      meta: "Science Advances 2024",
      image: "/images/spatially-varying-nanophotonic.png",
      link: "#"
    },
    {
      title:
        "End-to-End Hybrid Refractive-Diffractive Lens Design with Differentiable Ray-Wave Model",
      authors:
        "Xinge Yang, Matheus Souza, Kunyi Wang, Praneeth Chakravarthula, Qiang Fu, Wolfgang Heidrich",
      meta: "SIGGRAPH Asia 2024",
      image: "/images/hybrid-lens-design.png",
      link: "#"
    },
    {
      title:
        "Cross-Domain Synthetic-to-Real In-the-Wild Depth and Normal Estimation for 3D Scene Understanding",
      authors: "Jay Bhanushali, Manivannan Muniyandi, Praneeth Chakravarthula",
      meta: "Best Paper Award, OmniCV & CVPR 2024",
      image: "/images/cross-domain-depth-normal.png",
      link: "#"
    },
    {
      title:
        "Neural Etendue Expander for Ultra-Wide-Angle High-Fidelity Holographic Display",
      authors:
        "Ethan Tseng, Seung-Hwan Baek, Grace Kuo, Nathan Matsuda, Andrew Maimone, Praneeth Chakravarthula, Qiang Fu, Wolfgang Heidrich, Douglas Lanman, Felix Heide",
      meta: "Nature Communications 2024",
      image: "/images/neural-etendue-expander.png",
      link: "#"
    },
    {
      title:
        "Point Spread Function-inspired Deformable Convolutional Network for Holographic Displays",
      authors:
        "Mi Zhou, Shuming Jiao, Praneeth Chakravarthula, Yang Yue, Ping Su, Ercan Engin Kuruoglu, Zihan Geng",
      meta: "SPIE 2024",
      image: "/images/point-spread-function.png",
      link: "#"
    },
    {
      title: "Thin On-Sensor Nanophotonic Array Cameras",
      authors:
        "Praneeth Chakravarthula, Jipeng Sun, Xiao Li, Chenyang Lei, Gene Chou, Mario Bijelic, Johannes Froesch, Arka Majumdar, Felix Heide",
      meta: "SIGGRAPH Asia 2023",
      image: "/images/thin-on-sensor.png",
      link: "#"
    },
    {
      title:
        "Seeing with Sound: Long-Range Acoustic Beamforming for Automotive Scene Understanding",
      authors:
        "Praneeth Chakravarthula, Jim Aldon D'Souza, Ethan Tseng, Joe Bartusek, Felix Heide",
      meta: "CVPR 2023",
      image: "/images/seeing-with-sound.png",
      link: "#"
    },
    {
      title: "Stochastic Light Field Holography",
      authors:
        "Florian Schiffers, Praneeth Chakravarthula, Nathan Matsuda, Grace Kuo, Ethan Tseng, Douglas Lanman, Felix Heide, Oliver Cossairt",
      meta: "ICCP 2023",
      image: "/images/stochastic-light-field.png",
      link: "#"
    },
    {
      title:
        "End-to-End Compression-Aware Computer-Generated Holography",
      authors:
        "Mi Zhou, Hao Zhang, Shuming Jiao, Praneeth Chakravarthula, Zihan Geng",
      meta: "Optics Express 2023",
      image: "/images/compression-aware-cgh.png",
      link: "#"
    },
    {
      title: "Hexagonal Diffractive Optical Elements",
      authors:
        "Yidan Zheng, Qiang Fu, Hadi Amata, Praneeth Chakravarthula, Felix Heide, Wolfgang Heidrich",
      meta: "Optics Express 2023",
      image: "/images/hexagonal-diffractive.png",
      link: "#"
    },
    {
      title:
        "ChromaCorrect: Prescription Correction in Virtual Reality Headsets through Perceptual Guidance",
      authors: "Ahmet Guzel, Jeanne Beyazian, Praneeth Chakravarthula, Kaan Aksit",
      meta: "Biomedical Optics Express 2023",
      image: "/images/chromacorrect.png",
      link: "#"
    },
    {
      title:
        "Visual perception of noise in a simulated holographic display – a user study",
      authors:
        "Andreas Georgiou, Joel Kollin, Charlie Hewitt, Praneeth Chakravarthula, Brian Guenter",
      meta: "Elsevier Displays 2022",
      image: "/images/visual-perception-noise.png",
      link: "#"
    },
    {
      title: "Pupil-aware Holography",
      authors:
        "Praneeth Chakravarthula, Seung-Hwan Baek, Florian Schiffers, Ethan Tseng, Grace Kuo, Andrew Maimone, Nathan Matsuda, Oliver Cossairt, Douglas Lanman, Felix Heide",
      meta: "Spotlight Poster ICCP 2022, SIGGRAPH Asia 2022",
      image: "/images/pupil-aware-holography.png",
      link: "#"
    },
    {
      title: "FoV-NeRF: Foveated Neural Radiance Fields for Virtual Reality",
      authors:
        "Nianchen Deng, Zhenyi He, Jiannan Ye, Budmonde Duinkharjav, Praneeth Chakravarthula, Xubo Yang, Qi Sun",
      meta: "Best Paper Award, IEEE TVCG 2022",
      image: "/images/fov-nerf.png",
      link: "#"
    },
    {
      title:
        "Neural 3D Gaze: 3D Pupil Localization and Gaze Tracking based on Anatomical Eye Model and Neural Refraction Correction",
      authors:
        "Conny Lu, Praneeth Chakravarthula, Kaihao Liu, Xixiang Liu, Siyuan Li, Henry Fuchs",
      meta: "ISMAR 2022",
      image: "/images/neural-3d-gaze.png",
      link: "#"
    },
    {
      title:
        "Image Features Influence Reaction Time: A Learned Probabilistic Perceptual Model for Saccade Latency",
      authors:
        "Budmonde Duinkharjav, Praneeth Chakravarthula, Rachel Albert, Anjul Patney, Qi Sun",
      meta: "Best Paper Award, SIGGRAPH 2022",
      image: "/images/image-features-influence.png",
      link: "#"
    },
    {
      title: "Hogel-free Holography",
      authors:
        "Praneeth Chakravarthula, Ethan Tseng, Henry Fuchs, Felix Heide",
      meta: "SIGGRAPH 2022",
      image: "/images/hogel-free-holography.png",
      link: "#"
    },
    {
      title:
        "Joint Neural Phase Retrieval and Compression for Energy- and Computation-Efficient Holography on the Edge",
      authors:
        "Yujie Wang*, Praneeth Chakravarthula*, Qi Sun, Baoquan Chen",
      meta: "Best Paper Honorable Mention, SIGGRAPH 2022",
      image: "/images/joint-neural-phase.png",
      link: "#"
    },
    {
      title: "Seeing Through Obstructions with Diffractive Cloaking",
      authors:
        "Zheng Shi, Yuval Bahat, Seung-Hwan Baek, Qiang Fu, Hadi Amata, Xiao Li, Praneeth Chakravarthula, Wolfgang Heidrich, Felix Heide",
      meta: "SIGGRAPH 2022",
      image: "/images/obstructions-diffractive-cloaking.png",
      link: "#"
    },
    {
      title: "Towards Everyday-use Augmented Reality Eyeglasses",
      authors: "Praneeth Chakravarthula",
      meta: "IEEE VR Best Dissertation Award, Ph.D. Dissertation 2021",
      image: "/images/everyday-ar-eyeglasses-2.png",
      link: "#"
    },
    {
      title:
        "Gaze-contingent Retinal Speckle Suppression for Perceptually-Matched Foveated Holographic Displays",
      authors:
        "Praneeth Chakravarthula, Zhan Zhang, Okan Tursun, Piotr Didyk, Qi Sun, Henry Fuchs",
      meta: "IEEE TVCG 2021",
      image: "/images/gaze-contingent-retinal.png",
      link: "#"
    },
    {
      title:
        "Learned Hardware-in-the-loop Phase Retrieval for Holographic Near-Eye Displays",
      authors:
        "Praneeth Chakravarthula, Ethan Tseng, Tarun Srivastava, Henry Fuchs, Felix Heide",
      meta: "SIGGRAPH Asia 2020",
      image: "/images/hardware-in-loop-phase.png",
      link: "#"
    },
    {
      title:
        "DeepCGH: 3D Computer-Generated Holography Using Deep Learning",
      authors:
        "M. Hossein Eybposh, Nicholas W. Caira, Mathew Atisa, Praneeth Chakravarthula, Nicolas C. Pégard",
      meta: "Best Paper Award, Optics Express 2020",
      image: "/images/deepcgh.png",
      link: "#"
    },
    {
      title:
        "Improved vergence and accommodation via Purkinje Image tracking with multiple cameras for AR eyeglasses",
      authors:
        "Xinran Lu, Praneeth Chakravarthula, Yujie Tao, Steven Chen, Henry Fuchs",
      meta: "ISMAR 2020",
      image: "/images/purkinje-tracking.png",
      link: "#"
    },
    {
      title:
        "Towards Eyeglasses-style Holographic Near-eye Displays with Statically Expanded Eyebox",
      authors:
        "Xinxing Xia, Yunqing Guan, Andrei State, Praneeth Chakravarthula, Tat-Jen Cham, Henry Fuchs",
      meta: "ISMAR 2020",
      image: "/images/eyeglasses-holographic.png",
      link: "#"
    },
    {
      title:
        "Computing high-quality phase-only holograms for holographic displays",
      authors:
        "Praneeth Chakravarthula, Yifan Peng, Joel Kollin, Felix Heide, Henry Fuchs",
      meta: "Optical Design Award, SPIE Photonics West 2020",
      image: "/images/phase-only-holograms.png",
      link: "#"
    },
    {
      title: "Wirtinger Holography for Near-Eye Displays",
      authors:
        "Praneeth Chakravarthula, Yifan Peng, Joel Kollin, Henry Fuchs, Felix Heide",
      meta: "SIGGRAPH Asia 2019",
      image: "/images/wirtinger-holography.png",
      link: "#"
    },
    {
      title:
        "Towards a Switchable AR/VR Near-eye Display with Accommodation-Vergence and Eyeglass Prescription Support",
      authors:
        "Xinxing Xia, Yunqing Guan, Andrei State, Praneeth Chakravarthula, Kishore Rathinavel, Tat-Jen Cham, Henry Fuchs",
      meta: "IEEE TVCG (presented at ISMAR 2019",
      image: "/images/switchable-arvr.png",
      link: "#"
    },
    {
      title: "Manufacturing Application Driven Near-Eye Displays",
      authors:
        "Kaan Aksit, Praneeth Chakravarthula, Kishore Rathinavel, Youngmo Jeong, Rachel Albert, Henry Fuchs, David Luebke",
      meta: "Best Paper Nominee, IEEE TVCG (presented at IEEE VR 2019)",
      image: "/images/manufacturing-near-eye.png",
      link: "#"
    },
    {
      title:
        "focusAR: Auto-focus Augmented Reality Eyeglasses for both Real World and Virtual Imagery",
      authors:
        "Praneeth Chakravarthula, David Dunn, Kaan Aksit, Henry Fuchs",
      meta: "Best Paper Award, Talk, IEEE TVCG (presented at SIGGRAPH Asia 2018, ISMAR 2018)",
      image: "/images/focusar.png",
      link: "#"
    },
    {
      title: "Steerable Application-Adaptive Near-Eye Displays",
      authors:
        "Kishore Rathinavel, Praneeth Chakravarthula, Kaan Aksit, Josef Spjut, Ben Boudaoud, Turner Whitted, David Luebke, Henry Fuchs",
      meta: "Best in Show Award, SIGGRAPH 2018 Emerging Technologies",
      image: "/images/steerable-near-eye.png",
      link: "#"
    },
    {
      title:
        "Mitigating vergence-accommodation conflict for near-eye displays via deformable beamsplitters",
      authors: "David Dunn, Praneeth Chakravarthula, Qian Dong, Henry Fuchs",
      meta: "Best Optical Design Award, SPIE Digital Optics for Immersive Displays 2018",
      image: "/images/mitigating-vergence.png",
      link: "#"
    },
    {
      title:
        "Towards Varifocal Augmented Reality Displays using Deformable Beamsplitter Membranes",
      authors:
        "David Dunn, Praneeth Chakravarthula, Qian Dong, Kaan Aksit, Henry Fuchs",
      meta: "SID Display Week 2018",
      image: "/images/varifocal-ar.png",
      link: "#"
    },
    {
      title:
        "Penetra3D: A penetrable, interactive, 360-degree viewable display",
      authors: "Praneeth Chakravarthula, Pattie Maes",
      meta: "IEEE 3DUI 2015",
      image: "/images/penetra3d.png",
      link: "#"
    },
    {
      title:
        "Single access point based indoor localization technique for augmented reality gaming for children",
      authors:
        "Praneeth Chakravarthula, Ravi Poovaiah, Ajanta Sen, Priya Ganadas",
      meta: "IEEE TechSym 2014",
      image: "/images/indoor-localization.png",
      link: "#"
    }
  ];

  return (
    <div className="flex justify-center items-start min-h-screen">
      <div className="text-center mt-20 w-11/12 max-w-6xl">
        <h1 className="text-4xl font-bold mb-4">Publications</h1>
        <p className="text-lg mb-8">
          Please see my Google scholar for a complete publication list.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {publications.map((pub, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden flex">
              <img
                src={pub.image}
                alt={pub.title}
                className="w-24 h-24 object-contain m-4"
              />
              <div className="p-4 text-left flex-1">
                <Link href={pub.link} target="_blank">
                  <h2 className="text-xl font-semibold text-black hover:text-blue-500 transition">
                    {pub.title}
                  </h2>
                </Link>
                <p className="text-sm text-gray-600 mt-1">{pub.authors}</p>
                <p className="text-sm text-gray-600">{pub.meta}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}