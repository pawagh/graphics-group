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
        <Image 
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80" 
          alt="Modern university classroom" 
          fill
          className="object-cover object-center rounded-b-lg shadow-md" 
        />
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

          {/* Courses section */}
          <section className="section-card">
            <h3 className="section-title text-center">COURSES</h3>
            <div className="space-y-8 max-w-4xl mx-auto">
              {courses.map((course, index) => (
                <div 
                  key={course.title} 
                  className="card group p-8 hover-lift magnetic-hover enhanced-shadow transition-all duration-500 stagger-item"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-8">
                    <div className="flex-shrink-0 mx-auto md:mx-0 relative">
                      <div className="relative overflow-hidden rounded-2xl border-4 border-carolina-blue/20 group-hover:border-carolina-blue transition-colors duration-500">
                        <Image 
                          src={course.image} 
                          alt={course.title} 
                          width={160}
                          height={160}
                          className="rounded-2xl object-cover shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-2" 
                        />
                        {/* Course type overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-carolina-blue/20 via-transparent to-unc-navy/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                      </div>
                      {/* Floating semester badge */}
                      <div className="absolute -top-3 -right-3 bg-unc-navy text-white text-sm px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-100 scale-75 font-medium">
                        {course.semester}
                      </div>
                    </div>
                    <div className="flex-1 text-center md:text-left">
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