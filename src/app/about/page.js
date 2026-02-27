import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "About Us | RodMeditech",
  description: "Learn about RodMeditech, our mission to revolutionize healthcare equipment delivery, and meet the founders behind our success.",
};

// Fetch data from database
async function getAboutData() {
  const defaultData = {
    about: {
      mission: "To deliver world-class hospital equipment through transparent partnerships, expert installation, and unwavering after-sales support — ensuring every facility we serve operates at the highest standard of care.",
      vision: "To be Africa's most trusted partner for hospital equipment — empowering healthcare facilities with technology that saves lives and improves patient outcomes at every level of care."
    },
    values: [
      { title: "Excellence", description: "We deliver only the highest quality equipment, backed by rigorous testing and certifications.", icon: "star", order: 0 },
      { title: "Integrity", description: "Transparent dealings, honest pricing, and genuine partnerships define every relationship.", icon: "shield", order: 1 },
      { title: "Innovation", description: "We stay at the forefront of medical technology to offer cutting-edge solutions.", icon: "bulb", order: 2 },
      { title: "Reliability", description: "Our 24/7 support and maintenance services ensure your operations never miss a beat.", icon: "clock", order: 3 },
    ],
    milestones: [
      { year: "2009", title: "Company Founded", description: "RodMeditech was established with a vision to bring world-class medical equipment to healthcare facilities across Nigeria.", order: 0 },
      { year: "2012", title: "First Major Contract", description: "Secured a full-facility equipment supply and installation contract for a 200-bed teaching hospital.", order: 1 },
      { year: "2016", title: "Regional Expansion", description: "Expanded operations across West Africa, partnering with leading international OEMs.", order: 2 },
      { year: "2019", title: "500th Hospital Milestone", description: "Equipped our 500th hospital, solidifying our position as a market leader in medical equipment solutions.", order: 3 },
      { year: "2023", title: "Innovation Lab Launched", description: "Opened an in-house innovation lab for equipment testing, training, and technology demonstrations.", order: 4 },
    ]
  };

  try {
    const about = await prisma.aboutPage.findFirst();
    const values = await prisma.value.findMany({
      orderBy: { order: 'asc' }
    });
    const milestones = await prisma.milestone.findMany({
      orderBy: { order: 'asc' }
    });

    if (!about && values.length === 0 && milestones.length === 0) {
      return defaultData;
    }

    return {
      about: about || defaultData.about,
      values: values.length > 0 ? values : defaultData.values,
      milestones: milestones.length > 0 ? milestones : defaultData.milestones
    };
  } catch (error) {
    console.error('Error fetching about data:', error);
    return defaultData;
  }
}

async function getFounders() {
  const defaultFounders = [
    {
      name: "Dr. Rodney Okonkwo",
      role: "Co-Founder & CEO",
      bio: "Dr. Rodney Okonkwo is a biomedical engineer with over 18 years of experience in healthcare technology. With a Ph.D. in Biomedical Engineering from Imperial College London, he has led the strategic direction of RodMeditech from a small consultancy to the region's premier medical equipment provider. His expertise spans medical imaging systems, hospital infrastructure planning, and regulatory compliance across multiple African markets.",
      specialties: ["Medical Imaging", "Strategic Planning", "Regulatory Affairs", "Hospital Infrastructure"],
      portfolio: "https://linkedin.com/in/rodney-okonkwo",
      email: "rodney@rodmeditech.com",
      photo: null
    },
    {
      name: "Engr. Medinat Adeyemi",
      role: "Co-Founder & COO",
      bio: "Engr. Medinat Adeyemi is a certified clinical engineer and operations specialist with 16 years of hands-on experience in large-scale medical equipment installation. She holds an M.Sc. in Clinical Engineering from the University of Lagos and has personally supervised the commissioning of equipment in over 300 hospitals. Her meticulous project management and deep technical knowledge ensure every installation meets international safety standards.",
      specialties: ["Installation & Commissioning", "Project Management", "Clinical Engineering", "Staff Training"],
      portfolio: "https://linkedin.com/in/medinat-adeyemi",
      email: "medinat@rodmeditech.com",
      photo: null
    },
  ];

  try {
    const founders = await prisma.founder.findMany({
      orderBy: { order: 'asc' }
    });

    if (founders.length === 0) {
      return defaultFounders;
    }

    return founders.map(founder => ({
      ...founder,
      specialties: typeof founder.specialties === 'string'
        ? JSON.parse(founder.specialties)
        : founder.specialties || []
    }));
  } catch (error) {
    console.error('Error fetching founders:', error);
    return defaultFounders;
  }
}

function ValueIcon({ type }) {
  const icons = {
    star: <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />,
    shield: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />,
    bulb: <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />,
    clock: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />,
  };
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      {icons[type]}
    </svg>
  );
}

