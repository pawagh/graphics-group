import React from 'react';
import Link from 'next/link';
import '../animations.css';

export default function People() {
    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-50">
            {/* Banner Image */}
            <div className="w-full h-64 md:h-80 relative mb-8">
                <img src="/group_photo.jpg" alt="Group Banner" className="w-full h-full object-cover object-center rounded-b-lg shadow-md" />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">Our Team</h1>
                </div>
            </div>
            <div className="text-center w-11/12 max-w-6xl">
                <h2 className="text-3xl font-bold mb-4">People</h2>
                <p className="text-lg mb-8">
                    Welcome to the people page. Meet our members and collaborators.
                </p>
                {/* Grid Layout */}
                <div className="fade-in grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Person 0 */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col items-center">
                        <img 
                            src="/praneeth.jpeg" 
                            alt="praneeth" 
                            className="w-full h-48 object-contain pt-4" 
                        />
                        <div className="p-4 flex-1 flex flex-col justify-between">
                            <Link href="https://www.cs.unc.edu/~cpk/" target="_blank">
                                <h2 className="text-xl font-semibold text-black hover:text-blue-500 transition">
                                Praneeth Chakravarthula
                                </h2>
                            </Link>
                            <p className="text-sm text-gray-600 mb-2">Assistant Professor</p>
                            <p className="text-xs text-gray-500 mb-2">Computational imaging, AR/VR, nano-optics, human-computer interaction</p>
                            <a href="https://www.cs.unc.edu/~cpk/" target="_blank" className="text-blue-600 hover:underline text-xs">Personal Homepage</a>
                        </div>
                    </div>
                    {/* Person 1 */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col items-center">
                        <img 
                            src="/XiPeng.jpg" 
                            alt="Xi Peng" 
                            className="w-full h-48 object-contain pt-4" 
                        />
                        <div className="p-4 flex-1 flex flex-col justify-between">
                            <Link href="mailto:xipeng@cs.unc.edu" target="_blank">
                                <h2 className="text-xl font-semibold text-black hover:text-blue-500 transition">
                                    Xi Peng
                                </h2>
                            </Link>
                            <p className="text-sm text-gray-600 mb-2">PhD Student</p>
                            <p className="text-xs text-gray-500 mb-2">Acoustic fields, neural rendering, VR/AR audio</p>
                            <a href="https://scholar.google.com/citations?user=example" target="_blank" className="text-blue-600 hover:underline text-xs">Personal Homepage</a>
                        </div>
                    </div>
                    {/* Person 2 */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col items-center">
                        <img 
                            src="/zihao.png" 
                            alt="Zihao Zou" 
                            className="w-full h-48 object-contain pt-4" 
                        />
                        <div className="p-4 flex-1 flex flex-col justify-between">
                            <Link href="mailto:zihaozou@cs.unc.edu" target="_blank">
                                <h2 className="text-xl font-semibold text-black hover:text-blue-500 transition">
                                Zihao Zou
                                </h2>
                            </Link>
                            <p className="text-sm text-gray-600 mb-2">PhD Student</p>
                            <p className="text-xs text-gray-500 mb-2">Event cameras, computational photography, computer vision</p>
                            <a href="https://scholar.google.com/citations?user=example" target="_blank" className="text-blue-600 hover:underline text-xs">Personal Homepage</a>
                        </div>
                    </div>
                    {/* Person 3 */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col items-center">
                        <img 
                            src="/Hengyu.jpeg" 
                            alt="Hengyu Lian" 
                            className="w-full h-48 object-contain pt-4" 
                        />
                        <div className="p-4 flex-1 flex flex-col justify-between">
                            <Link href="mailto:Lianhy0@cs.unc.edu" target="_blank">
                                <h2 className="text-xl font-semibold text-black hover:text-blue-500 transition">
                                Hengyu Lian
                                </h2>
                            </Link>
                            <p className="text-sm text-gray-600 mb-2">PhD Student</p>
                            <p className="text-xs text-gray-500 mb-2">Holography, computational optics, display technology</p>
                            <a href="https://scholar.google.com/citations?user=example" target="_blank" className="text-blue-600 hover:underline text-xs">Personal Homepage</a>
                        </div>
                    </div>
                    {/* Add more people below in the same structure */}
                </div>
                {/* Group Philosophy, Collaborators, Blurb sections can be added here */}
                <div className="mt-12 text-left">
                  <h3 className="text-2xl font-bold mb-2 text-blue-800">Group Philosophy</h3>
                  <p className="mb-6 text-gray-700">We believe in interdisciplinary collaboration, open science, and fostering a supportive environment for innovation and learning. Our group values curiosity, diversity, and impact-driven research.</p>
                  <h3 className="text-2xl font-bold mb-2 text-blue-800">Collaborators</h3>
                  <ul className="list-disc ml-6 text-gray-700">
                    <li>Dr. Jane Doe (Optics, MIT)</li>
                    <li>Dr. John Smith (AI, Stanford)</li>
                  </ul>
                  <h3 className="text-2xl font-bold mb-2 text-blue-800 mt-8">Team Blurb</h3>
                  <p className="text-gray-700">Our team brings together expertise in optics, computer vision, machine learning, and human-computer interaction to solve real-world problems in visual computing and augmented intelligence.</p>
                </div>
            </div>
        </div>
    );
}