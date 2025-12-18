"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CONFIG } from "../../config";
import { Dancing_Script } from "next/font/google";
import BackButton from "../../components/BackButton";

const handwritten = Dancing_Script({
    subsets: ["latin"],
    weight: ["400", "600"],
});

export default function Intro() {
    const router = useRouter();
    const audioRef = useRef(null);
    const [playing, setPlaying] = useState(true);

    // Auto-play music when intro loads
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.play().catch(() => {
                setPlaying(false);
            });
        }
    }, []);

    return (
        <main
            className="fixed inset-0 flex flex-col items-center justify-center text-center px-6"
            style={{
                backgroundImage: "url('bg.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            {/* Music */}
            <audio ref={audioRef} src={CONFIG.music} loop />

            {/* Play / Pause button */}
            <button
                onClick={() => {
                    if (!audioRef.current) return;

                    if (playing) {
                        audioRef.current.pause();
                    } else {
                        audioRef.current.play();
                    }
                    setPlaying(!playing);
                }}
                className="absolute top-6 right-6 px-5 py-2 rounded-full
                   border border-[#EC407A] text-[#EC407A]
                   font-medium hover:bg-[#EC407A] hover:text-white transition"
            >
                {playing ? "⏸ Pause Music" : "▶️ Play Music"}
            </button>

            {/* Text */}
            <h1 className={`text-9xl font-bold text-[#2F2F2F] mb-2 ${handwritten.className}`}>
                Happy Birthday 🎂
            </h1>

            <h2 className={`text-7xl font-bold text-[#EC407A] mb-6 ${handwritten.className}`}>
                {CONFIG.personName}
            </h2>

            <p className="max-w-md text-[#2F2F2F] font-bold text-xl leading-relaxed mb-2">
                Some people make life softer, warmer, and brighter
                just by being in it.
            </p>

            <p className="text-xl mb-8">💗</p>

            <button
                onClick={() => router.push("/ready")}
                className="px-10 py-4 rounded-full text-white font-semibold text-lg
                   bg-[#EC407A] hover:bg-[#D81B60]
                   shadow-[0_15px_40px_rgba(236,64,122,0.45)]
                   transition-all"
            >
                Continue →
            </button>
            <BackButton />
        </main>
    );
}
