import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Calendar,
  MapPin,
  Users,
  Trophy,
  Zap,
  Smartphone,
  MailIcon,
  ArrowRightIcon,
} from "lucide-react";
import { NeonButton } from "@/components/ui/neon-button";
import { SubscribeForm } from "@/components/subscribe-form";
import ScrollMarquee from "@/components/scroll-marquee";
import { RotatingTextCircle } from "@/components/rotating-text-circle";
import { NearestLocations } from "@/components/nearest-locations";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Five Iron Golf - Next.js Demo",
    description:
      "Experience premium indoor golf with state-of-the-art simulators. Built with Next.js for superior performance.",
    openGraph: {
      title: "Five Iron Golf - Next.js Demo",
      description:
        "Experience premium indoor golf with state-of-the-art simulators.",
    },
  };
}

export default async function Home() {
  try {
    return (
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-background via-card to-muted py-20 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,theme(colors.primary/10),transparent_50%)]" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
                <Zap className="w-3 h-3 mr-1" />
                Next.js Powered
              </Badge>

              <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-primary via-foreground to-primary bg-clip-text text-transparent leading-tight">
                Five Iron Golf
              </h1>

              <p className="text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Experience premium indoor golf with state-of-the-art simulators.
                <span className="text-primary font-semibold">
                  {" "}
                  Built with React and Next.js
                </span>{" "}
                by{" "}
                <span className="text-primary font-semibold">
                  Five Iron Golf
                </span>
              </p>

              <NearestLocations limit={5} />

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Your Simulator
                </Button>
                <Button variant="outline" size="lg">
                  <MapPin className="w-5 h-5 mr-2" />
                  Find Locations
                </Button>
              </div>
            </div>
          </div>
        </section>
        {/* Features Grid */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Hello World im a Next.js app
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Modern technology for a premium golf experience
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-primary/20 hover:border-primary/40 transition-colors">
                <CardHeader>
                  <Zap className="w-8 h-8 text-primary mb-2" />
                  <CardTitle>Lightning Fast</CardTitle>
                  <CardDescription>
                    Next.js delivers 3x faster loading times than WordPress
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-primary/20 hover:border-primary/40 transition-colors">
                <CardHeader>
                  <Smartphone className="w-8 h-8 text-primary mb-2" />
                  <CardTitle>Mobile First</CardTitle>
                  <CardDescription>
                    Perfect responsive design for all devices and screen sizes
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-primary/20 hover:border-primary/40 transition-colors">
                <CardHeader>
                  <Trophy className="w-8 h-8 text-primary mb-2" />
                  <CardTitle>Better SEO</CardTitle>
                  <CardDescription>
                    Superior search engine optimization and Core Web Vitals
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>
        <ScrollMarquee />
        <div className="flex justify-center py-20">
          <RotatingTextCircle size={500} />
        </div>
        {/* Component Showcase */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                Design System Components
              </h2>

              {/* Typography */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Typography & Headings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <h1 className="text-4xl font-bold">
                    Heading 1 - Book Your Visit
                  </h1>
                  <h2 className="text-3xl font-bold">
                    Heading 2 - Find Locations
                  </h2>
                  <h3 className="text-2xl font-bold">
                    Heading 3 - Membership Benefits
                  </h3>
                  <p className="text-lg text-muted-foreground">
                    Body text with perfect readability and consistent spacing
                    throughout the application.
                  </p>
                </CardContent>
              </Card>

              {/* Subscribe Form Section */}
              <Card className=" bg-primary py-16 text-primary-foreground">
                <CardHeader className="text-3xl lg:text-4xl font-bold mb-6">
                  SUBSCRIBE TO STAY IN THE 5i LOOP
                </CardHeader>
                <CardContent>
                  <SubscribeForm />
                </CardContent>
              </Card>

              {/* Buttons */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Button Variants</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4">
                    <Button>Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="link">Link</Button>

                    <Button className="group" variant="secondary">
                      <MailIcon
                        className="-ms-1 opacity-60"
                        size={16}
                        aria-hidden="true"
                      />
                      Email
                      <ArrowRightIcon
                        className="-me-1 opacity-60 transition-transform group-hover:translate-x-0.5"
                        size={16}
                        aria-hidden="true"
                      />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Neon Buttons */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Neon Button Variants</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4">
                    <NeonButton variant="pink">Book a Sim</NeonButton>
                    <NeonButton variant="blue">Take a Lesson</NeonButton>
                    <NeonButton variant="green">Plan a Party</NeonButton>
                    <NeonButton variant="purple">Join a League</NeonButton>
                    <NeonButton variant="blue">Membership</NeonButton>
                    <NeonButton variant="green">Promotions</NeonButton>
                  </div>
                </CardContent>
              </Card>

              {/* Selects & Forms */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Form Components</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Choose Location
                      </label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="nyc-fidi">
                            NYC - Financial District
                          </SelectItem>
                          <SelectItem value="nyc-herald">
                            NYC - Herald Square
                          </SelectItem>
                          <SelectItem value="chicago">
                            Chicago - River North
                          </SelectItem>
                          <SelectItem value="boston">
                            Boston - Back Bay
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Membership Type
                      </label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select membership" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="basic">
                            Basic Membership
                          </SelectItem>
                          <SelectItem value="premium">
                            Premium Membership
                          </SelectItem>
                          <SelectItem value="corporate">
                            Corporate Package
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Badges & Status */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Status Indicators</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    <Badge className="bg-primary/10 text-primary">
                      Available Now
                    </Badge>
                    <Badge variant="secondary">Almost Full</Badge>
                    <Badge variant="destructive">Fully Booked</Badge>
                    <Badge variant="outline">Opening Soon</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Location Cards */}
              <Card>
                <CardHeader>
                  <CardTitle>Location Preview Cards</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="border-primary/20">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">
                            NYC - Financial District
                          </CardTitle>
                          <Badge className="bg-primary/10 text-primary">
                            Open
                          </Badge>
                        </div>
                        <CardDescription className="flex items-center text-sm">
                          <MapPin className="w-4 h-4 mr-1" />
                          85 Broad St, New York, NY
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Users className="w-4 h-4 mr-1" />
                            12 Simulators
                          </div>
                          <Button size="sm" variant="outline">
                            Book Now
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-primary/20">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">
                            Chicago - River North
                          </CardTitle>
                          <Badge variant="secondary">Opening Soon</Badge>
                        </div>
                        <CardDescription className="flex items-center text-sm">
                          <MapPin className="w-4 h-4 mr-1" />
                          609 N Dearborn St, Chicago, IL
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Users className="w-4 h-4 mr-1" />
                            16 Simulators
                          </div>
                          <Button size="sm" variant="outline" disabled>
                            Coming Soon
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        {/* CTA Section */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Upgrade to Next.js?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Experience faster loading, better SEO, and a more maintainable
              codebase for Five Iron Golf.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Start Migration
              </Button>
              <Button variant="outline" size="lg">
                View Performance Metrics
              </Button>
            </div>
          </div>
        </section>
      </div>
    );
  } catch (error) {
    console.error("Error loading page:", error);
    notFound();
  }
}
