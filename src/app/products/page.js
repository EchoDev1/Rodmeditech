import Link from "next/link";

export const metadata = {
  title: "Equipment Catalog | RodMeditech",
  description:
    "Browse our complete catalog of state-of-the-art hospital equipment — from MRI and CT systems to surgical robots, patient monitors, and laboratory analyzers.",
};

async function getCategories() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/equipment/categories`, {
      cache: 'no-store',
    });
    if (!res.ok) return [];
    const data = await res.json();
    return (data || []).map(cat => ({
      id: cat.id,
      name: cat.name,
      description: cat.description,
      products: (cat.products || []).map(p => ({
        name: p.name,
        description: p.description,
        features: typeof p.features === 'string' ? JSON.parse(p.features) : p.features || []
      }))
    }));
  } catch (error) {
    console.error('Failed to fetch equipment categories:', error);
    return [];
  }
}

export default async function ProductsPage() {
  const categories = await getCategories();
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden w-full aspect-square md:aspect-video lg:aspect-[21/9] lg:min-h-[600px] flex items-end pb-12 sm:pb-16 bg-slate-900 border-b border-white/10">
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/products-hero-bg.png"
            alt="Advanced medical equipment showroom"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Subtle Bottom Gradient for Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent z-10" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-auto">
          <div className="max-w-xl transform transition-all duration-1000 translate-y-0 opacity-100 bg-slate-900/60 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl">
            <span className="text-sky-300 font-semibold text-xs tracking-wider uppercase drop-shadow-md">Equipment Catalog</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 mb-4 drop-shadow-2xl">
              World-Class Medical Equipment
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed drop-shadow-md font-light">
              Browse our comprehensive catalog of hospital equipment from leading global manufacturers.
              Every product is certified, warrantied, and backed by our professional installation
              and maintenance services.
            </p>
          </div>
        </div>
      </section>

      {/* Category quick links */}
      <section className="bg-white border-b border-slate-100 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 py-3 overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="shrink-0 px-4 py-2 text-sm font-medium text-slate-600 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
              >
                {cat.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Products by category */}
      {categories.length === 0 ? (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-sky-100 flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3 3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">Catalog Coming Soon</h2>
            <p className="text-slate-500 max-w-md mx-auto mb-6">Our equipment catalog is being updated. Please check back soon or contact our team for a full product list.</p>
            <Link href="/contact" className="inline-block px-6 py-3 bg-sky-600 text-white font-semibold rounded-xl hover:bg-sky-700 transition-colors">
              Contact Sales Team
            </Link>
          </div>
        </section>
      ) : (
        <>
          {categories.map((cat) => (
            <section key={cat.id} id={cat.id} className="py-16 odd:bg-slate-50 even:bg-white scroll-mt-32">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-10">
                  <span className="text-sky-600 font-semibold text-sm tracking-wide uppercase">{cat.name}</span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">{cat.name}</h2>
                  <div className="section-divider mt-3" />
                  <p className="text-slate-500 mt-3 max-w-xl">{cat.description}</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  {cat.products.map((product) => (
                    <div
                      key={product.name}
                      className="card-hover bg-white rounded-2xl border border-slate-200 overflow-hidden"
                    >
                      {/* Colored top bar */}
                      <div className="h-2 bg-gradient-to-r from-sky-500 to-blue-700" />
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-slate-900 mb-2">{product.name}</h3>
                        <p className="text-sm text-slate-500 leading-relaxed mb-4">{product.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {product.features.map((f) => (
                            <span
                              key={f}
                              className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-md"
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                        <Link
                          href="/contact"
                          className="inline-flex items-center gap-1 text-sm text-sky-600 font-semibold hover:text-sky-800 transition-colors"
                        >
                          Request Quote
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ))}

          {/* CTA */}
          <section className="hero-gradient py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-extrabold text-white mb-4">
                Don&rsquo;t See What You Need?
              </h2>
              <p className="text-slate-300 mb-8 max-w-xl mx-auto">
                We work with all major manufacturers. Tell us your requirements
                and we&rsquo;ll source the exact equipment your facility needs.
              </p>
              <Link
                href="/contact"
                className="inline-block px-8 py-4 bg-white text-sky-700 font-bold rounded-xl hover:bg-slate-100 transition-colors"
              >
                Contact Our Sales Team
              </Link>
            </div>
          </section>
        </>
      )}
    </>
  );
}
