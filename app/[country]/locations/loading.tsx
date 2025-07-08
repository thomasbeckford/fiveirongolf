import React from 'react';

export default function LoadingLocations() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-green-400/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-blue-400/10 rounded-full blur-xl animate-pulse delay-300"></div>
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-purple-400/10 rounded-full blur-xl animate-pulse delay-700"></div>
      </div>

      <div className="text-center z-10 px-6">
        {/* Golf ball animation */}
        <div className="relative mb-8">
          <div className="flex justify-center space-x-2 mb-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-4 h-4 bg-white rounded-full animate-bounce"
                style={{
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '1.4s'
                }}
              ></div>
            ))}
          </div>

          {/* Golf club swing animation */}
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-green-400/20 rounded-full"></div>
            <div className="absolute inset-2 border-2 border-green-400/40 rounded-full animate-spin"></div>
            <div className="absolute inset-4 border border-green-400 rounded-full animate-ping"></div>
            <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-green-400 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
          </div>
        </div>

        {/* Main text */}
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
          Finding Your
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 animate-pulse">
            Perfect Swing
          </span>
        </h1>

        <p className="text-lg text-gray-300 mb-8 max-w-md mx-auto leading-relaxed">Loading locations near you...</p>

        {/* Progress bar */}
        <div className="w-64 h-2 bg-gray-700 rounded-full mx-auto mb-6 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-green-400 to-blue-400 rounded-full animate-pulse"></div>
        </div>

        {/* Loading dots */}
        <div className="flex justify-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-green-400 rounded-full animate-pulse"
              style={{
                animationDelay: `${i * 0.1}s`,
                animationDuration: '1s'
              }}
            ></div>
          ))}
        </div>

        {/* Brand touch */}
        <div className="mt-12 text-sm text-gray-500">Five Iron Golf</div>
      </div>

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"></div>
    </div>
  );
}
