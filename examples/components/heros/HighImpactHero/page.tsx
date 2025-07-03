import { HighImpactHero } from "@/components/heros/HighImpact";
import Image from "next/image";

export default function Test() {
  return (
    <HighImpactHero
      backgroundType="video"
      backgroundSrc="/videos/world.mp4"
      overlayOpacity={0.5}
    >
      <div className="flex flex-col items-center gap-4">
        <Image src="/5i.svg" alt="Logo" width={100} height={100} />
        <h2 className="uppercase text-5xl font-bold">five iron golf</h2>
      </div>
    </HighImpactHero>
  );
}
