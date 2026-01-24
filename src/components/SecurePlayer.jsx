'use client';

import { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize } from 'lucide-react';

export default function SecurePlayer({ videoId, studentInfo }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const playerRef = useRef(null);
    const containerRef = useRef(null);
    const overlayRef = useRef(null);

    // Initialize YouTube Player
    useEffect(() => {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        window.onYouTubeIframeAPIReady = () => {
            playerRef.current = new window.YT.Player('secure-player-frame', {
                height: '100%',
                width: '100%',
                videoId: videoId,
                playerVars: {
                    'playsinline': 1,
                    'controls': 0, // Hide native controls
                    'rel': 0,
                    'modestbranding': 1,
                    'disablekb': 1, // Disable keyboard controls
                    'fs': 0, // Disable native fullscreen
                },
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange,
                },
            });
        };

        return () => {
            // Cleanup
            if (playerRef.current) {
                // playerRef.current.destroy(); // caused issues in React strict mode sometimes
            }
        };
    }, [videoId]);

    const onPlayerReady = (event) => {
        setDuration(event.target.getDuration());
    };

    const onPlayerStateChange = (event) => {
        if (event.data === window.YT.PlayerState.PLAYING) {
            setIsPlaying(true);
            startProgressLoop();
        } else {
            setIsPlaying(false);
            stopProgressLoop();
        }
    };

    let progressInterval;
    const startProgressLoop = () => {
        stopProgressLoop();
        progressInterval = setInterval(() => {
            if (playerRef.current && playerRef.current.getCurrentTime) {
                const current = playerRef.current.getCurrentTime();
                const total = playerRef.current.getDuration();
                setProgress((current / total) * 100);
            }
        }, 1000);
    };

    const stopProgressLoop = () => {
        if (progressInterval) clearInterval(progressInterval);
    };

    const togglePlay = () => {
        if (isPlaying) {
            playerRef.current.pauseVideo();
        } else {
            playerRef.current.playVideo();
        }
    };

    const toggleMute = () => {
        if (isMuted) {
            playerRef.current.unMute();
            setIsMuted(false);
        } else {
            playerRef.current.mute();
            setIsMuted(true);
        }
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            containerRef.current.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable fullscreen: ${err.message}`);
            });
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    // Prevent right click
    useEffect(() => {
        const handleContextMenu = (e) => {
            e.preventDefault();
        };

        // Prevent common shortcuts
        const handleKeyDown = (e) => {
            if (
                e.keyCode === 123 || // F12
                (e.ctrlKey && e.shiftKey && e.keyCode === 73) || // Ctrl+Shift+I
                (e.ctrlKey && e.keyCode === 85) || // Ctrl+U
                (e.ctrlKey && e.keyCode === 83) // Ctrl+S
            ) {
                e.preventDefault();
            }
        };

        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);


    return (
        <div
            ref={containerRef}
            className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-2xl group select-none"
        >
            {/* YouTube Iframe container */}
            <div id="secure-player-frame" className="w-full h-full pointer-events-none"></div>

            {/* Transparent Overlay to block interactions */}
            <div className="absolute inset-0 z-10 bg-transparent w-full h-full"></div>

            {/* Dynamic Watermark */}
            <div className="watermark-container absolute inset-0 z-20 pointer-events-none overflow-hidden opacity-40">
                <div className="animate-float text-white/20 font-bold text-2xl whitespace-nowrap select-none p-4">
                    {studentInfo.name} - {studentInfo.phone}
                </div>
            </div>

            {/* Custom Controls */}
            <div className="absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-black/90 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">

                {/* Progress Bar */}
                <div className="w-full h-1 bg-white/30 rounded-full mb-4 cursor-pointer" onClick={(e) => {
                    const rect = e.target.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const clickedValue = (x / rect.width);
                    const newTime = clickedValue * duration;
                    playerRef.current.seekTo(newTime);
                }}>
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${progress}%` }}></div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button onClick={togglePlay} className="text-white hover:text-blue-400 transition">
                            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                        </button>

                        <button onClick={toggleMute} className="text-white hover:text-slate-300 transition">
                            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                        </button>

                        <span className="text-xs text-slate-300 font-mono">
                            {/* Simple time display could go here */}
                        </span>
                    </div>

                    <button onClick={toggleFullscreen} className="text-white hover:text-blue-400 transition">
                        {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            <style jsx global>{`
        @keyframes float {
          0% { transform: translate(0, 0); }
          25% { transform: translate(calc(100% - 100px), 50%); }
          50% { transform: translate(50%, calc(100% - 50px)); }
          75% { transform: translate(0, 50%); }
          100% { transform: translate(calc(100% - 100px), 0); }
        }
        .animate-float {
          animation: float 15s linear infinite alternate;
          position: absolute;
          /* Ensure it moves within bounds roughly - improved with more keyframes or JS later */
          top: 0; left: 0;
           /* This is a simple approximation. For true DVD bounce, JS is better, but this suffices for "Dynamic" */
        }
      `}</style>
        </div>
    );
}
