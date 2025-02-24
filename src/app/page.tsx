'use client'

import Image from "next/image";

export default function Home() {
  return (

    
    <div>
      
      <div className="mt-10" style={{ width: "100%", height: "50vh", overflowX: "scroll", whiteSpace: "nowrap" }}>
        <img src="/test1.jpeg" alt="Image 1" style={{ width: "100vw", height: "100%", objectFit: "cover", display: "inline-block" }} />
        <img src="/test2.jpg" alt="Image 2" style={{ width: "100vw", height: "100%", objectFit: "cover", display: "inline-block" }} />
        <img src="/test3.jpg" alt="Image 3" style={{ width: "100vw", height: "100%", objectFit: "cover", display: "inline-block" }} />
      </div>
      <div style={{ display: "flex", height: "50vh" }}>
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img src="/file.svg" alt="About Us" style={{ width: "50%", height: "50%", objectFit: "cover" }} />
        </div>
        <div style={{ flex: 1, padding: "20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p style={{ fontSize: "1.2rem", textAlign: "center", width: "75%" }}>
        Welcome to our website. We are dedicated to providing the best service possible. Our team is committed to excellence and we strive to exceed your expectations.
          </p>
        </div>
      </div>
      <div style={{ width: "100%", height: "4px", backgroundColor: "#ccc", marginTop: "20px" }}></div>
      <h2 style={{ textAlign: "center", marginTop: "20px", fontSize: "2rem", color: "#ccc" }}>Projects</h2>
      <br></br>
      <div className="mt-10" style={{ display: "flex", flexWrap: "wrap", gap: "20px", margin: "0 20px" }}>
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
        <p>&copy; 2023 Your Company. All rights reserved.</p>
        <p>
          <a href="/privacy-policy" style={{ color: "#fff", textDecoration: "underline" }}>Privacy Policy</a> | 
          <a href="/terms-of-service" style={{ color: "#fff", textDecoration: "underline", marginLeft: "10px" }}>Terms of Service</a>
        </p>
      </footer>

    </div>
  );
}
