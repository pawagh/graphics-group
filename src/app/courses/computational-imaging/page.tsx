'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import '../../animations.css';

export default function ComputationalImaging() {
  const [activeSection, setActiveSection] = useState('description');
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80" 
          alt="Computational Imaging and Optics" 
          fill
          className="object-cover object-center" 
        />
        <div className="absolute inset-0 bg-unc-navy/70 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-3xl md:text-5xl font-bold mb-2">COMP 590</h1>
            <h2 className="text-xl md:text-2xl font-light">Computational Imaging</h2>
            <p className="text-sm md:text-base mt-2 opacity-90">Spring 2026</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Mobile Navigation Header */}
        <div className="lg:hidden mb-6">
          <div className="bg-white rounded-lg shadow-md border border-neutral-200 p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-carolina-blue text-lg">COMP 590</h3>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 text-carolina-blue hover:bg-neutral-100 rounded-md transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
            
            {/* Mobile Navigation Menu */}
            {sidebarOpen && (
              <div className="mt-4 pt-4 border-t border-neutral-200">
                <nav className="space-y-2">
                  {navigationItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        scrollToSection(item.id);
                        setSidebarOpen(false);
                      }}
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
                <div className="mt-4 pt-4 border-t border-neutral-200">
                  <Link 
                    href="/courses" 
                    className="text-carolina-blue hover:text-unc-navy text-sm font-medium transition-colors duration-200"
                  >
                    ← Back to Courses
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar Navigation */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 bg-white rounded-lg shadow-md border border-neutral-200">
              <div className="p-4 border-b border-neutral-200">
                <h3 className="font-bold text-carolina-blue text-lg">COMP 590</h3>
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
                  This course provides a comprehensive introduction to computational imaging systems and their applications across consumer electronics, scientific imaging, HCI, medical imaging, microscopy, and remote sensing. Students will explore the intersection of optics, signal processing, and machine learning in modern imaging systems.
                </p>

                <p className="text-neutral-700 leading-relaxed">
                  The course covers digital photography, advanced image processing techniques, convolutional neural networks for imaging applications, denoising, deconvolution, single pixel imaging, inverse problems, wave optics, and end-to-end optimization of optics and image processing pipelines. Emphasis is placed on applied image processing and solving inverse problems using classic algorithms, formal optimization, and modern AI techniques.
                </p>

                <div className="bg-campus-sandstone/30 rounded-lg p-6 mt-6">
                  <h3 className="text-lg font-semibold text-carolina-blue mb-4">Learning Objectives</h3>
                  <p className="text-neutral-700 mb-4">By the end of this course, students will be able to:</p>
                  <ul className="space-y-2 text-neutral-700">
                    <li className="flex items-start">
                      <span className="text-carolina-blue mr-2">•</span>
                      Understand and implement computational imaging algorithms from research papers
                    </li>
                    <li className="flex items-start">
                      <span className="text-carolina-blue mr-2">•</span>
                      Design and optimize end-to-end imaging systems
                    </li>
                    <li className="flex items-start">
                      <span className="text-carolina-blue mr-2">•</span>
                      Apply machine learning techniques to imaging problems
                    </li>
                    <li className="flex items-start">
                      <span className="text-carolina-blue mr-2">•</span>
                      Solve inverse problems using modern optimization techniques
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
                    <strong>Lectures:</strong> Tuesdays & Thursdays 2:00-3:15pm<br/>
                    <strong>Location:</strong> Sitterson Hall 014<br/>
                    <strong>Office Hours:</strong> Wednesdays 1:00-2:00pm (Sitterson 205)
                  </p>
                </div>
                
                <div className="bg-neutral-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-carolina-blue mb-3">Course Communication</h3>
                  <p className="text-neutral-700">
                    <strong>Course Site:</strong> Canvas<br/>
                    <strong>Discussions:</strong> Ed Discussion<br/>
                    <strong>Announcements:</strong> Posted on Canvas
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
                       <strong>Primary:</strong> Szeliski, &ldquo;Computer Vision: Algorithms and Applications&rdquo; (2nd Ed.)
                     </li>
                     <li className="border-l-4 border-neutral-300 pl-4">
                       <strong>Reference:</strong> Gonzalez &amp; Woods, &ldquo;Digital Image Processing&rdquo; (4th Ed.)
                    </li>
                    <li className="border-l-4 border-neutral-300 pl-4">
                      <strong>Reference:</strong> Selected research papers (provided on Canvas)
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-carolina-blue mb-3">Software & Tools</h3>
                  <div className="bg-neutral-50 rounded-lg p-6">
                    <p className="text-neutral-700 mb-3">All programming assignments will use:</p>
                    <ul className="space-y-2 text-neutral-700">
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-carolina-blue rounded-full mr-3"></span>
                        Python 3.8+ with NumPy, SciPy, OpenCV
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-carolina-blue rounded-full mr-3"></span>
                        PyTorch for deep learning components
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-carolina-blue rounded-full mr-3"></span>
                        Jupyter Notebooks for assignments
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
                      <div className="text-2xl font-bold text-unc-navy">40%</div>
                      <div className="text-sm text-neutral-600">Assignments</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-unc-navy">15%</div>
                      <div className="text-sm text-neutral-600">Midterm</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-unc-navy">30%</div>
                      <div className="text-sm text-neutral-600">Final Project</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-unc-navy">15%</div>
                      <div className="text-sm text-neutral-600">Participation</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-carolina-blue mb-4">Programming Assignments (40%)</h3>
                  <p className="text-neutral-700 mb-4">
                    Four programming assignments will require implementing computational imaging algorithms from research papers. Each assignment includes theoretical analysis and practical implementation.
                  </p>
                  
                  <div className="bg-neutral-50 rounded-lg p-4">
                    <h4 className="font-semibold text-unc-navy mb-2">Late Policy</h4>
                    <p className="text-neutral-700 text-sm">
                      10% penalty per day late. No assignments accepted more than 3 days late. 
                      Each student has one 48-hour grace period for the semester.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-carolina-blue mb-4">Final Project (30%)</h3>
                  <p className="text-neutral-700">
                    Students will work in teams of 2-3 to implement and extend a recent computational imaging paper. 
                    Projects include proposal, implementation, analysis, and presentation components.
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
                      <td className="border border-neutral-300 px-4 py-3">Jan 14</td>
                      <td className="border border-neutral-300 px-4 py-3">Course Introduction & Image Formation</td>
                      <td className="border border-neutral-300 px-4 py-3">-</td>
                    </tr>
                    <tr>
                      <td className="border border-neutral-300 px-4 py-3">2</td>
                      <td className="border border-neutral-300 px-4 py-3">Jan 21</td>
                      <td className="border border-neutral-300 px-4 py-3">Digital Photography & ISP Pipeline</td>
                      <td className="border border-neutral-300 px-4 py-3">A1 Out</td>
                    </tr>
                    <tr className="bg-neutral-50">
                      <td className="border border-neutral-300 px-4 py-3">3</td>
                      <td className="border border-neutral-300 px-4 py-3">Jan 28</td>
                      <td className="border border-neutral-300 px-4 py-3">Image Enhancement & Denoising</td>
                      <td className="border border-neutral-300 px-4 py-3">-</td>
                    </tr>
                    <tr>
                      <td className="border border-neutral-300 px-4 py-3">4</td>
                      <td className="border border-neutral-300 px-4 py-3">Feb 4</td>
                      <td className="border border-neutral-300 px-4 py-3">Inverse Problems & Deconvolution</td>
                      <td className="border border-neutral-300 px-4 py-3">A1 Due, A2 Out</td>
                    </tr>
                    <tr className="bg-neutral-50">
                      <td className="border border-neutral-300 px-4 py-3">5</td>
                      <td className="border border-neutral-300 px-4 py-3">Feb 11</td>
                      <td className="border border-neutral-300 px-4 py-3">CNNs for Imaging Applications</td>
                      <td className="border border-neutral-300 px-4 py-3">-</td>
                    </tr>
                    <tr>
                      <td className="border border-neutral-300 px-4 py-3">6</td>
                      <td className="border border-neutral-300 px-4 py-3">Feb 18</td>
                      <td className="border border-neutral-300 px-4 py-3">Wave Optics & Computational Cameras</td>
                      <td className="border border-neutral-300 px-4 py-3">A2 Due</td>
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
                      <li><strong>Required:</strong> COMP 410 (Data Structures), MATH 347 (Linear Algebra)</li>
                      <li><strong>Recommended:</strong> COMP 572 (Machine Learning), programming experience in Python</li>
                      <li><strong>Mathematical Background:</strong> Multivariable calculus, basic probability theory</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-carolina-blue mb-3">Academic Integrity</h3>
                  <p className="text-neutral-700">
                    All work must be your own. Collaboration on assignments is encouraged at the conceptual level, 
                    but all code and writeups must be individually completed. Use of AI tools must be disclosed 
                    and is subject to course-specific policies outlined in the syllabus.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-carolina-blue mb-3">Related Courses</h3>
                  <ul className="space-y-1 text-neutral-700">
                    <li>• COMP 575: Computer Vision</li>
                    <li>• COMP 770: Computer Graphics</li>
                    <li>• COMP 572: Machine Learning</li>
                  </ul>
                </div>
              </div>
            </section>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 