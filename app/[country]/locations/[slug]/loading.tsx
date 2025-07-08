'use client';

import React from 'react';

export default function LoadingLocationDetail() {
  return (
    <div className="min-h-screen bg-black">
      {/* Simple header skeleton */}
      <div className="h-80 bg-gray-900 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-8 left-8 right-8">
          <div className="h-8 w-48 bg-gray-700 rounded animate-pulse mb-3"></div>
          <div className="h-4 w-64 bg-gray-800 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Simple content skeleton */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Main content */}
          <div className="lg:col-span-2 space-y-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-900 rounded-lg p-6 animate-pulse"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="h-5 w-32 bg-gray-700 rounded mb-3"></div>
                <div className="space-y-2">
                  <div className="h-3 w-full bg-gray-800 rounded"></div>
                  <div className="h-3 w-4/5 bg-gray-800 rounded"></div>
                  <div className="h-3 w-3/5 bg-gray-800 rounded"></div>
                </div>
                <div className="mt-4 flex space-x-3">
                  <div className="h-8 w-24 bg-lime-400/20 rounded"></div>
                  <div className="h-8 w-20 bg-gray-700 rounded"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Right column - Info */}
          <div className="space-y-6">
            {/* Hours */}
            <div className="bg-gray-900 rounded-lg p-6 animate-pulse">
              <div className="h-5 w-16 bg-gray-700 rounded mb-3"></div>
              <div className="space-y-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex justify-between">
                    <div className="h-3 w-16 bg-gray-800 rounded"></div>
                    <div className="h-3 w-12 bg-gray-800 rounded"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="bg-gray-900 rounded-lg p-6 animate-pulse">
              <div className="h-5 w-20 bg-gray-700 rounded mb-3"></div>
              <div className="space-y-2">
                <div className="h-3 w-full bg-gray-800 rounded"></div>
                <div className="h-3 w-3/4 bg-gray-800 rounded"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Simple gallery skeleton */}
        <div className="mt-12">
          <div className="h-5 w-24 bg-gray-700 rounded animate-pulse mb-6"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-32 bg-gray-900 rounded animate-pulse"
                style={{ animationDelay: `${i * 0.05}s` }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Simple loading indicator */}
      <div className="fixed bottom-6 right-6 bg-gray-900 rounded-full px-4 py-2 shadow-lg">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 border-2 border-lime-400 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm text-gray-300">Loading...</span>
        </div>
      </div>
    </div>
  );
}
