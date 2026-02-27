"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export const metadata = undefined; // metadata must be in a server component — handled by layout

function BuyModal({ product, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 z-10"
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 text-xl font-bold">✕</button>

        {/* Icon */}
        <div className="w-14 h-14 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mb-5">
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
        </div>

        <h2 className="text-xl font-bold text-slate-900 mb-1">Interested in purchasing?</h2>
        <p className="text-sky-600 font-semibold text-sm mb-4">{product.name}</p>

        <p className="text-slate-500 text-sm leading-relaxed mb-6">
          Our team provides personalised pricing, full product specifications, financing options, and professional installation for every purchase. Get in touch and we'll respond within 24 hours.
        </p>

        {/* Features reminder */}
        <ul className="space-y-1.5 mb-7">
          {product.features.slice(0, 3).map((f, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
              <svg className="w-4 h-4 text-sky-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {f}
            </li>
          ))}
        </ul>

        <Link
          href="/contact"
          className="block w-full text-center px-6 py-3.5 bg-sky-600 text-white font-bold rounded-xl hover:bg-sky-700 transition-colors"
        >
          Contact Our Team to Purchase →
        </Link>
        <button onClick={onClose} className="block w-full text-center mt-3 text-sm text-slate-400 hover:text-slate-600 transition-colors">
          Continue Browsing
        </button>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetch("/api/equipment/categories")
      .then(res => res.json())
      .then(data => {
        const cats = (data || []).map(cat => ({
          ...cat,
          products: (cat.products || []).map(p => ({
            ...p,
            features: typeof p.features === "string" ? JSON.parse(p.features) : p.features || [],
          })),
        }));
        setCategories(cats);
        if (cats.length > 0) setActiveCategory(cats[0].id);
      })
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  const currentCat = categories.find(c => c.id === activeCategory);
  const currentCatIndex = categories.findIndex(c => c.id === activeCategory);

  const handleBuy = (product) => {
    setSelectedProduct(product);
  };

  const handleNextCategory = () => {
    if (currentCatIndex < categories.length - 1) {
      setActiveCategory(categories[currentCatIndex + 1].id);
    }
  };

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden w-full aspect-square md:aspect-video lg:aspect-[21/9] lg:min-h-[600px] flex items-end pb-12 sm:pb-16 bg-slate-900 border-b border-white/10">
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/products-hero-bg.png" alt="Advanced medical equipment" className="w-full h-full object-cover object-center" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent z-10" />
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-auto">
          <div className="max-w-xl bg-slate-900/60 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl">
            <span className="text-sky-300 font-semibold text-xs tracking-wider uppercase">Equipment Catalog</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 mb-4">World-Class Medical Equipment</h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
              Browse our comprehensive catalog of state-of-the-art hospital equipment from the world's leading manufacturers. Every product is certified, warrantied, and backed by professional installation and lifetime support.
            </p>
          </div>
        </div>
      </section>

      {/* ── Loading ── */}
      {loading && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 text-center text-slate-400">Loading catalog...</div>
        </section>
      )}

      {/* ── Catalog ── */}
      {!loading && categories.length > 0 && (
        <>
          {/* Category tab bar */}
          <section className="bg-white border-b border-slate-100 sticky top-20 z-30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-1 py-3 overflow-x-auto scrollbar-hide">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`shrink-0 px-4 py-2 text-sm font-semibold rounded-lg transition-all ${activeCategory === cat.id
                        ? "bg-sky-600 text-white shadow-sm"
                        : "text-slate-600 hover:text-sky-600 hover:bg-sky-50"
                      }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Active category products */}
          {currentCat && (
            <section className="py-16 bg-slate-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Category header */}
                <div className="mb-10 flex items-start justify-between gap-6">
                  <div>
                    <span className="text-sky-600 font-semibold text-sm tracking-wide uppercase">{currentCat.name}</span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">{currentCat.name}</h2>
                    <div className="section-divider mt-3" />
                    <p className="text-slate-500 mt-3 max-w-2xl">{currentCat.description}</p>
                  </div>
                  {/* Next category arrow */}
                  {currentCatIndex < categories.length - 1 && (
                    <button
                      onClick={handleNextCategory}
                      className="shrink-0 flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-500 hover:text-sky-600 border border-slate-200 rounded-xl hover:border-sky-300 transition-all mt-1"
                    >
                      Next: {categories[currentCatIndex + 1].name}
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Product grid */}
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {currentCat.products.map((product) => (
                    <div
                      key={product.name}
                      className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col card-hover"
                    >
                      {/* Colour top bar */}
                      <div className="h-1.5 bg-gradient-to-r from-sky-500 to-blue-700" />
                      <div className="p-6 flex flex-col flex-1">
                        <h3 className="text-lg font-bold text-slate-900 mb-2">{product.name}</h3>
                        <p className="text-sm text-slate-500 leading-relaxed mb-4 flex-1">{product.description}</p>

                        {/* Feature tags */}
                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {product.features.slice(0, 3).map((f) => (
                            <span key={f} className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-md">
                              {f}
                            </span>
                          ))}
                          {product.features.length > 3 && (
                            <span className="px-2.5 py-1 bg-sky-50 text-sky-600 text-xs font-medium rounded-md">
                              +{product.features.length - 3} more
                            </span>
                          )}
                        </div>

                        {/* Buy button */}
                        <button
                          onClick={() => handleBuy(product)}
                          className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-sky-600 text-white text-sm font-bold rounded-xl hover:bg-sky-700 active:scale-95 transition-all"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                          </svg>
                          Buy
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination: prev / next */}
                <div className="flex items-center justify-between mt-12 pt-8 border-t border-slate-200">
                  <button
                    onClick={() => currentCatIndex > 0 && setActiveCategory(categories[currentCatIndex - 1].id)}
                    disabled={currentCatIndex === 0}
                    className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-600 border border-slate-200 rounded-xl hover:border-sky-300 hover:text-sky-600 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                    {currentCatIndex > 0 ? categories[currentCatIndex - 1].name : 'Previous'}
                  </button>

                  <span className="text-sm text-slate-400 font-medium">
                    {currentCatIndex + 1} / {categories.length}
                  </span>

                  {currentCatIndex < categories.length - 1 ? (
                    <button
                      onClick={handleNextCategory}
                      className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-sky-600 rounded-xl hover:bg-sky-700 transition-all"
                    >
                      {categories[currentCatIndex + 1].name}
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </button>
                  ) : (
                    <Link
                      href="/contact"
                      className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 transition-all"
                    >
                      Contact Sales Team
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </Link>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* CTA */}
          <section className="hero-gradient py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-extrabold text-white mb-4">Ready to Equip Your Facility?</h2>
              <p className="text-slate-300 mb-3 max-w-xl mx-auto">
                Our specialists will guide you through selection, pricing, financing, and installation — from a single device to a full hospital fit-out.
              </p>
              <p className="text-sky-300 font-semibold mb-8">
                Contact our team for a full product list and purchase.
              </p>
              <Link
                href="/contact"
                className="inline-block px-8 py-4 bg-white text-sky-700 font-bold rounded-xl hover:bg-slate-100 transition-colors"
              >
                Contact Our Sales Team →
              </Link>
            </div>
          </section>
        </>
      )}

      {/* ── Buy Modal ── */}
      {selectedProduct && (
        <BuyModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </>
  );
}
