export default function Loading() {
    return (
        <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center relative overflow-hidden z-50">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-500/20 rounded-full blur-[100px] animate-pulse"></div>
            </div>

            {/* Premium Loader */}
            <div className="relative z-10 flex flex-col items-center">
                <div className="relative w-24 h-24 mb-8">
                    {/* Outer Ring */}
                    <div className="absolute inset-0 rounded-full border-4 border-slate-800"></div>
                    {/* Inner Rotating Ring */}
                    <div className="absolute inset-0 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin"></div>
                    {/* Center Dot */}
                    <div className="absolute inset-0 m-auto w-4 h-4 bg-blue-500 rounded-full animate-ping"></div>
                </div>
                
                <h2 className="text-xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500 animate-pulse">
                    LOADING
                </h2>
                <div className="mt-4 flex gap-1">
                    <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"></div>
                </div>
            </div>
        </div>
    );
}
