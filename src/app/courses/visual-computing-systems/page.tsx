'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import '../../animations.css';

export default function VisualComputingSystems() {
  const [activeSection, setActiveSection] = useState('description');

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigationItems = [
    { id: 'description', label: 'Description' },
    { id: 'logistics', label: 'Logistics' },
    { id: 'courseware', label: 'Courseware' },
    { id: 'coursework', label: 'Coursework' },
    { id: 'schedule', label: 'Schedule' },
    { id: 'additional', label: 'Additional Info' }
  ];

  return (
    <div className="fade-in bg-neutral-50 min-h-screen">
      {/* Hero Section */}
      <div className="w-full h-48 md:h-64 relative mb-8">
        <Image 
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80" 
          alt="Visual Computing and Technology Systems" 
          fill
          className="object-cover object-center" 
        />
        <div className="absolute inset-0 bg-unc-navy/70 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-3xl md:text-5xl font-bold mb-2">COMP 585</h1>
            <h2 className="text-xl md:text-2xl font-light">Visual Computing Systems</h2>
            <p className="text-sm md:text-base mt-2 opacity-90">Fall 2025</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 flex gap-8">
        {/* Left Sidebar Navigation */}
        <div className="w-64 flex-shrink-0">
          <div className="sticky top-24 bg-white rounded-lg shadow-md border border-neutral-200">
            <div className="p-4 border-b border-neutral-200">
              <h3 className="font-bold text-carolina-blue text-lg">COMP 585</h3>
            </div>
            <nav className="p-2">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-md transition-all duration-200 text-sm font-medium ${
                    activeSection === item.id
                      ? 'bg-carolina-blue text-white'
                      : 'text-neutral-700 hover:bg-neutral-100 hover:text-carolina-blue'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
            <div className="p-4 border-t border-neutral-200">
              <Link 
                href="/courses" 
                className="text-carolina-blue hover:text-unc-navy text-sm font-medium transition-colors duration-200"
              >
                ← Back to Courses
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-white rounded-lg shadow-md border border-neutral-200">
          <div className="p-8">
            
            {/* Description Section */}
            <section id="description" className="mb-12">
              <h2 className="text-2xl font-bold text-unc-navy mb-6 border-b border-neutral-200 pb-3">Course Description</h2>
              
              <div className="space-y-6">
                <p className="text-neutral-700 leading-relaxed">
                  This course explores the design and implementation of modern visual computing systems, covering the full spectrum from hardware architectures to software frameworks and applications in graphics, computer vision, and AR/VR. Students will learn about system-level considerations for building efficient and scalable visual computing platforms.
                </p>

                <p className="text-neutral-700 leading-relaxed">
                  The course covers system architectures for visual computing, real-time rendering pipelines, computational photography systems, display technologies, sensor integration, and the application of AI in visual systems. Emphasis is placed on hands-on projects and understanding the complete pipeline from data acquisition to visual output, including performance optimization and real-world deployment considerations.
                </p>

                <div className="bg-campus-sandstone/30 rounded-lg p-6 mt-6">
                  <h3 className="text-lg font-semibold text-carolina-blue mb-4">Learning Objectives</h3>
                  <p className="text-neutral-700 mb-4">By the end of this course, students will be able to:</p>
                  <ul className="space-y-2 text-neutral-700">
                    <li className="flex items-start">
                      <span className="text-carolina-blue mr-2">•</span>
                      Design and analyze architectures for visual computing systems
                    </li>
                    <li className="flex items-start">
                      <span className="text-carolina-blue mr-2">•</span>
                      Implement real-time graphics and vision algorithms
                    </li>
                    <li className="flex items-start">
                      <span className="text-carolina-blue mr-2">•</span>
                      Optimize systems for performance and energy efficiency
                    </li>
                    <li className="flex items-start">
                      <span className="text-carolina-blue mr-2">•</span>
                      Integrate multiple modalities (graphics, vision, AR/VR) in unified systems
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Instructor Section */}
            <section className="mb-12">
              <h3 className="text-xl font-semibold text-carolina-blue mb-4">Instructor</h3>
              <div className="bg-neutral-50 rounded-lg p-6">
                <p className="text-neutral-700">
                  <strong>Praneeth Chakravarthula</strong><br/>
                  Assistant Professor<br/>
                  Department of Computer Science<br/>
                  Email: <a href="mailto:cpk@cs.unc.edu" className="text-carolina-blue hover:underline">cpk@cs.unc.edu</a>
                </p>
              </div>
            </section>

            {/* Logistics Section */}
            <section id="logistics" className="mb-12">
              <h2 className="text-2xl font-bold text-unc-navy mb-6 border-b border-neutral-200 pb-3">Course Logistics</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-neutral-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-carolina-blue mb-3">Meeting Times</h3>
                  <p className="text-neutral-700">
                    <strong>Lectures:</strong> Mondays & Wednesdays 3:30-4:45pm<br/>
                    <strong>Location:</strong> Sitterson Hall 011<br/>
                    <strong>Office Hours:</strong> Thursdays 2:00-3:00pm (Sitterson 205)
                  </p>
                </div>
                
                <div className="bg-neutral-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-carolina-blue mb-3">Course Communication</h3>
                  <p className="text-neutral-700">
                    <strong>Course Site:</strong> Canvas<br/>
                    <strong>Discussions:</strong> Ed Discussion<br/>
                    <strong>Code Repository:</strong> GitHub Classroom
                  </p>
                </div>
              </div>
            </section>

            {/* Courseware Section */}
            <section id="courseware" className="mb-12">
              <h2 className="text-2xl font-bold text-unc-navy mb-6 border-b border-neutral-200 pb-3">Course Materials</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-carolina-blue mb-3">Textbooks & References</h3>
                  <ul className="space-y-3 text-neutral-700">
                                         <li className="border-l-4 border-carolina-blue pl-4">
                       <strong>Primary:</strong> Hennessy &amp; Patterson, &ldquo;Computer Architecture: A Quantitative Approach&rdquo; (6th Ed.)
                    </li>
                    <li className="border-l-4 border-neutral-300 pl-4">
                      <strong>Reference:</strong> Real-Time Rendering (4th Ed.) by Akenine-Möller et al.
                    </li>
                    <li className="border-l-4 border-neutral-300 pl-4">
                      <strong>Reference:</strong> Selected papers on visual computing systems (provided on Canvas)
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-carolina-blue mb-3">Software & Development Environment</h3>
                  <div className="bg-neutral-50 rounded-lg p-6">
                    <p className="text-neutral-700 mb-3">Course projects will use:</p>
                    <ul className="space-y-2 text-neutral-700">
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-carolina-blue rounded-full mr-3"></span>
                        C++/CUDA for high-performance computing
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-carolina-blue rounded-full mr-3"></span>
                        OpenGL/Vulkan for graphics programming
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-carolina-blue rounded-full mr-3"></span>
                        Python for prototyping and analysis
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-carolina-blue rounded-full mr-3"></span>
                        Unity/Unreal for AR/VR development
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Coursework Section */}
            <section id="coursework" className="mb-12">
              <h2 className="text-2xl font-bold text-unc-navy mb-6 border-b border-neutral-200 pb-3">Coursework</h2>
              
              <div className="space-y-6">
                <div className="bg-campus-sandstone/20 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-carolina-blue mb-4">Grade Distribution</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-unc-navy">35%</div>
                      <div className="text-sm text-neutral-600">Programming Projects</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-unc-navy">20%</div>
                      <div className="text-sm text-neutral-600">Midterm Exam</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-unc-navy">35%</div>
                      <div className="text-sm text-neutral-600">Final Project</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-unc-navy">10%</div>
                      <div className="text-sm text-neutral-600">Participation</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-carolina-blue mb-4">Programming Projects (35%)</h3>
                  <p className="text-neutral-700 mb-4">
                    Three major programming projects focusing on different aspects of visual computing systems: 
                    real-time rendering pipeline, computer vision system, and AR/VR application development.
                  </p>
                  
                  <div className="bg-neutral-50 rounded-lg p-4">
                    <h4 className="font-semibold text-unc-navy mb-2">Project Topics</h4>
                    <ul className="text-neutral-700 text-sm space-y-1">
                      <li>• Project 1: GPU-accelerated image processing pipeline</li>
                      <li>• Project 2: Real-time object detection and tracking system</li>
                      <li>• Project 3: AR application with spatial mapping</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-carolina-blue mb-4">Final Project (35%)</h3>
                  <p className="text-neutral-700">
                    Students will design and implement a comprehensive visual computing system that integrates 
                    multiple course concepts. Projects can focus on novel applications, performance optimizations, 
                    or system architectures. Teams of 2-4 students are encouraged.
                  </p>
                </div>

                <div className="bg-neutral-50 rounded-lg p-4">
                  <h4 className="font-semibold text-unc-navy mb-2">Late Policy</h4>
                  <p className="text-neutral-700 text-sm">
                    Projects: 15% penalty per day late, maximum 3 days. Final project proposal cannot be late. 
                    Each student has one 72-hour extension period for the semester.
                  </p>
                </div>
              </div>
            </section>

            {/* Schedule Section */}
            <section id="schedule" className="mb-12">
              <h2 className="text-2xl font-bold text-unc-navy mb-6 border-b border-neutral-200 pb-3">Schedule & Topics</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-carolina-blue text-white">
                      <th className="border border-neutral-300 px-4 py-3 text-left">Week</th>
                      <th className="border border-neutral-300 px-4 py-3 text-left">Date</th>
                      <th className="border border-neutral-300 px-4 py-3 text-left">Topic</th>
                      <th className="border border-neutral-300 px-4 py-3 text-left">Assignment</th>
                    </tr>
                  </thead>
                  <tbody className="text-neutral-700">
                    <tr className="bg-neutral-50">
                      <td className="border border-neutral-300 px-4 py-3">1</td>
                      <td className="border border-neutral-300 px-4 py-3">Aug 25</td>
                      <td className="border border-neutral-300 px-4 py-3">Introduction to Visual Computing Systems</td>
                      <td className="border border-neutral-300 px-4 py-3">-</td>
                    </tr>
                    <tr>
                      <td className="border border-neutral-300 px-4 py-3">2</td>
                      <td className="border border-neutral-300 px-4 py-3">Sep 1</td>
                      <td className="border border-neutral-300 px-4 py-3">Graphics Pipelines & GPU Architecture</td>
                      <td className="border border-neutral-300 px-4 py-3">P1 Out</td>
                    </tr>
                    <tr className="bg-neutral-50">
                      <td className="border border-neutral-300 px-4 py-3">3</td>
                      <td className="border border-neutral-300 px-4 py-3">Sep 8</td>
                      <td className="border border-neutral-300 px-4 py-3">Real-time Rendering Techniques</td>
                      <td className="border border-neutral-300 px-4 py-3">-</td>
                    </tr>
                    <tr>
                      <td className="border border-neutral-300 px-4 py-3">4</td>
                      <td className="border border-neutral-300 px-4 py-3">Sep 15</td>
                      <td className="border border-neutral-300 px-4 py-3">Computer Vision System Architecture</td>
                      <td className="border border-neutral-300 px-4 py-3">P1 Due, P2 Out</td>
                    </tr>
                    <tr className="bg-neutral-50">
                      <td className="border border-neutral-300 px-4 py-3">5</td>
                      <td className="border border-neutral-300 px-4 py-3">Sep 22</td>
                      <td className="border border-neutral-300 px-4 py-3">Sensor Integration & Data Acquisition</td>
                      <td className="border border-neutral-300 px-4 py-3">-</td>
                    </tr>
                    <tr>
                      <td className="border border-neutral-300 px-4 py-3">6</td>
                      <td className="border border-neutral-300 px-4 py-3">Sep 29</td>
                      <td className="border border-neutral-300 px-4 py-3">Display Technologies & AR/VR Systems</td>
                      <td className="border border-neutral-300 px-4 py-3">P2 Due, P3 Out</td>
                    </tr>
                    <tr className="bg-neutral-50">
                      <td className="border border-neutral-300 px-4 py-3">7</td>
                      <td className="border border-neutral-300 px-4 py-3">Oct 6</td>
                      <td className="border border-neutral-300 px-4 py-3">AI Integration in Visual Systems</td>
                      <td className="border border-neutral-300 px-4 py-3">Final Project Proposal</td>
                    </tr>
                    <tr>
                      <td className="border border-neutral-300 px-4 py-3">8</td>
                      <td className="border border-neutral-300 px-4 py-3">Oct 13</td>
                      <td className="border border-neutral-300 px-4 py-3">Midterm Exam</td>
                      <td className="border border-neutral-300 px-4 py-3">P3 Due</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <p className="text-sm text-neutral-600 mt-4">
                * Schedule subject to change. Updated schedule will be posted on Canvas.
              </p>
            </section>

            {/* Additional Information */}
            <section id="additional" className="mb-12">
              <h2 className="text-2xl font-bold text-unc-navy mb-6 border-b border-neutral-200 pb-3">Additional Information</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-carolina-blue mb-3">Prerequisites</h3>
                  <div className="bg-neutral-50 rounded-lg p-6">
                    <ul className="space-y-2 text-neutral-700">
                      <li><strong>Required:</strong> COMP 411 (Computer Organization), COMP 410 (Data Structures)</li>
                      <li><strong>Recommended:</strong> COMP 575 (Computer Vision), COMP 770 (Computer Graphics)</li>
                      <li><strong>Programming:</strong> Proficiency in C/C++, familiarity with GPU programming helpful</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-carolina-blue mb-3">Hardware Requirements</h3>
                  <div className="bg-neutral-50 rounded-lg p-6">
                    <p className="text-neutral-700 mb-2">
                      Students will have access to lab machines with dedicated GPUs. Personal laptops should have:
                    </p>
                    <ul className="space-y-1 text-neutral-700 text-sm">
                      <li>• Dedicated graphics card (NVIDIA GTX 1060 or better recommended)</li>
                      <li>• 8+ GB RAM</li>
                      <li>• Support for OpenGL 4.5+ or Vulkan</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-carolina-blue mb-3">Related Courses</h3>
                  <ul className="space-y-1 text-neutral-700">
                    <li>• COMP 575: Computer Vision</li>
                    <li>• COMP 770: Computer Graphics</li>
                    <li>• COMP 590: Computational Imaging</li>
                    <li>• COMP 560: Computer Networks</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-carolina-blue mb-3">Industry Connections</h3>
                  <p className="text-neutral-700">
                    The course includes guest lectures from industry professionals at companies like NVIDIA, 
                    Meta Reality Labs, Apple, and Microsoft HoloLens teams. Students will gain insights into 
                    real-world visual computing system challenges and career opportunities.
                  </p>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
} 