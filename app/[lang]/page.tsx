import { HomeHero } from "@/components/home/HomeHero";
import { Statement } from "@/components/home/Statement";
import { ServicesShowcase } from "@/components/home/ServicesShowcase";
import { Products, HomeProcess, Journal } from "@/components/home/HomeSections";
import { Closing } from "@/components/layout/Closing";
import { Testimonials } from "@/components/home/Testimonials";
import { langOf } from "@/lib/i18n/page";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const lang = await langOf(params);
  return (
    <>
      <HomeHero />
      <Statement />
      <ServicesShowcase />
      <Products />
      <HomeProcess />
      <Testimonials lang={lang} />
      <Journal />
      <Closing />
    </>
  );
}
