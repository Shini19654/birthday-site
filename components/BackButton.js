"use client";
import { useRouter } from "next/navigation";

export default function BackButton() {
    const router = useRouter();

    return (
        <button
            onClick={() => router.back()}
            className="fixed bottom-6 left-6 z-50
                 px-4 py-2 rounded-full
                 bg-white/80 backdrop-blur
                 text-[#EC407A] font-medium
                 shadow-md
                 hover:bg-[#EC407A] hover:text-white
                 transition-all"
        >
            ← Back
        </button>
    );
}
