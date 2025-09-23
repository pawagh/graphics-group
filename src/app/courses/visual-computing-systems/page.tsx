'use client'
import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import '../../animations.css';

export default function VisualComputingSystems() {
  const [activeSection, setActiveSection] = useState('description');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigationItems = useMemo(() => [
    { id: 'description', label: 'Description' },
    { id: 'logistics', label: 'Logistics' },
    { id: 'courseware', label: 'Courseware' },
    { id: 'coursework', label: 'Coursework' },
    { id: 'schedule', label: 'Schedule' },
    { id: 'additional', label: 'Additional Info' }
  ], []);

  // Scroll detection to highlight active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = navigationItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100; // Offset for header

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          if (activeSection !== navigationItems[i].id) {
            setActiveSection(navigationItems[i].id);
          }
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection, navigationItems]);

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
            <h1 className="text-3xl md:text-5xl font-bold mb-2">COMP 790-175</h1>
            <h2 className="text-xl md:text-2xl font-light">Visual Computing Systems</h2>
            <p className="text-sm md:text-base mt-2 opacity-90">Fall 2025</p>
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
                  href="/courses" 
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
                    This graduate-level seminar explores recent advances in visual computing systems, with a strong emphasis on computational imaging. Topics include light transport modeling, computational imaging tasks and sensors, opto-electronic system design, and inverse problems in imaging.
                  </p>

                  <p className="text-neutral-700 leading-relaxed">
                    While the course emphasizes theoretical foundations, we will also connect these ideas to emerging developments in generative AI and their applications in visual computing. We will devote the first few classes to introductory lectures. The remainder of the semester will focus on student-led paper presentations and discussions. Students will also undertake a semester-long research project.
                  </p>

                  <div className="bg-campus-sandstone/30 rounded-lg p-6 mt-6">
                    <h3 className="text-lg font-semibold text-carolina-blue mb-4">Target Audience</h3>
                    <p className="text-neutral-700">
                      Masters and PhD students interested in computational cameras, computational displays, graphics, imaging systems and visual computing.
                    </p>
                  </div>

                  <div className="bg-campus-sandstone/30 rounded-lg p-6 mt-6">
                    <h3 className="text-lg font-semibold text-carolina-blue mb-4">Learning Objectives & Outcomes</h3>
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

              {/* Instructor Section */}
              <section className="mb-12">
                <h3 className="text-xl font-semibold text-carolina-blue mb-4">Instructor</h3>
                <div className="bg-neutral-50 rounded-lg p-6">
                  <p className="text-neutral-700">
                    <strong>Prof. Praneeth Chakravarthula</strong><br/>
                    Department of Computer Science<br/>
                    Email: <a href="mailto:praneeth@cs.unc.edu" className="text-carolina-blue hover:underline">praneeth@cs.unc.edu</a><br/>
                    Office Hours: By appointment only (SN 205 or Zoom)
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
                      <strong>Lectures:</strong> Tuesday/Thursday, 11:00am-12:15pm<br/>
                      <strong>Location:</strong> FB141<br/>
                    </p>
                  </div>
                  
                  <div className="bg-neutral-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-carolina-blue mb-3">Course Communication</h3>
                    <p className="text-neutral-700">
                      <strong>Course Site:</strong> Canvas and/or course website<br/>
                      <strong>Slides:</strong> Posted on Canvas and course website<br/>
                      <strong>Presentation Schedule:</strong> Available on course website
                    </p>
                  </div>
                </div>
              </section>

              {/* Courseware Section */}
              <section id="courseware" className="mb-12">
                <h2 className="text-2xl font-bold text-unc-navy mb-6 border-b border-neutral-200 pb-3">Course Materials</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-carolina-blue mb-3">Study Materials</h3>
                    <ul className="space-y-3 text-neutral-700">
                      <li className="border-l-4 border-carolina-blue pl-4">
                         <strong>Primary:</strong> Slides and additional readings posted on Canvas and/or course website
                      </li>
                      <li className="border-l-4 border-neutral-300 pl-4">
                        <strong>Foundation:</strong> First principles of computer vision video lecture series (required viewing during first 3 weeks)
                      </li>
                      <li className="border-l-4 border-neutral-300 pl-4">
                        <strong>Reference:</strong> Siggraph example review form for paper reviews
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-carolina-blue mb-3">Programming Requirements</h3>
                    <div className="bg-neutral-50 rounded-lg p-6">
                      <p className="text-neutral-700 mb-3">Students are expected to be comfortable with:</p>
                      <ul className="space-y-2 text-neutral-700">
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-carolina-blue rounded-full mr-3"></span>
                          Python (preferred)
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-carolina-blue rounded-full mr-3"></span>
                          PyTorch/TensorFlow
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-carolina-blue rounded-full mr-3"></span>
                          MATLAB
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
                        <div className="text-2xl font-bold text-unc-navy">50%</div>
                        <div className="text-sm text-neutral-600">Course Project</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-unc-navy">25%</div>
                        <div className="text-sm text-neutral-600">Paper Reviews</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-unc-navy">15%</div>
                        <div className="text-sm text-neutral-600">Paper Presentation</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-unc-navy">10%</div>
                        <div className="text-sm text-neutral-600">Attendance & Participation</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-carolina-blue mb-4">Seminar Format</h3>
                    <p className="text-neutral-700 mb-4">
                      Each student will present 1-2 papers during the semester. Before each class, all students must read the assigned papers and submit a written review (format provided by the instructor).
                    </p>
                    
                    <div className="bg-neutral-50 rounded-lg p-4">
                      <h4 className="font-semibold text-unc-navy mb-2">Class Structure</h4>
                      <ul className="text-neutral-700 text-sm space-y-2">
                        <li>• The instructor provides an overview of the research topic and paper</li>
                        <li>• The assigned student presents a 20-minute detailed technical analysis, followed by discussion and Q&A</li>
                        <li>• Students are divided into two groups, arguing for acceptance vs. rejection of the paper based on its merits and limitations</li>
                        <li>• Active participation is expected in discussions and debates. Attendance will be recorded for each session</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-carolina-blue mb-4">Final Project (50%)</h3>
                    <p className="text-neutral-700 mb-4">
                      All students will write a &ldquo;mini-paper&rdquo; as a final project. The paper should extend one or more papers covered in class. Students should write code and carry out additional experiments and then write up the results in a standard conference paper format.
                    </p>
                    <div className="bg-neutral-50 rounded-lg p-4">
                      <h4 className="font-semibold text-unc-navy mb-2">Project Guidelines</h4>
                      <ul className="text-neutral-700 text-sm space-y-1">
                        <li>• Students welcome to work in groups (2-4 people recommended)</li>
                        <li>• Maximum paper length: 3 + n_students pages (not including references or contributions paragraph)</li>
                        <li>• Project proposal due by start of class on October 14th</li>
                        <li>• Final presentations during final exam period - all group members must present</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-neutral-50 rounded-lg p-4">
                    <h4 className="font-semibold text-unc-navy mb-2">Attendance & Late Work Policy</h4>
                    <p className="text-neutral-700 text-sm mb-2">
                      If you miss a class without completing the corresponding assignment, you&rsquo;ll get a zero for that session. There&rsquo;s no way to accept late work for readings since it&rsquo;s vital that we&rsquo;re all reading the same papers at the same time.
                    </p>
                    <p className="text-neutral-700 text-sm">
                      Final project cannot be accepted after the scheduled final exam slot since you need to present it then.
                    </p>
                  </div>
                </div>
              </section>

              {/* Schedule Section */}
              <section id="schedule" className="mb-12">
                <h2 className="text-2xl font-bold text-unc-navy mb-6 border-b border-neutral-200 pb-3">Schedule & Topics</h2>
                
                <div className="space-y-6">
                  {/* Foundations */}
                  <div className="bg-neutral-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-carolina-blue mb-4">Foundations</h3>
                    <div className="space-y-3 text-sm">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="font-medium">Week 1</div>
                        <div>Aug 19, Tues: Introduction and fast forward<br/>Aug 21, Thurs: Linear algebra recap</div>
                        <div className="text-neutral-600">Review First principles of computer vision</div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="font-medium">Week 2</div>
                        <div>Aug 26, Tues: Digital photography and camera ISP<br/>Aug 28, Thurs: Image recovery and inverse problems</div>
                        <div className="text-neutral-600">Continue video series</div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="font-medium">Week 3</div>
                        <div>Sep 2, Tues: Deep learning recap<br/>Sep 4, Thurs: No class</div>
                        <div className="text-neutral-600">Finish reviewing First principles</div>
                      </div>
                    </div>
                  </div>

                  {/* Coded and Computational Cameras */}
                  <div className="bg-neutral-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-carolina-blue mb-4">Coded and Computational Cameras</h3>
                    <div className="space-y-3 text-sm">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="font-medium">Week 4</div>
                        <div>Sep 9, Tues: Coded aperture imaging<br/>Sep 11, Thurs: Deep optics</div>
                        <div className="text-neutral-600">Add: Coded aperture projection, Dappled Photography</div>
                      </div>
                    </div>
                  </div>

                  {/* High-Dimensional Imaging */}
                  <div className="bg-neutral-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-carolina-blue mb-4">High-Dimensional Imaging</h3>
                    <div className="space-y-3 text-sm">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="font-medium">Week 5</div>
                        <div>Sep 16, Tues: Light field photography with a hand-held plenoptic camera<br/>Sep 18, Thurs: DiffuserCam: lensless single-exposure 3D imaging</div>
                        <div></div>
                      </div>
                    </div>
                  </div>

                  {/* Single-Photon Imaging */}
                  <div className="bg-neutral-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-carolina-blue mb-4">Single-Photon Imaging</h3>
                    <div className="space-y-3 text-sm">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="font-medium">Week 6</div>
                        <div>Sep 23, Tues: Passive inter-photon imaging<br/>Sep 25, Thurs: Quanta burst photography</div>
                        <div></div>
                      </div>
                    </div>
                  </div>

                  {/* Computational Light Transport */}
                  <div className="bg-neutral-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-carolina-blue mb-4">Computational Light Transport</h3>
                    <div className="space-y-3 text-sm">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="font-medium">Week 7</div>
                        <div>Sep 30, Tues: Femto-photography: capturing and visualizing the propagation of light<br/>Oct 2, Thurs: Recovering 3D shape around the corner using ultrafast time-of-flight imaging</div>
                        <div></div>
                      </div>
                    </div>
                  </div>

                  {/* Mid-term Project Proposals */}
                  <div className="bg-campus-sandstone/30 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-carolina-blue mb-4">Mid-term Project Proposals</h3>
                    <div className="space-y-3 text-sm">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="font-medium">Week 8</div>
                        <div>Oct 7, Tues: No class (Well Being day)<br/>Oct 9, Thurs: Project proposals and presentations</div>
                        <div className="text-neutral-600 font-medium">Project Proposal Due</div>
                      </div>
                    </div>
                  </div>

                  {/* Neural Rendering and Advanced Topics */}
                  <div className="space-y-4">
                    <div className="bg-neutral-50 rounded-lg p-4">
                      <h4 className="font-semibold text-unc-navy mb-2">Weeks 9-16: Advanced Topics</h4>
                      <ul className="text-sm text-neutral-700 space-y-1">
                        <li>• Unconventional Imaging and Sensing (Week 9)</li>
                        <li>• Neural Rendering and Gaussian Splatting (Week 10)</li>
                        <li>• Neural Representations and Computational Imaging I & II (Weeks 11-12)</li>
                        <li>• Generative AI and Computational Imaging I & II (Weeks 13-14)</li>
                        <li>• Final Projects Q&A and Presentations (Weeks 15-16)</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-neutral-600 mt-4">
                  * Schedule subject to change. Updated schedule and presentation schedule available on course website.
                </p>
              </section>

              {/* Additional Information */}
              <section id="additional" className="mb-12">
                <h2 className="text-2xl font-bold text-unc-navy mb-6 border-b border-neutral-200 pb-3">Additional Information</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-carolina-blue mb-3">Prerequisites</h3>
                    <div className="bg-neutral-50 rounded-lg p-6">
                      <p className="text-neutral-700 mb-3">Students are expected to have background knowledge in:</p>
                      <ul className="space-y-2 text-neutral-700">
                        <li><strong>Linear algebra:</strong> vectors, matrices, tensors, dimensional analysis</li>
                        <li><strong>Signal processing:</strong> convolutions, Fourier transforms, linear systems</li>
                        <li><strong>Basic optics:</strong> lenses, light as rays and waves, cameras, image formation</li>
                        <li><strong>Programming:</strong> Python (preferred), PyTorch/TensorFlow, MATLAB</li>
                      </ul>
                      <p className="text-neutral-700 mt-3 text-sm italic">
                        Before taking the class, you should be comfortable with basic camera image formation and able to read a recent ML conference paper and understand it at a conceptual level.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-carolina-blue mb-3">University Policies</h3>
                    <div className="bg-neutral-50 rounded-lg p-6 space-y-4">
                      <div>
                        <h4 className="font-semibold text-unc-navy mb-2">Accessibility Resources</h4>
                        <p className="text-neutral-700 text-sm">
                          UNC facilitates reasonable accommodations for students with disabilities. Contact the Office of Accessibility Resources and Service (ARS) at <a href="https://ars.unc.edu" className="text-carolina-blue hover:underline">ars.unc.edu</a> or email <a href="mailto:ars@unc.edu" className="text-carolina-blue hover:underline">ars@unc.edu</a>.
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-unc-navy mb-2">Mental Health Resources</h4>
                        <p className="text-neutral-700 text-sm">
                          CAPS is committed to addressing mental health needs. Visit <a href="https://caps.unc.edu" className="text-carolina-blue hover:underline">caps.unc.edu</a> or visit their facilities on the third floor of Campus Health Services for walk-in evaluation.
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-unc-navy mb-2">Title IX and Safety</h4>
                        <p className="text-neutral-700 text-sm">
                          Students impacted by discrimination, harassment, or violence should contact the Director of Title IX Compliance (Adrienne Allison - <a href="mailto:Adrienne.allison@unc.edu" className="text-carolina-blue hover:underline">Adrienne.allison@unc.edu</a>) or Report and Response Coordinators (<a href="mailto:reportandresponse@unc.edu" className="text-carolina-blue hover:underline">reportandresponse@unc.edu</a>). Additional resources at <a href="https://safe.unc.edu" className="text-carolina-blue hover:underline">safe.unc.edu</a>.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-carolina-blue mb-3">Honor Code</h3>
                    <div className="bg-neutral-50 rounded-lg p-6">
                      <p className="text-neutral-700 text-sm">
                        All students are expected to follow the guidelines of the UNC honor code. It is particularly important that you cite the source of different ideas, facts, or methods and do not claim someone else&rsquo;s work as your own. If you are unsure about which actions violate the honor code, feel free to ask the instructor.
                      </p>
                    </div>
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