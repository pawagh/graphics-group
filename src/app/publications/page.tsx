import React from 'react';
import Link from 'next/link';

export default function Publications() {
    return (
        <div className='flex justify-center items-start h-screen'>
            <div className='text-center mt-20'>
                <h1 className='text-4xl font-bold mb-4'>Publications</h1>
                <p className='text-lg'>Welcome to the publications page. Here you will find a list of our recent publications.</p>
                <div className='mt-8 mb-8 space-y-4'>
               
                    <div className='bg-white rounded-lg p-4 shadow-md flex w-11/12 mx-auto'>
                        <img src="https://via.placeholder.com/150" alt="Thumbnail" className="w-16 h-auto mr-4 rounded" />
                        <div className='text-center'>
                            <Link href="https://arxiv.org/pdf/2402.06824" target="_blank">
                                <h2 className='text-xl font-semibold text-black'>Placeholder 1</h2>
                            </Link>
                            <p className='text-sm text-black'>Placeholder 1</p>
                            <p className='text-sm text-black'>Placeholder 1</p>
                        </div>
                    </div>
                    
                    <div className='bg-white rounded-lg p-4 shadow-md flex w-11/12 mx-auto'>
                        <img src="https://via.placeholder.com/150" alt="Thumbnail" className="w-16 h-auto mr-4 rounded" />
                        <div className='text-center'>
                            <Link href="https://light.princeton.edu/publication/svn3/" target="_blank">
                                <h2 className='text-xl font-semibold text-black'>Placeholder 2</h2>
                            </Link>
                            <p className='text-sm text-black'>Placeholder 2</p>
                            <p className='text-sm text-black'>Placeholder 2</p>
                        </div>
                    </div>
                    
                    <div className='bg-white rounded-lg p-4 shadow-md flex w-11/12 mx-auto'>
                        <img src="https://via.placeholder.com/150" alt="Thumbnail" className="w-16 h-auto mr-4 rounded" />
                        <div className='text-center'>
                            <Link href="https://vccimaging.org/Publications/Yang2024HybridLens/" target="_blank">
                                <h2 className='text-xl font-semibold text-black'>Placeholder 3</h2>
                            </Link>
                            <p className='text-sm text-black'>Placeholder 3</p>
                            <p className='text-sm text-black'>Placeholder 3</p>
                        </div>
                    </div>
                    
                    <div className='bg-white rounded-lg p-4 shadow-md flex w-11/12 mx-auto'>
                        <img src="https://via.placeholder.com/150" alt="Thumbnail" className="w-16 h-auto mr-4 rounded" />
                        <div className='text-center'>
                            <Link href="https://omnihorizon.github.io/" target="_blank">
                                <h2 className='text-xl font-semibold text-black'>Placeholder 4</h2>
                            </Link>
                            <p className='text-sm text-black'>Placeholder 4</p>
                            <p className='text-sm text-black'>Placeholder 4</p>
                        </div>
                    </div>
                    
                    <div className='bg-white rounded-lg p-4 shadow-md flex w-11/12 mx-auto'>
                        <img src="https://via.placeholder.com/150" alt="Thumbnail" className="w-16 h-auto mr-4 rounded" />
                        <div className='text-center'>
                            <Link href="https://light.princeton.edu/publication/neural-etendue-expander/" target="_blank">
                                <h2 className='text-xl font-semibold text-black'>Placeholder 5</h2>
                            </Link>
                            <p className='text-sm text-black'>Placeholder 5</p>
                            <p className='text-sm text-black'>Placeholder 5</p>
                        </div>
                    </div>
                    
                    <div className='bg-white rounded-lg p-4 shadow-md flex w-11/12 mx-auto'>
                        <img src="https://via.placeholder.com/150" alt="Thumbnail" className="w-16 h-auto mr-4 rounded" />
                        <div className='text-center'>
                            <Link href="https://www.spiedigitallibrary.org/conference-proceedings-of-spie/13104/131042M/Point-spread-function-inspired-deformable-convolutional-network-for-holographic-displays/10.1117/12.3023146.short#_=_" target="_blank">
                                <h2 className='text-xl font-semibold text-black'>Placeholder 6</h2>
                            </Link>
                            <p className='text-sm text-black'>Placeholder 6</p>
                            <p className='text-sm text-black'>Placeholder 6</p>
                        </div>
                    </div>
                </div>
            </div>
            </div>
    );
}
