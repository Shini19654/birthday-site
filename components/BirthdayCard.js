"use client";
import { useState } from "react";
import { Dancing_Script } from "next/font/google";
import FloatingHearts from "../components/FloatingHearts";

const handwritten = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export default function BirthdayCard({ message, onOpen }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);

    for (let i = 0; i < 20; i++) {
      const sparkle = document.createElement("div");
      sparkle.innerText = "✨";
      sparkle.style.position = "absolute";
      sparkle.style.left = Math.random() * 100 + "%";
      sparkle.style.top = Math.random() * 100 + "%";
      sparkle.style.animation = "sparkle 1s ease-out forwards";
      sparkle.style.pointerEvents = "none";
      sparkle.style.fontSize = "60px";
      sparkle.style.opacity = "0.8";

      document.body.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 10000);
    }

    setTimeout(() => onOpen?.(), 12000);
  };


  return (
    <div className="relative w-[940px] h-[550px] perspective">
      <div
        className={`card ${open ? "open" : ""}`}
        onClick={handleOpen}
      >
        {/* Front */}
        <div className={`card-face card-front ${handwritten.className}`}>
          <p className="text-9xl font-semibold text-[#EC407A] leading-relaxed">
            💌 Tap to open
          </p>
          <FloatingHearts />

        </div>

        {/* Inside */}
        <div className={`card-face card-inside ${handwritten.className}`}>
          <p className="whitespace-pre-line text-[#2F2F2F] font-bold text-xl leading-relaxed">
            {message}
          </p>
        </div>

      </div>

      <style jsx>{`
        .perspective {
          perspective: 1200px;
        }

        .card {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 2s ease;
          cursor: pointer;
        }

        .card.open {
          transform: rotateY(-180deg);
        }

        .card-face {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.25);
          background: white;
        }

        .card-front {
    background-image: url("/bg4.avif");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

        .card-inside {
          transform: rotateY(180deg);
          text-align: left;
          justify-content: center;
        }
        @keyframes sparkle {
  from {
    transform: scale(0.5);
    opacity: 1;
  }
  to {
    transform: scale(1.6);
    opacity: 0;
  }
}

      `}</style>
    </div>
  );
}
