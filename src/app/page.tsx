import Navbar from './ui/navbar';
import AboutSection from './ui/about-section';
import BioSection from './ui/bio-section';
import PhotoBreak from './ui/photo-break';
import ServicesSection from './ui/services-section';
import WorkSection from './ui/work-section';
import TestimonialsSection from './ui/testimonials-section';
import NewsSection from './ui/news-section';
import Footer from './ui/footer';

export default function Home() {
  return (
    <main>
      <section className="h-screen relative flex flex-col overflow-hidden">

        {/* Background image — covers full section height, behind navbar */}
        <div className="absolute inset-0 pointer-events-none">
          <img
            src="/hero-bg.jpg"
            alt=""
            className="w-full h-full object-cover object-[center_top]"
          />
        </div>

        {/* Frosted-glass overlay fading in from the bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[349px] backdrop-blur-[10px] bg-[rgba(217,217,217,0.01)] pointer-events-none [mask-image:linear-gradient(to_bottom,transparent,black_35%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_35%)]" />

        {/* Navbar sits above the image */}
        <Navbar />

        {/* Hero text overlay */}
        <div className="relative flex-1">

          {/*
           * Mobile:  341 px tall, anchored to the bottom (top = 100% − 341px)
           *          justify-between → name at top, description at bottom
           * Desktop: starts 30% from the flex-1 area top, auto height
           *          description self-end → appears bottom-right after Harvey Specter
           */}
          <div className="
            absolute left-0 right-0 px-4 pb-[24px]
            top-[calc(100%_-_341px)] h-[341px] flex flex-col justify-end gap-[32px]
            md:top-[30%] md:h-auto md:pb-8 md:px-8 md:justify-start md:gap-0
          ">

            {/* [ Hello I'm ] + Harvey Specter */}
            <div className="flex flex-col items-center w-full md:items-start">
              <div className="flex items-center justify-center px-[18px] w-full md:px-0 md:justify-start">
                <p className="font-mono text-sm text-white uppercase mix-blend-overlay leading-[1.1] whitespace-nowrap">
                  [ Hello i&apos;m ]
                </p>
              </div>
              <h1
                className="
                  font-medium capitalize text-white text-center mix-blend-overlay w-full
                  text-[96px] tracking-[-6.72px] leading-[0.8]
                  md:text-[13.75vw] md:tracking-[-0.07em] md:leading-[1.1] md:whitespace-nowrap
                "
              >
                <span className="block md:inline">Harvey</span>
                <span className="hidden md:inline">&nbsp;&nbsp;&nbsp;</span>
                <span className="block md:inline">Specter</span>
              </h1>
            </div>

            {/* Description + CTA — 293 px centred on mobile, right-aligned on desktop */}
            <div className="flex flex-col gap-[17px] items-center w-full max-w-[293px] mx-auto md:mx-0 md:items-start md:max-w-none md:w-[293px] md:self-end">
              <p className="font-bold italic text-sm text-[#1f1f1f] uppercase tracking-[-0.035em] leading-[1.1] text-center md:text-left">
                <span>H.Studio is a </span>
                <span className="font-normal not-italic">full-service</span>
                <span> creative studio creating beautiful digital experiences and products. We are an </span>
                <span className="font-normal not-italic">award winning</span>
                <span> design and art group specializing in branding, web design and engineering.</span>
              </p>
              <button className="bg-black text-white text-sm font-medium tracking-[-0.035em] px-4 py-3 rounded-full cursor-pointer hover:opacity-80 transition-opacity">
                Let&apos;s talk
              </button>
            </div>
          </div>
        </div>
      </section>
      <AboutSection />
      <BioSection />
      <PhotoBreak />
      <ServicesSection />
      <WorkSection />
      <TestimonialsSection />
      <NewsSection />
      <Footer />
    </main>
  );
}
