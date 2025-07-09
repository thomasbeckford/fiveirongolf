import { Globe, ArrowRight } from "lucide-react";
import React from "react";
import { regionDetails, type Region } from "@/data/regions";

export const metadata = {
  title: "Select FiveIron Region",
  description:
    "Choose your region to see FiveIron locations, pricing, and experiences available in your area",
};

// Tipos para las claves de las regiones
type RegionKey = keyof typeof regionDetails;

function RegionCard({
  regionKey,
  region,
}: {
  regionKey: RegionKey;
  region: Region;
}) {
  const regionIcons: Record<RegionKey, string> = {
    "NORTH AMERICA": "🌎",
    "SOUTH AMERICA": "🌎",
    EUROPE: "🌍",
    "MIDDLE EAST": "🌍",
    ASIA: "🌏",
    OCEANIA: "🌏",
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300 border border-white/20">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white uppercase tracking-wider drop-shadow-lg">
          {region.title}
        </h3>
        <span className="text-3xl">{regionIcons[regionKey]}</span>
      </div>

      <div className="space-y-3">
        {region.countries.map((country) => (
          <a
            key={country.code}
            href={`/${country.slug}`}
            className="flex items-center justify-between p-3 bg-white/10 rounded-lg hover:bg-emerald-500 transition-all duration-200 group backdrop-blur-sm"
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{country.flag}</span>
              <span className="text-white font-medium group-hover:text-white">
                {country.name}
              </span>
            </div>
            <ArrowRight className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
          </a>
        ))}
      </div>
    </div>
  );
}

export default function SelectFiveIronRegionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1)_0%,transparent_50%)]"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="relative flex flex-col items-center justify-center pt-16 pb-12">
        <div className="mb-8">
          <Globe className="w-16 h-16 text-emerald-400 mx-auto mb-4 drop-shadow-lg" />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-white text-center uppercase tracking-wider mb-4 drop-shadow-lg">
          Select FiveIron Region
        </h1>

        <p className="text-xl text-white/80 text-center max-w-2xl drop-shadow-lg">
          Choose your region to see FiveIron locations, pricing, and experiences
          available in your area
        </p>
      </div>

      {/* Regions Grid */}
      <div className="relative max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(regionDetails).map(([regionKey, region]) => (
            <RegionCard
              key={regionKey}
              regionKey={regionKey as RegionKey}
              region={region}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="relative text-center py-8 border-t border-white/20">
        <p className="text-white/60 text-sm">
          ©2025 FIVEIRON GOLF INTERNATIONAL, INC. ALL RIGHTS RESERVED.
        </p>
      </div>
    </div>
  );
}
