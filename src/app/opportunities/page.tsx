import React from 'react';
import '../animations.css';

export default function OpportunitiesPage() {
  return (
    <div className="fade-in min-h-screen bg-gray-50 text-gray-800 flex flex-col items-center">
      {/* Banner Image */}
      <div className="w-full h-64 md:h-80 relative mb-8">
        <img src="/opportunities_banner.jpg" alt="Opportunities Banner" className="w-full h-full object-cover object-center rounded-b-lg shadow-md" />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold" style={{ color: '#FFFFFF' }}>Opportunities</h1>
        </div>
      </div>
      <div className="max-w-5xl w-full px-6 py-16 mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center" style={{ color: '#4B9CD3' }}>Join Us</h1>
        <p className="text-lg mb-8">
          Interested in joining our lab? We offer research opportunities for undergraduate and graduate students, as well as postdocs and collaborators. See below for current openings and important contact information.
        </p>
        <div className="space-y-8">
          <div className="bg-white shadow-md rounded p-6" style={{ borderLeft: '4px solid #4B9CD3' }}>
            <h2 className="text-2xl font-semibold mb-2" style={{ color: '#4B9CD3' }}>Undergraduate Research Opportunities</h2>
            <p className="mb-2 text-gray-700">Applications due: May 1, 2025</p>
            <p className="mb-4 text-gray-700">
              Open to undergraduate students in computer science, neuroscience, or a related field. Interns will work on hands-on data analysis, software development, or experimental design.
            </p>
            {/* Add real application email here */}
          </div>
          <div className="bg-white shadow-md rounded p-6" style={{ borderLeft: '4px solid #4B9CD3' }}>
            <h2 className="text-2xl font-semibold mb-2" style={{ color: '#4B9CD3' }}>Graduate & Postdoc Opportunities</h2>
            <p className="mb-4 text-gray-700">
              We are always looking for motivated graduate students and postdocs to join our team. Please send your CV and a brief statement of interest.
            </p>
            {/* Add real application email here */}
          </div>
          <div className="bg-white shadow-md rounded p-6" style={{ borderLeft: '4px solid #4B9CD3' }}>
            <h2 className="text-2xl font-semibold mb-2" style={{ color: '#4B9CD3' }}>Independent Study</h2>
            <p className="mb-4 text-gray-700">
              Work with our faculty on ongoing research as part of a for-credit independent study. Open to UNC students. Must have completed at least one course in data science or experimental psychology.
            </p>
            {/* Add real application email here */}
          </div>
          <div className="bg-white shadow-md rounded p-6" style={{ borderLeft: '4px solid #4B9CD3' }}>
            <h2 className="text-2xl font-semibold mb-2" style={{ color: '#4B9CD3' }}>Contact Information</h2>
            {/* Add real contact info here */}
          </div>
        </div>
      </div>
    </div>
  );
}
