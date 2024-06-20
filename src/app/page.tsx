import ContentAbout from "@/components/Content/ContentAbout";
import ContentCategory from "@/components/Content/ContentCategory";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="mt-20 lg:mt-24 flex flex-col max-w-[1170px] mx-auto">
      <section id="hero">
        <Hero />
      </section>
      <section id="content" className="items-center pt-[500px] w-full">
        <ContentCategory />
        <ContentAbout />
      </section>
    </main>
  );
}
