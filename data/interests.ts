import type { ArtKey } from "@/components/InterestArt";

/** House style: no long dashes in visible copy. */

export type Pick = {
  key: ArtKey;
  title: string;
  subtitle: string;
  note: string;
};

export const games: Pick[] = [
  {
    key: "rdr2",
    title: "Red Dead Redemption 2",
    subtitle: "Rockstar Games · 2018",
    note: "The one that proved a game world can be worth walking through slowly.",
  },
  {
    key: "clairobscur",
    title: "Clair Obscur: Expedition 33",
    subtitle: "Sandfall Interactive · 2025",
    note: "A first game from a small studio that swung enormously and connected.",
  },
  {
    key: "skyrim",
    title: "The Elder Scrolls V: Skyrim",
    subtitle: "Bethesda · 2011",
    note: "Still installed. Cold, vast, and impossible to finish properly.",
  },
  {
    key: "assassins",
    title: "Assassin's Creed",
    subtitle: "Ubisoft · Series",
    note: "Climbing real cities in the wrong century, one rooftop at a time.",
  },
];

export const anime: Pick[] = [
  {
    key: "onepiece",
    title: "One Piece",
    subtitle: "Eiichiro Oda · Serialised since 1997",
    note: "That is the whole list. One story, followed properly, beats a queue of things half watched.",
  },
];

/** Kept plain on purpose: true, but not worth a panel. */
export const quietInterests = ["Motorcycles", "Travel"];
