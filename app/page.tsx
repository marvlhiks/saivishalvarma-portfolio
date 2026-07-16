import { LivingBackground } from "@/components/LivingBackground";
import { SiteNav } from "@/components/SiteNav";
import { TitleCard } from "@/components/TitleCard";
import { ResultsStrip } from "@/components/ResultsStrip";
import { MyWork } from "@/components/MyWork";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <>
      <LivingBackground />
      <SiteNav />
      <main className="relative z-10">
        <TitleCard />
        <ResultsStrip />
        <MyWork />
        <Contact />
      </main>
    </>
  );
}
