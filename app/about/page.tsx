import type { Metadata } from "next";
import { AboutPage } from "@/components/AboutPage";

export const metadata: Metadata = {
  title: "About · Vishal Varma",
  description:
    "Product Manager for AI products & platforms — Barcelona. Path from Hyderabad through France to legal and language AI at TransPerfect.",
};

export default function Page() {
  return <AboutPage />;
}
