import { MediumImpactHero } from "@/components/heros/MediumImpact";

export default function Test() {
  return (
    <>
      <MediumImpactHero
        backgroundType="image"
        backgroundSrc="https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=2158&q=80"
        overlayOpacity={0.3}
        bottomBarColor="#84cc16"
        bottomBarText="BACHELOR/ETTES • TEAM BUILDING • HAPPY HOURS • BIRTHDAYS"
        height="40vh"
      >
        <p className="text-lg sm:text-xl font-semibold tracking-wide uppercase opacity-90">
          FIVE IRON GOLF
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
          Up Your Crew&apos;s
          <br />
          Pace of Play
        </h1>
      </MediumImpactHero>
    </>
  );
}
