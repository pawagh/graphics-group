'use client'
import './/animations.css'; 

import Image from "next/image";

export default function Home() {
  return (
    <div>
      
      <div style={{ width: "100%", height: "70vh", overflowX: "scroll", whiteSpace: "nowrap" }}>
        <img src="/test2.jpg" alt="Image 1" style={{ width: "100vw", height: "100%", objectFit: "cover", display: "inline-block" }} />
        <img src="/test1.jpeg" alt="Image 2" style={{ width: "100vw", height: "100%", objectFit: "cover", display: "inline-block" }} />
        <img src="/test3.jpg" alt="Image 3" style={{ width: "100vw", height: "100%", objectFit: "cover", display: "inline-block" }} />
      </div>

      <h2 style={{ textAlign: "center", marginTop: "40px", fontSize: "1.7rem", color: "#efefef" }}>LATEST NEWS</h2>
      <br></br>
      <div style={{ padding: "20px", backgroundColor: "#f0f0f0", color: "black", borderRadius: "10px", margin: "0 40px" }}>
        <p style={{ fontSize: "1.2rem", backgroundColor: "#efefef", textAlign: "center" }}>
          Here is some additional information about our projects and team. We are constantly working to improve and innovate. We are always looking for new opportunities to grow and expand our services. We are committed to providing the best possible experience for our customers. We are dedicated to providing the best service possible. Our team is committed to excellence and we strive to exceed your expectations.
        </p>
      </div>

      <h2 style={{ textAlign: "center", marginTop: "40px", fontSize: "1.7rem", color: "#ccc" }}>ABOUT US</h2>
      <div style={{ display: "flex", height: "50vh", backgroundColor: "#black", color: "#efefef" }}>
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img src="/logo.png" alt="About Us" style={{ width: "50%", height: "50%", objectFit: "cover" }} />
        </div>
        <div style={{ flex: 1, padding: "20px", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "black" }}>
          <p style={{ color: "#efefef", fontSize: "1.2rem", textAlign: "center", width: "75%" }}>
        Welcome to our website. We are dedicated to providing the best service possible. Our team is committed to excellence and we strive to exceed your expectations.
          </p>
        </div>
      </div>

      <h2 style={{ textAlign: "center", marginTop: "40px", fontSize: "1.7rem", color: "#ccc" }}>PROJECTS</h2>
      <br></br>
      <div className="mt-10" style={{ display: "flex", flexWrap: "wrap", gap: "20px", margin: "0 40px" }}>
        <div style={{ flex: "1 1 calc(33.333% - 20px)", height: "200px", backgroundColor: "#e0e0e0", display: "flex", alignItems: "center", justifyContent: "center", color: "black", borderRadius: "10px" }}>
          <p>Project 1</p>
        </div>
        <div style={{ flex: "1 1 calc(33.333% - 20px)", height: "200px", backgroundColor: "#e0e0e0", display: "flex", alignItems: "center", justifyContent: "center", color: "black", borderRadius: "10px" }}>
          <p>Project 2</p>
        </div>
        <div style={{ flex: "1 1 calc(33.333% - 20px)", height: "200px", backgroundColor: "#e0e0e0", display: "flex", alignItems: "center", justifyContent: "center", color: "black", borderRadius: "10px" }}>
          <p>Project 3</p>
        </div>
        <div style={{ flex: "1 1 calc(33.333% - 20px)", height: "200px", backgroundColor: "#e0e0e0", display: "flex", alignItems: "center", justifyContent: "center", color: "black", borderRadius: "10px" }}>
          <p>Project 4</p>
        </div>
        <div style={{ flex: "1 1 calc(33.333% - 20px)", height: "200px", backgroundColor: "#e0e0e0", display: "flex", alignItems: "center", justifyContent: "center", color: "black", borderRadius: "10px" }}>
          <p>Project 5</p>
        </div>
        <div style={{ flex: "1 1 calc(33.333% - 20px)", height: "200px", backgroundColor: "#e0e0e0", display: "flex", alignItems: "center", justifyContent: "center", color: "black", borderRadius: "10px" }}>
          <p>Project 6</p>
        </div>
        <div style={{ flex: "1 1 calc(33.333% - 20px)", height: "200px", backgroundColor: "#e0e0e0", display: "flex", alignItems: "center", justifyContent: "center", color: "black", borderRadius: "10px" }}>
          <p>Project 7</p>
        </div>
        <div style={{ flex: "1 1 calc(33.333% - 20px)", height: "200px", backgroundColor: "#e0e0e0", display: "flex", alignItems: "center", justifyContent: "center", color: "black", borderRadius: "10px" }}>
          <p>Project 8</p>
        </div>
        <div style={{ flex: "1 1 calc(33.333% - 20px)", height: "200px", backgroundColor: "#e0e0e0", display: "flex", alignItems: "center", justifyContent: "center", color: "black", borderRadius: "10px" }}>
          <p>Project 9</p>
        </div>
      </div>

      

      <footer style={{ marginTop: "20px", padding: "20px", backgroundColor: "#333", color: "#fff", textAlign: "center" }}>
        <p>&copy; 2025 Your Lab. All rights reserved.</p>
        <p>
          <a href="/privacy-policy" style={{ color: "#fff", textDecoration: "underline" }}>Privacy Policy</a> | 
          <a href="/terms-of-service" style={{ color: "#fff", textDecoration: "underline", marginLeft: "10px" }}>Terms of Service</a>
        </p>
      </footer>

    </div>
  );
}
