import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Test() {
  return (
    <div className="flex justify-center gap-4 py-4">
      <Button variant="outline">
        <Link href="/heros/HighImpactHero">High Impact Hero</Link>
      </Button>
      <Button variant="outline">
        <Link href="/heros/MediumImpactHero">Medium Impact Hero</Link>
      </Button>
    </div>
  );
}
