"use client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { CONFIG } from "../config";

export default function BackButton() {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const now = Date.now();
        const target = new Date(CONFIG.targetDate).getTime();

        // Allow ONLY countdown page before time
        if (now < target && pathname !== "/") {
            router.replace("/");
        }
    }, [pathname, router]);

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
