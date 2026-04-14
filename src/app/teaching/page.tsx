import Link from 'next/link';

const courses = [
  {
    title: 'Advanced Visual Computing: Physics-Informed AI',
    code: 'COMP 790-175',
    semester: 'Spring 2026',
    instructor: 'Prof. Praneeth Chakravarthula',
    description: 'A graduate-level seminar exploring recent advances in visual computing systems, with emphasis on physics-inspired AI, neural rendering, implicit representations, and diffractive neural networks.',
    href: '/teaching/computational-imaging',
  },
  {
    title: 'Visual Computing Systems',
    code: 'COMP 790-175',
    semester: 'Fall 2025',
    instructor: 'Prof. Praneeth Chakravarthula',
    description: 'A graduate-level seminar on the design and implementation of visual computing systems, including computational imaging, light transport modeling, sensor design, and inverse problems.',
    href: '/teaching/visual-computing-systems',
  },
];

export default function TeachingPage() {
  return (
    <div>
      <div className="page-banner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1>Teaching</h1>
          <p>Graduate courses offered by our group</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="space-y-6">
          {courses.map(course => (
            <Link
              key={course.href}
              href={course.href}
              className="card block p-6 hover:border-[var(--unc-blue)] transition-colors"
            >
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="badge">{course.code}</span>
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)' }}>
                  {course.semester}
                </span>
              </div>
              <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                {course.title}
              </h2>
              <p className="text-sm mb-2" style={{ color: 'var(--text-muted)' }}>
                {course.instructor}
              </p>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                {course.description}
              </p>
              <span className="inline-block mt-3 text-sm text-[var(--unc-blue)] font-medium">
                View course details &rarr;
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
