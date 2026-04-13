import { config } from '@/lib/config';

export default function Footer() {
  return (
    <footer className="bg-[var(--unc-blue)] text-white/80 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-white mb-2">{config.lab.name}</h3>
            <p className="text-sm">{config.lab.department}</p>
            <p className="text-sm">{config.lab.university}</p>
          </div>
          <div>
            <h3 className="font-bold text-white mb-2">Contact</h3>
            <p className="text-sm">
              <a href={`mailto:${config.lab.contactEmail}`} className="hover:text-[var(--unc-blue)] transition-colors">
                {config.lab.contactEmail}
              </a>
            </p>
            {config.pi.website && (
              <p className="text-sm mt-1">
                <a href={config.pi.website} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--unc-blue)] transition-colors">
                  {config.pi.name}&apos;s Homepage
                </a>
              </p>
            )}
          </div>
          <div>
            <h3 className="font-bold text-white mb-2">Links</h3>
            <div className="flex gap-4">
              {config.social.twitter && (
                <a href={config.social.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--unc-blue)] transition-colors text-sm">Twitter</a>
              )}
              {config.social.github && (
                <a href={config.social.github} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--unc-blue)] transition-colors text-sm">GitHub</a>
              )}
              {config.social.googleScholar && (
                <a href={config.social.googleScholar} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--unc-blue)] transition-colors text-sm">Google Scholar</a>
              )}
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-white/20 text-center text-sm text-white/50">
          &copy; {new Date().getFullYear()} {config.lab.name}, {config.lab.university}
        </div>
      </div>
    </footer>
  );
}
