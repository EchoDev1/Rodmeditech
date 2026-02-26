import Link from "next/link";

const stats = [
  { value: "500+", label: "Hospitals Equipped" },
  { value: "2,000+", label: "Installations Completed" },
  { value: "15+", label: "Years Experience" },
  { value: "98%", label: "Client Satisfaction" },
];

const featuredEquipment = [
  {
    title: "MRI Systems",
    description: "High-field MRI scanners with advanced imaging capabilities for precise diagnostics.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
  },
  {
    title: "CT Scanners",
    description: "Multi-slice CT scanners delivering fast, high-resolution cross-sectional imaging.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
      </svg>
    ),
  },
  {
    title: "Surgical Robots",
    description: "Robotic-assisted surgical systems for minimally invasive procedures with precision control.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.1-3.18a.5.5 0 010-.86l5.1-3.18a.5.5 0 01.76.43v6.36a.5.5 0 01-.76.43zM20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m16.5 0h-16.5" />
      </svg>
    ),
  },
  {
    title: "Patient Monitors",
    description: "Multi-parameter patient monitoring systems for ICU, OR, and general ward use.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l3-3 2.25 2.25 4.5-4.5 3 3 3.75-3.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Ventilators",
    description: "Advanced mechanical ventilators with intelligent modes for critical care respiratory support.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Lab Analyzers",
    description: "Automated clinical chemistry and hematology analyzers for fast, accurate lab results.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
  },
];

const services = [
  {
    title: "Equipment Sales",
    description: "We partner with world-leading manufacturers to supply certified, state-of-the-art hospital equipment at competitive prices.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
      </svg>
    ),
  },
  {
    title: "Professional Installation",
    description: "Our certified engineers handle end-to-end installation — from site preparation and logistics to calibration and commissioning.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.1-3.18M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
      </svg>
    ),
  },
  {
    title: "Training & Support",
    description: "Comprehensive training programs and 24/7 technical support ensure your staff can operate equipment safely and efficiently.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
  },
  {
    title: "Maintenance & Repairs",
    description: "Preventive maintenance contracts and rapid-response repair services keep your equipment running at peak performance.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75a4.5 4.5 0 01-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 11-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 016.336-4.486l-3.276 3.276a3.004 3.004 0 002.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852z" />
      </svg>
    ),
  },
];

const partners = [
  "GE Healthcare", "Siemens Healthineers", "Philips Medical", "Medtronic",
  "Johnson & Johnson", "Stryker", "Dräger", "Mindray",
];

export default function HomePage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden min-h-[85vh] flex items-end bg-slate-900 border-b border-white/10">
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero-bg.png"
            alt="State of the art hospital equipment"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Subtle Bottom Gradient for Text Legibility (No full overlay) */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent z-10" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-auto">
          <div className="max-w-xl transform transition-all duration-1000 translate-y-0 opacity-100 bg-slate-900/50 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-800/80 border border-slate-700 w-auto rounded-full mb-6 shadow-md">
              <span className="flex h-1.5 w-1.5 rounded-full bg-sky-400 animate-ping absolute"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-sky-500"></span>
              <span className="text-sky-200 text-xs font-semibold tracking-wide uppercase ms-2">Trusted by 500+ Hospitals</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-[1.1] mb-4 drop-shadow-lg">
              State-of-the-Art <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">
                Hospital Equipment
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-lg font-light drop-shadow">
              We deliver world-class medical equipment and professional installation
              services to equip hospitals for clinical excellence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="group relative inline-flex items-center justify-center px-6 py-3 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(14,165,233,0.4)] transition-all overflow-hidden text-sm"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                <span className="relative flex items-center gap-2">
                  Browse Equipment
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </Link>

              <Link
                href="/contact"
                className="group inline-flex items-center justify-center px-6 py-3 bg-slate-800/50 hover:bg-slate-700/60 text-white font-bold rounded-xl border border-slate-600 backdrop-blur-md transition-all shadow-md text-sm"
              >
                <span className="flex items-center gap-2">
                  Request Consult
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl sm:text-4xl font-extrabold text-sky-600">{stat.value}</p>
                <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED EQUIPMENT ===== */}
      <section className="bg-slate-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-sky-600 font-semibold text-sm tracking-wide uppercase">Our Catalog</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
              Featured Hospital Equipment
            </h2>
            <div className="section-divider mx-auto mt-4" />
            <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
              We supply cutting-edge medical devices from world-leading manufacturers,
              tailored to your facility&rsquo;s unique clinical requirements.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEquipment.map((item) => (
              <div
                key={item.title}
                className="card-hover bg-white rounded-2xl p-8 border border-slate-200"
              >
                <div className="w-14 h-14 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-5">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-sky-600 text-white font-semibold rounded-xl hover:bg-sky-700 transition-colors"
            >
              View Full Catalog
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-sky-600 font-semibold text-sm tracking-wide uppercase">What We Do</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
              End-to-End Services
            </h2>
            <div className="section-divider mx-auto mt-4" />
            <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
              From initial consultation to ongoing maintenance, RodMeditech provides
              comprehensive support throughout the lifecycle of your equipment.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-8">
            {services.map((svc) => (
              <div key={svc.title} className="flex gap-5 p-6 rounded-2xl hover:bg-slate-50 transition-colors">
                <div className="w-14 h-14 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0">
                  {svc.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{svc.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{svc.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sky-600 font-semibold hover:text-sky-800 transition-colors"
            >
              Learn more about our services
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== PARTNERS ===== */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-slate-400 font-medium uppercase tracking-wider mb-8">
            Authorized Partners &amp; Manufacturers
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {partners.map((name) => (
              <div
                key={name}
                className="flex items-center justify-center h-16 bg-white rounded-xl border border-slate-200 text-slate-400 font-semibold text-sm hover:text-sky-600 hover:border-sky-200 transition-colors"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="hero-gradient py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Ready to Upgrade Your Hospital?
          </h2>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            Let our team help you find the right equipment for your facility.
            Get a custom quote with no obligation.
          </p>
          <Link
            href="/contact"
            className="inline-block px-10 py-4 bg-white text-sky-700 font-bold rounded-xl hover:bg-slate-100 transition-colors"
          >
            Get Your Free Quote
          </Link>
        </div>
      </section>
    </>
  );
}
