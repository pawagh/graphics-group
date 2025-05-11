'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import '../animations.css';

export default function Publications() {

  const publications = [
    {
      title: "Beating bandwidth limits for large aperture broadband nano-optics",
      authors:
        "Johannes E Fröch*, Praneeth Chakravarthula*, Jipeng Sun, Ethan Tseng, Shane Colburn, Alan Zhan, Forrest Miller, Anna Wirth-Singh, Quentin AA Tanguy, Zheyi Han, Karl F Böhringer, Felix Heide, Arka Majumdar",
      meta: "Nature Communications 2025",
      image: "/images/beating-bandwidth-limits.png",
      link: "#",
      tags: ["Journal", "Nature Communications", "2025"]
    },
    {
      title:
        "DOF-GS: Adjustable Depth-of-Field 3D Gaussian Splatting for Post-Capture Refocusing, Defocus Rendering and Blur Removal",
      authors: "Yujie Wang, Baoquan Chen*, Praneeth Chakravarthula*",
      meta: "CVPR 2025",
      image: "/images/dof-gs.png",
      link: "#",
      tags: ["Conference", "CVPR", "2025"]
    },
    {
      title:
        "Event fields: Capturing light fields at high speed, resolution, and dynamic range",
      authors:
        "Ziyuan Qu, Zihao Zou, Vivek Boominathan, Praneeth Chakravarthula, Adithya Pediredla",
      meta: "CVPR 2025",
      image: "/images/event-fields.png",
      link: "#",
      tags: ["Conference", "CVPR", "2025"]
    },
    {
      title: "Present and Future of Everyday-use Augmented Reality Eyeglasses",
      authors: "Praneeth Chakravarthula",
      meta: "IEEE Computer Graphics and Applications 2025",
      image: "/images/everyday-ar-eyeglasses.png",
      link: "#",
      tags: ["Journal", "IEEE CG&A", "2025"]
    },
    {
      title:
        "Multimodal Neural Acoustic Fields for Immersive Virtual Reality and Telepresence",
      authors:
        "Guansen Tong, Jonathan Leung, Haosheng Shi, Liujie Zheng, Shengze Wang, Xi Peng, Grace Fei, Praneeth Chakravarthula",
      meta: "Best Paper Honorable Mention, IEEE VR (TVCG) 2025",
      image: "/images/multimodal-neural-acoustic.png",
      link: "#",
      tags: ["Conference", "IEEE VR", "2025"]
    },
    {
      title: "Perceptually-Guided Acoustic Foveation",
      authors:
        "Xi Peng, Kenneth Chen, Iran Roman, Juan Pablo Bello, Qi Sun*, Praneeth Chakravarthula*",
      meta: "IEEE VR 2025",
      image: "/images/acoustic-foveation.png",
      link: "#",
      tags: ["Conference", "IEEE VR", "2025"]
    },
    {
      title: "FlatTrack: Eye-tracking with ultra-thin lensless cameras",
      authors:
        "Purvam Jain, Althaf M. Nazar, Salman S. Khan, Kaushik Mitra, Praneeth Chakravarthula",
      meta: "Best Paper Award, GMCV & WACV 2025",
      image: "/images/flattrack.png",
      link: "#",
      tags: ["Conference", "WACV", "2025"]
    },
    {
      title: "Spatially Varying Nanophotonic Neural Networks",
      authors:
        "Kaixuan Wei*, Xiao Li*, Johannes Froech*, Praneeth Chakravarthula, James Whitehead, Ethan Tseng, Arka Majumdar, Felix Heide",
      meta: "Science Advances 2024",
      image: "/images/spatially-varying-nanophotonic.png",
      link: "#",
      tags: ["Journal", "Science Advances", "2024"]
    },
    {
      title:
        "End-to-End Hybrid Refractive-Diffractive Lens Design with Differentiable Ray-Wave Model",
      authors:
        "Xinge Yang, Matheus Souza, Kunyi Wang, Praneeth Chakravarthula, Qiang Fu, Wolfgang Heidrich",
      meta: "SIGGRAPH Asia 2024",
      image: "/images/hybrid-lens-design.png",
      link: "#",
      tags: ["Conference", "SIGGRAPH Asia", "2024"]
    },
    {
      title:
        "Cross-Domain Synthetic-to-Real In-the-Wild Depth and Normal Estimation for 3D Scene Understanding",
      authors: "Jay Bhanushali, Manivannan Muniyandi, Praneeth Chakravarthula",
      meta: "Best Paper Award, OmniCV & CVPR 2024",
      image: "/images/cross-domain-depth-normal.png",
      link: "#",
      tags: ["Conference", "CVPR", "2024"]
    },
    {
      title:
        "Neural Etendue Expander for Ultra-Wide-Angle High-Fidelity Holographic Display",
      authors:
        "Ethan Tseng, Seung-Hwan Baek, Grace Kuo, Nathan Matsuda, Andrew Maimone, Praneeth Chakravarthula, Qiang Fu, Wolfgang Heidrich, Douglas Lanman, Felix Heide",
      meta: "Nature Communications 2024",
      image: "/images/neural-etendue-expander.png",
      link: "#",
      tags: ["Journal", "Nature Communications", "2024"]
    },
    {
      title:
        "Point Spread Function-inspired Deformable Convolutional Network for Holographic Displays",
      authors:
        "Mi Zhou, Shuming Jiao, Praneeth Chakravarthula, Yang Yue, Ping Su, Ercan Engin Kuruoglu, Zihan Geng",
      meta: "SPIE 2024",
      image: "/images/point-spread-function.png",
      link: "#",
      tags: ["Conference", "SPIE", "2024"]
    },
    {
      title: "Thin On-Sensor Nanophotonic Array Cameras",
      authors:
        "Praneeth Chakravarthula, Jipeng Sun, Xiao Li, Chenyang Lei, Gene Chou, Mario Bijelic, Johannes Froesch, Arka Majumdar, Felix Heide",
      meta: "SIGGRAPH Asia 2023",
      image: "/images/thin-on-sensor.png",
      link: "#",
      tags: ["Conference", "SIGGRAPH Asia", "2023"]
    },
    {
      title:
        "Seeing with Sound: Long-Range Acoustic Beamforming for Automotive Scene Understanding",
      authors:
        "Praneeth Chakravarthula, Jim Aldon D'Souza, Ethan Tseng, Joe Bartusek, Felix Heide",
      meta: "CVPR 2023",
      image: "/images/seeing-with-sound.png",
      link: "#",
      tags: ["Conference", "CVPR", "2023"]
    },
    {
      title: "Stochastic Light Field Holography",
      authors:
        "Florian Schiffers, Praneeth Chakravarthula, Nathan Matsuda, Grace Kuo, Ethan Tseng, Douglas Lanman, Felix Heide, Oliver Cossairt",
      meta: "ICCP 2023",
      image: "/images/stochastic-light-field.png",
      link: "#",
      tags: ["Conference", "ICCP", "2023"]
    },
    {
      title:
        "End-to-End Compression-Aware Computer-Generated Holography",
      authors:
        "Mi Zhou, Hao Zhang, Shuming Jiao, Praneeth Chakravarthula, Zihan Geng",
      meta: "Optics Express 2023",
      image: "/images/compression-aware-cgh.png",
      link: "#",
      tags: ["Journal", "Optics Express", "2023"]
    },
    {
      title: "Hexagonal Diffractive Optical Elements",
      authors:
        "Yidan Zheng, Qiang Fu, Hadi Amata, Praneeth Chakravarthula, Felix Heide, Wolfgang Heidrich",
      meta: "Optics Express 2023",
      image: "/images/hexagonal-diffractive.png",
      link: "#",
      tags: ["Journal", "Optics Express", "2023"]
    },
    {
      title:
        "ChromaCorrect: Prescription Correction in Virtual Reality Headsets through Perceptual Guidance",
      authors: "Ahmet Guzel, Jeanne Beyazian, Praneeth Chakravarthula, Kaan Aksit",
      meta: "Biomedical Optics Express 2023",
      image: "/images/chromacorrect.png",
      link: "#",
      tags: ["Journal", "Biomedical Optics Express", "2023"]
    },
    {
      title:
        "Visual perception of noise in a simulated holographic display – a user study",
      authors:
        "Andreas Georgiou, Joel Kollin, Charlie Hewitt, Praneeth Chakravarthula, Brian Guenter",
      meta: "Elsevier Displays 2022",
      image: "/images/visual-perception-noise.png",
      link: "#",
      tags: ["Journal", "Elsevier Displays", "2022"]
    },
    {
      title: "Pupil-aware Holography",
      authors:
        "Praneeth Chakravarthula, Seung-Hwan Baek, Florian Schiffers, Ethan Tseng, Grace Kuo, Andrew Maimone, Nathan Matsuda, Oliver Cossairt, Douglas Lanman, Felix Heide",
      meta: "Spotlight Poster ICCP 2022, SIGGRAPH Asia 2022",
      image: "/images/pupil-aware-holography.png",
      link: "#",
      tags: ["Conference", "SIGGRAPH Asia", "2022"]
    },
    {
      title: "FoV-NeRF: Foveated Neural Radiance Fields for Virtual Reality",
      authors:
        "Nianchen Deng, Zhenyi He, Jiannan Ye, Budmonde Duinkharjav, Praneeth Chakravarthula, Xubo Yang, Qi Sun",
      meta: "Best Paper Award, IEEE TVCG 2022",
      image: "/images/fov-nerf.png",
      link: "#",
      tags: ["Conference", "IEEE TVCG", "2022"]
    },
    {
      title:
        "Neural 3D Gaze: 3D Pupil Localization and Gaze Tracking based on Anatomical Eye Model and Neural Refraction Correction",
      authors:
        "Conny Lu, Praneeth Chakravarthula, Kaihao Liu, Xixiang Liu, Siyuan Li, Henry Fuchs",
      meta: "ISMAR 2022",
      image: "/images/neural-3d-gaze.png",
      link: "#",
      tags: ["Conference", "ISMAR", "2022"]
    },
    {
      title:
        "Image Features Influence Reaction Time: A Learned Probabilistic Perceptual Model for Saccade Latency",
      authors:
        "Budmonde Duinkharjav, Praneeth Chakravarthula, Rachel Albert, Anjul Patney, Qi Sun",
      meta: "Best Paper Award, SIGGRAPH 2022",
      image: "/images/image-features-influence.png",
      link: "#",
      tags: ["Conference", "SIGGRAPH", "2022"]
    },
    {
      title: "Hogel-free Holography",
      authors:
        "Praneeth Chakravarthula, Ethan Tseng, Henry Fuchs, Felix Heide",
      meta: "SIGGRAPH 2022",
      image: "/images/hogel-free-holography.png",
      link: "#",
      tags: ["Conference", "SIGGRAPH", "2022"]
    },
    {
      title:
        "Joint Neural Phase Retrieval and Compression for Energy- and Computation-Efficient Holography on the Edge",
      authors:
        "Yujie Wang*, Praneeth Chakravarthula*, Qi Sun, Baoquan Chen",
      meta: "Best Paper Honorable Mention, SIGGRAPH 2022",
      image: "/images/joint-neural-phase.png",
      link: "#",
      tags: ["Conference", "SIGGRAPH", "2022"]
    },
    {
      title: "Seeing Through Obstructions with Diffractive Cloaking",
      authors:
        "Zheng Shi, Yuval Bahat, Seung-Hwan Baek, Qiang Fu, Hadi Amata, Xiao Li, Praneeth Chakravarthula, Wolfgang Heidrich, Felix Heide",
      meta: "SIGGRAPH 2022",
      image: "/images/obstructions-diffractive-cloaking.png",
      link: "#",
      tags: ["Conference", "SIGGRAPH", "2022"]
    },
    {
      title: "Towards Everyday-use Augmented Reality Eyeglasses",
      authors: "Praneeth Chakravarthula",
      meta: "IEEE VR Best Dissertation Award, Ph.D. Dissertation 2021",
      image: "/images/everyday-ar-eyeglasses-2.png",
      link: "#",
      tags: ["Dissertation", "2021"]
    },
    {
      title:
        "Gaze-contingent Retinal Speckle Suppression for Perceptually-Matched Foveated Holographic Displays",
      authors:
        "Praneeth Chakravarthula, Zhan Zhang, Okan Tursun, Piotr Didyk, Qi Sun, Henry Fuchs",
      meta: "IEEE TVCG 2021",
      image: "/images/gaze-contingent-retinal.png",
      link: "#",
      tags: ["Conference", "IEEE TVCG", "2021"]
    },
    {
      title:
        "Learned Hardware-in-the-loop Phase Retrieval for Holographic Near-Eye Displays",
      authors:
        "Praneeth Chakravarthula, Ethan Tseng, Tarun Srivastava, Henry Fuchs, Felix Heide",
      meta: "SIGGRAPH Asia 2020",
      image: "/images/hardware-in-loop-phase.png",
      link: "#",
      tags: ["Conference", "SIGGRAPH Asia", "2020"]
    },
    {
      title:
        "DeepCGH: 3D Computer-Generated Holography Using Deep Learning",
      authors:
        "M. Hossein Eybposh, Nicholas W. Caira, Mathew Atisa, Praneeth Chakravarthula, Nicolas C. Pégard",
      meta: "Best Paper Award, Optics Express 2020",
      image: "/images/deepcgh.png",
      link: "#",
      tags: ["Journal", "Optics Express", "2020"]
    },
    {
      title:
        "Improved vergence and accommodation via Purkinje Image tracking with multiple cameras for AR eyeglasses",
      authors:
        "Xinran Lu, Praneeth Chakravarthula, Yujie Tao, Steven Chen, Henry Fuchs",
      meta: "ISMAR 2020",
      image: "/images/purkinje-tracking.png",
      link: "#",
      tags: ["Conference", "ISMAR", "2020"]
    },
    {
      title:
        "Towards Eyeglasses-style Holographic Near-eye Displays with Statically Expanded Eyebox",
      authors:
        "Xinxing Xia, Yunqing Guan, Andrei State, Praneeth Chakravarthula, Tat-Jen Cham, Henry Fuchs",
      meta: "ISMAR 2020",
      image: "/images/eyeglasses-holographic.png",
      link: "#",
      tags: ["Conference", "ISMAR", "2020"]
    },
    {
      title:
        "Computing high-quality phase-only holograms for holographic displays",
      authors:
        "Praneeth Chakravarthula, Yifan Peng, Joel Kollin, Felix Heide, Henry Fuchs",
      meta: "Optical Design Award, SPIE Photonics West 2020",
      image: "/images/phase-only-holograms.png",
      link: "#",
      tags: ["Conference", "SPIE", "2020"]
    },
    {
      title: "Wirtinger Holography for Near-Eye Displays",
      authors:
        "Praneeth Chakravarthula, Yifan Peng, Joel Kollin, Henry Fuchs, Felix Heide",
      meta: "SIGGRAPH Asia 2019",
      image: "/images/wirtinger-holography.png",
      link: "#",
      tags: ["Conference", "SIGGRAPH Asia", "2019"]
    },
    {
      title:
        "Towards a Switchable AR/VR Near-eye Display with Accommodation-Vergence and Eyeglass Prescription Support",
      authors:
        "Xinxing Xia, Yunqing Guan, Andrei State, Praneeth Chakravarthula, Kishore Rathinavel, Tat-Jen Cham, Henry Fuchs",
      meta: "IEEE TVCG (presented at ISMAR 2019",
      image: "/images/switchable-arvr.png",
      link: "#",
      tags: ["Conference", "IEEE TVCG", "2019"]
    },
    {
      title: "Manufacturing Application Driven Near-Eye Displays",
      authors:
        "Kaan Aksit, Praneeth Chakravarthula, Kishore Rathinavel, Youngmo Jeong, Rachel Albert, Henry Fuchs, David Luebke",
      meta: "Best Paper Nominee, IEEE TVCG (presented at IEEE VR 2019)",
      image: "/images/manufacturing-near-eye.png",
      link: "#",
      tags: ["Conference", "IEEE TVCG", "2019"]
    },
    {
      title:
        "focusAR: Auto-focus Augmented Reality Eyeglasses for both Real World and Virtual Imagery",
      authors:
        "Praneeth Chakravarthula, David Dunn, Kaan Aksit, Henry Fuchs",
      meta: "Best Paper Award, Talk, IEEE TVCG (presented at SIGGRAPH Asia 2018, ISMAR 2018)",
      image: "/images/focusar.png",
      link: "#",
      tags: ["Conference", "IEEE TVCG", "SIGGRAPH Asia", "2018"]
    },
    {
      title: "Steerable Application-Adaptive Near-Eye Displays",
      authors:
        "Kishore Rathinavel, Praneeth Chakravarthula, Kaan Aksit, Josef Spjut, Ben Boudaoud, Turner Whitted, David Luebke, Henry Fuchs",
      meta: "Best in Show Award, SIGGRAPH 2018 Emerging Technologies",
      image: "/images/steerable-near-eye.png",
      link: "#",
      tags: ["Conference", "SIGGRAPH", "2018"]
    },
    {
      title:
        "Mitigating vergence-accommodation conflict for near-eye displays via deformable beamsplitters",
      authors: "David Dunn, Praneeth Chakravarthula, Qian Dong, Henry Fuchs",
      meta: "Best Optical Design Award, SPIE Digital Optics for Immersive Displays 2018",
      image: "/images/mitigating-vergence.png",
      link: "#",
      tags: ["Conference", "SPIE", "2018"]
    },
    {
      title:
        "Towards Varifocal Augmented Reality Displays using Deformable Beamsplitter Membranes",
      authors:
        "David Dunn, Praneeth Chakravarthula, Qian Dong, Kaan Aksit, Henry Fuchs",
      meta: "SID Display Week 2018",
      image: "/images/varifocal-ar.png",
      link: "#",
      tags: ["Conference", "SID Display Week", "2018"]
    },
    {
      title:
        "Penetra3D: A penetrable, interactive, 360-degree viewable display",
      authors: "Praneeth Chakravarthula, Pattie Maes",
      meta: "IEEE 3DUI 2015",
      image: "/images/penetra3d.png",
      link: "#",
      tags: ["Conference", "IEEE 3DUI", "2015"]
    },
    {
      title:
        "Single access point based indoor localization technique for augmented reality gaming for children",
      authors:
        "Praneeth Chakravarthula, Ravi Poovaiah, Ajanta Sen, Priya Ganadas",
      meta: "IEEE TechSym 2014",
      image: "/images/indoor-localization.png",
      link: "#",
      tags: ["Conference", "IEEE TechSym", "2014"]
    }
  ];

  // Get all unique years from tags
  const years = Array.from(
    new Set(publications.flatMap(pub => pub.tags.filter(tag => /^\d{4}$/.test(tag))))
  ).sort((a, b) => b.localeCompare(a)); // Descending order

  // Get all unique tags except years
  const allTags = Array.from(
    new Set(publications.flatMap(pub => pub.tags.filter(tag => !/^\d{4}$/.test(tag))))
  );

  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [search, setSearch] = useState<string>('');

  // Filter publications by tag and search
  const filteredPubs = publications.filter(pub => {
    const matchesTag = selectedTag === 'All' || pub.tags.includes(selectedTag);
    const matchesSearch =
      pub.title.toLowerCase().includes(search.toLowerCase()) ||
      pub.authors.toLowerCase().includes(search.toLowerCase()) ||
      pub.meta.toLowerCase().includes(search.toLowerCase());
    return matchesTag && matchesSearch;
  });

  // Group by year
  const pubsByYear = years.map(year => ({
    year,
    pubs: filteredPubs.filter(pub => pub.tags.includes(year)),
  }));

  return (
    <div className="fade-in min-h-screen bg-gray-50 text-gray-800 flex flex-col items-center">
      {/* Banner */}
      <div className="w-full h-64 md:h-80 relative mb-8">
        <img src="/publications_banner.jpg" alt="Publications Banner" className="w-full h-full object-cover object-center rounded-b-lg shadow-md" />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">Publications</h1>
        </div>
      </div>

      {/* Main content container */}
      <div className="max-w-5xl w-full px-4 py-8 mx-auto">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search publications..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="mb-4 p-2 border rounded w-full max-w-md"
        />

        {/* Tag Dropdown */}
        <select
          value={selectedTag}
          onChange={e => setSelectedTag(e.target.value)}
          className="mb-8 p-2 border rounded"
        >
          <option value="All">All</option>
          {allTags.map(tag => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>

        {/* Publications grouped by year */}
        {pubsByYear.map(({ year, pubs }) =>
          pubs.length > 0 ? (
            <div key={year}>
              <h2 className="text-2xl font-bold mt-8 mb-4 text-carolina">{year}</h2>
              <div className="grid gap-6">
                {pubs.map((pub, idx) => (
                  <div key={pub.title + idx} className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row gap-6 items-center">
                    <img src={pub.image} alt={pub.title} className="w-32 h-32 object-cover rounded-md" />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{pub.title}</h3>
                      <p className="text-gray-700 mb-1">{pub.authors}</p>
                      <p className="text-gray-500 mb-2">{pub.meta}</p>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {pub.tags.map(tag => (
                          <span key={tag} className="bg-carolina text-white px-2 py-1 rounded text-xs">{tag}</span>
                        ))}
                      </div>
                      {pub.link && (
                        <Link href={pub.link} target="_blank" className="text-carolina underline font-semibold">
                          View Publication
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}