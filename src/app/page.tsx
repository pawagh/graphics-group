'use client'

export default function Home() {
  return (
    <div className="font-sans bg-gray-50 text-gray-900">
      {/* Scrolling Images */}
      <div className="w-full overflow-hidden relative">
        <div className="flex w-[200vw] animate-[scroll_30s_linear_infinite]">
          {["/2.png", "/3.png", "/4.png", "/2.png", "/3.png", "/4.png"].map((src, index) => (
            <img key={index}
              src={src}
              alt={`Image ${index + 1}`}
              className="w-screen h-[60vh] object-cover"
            />
          ))}
        </div>
      </div>

      <div className="content-container max-w-6xl mx-auto my-10 flex flex-col md:flex-row gap-8">
        <div className="flex-2 space-y-10">
          {/* Latest News */}
          <section className="text-center p-10 bg-white rounded-lg shadow-lg border-t-4 border-blue-500">
            <h2 className="text-2xl font-bold text-blue-700 mb-4">LATEST NEWS</h2>
            <p className="text-lg leading-relaxed">
              Stay updated with our latest projects and team insights. We are constantly working to innovate and enhance our research.
            </p>
          </section>

          {/* About Us */}
          <section className="flex flex-col md:flex-row items-center p-10 bg-white rounded-lg shadow-lg border-t-4 border-blue-500">
            <div className="flex-1 text-center">
              <img src="/logo.png" alt="About Us"
                className="w-4/5 max-w-[250px] object-contain mx-auto" />
            </div>
            <div className="flex-2 p-5">
              <p className="text-lg leading-relaxed">
                Welcome to our website. Our mission is to push the boundaries of visual computing and AI to create innovative solutions.
              </p>
            </div>
          </section>
        </div>

        {/* Lab Calendar */}
        <div className="flex-1 bg-white p-10 rounded-lg shadow-lg border-t-4 border-blue-500 flex flex-col">
          <h2 className="text-2xl font-bold text-blue-700 text-center mb-4">LAB CALENDAR</h2>
          <ul className="list-none mt-4 text-center space-y-3 text-gray-700">
            <li className="py-2 px-4 bg-blue-50 rounded-lg">Event 1</li>
            <li className="py-2 px-4 bg-blue-100 rounded-lg">Event 2</li>
            <li className="py-2 px-4 bg-blue-200 rounded-lg">Event 3</li>
            <li className="py-2 px-4 bg-blue-300 rounded-lg">Event 4</li>
          </ul>
        </div>
      </div>

      {/* Footer */}
      <footer className="p-5 bg-gray-700 text-white text-center text-sm shadow-md">
        <p className="m-0">Visual Computing and Augmented Intelligence Lab</p>
      </footer>

      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); }
          }
        `}
      </style>
    </div>
  );
}
