import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Instagram, Twitter, Youtube, Mail, Phone, Facebook, Linkedin } from 'lucide-react';
import Link from 'next/link';
import { Location } from '@/payload/generated-types';
import { SubscribeForm } from '@/components/subscribe-form';

export function FooterSection({ location }: { location: Location }) {
  const { FooterSchema } = location;

  // Mapa completo de iconos para redes sociales
  const socialIcons = {
    instagram: Instagram,
    twitter: Twitter,
    facebook: Facebook,
    youtube: Youtube,
    linkedin: Linkedin
  } as const;

  return (
    <footer className="bg-background">
      {/* Newsletter Section */}
      <section className="bg-primary py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-primary-foreground uppercase tracking-wide">
                {FooterSchema?.newsletter?.title}
              </h2>
            </div>

            <SubscribeForm />
          </div>
        </div>
      </section>

      {/* Main Footer */}
      <section className="bg-background py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-12 lg:gap-16">
              {/* Brand Section */}
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-foreground rounded-full flex items-center justify-center">
                    <span className="text-background font-black text-lg">5i</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground uppercase tracking-wide">FIVE IRON GOLF</h3>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed">{FooterSchema?.brand?.tagline}</p>

                <div className="flex space-x-4">
                  {FooterSchema?.brand?.socialMedia?.map((social) => {
                    // Usar el ícono correspondiente o Instagram como fallback
                    const IconComponent = socialIcons[social.platform as keyof typeof socialIcons] || Instagram;

                    return (
                      <Link
                        key={social.platform}
                        href={social.url}
                        className="w-10 h-10 bg-muted hover:bg-primary rounded-lg flex items-center justify-center transition-colors group"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <IconComponent className="w-5 h-5 text-muted-foreground group-hover:text-primary-foreground" />
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Quick Links */}
              <div className="space-y-6">
                <h4 className="text-lg font-bold text-foreground uppercase tracking-wide">Quick Links</h4>
                <div className="space-y-3">
                  {FooterSchema?.quickLinks?.map((link) => (
                    <Link
                      key={link.label}
                      href={link.url}
                      className="block text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* More Links */}
              <div className="space-y-6">
                <h4 className="text-lg font-bold text-foreground uppercase tracking-wide">More</h4>
                <div className="space-y-3">
                  {FooterSchema?.moreLinks?.map((link) => (
                    <Link
                      key={link.label}
                      href={link.url}
                      className="block text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div className="space-y-6">
                <h4 className="text-lg font-bold text-foreground uppercase tracking-wide">HIT US UP</h4>
                <div className="space-y-4">
                  {FooterSchema?.contact?.email && (
                    <Button
                      asChild
                      variant="outline"
                      className="w-full justify-start border-border text-foreground hover:bg-primary hover:text-primary-foreground"
                    >
                      <Link href={`mailto:${FooterSchema.contact.email}`}>
                        <Mail className="w-4 h-4 mr-2" />
                        EMAIL
                      </Link>
                    </Button>
                  )}

                  {FooterSchema?.contact?.phone && (
                    <Button
                      asChild
                      variant="outline"
                      className="w-full justify-start border-border text-foreground hover:bg-primary hover:text-primary-foreground"
                    >
                      <Link href={`tel:${FooterSchema.contact.phone}`}>
                        <Phone className="w-4 h-4 mr-2" />
                        CALL
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Copyright */}
      <section className="bg-muted py-6">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-muted-foreground text-sm">{FooterSchema?.copyright}</p>
          </div>
        </div>
      </section>
    </footer>
  );
}
