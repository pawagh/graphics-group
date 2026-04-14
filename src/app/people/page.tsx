import Image from 'next/image';
import { getPeopleByRole } from '@/lib/data';
import type { Person } from '@/lib/types';

const ROLE_ORDER: Array<{ key: string; label: string; roles: string[] }> = [
  { key: 'faculty', label: 'Faculty', roles: ['faculty'] },
  { key: 'staff', label: 'Staff', roles: ['staff'] },
  { key: 'students', label: 'Students', roles: ['phd', 'ms', 'undergrad', 'postdoc', 'visitor'] },
  { key: 'alumni', label: 'Alumni', roles: ['alumni'] },
];

function PersonPhoto({ person, size = 64 }: { person: Person; size?: number }) {
  if (person.photoPath) {
    return (
      <Image
        src={person.photoPath}
        alt={person.name}
        width={size}
        height={size}
        className="rounded-full object-cover flex-shrink-0"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <div
      className="rounded-full bg-[var(--unc-blue)] flex items-center justify-center text-white font-bold flex-shrink-0"
      style={{ width: size, height: size, fontSize: size * 0.35 }}
    >
      {person.name.split(' ').map(n => n[0]).join('')}
    </div>
  );
}

function PersonCard({ person }: { person: Person }) {
  return (
    <div className="card p-5 flex gap-4">
      <PersonPhoto person={person} size={64} />
      <div className="min-w-0">
        <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>{person.name}</h3>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{person.title}</p>
        <div className="flex flex-wrap gap-3 mt-2">
          {person.email && (
            <a href={`mailto:${person.email}`} className="text-[var(--unc-blue)] text-xs hover:underline">Email</a>
          )}
          {person.website && (
            <a href={person.website} target="_blank" rel="noopener noreferrer" className="text-[var(--unc-blue)] text-xs hover:underline">Website</a>
          )}
          {person.googleScholar && (
            <a href={person.googleScholar} target="_blank" rel="noopener noreferrer" className="text-[var(--unc-blue)] text-xs hover:underline">Scholar</a>
          )}
          {person.github && (
            <a href={person.github} target="_blank" rel="noopener noreferrer" className="text-[var(--unc-blue)] text-xs hover:underline">GitHub</a>
          )}
        </div>
      </div>
    </div>
  );
}

function AlumniTable({ alumni }: { alumni: Person[] }) {
  const sorted = [...alumni].sort((a, b) => a.name.localeCompare(b.name));
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm" style={{ color: 'var(--text-primary)' }}>
        <thead>
          <tr className="border-b" style={{ borderColor: 'var(--border)' }}>
            <th className="text-left py-3 px-4 font-semibold">Name</th>
            <th className="text-left py-3 px-4 font-semibold">Year</th>
            <th className="text-left py-3 px-4 font-semibold">Current Position</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map(person => (
            <tr key={person.id} className="border-b" style={{ borderColor: 'var(--border)' }}>
              <td className="py-3 px-4">
                {person.website ? (
                  <a href={person.website} target="_blank" rel="noopener noreferrer" className="text-[var(--unc-blue)] hover:underline">
                    {person.name}
                  </a>
                ) : person.name}
              </td>
              <td className="py-3 px-4" style={{ color: 'var(--text-muted)' }}>{person.alumniYear ?? ''}</td>
              <td className="py-3 px-4" style={{ color: 'var(--text-secondary)' }}>{person.alumniPosition ?? ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function PeoplePage() {
  const grouped = getPeopleByRole();

  return (
    <div>
      <div className="page-banner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1>People</h1>
          <p>Our team of researchers, students, and collaborators</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {ROLE_ORDER.map(({ key, label, roles }) => {
          const members = roles.flatMap(r => grouped[r] || []);
          if (members.length === 0) return null;

          return (
            <section key={key} className="mb-12">
              <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>{label}</h2>
              {key === 'alumni' ? (
                <AlumniTable alumni={members} />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {members.sort((a, b) => a.name.localeCompare(b.name)).map(person => (
                    <PersonCard key={person.id} person={person} />
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
