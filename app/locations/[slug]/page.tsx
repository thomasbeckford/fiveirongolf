import { getLocationInfo } from "@/server/getLocationInfo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MapPin,
  Phone,
  Clock,
  Calendar,
  Users,
  Trophy,
  Utensils,
  Gamepad2,
  Navigation,
  Star,
} from "lucide-react";
import { RotatingTextCircle } from "@/components/rotating-text-circle";

export default async function LocationsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const locationInfo = await getLocationInfo({ slug });

  const hasMultipleSports = locationInfo.experiences.length > 1;
  const hasFoodOrdering = locationInfo.foodOrderAvailability === "ALL";
  const isClosed = locationInfo.name.includes("CLOSED");

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/20 via-background to-card py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Location Info */}
            <div className="space-y-6">
              <div className="space-y-4">
                {isClosed && (
                  <Badge variant="destructive" className="text-sm">
                    Currently Closed for Renovations
                  </Badge>
                )}

                <h1 className="text-4xl lg:text-6xl font-bold">
                  Five Iron Golf
                </h1>

                <h2 className="text-2xl lg:text-3xl text-primary font-semibold">
                  {locationInfo.name}
                </h2>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-5 h-5" />
                  <span>Premium Indoor Golf Experience</span>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <a
                    href={`tel:${locationInfo.telephone}`}
                    className="text-lg hover:text-primary transition-colors"
                  >
                    {locationInfo.telephone}
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="text-lg">
                    {locationInfo.timezone
                      .replace("America/", "")
                      .replace("_", " ")}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Now
                </Button>
                <Button variant="outline" size="lg">
                  <Navigation className="w-5 h-5 mr-2" />
                  Get Directions
                </Button>
              </div>
            </div>

            {/* Rotating Circle */}
            <div className="flex justify-center lg:justify-end">
              <RotatingTextCircle
                text={`${locationInfo.name.toUpperCase()} • INDOOR GOLF • PREMIUM EXPERIENCE • `}
                size={400}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Experiences */}
            <Card className="border-primary/20 hover:border-primary/40 transition-colors">
              <CardHeader className="text-center">
                <Trophy className="w-8 h-8 text-primary mx-auto mb-2" />
                <CardTitle>Experiences</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-2">
                {locationInfo.experiences.map((experience) => (
                  <Badge key={experience} variant="secondary" className="mr-2">
                    {experience}
                  </Badge>
                ))}
                {hasMultipleSports && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Multiple sports available
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Membership Benefits */}
            <Card className="border-primary/20 hover:border-primary/40 transition-colors">
              <CardHeader className="text-center">
                <Star className="w-8 h-8 text-primary mx-auto mb-2" />
                <CardTitle>Membership</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {locationInfo.membershipConfig.freeMembershipMinutes}
                </div>
                <p className="text-sm text-muted-foreground">
                  Free minutes monthly
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Plus exclusive member benefits
                </p>
              </CardContent>
            </Card>

            {/* Food & Beverage */}
            <Card className="border-primary/20 hover:border-primary/40 transition-colors">
              <CardHeader className="text-center">
                <Utensils className="w-8 h-8 text-primary mx-auto mb-2" />
                <CardTitle>Food & Drinks</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                {hasFoodOrdering ? (
                  <div>
                    <Badge className="bg-primary/10 text-primary">
                      Available
                    </Badge>
                    <p className="text-sm text-muted-foreground mt-2">
                      Full menu & bar service
                    </p>
                  </div>
                ) : (
                  <div>
                    <Badge variant="secondary">Limited</Badge>
                    <p className="text-sm text-muted-foreground mt-2">
                      Beverages available
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Events */}
            <Card className="border-primary/20 hover:border-primary/40 transition-colors">
              <CardHeader className="text-center">
                <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                <CardTitle>Private Events</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <Badge className="bg-primary/10 text-primary">Available</Badge>
                <p className="text-sm text-muted-foreground mt-2">
                  Parties & corporate events
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Location Details */}
      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Why Choose {locationInfo.name}?
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gamepad2 className="w-5 h-5 text-primary" />
                    State-of-the-Art Technology
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Experience golf like never before with our premium TrackMan
                    simulators, featuring over 300 world-class golf courses
                    including Pebble Beach and St. Andrews.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Perfect for Groups
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Each simulator accommodates up to 6 people. Perfect for date
                    nights, family outings, corporate events, and bachelor
                    parties.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-primary" />
                    Professional Instruction
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Improve your game with lessons from PGA professionals.
                    Advanced swing analysis and personalized coaching available.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-primary" />
                    Premium Experience
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Climate-controlled environment, premium clubs available, and
                    a full bar with craft cocktails and delicious food menu.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Tee Off?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Book your simulator today and experience the future of golf at{" "}
            {locationInfo.name}.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              <Calendar className="w-5 h-5 mr-2" />
              Book Your Visit
            </Button>
            <Button variant="outline" size="lg">
              <Phone className="w-5 h-5 mr-2" />
              Call {locationInfo.telephone}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
