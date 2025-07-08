import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MapPin, Users, Trophy, Tag, GraduationCap, Home, ArrowRight, Target } from 'lucide-react';

export default function NotFound() {
  const quickLinks = [
    {
      title: 'SIM RENTALS',
      description: 'Book your simulator time',
      icon: <Target className="w-6 h-6" />,
      href: '/sim-rentals',
      color: 'from-lime-400 to-lime-500'
    },
    {
      title: 'INSTRUCTION',
      description: 'Learn from the pros',
      icon: <GraduationCap className="w-6 h-6" />,
      href: '/instructors',
      color: 'from-blue-400 to-cyan-500'
    },
    {
      title: 'HOST A PARTY',
      description: 'Corporate & private events',
      icon: <Users className="w-6 h-6" />,
      href: '/events',
      color: 'from-purple-400 to-pink-500'
    },
    {
      title: 'LEAGUE PLAY',
      description: 'Join competitive leagues',
      icon: <Trophy className="w-6 h-6" />,
      href: '/leagues',
      color: 'from-orange-400 to-red-500'
    },
    {
      title: 'MEMBERSHIP',
      description: 'Exclusive member benefits',
      icon: <MapPin className="w-6 h-6" />,
      href: '/membership',
      color: 'from-indigo-400 to-purple-500'
    },
    {
      title: 'PROMOTIONS',
      description: 'Special offers & deals',
      icon: <Tag className="w-6 h-6" />,
      href: '/promotions',
      color: 'from-yellow-400 to-orange-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 border-2 border-primary rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 border border-primary rounded-full animate-bounce"></div>
        <div className="absolute bottom-32 left-32 w-16 h-16 bg-primary rounded-full animate-ping"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 border border-primary rounded-full animate-pulse"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          {/* 404 Large Text */}
          <div className="mb-8">
            <span className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-lime-500 drop-shadow-2xl">
              404
            </span>
          </div>

          {/* Golf-themed Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-wide">Out of Bounds!</h1>
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <p className="text-xl md:text-2xl text-primary font-semibold mb-2 tracking-wider">PAGE NOT FOUND</p>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
              Looks like your shot went wide! The page you are looking for is no longer available. Choose one of the
              options below to get back on course.
            </p>
          </div>

          {/* Home Button */}
          <Link href="/">
            <Button className="mb-12 bg-gradient-to-r from-primary to-lime-500 hover:from-lime-500 hover:to-lime-600 text-black font-bold px-8 py-4 text-lg rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-lime-400/25">
              <Home className="w-5 h-5 mr-2" />
              Back to Home
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Quick Links Grid */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">Explore What We Have to Offer</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickLinks.map((link) => (
              <Link key={link.title} href={link.href}>
                <div className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-lime-400/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-lime-400/10 cursor-pointer overflow-hidden">
                  {/* Gradient Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${link.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`}
                  ></div>

                  {/* Content */}
                  <div className="relative z-10">
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${link.color} mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <div className="text-white">{link.icon}</div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300">
                      {link.title}
                    </h3>

                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      {link.description}
                    </p>

                    <div className="mt-4 flex items-center text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
                      <span className="text-sm font-medium">Learn More</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Need Help Finding Something?</h3>
            <p className="text-gray-300 mb-6">
              Our team is here to help you get back on track. Contact us for assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-black transition-all duration-300"
              >
                Contact Support
              </Button>
              <Link href="/locations" passHref>
                <Button
                  variant="outline"
                  className="border-gray-500 text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-300"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Find Locations
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
