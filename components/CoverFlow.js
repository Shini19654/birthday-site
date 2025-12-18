"use client";
import { useState } from "react";

export default function CoverFlow({ images }) {
    const [index, setIndex] = useState(0);

    if (!images || images.length === 0) {
        return (
            <p className="text-lg text-[#6B6B6B]">
                Add photos / videos to memories
            </p>
        );
    }

    return (
        <div
            className="relative flex items-center justify-center w-full"
            style={{ perspective: "1400px", height: "560px" }}
        >
            {images.map((item, i) => {
                const offset = i - index;
                const isActive = i === index;

                const baseWidth = isActive ? 360 : 300;
                const baseHeight = isActive ? 460 : 360;

                return (
                    <div
                        key={i}
                        onClick={() => setIndex(i)}
                        className="absolute cursor-pointer transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)]"
                        style={{
                            width: baseWidth,
                            height: baseHeight,
                            transform: `
                translateX(${offset * 190}px)
                translateY(${isActive ? "-22px" : "0px"})
                rotateY(${offset * -30}deg)
                scale(${isActive ? 1 : 0.78})
              `,
                            zIndex: 100 - Math.abs(offset),
                            opacity: Math.abs(offset) > 3 ? 0 : 1,
                        }}
                    >
                        {/* Card */}
                        <div
                            className="relative w-full h-full rounded-2xl overflow-hidden bg-white
                         shadow-[0_25px_60px_rgba(0,0,0,0.28)]"
                        >
                            {/* Image / Video */}
                            {typeof item === "string" || item.type === "image" ? (
                                <img
                                    src={typeof item === "string" ? item : item.src}
                                    className="w-full h-full object-cover"
                                    draggable={false}
                                />
                            ) : (
                                <video
                                    src={item.src}
                                    poster={item.poster}   // ⭐ thumbnail
                                    muted
                                    loop
                                    playsInline
                                    autoPlay={isActive}
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </div>

                        {/* Reflection (only for active) */}
                        {isActive && (
                            <div
                                className="absolute top-full left-0 w-full h-[120px]
                           scale-y-[-1] opacity-30 overflow-hidden rounded-2xl"
                                style={{
                                    maskImage:
                                        "linear-gradient(to bottom, rgba(0,0,0,0.35), transparent)",
                                    WebkitMaskImage:
                                        "linear-gradient(to bottom, rgba(0,0,0,0.35), transparent)",
                                }}
                            >
                                {typeof item === "string" || item.type === "image" ? (
                                    <img
                                        src={typeof item === "string" ? item : item.src}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <video
                                        src={item.src}
                                        poster={item.poster}
                                        muted
                                        playsInline
                                        className="w-full h-full object-cover"
                                    />
                                )}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
