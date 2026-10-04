import { HomeHero } from "@/components/home/HomeHero";
import { Statement } from "@/components/home/Statement";
import { ServicesShowcase } from "@/components/home/ServicesShowcase";
import { Products, HomeProcess, Journal } from "@/components/home/HomeSections";
import { Closing } from "@/components/layout/Closing";

export default function Home() {
  return (
    <>
      <HomeHero />
      <Statement />
      <ServicesShowcase />
      <Products />
      <HomeProcess />
      <Journal />
      <Closing />
    </>
  );
}
