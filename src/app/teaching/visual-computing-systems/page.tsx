import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import '../../animations.css';

export default function VisualComputingSystems() {
  return (
    <div className="fade-in flex flex-col items-center min-h-screen bg-gray-50">
      <div className="w-full h-64 md:h-80 relative mb-8">
        <Image 
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80" 
          alt="Visual Computing and Technology Systems" 
          fill
          className="object-cover object-center rounded-b-lg shadow-md" 
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">Visual Computing Systems</h1>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-4xl mb-8">
        <h2 className="text-2xl font-bold text-orange-700 mb-4">Course Description</h2>
        <p className="mb-4 text-gray-700">This course explores the design and implementation of visual computing systems, including hardware, software, and applications in graphics, vision, and AR/VR. Topics include system architectures, real-time rendering, computational photography, display technologies, and the integration of AI in visual systems. Emphasis is on hands-on projects and understanding the end-to-end pipeline from sensors to displays.</p>
        <h2 className="text-xl font-semibold text-orange-700 mt-6 mb-2">Topics Include</h2>
        <ul className="list-disc ml-6 text-gray-700 mb-4">
          <li>System architectures for visual computing</li>
          <li>Real-time graphics and rendering</li>
          <li>Computer vision fundamentals</li>
          <li>Computational photography</li>
          <li>Display technologies (AR/VR, holography, etc.)</li>
          <li>Sensor integration and data acquisition</li>
          <li>AI and machine learning in visual systems</li>
          <li>End-to-end system optimization</li>
        </ul>
        <h2 className="text-xl font-semibold text-orange-700 mt-6 mb-2">Course Goals</h2>
        <p className="mb-4 text-gray-700">Students will gain practical experience in building and analyzing visual computing systems, from image capture to display. The course covers both foundational theory and modern applications, preparing students for research or industry roles in graphics, vision, and AR/VR.</p>
        <h2 className="text-xl font-semibold text-orange-700 mt-6 mb-2">Instructors</h2>
        <ul className="list-disc ml-6 text-gray-700 mb-4">
          <li>Praneeth Chakravarthula (Instructor)</li>
          {/* Add TAs or guest lecturers if available */}
        </ul>
        <h2 className="text-xl font-semibold text-orange-700 mt-6 mb-2">Schedule & Syllabus</h2>
        <p className="mb-2 text-gray-700">Class meets in Fall 2025. Details and weekly topics will be posted here.</p>
        <ul className="list-disc ml-6 text-gray-700 mb-4">
          <li>Week 1: Introduction to visual computing systems</li>
          <li>Week 2: Graphics pipelines and real-time rendering</li>
          <li>Week 3: Computer vision and image analysis</li>
          <li>Week 4: Computational photography and sensors</li>
          <li>Week 5: Display technologies and AR/VR</li>
          <li>Week 6: AI integration and system optimization</li>
          {/* Add more weeks as needed */}
        </ul>
        <Link href="/teaching" className="text-orange-600 hover:underline">Back to Teaching</Link>
      </div>
    </div>
  );
} 