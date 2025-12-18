"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CONFIG } from "../../config";
import CoverFlow from "../../components/CoverFlow";
import { Dancing_Script } from "next/font/google";
import BackButton from "../../components/BackButton";

const handwritten = Dancing_Script({
    subsets: ["latin"],
    weight: ["400", "600"],
});

export default function Memories() {
    const router = useRouter();
    const audioRef = useRef(null);
    const [playing, setPlaying] = useState(true);

    return (
        <main
            className="fixed inset-0 flex flex-col items-center justify-center text-center px-6"
            style={{
                backgroundImage: "url('/bg.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-[#FFE0E8]/10" />

            {/* Music */}
            <audio ref={audioRef} src={CONFIG.music} loop autoPlay />

            {/* Play / Pause */}
            <button
                onClick={() => {
                    if (!audioRef.current) return;
                    playing ? audioRef.current.pause() : audioRef.current.play();
                    setPlaying(!playing);
                }}
                className="absolute top-6 right-6 z-20 px-5 py-2 rounded-full
                   border border-[#EC407A] text-[#EC407A]
                   font-medium hover:bg-[#EC407A] hover:text-white transition"
            >
                {playing ? "⏸ Pause Music" : "▶️ Play Music"}
            </button>

            {/* Heart → Secret */}
            <button
                onClick={() => router.push("/secret")}
                className="absolute bottom-6 right-6 z-20 text-3xl
                   hover:scale-110 transition"
                title="Something secret 💖"
            >
                ❤️
            </button>

            {/* Content */}
            <div className="relative z-20 flex flex-col items-center gap-8">
                <h1 className={`text-9xl font-bold text-[#2F2F2F] underline ${handwritten.className}`}>
                    Memories
                </h1>

                <CoverFlow images={CONFIG.photos} />
            </div>
            <BackButton />
        </main>
    );
}
