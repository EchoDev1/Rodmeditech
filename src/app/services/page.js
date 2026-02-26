import Link from "next/link";

export const metadata = {
  title: "Services | RodMeditech",
  description:
    "RodMeditech provides end-to-end hospital equipment services: sales consulting, professional installation, staff training, preventive maintenance, and 24/7 technical support.",
};

const coreServices = [
  {
    title: "Equipment Sales & Consulting",
    description:
      "Our sales consultants work closely with hospital administrators, clinical engineers, and department heads to identify the right equipment for each facility. We provide unbiased recommendations, comparative analyses, and transparent pricing from our network of certified global manufacturers.",
    bullets: [
      "Needs assessment and facility audits",
      "Manufacturer-agnostic product recommendations",
      "Competitive pricing with flexible payment terms",
      "Regulatory compliance and import documentation",
      "Warranty management and extended coverage plans",
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
      </svg>
    ),
  },
  {
    title: "Professional Installation",
    description:
      "Our certified field engineers manage the complete installation lifecycle — from pre-installation site surveys and infrastructure preparation through delivery logistics, assembly, calibration, acceptance testing, and regulatory handover. Every installation meets OEM specifications and local regulatory standards.",
    bullets: [
      "Pre-installation site surveys and room prep",
      "Logistics coordination and heavy equipment rigging",
      "Assembly, calibration, and commissioning",
      "Acceptance testing with documented protocols",
      "Regulatory documentation and handover",
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.1-3.18M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
      </svg>
    ),
  },
  {
    title: "Training & Education",
    description:
      "Equipment is only as good as the people operating it. We provide hands-on training programs for clinical staff, biomedical engineers, and administrators — ensuring safe, efficient, and confident equipment use from day one.",
    bullets: [
      "On-site operator training for clinical staff",
      "Biomedical engineering technical training",
      "Administrator dashboards and reporting training",
      "Refresher courses and new-hire onboarding",
      "Certification programs with accredited partners",
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
  },
  {
    title: "Preventive Maintenance",
    description:
      "Our preventive maintenance contracts are designed to maximize uptime, extend equipment lifespan, and ensure continuous compliance. We follow OEM-recommended schedules and maintain detailed service records for every piece of equipment we support.",
    bullets: [
      "Scheduled inspections per OEM guidelines",
      "Parts replacement and wear-item management",
      "Performance benchmarking and QA testing",
      "Digital service logs and compliance reporting",
      "Priority response for contract clients",
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75a4.5 4.5 0 01-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 11-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 016.336-4.486l-3.276 3.276a3.004 3.004 0 002.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852z" />
      </svg>
    ),
  },
  {
    title: "Emergency Repairs & 24/7 Support",
    description:
      "Equipment downtime in a hospital can affect patient care. Our rapid-response repair teams are available around the clock with a commitment to fast resolution. Remote diagnostics reduce on-site visits; when physical repair is needed, our engineers arrive prepared.",
    bullets: [
      "24/7 technical support hotline",
      "Remote diagnostics and software troubleshooting",
      "Guaranteed response times in service contracts",
      "OEM-certified spare parts inventory",
      "Loaner equipment programs for extended repairs",
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
      </svg>
    ),
  },
  {
    title: "Facility Planning & Design",
    description:
      "Building or renovating a hospital? Our facility planning team works alongside architects and contractors to design equipment layouts, electrical and HVAC requirements, radiation shielding, and workflow optimization for departments like radiology, OR suites, ICUs, and laboratories.",
    bullets: [
      "Department layout and workflow optimization",
      "Electrical, plumbing, and HVAC specifications",
      "Radiation shielding design for imaging rooms",
      "Equipment integration and IT infrastructure",
      "Compliance with local building and health codes",
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3H21" />
      </svg>
    ),
  },
];

const processSteps = [
  { step: "01", title: "Consultation", description: "We discuss your facility's needs, budget, and clinical requirements." },
  { step: "02", title: "Proposal", description: "We deliver a detailed proposal with equipment specs, pricing, and timelines." },
  { step: "03", title: "Site Preparation", description: "Our engineers survey the site and coordinate infrastructure requirements." },
  { step: "04", title: "Delivery & Installation", description: "Equipment is shipped, assembled, calibrated, and acceptance-tested." },
  { step: "05", title: "Training", description: "Clinical staff and engineers receive hands-on training and documentation." },
  { step: "06", title: "Ongoing Support", description: "Preventive maintenance, remote monitoring, and 24/7 support begin." },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-10 w-72 h-72 bg-sky-400 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-3xl">
            <span className="text-sky-300 font-semibold text-sm tracking-wide uppercase">Our Services</span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mt-3 mb-6">
              Complete Equipment Lifecycle Services
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed max-w-2xl">
              From the first consultation to years of ongoing maintenance, RodMeditech
              provides full-spectrum services that keep your hospital running at peak performance.
            </p>
          </div>
        </div>
      </section>

      {/* Core Services */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-sky-600 font-semibold text-sm tracking-wide uppercase">What We Offer</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">Our Core Services</h2>
            <div className="section-divider mx-auto mt-4" />
          </div>

          <div className="space-y-16">
            {coreServices.map((svc, i) => (
              <div
                key={svc.title}
                className={`flex flex-col lg:flex-row gap-8 items-start ${i % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}
              >
                <div className="lg:w-1/3 shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mb-4">
                    {svc.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{svc.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{svc.description}</p>
                </div>
                <div className="lg:w-2/3 bg-slate-50 rounded-2xl p-8 border border-slate-200">
                  <ul className="space-y-3">
                    {svc.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-sky-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm text-slate-700">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-sky-600 font-semibold text-sm tracking-wide uppercase">How We Work</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">Our Process</h2>
            <div className="section-divider mx-auto mt-4" />
            <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
              A proven, streamlined workflow that takes your project from initial
              concept to a fully operational, supported installation.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {processSteps.map((p) => (
              <div key={p.step} className="bg-white rounded-2xl p-6 border border-slate-200 card-hover">
                <span className="text-3xl font-extrabold text-sky-100">{p.step}</span>
                <h3 className="text-lg font-bold text-slate-900 mt-2 mb-2">{p.title}</h3>
                <p className="text-sm text-slate-500">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service plans */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-sky-600 font-semibold text-sm tracking-wide uppercase">Maintenance Plans</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">Service & Support Plans</h2>
            <div className="section-divider mx-auto mt-4" />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Essential */}
            <div className="rounded-2xl border border-slate-200 overflow-hidden card-hover">
              <div className="p-8">
                <h3 className="text-lg font-bold text-slate-900">Essential</h3>
                <p className="text-sm text-slate-500 mt-1 mb-6">Basic coverage for budget-conscious facilities.</p>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-center gap-2"><svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>Annual preventive maintenance</li>
                  <li className="flex items-center gap-2"><svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>Phone & email support (business hours)</li>
                  <li className="flex items-center gap-2"><svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>48-hour on-site response</li>
                  <li className="flex items-center gap-2"><svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>Digital service records</li>
                </ul>
              </div>
              <div className="px-8 py-4 bg-slate-50 border-t border-slate-200">
                <Link href="/contact" className="text-sm font-semibold text-sky-600 hover:text-sky-800 transition-colors">Get a Quote &rarr;</Link>
              </div>
            </div>

            {/* Professional */}
            <div className="rounded-2xl border-2 border-sky-500 overflow-hidden card-hover relative">
              <div className="absolute top-0 right-0 px-3 py-1 bg-sky-500 text-white text-xs font-bold rounded-bl-lg">Popular</div>
              <div className="p-8">
                <h3 className="text-lg font-bold text-slate-900">Professional</h3>
                <p className="text-sm text-slate-500 mt-1 mb-6">Comprehensive coverage for mid-size hospitals.</p>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-center gap-2"><svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>Bi-annual preventive maintenance</li>
                  <li className="flex items-center gap-2"><svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>24/7 phone, email & remote support</li>
                  <li className="flex items-center gap-2"><svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>24-hour on-site response</li>
                  <li className="flex items-center gap-2"><svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>Parts included (wear items)</li>
                  <li className="flex items-center gap-2"><svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>Loaner equipment program</li>
                </ul>
              </div>
              <div className="px-8 py-4 bg-sky-50 border-t border-sky-200">
                <Link href="/contact" className="text-sm font-semibold text-sky-600 hover:text-sky-800 transition-colors">Get a Quote &rarr;</Link>
              </div>
            </div>

            {/* Enterprise */}
            <div className="rounded-2xl border border-slate-200 overflow-hidden card-hover">
              <div className="p-8">
                <h3 className="text-lg font-bold text-slate-900">Enterprise</h3>
                <p className="text-sm text-slate-500 mt-1 mb-6">Full coverage for large hospital networks.</p>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-center gap-2"><svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>Quarterly maintenance + inspections</li>
                  <li className="flex items-center gap-2"><svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>Dedicated account manager</li>
                  <li className="flex items-center gap-2"><svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>4-hour emergency response SLA</li>
                  <li className="flex items-center gap-2"><svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>All parts and labor included</li>
                  <li className="flex items-center gap-2"><svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>Multi-site fleet management</li>
                  <li className="flex items-center gap-2"><svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>Annual technology review</li>
                </ul>
              </div>
              <div className="px-8 py-4 bg-slate-50 border-t border-slate-200">
                <Link href="/contact" className="text-sm font-semibold text-sky-600 hover:text-sky-800 transition-colors">Get a Quote &rarr;</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="hero-gradient py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">
            Need a Custom Service Package?
          </h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto">
            Every hospital is unique. Let us build a service plan tailored to your
            facility&rsquo;s exact needs and budget.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-white text-sky-700 font-bold rounded-xl hover:bg-slate-100 transition-colors"
          >
            Talk to Our Team
          </Link>
        </div>
      </section>
    </>
  );
}
