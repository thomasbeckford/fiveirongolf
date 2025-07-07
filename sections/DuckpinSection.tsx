'use client';

import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Image from 'next/image';
import Link from 'next/link';
import { DuckpinContent } from '@/lib/schemas/sections';

export function DuckpinSection({ content }: { content: DuckpinContent }) {
  return (
    <section
      className="py-16 lg:py-24 relative bg-cover bg-center"
      style={{
        backgroundImage: `url(${content.backgroundImage})`
      }}
    >
      <div className="absolute inset-0 bg-blue-900/80"></div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Icons Row */}
          <div className="flex justify-center space-x-8 lg:space-x-16 mb-12">
            {content.icons?.map((icon, index) => (
              <div key={index} className="w-16 h-16 lg:w-20 lg:h-20">
                <Image
                  src={icon.url}
                  alt={icon.alt}
                  width={20}
                  height={20}
                  className="w-full h-full object-contain"
                  style={{
                    filter: 'brightness(0) invert(1) sepia(1) saturate(10000%) hue-rotate(60deg)'
                  }}
                />
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left Side - Content */}
            <div className="space-y-8 text-foreground">
              <div className="space-y-6">
                <h2 className="text-3xl lg:text-4xl font-bold uppercase tracking-wide text-foreground">
                  {content.preTitle}
                </h2>

                <h3 className="text-5xl lg:text-7xl font-black uppercase leading-tight">
                  <span className="text-primary">{content.title}</span>
                </h3>
              </div>

              <div className="space-y-6">
                <p className="text-lg leading-relaxed text-muted-foreground">{content.description}</p>

                <p className="text-lg leading-relaxed text-muted-foreground">{content.callToAction}</p>
              </div>

              <Button
                asChild
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-4 text-lg h-auto"
              >
                <Link href={content.bookingUrl || ''}>{content.buttonText || ''}</Link>
              </Button>
            </div>

            {/* Right Side - FAQ Accordion */}
            <div className="w-full">
              <Accordion type="single" collapsible className="w-full space-y-4">
                {content.faqs?.map((faq) => (
                  <AccordionItem
                    key={faq.id}
                    value={faq.id}
                    className="bg-card/90 backdrop-blur-sm border-2 border-primary/50 rounded-lg px-6 data-[state=open]:border-primary"
                  >
                    <AccordionTrigger className="text-foreground font-bold uppercase tracking-wide text-sm lg:text-base hover:no-underline py-6 [&[data-state=open]>svg]:rotate-180">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="pb-6">
                      <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
