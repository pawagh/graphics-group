'use client'

import Image from "next/image";

export default function Home() {
  return (
    <div style={{
      fontFamily: "Arial, sans-serif",
      margin: 0,
      padding: 0,
      backgroundColor: "#f7f7f7",
      color: "#333"
    }}>
      {/* Scrolling Images */}
      <div style={{ width: "100%", overflow: "hidden" }}>
        <div style={{
          display: "flex",
          width: "calc(200 * 100vw)",
          animation: "scroll 20s linear infinite"
        }}>
          {["/2.png", "/3.png", "/4.png", "/2.png", "/3.png", "/4.png"].map((src, index) => (
            <img key={index}
              src={src}
              alt={`Image ${index + 1}`}
              style={{
                width: "100vw",
                height: "60vh",
                objectFit: "cover"
              }}
            />
          ))}
        </div>
      </div>
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50vw); }
          }
        `}
      </style>

      <div style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "center",
        margin: "40px auto",
        maxWidth: "1200px"
      }}>
        <div style={{ flex: 2, marginRight: "20px" }}>
          {/* Latest News */}
          <section style={{
        textAlign: "center",
        padding: "40px 20px",
        backgroundColor: "#fff",
        marginBottom: "40px",
        borderRadius: "8px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
          }}>
        <h2 style={{ marginBottom: "20px", fontSize: "1.8rem" }}>LATEST NEWS</h2>
        <p style={{
          fontSize: "1.1rem",
          lineHeight: 1.6,
          margin: 0
        }}>
          Here is some additional information about our projects and team. We are constantly working to improve and innovate,
          and we are committed to providing the best experience for our customers.
        </p>
          </section>

          {/* About Us */}
          <section style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        backgroundColor: "#fff",
        marginBottom: "40px",
        borderRadius: "8px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
          }}>
        <div style={{ flex: 1, textAlign: "center" }}>
          <img src="/logo.png" alt="About Us"
            style={{ width: "80%", maxWidth: "250px", objectFit: "contain" }} />
        </div>
        <div style={{ flex: 2, padding: "0 20px" }}>
          <p style={{ fontSize: "1.1rem", lineHeight: 1.6, margin: 0 }}>
            Welcome to our website. We are dedicated to providing an exceptional service and strive to exceed your expectations.
          </p>
        </div>
          </section>
        </div>

        {/* Lab Calendar */}
        <div style={{
          flex: 1,
          alignSelf: "stretch",
          backgroundColor: "#fff",
          padding: "40px 20px",
          borderRadius: "8px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column"
        }}>
          <h2 style={{ marginBottom: "20px", fontSize: "1.8rem", textAlign: "center" }}>LAB CALENDAR</h2>
          <p style={{
        fontSize: "1.1rem",
        lineHeight: 1.6,
        textAlign: "center",
        margin: 0
          }}>
        Upcoming lab events and schedules will appear here.
          </p>
          <ul style={{
        listStyleType: "none",
        padding: 0,
        marginTop: "20px",
        textAlign: "center"
          }}>
        <li>Event 1</li>
        <li>Event 2</li>
        <li>Event 3</li>
        <li>Event 4</li>
          </ul>
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        padding: "20px",
        backgroundColor: "#fff",
        textAlign: "center",
        fontSize: "0.9rem",
        boxShadow: "0 -2px 5px rgba(0,0,0,0.05)"
      }}>
        <p style={{ margin: "5px 0" }}>&copy; 2025 Your Lab. All rights reserved.</p>
        <p style={{ margin: "5px 0" }}>
          <a href="/privacy-policy" style={{ color: "#333", textDecoration: "underline", marginRight: "10px" }}>Privacy Policy</a>
          <a href="/terms-of-service" style={{ color: "#333", textDecoration: "underline" }}>Terms of Service</a>
        </p>
      </footer>
    </div>
  );
}
