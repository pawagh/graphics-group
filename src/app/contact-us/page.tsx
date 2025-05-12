import React from 'react';
import '../animations.css';
import Link from 'next/link';

export default function ContactUsPage() {
  return (
    <div className="fade-in min-h-screen bg-gray-50 px-6 py-16 text-gray-800 flex flex-col items-center justify-center">
      <div className="max-w-xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-8">Contact & Opportunities</h1>
        <p className="text-lg mb-6">This page has moved. Please visit our <Link href="/opportunities" className="text-blue-600 underline">Join Us</Link> page for all contact information and current opportunities.</p>
        <Link href="/opportunities" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Go to Join Us</Link>
      </div>
    </div>
  );
}
