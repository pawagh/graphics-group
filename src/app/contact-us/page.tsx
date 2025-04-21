import React from 'react';
import '../animations.css';

export default function ContactUsPage() {
  return (
    <div className="fade-in min-h-screen bg-gray-50 px-6 py-16 text-gray-800">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Get in Touch</h1>
        
        <div className="mb-12">
          <p className="text-lg mb-4">
            We’d love to hear from you. Whether you’re interested in collaborating, have questions about our research,
            or just want to say hello—feel free to reach out.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <p className="mb-2"><strong>Email:</strong> <a href="mailto:info@yourlab.com" className="text-blue-600 hover:underline">info@yourlab.com</a></p>
            <p className="mb-2"><strong>Phone:</strong> (123) 456-7890</p>
            <p className="mb-2"><strong>Location:</strong><br />123 Innovation Drive<br />Chapel Hill, NC 27514</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Join Our Lab</h2>
            <p className="mb-4">
              Interested in working with us? We’re always open to passionate researchers and students.
              Send us a message with your CV and interests.
            </p>
            <a href="mailto:info@yourlab.com?subject=Joining the Lab" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Email Us</a>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-4">Visit Us</h2>
          <iframe
            title="lab location"
            className="w-full h-64 border rounded"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.958438973958!2d-79.05132968469148!3d35.9049125801495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89ace7e78dfd42b1%3A0x57eb75d3a9b9c3fc!2sUniversity%20of%20North%20Carolina%20at%20Chapel%20Hill!5e0!3m2!1sen!2sus!4v1618174103103!5m2!1sen!2sus"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
