"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CONFIG } from "../config";
import confetti from "canvas-confetti";

export default function Page() {
  const router = useRouter();
  const audioRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState({});
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const target = new Date(CONFIG.targetDate).getTime();

    const timer = setInterval(() => {
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        clearInterval(timer);
        setFinished(true);
        return;
      }

      setTime({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const celebrate = () => {
    const end = Date.now() + 3000;
    (function frame() {
      confetti({ particleCount: 10, spread: 70, origin: { x: 0 } });
      confetti({ particleCount: 10, spread: 70, origin: { x: 1 } });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  };

  return (
    <main
      className="h-screen flex flex-col items-center justify-center text-center px-6"
      style={{ backgroundColor: "#FFE0E8" }}
    >
      {/* Music */}
      <audio ref={audioRef} src={CONFIG.music} loop />

      {/* Play / Pause button */}
      <button
        onClick={() => {
          if (!audioRef.current) return;
          playing ? audioRef.current.pause() : audioRef.current.play();
          setPlaying(!playing);
        }}
        className="absolute top-6 right-6 px-5 py-2 rounded-full
                   border border-[#EC407A] text-[#EC407A] text-lg
                   font-medium hover:bg-[#EC407A] hover:text-white transition"
      >
        {playing ? "⏸ Pause Music" : "▶️ Play Music"}
      </button>

      {/* Heading */}
      <h1 className="text-5xl font-bold text-[#2F2F2F] mb-4">
        Counting down to{" "}
        <span className="text-[#EC407A]">Aishwarya&apos;s</span>{" "}
        special day 🎂
      </h1>

      {/* Subtitle */}
      <p className="text-lg italic text-[#6B6B6B] mb-8">
        You mean more to me than words can ever explain 💖
      </p>

      {!finished ? (
        <>
          <div className="flex gap-4 mb-6">
            {["days", "hours", "minutes", "seconds"].map((u) => (
              <div
                key={u}
                className="bg-white px-6 py-4 rounded-xl shadow-md min-w-[90px]"
              >
                <div className="text-3xl font-bold text-[#EC407A]">
                  {time[u] ?? "00"}
                </div>
                <div className="text-xs uppercase text-[#6B6B6B] mt-1">
                  {u}
                </div>
              </div>
            ))}
          </div>

          <p className="text-[#EC407A] font-semibold text-xl mb-2">
            ✨ A special celebration awaits you at midnight… ✨
          </p>
          <p className="text-lg text-[#6B6B6B]">
            Something magical is about to unfold 🌙
          </p>
        </>
      ) : (
        <>
          <h2
            className="text-5xl font-bold text-[#EC407A] mb-10"
            style={{ animation: "birthdayJump 1s ease-in-out infinite" }}
          >
            🎉 It’s your birthday!
          </h2>

          <button
            onClick={() => {
              celebrate();
              router.push("/intro");
            }}
            className="px-12 py-4 rounded-full text-white font-semibold text-lg bg-[#EC407A]"
            style={{ animation: "birthdayPulse 1.6s ease-in-out infinite" }}
          >
            🎂 Let’s Celebrate
          </button>

          <style jsx>{`
            @keyframes birthdayJump {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-22px); }
            }

            @keyframes birthdayPulse {
              0% { transform: scale(1); }
              50% { transform: scale(1.1); }
              100% { transform: scale(1); }
            }
          `}</style>
        </>
      )}
    </main>
  );
}
