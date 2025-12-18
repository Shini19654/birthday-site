"use client";
import { useState, useRef, useEffect } from "react";

export default function CoverFlow({ images }) {
    const [index, setIndex] = useState(0);
    const [playingVideo, setPlayingVideo] = useState(null);
    const [progress, setProgress] = useState(0);

    const videoRefs = useRef({});

    const total = images?.length || 0;

    // Pause videos when index changes
    useEffect(() => {
        Object.values(videoRefs.current).forEach((v) => {
            if (v) v.pause();
        });
        setPlayingVideo(null);
        setProgress(0);
    }, [index]);

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
                // 🔁 LOOPING OFFSET LOGIC (core)
                const rawOffset = i - index;
                let offset = rawOffset % total;
                if (offset > total / 2) offset -= total;
                if (offset < -total / 2) offset += total;

                const isActive = offset === 0;
                const isVideo = item?.type === "video";

                return (
                    <div
                        key={i}
                        onClick={() => setIndex(index + offset)}
                        className="absolute cursor-pointer transition-all duration-700
                       ease-[cubic-bezier(.22,1,.36,1)]"
                        style={{
                            width: isActive ? 360 : 300,
                            height: isActive ? 460 : 360,
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
                        {/* CARD */}
                        <div className="relative w-full h-full rounded-2xl overflow-hidden
                            bg-white shadow-[0_25px_60px_rgba(0,0,0,0.28)]">

                            {/* IMAGE / GIF */}
                            {!isVideo ? (
                                <img
                                    src={typeof item === "string" ? item : item.src}
                                    className="w-full h-full object-cover"
                                    draggable={false}
                                />
                            ) : (
                                <>
                                    {/* VIDEO */}
                                    <video
                                        ref={(el) => (videoRefs.current[i] = el)}
                                        src={item.src}
                                        poster={item.poster}
                                        muted
                                        playsInline
                                        className="w-full h-full object-cover"
                                        onTimeUpdate={(e) => {
                                            if (isActive && playingVideo === i) {
                                                const v = e.target;
                                                setProgress(
                                                    (v.currentTime / v.duration) * 100 || 0
                                                );
                                            }
                                        }}
                                        onEnded={() => {
                                            setPlayingVideo(null);
                                            setProgress(0);
                                        }}
                                    />

                                    {/* CONTROLS — ONLY WHEN CENTER */}
                                    {isActive && (
                                        <div
                                            className="absolute bottom-0 left-0 w-full
                                 bg-black/55 backdrop-blur-md
                                 px-4 py-3 flex items-center gap-3"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            {/* Play / Pause */}
                                            <button
                                                onClick={() => {
                                                    const video = videoRefs.current[i];
                                                    if (!video) return;

                                                    if (video.paused) {
                                                        video.play();
                                                        setPlayingVideo(i);
                                                    } else {
                                                        video.pause();
                                                        setPlayingVideo(null);
                                                    }
                                                }}
                                                className="text-white text-xl"
                                            >
                                                {playingVideo === i ? "⏸" : "▶️"}
                                            </button>

                                            {/* Timeline */}
                                            <input
                                                type="range"
                                                min="0"
                                                max="100"
                                                value={progress}
                                                onChange={(e) => {
                                                    const video = videoRefs.current[i];
                                                    if (!video) return;

                                                    const value = Number(e.target.value);
                                                    video.currentTime =
                                                        (value / 100) * video.duration;
                                                    setProgress(value);
                                                }}
                                                className="flex-1 accent-[#EC407A] cursor-pointer"
                                            />
                                        </div>
                                    )}
                                </>
                            )}
                        </div>

                        {/* REFLECTION — ACTIVE ONLY */}
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
                                {!isVideo ? (
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
