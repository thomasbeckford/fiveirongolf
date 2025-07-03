import { IReviewsSection } from "@/types/location";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import Link from "next/link";

export function ReviewsSection({ data }: { data: IReviewsSection }) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-6 h-6 ${
          index < rating ? "fill-primary text-primary" : "fill-muted text-muted"
        }`}
      />
    ));
  };

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold uppercase tracking-wider text-foreground">
              {data.title}
            </h2>
          </div>

          {/* Reviews Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {data.reviews.map((review, index) => (
              <Card
                key={index}
                className="bg-card border-l-4 border-l-muted hover:border-l-primary transition-colors duration-300 h-full"
              >
                <CardContent className="p-8 flex flex-col h-full">
                  {/* Stars */}
                  <div className="flex justify-start mb-6">
                    {renderStars(review.rating)}
                  </div>

                  {/* Review Text */}
                  <div className="flex-grow mb-6">
                    <p className="text-muted-foreground leading-relaxed text-base">
                      {review.text}
                    </p>
                  </div>

                  {/* Author */}
                  <div className="text-right">
                    <p className="text-foreground font-semibold text-lg">
                      {review.author}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <Button
              asChild
              className="bg-foreground hover:bg-muted text-background font-bold px-12 py-4 text-lg h-auto rounded-lg"
            >
              <Link href={data.ctaUrl}>{data.ctaText}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
