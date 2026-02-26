"use client";

import { useState, useEffect } from "react";

const inquiryTypes = [
  "Equipment Purchase",
  "Installation Services",
  "Maintenance & Repairs",
  "Training Request",
  "General Inquiry",
];

// Default icon components
const defaultIcons = {
  location: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  ),
  phone: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  ),
  email: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  ),
  clock: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    inquiryType: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [contactInfo, setContactInfo] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [contactRes, faqRes] = await Promise.all([
          fetch('/api/contact'),
          fetch('/api/faqs')
        ]);

        if (contactRes.ok) {
          const contactData = await contactRes.json();
          setContactInfo(contactData.map(info => ({
            ...info,
            lines: typeof info.content === 'string' ? JSON.parse(info.content) : info.content
          })));
        }

        if (faqRes.ok) {
          const faqData = await faqRes.json();
          setFaqs(faqData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // In production, send formData to an API endpoint
    setSubmitted(true);
  }

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden w-full aspect-square md:aspect-video lg:aspect-[21/9] lg:min-h-[600px] flex items-end pb-12 sm:pb-16 bg-slate-900 border-b border-white/10">
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/contact-hero-bg.png"
            alt="RodMeditech corporate headquarters reception"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Subtle Bottom Gradient for Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent z-10" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-auto">
          <div className="max-w-xl transform transition-all duration-1000 translate-y-0 opacity-100 bg-slate-900/60 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl">
            <span className="text-sky-300 font-semibold text-xs tracking-wider uppercase drop-shadow-md">Contact Us</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 mb-4 drop-shadow-2xl">
              Let&rsquo;s Discuss Your Needs
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed drop-shadow-md font-light">
              Whether you need a single piece of equipment or a full hospital buildout,
              our team is ready to help. Reach out and we&rsquo;ll respond within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {loading ? (
            <div className="text-center py-8">Loading contact information...</div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactInfo.length > 0 ? contactInfo.map((info) => (
                <div key={info.id || info.title} className="flex gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center shrink-0">
                    {defaultIcons[info.type] || defaultIcons.location}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-sm">{info.title}</h3>
                    {info.lines.map((line, i) => (
                      <p key={i} className="text-sm text-slate-500">{line}</p>
                    ))}
                  </div>
                </div>
              )) : (
                <div className="col-span-4 text-center py-8 text-gray-500">
                  No contact information available
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Form + Map */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Send Us a Message</h2>
              <p className="text-sm text-slate-500 mb-8">
                Fill out the form below and our team will get back to you within one business day.
              </p>

              {submitted ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                  <p className="text-slate-500">
                    Thank you for reaching out. Our team will contact you within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", phone: "", organization: "", inquiryType: "", message: "" });
                    }}
                    className="mt-6 text-sm font-semibold text-sky-600 hover:text-sky-800 transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        placeholder="john@hospital.com"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        placeholder="+234 812 345 6789"
                      />
                    </div>
                    <div>
                      <label htmlFor="organization" className="block text-sm font-medium text-slate-700 mb-1">Organization</label>
                      <input
                        type="text"
                        id="organization"
                        name="organization"
                        value={formData.organization}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        placeholder="City General Hospital"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="inquiryType" className="block text-sm font-medium text-slate-700 mb-1">Inquiry Type *</label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      required
                      value={formData.inquiryType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white"
                    >
                      <option value="">Select an inquiry type</option>
                      {inquiryTypes.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent resize-none"
                      placeholder="Tell us about your equipment needs, project scope, or any questions you have..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-6 py-3.5 bg-sky-600 text-white font-semibold rounded-xl hover:bg-sky-700 transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Map placeholder + additional info */}
            <div className="space-y-8">
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <div className="h-72 bg-slate-200 flex items-center justify-center">
                  <div className="text-center text-slate-400">
                    <svg className="w-12 h-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    <p className="text-sm font-medium">Interactive Map</p>
                    <p className="text-xs">Lagos, Nigeria</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-slate-900 mb-1">RodMeditech Head Office</h3>
                  <p className="text-sm text-slate-500">123 Medical Drive, Suite 400, Lagos, Nigeria</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-8">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Frequently Asked</h3>
                {loading ? (
                  <div className="text-center py-4 text-gray-500">Loading FAQs...</div>
                ) : faqs.length > 0 ? (
                  <div className="space-y-4">
                    {faqs.map((faq) => (
                      <div key={faq.id}>
                        <h4 className="text-sm font-semibold text-slate-700">{faq.question}</h4>
                        <p className="text-sm text-slate-500 mt-1">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 text-gray-500">No FAQs available</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
