
import React from 'react';
import { Link } from 'react-router-dom';

const Pricing: React.FC = () => {
  return (
    <div className="bg-white min-h-screen pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-5xl font-black text-slate-900 mb-6 tracking-tight uppercase">Tiered Intelligence</h1>
          <p className="text-slate-500 text-lg">Scalable pricing models built for every stage of fintech growth.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              name: 'Starter',
              price: '$499',
              period: '/mo',
              desc: 'For emerging fintechs & SMEs.',
              features: ['5,000 Risk Inquiries', 'Web Dashboard Access', 'Shared Support', 'Weekly Batch Logs'],
              cta: 'Launch Sandbox',
              highlighted: false
            },
            {
              name: 'Professional',
              price: '$2,499',
              period: '/mo',
              desc: 'For high-volume marketplaces.',
              features: ['50,000 Risk Inquiries', 'API Key Management', '99.9% Uptime SLA', 'Dedicated Account Manager'],
              cta: 'Request API Key',
              highlighted: true
            },
            {
              name: 'Enterprise',
              price: 'Contact',
              period: 'Sales',
              desc: 'For Institutional Compliance.',
              features: ['Unlimited Scale', 'On-Premise Deployment', 'Private Cloud Hosting', '24/7 Crisis Support'],
              cta: 'Consult Solutions',
              highlighted: false
            }
          ].map((tier) => (
            <div key={tier.name} className={`relative flex flex-col p-10 rounded-[2.5rem] border-2 ${tier.highlighted ? 'border-blue-600 bg-slate-50 shadow-2xl' : 'border-slate-100'}`}>
              {tier.highlighted && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">Most Scalable</div>
              )}
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-widest mb-2">{tier.name}</h3>
              <p className="text-xs text-slate-400 font-medium mb-8">{tier.desc}</p>
              <div className="mb-10 flex items-baseline gap-1">
                <span className="text-4xl font-black text-slate-900 tracking-tighter">{tier.price}</span>
                <span className="text-sm font-bold text-slate-400 uppercase">{tier.period}</span>
              </div>
              <ul className="space-y-4 mb-12 flex-grow">
                {tier.features.map(f => (
                  <li key={f} className="flex items-center text-sm font-medium text-slate-600">
                    <svg className="h-5 w-5 text-blue-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/pilot"
                className={`w-full py-4 px-6 rounded-2xl text-center font-black uppercase tracking-widest text-xs transition-all ${tier.highlighted ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-xl shadow-blue-600/20' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-20 p-10 bg-slate-50 rounded-[2rem] border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="max-w-lg">
             <h4 className="text-xl font-black text-slate-900 uppercase mb-2">Usage-Based Overages</h4>
             <p className="text-sm text-slate-500 font-medium leading-relaxed">Exceeding your inquiry limit? Automated overages are billed at $0.05 per inquiry for Starter and $0.02 for Professional. Enterprise clients enjoy fixed-fee pooling.</p>
           </div>
           <div className="text-right">
             <div className="text-[10px] font-black text-slate-400 uppercase mb-1">Currency</div>
             <div className="text-lg font-black text-slate-900 uppercase">USD ($)</div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
