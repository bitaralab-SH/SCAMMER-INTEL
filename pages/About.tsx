
import React from 'react';
import { Icons } from '../constants.tsx';

const About: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Vision Hero */}
      <section className="bg-white py-32 border-b border-slate-100 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl lg:text-7xl font-black text-slate-900 mb-10 tracking-tighter uppercase leading-[0.9]">Quantifying Risk for a Digital Age.</h1>
            <p className="text-xl text-slate-500 leading-relaxed font-medium">
              BITARA LAB was founded on a simple premise: The digital economy cannot thrive without trust, and trust cannot exist without transparent, high-fidelity intelligence.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 p-20 opacity-5 grayscale">
           <Icons.Shield />
        </div>
      </section>

      {/* Our DNA */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid lg:grid-cols-2 gap-24">
              <div>
                <h2 className="text-3xl font-black text-slate-900 mb-8 uppercase tracking-widest border-b border-slate-100 pb-4">Our Methodology</h2>
                <p className="text-slate-600 mb-8 leading-relaxed">
                  Headquartered in Southeast Asia, BITARA LAB sits at the heart of the world's most dynamic fintech landscape. Our team of data scientists and compliance experts recognized that static blacklists were failing the institutions they were meant to protect.
                </p>
                <p className="text-slate-600 mb-12 leading-relaxed">
                  We built a <strong>probabilistic engine</strong> that treats risk as a variable index. By analyzing temporal clusters and network signatures, we provide the nuanced context needed to make informed decisions.
                </p>
                <div className="grid grid-cols-2 gap-6">
                   <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                      <div className="text-3xl font-black text-blue-600 mb-2">99.9%</div>
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Platform Uptime</div>
                   </div>
                   <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                      <div className="text-3xl font-black text-blue-600 mb-2">12.5M+</div>
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Daily Inquiries</div>
                   </div>
                </div>
              </div>
              <div className="space-y-12">
                 <div className="p-10 bg-slate-900 rounded-[3rem] text-white">
                    <h3 className="text-xl font-black mb-6 uppercase tracking-widest border-b border-white/10 pb-4">Our Values</h3>
                    <div className="space-y-8">
                       <div className="flex gap-4">
                          <div className="text-blue-500 font-black">01</div>
                          <div>
                             <h4 className="font-bold mb-1 uppercase tracking-tight">Neutrality</h4>
                             <p className="text-xs text-slate-400">We are a data partner, not a law enforcement body. We provide signals, not convictions.</p>
                          </div>
                       </div>
                       <div className="flex gap-4">
                          <div className="text-blue-500 font-black">02</div>
                          <div>
                             <h4 className="font-bold mb-1 uppercase tracking-tight">Transparency</h4>
                             <p className="text-xs text-slate-400">Risk shouldn't be a black box. Our "Confidence Index" explains the logic behind every score.</p>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Institutional CTA */}
      <section className="bg-blue-600 py-32 text-white text-center">
         <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-4xl lg:text-5xl font-black mb-8 tracking-tighter uppercase">Join the Integrity Network</h2>
            <p className="text-blue-100 text-lg mb-12 font-medium">Hundreds of institutions rely on BITARA LAB's risk intelligence to secure their operations. Connect with our enterprise team today.</p>
            <div className="flex justify-center gap-6">
               <button className="px-10 py-4 bg-white text-blue-600 font-black rounded-2xl hover:bg-blue-50 transition-all uppercase tracking-widest text-xs">Consult Solutions</button>
            </div>
         </div>
      </section>
    </div>
  );
};

export default About;
