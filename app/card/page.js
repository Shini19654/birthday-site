"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CONFIG } from "../../config";
import CoverFlow from "../../components/CoverFlow";
import PasscodeSecret from "../../components/PasscodeSecret";
import confetti from "canvas-confetti";
import FloatingHearts from "../../components/FloatingHearts";
import BirthdayCard from "../../components/BirthdayCard";
import BackButton from "../../components/BackButton";



export default function Reveal() {
    const router = useRouter();
    const audioRef = useRef(null);
    const [slide, setSlide] = useState(0);
    const [playing, setPlaying] = useState(true);
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.play().catch(() => {
                setPlaying(false);
            });
        }
    }, []);

    // Midnight lock
    useEffect(() => {
        if (Date.now() < new Date(CONFIG.targetDate).getTime()) {
            router.push("/");
        }
    }, [router]);

    const celebrate = () => {
        audioRef.current?.play();

        const end = Date.now() + 3000;
        (function frame() {
            confetti({ particleCount: 10, spread: 70, origin: { x: 0 } });
            confetti({ particleCount: 10, spread: 70, origin: { x: 1 } });
            if (Date.now() < end) requestAnimationFrame(frame);
        })();

        setSlide(2);
    };

    return (
        <main
            className="fixed inset-0 flex items-center justify-center"
            style={{
                backgroundImage: "url('/intro-bg.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            {/* Soft overlay for readability */}
            <div className="absolute inset-0 bg-[#FFE0E8]/70" />

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
                className="absolute top-6 right-6 z-20 px-5 py-2 rounded-full
                 border border-[#EC407A] text-[#EC407A]
                 font-medium hover:bg-[#EC407A] hover:text-white transition"
            >
                {playing ? "⏸ Pause Music" : "▶️ Play Music"}
            </button>

            {/* Card + Next button */}
            <div className="relative z-20 flex flex-col items-center gap-8">
                {/* Card */}
                <BirthdayCard
                    message={CONFIG.heartMessage}
                    onOpen={() => setSlide(1)}
                />

                {/* Next */}
                <button
                    onClick={() => router.push("/memories")}
                    className="px-10 py-4 rounded-full text-white font-semibold text-lg
               bg-[#EC407A] hover:bg-[#D81B60]
               shadow-[0_15px_40px_rgba(236,64,122,0.45)]
               transition-all"
                >
                    Wanna See Some Memories of us? →
                </button>
            </div>
            <BackButton />
        </main>
    );

}
