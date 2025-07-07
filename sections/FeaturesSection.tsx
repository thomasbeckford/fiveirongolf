import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { FeaturesContent } from '@/lib/schemas/sections';

export function FeaturesSection({ content }: { content: FeaturesContent }) {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-0 border-2 border-border">
            {content.features?.map((feature, index) => (
              <div
                key={feature.id}
                className={`
                  relative p-8 lg:p-12 bg-background hover:bg-card/50 transition-all duration-300 group cursor-pointer
                  ${index < content.features.length - 1 ? 'md:border-r-2 border-border' : ''}
                `}
              >
                {/* Neon Title */}
                <div className="mb-8">
                  <h3
                    className="text-3xl lg:text-4xl font-black uppercase leading-tight"
                    style={{
                      color: feature.neonColor,
                      textShadow: `
                        0 0 5px ${feature.neonColor}40,
                        0 0 10px ${feature.neonColor}40,
                        0 0 15px ${feature.neonColor}40,
                        0 0 20px ${feature.neonColor}40
                      `
                    }}
                  >
                    {feature.title}
                  </h3>
                </div>

                {/* Description */}
                <div className="mb-12">
                  <p className="text-muted-foreground leading-relaxed text-lg">{feature.description}</p>
                </div>

                {/* CTA Link */}
                <div className="flex items-center justify-between group-hover:translate-x-2 transition-transform duration-300">
                  <Link
                    href={feature.ctaUrl}
                    className="text-foreground font-bold uppercase tracking-wider text-lg hover:text-primary transition-colors"
                  >
                    {feature.ctaText}
                  </Link>
                  <ArrowRight className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
                </div>

                {/* Hover Glow Effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at center, ${feature.neonColor}20 0%, transparent 70%)`
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
