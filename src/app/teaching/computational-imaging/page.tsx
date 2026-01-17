'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import '../../animations.css';

export default function AdvancedVisualComputing() {
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
    { id: 'prerequisites', label: 'Prerequisites' },
    { id: 'grading', label: 'Grading' },
    { id: 'seminar', label: 'Seminar Format' },
    { id: 'schedule', label: 'Schedule' },
    { id: 'project', label: 'Final Project' },
    { id: 'policies', label: 'Policies' }
  ];

  const scheduleData = [
    { week: '1', date: 'Jan 7, Wed', topic: 'Introduction and fast forward', section: 'Foundations' },
    { week: '2', date: 'Jan 12, Mon', topic: 'Linear algebra recap', section: '' },
    { week: '2', date: 'Jan 14, Wed', topic: 'Image recovery and inverse problems', section: '' },
    { week: '3', date: 'Jan 19, Mon', topic: 'No class (MLK Day)', section: '', isHoliday: true },
    { week: '3', date: 'Jan 21, Wed', topic: 'Neural networks and diffusion models', section: '' },
    { week: '4', date: 'Jan 26, Mon', topic: 'Deep Tensor ADMM-Net for Snapshot Compressive Imaging', section: 'Model-based Deep Learning and Unrolled Optimization' },
    { week: '4', date: 'Jan 28, Wed', topic: 'End-to-End Optimization of Optics and Image Processing', section: '' },
    { week: '5', date: 'Feb 2, Mon', topic: 'NeRF Basics', section: 'Neural Scene Representations' },
    { week: '5', date: 'Feb 4, Wed', topic: 'Implicit Surfaces via Volume Rendering', section: '' },
    { week: '6', date: 'Feb 9, Mon', topic: 'No class (Well Being day)', section: 'Physics-augmented Neural Fields', isHoliday: true },
    { week: '6', date: 'Feb 11, Wed', topic: 'Project proposals due', section: '', isDeadline: true },
    { week: '7', date: 'Feb 16, Mon', topic: 'Continuum-aware NeRF (PAC-NeRF)', section: '' },
    { week: '7', date: 'Feb 18, Wed', topic: 'NeRF in Scattering Media', section: '' },
    { week: '8', date: 'Feb 23, Mon', topic: 'Lens Design with Differentiable Ray Tracing', section: 'Differentiable Optics' },
    { week: '8', date: 'Feb 25, Wed', topic: 'Hybrid Lens Design with Differentiable Wave Optics', section: '' },
    { week: '9', date: 'Mar 2, Mon', topic: 'Diffractive Deep Neural Networks', section: 'Optical Neural Networks' },
    { week: '9', date: 'Mar 4, Wed', topic: 'Spatially Varying Nanophotonic Neural Networks', section: '' },
    { week: '10', date: 'Mar 9, Mon', topic: '3D Gaussian Splatting', section: 'Gaussian Splatting and Physics-aware Scene Models' },
    { week: '10', date: 'Mar 11, Wed', topic: 'Physics Integrated Gaussians', section: '' },
    { week: '11', date: 'Mar 16, Mon', topic: 'No Class (Spring Break)', section: 'Spring Break', isHoliday: true },
    { week: '11', date: 'Mar 18, Wed', topic: 'No Class (Spring Break)', section: '', isHoliday: true },
    { week: '12', date: 'Mar 23, Mon', topic: 'Intro to Graph Neural Networks', section: 'Graph Neural Networks' },
    { week: '12', date: 'Mar 25, Wed', topic: 'Interaction Networks for Learning Physics', section: '' },
    { week: '13', date: 'Mar 30, Mon', topic: 'GNNs as Learnable Physics Engines', section: 'Physics-inspired World Models and Simulators' },
    { week: '13', date: 'Apr 1, Wed', topic: 'Graph-based Physics Simulators', section: '' },
    { week: '14', date: 'Apr 6, Mon', topic: 'Deep Image Prior', section: 'Physics-regularized Learning and Generative Priors' },
    { week: '14', date: 'Apr 8, Wed', topic: 'GNNs and Generative Priors for Solving Inverse Problems', section: '' },
    { week: '15', date: 'Apr 13, Mon', topic: 'Invertible Generative Models', section: '' },
    { week: '15', date: 'Apr 15, Wed', topic: 'Diffusion Posterior Sampling', section: '' },
    { week: '16', date: 'Apr 20, Mon', topic: 'Buffer class, final report discussion', section: '' },
    { week: '16', date: 'Apr 22, Wed', topic: 'Buffer class, final report discussion', section: '' },
    { week: '17', date: 'Apr 27', topic: 'Buffer class, final report discussion', section: 'End of semester' },
  ];

  return (
    <div className="fade-in bg-neutral-50 min-h-screen">
      {/* Hero Section */}
      <div className="w-full h-48 md:h-64 relative mb-8">
        <Image 
          src="/lab-photos/lab-work-32.jpg" 
          alt="Advanced Visual Computing" 
          fill
          className="object-cover object-center" 
        />
        <div className="absolute inset-0 bg-unc-navy/70 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-2xl md:text-4xl font-bold mb-2">COMP 790-175</h1>
            <h2 className="text-lg md:text-2xl font-light">Advanced Visual Computing: Physics-Informed AI</h2>
            <p className="text-sm md:text-base mt-2 opacity-90">Spring 2026</p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-2 sm:px-4">
        {/* Mobile Navigation Header */}
        <div className="lg:hidden mb-6">
          <div className="bg-white rounded-lg shadow-md border border-neutral-200 p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-carolina-blue text-lg">COMP 790-175</h3>
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
                    href="/teaching" 
                    className="text-carolina-blue hover:text-unc-navy text-sm font-medium transition-colors duration-200"
                  >
                    ← Back to Courses
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="w-full lg:flex lg:gap-8">
          {/* Desktop Sidebar Navigation */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 bg-white rounded-lg shadow-md border border-neutral-200">
              <div className="p-4 border-b border-neutral-200">
                <h3 className="font-bold text-carolina-blue text-lg">COMP 790-175</h3>
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
                  href="/teaching"
                  className="text-carolina-blue hover:text-unc-navy text-sm font-medium transition-colors duration-200"
                >
                  ← Back to Courses
                </Link>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full lg:flex-1 min-w-0 bg-white rounded-lg shadow-md border border-neutral-200">
            <div className="p-3 sm:p-4 lg:p-8 break-words">
            
            {/* Description Section */}
            <section id="description" className="mb-12">
              <h2 className="text-2xl font-bold text-unc-navy mb-6 border-b border-neutral-200 pb-3">Course Description</h2>
              
              <div className="space-y-6">
                <p className="text-neutral-700 leading-relaxed">
                  This graduate-level seminar-style course explores recent advances in visual computing systems, with a strong emphasis on physics-inspired AI. Topics include:
                </p>

                <ul className="space-y-2 text-neutral-700 ml-4">
                  <li className="flex items-start">
                    <span className="text-carolina-blue mr-2">•</span>
                    Classical inverse problems, forward models
                  </li>
                  <li className="flex items-start">
                    <span className="text-carolina-blue mr-2">•</span>
                    Unrolled networks and Physics-inspired Neural Networks (PINNs) for imaging
                  </li>
                  <li className="flex items-start">
                    <span className="text-carolina-blue mr-2">•</span>
                    Neural rendering and implicit neural representations
                  </li>
                  <li className="flex items-start">
                    <span className="text-carolina-blue mr-2">•</span>
                    Diffractive neural networks
                  </li>
                </ul>

                <p className="text-neutral-700 leading-relaxed">
                  While the course emphasizes theoretical foundations, we will also connect these ideas to emerging developments in generative AI and their applications in visual computing. We will devote the first few classes to introductory lectures. The remainder of the semester will focus on student-led paper presentations and discussions. Students will also undertake a semester-long project resulting in a comprehensive review report.
                </p>

                <div className="bg-campus-sandstone/30 rounded-lg p-6 mt-6">
                  <h3 className="text-lg font-semibold text-carolina-blue mb-4">Target Audience</h3>
                  <p className="text-neutral-700">
                    Masters and PhD students interested in physics-informed AI/ML, inverse and differentiable rendering, graphics, imaging systems and visual computing.
                  </p>
                </div>

                <div className="bg-carolina-blue/10 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-carolina-blue mb-4">Learning Objectives &amp; Outcomes</h3>
                  <p className="text-neutral-700 mb-4">By the end of this course, you will be able to:</p>
                  <ul className="space-y-2 text-neutral-700">
                    <li className="flex items-start">
                      <span className="text-carolina-blue mr-2">•</span>
                      Critically read, analyze, and discuss research papers
                    </li>
                    <li className="flex items-start">
                      <span className="text-carolina-blue mr-2">•</span>
                      Improve technical presentation and communication skills
                    </li>
                    <li className="flex items-start">
                      <span className="text-carolina-blue mr-2">•</span>
                      Understand the core concepts of computational imaging systems
                    </li>
                    <li className="flex items-start">
                      <span className="text-carolina-blue mr-2">•</span>
                      Model and simulate optical/imaging systems
                    </li>
                    <li className="flex items-start">
                      <span className="text-carolina-blue mr-2">•</span>
                      Develop mathematical models for light transport and visual computing
                    </li>
                    <li className="flex items-start">
                      <span className="text-carolina-blue mr-2">•</span>
                      Gain hands-on programming and research skills through projects
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Logistics Section */}
            <section id="logistics" className="mb-12">
              <h2 className="text-2xl font-bold text-unc-navy mb-6 border-b border-neutral-200 pb-3">Course Logistics</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-neutral-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-carolina-blue mb-3">Meeting Times</h3>
                  <p className="text-neutral-700">
                    <strong>Days:</strong> Monday/Wednesday<br/>
                    <strong>Time:</strong> 3:35pm - 4:50pm<br/>
                    <strong>Location:</strong> FB141
                  </p>
                </div>
                
                <div className="bg-neutral-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-carolina-blue mb-3">Instructor</h3>
                  <p className="text-neutral-700">
                    <strong>Prof. Praneeth Chakravarthula</strong><br/>
                    Email: <a href="mailto:praneeth@cs.unc.edu" className="text-carolina-blue hover:underline">praneeth@cs.unc.edu</a><br/>
                    <strong>Office Hours:</strong> By appointment only<br/>
                    (SN 205 or Zoom)
                  </p>
                </div>
              </div>
            </section>

            {/* Prerequisites Section */}
            <section id="prerequisites" className="mb-12">
              <h2 className="text-2xl font-bold text-unc-navy mb-6 border-b border-neutral-200 pb-3">Prerequisites</h2>
              
              <div className="bg-neutral-50 rounded-lg p-6">
                <p className="text-neutral-700 mb-4">Students are expected to have background knowledge in:</p>
                <ul className="space-y-3 text-neutral-700">
                  <li className="flex items-start">
                    <span className="text-carolina-blue mr-2 font-bold">•</span>
                    <span><strong>Linear algebra:</strong> vectors, matrices, tensors, dimensional analysis</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-carolina-blue mr-2 font-bold">•</span>
                    <span><strong>Signal processing:</strong> convolutions, Fourier transforms, linear systems</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-carolina-blue mr-2 font-bold">•</span>
                    <span><strong>Basic optics:</strong> lenses, light as rays and waves, cameras, image formation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-carolina-blue mr-2 font-bold">•</span>
                    <span><strong>Basic AI/ML:</strong> MLPs, CNNs, Transformers, generative models</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-carolina-blue mr-2 font-bold">•</span>
                    <span><strong>Programming:</strong> Python (preferred), PyTorch/TensorFlow, MATLAB</span>
                  </li>
                </ul>
                <div className="mt-4 p-4 bg-dome-copper/10 rounded-lg border-l-4 border-dome-copper">
                  <p className="text-neutral-700 text-sm">
                    Before taking the class, you should be comfortable with basic camera image formation, basics of AI/ML, and be able to read a recent ML conference paper and understand it at a conceptual level.
                  </p>
                </div>
              </div>
            </section>

            {/* Grading Section */}
            <section id="grading" className="mb-12">
              <h2 className="text-2xl font-bold text-unc-navy mb-6 border-b border-neutral-200 pb-3">Grading</h2>
              
              <div className="bg-campus-sandstone/20 rounded-lg p-6">
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-unc-navy">50%</div>
                    <div className="text-sm text-neutral-600 mt-1">Course Project</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-unc-navy">30%</div>
                    <div className="text-sm text-neutral-600 mt-1">Paper Presentation</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-unc-navy">20%</div>
                    <div className="text-sm text-neutral-600 mt-1">Attendance &amp; Participation</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Seminar Format Section */}
            <section id="seminar" className="mb-12">
              <h2 className="text-2xl font-bold text-unc-navy mb-6 border-b border-neutral-200 pb-3">Seminar Format</h2>
              
              <div className="space-y-6">
                <p className="text-neutral-700">
                  Each student will present 1-2 papers during the semester.
                </p>

                <div className="bg-neutral-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-carolina-blue mb-3">Before Each Class</h3>
                  <p className="text-neutral-700 mb-2">All students must:</p>
                  <ul className="space-y-2 text-neutral-700">
                    <li className="flex items-start">
                      <span className="text-carolina-blue mr-2">•</span>
                      Read the assigned papers
                    </li>
                    <li className="flex items-start">
                      <span className="text-carolina-blue mr-2">•</span>
                      Submit a written review (format provided by the instructor)
                    </li>
                  </ul>
                </div>

                <div className="bg-neutral-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-carolina-blue mb-3">Class Structure</h3>
                  <ul className="space-y-2 text-neutral-700">
                    <li className="flex items-start">
                      <span className="text-carolina-blue mr-2">1.</span>
                      The instructor provides an overview of the research topic and paper
                    </li>
                    <li className="flex items-start">
                      <span className="text-carolina-blue mr-2">2.</span>
                      The assigned student presents a 20-minute detailed technical analysis, followed by discussion and Q&amp;A
                    </li>
                    <li className="flex items-start">
                      <span className="text-carolina-blue mr-2">3.</span>
                      Students are divided into two groups, arguing for acceptance vs. arguing for rejection of the paper, based on its merits and limitations
                    </li>
                  </ul>
                </div>

                <div className="bg-dome-copper/10 rounded-lg p-4 border-l-4 border-dome-copper">
                  <p className="text-neutral-700 text-sm">
                    <strong>Note:</strong> Active participation is expected in discussions and debates. Attendance will be recorded for each session.
                  </p>
                </div>

                <div className="bg-neutral-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-carolina-blue mb-3">Study Material</h3>
                  <ul className="space-y-2 text-neutral-700">
                    <li className="flex items-start">
                      <span className="text-carolina-blue mr-2">•</span>
                      Slides and additional readings will be posted on Canvas and/or course website
                    </li>
                    <li className="flex items-start">
                      <span className="text-carolina-blue mr-2">•</span>
                      During the first 3 weeks, students are expected to watch and review video lecture series on PIML
                    </li>
                    <li className="flex items-start">
                      <span className="text-carolina-blue mr-2">•</span>
                      High level overview of PIML and ACM lecture style on PIML provide quick background
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Schedule Section */}
            <section id="schedule" className="mb-12">
              <h2 className="text-2xl font-bold text-unc-navy mb-6 border-b border-neutral-200 pb-3">Schedule &amp; Topics</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-carolina-blue text-white">
                      <th className="border border-neutral-300 px-3 py-2 text-left">Week</th>
                      <th className="border border-neutral-300 px-3 py-2 text-left">Date</th>
                      <th className="border border-neutral-300 px-3 py-2 text-left">Topic</th>
                    </tr>
                  </thead>
                  <tbody className="text-neutral-700">
                    {scheduleData.map((item, index) => (
                      <React.Fragment key={index}>
                        {item.section && (
                          <tr className="bg-unc-navy/10">
                            <td colSpan={3} className="border border-neutral-300 px-3 py-2 font-semibold text-unc-navy">
                              {item.section}
                            </td>
                          </tr>
                        )}
                        <tr className={`${item.isHoliday ? 'bg-neutral-100 text-neutral-500' : item.isDeadline ? 'bg-dome-copper/10' : index % 2 === 0 ? 'bg-neutral-50' : ''}`}>
                          <td className="border border-neutral-300 px-3 py-2">{item.week}</td>
                          <td className="border border-neutral-300 px-3 py-2 whitespace-nowrap">{item.date}</td>
                          <td className="border border-neutral-300 px-3 py-2">
                            {item.isDeadline ? <strong className="text-dome-copper">{item.topic}</strong> : item.topic}
                          </td>
                        </tr>
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <p className="text-sm text-neutral-600 mt-4">
                * Schedule subject to change. Updated schedule will be posted on Canvas.
              </p>
            </section>

            {/* Final Project Section */}
            <section id="project" className="mb-12">
              <h2 className="text-2xl font-bold text-unc-navy mb-6 border-b border-neutral-200 pb-3">Final Project</h2>
              
              <div className="space-y-6">
                <p className="text-neutral-700 leading-relaxed">
                  All students in the class will write a &ldquo;mini-paper&rdquo; as a final project. The paper should extend one or more papers we covered in the class. Students should write code and carry out additional experiments and then write up the results in a standard conference paper format.
                </p>

                <div className="bg-neutral-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-carolina-blue mb-3">Group Work</h3>
                  <ul className="space-y-2 text-neutral-700">
                    <li className="flex items-start">
                      <span className="text-carolina-blue mr-2">•</span>
                      Students are welcome to work in groups on the final project
                    </li>
                    <li className="flex items-start">
                      <span className="text-carolina-blue mr-2">•</span>
                      Groups of two are expected to put twice as much work into the project, and similarly for larger groups
                    </li>
                    <li className="flex items-start">
                      <span className="text-carolina-blue mr-2">•</span>
                      Groups with five or more people require special permission
                    </li>
                    <li className="flex items-start">
                      <span className="text-carolina-blue mr-2">•</span>
                      Groups must include a &ldquo;contributions&rdquo; paragraph listing each author&apos;s contributions
                    </li>
                  </ul>
                </div>

                <div className="bg-carolina-blue/10 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-carolina-blue mb-3">Paper Length</h3>
                  <p className="text-neutral-700">
                    Maximum paper length: <strong>3 + n_students</strong> pages (not including references or contributions paragraph), where n_students is the number of people in the group.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-dome-copper/10 rounded-lg p-6 border-l-4 border-dome-copper">
                    <h3 className="text-lg font-semibold text-dome-copper mb-3">Proposal Deadline</h3>
                    <p className="text-neutral-700">
                      <strong>Feb 11th</strong> - All groups must submit a project proposal (single-paragraph description of experiments, datasets, methods, etc.)
                    </p>
                  </div>
                  <div className="bg-carolina-blue/10 rounded-lg p-6 border-l-4 border-carolina-blue">
                    <h3 className="text-lg font-semibold text-carolina-blue mb-3">Final Presentation</h3>
                    <p className="text-neutral-700">
                      Groups will present during the final exam period. All students in each group are required to present some material.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Policies Section */}
            <section id="policies" className="mb-12">
              <h2 className="text-2xl font-bold text-unc-navy mb-6 border-b border-neutral-200 pb-3">Course Policies</h2>
              
              <div className="space-y-6">
                <div className="bg-neutral-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-carolina-blue mb-3">Attendance &amp; Late Work</h3>
                  <ul className="space-y-2 text-neutral-700 text-sm">
                    <li className="flex items-start">
                      <span className="text-carolina-blue mr-2">•</span>
                      Missing class without completing the corresponding assignment results in a zero for that session
                    </li>
                    <li className="flex items-start">
                      <span className="text-carolina-blue mr-2">•</span>
                      If you miss a class where you are presenting, you must create the presentation beforehand and find someone else to present for you
                    </li>
                    <li className="flex items-start">
                      <span className="text-carolina-blue mr-2">•</span>
                      If you miss a class in a non-presenting role, complete the assignment and send it before class starts
                    </li>
                    <li className="flex items-start">
                      <span className="text-carolina-blue mr-2">•</span>
                      Late work for readings cannot be accepted since everyone must read the same papers at the same time
                    </li>
                    <li className="flex items-start">
                      <span className="text-carolina-blue mr-2">•</span>
                      Final projects cannot be accepted after the scheduled final exam slot
                    </li>
                  </ul>
                </div>

                <div className="bg-neutral-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-carolina-blue mb-3">Honor Code</h3>
                  <p className="text-neutral-700 text-sm">
                    All students are expected to follow the guidelines of the UNC honor code. It is particularly important that you cite the source of different ideas, facts, or methods and do not claim someone else&apos;s work as your own. If you are unsure about which actions violate the honor code, feel free to ask.
                  </p>
                </div>

                <div className="bg-neutral-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-carolina-blue mb-3">Accessibility</h3>
                  <p className="text-neutral-700 text-sm">
                    The University of North Carolina at Chapel Hill facilitates the implementation of reasonable accommodations for students with disabilities, chronic medical conditions, a temporary disability or pregnancy complications. Accommodations are determined through the Office of Accessibility Resources and Service (ARS). See the <a href="https://ars.unc.edu" className="text-carolina-blue hover:underline">ARS Website</a> for contact information or email <a href="mailto:ars@unc.edu" className="text-carolina-blue hover:underline">ars@unc.edu</a>.
                  </p>
                </div>

                <div className="bg-neutral-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-carolina-blue mb-3">Mental Health Resources</h3>
                  <p className="text-neutral-700 text-sm">
                    CAPS is strongly committed to addressing the mental health needs of a diverse student body through timely access to consultation and connection to clinically appropriate services. Visit their website at <a href="https://caps.unc.edu/" className="text-carolina-blue hover:underline">caps.unc.edu</a> or visit their facilities on the third floor of the Campus Health Services building for a walk-in evaluation.
                  </p>
                </div>

                <div className="bg-neutral-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-carolina-blue mb-3">Title IX &amp; Support Resources</h3>
                  <p className="text-neutral-700 text-sm">
                    Any student who is impacted by discrimination, harassment, interpersonal violence, sexual violence, sexual exploitation, or stalking is encouraged to seek resources on campus or in the community. Contact the Director of Title IX Compliance (Adrienne Allison – <a href="mailto:Adrienne.allison@unc.edu" className="text-carolina-blue hover:underline">Adrienne.allison@unc.edu</a>), Report and Response Coordinators (<a href="mailto:reportandresponse@unc.edu" className="text-carolina-blue hover:underline">reportandresponse@unc.edu</a>), Counseling and Psychological Services (confidential), or the Gender Violence Services Coordinators (<a href="mailto:gvsc@unc.edu" className="text-carolina-blue hover:underline">gvsc@unc.edu</a>; confidential). Additional resources are available at <a href="https://safe.unc.edu" className="text-carolina-blue hover:underline">safe.unc.edu</a>.
                  </p>
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
