"use client";
import { useState } from "react";
import BirthdayCard from "../components/BirthdayCard";
import { Dancing_Script } from "next/font/google";

const handwritten = Dancing_Script({
    subsets: ["latin"],
    weight: ["400", "600"],
});


export default function PasscodeSecret({ correctCode, message }) {
    const [showInput, setShowInput] = useState(false);
    const [code, setCode] = useState("");
    const [unlocked, setUnlocked] = useState(false);
    const [error, setError] = useState("");

    const unlock = () => {
        if (code === correctCode) {
            setUnlocked(true);
            setError("");
        } else {
            setError("Wrong passcode");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            {/* Step 1: Button */}
            {!showInput && !unlocked && (
                <button
                    onClick={() => setShowInput(true)}
                    className={`text-5xl font-bold text-[#EC407A] underline ${handwritten.className}`}>
                    Try Unlock something which is Just For You
                </button>
            )}

            {/* Step 2: Passcode input */}
            {showInput && !unlocked && (
                <div className="mt-4 flex flex-col items-center gap-3">
                    <input
                        type="password"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Passcode"
                        className="px-4 py-2 border rounded text-center text-black"
                    />

                    <button
                        onClick={unlock}
                        className="px-6 py-2 bg-[#EC407A] text-white rounded"
                    >
                        Unlock
                    </button>

                    {error && (
                        <p className="text-xs text-red-400">{error}</p>
                    )}
                </div>
            )}

            {/* Step 3: Secret card */}
            {unlocked && (
                <div className="mt-8">
                    <BirthdayCard message={message} />
                </div>
            )}
        </div>
    );
}
