import React from 'react';
import Link from 'next/link';

export default function Publications() {
    return (
        <div className='flex justify-center items-start min-h-screen'>
            <div className='text-center mt-20 w-11/12 max-w-6xl'>
                <h1 className='text-4xl font-bold mb-4'>Publications</h1>
                <p className='text-lg mb-8'>Welcome to the publications page. Here you will find a list of our recent publications.</p>

                {/* Grid Layout */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    {[
                        { title: "Placeholder 1", link: "https://arxiv.org/pdf/2402.06824" },
                        { title: "Placeholder 2", link: "https://light.princeton.edu/publication/svn3/" },
                        { title: "Placeholder 3", link: "https://vccimaging.org/Publications/Yang2024HybridLens/" },
                        { title: "Placeholder 4", link: "https://omnihorizon.github.io/" },
                        { title: "Placeholder 5", link: "https://light.princeton.edu/publication/neural-etendue-expander/" },
                        { title: "Placeholder 6", link: "https://www.spiedigitallibrary.org/conference-proceedings-of-spie/13104/131042M/Point-spread-function-inspired-deformable-convolutional-network-for-holographic-displays/10.1117/12.3023146.short#_=_" },
                    ].map((publication, index) => (
                        <div key={index} className='bg-white rounded-lg p-4 shadow-md flex'>
                            <img src="https://via.placeholder.com/150" alt="Thumbnail" className="w-16 h-auto mr-4 rounded" />
                            <div className='text-left'>
                                <Link href={publication.link} target="_blank">
                                    <h2 className='text-xl font-semibold text-black hover:text-blue-500 transition'>{publication.title}</h2>
                                </Link>
                                <p className='text-sm text-gray-600'>{publication.title}</p>
                                <p className='text-sm text-gray-600'>{publication.title}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}