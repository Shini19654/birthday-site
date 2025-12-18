"use client";
import { useEffect } from "react";

export default function FloatingHearts() {
    useEffect(() => {
        const container = document.getElementById("hearts");
        if (!container) return;

        const createHeart = () => {
            const heart = document.createElement("div");
            heart.innerText = "💗";
            heart.style.position = "absolute";
            heart.style.left = Math.random() * 100 + "vw";
            heart.style.bottom = "-20px";
            heart.style.fontSize = Math.random() * 12 + 16 + "px";
            heart.style.opacity = "0.6";
            heart.style.animation = `floatUp ${6 + Math.random() * 4}s linear`;

            container.appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, 10000);
        };

        const interval = setInterval(createHeart, 700);
        return () => clearInterval(interval);
    }, []);

    return (
        <div
            id="hearts"
            className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        />
    );
}
