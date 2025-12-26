
import React from 'react';
import { Icons } from '../constants.tsx';

const Developers: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen pb-32">
      {/* Dev Hero */}
      <section className="bg-slate-900 pt-24 pb-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2">
                <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full bg-blue-600/20 text-blue-400 text-xs font-bold uppercase tracking-widest">
                  <Icons.Code /> REST API v1.2
                </div>
                <h1 className="text-5xl font-black mb-6 tracking-tight uppercase">Built for Scale</h1>
                <p className="text-slate-400 text-lg leading-relaxed mb-8">
                  Integrate probabilistic risk scoring into your payment flow in under 10 minutes. Standard REST principles with JWT authentication.
                </p>
                <div className="flex gap-4">
                  <button className="px-8 py-3 bg-blue-600 text-white font-black rounded-xl hover:bg-blue-700 uppercase tracking-widest text-xs">Read Docs</button>
                  <button className="px-8 py-3 border border-white/10 text-white font-black rounded-xl hover:bg-white/5 uppercase tracking-widest text-xs">Get Sandbox Key</button>
                </div>
              </div>
              <div className="lg:w-1/2 w-full">
                <div className="bg-slate-800 rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                   <div className="flex gap-2 p-4 bg-slate-900 border-b border-white/5">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                   </div>
                   <div className="p-8 font-mono text-sm leading-relaxed overflow-x-auto">
                     <div className="text-slate-500 mb-2"># Install CLI</div>
                     <div className="text-blue-400 mb-6">curl -s https://api.bitara.lab/install | sh</div>
                     <div className="text-slate-500 mb-2"># Run first risk inquiry</div>
                     <div className="text-green-400 mb-2">bitara validate --phone +60123456789</div>
                     <div className="text-white">Analyzing signals... [OK]</div>
                     <div className="text-red-400">RISK_SCORE: 82</div>
                   </div>
                </div>
              </div>
           </div>
        </div>
      </section>

      {/* API Specs */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="space-y-8">
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Core Specifications</h2>
            <div className="space-y-6">
              {[
                { title: "Standard REST", desc: "Predictable API design using standard HTTP status codes and JSON." },
                { title: "JWT Auth", desc: "Secure token-based authentication for institutional auditability." },
                { title: "150ms Latency", desc: "Optimized for sub-second responses even at peak traffic." }
              ].map(item => (
                <div key={item.title}>
                  <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                  <p className="text-xs text-slate-500 font-medium">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-12">
             <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200">
               <h3 className="text-xl font-black mb-6 uppercase tracking-widest border-b border-slate-100 pb-4">POST /v1/validate</h3>
               <p className="text-sm text-slate-500 mb-8 leading-relaxed">
                 The primary endpoint for real-time risk assessment. Use this for immediate decisioning during customer onboarding or transaction initiation.
               </p>
               <div className="bg-slate-50 rounded-2xl p-6 font-mono text-xs text-slate-700 border border-slate-200">
                 <div className="mb-4 font-bold text-blue-600">REQUEST BODY:</div>
                 <pre>{`{
  "type": "PHONE_NUMBER",
  "value": "+60123456789",
  "meta": {
    "merchant_id": "M_8821",
    "timestamp": "2024-05-20T14:20:00Z"
  }
}`}</pre>
               </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Developers;
