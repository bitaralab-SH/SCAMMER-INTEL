
import React from 'react';
import { Icons } from '../constants.tsx';

const HowItWorks: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="bg-slate-900 py-24 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl lg:text-6xl font-black mb-6 tracking-tight">The Science of Probability</h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Scams are evolving too fast for binary blacklists. BITARA LAB uses signal-weighting and temporal analysis to quantify risk in real-time.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-32">
          {/* Methodology Grid */}
          <section className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-widest mb-6">
                <Icons.Database /> Phase 1: Signal Ingestion
              </div>
              <h2 className="text-3xl font-black mb-6 text-slate-900 uppercase tracking-tighter">Beyond Crowdsourcing</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Our engine ingests high-frequency data from diverse sources. We don't just look for "reports"; we analyze the metadata of the interaction.
              </p>
              <div className="space-y-4">
                {[
                  { title: "Network Signatures", desc: "Detection of VoIP origins, rapid SIM swapping, and automated dialing patterns." },
                  { title: "Temporal Clustering", desc: "Analysis of call bursts (±1hr) and geographic reporting density (7-day window)." },
                  { title: "Cross-Sector Sync", desc: "Correlating signals across banking, e-commerce, and telecommunications." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="font-black text-blue-600">0{i+1}</div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">{item.title}</h4>
                      <p className="text-xs text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-slate-50 rounded-[3rem] p-12 border border-slate-200 aspect-square flex flex-col justify-center items-center text-center">
               <div className="w-32 h-32 bg-blue-600/10 rounded-full flex items-center justify-center mb-8">
                  <Icons.Activity />
               </div>
               <h3 className="text-xl font-black mb-4 uppercase tracking-widest">Temporal Analysis</h3>
               <p className="text-sm text-slate-400 italic">"Time is the strongest signal. Scammers operate in high-velocity windows. We capture that velocity."</p>
            </div>
          </section>

          {/* Logic Step 2 */}
          <section className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-last lg:order-first bg-slate-900 rounded-[3rem] p-12 text-white h-full flex flex-col justify-center">
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                   <span className="text-xs font-bold text-slate-500 uppercase">Input Signal</span>
                   <span className="text-xs font-mono text-blue-400">0x4F92...</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                   <span className="text-xs font-bold text-slate-500 uppercase">Weightage Applied</span>
                   <span className="text-xs font-bold">+24.5% (Frequency Spike)</span>
                </div>
                <div className="flex justify-between items-center">
                   <span className="text-xs font-bold text-slate-500 uppercase">Probabilistic Score</span>
                   <span className="text-xl font-black text-red-500">82 / 100</span>
                </div>
              </div>
              <div className="mt-12 p-6 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-xs text-slate-400 leading-relaxed italic">"Our engine performs 12.5k calculations per millisecond to derive the final risk index."</p>
              </div>
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-[10px] font-bold uppercase tracking-widest mb-6">
                <Icons.Shield /> Phase 2: Weighting & Context
              </div>
              <h2 className="text-3xl font-black mb-6 text-slate-900 uppercase tracking-tighter">Probabilistic vs. Binary</h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                A "Scam" label is a liability. A "Risk Score" is an asset. We empower institutions to set their own thresholds based on their specific risk appetite.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-slate-50 rounded-2xl">
                  <div className="text-2xl font-black text-slate-900 mb-2">25%</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Volume Weight</div>
                </div>
                <div className="p-6 bg-slate-50 rounded-2xl">
                  <div className="text-2xl font-black text-slate-900 mb-2">20%</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Reporter Trust</div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Closing Notice */}
        <div className="mt-32 p-12 bg-blue-600 rounded-[3rem] text-white text-center">
          <h2 className="text-2xl font-black mb-4 uppercase tracking-widest">Institutional Integrity</h2>
          <p className="text-blue-100 max-w-2xl mx-auto text-sm leading-relaxed mb-8">
            All scoring events are recorded in an immutable audit trail for regulatory transparency. BITARA LAB does not participate in enforcement—we provide the intelligence that makes enforcement accurate.
          </p>
          <button className="px-8 py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-all uppercase tracking-widest text-xs">Download Whitepaper</button>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
