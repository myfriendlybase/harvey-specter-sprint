const services = [
  { num: '1', title: 'Brand Discovery',    img: '/service-brand.jpg' },
  { num: '2', title: 'Web design & Dev',   img: '/service-web.jpg' },
  { num: '3', title: 'Marketing',          img: '/service-marketing.jpg' },
  { num: '4', title: 'Photography',        img: '/service-photo.jpg' },
];

const desc = 'Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.';

export default function ServicesSection() {
  return (
    <section id="services" data-nav-theme="dark" className="bg-black px-4 py-12 md:px-8 md:py-[80px] flex flex-col gap-8 md:gap-12">

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
          <div key={num} className="group flex flex-col gap-[9px] cursor-default">

            {/* [ N ] + hairline */}
            <p className="font-mono text-sm text-white uppercase leading-[1.1]">[ {num} ]</p>
            <div className="relative h-px bg-white/30">
              <div className="absolute inset-0 bg-white origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100" />
            </div>

            <div className="mt-1 flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-8">

              <p className="font-bold italic text-[36px] text-white uppercase tracking-[-0.04em] leading-[1.1] md:w-[40%] md:shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-3">
                {title}
              </p>

              <div className="flex flex-col gap-4 md:flex-row md:gap-6 md:items-start md:flex-1 md:justify-end">
                <p className="text-sm text-white/70 tracking-[-0.035em] leading-[1.3] md:flex-1 md:max-w-[393px] transition-colors duration-300 group-hover:text-white">
                  {desc}
                </p>
                <div className="size-[151px] shrink-0 overflow-hidden">
                  <img
                    src={img}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
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
