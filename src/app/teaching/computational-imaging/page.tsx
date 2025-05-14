import React from 'react';
import Link from 'next/link';
import '../../animations.css';

export default function ComputationalImaging() {
  return (
    <div className="fade-in flex flex-col items-center min-h-screen bg-gray-50">
      <div className="w-full h-64 md:h-80 relative mb-8">
        <img src="/course1.jpg" alt="Computational Imaging Banner" className="w-full h-full object-cover object-center rounded-b-lg shadow-md" />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">Computational Imaging</h1>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-4xl mb-8">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">Course Description</h2>
        <p className="mb-4 text-gray-700">Computational imaging systems have a wide range of applications in consumer electronics, scientific imaging, HCI, medical imaging, microscopy, and remote sensing. This course covers digital photography, image processing, convolutional neural networks for imaging, denoising, deconvolution, single pixel imaging, inverse problems, wave optics, and end-to-end optimization of optics and imaging processing. Emphasis is on applied image processing and solving inverse problems using classic algorithms, formal optimization, and modern AI techniques.</p>
        <h2 className="text-xl font-semibold text-blue-700 mt-6 mb-2">Topics Include</h2>
        <ul className="list-disc ml-6 text-gray-700 mb-4">
          <li>Human visual perception</li>
          <li>Digital cameras and ISPs</li>
          <li>Denoising, deconvolution, and other inverse problems</li>
          <li>Convolutional neural networks for imaging</li>
          <li>Diffusion models for inverse problems</li>
          <li>Proximal gradient methods / formal optimization</li>
          <li>High dynamic range imaging</li>
          <li>Light field imaging</li>
          <li>Wave optics</li>
          <li>End-to-end optimization of optics and image processing</li>
        </ul>
        <h2 className="text-xl font-semibold text-blue-700 mt-6 mb-2">Course Goals</h2>
        <p className="mb-4 text-gray-700">Students will learn about computational imaging methods and applications with a focus on solving inverse problems in imaging, such as denoising, deconvolution, and single-pixel imaging. The course covers classic algorithms, modern data-driven approaches using CNNs, and proximal gradient methods. Assignments require programming and image processing in Python.</p>
        <h2 className="text-xl font-semibold text-blue-700 mt-6 mb-2">Instructors</h2>
        <ul className="list-disc ml-6 text-gray-700 mb-4">
          <li>Praneeth Chakravarthula (Instructor)</li>
          {/* Add TAs or guest lecturers if available */}
        </ul>
        <h2 className="text-xl font-semibold text-blue-700 mt-6 mb-2">Schedule & Syllabus</h2>
        <p className="mb-2 text-gray-700">Class meets in Spring 2026. Details and weekly topics will be posted here.</p>
        <ul className="list-disc ml-6 text-gray-700 mb-4">
          <li>Week 1: Introduction and course overview</li>
          <li>Week 2: Human visual system and digital photography</li>
          <li>Week 3: Inverse problems and denoising</li>
          <li>Week 4: Neural networks for imaging</li>
          <li>Week 5: Wave optics and light field imaging</li>
          <li>Week 6: Optimization and end-to-end systems</li>
          {/* Add more weeks as needed */}
        </ul>
        <Link href="/teaching" className="text-blue-600 hover:underline">Back to Teaching</Link>
      </div>
    </div>
  );
} 