'use client';

import React from 'react';

export default function LoadingLocationDetail() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-green-400/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-blue-400/10 rounded-full blur-xl animate-pulse delay-300"></div>
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-purple-400/10 rounded-full blur-xl animate-pulse delay-700"></div>
      </div>

      {/* Content skeleton */}
      <div className="relative z-10">
        {/* Header skeleton */}
        <div className="h-96 bg-gradient-to-r from-gray-800/50 to-gray-700/50 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-8 left-8 right-8">
            <div className="h-12 w-64 bg-gray-600/50 rounded-lg mb-4 animate-pulse"></div>
            <div className="h-6 w-96 bg-gray-700/50 rounded-lg mb-2 animate-pulse"></div>
            <div className="h-6 w-80 bg-gray-700/50 rounded-lg animate-pulse"></div>
          </div>
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
        </div>

        {/* Main content skeleton */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - Activities */}
            <div className="lg:col-span-2 space-y-8">
              {/* Section title */}
              <div className="h-8 w-48 bg-gray-700/50 rounded-lg animate-pulse"></div>

              {/* Activity cards */}
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-800/50 rounded-xl p-6 animate-pulse"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="h-6 w-32 bg-gray-600/50 rounded mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-4 w-full bg-gray-700/50 rounded"></div>
                    <div className="h-4 w-5/6 bg-gray-700/50 rounded"></div>
                    <div className="h-4 w-4/6 bg-gray-700/50 rounded"></div>
                  </div>
                  <div className="mt-6 flex space-x-4">
                    <div className="h-10 w-32 bg-green-400/20 rounded-lg"></div>
                    <div className="h-10 w-28 bg-gray-600/20 rounded-lg"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right column - Info */}
            <div className="space-y-8">
              {/* Hours card */}
              <div className="bg-gray-800/50 rounded-xl p-6 animate-pulse">
                <div className="h-6 w-24 bg-gray-600/50 rounded mb-4"></div>
                <div className="space-y-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex justify-between">
                      <div className="h-4 w-20 bg-gray-700/50 rounded"></div>
                      <div className="h-4 w-16 bg-gray-700/50 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact card */}
              <div className="bg-gray-800/50 rounded-xl p-6 animate-pulse">
                <div className="h-6 w-32 bg-gray-600/50 rounded mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 w-full bg-gray-700/50 rounded"></div>
                  <div className="h-4 w-3/4 bg-gray-700/50 rounded"></div>
                  <div className="h-4 w-2/3 bg-gray-700/50 rounded"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom section - Gallery */}
          <div className="mt-16">
            <div className="h-8 w-36 bg-gray-700/50 rounded-lg mb-8 animate-pulse"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-64 bg-gray-800/50 rounded-xl animate-pulse"
                  style={{ animationDelay: `${i * 0.05}s` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Loading indicator */}
      <div className="fixed bottom-8 right-8 bg-gray-800/90 backdrop-blur-sm rounded-full p-4 shadow-2xl">
        <div className="flex items-center space-x-3">
          <div className="relative w-6 h-6">
            <div className="absolute inset-0 border-2 border-green-400/20 rounded-full"></div>
            <div className="absolute inset-0 border-2 border-green-400 rounded-full border-t-transparent animate-spin"></div>
          </div>
          <span className="text-sm text-gray-300 font-medium">Loading location...</span>
        </div>
      </div>

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"></div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
}
