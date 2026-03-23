'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, Settings } from 'lucide-react';

export default function SecurePlayer({ videoId, studentInfo }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isReady, setIsReady] = useState(false);
    
    // New Features state
    const [playbackRate, setPlaybackRate] = useState(1);
    const [showSettings, setShowSettings] = useState(false);
    const [quality, setQuality] = useState('auto');
    const [availableQualities, setAvailableQualities] = useState([]);

    const playerRef = useRef(null);
    const containerRef = useRef(null);
    const playerWrapperRef = useRef(null);

    // Initialize YouTube Player
    useEffect(() => {
        const playerId = `youtube-player-${videoId}`;
        if (playerWrapperRef.current) {
            playerWrapperRef.current.innerHTML = `<div id="${playerId}" class="w-full h-full pointer-events-none"></div>`;
        }

        const initPlayer = () => {
            playerRef.current = new window.YT.Player(playerId, {
                height: '100%',
                width: '100%',
                videoId: videoId,
                playerVars: {
                    'playsinline': 1,
                    'controls': 0, 
                    'rel': 0,
                    'modestbranding': 1,
                    'disablekb': 1, 
                    'fs': 0, 
                },
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange,
                    'onPlaybackRateChange': onPlaybackRateChange,
                    'onPlaybackQualityChange': onPlaybackQualityChange,
                },
            });
        };

        if (!window.YT) {
            const tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            document.head.appendChild(tag);
            window.onYouTubeIframeAPIReady = initPlayer;
        } else if (window.YT && window.YT.Player) {
            initPlayer();
        }

        return () => {
            if (playerRef.current && typeof playerRef.current.destroy === 'function') {
                playerRef.current.destroy();
            }
            stopProgressLoop();
        };
    }, [videoId]);

    const onPlayerReady = (event) => {
        setIsReady(true);
        if (event.target && typeof event.target.getDuration === 'function') {
            setDuration(event.target.getDuration());
            
            // Get available qualities (YouTube restricts this on some iframes now)
            if (typeof event.target.getAvailableQualityLevels === 'function') {
                const levels = event.target.getAvailableQualityLevels();
                setAvailableQualities(levels.length > 0 ? levels : ['auto', 'hd1080', 'hd720', 'large', 'medium']);
            }
        }
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

    const onPlaybackRateChange = (event) => {
        setPlaybackRate(event.data);
    };

    const onPlaybackQualityChange = (event) => {
        setQuality(event.data);
    };

    let progressInterval;
    const startProgressLoop = () => {
        stopProgressLoop();
        window.playerProgressInterval = setInterval(() => {
            if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
                const current = playerRef.current.getCurrentTime();
                const total = playerRef.current.getDuration();
                setProgress((current / total) * 100);
            }
        }, 1000);
    };

    const stopProgressLoop = () => {
        if (window.playerProgressInterval) {
            clearInterval(window.playerProgressInterval);
        }
    };

    // Use useCallback to keep reference fresh for event listeners if needed
    const togglePlay = () => {
        if (!playerRef.current || typeof playerRef.current.getPlayerState !== 'function') return;
        const state = playerRef.current.getPlayerState();
        if (state === window.YT.PlayerState.PLAYING) {
            playerRef.current.pauseVideo();
        } else {
            playerRef.current.playVideo();
            setShowSettings(false); // Auto close settings when playing
        }
    };

    const toggleMute = (e) => {
        e.stopPropagation();
        if (!playerRef.current || typeof playerRef.current.mute !== 'function') return;
        if (isMuted) {
            playerRef.current.unMute();
            setIsMuted(false);
        } else {
            playerRef.current.mute();
            setIsMuted(true);
        }
    };

    const toggleFullscreen = (e) => {
        e.stopPropagation();
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

    const handleSeek = (e) => {
        e.stopPropagation();
        if (!isReady || !playerRef.current || typeof playerRef.current.seekTo !== 'function') return;
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const clickedValue = (x / rect.width);
        const newTime = clickedValue * duration;
        playerRef.current.seekTo(newTime, true);
    };

    const changeSpeed = (rate) => {
        if (!playerRef.current || typeof playerRef.current.setPlaybackRate !== 'function') return;
        playerRef.current.setPlaybackRate(rate);
        setPlaybackRate(rate);
    };

    const changeQuality = (q) => {
        if (!playerRef.current || typeof playerRef.current.setPlaybackQuality !== 'function') return;
        playerRef.current.setPlaybackQuality(q);
        setQuality(q);
    };

    const skipTime = (amount) => {
        if (!playerRef.current || typeof playerRef.current.getCurrentTime !== 'function') return;
        const current = playerRef.current.getCurrentTime();
        playerRef.current.seekTo(current + amount, true);
    };

    // Keyboard controls
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Anti inspect
            if (
                e.keyCode === 123 || 
                (e.ctrlKey && e.shiftKey && e.keyCode === 73) || 
                (e.ctrlKey && e.keyCode === 85) || 
                (e.ctrlKey && e.keyCode === 83) 
            ) {
                e.preventDefault();
            }

            // Custom Player Keyboard Shortcuts
            if (!playerRef.current) return;

            // Prevent default scrolling for spacebar and arrows
            if (['Space', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
                e.preventDefault();
            }

            if (e.code === 'Space') {
                togglePlay();
            } else if (e.code === 'ArrowRight') {
                // Flash forward visually? Maybe later
                skipTime(10);
            } else if (e.code === 'ArrowLeft') {
                skipTime(-10);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Also prevent context menu globally on the element
    useEffect(() => {
        const handleContextMenu = (e) => e.preventDefault();
        const currentContainer = containerRef.current;
        if (currentContainer) {
            currentContainer.addEventListener('contextmenu', handleContextMenu);
        }
        return () => {
            if (currentContainer) currentContainer.removeEventListener('contextmenu', handleContextMenu);
        };
    }, []);

    const formatTime = (seconds) => {
        if (!seconds || isNaN(seconds)) return "0:00";
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    return (
        <div
            ref={containerRef}
            className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-2xl group select-none font-sans"
        >
            <div ref={playerWrapperRef} className="w-full h-full absolute inset-0"></div>

            {/* Huge Play/Pause Action Layer */}
            <div 
                className="absolute inset-0 z-10 w-full h-full cursor-pointer flex items-center justify-center" 
                onClick={togglePlay}
                onDoubleClick={(e) => {
                    // Quick Double tap to full screen logic or skip
                    const rect = containerRef.current.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    if (clickX > rect.width / 2) {
                        skipTime(10); // Right side
                    } else {
                        skipTime(-10); // Left side
                    }
                }}
            >
                {/* Visual feedback on pause state */}
                {!isPlaying && isReady && (
                    <div className="w-20 h-20 bg-blue-600/80 backdrop-blur-md rounded-full flex items-center justify-center text-white scale-150 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300">
                        <Play className="w-10 h-10 ml-1 fill-current" />
                    </div>
                )}
            </div>

            {/* Dynamic Watermark */}
            <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden opacity-30 mix-blend-overlay">
                <div className="animate-float text-white font-black text-2xl lg:text-4xl whitespace-nowrap p-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    {studentInfo.name} • {studentInfo.phone}
                </div>
            </div>

            {/* Custom Controls */}
            <div className={`absolute bottom-0 left-0 right-0 z-30 flex flex-col justify-end p-4 transition-all duration-300 ${!isPlaying || showSettings ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0'}`}>
                
                {/* Background gradient for controls */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent -z-10 pointer-events-none"></div>

                {/* Settings Menu Popup */}
                {showSettings && (
                    <div className="absolute right-4 bottom-16 bg-[#0f172a]/95 backdrop-blur-xl border border-white/10 rounded-xl p-4 w-64 shadow-2xl animate-fade-in-up">
                        <div className="mb-4">
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">SPEED</p>
                            <div className="flex flex-wrap gap-2">
                                {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                                    <button
                                        key={rate}
                                        onClick={(e) => { e.stopPropagation(); changeSpeed(rate); }}
                                        className={`px-2 py-1 text-xs rounded font-medium transition ${playbackRate === rate ? 'bg-blue-500 text-white shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
                                    >
                                        {rate}x
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">QUALITY</p>
                            <div className="flex flex-wrap gap-2">
                                {/* Only mapping standard fallback qualities if auto detection returns garbage */}
                                {availableQualities.length > 0 ? availableQualities.map((q) => (
                                    <button
                                        key={q}
                                        onClick={(e) => { e.stopPropagation(); changeQuality(q); }}
                                        className={`px-2 py-1 text-xs rounded font-medium transition ${quality === q ? 'bg-purple-500 text-white shadow-[0_0_10px_rgba(168,85,247,0.5)]' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
                                    >
                                        {q.replace('hd', '').toUpperCase()}
                                    </button>
                                )) : (
                                    <button className="px-2 py-1 text-xs rounded bg-slate-800 text-slate-500">Auto Default</button>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Progress Bar */}
                <div className="w-full h-1.5 bg-white/20 rounded-full mb-4 cursor-pointer relative group/progress" onClick={handleSeek}>
                    <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full relative" 
                        style={{ width: `${progress}%` }}
                    >
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_10px_rgba(59,130,246,1)] scale-0 group-hover/progress:scale-100 transition-transform"></div>
                    </div>
                </div>

                {/* Control Icons Row */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 lg:gap-6">
                        <button onClick={(e) => { e.stopPropagation(); togglePlay(); }} className="text-white hover:text-blue-400 transition-colors transform hover:scale-110">
                            {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current" />}
                        </button>
                        
                        <div className="flex items-center gap-2 group/volume relative">
                            <button onClick={toggleMute} className="text-white hover:text-slate-300 transition-colors transform hover:scale-110">
                                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                            </button>
                        </div>
                        
                        {/* Time Display */}
                        <div className="text-xs font-medium text-slate-300 font-mono tracking-widest hidden sm:block">
                             {formatTime(playerRef.current?.getCurrentTime?.() || 0)} / {formatTime(duration)}
                        </div>
                    </div>

                    <div className="flex items-center gap-4 lg:gap-6">
                        <button 
                            onClick={(e) => { e.stopPropagation(); setShowSettings(!showSettings); }} 
                            className={`transition-colors transform hover:scale-110 hover:rotate-90 ${showSettings ? 'text-blue-400' : 'text-white'}`}
                        >
                            <Settings className="w-5 h-5" />
                        </button>

                        <button onClick={toggleFullscreen} className="text-white hover:text-blue-400 transition-colors transform hover:scale-110">
                            {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </div>

            <style jsx global>{`
        @keyframes float {
          0% { transform: translate(5%, 5%); }
          25% { transform: translate(75%, 35%); }
          50% { transform: translate(40%, 80%); }
          75% { transform: translate(10%, 40%); }
          100% { transform: translate(80%, 15%); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float {
          animation: float 25s linear infinite alternate;
          position: absolute;
          top: 0; left: 0;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.2s ease-out forwards;
        }
      `}</style>
        </div>
    );
}
