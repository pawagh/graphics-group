import React from 'react';
import Link from 'next/link';

export default function Publications() {
    return (
        <div className='flex justify-center items-start h-screen'>
            <div className='text-center mt-20'>
            <h1 className='text-4xl font-bold mb-4'>Publications</h1>
            <p className='text-lg'>Welcome to the publications page. Here you will find a list of our recent publications.</p>
            <div className='mt-8 mb-8 space-y-4'>
                <div className='bg-white rounded-lg p-4 shadow-md'>
                    <Link href="https://arxiv.org/pdf/2402.06824" target="_blank"><h2 className='text-xl font-semibold text-black'>Beating bandwidth limits for large aperture broadband nano-optics</h2></Link>
                    <p className='text-sm text-black'>Author 1, Author 2, Author 3</p>
                    <p className='text-sm text-black'>Journal Name, Year</p>
                </div>
                <div className='bg-white rounded-lg p-4 shadow-md'>
                <Link href="https://www.cs.unc.edu/~cpk/data/papers/IEEE_Dissertation_Impact.pdf" target="_blank"><h2 className='text-xl font-semibold text-black'>Present and Future of Everyday-use Augmented Reality Eyeglasses</h2></Link>
                    <p className='text-sm text-black'>Author 1, Author 2, Author 3</p>
                    <p className='text-sm text-black'>Journal Name, Year</p>
                </div>
                <div className='bg-white rounded-lg p-4 shadow-md'>
                <Link href="https://www.cs.unc.edu/~cpk/data/papers/Neural_acoustic_fields.pdf" target="_blank"><h2 className='text-xl font-semibold text-black'>Multimodal Neural Acoustic Fields for Immersive Virtual Reality and Telepresence</h2></Link>
                    <p className='text-sm text-black'>Author 1, Author 2, Author 3</p>
                    <p className='text-sm text-black'>Journal Name, Year</p>
                </div>
                <div className='bg-white rounded-lg p-4 shadow-md'>
                <Link href="https://www.cs.unc.edu/~cpk/data/papers/Perceptually_Guided_Acoustic_Foveation.pdf" target="_blank"><h2 className='text-xl font-semibold text-black'>Perceptually-Guided Acoustic Foveation</h2></Link>
                    <p className='text-sm text-black'>Author 1, Author 2, Author 3</p>
                    <p className='text-sm text-black'>Journal Name, Year</p>
                </div>
                <div className='bg-white rounded-lg p-4 shadow-md'>
                <Link href="https://arxiv.org/abs/2501.15450" target="_blank"><h2 className='text-xl font-semibold text-black'>FlatTrack: Eye-tracking with ultra-thin lensless cameras</h2></Link>
                    <p className='text-sm text-black'>Author 1, Author 2, Author 3</p>
                    <p className='text-sm text-black'>Journal Name, Year</p>
                </div>
                <div className='bg-white rounded-lg p-4 shadow-md'>
                <Link href="https://light.princeton.edu/publication/svn3/" target="_blank"><h2 className='text-xl font-semibold text-black'>Spatially Varying Nanophotonic Neural Networks</h2></Link>
                    <p className='text-sm text-black'>Author 1, Author 2, Author 3</p>
                    <p className='text-sm text-black'>Journal Name, Year</p>
                </div>
                <div className='bg-white rounded-lg p-4 shadow-md'>
                <Link href="https://vccimaging.org/Publications/Yang2024HybridLens/" target="_blank"><h2 className='text-xl font-semibold text-black'>End-to-End Hybrid Refractive-Diffractive Lens Design with Differentiable Ray-Wave Model</h2></Link>
                    <p className='text-sm text-black'>Author 1, Author 2, Author 3</p>
                    <p className='text-sm text-black'>Journal Name, Year</p>
                </div>
                <div className='bg-white rounded-lg p-4 shadow-md'>
                <Link href="https://omnihorizon.github.io/" target="_blank"><h2 className='text-xl font-semibold text-black'>Cross-Domain Synthetic-to-Real In-the-Wild Depth and Normal Estimation for 3D Scene Understanding</h2></Link>
                    <p className='text-sm text-black'>Author 1, Author 2, Author 3</p>
                    <p className='text-sm text-black'>Journal Name, Year</p>
                </div>
                <div className='bg-white rounded-lg p-4 shadow-md'>
                <Link href="https://light.princeton.edu/publication/neural-etendue-expander/" target="_blank"><h2 className='text-xl font-semibold text-black'>Neural Etendue Expander for Ultra-Wide-Angle High-Fidelity Holographic Display</h2></Link>
                    <p className='text-sm text-black'>Author 1, Author 2, Author 3</p>
                    <p className='text-sm text-black'>Journal Name, Year</p>
                </div>
                <div className='bg-white rounded-lg p-4 shadow-md'>
                <Link href="https://www.spiedigitallibrary.org/conference-proceedings-of-spie/13104/131042M/Point-spread-function-inspired-deformable-convolutional-network-for-holographic-displays/10.1117/12.3023146.short#_=_" target="_blank"><h2 className='text-xl font-semibold text-black'>Point Spread Function-inspired Deformable Convolutional Network for Holographic Displays</h2></Link>
                    <p className='text-sm text-black'>Author 1, Author 2, Author 3</p>
                    <p className='text-sm text-black'>Journal Name, Year</p>
                </div>
            </div></div>
            </div>
    );
}
