'use client';

import { useState } from 'react';
import Link from 'next/link';

const navigationItems = [
  { id: 'description', label: 'Description' },
  { id: 'logistics', label: 'Logistics' },
  { id: 'prerequisites', label: 'Prerequisites' },
  { id: 'grading', label: 'Grading' },
  { id: 'seminar', label: 'Seminar Format' },
  { id: 'schedule', label: 'Schedule' },
  { id: 'project', label: 'Final Project' },
  { id: 'policies', label: 'Policies' },
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

export default function ComputationalImagingPage() {
  const [activeSection, setActiveSection] = useState('description');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <div className="page-banner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Link href="/teaching" className="text-white/60 hover:text-white text-sm mb-4 inline-block">&larr; All Courses</Link>
          <h1 className="text-2xl sm:text-3xl">Advanced Visual Computing: Physics-Informed AI</h1>
          <p>COMP 790-175 &middot; Spring 2026</p>
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
                This graduate-level seminar-style course explores recent advances in visual computing systems, with a strong emphasis on physics-inspired AI. Topics include:
              </p>
              <ul className="list-disc list-inside space-y-1 mb-4" style={{ color: 'var(--text-secondary)' }}>
                <li>Classical inverse problems, forward models</li>
                <li>Unrolled networks and Physics-inspired Neural Networks (PINNs) for imaging</li>
                <li>Neural rendering and implicit neural representations</li>
                <li>Diffractive neural networks</li>
              </ul>
              <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
                While the course emphasizes theoretical foundations, we will also connect these ideas to emerging developments in generative AI and their applications in visual computing. We will devote the first few classes to introductory lectures. The remainder of the semester will focus on student-led paper presentations and discussions. Students will also undertake a semester-long project resulting in a comprehensive review report.
              </p>

              <div className="card p-5 mb-4" style={{ borderLeft: '3px solid var(--unc-blue)' }}>
                <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Target Audience</h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Masters and PhD students interested in physics-informed AI/ML, inverse and differentiable rendering, graphics, imaging systems and visual computing.
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
                    <strong>Days:</strong> Monday/Wednesday<br />
                    <strong>Time:</strong> 3:35pm - 4:50pm<br />
                    <strong>Location:</strong> FB141
                  </p>
                </div>
                <div className="card p-5">
                  <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Instructor</h3>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <strong>Prof. Praneeth Chakravarthula</strong><br />
                    Email: <a href="mailto:cpk@cs.unc.edu" className="text-[var(--unc-blue)] hover:underline">cpk@cs.unc.edu</a><br />
                    <strong>Office Hours:</strong> By appointment only (SN 205 or Zoom)
                  </p>
                </div>
              </div>
            </section>

            {/* Prerequisites */}
            <section id="prerequisites" className="mb-10">
              <h2 className="text-xl font-bold mb-4 pb-2 border-b" style={{ color: 'var(--text-primary)', borderColor: 'var(--border)' }}>Prerequisites</h2>
              <div className="card p-5">
                <ul className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <li><strong>Linear algebra:</strong> vectors, matrices, tensors, dimensional analysis</li>
                  <li><strong>Signal processing:</strong> convolutions, Fourier transforms, linear systems</li>
                  <li><strong>Basic optics:</strong> lenses, light as rays and waves, cameras, image formation</li>
                  <li><strong>Basic AI/ML:</strong> MLPs, CNNs, Transformers, generative models</li>
                  <li><strong>Programming:</strong> Python (preferred), PyTorch/TensorFlow, MATLAB</li>
                </ul>
                <p className="text-sm mt-4 italic" style={{ color: 'var(--text-muted)' }}>
                  You should be comfortable with basic camera image formation, basics of AI/ML, and be able to read a recent ML conference paper and understand it at a conceptual level.
                </p>
              </div>
            </section>

            {/* Grading */}
            <section id="grading" className="mb-10">
              <h2 className="text-xl font-bold mb-4 pb-2 border-b" style={{ color: 'var(--text-primary)', borderColor: 'var(--border)' }}>Grading</h2>
              <div className="grid grid-cols-3 gap-4">
                {[{ pct: '50%', label: 'Course Project' }, { pct: '30%', label: 'Paper Presentation' }, { pct: '20%', label: 'Attendance & Participation' }].map(g => (
                  <div key={g.label} className="card p-5 text-center">
                    <div className="text-2xl font-bold" style={{ color: 'var(--unc-blue)' }}>{g.pct}</div>
                    <div className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{g.label}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Seminar Format */}
            <section id="seminar" className="mb-10">
              <h2 className="text-xl font-bold mb-4 pb-2 border-b" style={{ color: 'var(--text-primary)', borderColor: 'var(--border)' }}>Seminar Format</h2>
              <p className="mb-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
                Each student will present 1-2 papers during the semester.
              </p>
              <div className="space-y-4">
                <div className="card p-5">
                  <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Before Each Class</h3>
                  <ul className="text-sm space-y-1" style={{ color: 'var(--text-secondary)' }}>
                    <li>Read the assigned papers</li>
                    <li>Submit a written review (format provided by the instructor)</li>
                  </ul>
                </div>
                <div className="card p-5">
                  <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Class Structure</h3>
                  <ol className="text-sm space-y-1 list-decimal list-inside" style={{ color: 'var(--text-secondary)' }}>
                    <li>The instructor provides an overview of the research topic and paper</li>
                    <li>The assigned student presents a 20-minute detailed technical analysis, followed by discussion and Q&amp;A</li>
                    <li>Students are divided into two groups, arguing for acceptance vs. rejection of the paper</li>
                  </ol>
                </div>
              </div>
            </section>

            {/* Schedule */}
            <section id="schedule" className="mb-10">
              <h2 className="text-xl font-bold mb-4 pb-2 border-b" style={{ color: 'var(--text-primary)', borderColor: 'var(--border)' }}>Schedule &amp; Topics</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm" style={{ color: 'var(--text-primary)' }}>
                  <thead>
                    <tr style={{ background: 'var(--unc-blue)', color: 'white' }}>
                      <th className="px-3 py-2 text-left">Week</th>
                      <th className="px-3 py-2 text-left">Date</th>
                      <th className="px-3 py-2 text-left">Topic</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scheduleData.map((item, i) => (
                      <>
                        {item.section && (
                          <tr key={`section-${i}`} style={{ background: 'var(--bg-secondary)' }}>
                            <td colSpan={3} className="px-3 py-2 font-semibold" style={{ color: 'var(--text-primary)' }}>
                              {item.section}
                            </td>
                          </tr>
                        )}
                        <tr key={`row-${i}`} style={item.isHoliday ? { color: 'var(--text-muted)' } : item.isDeadline ? { background: 'rgba(75, 156, 211, 0.1)' } : {}}>
                          <td className="px-3 py-2 border-b" style={{ borderColor: 'var(--border)' }}>{item.week}</td>
                          <td className="px-3 py-2 border-b whitespace-nowrap" style={{ borderColor: 'var(--border)' }}>{item.date}</td>
                          <td className="px-3 py-2 border-b" style={{ borderColor: 'var(--border)' }}>
                            {item.isDeadline ? <strong style={{ color: 'var(--unc-blue)' }}>{item.topic}</strong> : item.topic}
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs mt-3" style={{ color: 'var(--text-muted)' }}>
                * Schedule subject to change. Updated schedule will be posted on Canvas.
              </p>
            </section>

            {/* Final Project */}
            <section id="project" className="mb-10">
              <h2 className="text-xl font-bold mb-4 pb-2 border-b" style={{ color: 'var(--text-primary)', borderColor: 'var(--border)' }}>Final Project</h2>
              <p className="mb-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
                All students in the class will write a &ldquo;mini-paper&rdquo; as a final project. The paper should extend one or more papers we covered in the class. Students should write code and carry out additional experiments and then write up the results in a standard conference paper format.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="card p-5">
                  <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Group Work</h3>
                  <ul className="text-sm space-y-1" style={{ color: 'var(--text-secondary)' }}>
                    <li>Groups of two are expected to put twice as much work</li>
                    <li>Groups with 5+ people require special permission</li>
                    <li>Include a &ldquo;contributions&rdquo; paragraph listing each author&apos;s contributions</li>
                    <li>Max paper length: <strong>3 + n_students</strong> pages (excl. references)</li>
                  </ul>
                </div>
                <div className="card p-5">
                  <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Deadlines</h3>
                  <ul className="text-sm space-y-1" style={{ color: 'var(--text-secondary)' }}>
                    <li><strong>Feb 11th</strong> &mdash; Project proposal due</li>
                    <li><strong>Final exam period</strong> &mdash; Group presentations (all members must present)</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Policies */}
            <section id="policies" className="mb-10">
              <h2 className="text-xl font-bold mb-4 pb-2 border-b" style={{ color: 'var(--text-primary)', borderColor: 'var(--border)' }}>Course Policies</h2>
              <div className="space-y-4">
                <div className="card p-5">
                  <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Attendance &amp; Late Work</h3>
                  <ul className="text-sm space-y-1" style={{ color: 'var(--text-secondary)' }}>
                    <li>Missing class without completing the assignment results in a zero</li>
                    <li>If presenting, find a substitute and prepare slides beforehand</li>
                    <li>Late work for readings cannot be accepted</li>
                    <li>Final projects cannot be accepted after the scheduled final exam slot</li>
                  </ul>
                </div>
                <div className="card p-5">
                  <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Honor Code</h3>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    All students are expected to follow the UNC honor code. Cite sources properly and do not claim others&apos; work as your own.
                  </p>
                </div>
                <div className="card p-5">
                  <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Accessibility</h3>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    UNC facilitates reasonable accommodations for students with disabilities. Contact the Office of Accessibility Resources and Service (ARS) at{' '}
                    <a href="https://ars.unc.edu" className="text-[var(--unc-blue)] hover:underline">ars.unc.edu</a> or{' '}
                    <a href="mailto:ars@unc.edu" className="text-[var(--unc-blue)] hover:underline">ars@unc.edu</a>.
                  </p>
                </div>
                <div className="card p-5">
                  <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Mental Health Resources</h3>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    CAPS is committed to addressing mental health needs. Visit{' '}
                    <a href="https://caps.unc.edu" className="text-[var(--unc-blue)] hover:underline">caps.unc.edu</a> or visit their facilities on the third floor of Campus Health Services.
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