export default async function AboutPage() {
  const { about, values, milestones } = await getAboutData();
  const owners = await getFounders();

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden min-h-[65vh] flex items-end pb-12 sm:pb-16 bg-slate-900 border-b border-white/10">
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/about-hero-bg.png"
            alt="Advanced medical equipment operating room"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Subtle Bottom Gradient for Text Legibility (No full overlay) */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent z-10" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-auto">
          <div className="max-w-xl transform transition-all duration-1000 translate-y-0 opacity-100 bg-slate-900/50 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl">
            <span className="text-sky-300 font-semibold text-xs tracking-wider uppercase drop-shadow-md">About Us</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 mb-4 drop-shadow-2xl">
              Pioneering Healthcare Technology Since 2009
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed drop-shadow-md font-light">
              RodMeditech was founded to bridge the gap between cutting-edge medical
              technology and the hospitals that need it most. We combine deep industry
              knowledge with hands-on engineering expertise to deliver end-to-end
              equipment solutions.
            </p>
          </div>
        </div>
      </section>

      {/* ===== MISSION & VISION ===== */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="p-8 bg-sky-50 rounded-2xl border border-sky-100">
              <div className="w-12 h-12 rounded-xl bg-sky-600 text-white flex items-center justify-center mb-5">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Our Vision</h2>
              <p className="text-slate-600 leading-relaxed">
                {about?.vision || "To be Africa's most trusted partner for hospital equipment — empowering healthcare facilities with technology that saves lives and improves patient outcomes at every level of care."}
              </p>
            </div>
            <div className="p-8 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="w-12 h-12 rounded-xl bg-slate-800 text-white flex items-center justify-center mb-5">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Our Mission</h2>
              <p className="text-slate-600 leading-relaxed">
                {about?.mission || "To deliver world-class hospital equipment through transparent partnerships, expert installation, and unwavering after-sales support — ensuring every facility we serve operates at the highest standard of care."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== VALUES ===== */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sky-600 font-semibold text-sm tracking-wide uppercase">Our Values</span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2">What Drives Us</h2>
            <div className="section-divider mx-auto mt-4" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-white rounded-2xl p-6 border border-slate-200 text-center card-hover">
                <div className="w-12 h-12 mx-auto rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-4">
                  <ValueIcon type={v.icon} />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{v.title}</h3>
                <p className="text-sm text-slate-500">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TIMELINE ===== */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-sky-600 font-semibold text-sm tracking-wide uppercase">Our Journey</span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2">Key Milestones</h2>
            <div className="section-divider mx-auto mt-4" />
          </div>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-slate-200 -translate-x-1/2" />
            <div className="space-y-12">
              {milestones.map((m, i) => (
                <div key={m.id || m.year} className={`relative flex items-start gap-6 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className="hidden md:block md:w-1/2" />
                  <div className="absolute left-4 md:left-1/2 w-8 h-8 -translate-x-1/2 bg-sky-600 rounded-full flex items-center justify-center z-10">
                    <span className="w-3 h-3 bg-white rounded-full" />
                  </div>
                  <div className="ml-12 md:ml-0 md:w-1/2 bg-slate-50 rounded-2xl p-6 border border-slate-200">
                    <span className="text-sky-600 font-bold text-sm">{m.year}</span>
                    <h3 className="font-bold text-slate-900 mt-1">{m.title}</h3>
                    <p className="text-sm text-slate-500 mt-2 leading-relaxed">{m.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOUNDERS / PORTFOLIO ===== */}
      <section className="bg-slate-50 py-20" id="founders">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-sky-600 font-semibold text-sm tracking-wide uppercase">Leadership</span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2">Meet Our Founders</h2>
            <div className="section-divider mx-auto mt-4" />
            <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
              RodMeditech is led by two industry veterans whose combined expertise in
              biomedical engineering and clinical operations has shaped the company into a trusted name in healthcare technology.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {owners.map((owner) => (
              <div key={owner.id || owner.name} className="bg-white rounded-2xl overflow-hidden border border-slate-200 card-hover">
                {/* Avatar or Photo */}
                {owner.photo ? (
                  <div className="h-48 relative bg-gray-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={owner.photo}
                      alt={owner.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-gradient-to-br from-sky-600 to-blue-900 flex items-center justify-center">
                    <div className="w-28 h-28 rounded-full bg-white/20 backdrop-blur flex items-center justify-center border-4 border-white/30">
                      <span className="text-4xl font-bold text-white">
                        {owner.name.split(" ").map(n => n[0]).join("")}
                      </span>
                    </div>
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-xl font-bold text-slate-900">{owner.name}</h3>
                  <p className="text-sky-600 font-medium text-sm mb-4">{owner.role}</p>
                  <p className="text-slate-600 text-sm leading-relaxed mb-5">{owner.bio}</p>

                  {/* Specialties */}
                  <div className="mb-5">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Specialties</p>
                    <div className="flex flex-wrap gap-2">
                      {owner.specialties.map((s) => (
                        <span key={s} className="px-3 py-1 bg-sky-50 text-sky-700 text-xs font-medium rounded-full">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                    <a
                      href={owner.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-sky-600 text-white text-sm font-semibold rounded-lg hover:bg-sky-700 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                      Portfolio / LinkedIn
                    </a>
                    <a
                      href={`mailto:${owner.email}`}
                      className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-600 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                      Email
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="hero-gradient py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">
            Partner with Industry Leaders
          </h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto">
            Join the 500+ hospitals that trust RodMeditech for their equipment needs.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-white text-sky-700 font-bold rounded-xl hover:bg-slate-100 transition-colors"
          >
            Start a Conversation
          </Link>
        </div>
      </section>
    </>
  );
}
