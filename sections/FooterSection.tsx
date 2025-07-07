import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Instagram, Twitter, Youtube, Mail, Phone } from 'lucide-react';
import Link from 'next/link';
import { FooterContent } from '@/lib/schemas/sections';

export function FooterSection({ content }: { content: FooterContent }) {
  return (
    <footer className="bg-background">
      {/* Newsletter Section */}
      <section className="bg-primary py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-primary-foreground uppercase tracking-wide">
                {content.newsletter?.title}
              </h2>
            </div>

            <form className="flex flex-col lg:flex-row gap-4 max-w-6xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 flex-1">
                <Input
                  type="text"
                  placeholder="First Name"
                  className="bg-background text-foreground border-border"
                  required
                />
                <Input
                  type="text"
                  placeholder="Last Name"
                  className="bg-background text-foreground border-border"
                  required
                />
                <Select>
                  <SelectTrigger className="bg-background text-foreground border-border">
                    <SelectValue placeholder="Select Location" />
                  </SelectTrigger>
                  <SelectContent>
                    {content.newsletter?.locations.map((location) => (
                      <SelectItem key={location.value} value={location.value}>
                        {location.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  type="email"
                  placeholder="Email"
                  className="bg-background text-foreground border-border"
                  required
                />
                <Input
                  type="tel"
                  placeholder="Phone"
                  className="bg-background text-foreground border-border"
                  required
                />
              </div>

              <Button
                type="submit"
                className="bg-blue-900 hover:bg-blue-800 text-white font-bold px-8 py-2 h-auto lg:w-auto"
              >
                SUBMIT
              </Button>
            </form>

            <div className="text-center mt-6">
              <p className="text-sm text-primary-foreground/80 max-w-4xl mx-auto leading-relaxed">
                {content.newsletter?.disclaimer}
              </p>
            </div>
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

                <p className="text-muted-foreground leading-relaxed">{content.brand?.tagline}</p>

                <div className="flex space-x-4">
                  {content.brand?.socialMedia.map((social) => {
                    const IconComponent =
                      {
                        instagram: Instagram,
                        twitter: Twitter,
                        youtube: Youtube
                      }[social.platform] || Instagram;

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
                  {content.quickLinks?.map((link) => (
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
                  {content.moreLinks?.map((link) => (
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
                  <Button
                    asChild
                    variant="outline"
                    className="w-full justify-start border-border text-foreground hover:bg-primary hover:text-primary-foreground"
                  >
                    <Link href={`mailto:${content.contact?.email}`}>
                      <Mail className="w-4 h-4 mr-2" />
                      EMAIL
                    </Link>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    className="w-full justify-start border-border text-foreground hover:bg-primary hover:text-primary-foreground"
                  >
                    <Link href={`tel:${content.contact?.phone}`}>
                      <Phone className="w-4 h-4 mr-2" />
                      CALL
                    </Link>
                  </Button>
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
            <p className="text-muted-foreground text-sm">{content.copyright}</p>
          </div>
        </div>
      </section>
    </footer>
  );
}
