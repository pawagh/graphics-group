import { config } from '@/lib/config';

export default function JoinUsPage() {
  return (
    <div>
      <div className="page-banner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1>Join Us</h1>
          <p>Opportunities to work with the {config.lab.name}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Prospective PhD Students</h2>
          <div className="card p-6">
            <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
              We are always looking for motivated PhD students with strong backgrounds in computer science, electrical engineering, optics, or related fields. Research areas of interest include:
            </p>
            <ul className="list-disc list-inside space-y-1 mb-4" style={{ color: 'var(--text-secondary)' }}>
              <li>3D scene acquisition &amp; reconstruction</li>
              <li>3D tracking and sensing</li>
              <li>Near-eye and head-mounted displays</li>
              <li>Holographic and autostereoscopic 3D displays</li>
              <li>Telepresence systems</li>
              <li>Computational imaging and neural rendering</li>
              <li>Medical applications of AR/VR</li>
            </ul>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              To apply, please submit your application through the{' '}
              <a href="https://cs.unc.edu/academics/graduate/admissions/" target="_blank" rel="noopener noreferrer" className="text-[var(--unc-blue)] hover:underline">
                UNC CS Graduate Admissions
              </a>{' '}
              portal and mention the faculty member(s) you are interested in working with.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Undergraduate Researchers</h2>
          <div className="card p-6">
            <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
              We welcome undergraduate students at UNC who are interested in gaining research experience in graphics, AR/VR, and visual computing. Undergraduates can participate through independent study courses or summer research programs.
            </p>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              If you are a current UNC student interested in joining, please email one of the faculty members with your resume, transcript, and a brief description of your research interests.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Postdoctoral Researchers &amp; Visitors</h2>
          <div className="card p-6">
            <p style={{ color: 'var(--text-secondary)' }}>
              We occasionally have openings for postdoctoral researchers and visiting scholars. If interested, please reach out directly to the faculty with your CV and research statement.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Contact</h2>
          <div className="card p-6">
            <p className="mb-3" style={{ color: 'var(--text-secondary)' }}>
              For inquiries about joining the group, please contact:
            </p>
            <div className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <p>
                <strong>Prof. Praneeth Chakravarthula</strong> &mdash;{' '}
                <a href="mailto:cpk@cs.unc.edu" className="text-[var(--unc-blue)] hover:underline">cpk@cs.unc.edu</a>
              </p>
              <p>
                <strong>Prof. Henry Fuchs</strong> &mdash;{' '}
                <a href="mailto:fuchs@cs.unc.edu" className="text-[var(--unc-blue)] hover:underline">fuchs@cs.unc.edu</a>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
