'use client'
import '../animations.css';
import Image from 'next/image';
import { useState } from 'react';
import activeMembers from '@/data/team.json';
import alumni from '@/data/alumni.json';
import { alumniCategories } from '@/types/data';
import type { TeamMember, Alumnus } from '@/types/data';

export default function People() {
  const [expandedPerson, setExpandedPerson] = useState<string | null>(null);

  // Separate professors from other team members
  const professors = activeMembers.filter(
    (p) => p.role.includes("Professor")
  );
  const otherTeamMembers = activeMembers
    .filter((p) => !p.role.includes("Professor"))
    .sort((a, b) => a.name.localeCompare(b.name));

  const toggleDescription = (name: string) => {
    setExpandedPerson(expandedPerson === name ? null : name);
  };

  return (
    <div className="fade-in font-sans bg-neutral-50 text-neutral-900">
      {/* Hero banner section */}
      <div className="w-full h-64 md:h-80 relative mb-8">
        <Image
          src="/lab-photos/group-photo-04.jpg"
          alt="Research team collaboration"
          fill
          className="object-cover object-top rounded-b-lg shadow-md"
        />
      </div>

      {/* Group Philosophy - Dome Copper translucent banner */}
      <div className="w-full bg-campus-sandstone backdrop-blur-sm py-3 mb-8">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <h2 className="text-2xl font-bold text-dome-copper text-center mb-3">GROUP PHILOSOPHY</h2>
          <p className="text-md text-neutral-700 max-w-4xl mx-auto leading-relaxed">
            Our group values curiosity, diversity, and impact-driven research that pushes the boundaries of what&apos;s possible in visual computing.
            Together, we bring expertise in optics, computer vision, and machine learning.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="content-container">
        <div className="space-y-10">

          {/* Professors - Full width cards */}
          {professors.map((professor) => (
            <section key={professor.name} className="section-card">
              <div className="max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-48 h-48 relative overflow-hidden rounded-full">
                      <Image
                        src={professor.image}
                        alt={professor.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </div>
                  <div className="flex-1 md:text-left">
                    <h3 className="text-3xl font-bold text-carolina-blue mb-3 transition-colors duration-300">
                      {professor.name}
                    </h3>
                    <p className="text-xl text-carolina-blue font-semibold mb-4 transition-colors duration-300 group-hover:text-dome-copper">
                      {professor.role}
                    </p>
                    <p className="text-lg text-neutral-600 mb-6 leading-relaxed transition-colors duration-300">
                      {professor.bio}
                    </p>
                    <div className="flex justify-center md:justify-start space-x-6">
                      {professor.website && (
                        <a
                          href={professor.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-carolina-blue transition-all duration-300 transform hover:scale-125 spring-hover"
                          aria-label={`${professor.name}'s website`}
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                      {professor.email && (
                        <a
                          href={`mailto:${professor.email}`}
                          className="text-carolina-blue transition-all duration-300 transform hover:scale-125 spring-hover"
                          aria-label={`Email ${professor.name}`}
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ))}

          {/* Other Team Members - Grid layout */}
          <section className="section-card">
            <h2 className="section-title text-center">TEAM MEMBERS</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {otherTeamMembers.map((person, index) => (
                <div
                  key={person.name}
                  className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 p-6 group stagger-item hover:bg-slate-50 unc-shadow-hover"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="mb-4 relative">
                    <div className="w-32 h-32 mx-auto mb-4 relative overflow-hidden rounded-full transition-colors duration-500">
                      <Image
                        src={person.image}
                        alt={person.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-carolina-blue mb-2 transition-colors duration-300 text-center">
                    {person.name}
                  </h3>
                  <p className="text-carolina-blue font-semibold mb-3 transition-colors duration-300 text-center group-hover:text-dome-copper">
                    {person.role}
                  </p>
                  <p className="text-neutral-600 mb-4 leading-relaxed transition-colors duration-300 text-left">
                    {person.bio}
                  </p>
                  <button
                    onClick={() => toggleDescription(person.name)}
                    className="text-carolina-blue transition-colors duration-300 mb-4 flex items-center gap-2"
                  >
                    {expandedPerson === person.name ? 'Hide Bio' : 'Short Bio'}
                    <svg
                      className={`w-4 h-4 transition-transform duration-300 ${expandedPerson === person.name ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {expandedPerson === person.name && (
                    <p className="text-neutral-600 mb-4 leading-relaxed animate-fade-in text-left">
                      {person.description}
                    </p>
                  )}
                  <div className="flex justify-start space-x-4 pt-4 border-t border-neutral-200 transition-colors duration-300">
                    {person.website && (
                      <a
                        href={person.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-carolina-blue transition-all duration-300 transform hover:scale-125 spring-hover"
                        aria-label={`${person.name}'s website`}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                    {person.email && (
                      <a
                        href={`mailto:${person.email}`}
                        className="text-carolina-blue transition-all duration-300 transform hover:scale-125 spring-hover"
                        aria-label={`Email ${person.name}`}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Alumni Section */}
          <section className="section-card">
            <h2 className="section-title text-center">ALUMNI</h2>
            <p className="text-neutral-500 text-center mb-8 max-w-2xl mx-auto">
              We&apos;re currently in the process of populating this list. If you do not see your name here and would like to be added, please drop an email to Prof. Henry Fuchs.
            </p>

            <div className="max-w-5xl mx-auto space-y-8">
              {alumniCategories.map((cat) => {
                const members = (alumni as Alumnus[])
                  .filter((a) => a.category === cat.key)
                  .sort((a, b) => a.name.localeCompare(b.name));
                if (members.length === 0) return null;
                return (
                  <div key={cat.key}>
                    <h3 className="text-lg font-bold text-unc-navy mb-4 border-b border-neutral-200 pb-2">
                      {cat.label}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3">
                      {members.map((alum) => (
                        <div key={`${alum.name}-${alum.category}`} className="flex items-baseline gap-2 py-1 flex-wrap">
                          {alum.webpage ? (
                            <a
                              href={alum.webpage}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-medium text-carolina-blue hover:text-unc-navy hover:underline transition-colors duration-200"
                            >
                              {alum.name}
                            </a>
                          ) : (
                            <span className="font-medium text-neutral-800">{alum.name}</span>
                          )}
                          {(alum.linkedin || alum.wikipedia) && (
                            <span className="flex items-center gap-1.5">
                              {alum.linkedin && (
                                <a
                                  href={alum.linkedin}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-carolina-blue hover:text-unc-navy transition-colors"
                                  aria-label={`${alum.name} LinkedIn`}
                                >
                                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                  </svg>
                                </a>
                              )}
                              {alum.wikipedia && (
                                <a
                                  href={alum.wikipedia}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-carolina-blue hover:text-unc-navy transition-colors"
                                  aria-label={`${alum.name} Wikipedia`}
                                >
                                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm2.057 16.386c-.36.196-.644.345-.993.495-.35.15-.744.3-1.193.45-.45.15-.918.255-1.405.315-.486.06-.963.09-1.431.09-.495 0-.945-.045-1.35-.135-.405-.09-.765-.225-1.08-.405-.315-.18-.585-.42-.81-.72-.225-.3-.405-.675-.54-1.125L6.75 6.6H8.4l.9 4.95.855-4.95h1.575l.855 4.95.9-4.95h1.65L12.6 13.05c.045.18.09.345.135.495.045.15.09.27.135.36.09.18.21.345.36.495.15.15.33.27.54.36.21.09.465.135.765.135.315 0 .615-.045.9-.135.285-.09.54-.21.765-.36l.585 1.275z"/>
                                  </svg>
                                </a>
                              )}
                            </span>
                          )}
                          {alum.graduationYear && (
                            <span className="text-xs text-neutral-400">({alum.graduationYear})</span>
                          )}
                          {alum.currentPosition && (
                            <span className="text-xs text-neutral-500 hidden sm:inline">&mdash; {alum.currentPosition}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
