'use client'
import '../animations.css';
import Link from 'next/link';

export default function Teaching() {
  const courses = [
    {
      title: "Computational Imaging",
      semester: "Spring 2026",
      description: "An introduction to computational imaging, covering optics, sensors, algorithms, and modern techniques for image formation and analysis.",
      image: "/course1.jpg",
      link: "/teaching/computational-imaging",
      color: "carolina-blue"
    },
    {
      title: "Visual Computing Systems", 
      semester: "Fall 2025",
      description: "A course on the design and implementation of visual computing systems, including hardware, software, and applications in graphics, vision, and AR/VR.",
      image: "/course2.jpg",
      link: "/teaching/visual-computing-systems",
      color: "unc-navy"
    }
  ];

  return (
    <div className="fade-in font-sans bg-neutral-50 text-neutral-900">
      {/* Hero banner section */}
      <div className="w-full h-64 md:h-80 relative mb-8">
        <img 
          src="/teaching_banner.jpg" 
          alt="Teaching and Education Banner" 
          className="w-full h-full object-cover object-center rounded-b-lg shadow-md" 
        />
        <div className="absolute inset-0 bg-carolina-blue bg-opacity-60 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">Teaching</h1>
        </div>
      </div>

      {/* Main content */}
      <div className="content-container">
        <div className="space-y-10">
          
          {/* Introduction section */}
          <section className="section-card">
            <h2 className="section-title text-center">TEACHING</h2>
            <p className="text-lg text-center text-neutral-600 max-w-4xl mx-auto leading-relaxed">
              We are committed to excellence in education, fostering the next generation of visual computing researchers and practitioners. 
              Our courses blend theory with hands-on experience in cutting-edge technologies.
            </p>
          </section>

          {/* Teaching Philosophy */}
          <section className="section-card">
            <h3 className="section-title">Teaching Philosophy</h3>
            <p className="text-neutral-700 leading-relaxed text-lg">
              We believe in hands-on, inclusive, and curiosity-driven learning. Our courses emphasize critical thinking, 
              collaboration, and real-world impact in visual computing and AI. Students engage with state-of-the-art research 
              while building fundamental skills in computational imaging, computer vision, and augmented intelligence.
            </p>
          </section>

          {/* Courses section */}
          <section className="section-card">
            <h3 className="section-title">Courses</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {courses.map((course, index) => (
                <div 
                  key={course.title} 
                  className="card group p-6 hover:shadow-card-hover transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <img 
                        src={course.image} 
                        alt={course.title} 
                        className="w-20 h-20 rounded-lg object-cover shadow-md transition-transform duration-300 group-hover:scale-110" 
                      />
                    </div>
                    <div className="flex-1">
                      <Link 
                        href={course.link} 
                        className="group-hover:text-orange transition-colors duration-300"
                      >
                        <h4 className="text-xl font-semibold text-carolina-blue group-hover:text-orange transition-colors duration-300 mb-2">
                          {course.title}
                        </h4>
                      </Link>
                      <p className="text-sm text-unc-navy font-medium mb-2">{course.semester}</p>
                      <p className="text-neutral-600 leading-relaxed">{course.description}</p>
                      <Link 
                        href={course.link}
                        className="inline-flex items-center mt-3 text-carolina-blue hover:text-orange transition-colors duration-300 font-medium"
                      >
                        View Course
                        <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Educational Impact */}
          <section className="section-card">
            <h3 className="section-title">Educational Impact</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-carolina-blue rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange transition-colors duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-unc-navy mb-2">Research Integration</h4>
                <p className="text-neutral-600">Courses directly integrate cutting-edge research findings and methodologies.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-carolina-blue rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-orange transition-colors duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-unc-navy mb-2">Hands-on Learning</h4>
                <p className="text-neutral-600">Practical projects using state-of-the-art equipment and software tools.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-carolina-blue rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-orange transition-colors duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-unc-navy mb-2">Collaborative Environment</h4>
                <p className="text-neutral-600">Foster teamwork and interdisciplinary collaboration in all projects.</p>
              </div>
            </div>
          </section>

          {/* Call to action */}
          <section className="text-center py-12">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-unc-navy mb-6">Interested in Our Courses?</h2>
              <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
                Join us in exploring the exciting world of visual computing and augmented intelligence. 
                Our courses are designed to prepare you for the future of technology.
              </p>
              <a href="/opportunities" className="btn-primary inline-flex items-center justify-center">
                Learn More About Opportunities
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}