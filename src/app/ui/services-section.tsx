const services = [
  { num: '1', title: 'Brand Discovery',    img: '/service-brand.jpg' },
  { num: '2', title: 'Web design & Dev',   img: '/service-web.jpg' },
  { num: '3', title: 'Marketing',          img: '/service-marketing.jpg' },
  { num: '4', title: 'Photography',        img: '/service-photo.jpg' },
];

const desc = 'Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.';

export default function ServicesSection() {
  return (
    <section id="services" className="bg-black px-4 py-12 md:px-8 md:py-[80px] flex flex-col gap-8 md:gap-12">

      {/* [ services ] */}
      <p className="font-mono text-sm text-white uppercase leading-[1.1]">[ services ]</p>

      {/* [4]  ·····  DELIVERABLES */}
      <div className="flex items-center justify-between font-light text-white uppercase tracking-[-0.08em] text-[32px] md:text-[6.67vw]">
        <span>[4]</span>
        <span>Deliverables</span>
      </div>

      {/* Service list */}
      <div className="flex flex-col gap-12">
        {services.map(({ num, title, img }) => (
          <div key={num} className="flex flex-col gap-[9px]">

            {/* [ N ] + hairline */}
            <p className="font-mono text-sm text-white uppercase leading-[1.1]">[ {num} ]</p>
            <hr className="border-0 border-t border-white/30" />

            {/*
             * Desktop: title on left, description + image on right (justify-between)
             * Mobile:  stacked — title, then description, then image
             */}
            <div className="mt-1 flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-8">

              {/* Title — fixed column width so all four titles occupy the same space */}
              <p className="font-bold italic text-[36px] text-white uppercase tracking-[-0.04em] leading-[1.1] md:w-[40%] md:shrink-0">
                {title}
              </p>

              {/*
               * Right group — flex-1 fills remaining width so the image
               * is always pinned to the right edge at any desktop width.
               */}
              <div className="flex flex-col gap-4 md:flex-row md:gap-6 md:items-start md:flex-1 md:justify-end">
                <p className="text-sm text-white tracking-[-0.035em] leading-[1.3] md:flex-1 md:max-w-[393px]">
                  {desc}
                </p>
                <div className="size-[151px] shrink-0 overflow-hidden">
                  <img
                    src={img}
                    alt={title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
