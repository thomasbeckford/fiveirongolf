import { DollarSign, Percent, Building } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Location } from '@/payload/generated-types';

export function MembershipSection({ location }: { location: Location }) {
  const { GeneralSchema, MembershipSchema } = location;

  return (
    <>
      {/* Gift Card Banner */}
      {MembershipSchema?.giftCard && (
        <section className="bg-primary py-4">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <h2 className="text-primary-foreground font-bold text-lg sm:text-xl text-center sm:text-left tracking-wide">
                {MembershipSchema?.giftCard?.title}
              </h2>
              <Button asChild className="bg-background hover:bg-secondary text-foreground font-semibold">
                <Link href={MembershipSchema?.giftCard?.url || ''}>{MembershipSchema?.giftCard?.buttonText}</Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Main Membership Section */}
      <section
        className="py-16 lg:py-24 relative bg-cover bg-center"
        style={{
          backgroundImage: `url(${MembershipSchema?.backgroundImage})`
        }}
      >
        <div className="absolute inset-0 bg-background/80"></div>

        <div className="relative z-10 container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-7xl mx-auto items-center">
            {/* Left Side - Content */}
            <div className="space-y-8 text-foreground">
              <div className="space-y-6">
                <h2 className="text-4xl lg:text-6xl font-black uppercase leading-tight tracking-wide">
                  <span className="text-primary">{MembershipSchema?.title?.split(' ')[0]}</span>{' '}
                  <span className="text-primary">{MembershipSchema?.title?.split(' ')[1]}</span>{' '}
                  <span className="text-foreground">{MembershipSchema?.title?.split(' ').slice(2).join(' ')}</span>
                </h2>

                <h3 className="text-2xl lg:text-3xl font-bold uppercase text-foreground tracking-wide">
                  {MembershipSchema?.subtitle}
                </h3>
              </div>

              <p className="text-lg leading-relaxed text-muted-foreground max-w-lg">{MembershipSchema?.description}</p>

              {/* Pricing */}
              <div className="space-y-2">
                <div className="text-3xl lg:text-4xl font-bold text-foreground">
                  {MembershipSchema?.pricing?.monthlyPrice}
                </div>
                <div className="text-lg text-muted-foreground">{MembershipSchema?.pricing?.terms}</div>
              </div>

              {/* Benefits */}
              <div className="space-y-6">
                {MembershipSchema?.benefits?.map((benefit, index) => {
                  const icons = [DollarSign, Percent, Building];
                  const IconComponent = icons[index % icons.length];

                  return (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-foreground mb-2">{benefit.title}</h4>
                        <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Side - Form */}
            <Card className="bg-card/95 backdrop-blur-sm border-border">
              <CardContent className="p-8 lg:p-10">
                <form className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      type="text"
                      placeholder="First Name"
                      className="bg-input border-border focus:ring-primary focus:border-primary"
                      required
                    />
                    <Input
                      type="text"
                      placeholder="Last Name"
                      className="bg-input border-border focus:ring-primary focus:border-primary"
                      required
                    />
                  </div>

                  <Input
                    type="email"
                    placeholder="Email"
                    className="bg-input border-border focus:ring-primary focus:border-primary"
                    required
                  />

                  <Input
                    type="tel"
                    placeholder="Phone"
                    className="bg-input border-border focus:ring-primary focus:border-primary"
                    required
                  />

                  {/* Privacy Policy */}
                  <div className="text-sm text-muted-foreground leading-relaxed">
                    {MembershipSchema?.form?.privacyText}
                  </div>

                  {/* reCAPTCHA placeholder */}
                  <div className="bg-muted border border-border rounded-md p-4 flex items-center justify-center h-20">
                    <span className="text-muted-foreground">reCAPTCHA</span>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 px-8 text-lg h-auto"
                  >
                    {MembershipSchema?.form?.submitText || 'SUBMIT'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
