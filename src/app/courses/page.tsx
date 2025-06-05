'use client'
import '../animations.css';
import Link from 'next/link';
import Image from 'next/image';

export default function Teaching() {
  const courses = [
    {
      title: "Computational Imaging",
      semester: "Spring 2026",
      description: "An introduction to computational imaging, covering optics, sensors, algorithms, and modern techniques for image formation and analysis.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      link: "/courses/computational-imaging",
      color: "carolina-blue"
    },
    {
      title: "Visual Computing Systems", 
      semester: "Fall 2025",
      description: "A course on the design and implementation of visual computing systems, including hardware, software, and applications in graphics, vision, and AR/VR.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      link: "/courses/visual-computing-systems",
      color: "unc-navy"
    }
  ];

  return (
    <div className="fade-in font-sans bg-neutral-50 text-neutral-900">
      {/* Hero banner section */}
      <div className="w-full h-64 md:h-80 relative mb-8">
        <Image 
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80" 
          alt="Modern university classroom" 
          fill
          className="object-cover object-center rounded-b-lg shadow-md" 
        />
      </div>

      {/* Teaching Philosophy - Dome Copper translucent banner */}
      <div className="w-full bg-campus-sandstone backdrop-blur-sm border-t-4 py-3 mb-8">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <h2 className="text-2xl font-bold text-dome-copper text-center mb-3">COURSES</h2>
          <p className="text-md text-neutral-700 max-w-4xl mx-auto leading-relaxed">
            We are committed to excellence in education, fostering the next generation of visual computing researchers and practitioners. 
            Our courses blend theory with hands-on experience in cutting-edge technologies.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="content-container">
        <div className="space-y-10">
          
          {/* Courses section */}
          <section className="section-card">
            <div className="space-y-8 max-w-4xl mx-auto">
              {courses.map((course, index) => (
                <div 
                  key={course.title} 
                  className="card group p-8 hover-lift magnetic-hover enhanced-shadow transition-all duration-500 stagger-item"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="flex flex-col items-start space-y-6">
                    <div className="flex-1 md:text-left w-full">
                      <h3 className="text-2xl font-bold text-unc-navy mb-3 group-hover:text-carolina-blue transition-colors duration-300">
                        {course.title}
                      </h3>
                      <p className="text-carolina-blue font-semibold mb-2 group-hover:text-unc-navy transition-colors duration-300">
                        {course.semester}
                      </p>
                      <p className="text-neutral-600 mb-6 leading-relaxed group-hover:text-neutral-700 transition-colors duration-300 text-lg">
                        {course.description}
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <Link 
                          href={course.link} 
                          className="btn-primary inline-flex items-center justify-center gap-2 spring-hover"
                        >
                          Course Details
                          <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                        <button className="btn-secondary spring-hover">
                          View Syllabus
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}