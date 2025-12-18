"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CONFIG } from "../../config";
import CoverFlow from "../../components/CoverFlow";
import PasscodeSecret from "../../components/PasscodeSecret";
import confetti from "canvas-confetti";
import FloatingHearts from "../../components/FloatingHearts";
import BackButton from "../../components/BackButton";


export default function Reveal() {
    const router = useRouter();
    const audioRef = useRef(null);
    const [slide, setSlide] = useState(0);

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
            className="fixed inset-0 overflow-hidden"
            style={{ background: "linear-gradient(180deg, #FFE0E8 0%, #FFD6E3 60%, #FFE0E8 100%)" }}
        >
            <audio ref={audioRef} src={CONFIG.music} loop />
            {slide >= 2 && <FloatingHearts />}

            <div
                className="relative z-10 flex h-full transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)]"
                style={{ transform: `translateX(-${slide * 100}vw)` }}
            >

                {/* SLIDE 0 — MESSAGE */}
                <section className="w-screen h-full flex flex-col items-center justify-center text-center px-6 backdrop-blur-[2px]">
                    <h1 className="text-4xl font-bold text-[#2F2F2F] mb-4">
                        {CONFIG.revealHeading}{" "}
                        <span className="text-[#EC407A]">{CONFIG.personName}</span>
                    </h1>

                    <p className="whitespace-pre-line text-[#6B6B6B] max-w-xl mb-8">
                        {CONFIG.heartMessage}
                    </p>

                    <button
                        onClick={() => setSlide(1)}
                        className="px-8 py-3 rounded-full bg-[#EC407A] text-white font-semibold shadow-lg hover:bg-[#D81B60]"
                    >
                        Continue →
                    </button>
                </section>

                {/* SLIDE 1 — CELEBRATE */}
                <section className="w-screen h-full flex flex-col items-center justify-center text-center px-6">
                    <h2 className="text-3xl font-bold text-[#EC407A] mb-6">
                        Ready to celebrate? 🎉
                    </h2>

                    <button
                        onClick={celebrate}
                        className="px-10 py-4 rounded-full bg-[#EC407A] text-white font-semibold
                                   shadow-[0_10px_30px_rgba(236,64,122,0.35)]
                                   hover:shadow-[0_15px_40px_rgba(236,64,122,0.45)]
                                   transition-all duration-300"

                    >
                        Let’s Celebrate
                    </button>
                </section>

                {/* SLIDE 2 — COVER FLOW */}
                <section className="w-screen h-full flex flex-col items-center justify-center text-center px-6">
                    <h2 className="text-2xl font-semibold text-[#2F2F2F] mb-6">
                        Memories 🤍
                    </h2>

                    <CoverFlow images={CONFIG.photos} />

                    <button
                        onClick={() => setSlide(3)}
                        className="mt-10 text-sm text-[#EC407A] underline"
                    >
                        One more thing →
                    </button>
                </section>

                {/* SLIDE 3 — SECRET */}
                <section className="w-screen h-full flex flex-col items-center justify-center text-center px-6">
                    <PasscodeSecret
                        correctCode={CONFIG.passcode}
                        message={CONFIG.passcodeSecret}
                    />
                </section>
            </div>
            <BackButton />
        </main>
    );
}
