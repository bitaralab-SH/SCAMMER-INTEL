
import React from 'react';

const Pilot: React.FC = () => {
  return (
    <div className="bg-white min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-24">
          <div>
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-widest">
              Limited Institutional Slots
            </div>
            <h1 className="text-5xl font-black text-slate-900 mb-8 tracking-tight uppercase">The 90-Day Pilot</h1>
            <p className="text-lg text-slate-600 mb-12 leading-relaxed">
              We offer a structured evaluation period for qualified enterprise partners. Benchmark BITARA LAB intelligence against your current fraud prevention metrics in a risk-free "Shadow Mode".
            </p>

            <div className="space-y-12">
              {[
                { phase: "Day 01-15", title: "Institutional Onboarding", desc: "Sandbox environment setup and API integration validation." },
                { phase: "Day 16-60", title: "Shadow Mode Trial", desc: "Real-time parallel scoring without impacting production decisions." },
                { phase: "Day 61-90", title: "Impact Assessment", desc: "Quantifying reduction in false positives and detection of missed signals." }
              ].map((step, i) => (
                <div key={i} className="flex gap-8 group">
                   <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-slate-900 text-white flex flex-col items-center justify-center font-black transition-transform group-hover:scale-105">
                     <div className="text-[10px] opacity-40 uppercase">Phase</div>
                     <div className="text-xl">0{i+1}</div>
                   </div>
                   <div>
                     <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">{step.phase}</div>
                     <h4 className="text-lg font-black text-slate-900 uppercase tracking-tight">{step.title}</h4>
                     <p className="text-sm text-slate-500 font-medium">{step.desc}</p>
                   </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 lg:mt-0">
            <div className="bg-slate-50 rounded-[3rem] p-12 border border-slate-200 shadow-xl sticky top-24">
              <h3 className="text-2xl font-black mb-8 uppercase tracking-tighter">Pilot Application</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                   <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">First Name</label>
                     <input type="text" className="w-full bg-white px-5 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none" placeholder="John" />
                   </div>
                   <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Last Name</label>
                     <input type="text" className="w-full bg-white px-5 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none" placeholder="Doe" />
                   </div>
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Work Email</label>
                   <input type="email" className="w-full bg-white px-5 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none" placeholder="j.doe@institution.com" />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Inquiry Volume</label>
                   <select className="w-full bg-white px-5 py-3 rounded-xl border border-slate-200 outline-none appearance-none">
                     <option>10k - 50k inquiries / mo</option>
                     <option>50k - 200k inquiries / mo</option>
                     <option>200k+ inquiries / mo</option>
                   </select>
                </div>
                <button type="button" className="w-full bg-slate-900 text-white font-black py-4 rounded-xl uppercase tracking-widest text-xs hover:bg-slate-800 transition-all shadow-xl">Apply for Evaluation</button>
                <p className="text-[9px] text-center text-slate-400 font-bold uppercase tracking-widest mt-6">
                  Requires authorized institutional credentials.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pilot;
