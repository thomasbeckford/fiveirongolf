import React from 'react';

export default function LoadingLocations() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-lime-400/5 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="text-center z-10 px-6">
        {/* Simple golf ball animation */}
        <div className="relative mb-12">
          <div
            className="w-6 h-6 bg-white rounded-full mx-auto animate-bounce shadow-lg"
            style={{ animationDuration: '1.5s' }}
          ></div>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-lime-400 to-transparent mx-auto mt-2 animate-pulse"></div>
        </div>

        {/* Simple text */}
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Finding locations</h1>

        <p className="text-gray-400 mb-12 text-lg">Just a moment...</p>

        {/* Clean progress bar */}
        <div className="w-64 h-1 bg-gray-800 rounded-full mx-auto mb-8 overflow-hidden">
          <div className="h-full bg-lime-400 rounded-full animate-pulse"></div>
        </div>

        {/* Simple dots */}
        <div className="flex justify-center space-x-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-lime-400 rounded-full animate-pulse"
              style={{
                animationDelay: `${i * 0.3}s`,
                animationDuration: '1.5s'
              }}
            ></div>
          ))}
        </div>

        {/* Brand */}
        <div className="mt-16 text-lime-400 font-medium text-sm tracking-widest">FIVE IRON GOLF</div>
      </div>
    </div>
  );
}
