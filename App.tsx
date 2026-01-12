
import React, { useState } from 'react';
import VoiceAgent from './components/VoiceAgent';

const App: React.FC = () => {
  const [weight, setWeight] = useState('');
  const [estimatedRate, setEstimatedRate] = useState<number | null>(null);

  const calculateRate = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(weight);
    if (!isNaN(w)) {
      setEstimatedRate(w * 1500 + 2000); // Mock logic
    }
  };

  const services = [
    { title: "Local Shipping", desc: "Next-day delivery across all 36 Nigerian states.", icon: "🚚" },
    { title: "International Shipping", desc: "Affordable global rates with door-to-door delivery.", icon: "✈️" },
    { title: "Haulage", desc: "Heavy goods transport and home/office relocation experts.", icon: "🏗️" },
    { title: "Forwarding", desc: "Professional customs handling and final mile delivery.", icon: "📦" },
    { title: "Packaging", desc: "Secure packaging for fragile items, gifts, and electronics.", icon: "🎁" },
    { title: "Warehousing", desc: "Strategic storage and fulfillment solutions for businesses.", icon: "🏬" },
  ];

  const stats = [
    { label: "Founded", value: "2012" },
    { label: "Deliveries", value: "500k+" },
    { label: "Countries", value: "150+" },
    { label: "States Covered", value: "36" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Bar */}
      <div className="bg-[#0a192f] text-white py-2 px-6 hidden md:block border-b border-white/10">
        <div className="max-w-7xl mx-auto flex justify-between text-sm">
          <div className="flex gap-6">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Mon - Sat: 8:00 AM - 6:00 PM
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              +234 704 614 5125
            </span>
          </div>
          <div className="flex items-center gap-2">
             <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
             info@ablogistics.com.ng
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white shadow-md border-b">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#0a192f] rounded flex items-center justify-center text-orange-500 font-bold text-xl">AB</div>
            <span className="text-2xl font-extrabold text-[#0a192f] tracking-tight">LOGISTICS</span>
          </div>
          <div className="hidden lg:flex gap-8 items-center font-semibold text-gray-700">
            <a href="#" className="hover:text-orange-500 transition">Home</a>
            <a href="#services" className="hover:text-orange-500 transition">Services</a>
            <a href="#rates" className="hover:text-orange-500 transition">Rates</a>
            <a href="#contact" className="hover:text-orange-500 transition">Contact</a>
            <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition shadow-lg shadow-orange-500/20">
              Request a Quote
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-[#0a192f] overflow-hidden">
        {/* Background Visuals */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img src="https://picsum.photos/1920/1080?grayscale&blur=2" alt="Background" className="w-full h-full object-cover" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">
          <div className="z-10 text-white">
            <span className="inline-block bg-orange-500/20 text-orange-400 px-4 py-1 rounded-full text-sm font-bold mb-6 tracking-wide uppercase border border-orange-500/30">
              Nigeria's #1 Logistics Partner
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
              We Deliver Your <br />
              <span className="text-orange-500">Goods Fast</span>
            </h1>
            <p className="text-lg text-gray-300 mb-10 max-w-xl leading-relaxed">
              Reliable door-to-door shipping across Nigeria and international delivery solutions. 
              Trust our experienced team for secure and efficient logistics.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-xl font-bold text-lg transition shadow-xl shadow-orange-500/20 active:scale-95">
                Track Shipment
              </button>
              <button className="bg-white/10 hover:bg-white/20 border border-white/20 px-8 py-4 rounded-xl font-bold text-lg transition backdrop-blur-sm">
                How it Works
              </button>
            </div>

            <div className="mt-16 grid grid-cols-4 gap-8">
              {stats.map((s, i) => (
                <div key={i}>
                  <div className="text-2xl font-bold text-orange-400">{s.value}</div>
                  <div className="text-xs text-gray-400 uppercase tracking-widest">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="z-10 flex justify-center lg:justify-end">
            <VoiceAgent />
          </div>
        </div>
      </section>

      {/* Core Services */}
      <section id="services" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-sm font-bold text-orange-500 uppercase tracking-[0.2em] mb-4">Our Expertise</h2>
          <h3 className="text-4xl font-extrabold text-[#0a192f] mb-16">Comprehensive Logistics Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((svc, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-2 group">
                <div className="text-5xl mb-6 grayscale group-hover:grayscale-0 transition-all">{svc.icon}</div>
                <h4 className="text-xl font-bold text-[#0a192f] mb-3">{svc.title}</h4>
                <p className="text-gray-600 leading-relaxed">{svc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
             <img src="https://picsum.photos/800/600?1" alt="Truck" className="rounded-3xl shadow-2xl" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-orange-500 uppercase tracking-[0.2em] mb-4">Why AB Logistics?</h2>
            <h3 className="text-4xl font-extrabold text-[#0a192f] mb-8">Trust in Every Mile</h3>
            <ul className="space-y-6">
              {[
                "Efficient delivery nationwide & globally",
                "Secure door-to-door delivery with signature confirmation",
                "Online real-time tracking + email updates",
                "Insurance options for high-value items",
                "Experienced logistics professionals handling every shipment"
              ].map((item, i) => (
                <li key={i} className="flex gap-4 items-start">
                  <div className="bg-orange-100 p-1 rounded-full text-orange-600">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  </div>
                  <span className="text-gray-700 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Rate Calculator */}
      <section id="rates" className="py-24 bg-[#0a192f] text-white">
        <div className="max-w-4xl mx-auto px-6 bg-white/5 rounded-3xl p-12 backdrop-blur-xl border border-white/10">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Calculate Shipping Rates</h3>
            <p className="text-gray-400">Get an instant estimate for your shipment</p>
          </div>
          <form onSubmit={calculateRate} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">From State</label>
              <select className="w-full bg-white/10 border border-white/20 rounded-lg p-3 outline-none focus:ring-2 focus:ring-orange-500">
                <option>Lagos</option>
                <option>Abuja</option>
                <option>Port Harcourt</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">To State</label>
              <select className="w-full bg-white/10 border border-white/20 rounded-lg p-3 outline-none focus:ring-2 focus:ring-orange-500">
                <option>Abuja</option>
                <option>Kano</option>
                <option>Ibadan</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Weight (KG)</label>
              <input 
                type="number" 
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="0.00" 
                className="w-full bg-white/10 border border-white/20 rounded-lg p-3 outline-none focus:ring-2 focus:ring-orange-500" 
              />
            </div>
            <div className="md:col-span-3">
              <button className="w-full bg-orange-500 py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition">
                Check Instant Price
              </button>
            </div>
          </form>
          {estimatedRate && (
            <div className="mt-8 p-6 bg-orange-500/20 border border-orange-500/30 rounded-xl text-center">
               <div className="text-gray-300">Estimated Shipping Cost</div>
               <div className="text-3xl font-bold text-orange-400">₦{estimatedRate.toLocaleString()}</div>
               <p className="text-xs text-gray-500 mt-2">*Prices are estimates. Final price confirmed on pickup.</p>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-sm font-bold text-orange-500 uppercase tracking-[0.2em] mb-4">Testimonials</h2>
          <h3 className="text-4xl font-extrabold text-[#0a192f] mb-16">What Our Clients Say</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "John Doe", role: "E-commerce Owner", text: "AB Logistics has transformed my business. Next-day delivery is a game changer in Nigeria!" },
              { name: "Sarah Williams", role: "Corporate Client", text: "Professionalism at its peak. Their international shipping rates are unbeatable." },
              { name: "Michael Obi", role: "Individual User", text: "Moved my entire house with their haulage service. Smooth and stress-free." },
            ].map((t, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm italic text-gray-700 relative">
                 <div className="text-orange-500 text-4xl mb-4">“</div>
                 <p className="mb-6 leading-relaxed">"{t.text}"</p>
                 <div className="flex items-center justify-center gap-3 not-italic">
                   <div className="w-10 h-10 rounded-full bg-gray-200" />
                   <div className="text-left">
                     <div className="font-bold text-[#0a192f]">{t.name}</div>
                     <div className="text-xs text-orange-500 font-bold uppercase">{t.role}</div>
                   </div>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-[#0a192f] text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center text-[#0a192f] font-bold text-sm">AB</div>
              <span className="text-xl font-extrabold tracking-tight">LOGISTICS</span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              Leading the way in Nigerian and international logistics since 2012. 
              We move the world, one parcel at a time.
            </p>
            <div className="flex gap-4">
              {['fb', 'tw', 'ig', 'li'].map(s => (
                <div key={s} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-orange-500 transition cursor-pointer">
                  <span className="text-xs uppercase font-bold">{s}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-6 border-l-4 border-orange-500 pl-4">Quick Links</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#" className="hover:text-white transition">Schedule Request</a></li>
              <li><a href="#" className="hover:text-white transition">Payments & Billing</a></li>
              <li><a href="#" className="hover:text-white transition">Track Order</a></li>
              <li><a href="#" className="hover:text-white transition">Partner With Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 border-l-4 border-orange-500 pl-4">Head Office</h4>
            <p className="text-gray-400 leading-relaxed">
              53 Muritala Muhammed Airport Way,<br />
              Ikeja, Lagos, Nigeria
            </p>
            <p className="mt-4 text-orange-400 font-bold">+234 704 614 5125</p>
          </div>
          <div>
            <h4 className="font-bold mb-6 border-l-4 border-orange-500 pl-4">Mobile Apps</h4>
            <p className="text-gray-400 text-sm mb-4">Coming soon to Play Store and App Store</p>
            <div className="space-y-3">
              <div className="bg-white/5 border border-white/10 rounded-lg p-3 flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded" />
                <div className="text-xs">Download on <br /><b>App Store</b></div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-3 flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded" />
                <div className="text-xs">Get it on <br /><b>Google Play</b></div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-10 border-t border-white/10 text-center text-gray-500 text-sm">
          © AB Logistics 2025. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default App;
