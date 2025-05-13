'use client'
import './animations.css';

export default function Home() {
  return (
    <div className="fade-in font-sans bg-gray-50 text-gray-900">
      {/* Fading Images */}
      <div className="w-full h-[60vh] relative overflow-hidden">
        {["/2.png", "/3.png", "/4.png"].map((src, index, arr) => {
          const total = arr.length;
          const duration = 18; // Total duration for one full cycle in seconds
          const delay = (index * duration) / total; // Stagger the animation for each image
          return (
            <img
              key={index}
              src={src}
              alt={`Image ${index + 1}`}
              className="absolute w-full h-[60vh] object-cover fade-image"
              style={{ animationDelay: `${delay}s` }}
            />
          );
        })}
      </div>
      
      {/* Replace the scrolling keyframes with fade animation */}
      <style jsx>{`
        @keyframes fadeAnimation {
          0% { opacity: 0; }
          10% { opacity: 1; }
          30% { opacity: 1; }
          40% { opacity: 0; }
          100% { opacity: 0; }
        }
        .fade-image {
          opacity: 0;
          animation: fadeAnimation ${18}s infinite;
        }
      `}</style>

      <div className="content-container max-w-7xl mx-auto my-10 flex flex-col space-y-8 px-4 md:px-12">
        <div className="flex-2 space-y-10">

          {/* About Us */}
            <section className="relative flex flex-col md:flex-row items-center gap-6 md:gap-10 p-8 bg-gradient-to-br from-white via-blue-50 to-blue-100 rounded-2xl shadow-xl border-t-4 border-[#4B9CD3] overflow-hidden">
              <div className="flex-shrink-0 flex justify-center items-center w-full md:w-auto">
                <img
                  src="/logo.png"
                  alt="Visual Computing and Augmented Intelligence Lab"
                  className="w-32 h-32 md:w-40 md:h-40 object-contain rounded-full border-4 border-[#4B9CD3] shadow-lg bg-white"
                />
              </div>
              <div className="flex-1 flex flex-col justify-center items-center md:items-start text-center md:text-left">
                <h2 className="text-3xl font-extrabold text-[#2563eb] mb-3 tracking-tight drop-shadow">About Us</h2>
                <p className="text-lg leading-relaxed text-gray-700 font-medium w-full">
                  Welcome to the <span className="font-bold text-[#4B9CD3]">Visual Computing and Augmented Intelligence Lab</span> at UNC. Our team is dedicated to advancing research in computational imaging, visual perception, and AI-driven solutions. We collaborate across disciplines to create transformative technologies that redefine the future of visual computing.
                </p>
              </div>
            </section>

          {/* Featured Projects */}
            <section className="text-center p-8 md:p-10 bg-white rounded-lg shadow-lg border-t-4 border-[#4B9CD3]">
            <h2 className="text-2xl font-bold text-[#4B9CD3] mb-4">FEATURED PROJECTS</h2>
            <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0 justify-center items-center">
              {/* Project 1 */}
              <div className="w-80 min-h-[420px] p-4 bg-gray-100 rounded-lg shadow-md flex flex-col items-center justify-between">
                <img src="https://www.cs.unc.edu/~cpk/data/thumbnails/1cm-metalens.PNG" alt="Beating bandwidth limits for large aperture broadband nano-optics" className="w-32 h-32 object-cover rounded mb-4" />
                <h3 className="text-xl font-bold mb-2 text-[#4B9CD3] text-center">Beating bandwidth limits for large aperture broadband nano-optics</h3>
                <p className="text-gray-700 text-center mb-2 flex-1">
                  Breakthrough in nano-optics, overcoming bandwidth limits for large aperture broadband metalenses.
                </p>
                <a href="https://www.nature.com/articles/s41467-025-58208-4" target="_blank" className="text-carolina underline font-semibold">Read more</a>
              </div>
              {/* Project 2 */}
              <div className="w-80 min-h-[420px] p-4 bg-gray-100 rounded-lg shadow-md flex flex-col items-center justify-between">
                <img src="https://www.cs.unc.edu/~cpk/data/thumbnails/dof-gs.PNG" alt="DOF-GS: Adjustable Depth-of-Field 3D Gaussian Splatting" className="w-32 h-32 object-cover rounded mb-4" />
                <h3 className="text-xl font-bold mb-2 text-[#4B9CD3] text-center">DOF-GS: Adjustable Depth-of-Field 3D Gaussian Splatting</h3>
                <p className="text-gray-700 text-center mb-2 flex-1">
                  Novel 3D Gaussian Splatting technique for flexible depth-of-field control in computational photography.
                </p>
                <a href="https://arxiv.org/abs/2405.17351" target="_blank" className="text-carolina underline font-semibold">Read more</a>
              </div>
              {/* Project 3 */}
              <div className="w-80 min-h-[420px] p-4 bg-gray-100 rounded-lg shadow-md flex flex-col items-center justify-between">
                <img src="https://www.cs.unc.edu/~cpk/data/thumbnails/eventfield.png" alt="Event fields: Capturing light fields at high speed, resolution, and dynamic range" className="w-32 h-32 object-cover rounded mb-4" />
                <h3 className="text-xl font-bold mb-2 text-[#4B9CD3] text-center">Event fields: Capturing light fields at high speed, resolution, and dynamic range</h3>
                <p className="text-gray-700 text-center mb-2 flex-1">
                  Pioneering event-based light field capture for high-speed, high-resolution, and high-dynamic-range imaging.
                </p>
                <a href="https://arxiv.org/abs/2412.06191" target="_blank" className="text-carolina underline font-semibold">Read more</a>
              </div>
            </div>
            </section>

          {/* Awards & News */}
          <section className="mt-8 p-8 bg-white rounded-2xl shadow-xl border-t-4 border-[#4B9CD3] max-w-7xl mx-auto px-4 md:px-12">
            <h2 className="text-2xl font-bold text-[#4B9CD3] mb-4">Awards & News</h2>
            <div className="flex flex-col md:flex-row gap-8">
              {/* News */}
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-blue-800 mb-2">Recent News</h3>
                <ul className="list-disc ml-6 text-gray-700 space-y-1">
                  <li><strong>April 2025:</strong> Event Fields selected as a CVPR Highlight.</li>
                  <li><strong>March 2025:</strong> Metalens imaging paper published in Nature Communications.</li>
                  <li><strong>Feb. 2025:</strong> Best Paper Honorable Mention at IEEE VR.</li>
                  <li><strong>May 2024:</strong> Best Paper Award at OmniCV, CVPR 2024.</li>
                </ul>
              </div>
              {/* Awards */}
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-blue-800 mb-2">Major Awards</h3>
                <ul className="list-disc ml-6 text-gray-700 space-y-1">
                  <li>Highlight Paper, <strong>Event fields</strong>, CVPR 2025</li>
                  <li>Best Paper Award, <strong>FlatTrack: Eye-tracking with ultra-thin lensless cameras</strong>, GMCV, WACV 2025</li>
                  <li>Best Paper Award, <strong>Cross-Domain Synthetic-to-Real Depth and Normal Estimation</strong>, OmniCV, CVPR 2024</li>
                  <li>Best Dissertation Award, <strong>Towards Everyday-use Augmented Reality Eyeglasses</strong>, IEEE VGTC 2023</li>
                  <li>Best Paper Award, <strong>Image Features Influence Reaction Time</strong>, ACM SIGGRAPH 2022</li>
                  <li>Best Paper Award, <strong>DeepCGH: 3D Computer-Generated Holography Using Deep Learning</strong>, OSA Biophotonics Congress 2020</li>
                </ul>
              </div>
            </div>
          </section>
        </div>

      </div>
    </div>
  );
}