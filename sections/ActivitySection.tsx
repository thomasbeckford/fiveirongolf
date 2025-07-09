import Link from 'next/link';
import { Location } from '@/payload/generated-types';

export function ActivitySection({ location }: { location: Location }) {
  const { ActivitySchema } = location;
  const serviceStyles = [
    {
      titleGradient: 'from-cyan-400 to-blue-500',
      buttonColor: 'bg-cyan-400 hover:bg-cyan-500 text-black',
      buttonIcon: '🏌️'
    },
    {
      titleGradient: 'from-orange-400 to-red-500',
      buttonColor: 'bg-orange-400 hover:bg-orange-500 text-black',
      buttonIcon: '♥️'
    },
    {
      titleGradient: 'from-green-400 to-lime-500',
      buttonColor: 'bg-green-400 hover:bg-green-500 text-black',
      buttonIcon: '🏌️'
    },
    {
      titleGradient: 'from-pink-400 to-purple-500',
      buttonColor: 'bg-pink-400 hover:bg-pink-500 text-black',
      buttonIcon: '🎉'
    },
    {
      titleGradient: 'from-yellow-400 to-green-500',
      buttonColor: 'bg-yellow-400 hover:bg-yellow-500 text-black',
      buttonIcon: '🎳'
    }
  ];

  return (
    <section className="py-16 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="space-y-16">
          {ActivitySchema?.services?.map((service, index) => {
            const style = serviceStyles[index] || serviceStyles[0];

            return (
              <div key={index} className={`rounded-2xl p-8 lg:p-12`}>
                <div className="flex flex-col lg:flex-row lg:items-center gap-8">
                  {/* Left Side - Title and Pricing */}
                  <div className="lg:w-1/3 space-y-6">
                    <div>
                      <h2
                        className={`text-6xl lg:text-7xl xl:text-8xl font-black uppercase leading-none bg-gradient-to-r ${style.titleGradient} bg-clip-text text-transparent`}
                      >
                        {service.title}
                      </h2>
                      {service.subtitle && (
                        <h3
                          className={`text-4xl lg:text-5xl font-black uppercase mt-2 bg-gradient-to-r ${style.titleGradient} bg-clip-text text-transparent`}
                        >
                          {service.subtitle}
                        </h3>
                      )}
                    </div>

                    {service.pricing && (
                      <div className="space-y-2">
                        <div className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                          {service.pricingLabel || 'Pricing'}
                        </div>
                        <div className="space-y-1">
                          {service.pricing.map((price, i) => (
                            <div key={i} className="text-sm text-gray-300">
                              {price.item}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Side - Description and CTA */}
                  <div className="lg:w-2/3 space-y-6">
                    <div className="space-y-4">
                      <p className="text-lg leading-relaxed text-gray-300">{service.description}</p>

                      {service.highlights && (
                        <div className="space-y-2">
                          {service.highlights.map((highlight, i) => (
                            <p key={i} className="text-base">
                              <span className="font-semibold">{highlight.label}:</span>{' '}
                              <span className="text-gray-300">{highlight.text}</span>
                            </p>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link
                        href={service.primaryCta?.url || ''}
                        className={`${style.buttonColor} px-8 py-4 rounded-lg font-bold text-lg inline-flex items-center justify-center gap-2 transition-colors`}
                      >
                        {service.primaryCta?.text} {style.buttonIcon}
                      </Link>

                      {service.secondaryCta && (
                        <Link
                          href={service.secondaryCta?.url || ''}
                          className="border-2 border-gray-600 hover:border-gray-400 text-white px-8 py-4 rounded-lg font-bold text-lg inline-flex items-center justify-center transition-colors"
                        >
                          {service.secondaryCta?.text}
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
