import React from 'react';
import Link from 'next/link';
import '../animations.css';

export default function Teaching() {
    return (
        <div className='fade-in flex flex-col items-center min-h-screen bg-gray-50'>
            {/* Banner Image */}
            <div className="w-full h-64 md:h-80 relative mb-8">
                <img src="/teaching_banner.jpg" alt="Teaching Banner" className="w-full h-full object-cover object-center rounded-b-lg shadow-md" />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">Teaching</h1>
                </div>
            </div>
            <div className='text-center w-11/12 max-w-6xl'>
                <h2 className='text-3xl font-bold mb-4'>Teaching</h2>
                <p className='text-lg mb-8'>Welcome to the teaching page. Here you will find a list of our educational resources.</p>
                {/* Teaching Philosophy */}
                <div className="mb-10 bg-white rounded-lg shadow p-6 text-left">
                    <h3 className="text-2xl font-bold mb-2 text-blue-800">Teaching Philosophy</h3>
                    <p className="text-gray-700">We believe in hands-on, inclusive, and curiosity-driven learning. Our courses emphasize critical thinking, collaboration, and real-world impact in visual computing and AI.</p>
                </div>
                {/* Grid Layout */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    {/* Example course blocks, with different color themes for spring/fall */}
                    <div className='bg-blue-50 border-l-4 border-blue-400 rounded-lg p-4 shadow-md flex'>
                        <img src="/course1.jpg" alt="Course 1" className="w-16 h-16 mr-4 rounded object-cover" />
                        <div className='text-left flex-1'>
                            <Link href="/teaching/course1" target="_blank">
                                <h2 className='text-xl font-semibold text-black hover:text-blue-500 transition'>Introduction to Computational Imaging</h2>
                            </Link>
                            <p className='text-sm text-gray-600 mb-1'>Spring 2025</p>
                            <p className='text-xs text-gray-500 mb-2'>Learn the fundamentals of computational imaging, including optics, sensors, and algorithms for image formation and analysis.</p>
                            <p className='text-xs text-gray-700 mb-1'><strong>TA:</strong> Jane Doe</p>
                            <p className='text-xs text-gray-700 mb-1'><strong>Office Hours:</strong> Mon 2-4pm</p>
                            <p className='text-xs text-gray-700 mb-1'><strong>Room:</strong> SN 123</p>
                        </div>
                    </div>
                    <div className='bg-orange-50 border-l-4 border-orange-400 rounded-lg p-4 shadow-md flex'>
                        <img src="/course2.jpg" alt="Course 2" className="w-16 h-16 mr-4 rounded object-cover" />
                        <div className='text-left flex-1'>
                            <Link href="/teaching/course2" target="_blank">
                                <h2 className='text-xl font-semibold text-black hover:text-orange-500 transition'>Machine Learning for Visual Computing</h2>
                            </Link>
                            <p className='text-sm text-gray-600 mb-1'>Fall 2024</p>
                            <p className='text-xs text-gray-500 mb-2'>Explore machine learning techniques for image and video analysis, including deep learning, feature extraction, and applications in AR/VR.</p>
                            <p className='text-xs text-gray-700 mb-1'><strong>TA:</strong> John Smith</p>
                            <p className='text-xs text-gray-700 mb-1'><strong>Office Hours:</strong> Wed 10-12pm</p>
                            <p className='text-xs text-gray-700 mb-1'><strong>Room:</strong> SN 456</p>
                        </div>
                    </div>
                    {/* Add more courses as needed, using color/image themes for spring/fall */}
                </div>
            </div>
        </div>
    );
}