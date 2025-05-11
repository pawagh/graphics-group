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
            <section className="p-6 md:p-8 bg-white rounded-lg shadow-lg border-t-4 border-[#4B9CD3] flex items-center gap-4 md:gap-6">
              <img
                src="/logo.png"
                alt="Visual Computing and Augmented Intelligence Lab"
                className="w-1/3 max-w-[120px] object-contain"
              />
              <div className="w-2/3">
                <h2 className="text-2xl font-bold text-center text-[#4B9CD3] mb-2">ABOUT US</h2>
                <p className="text-base leading-relaxed">
                  Welcome to the Visual Computing and Augmented Intelligence Lab at UNC. Our team is dedicated to advancing research in computational imaging, visual perception, and AI-driven solutions. We collaborate across disciplines to create transformative technologies that redefine the future of visual computing.
                </p>
              </div>
            </section>

          {/* Featured Projects */}
            <section className="text-center p-8 md:p-10 bg-white rounded-lg shadow-lg border-t-4 border-[#4B9CD3]">
            <h2 className="text-2xl font-bold text-[#4B9CD3] mb-4">FEATURED PROJECTS</h2>
            <div className="flex flex-row space-x-6 justify-center items-center">
              <div className="w-80 p-4 bg-gray-100 rounded-lg shadow-md aspect-square flex flex-col items-center justify-center">
              <h3 className="text-xl font-bold mb-2 text-[#4B9CD3]">Featured Project One</h3>
              <p className="text-gray-700 text-center">
                A brief description of the first featured project.
              </p>
              </div>
              <div className="w-80 p-4 bg-gray-100 rounded-lg shadow-md aspect-square flex flex-col items-center justify-center">
              <h3 className="text-xl font-bold mb-2 text-[#4B9CD3]">Featured Project Two</h3>
              <p className="text-gray-700 text-center">
                A brief description of the second featured project.
              </p>
              </div>
              <div className="w-80 p-4 bg-gray-100 rounded-lg shadow-md aspect-square flex flex-col items-center justify-center">
              <h3 className="text-xl font-bold mb-2 text-[#4B9CD3]">Featured Project Three</h3>
              <p className="text-gray-700 text-center">
                A brief description of the second featured project.
              </p>
              </div>
            </div>
            </section>
        </div>

      </div>
    </div>
  );
}