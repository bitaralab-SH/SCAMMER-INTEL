
import React, { useState } from 'react';
import RiskMeter from '../components/RiskMeter.tsx';
import { Icons } from '../constants.tsx';

const ProductCard: React.FC<{
  title: string;
  tagline: string;
  description: string;
  target: string;
  decision: string;
  sample: string;
}> = ({ title, tagline, description, target, decision, sample }) => (
  <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col h-full group">
    <div className="p-10 flex-grow">
      <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">{tagline}</div>
      <h3 className="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tighter">{title}</h3>
      <p className="text-slate-500 mb-8 leading-relaxed text-sm">{description}</p>
      
      <div className="space-y-6 pt-6 border-t border-slate-50">
        <div>
          <h4 className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Target Persona</h4>
          <p className="text-xs font-black text-slate-900">{target}</p>
        </div>
        <div>
          <h4 className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Decision Support</h4>
          <p className="text-xs font-black text-slate-900">{decision}</p>
        </div>
      </div>
    </div>
    <div className="bg-slate-900 p-8 font-mono text-[10px] leading-normal border-t border-slate-800">
      <div className="flex justify-between mb-4">
        <span className="text-slate-500 uppercase tracking-widest">API Endpoint v1.2</span>
        <span className="text-green-500 font-bold">● ONLINE</span>
      </div>
      <pre className="text-blue-100/90 overflow-x-auto whitespace-pre-wrap">
        {sample}
      </pre>
    </div>
  </div>
);

const Products: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Product Hero */}
      <section className="bg-white pt-24 pb-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-black text-slate-900 mb-6 tracking-tight uppercase">Risk Infrastructure</h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Data-as-a-Service (DaaS) designed for the modern fintech ecosystem. Choose the integration path that fits your risk management maturity.
          </p>
        </div>
      </section>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-3 gap-10">
          <ProductCard
            tagline="Low-Latency Integration"
            title="Validation API"
            description="Our primary REST interface for real-time scoring. Designed to be embedded directly into account creation and payment processing flows."
            target="Digital Banks & E-Wallets"
            decision="Is this account creation anomalous?"
            sample={`{
  "entity": "+6012xxxxxxx",
  "risk_score": 78,
  "confidence": 0.94,
  "signals": ["temporal_spike", "voip_detect"],
  "advisory": "BLOCK_TRANS"
}`}
          />
          <ProductCard
            tagline="Manual Intelligence"
            title="Risk Dashboard"
            description="A high-fidelity investigation portal for compliance teams. Provides visual breakdowns, historical trends, and signal explainability for manual reviews."
            target="Compliance & Fraud Ops"
            decision="Should this dispute be escalated?"
            sample={`{
  "case_id": "BIT-4491",
  "risk_tier": "CRITICAL",
  "report_count": 42,
  "last_activity": "2024-05-20T14:20Z",
  "status": "LOGGED"
}`}
          />
          <ProductCard
            tagline="Institutional Bulk Data"
            title="Enterprise Feeds"
            description="Synchronous delivery of high-risk intelligence delta. Perfect for institutions that maintain proprietary in-house machine learning risk models."
            target="Tier 1 Institutional Banks"
            decision="What global thresholds require adjustment?"
            sample={`{
  "batch_id": "B-9921",
  "delta_updates": 14201,
  "high_risk_additions": 412,
  "sync_interval": "15m",
  "auth": "institutional_key"
}`}
          />
        </div>
      </section>

      {/* Custom Solutions Section */}
      <section className="bg-slate-900 py-32 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-[150px] opacity-20 -mr-48 -mt-48"></div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-slate-400 text-xs font-bold uppercase tracking-widest">
            <Icons.Globe /> On-Premise & Private Cloud
          </div>
          <h2 className="text-4xl lg:text-5xl font-black mb-8 uppercase tracking-tighter">Enterprise Tailoring</h2>
          <p className="text-slate-400 max-w-xl mx-auto mb-12 text-base leading-relaxed">
            For global financial institutions with strict data sovereignty requirements, we offer private cloud deployments and custom API rate limits.
          </p>
          <button className="px-12 py-4 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-all uppercase tracking-widest shadow-xl">Speak to Solutions Engineering</button>
        </div>
      </section>
    </div>
  );
};

export default Products;
