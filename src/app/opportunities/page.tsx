import React from 'react';

export default function OpportunitiesPage() {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-16 text-gray-800">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Research Opportunities</h1>

        <p className="text-lg mb-8">
          We offer research opportunities for undergraduate and graduate students interested in joining our lab.
          Below are current and upcoming opportunities. Please check back often as we update this page regularly.
        </p>

        <div className="space-y-8">
          <div className="bg-white shadow-md rounded p-6">
            <h2 className="text-2xl font-semibold mb-2">Placeholder 1</h2>
            <p className="mb-2 text-gray-700">Applications due: May 1, 2025</p>
            <p className="mb-4 text-gray-700">
              Open to undergraduate students in computer science, neuroscience, or a related field. Interns will work
              on hands-on data analysis, software development, or experimental design.
            </p>
            <a href="mailto:info@yourlab.com?subject=Summer 2025 Internship Application" className="text-blue-600 hover:underline">Apply Now</a>
          </div>

          <div className="bg-white shadow-md rounded p-6">
            <h2 className="text-2xl font-semibold mb-2">Placeholder 2</h2>
            <p className="mb-4 text-gray-700">
              Work with our faculty on ongoing research as part of a for-credit independent study. Open to UNC students.
              Must have completed at least one course in data science or experimental psychology.
            </p>
            <a href="mailto:info@yourlab.com?subject=Independent Study Inquiry" className="text-blue-600 hover:underline">Contact Us</a>
          </div>
        </div>
      </div>
    </div>
  );
}
