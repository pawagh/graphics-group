'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';

export default function VisualComputingSystemsPage() {
  const [activeSection, setActiveSection] = useState('description');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigationItems = useMemo(() => [
    { id: 'description', label: 'Description' },
    { id: 'logistics', label: 'Logistics' },
    { id: 'courseware', label: 'Courseware' },
    { id: 'coursework', label: 'Coursework' },
    { id: 'schedule', label: 'Schedule' },
    { id: 'additional', label: 'Additional Info' },
  ], []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      for (let i = navigationItems.length - 1; i >= 0; i--) {
        const section = document.getElementById(navigationItems[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navigationItems[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navigationItems]);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <div className="page-banner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Link href="/teaching" className="text-white/60 hover:text-white text-sm mb-4 inline-block">&larr; All Courses</Link>
          <h1 className="text-2xl sm:text-3xl">Visual Computing Systems</h1>
          <p>COMP 790-175 &middot; Fall 2025</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Mobile Nav Toggle */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="card px-4 py-3 w-full flex items-center justify-between"
          >
            <span className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>Course Sections</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--text-muted)' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          {sidebarOpen && (
            <div className="card mt-2 p-2">
              {navigationItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => { scrollToSection(item.id); setSidebarOpen(false); }}
                  className={`w-full text-left px-4 py-2 rounded text-sm ${activeSection === item.id ? 'bg-[var(--unc-blue)] text-white' : ''}`}
                  style={activeSection !== item.id ? { color: 'var(--text-primary)' } : {}}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="lg:flex lg:gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-56 flex-shrink-0">
            <div className="sticky top-20 card p-2">
              {navigationItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-left px-4 py-2 rounded text-sm transition-colors ${activeSection === item.id ? 'bg-[var(--unc-blue)] text-white' : 'hover:bg-[var(--bg-secondary)]'}`}
                  style={activeSection !== item.id ? { color: 'var(--text-primary)' } : {}}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Description */}
            <section id="description" className="mb-10">
              <h2 className="text-xl font-bold mb-4 pb-2 border-b" style={{ color: 'var(--text-primary)', borderColor: 'var(--border)' }}>Course Description</h2>
              <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                This graduate-level seminar explores recent advances in visual computing systems, with a strong emphasis on computational imaging. Topics include light transport modeling, computational imaging tasks and sensors, opto-electronic system design, and inverse problems in imaging.
              </p>
              <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
                While the course emphasizes theoretical foundations, we will also connect these ideas to emerging developments in generative AI and their applications in visual computing. We will devote the first few classes to introductory lectures. The remainder of the semester will focus on student-led paper presentations and discussions. Students will also undertake a semester-long research project.
              </p>

              <div className="card p-5 mb-4" style={{ borderLeft: '3px solid var(--unc-blue)' }}>
                <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Target Audience</h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Masters and PhD students interested in computational cameras, computational displays, graphics, imaging systems and visual computing.
                </p>
              </div>

              <div className="card p-5">
                <h3 className="font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Learning Objectives &amp; Outcomes</h3>
                <ul className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <li>Critically read, analyze, and discuss research papers</li>
                  <li>Improve technical presentation and communication skills</li>
                  <li>Understand the core concepts of computational imaging systems</li>
                  <li>Model and simulate optical/imaging systems</li>
                  <li>Develop mathematical models for light transport and visual computing</li>
                  <li>Gain hands-on programming and research skills through projects</li>
                </ul>
              </div>
            </section>

            {/* Logistics */}
            <section id="logistics" className="mb-10">
              <h2 className="text-xl font-bold mb-4 pb-2 border-b" style={{ color: 'var(--text-primary)', borderColor: 'var(--border)' }}>Course Logistics</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="card p-5">
                  <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Meeting Times</h3>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <strong>Days:</strong> Tuesday/Thursday<br />
                    <strong>Time:</strong> 11:00am - 12:15pm<br />
                    <strong>Location:</strong> FB141
                  </p>
                </div>
                <div className="card p-5">
                  <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Instructor</h3>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <strong>Prof. Praneeth Chakravarthula</strong><br />
                    Department of Computer Science<br />
                    Email: <a href="mailto:cpk@cs.unc.edu" className="text-[var(--unc-blue)] hover:underline">cpk@cs.unc.edu</a><br />
                    Office Hours: By appointment only (SN 205 or Zoom)
                  </p>
                </div>
              </div>
            </section>

            {/* Courseware */}
            <section id="courseware" className="mb-10">
              <h2 className="text-xl font-bold mb-4 pb-2 border-b" style={{ color: 'var(--text-primary)', borderColor: 'var(--border)' }}>Course Materials</h2>
              <div className="space-y-4">
                <div className="card p-5">
                  <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Study Materials</h3>
                  <ul className="text-sm space-y-2" style={{ color: 'var(--text-secondary)' }}>
                    <li><strong>Primary:</strong> Slides and additional readings posted on Canvas and/or course website</li>
                    <li><strong>Foundation:</strong> First principles of computer vision video lecture series (required viewing during first 3 weeks)</li>
                    <li><strong>Reference:</strong> SIGGRAPH example review form for paper reviews</li>
                  </ul>
                </div>
                <div className="card p-5">
                  <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Programming Requirements</h3>
                  <ul className="text-sm space-y-1" style={{ color: 'var(--text-secondary)' }}>
                    <li>Python (preferred)</li>
                    <li>PyTorch/TensorFlow</li>
                    <li>MATLAB</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Coursework */}
            <section id="coursework" className="mb-10">
              <h2 className="text-xl font-bold mb-4 pb-2 border-b" style={{ color: 'var(--text-primary)', borderColor: 'var(--border)' }}>Coursework</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[{ pct: '50%', label: 'Course Project' }, { pct: '25%', label: 'Paper Reviews' }, { pct: '15%', label: 'Paper Presentation' }, { pct: '10%', label: 'Attendance & Participation' }].map(g => (
                  <div key={g.label} className="card p-4 text-center">
                    <div className="text-xl font-bold" style={{ color: 'var(--unc-blue)' }}>{g.pct}</div>
                    <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{g.label}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="card p-5">
                  <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Seminar Format</h3>
                  <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                    Each student will present 1-2 papers during the semester. Before each class, all students must read the assigned papers and submit a written review.
                  </p>
                  <ol className="text-sm list-decimal list-inside space-y-1" style={{ color: 'var(--text-secondary)' }}>
                    <li>Instructor provides overview of the research topic</li>
                    <li>Assigned student presents 20-minute technical analysis, followed by Q&amp;A</li>
                    <li>Students debate acceptance vs. rejection of the paper</li>
                  </ol>
                </div>

                <div className="card p-5">
                  <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Final Project (50%)</h3>
                  <ul className="text-sm space-y-1" style={{ color: 'var(--text-secondary)' }}>
                    <li>Write a &ldquo;mini-paper&rdquo; extending papers covered in class</li>
                    <li>Groups of 2-4 people recommended</li>
                    <li>Max paper length: 3 + n_students pages (excl. references)</li>
                    <li>Project proposal due by Oct 14th</li>
                    <li>Final presentations during final exam period</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Schedule */}
            <section id="schedule" className="mb-10">
              <h2 className="text-xl font-bold mb-4 pb-2 border-b" style={{ color: 'var(--text-primary)', borderColor: 'var(--border)' }}>Schedule &amp; Topics</h2>
              <div className="space-y-4">
                {[
                  { title: 'Foundations (Weeks 1-3)', items: ['Introduction and fast forward', 'Linear algebra recap', 'Digital photography and camera ISP', 'Image recovery and inverse problems', 'Deep learning recap'] },
                  { title: 'Coded and Computational Cameras (Week 4)', items: ['Coded aperture imaging', 'Deep optics'] },
                  { title: 'High-Dimensional Imaging (Week 5)', items: ['Light field photography with a hand-held plenoptic camera', 'DiffuserCam: lensless single-exposure 3D imaging'] },
                  { title: 'Single-Photon Imaging (Week 6)', items: ['Passive inter-photon imaging', 'Quanta burst photography'] },
                  { title: 'Computational Light Transport (Week 7)', items: ['Femto-photography: capturing and visualizing the propagation of light', 'Recovering 3D shape around the corner using ultrafast time-of-flight imaging'] },
                  { title: 'Mid-term Project Proposals (Week 8)', items: ['No class (Well Being day)', 'Project proposals and presentations'] },
                  { title: 'Advanced Topics (Weeks 9-16)', items: ['Unconventional Imaging and Sensing', 'Neural Rendering and Gaussian Splatting', 'Neural Representations and Computational Imaging I & II', 'Generative AI and Computational Imaging I & II', 'Final Projects Q&A and Presentations'] },
                ].map(section => (
                  <div key={section.title} className="card p-5">
                    <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{section.title}</h3>
                    <ul className="text-sm space-y-1" style={{ color: 'var(--text-secondary)' }}>
                      {section.items.map(item => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <p className="text-xs mt-3" style={{ color: 'var(--text-muted)' }}>
                * Schedule subject to change. Updated schedule and presentation schedule available on course website.
              </p>
            </section>

            {/* Additional Info */}
            <section id="additional" className="mb-10">
              <h2 className="text-xl font-bold mb-4 pb-2 border-b" style={{ color: 'var(--text-primary)', borderColor: 'var(--border)' }}>Additional Information</h2>
              <div className="space-y-4">
                <div className="card p-5">
                  <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Prerequisites</h3>
                  <ul className="text-sm space-y-1" style={{ color: 'var(--text-secondary)' }}>
                    <li><strong>Linear algebra:</strong> vectors, matrices, tensors, dimensional analysis</li>
                    <li><strong>Signal processing:</strong> convolutions, Fourier transforms, linear systems</li>
                    <li><strong>Basic optics:</strong> lenses, light as rays and waves, cameras, image formation</li>
                    <li><strong>Programming:</strong> Python (preferred), PyTorch/TensorFlow, MATLAB</li>
                  </ul>
                </div>
                <div className="card p-5">
                  <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>University Policies</h3>
                  <div className="text-sm space-y-3" style={{ color: 'var(--text-secondary)' }}>
                    <p>
                      <strong>Accessibility:</strong> UNC facilitates reasonable accommodations. Contact ARS at{' '}
                      <a href="https://ars.unc.edu" className="text-[var(--unc-blue)] hover:underline">ars.unc.edu</a>.
                    </p>
                    <p>
                      <strong>Mental Health:</strong> Visit{' '}
                      <a href="https://caps.unc.edu" className="text-[var(--unc-blue)] hover:underline">caps.unc.edu</a> or Campus Health Services.
                    </p>
                    <p>
                      <strong>Title IX:</strong> Contact the Director of Title IX Compliance or visit{' '}
                      <a href="https://safe.unc.edu" className="text-[var(--unc-blue)] hover:underline">safe.unc.edu</a>.
                    </p>
                  </div>
                </div>
                <div className="card p-5">
                  <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Honor Code</h3>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    All students are expected to follow the UNC honor code. Cite sources properly and do not claim others&apos; work as your own.
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
