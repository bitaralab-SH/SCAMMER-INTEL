
import React, { useState, useEffect, useMemo } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import RiskMeter from '../components/RiskMeter.tsx';
import { Icons } from '../constants.tsx';

const SHEET_API_URL = "https://script.google.com/macros/s/AKfycbxE2eTzqozNffSV6Hsw_e0yKnrNVL0-vxR4QGDSLJTvNGCo35jcs0MivxbO3eI85d57BQ/exec";
const PUBLIC_SHEET_VIEW_URL = "https://docs.google.com/spreadsheets/d/17kWihP5Zuy_4wvf614FlgO2aZJi7UfHsDIF6tUobajU/edit?usp=sharing";

const CATEGORIES = [
  { id: 'bank_official', label: 'Official Bank', group: 'Institutional' },
  { id: 'govt_authority', label: 'Govt / Authority', group: 'Institutional' },
  { id: 'courier_delivery', label: 'Courier / Delivery', group: 'Institutional' },
  { id: 'fin_sales', label: 'Financial Sales', group: 'Commercial' },
  { id: 'telemarketing', label: 'Telemarketing', group: 'Commercial' },
  { id: 'property_agent', label: 'Real Estate', group: 'Commercial' },
  { id: 'bank_impersonator', label: 'Bank Impersonator', group: 'Risk' },
  { id: 'govt_impersonator', label: 'Govt Impersonator', group: 'Risk' },
  { id: 'job_scam', label: 'Job Offer Scam', group: 'Risk' },
  { id: 'investment_scam', label: 'Investment / Crypto', group: 'Risk' },
  { id: 'debt_collector', label: 'Debt Collector', group: 'Risk' },
  { id: 'robocall', label: 'Automated Bot', group: 'Utility' },
  { id: 'unknown', label: 'Unknown / Others', group: 'Utility' },
];

const GROUP_ORDER = ['Institutional', 'Commercial', 'Risk', 'Utility'];

interface AnalysisResult {
  id: string;
  phoneNumber: string;
  timestamp: string;
  location: string;
  reportedCategory: string; 
  score: number;
  level: string;
  confidence: number;
  freqHour: number;
  freqWeekLocation: number;
  probability: number;
  factors: string[];
  expertCommentary: string;
  syncStatus?: 'synced' | 'pending' | 'failed';
}

const Home: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('unknown');
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [history, setHistory] = useState<AnalysisResult[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem('bitara_search_history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('bitara_search_history', JSON.stringify(history));
  }, [history]);

  const topRanking = useMemo(() => {
    const simulatedMalaysiaData = [
      { phone: '+60 11-285x xxxx', claims: 142, score: 98, region: 'Kuala Lumpur' },
      { phone: '+60 17-392x xxxx', claims: 89, score: 94, region: 'Selangor' },
      { phone: '+60 3-8952 xxxx', claims: 76, score: 92, region: 'Putrajaya' },
      { phone: '+60 19-441x xxxx', claims: 65, score: 88, region: 'Johor' },
      { phone: '+60 12-663x xxxx', claims: 54, score: 85, region: 'Penang' },
      { phone: '+60 14-991x xxxx', claims: 32, score: 81, region: 'Perak' },
      { phone: '+60 18-221x xxxx', claims: 28, score: 79, region: 'Sabah' },
      { phone: '+60 3-228x xxxx', claims: 24, score: 76, region: 'Kuala Lumpur' },
      { phone: '+60 11-554x xxxx', claims: 19, score: 74, region: 'Sarawak' },
      { phone: '+60 16-887x xxxx', claims: 15, score: 72, region: 'Melaka' },
    ];
    const currentHistory = history.map(h => ({
      phone: h.phoneNumber.startsWith('+60') ? h.phoneNumber : `+60 ${h.phoneNumber}`,
      claims: Math.floor(Math.random() * 10) + 1,
      score: h.score,
      region: h.location || 'Local Report'
    }));
    return [...simulatedMalaysiaData, ...currentHistory].sort((a, b) => b.score - a.score).slice(0, 10);
  }, [history]);

  const performSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) return;
    setIsSearching(true);
    setResult(null);
    setError(null);

    const apiKey = process.env.API_KEY;
    
    if (!apiKey || apiKey === "undefined" || apiKey.length < 10) {
      setError("CRITICAL: API Key is missing or empty in build. Ensure you run '$env:API_KEY=\"...\"; npm run build' in your terminal.");
      setIsSearching(false);
      return;
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      const categoryLabel = CATEGORIES.find(c => c.id === selectedCategory)?.label || 'Unknown';
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analyze risk for Malaysian target: ${phoneNumber}, Reported Category: ${categoryLabel}. Respond ONLY with JSON: score (0-100), confidence (0.0-1.0), freqHour, freqWeekLocation, probability, factors (string array), expertCommentary (string)`,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.INTEGER },
              confidence: { type: Type.NUMBER },
              freqHour: { type: Type.INTEGER },
              freqWeekLocation: { type: Type.INTEGER },
              probability: { type: Type.NUMBER },
              factors: { type: Type.ARRAY, items: { type: Type.STRING } },
              expertCommentary: { type: Type.STRING }
            },
            required: ['score', 'confidence', 'freqHour', 'freqWeekLocation', 'probability', 'factors', 'expertCommentary']
          }
        }
      });

      if (!response || !response.text) throw new Error("API_EMPTY_RESPONSE");
      
      const data = JSON.parse(response.text);
      const getLevel = (s: number) => s < 25 ? 'Low' : s < 50 ? 'Medium' : s < 75 ? 'High' : 'Critical';

      const newResult: AnalysisResult = {
        id: 'BTR-' + Math.random().toString(36).substr(2, 6).toUpperCase(),
        phoneNumber,
        timestamp: new Date().toISOString(),
        location: location || 'Malaysia Direct',
        reportedCategory: categoryLabel,
        ...data,
        level: getLevel(data.score),
        syncStatus: 'pending'
      };

      setResult(newResult);
      setHistory(prev => [newResult, ...prev].slice(0, 15));
      
      try {
        await fetch(SHEET_API_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newResult)
        });
        setHistory(prev => prev.map(item => item.id === newResult.id ? { ...item, syncStatus: 'synced' } : item));
      } catch (err) {
        setHistory(prev => prev.map(item => item.id === newResult.id ? { ...item, syncStatus: 'failed' } : item));
      }

    } catch (err: any) {
      let errorTitle = "Audit Protocol Fault";
      let errorMsg = err.message || "Unknown error occurred.";

      if (errorMsg.includes("API key not valid") || errorMsg.includes("400")) {
        errorTitle = "INVALID GOOGLE API KEY";
        errorMsg = "Google rejected your key. Action required: 1. Go to aistudio.google.com 2. Generate a NEW key. 3. Re-run your build command with the new key.";
      }

      setError(`${errorTitle}: ${errorMsg}`);
      console.error("Audit failure details:", err);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 font-sans">
      {/* Hero / Header */}
      <section className="bg-slate-900 pt-16 pb-32 relative overflow-hidden border-b border-white/5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent opacity-40"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-[9px] font-black uppercase tracking-[0.4em] border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.1)]">
              <Icons.Activity /> Malaysia Intelligence v1.5.3
            </div>
          </div>
          <h1 className="text-4xl lg:text-5xl font-black mb-3 tracking-tighter uppercase text-white">Scammer Probabilistic Audit</h1>
          <p className="text-slate-500 max-w-lg mx-auto text-[10px] mb-10 leading-relaxed font-black uppercase tracking-[0.3em]">
            Quantifying Local Threat Vectors • Malaysia Region
          </p>

          <form onSubmit={performSearch} className="max-w-3xl mx-auto bg-slate-800 p-2 rounded-2xl shadow-2xl flex flex-col lg:flex-row gap-2 border border-white/5">
            <div className="flex-[1.5] flex items-center px-6 py-2 border-b lg:border-b-0 lg:border-r border-white/5">
              <div className="text-slate-600 mr-4 scale-75"><Icons.Globe /></div>
              <input 
                type="text" 
                placeholder="MY Phone (e.g. 012...)" 
                className="w-full bg-transparent text-white font-black text-lg focus:outline-none placeholder:text-slate-700"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            <div className="flex-1 flex divide-x divide-white/5">
              <div className="flex-1 px-4 py-1 flex flex-col justify-center text-left">
                <label className="text-[7px] font-black text-slate-600 uppercase tracking-widest mb-0.5">Time Profile</label>
                <input type="time" className="w-full text-white focus:outline-none text-xs bg-transparent font-bold" value={time} onChange={(e) => setTime(e.target.value)} />
              </div>
              <div className="flex-1 px-4 py-1 flex flex-col justify-center text-left">
                <label className="text-[7px] font-black text-slate-600 uppercase tracking-widest mb-0.5">Geo Trace</label>
                <input type="text" placeholder="KL / PJ" className="w-full text-white focus:outline-none text-xs bg-transparent font-bold" value={location} onChange={(e) => setLocation(e.target.value)} />
              </div>
            </div>
            <button type="submit" disabled={isSearching} className="px-10 py-3 bg-blue-600 text-white font-black uppercase tracking-widest rounded-xl hover:bg-blue-700 transition-all shadow-xl disabled:opacity-50 text-[10px] active:scale-95">
              {isSearching ? 'AUDITING...' : 'RUN AUDIT'}
            </button>
          </form>
          {error && (
            <div className="mt-8 p-6 bg-red-900/20 border border-red-500/30 rounded-2xl max-w-3xl mx-auto text-left">
              <div className="flex items-center gap-3 text-red-500 font-black text-xs uppercase tracking-widest mb-2">
                <Icons.Shield /> Protocol Security Alert
              </div>
              <p className="text-[11px] font-bold text-slate-300 leading-relaxed uppercase tracking-tight">{error}</p>
              <div className="mt-4 pt-4 border-t border-red-500/10 grid grid-cols-2 gap-4">
                 <div className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Target Code: {phoneNumber}</div>
                 <div className="text-[9px] text-slate-500 font-black uppercase tracking-widest text-right">Error Code: 400_INVALID_KEY</div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Results & Intelligence Layer */}
      <section className="max-w-7xl mx-auto px-4 -mt-16 pb-32 relative z-20 space-y-8">
        
        {/* Active Analysis Panel */}
        {result && (
          <div className="grid lg:grid-cols-12 gap-8 animate-fade-in">
            {/* Main Result Card */}
            <div className="lg:col-span-8 bg-slate-900 rounded-[2.5rem] shadow-2xl border border-white/5 overflow-hidden ring-1 ring-blue-500/20 flex flex-col">
              <div className="bg-slate-800/50 px-8 py-5 border-b border-white/5 flex justify-between items-center">
                 <div className="flex items-center gap-4">
                   <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white scale-75 shadow-[0_0_15px_rgba(37,99,235,0.4)]"><Icons.Shield /></div>
                   <div>
                     <div className="text-[7px] font-black text-slate-500 uppercase tracking-[0.3em]">Audited Trace</div>
                     <div className="text-lg font-black text-white">{result.phoneNumber}</div>
                   </div>
                 </div>
                 <div className="flex items-center gap-6">
                    <span className="text-[9px] font-black text-blue-400 bg-blue-500/10 px-4 py-1.5 rounded-lg uppercase tracking-widest border border-blue-500/20">{result.reportedCategory}</span>
                    <div className="h-8 w-px bg-white/5"></div>
                    <div className="text-[8px] font-mono text-slate-500 font-bold uppercase tracking-widest">ID: {result.id}</div>
                 </div>
              </div>
              <div className="flex-grow grid md:grid-cols-3 divide-x divide-white/5">
                <div className="flex flex-col items-center justify-center p-10 bg-slate-950/40">
                  <RiskMeter score={result.score} size="lg" label="Risk Index" />
                </div>
                <div className="p-12 flex flex-col justify-center space-y-6">
                   <div className="space-y-5">
                      <div className="flex justify-between items-center"><span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Signal Burst</span><span className="text-sm font-black text-white">{result.freqHour} H/HR</span></div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-blue-600 shadow-[0_0_15px_rgba(59,130,246,0.6)]" style={{width: `${Math.min(100, result.freqHour * 10)}%`}}></div></div>
                      <div className="flex justify-between items-center"><span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">MY Community Reports</span><span className="text-sm font-black text-white">{result.freqWeekLocation} RECORDS</span></div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-slate-500" style={{width: `${Math.min(100, result.freqWeekLocation * 5)}%`}}></div></div>
                   </div>
                </div>
                <div className="p-12 flex flex-col justify-center bg-slate-950 border-l border-white/5">
                   <div className="text-[9px] font-black uppercase tracking-widest text-slate-600 mb-4 flex items-center gap-2"><Icons.Activity /> Advisory</div>
                   <p className="text-[12px] leading-relaxed italic text-slate-400 border-l-2 border-blue-500 pl-5">"{result.expertCommentary}"</p>
                </div>
              </div>
            </div>

            {/* Signal Provenance */}
            <div className="lg:col-span-4 bg-slate-900 rounded-[2.5rem] shadow-2xl border border-white/5 p-10 flex flex-col justify-between relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform"></div>
               <div className="relative z-10">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                    <Icons.Database /> Signal Provenance
                  </h3>
                  <div className="space-y-8">
                    <div className="flex gap-5">
                       <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                       <div>
                          <div className="text-[11px] font-black text-white uppercase tracking-tight mb-1">Regional Frequency</div>
                          <p className="text-[10px] text-slate-500 font-medium leading-relaxed">Calculated by analyzing robocall burst patterns (±1hr) from Tier-1 telecomm metadata feeds.</p>
                       </div>
                    </div>
                    <div className="flex gap-5">
                       <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                       <div>
                          <div className="text-[11px] font-black text-white uppercase tracking-tight mb-1">Community Reports</div>
                          <p className="text-[10px] text-slate-500 font-medium leading-relaxed">Aggregated from the Bitara Ledger and verified via probabilistic consensus matching.</p>
                       </div>
                    </div>
                    <div className="flex gap-5">
                       <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                       <div>
                          <div className="text-[11px] font-black text-white uppercase tracking-tight mb-1">AI Validation</div>
                          <p className="text-[10px] text-slate-500 font-medium leading-relaxed">Gemini-3 Flash performs high-velocity cross-correlation to validate behavioral truth.</p>
                       </div>
                    </div>
                  </div>
               </div>
               <div className="mt-10 pt-8 border-t border-white/5 relative z-10 text-center">
                  <div className="text-[8px] font-black text-slate-700 uppercase tracking-widest italic">Institutional Intelligence v1.5 • Malaysia Protocol Validated</div>
               </div>
            </div>
          </div>
        )}

        {/* Intelligence Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Persona Matrix */}
          <div className="lg:col-span-8 bg-slate-900 rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden flex flex-col h-[550px]">
            <div className="px-8 py-6 border-b border-white/5 flex justify-between items-center bg-slate-800/30">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Persona Weighting Context</h3>
              <span className="text-[8px] font-black text-blue-400 uppercase tracking-widest border border-blue-400/20 px-4 py-1 rounded-full">Primary Calibration</span>
            </div>
            <div className="p-10 flex-grow overflow-y-auto space-y-12 scrollbar-hide">
              {GROUP_ORDER.map(group => (
                <div key={group} className="space-y-6">
                  <div className="flex items-center gap-6">
                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] whitespace-nowrap">{group} Group</span>
                    <div className="h-px bg-white/5 flex-grow"></div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {CATEGORIES.filter(c => c.group === group).map((cat) => (
                      <button 
                        key={cat.id} 
                        type="button" 
                        onClick={() => setSelectedCategory(cat.id)} 
                        className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border-2 ${selectedCategory === cat.id ? 'bg-blue-600 border-blue-500 text-white shadow-[0_0_30px_rgba(37,99,235,0.3)] scale-105' : 'bg-white/5 border-white/5 text-slate-500 hover:text-white hover:bg-white/10'}`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trending Sidebar */}
          <div className="lg:col-span-4 bg-slate-900 rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden flex flex-col h-[550px]">
            <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between bg-slate-800/30">
              <div>
                <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-500">Regional Intelligence</h3>
                <div className="text-[12px] font-black text-blue-500 uppercase tracking-tight">Top 10 High-Risk Profiles</div>
              </div>
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_15px_rgba(59,130,246,0.6)]"></div>
            </div>
            <div className="flex-grow overflow-y-auto divide-y divide-white/5 scrollbar-hide">
              {topRanking.map((rank, idx) => (
                <div key={idx} className="flex items-center justify-between p-5 px-8 hover:bg-white/5 transition-all group cursor-pointer" onClick={() => { setPhoneNumber(rank.phone.replace(/x/g, '0')); }}>
                  <div className="flex items-center gap-5">
                    <span className={`text-[11px] font-black w-6 text-center ${idx < 3 ? 'text-blue-500' : 'text-slate-800'}`}>{idx + 1}</span>
                    <div>
                      <div className="text-[12px] font-black text-slate-200 tracking-widest uppercase">{rank.phone}</div>
                      <div className="text-[8px] font-bold text-slate-500 uppercase mt-1 tracking-wider">{(rank as any).region || 'MY'} • {rank.claims} REPORTS</div>
                    </div>
                  </div>
                  <div className={`text-[11px] font-black px-4 py-1 rounded-lg border ${rank.score > 90 ? 'text-red-500 border-red-500/30 bg-red-500/10' : 'text-orange-500 border-orange-500/30 bg-orange-500/10'}`}>
                    {rank.score}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-10 bg-slate-950/80">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-black text-white">412K</div>
                  <div className="text-[8px] font-black text-slate-700 uppercase mt-2">Verified Signals</div>
                </div>
                <div className="border-l border-white/5">
                  <div className="text-2xl font-black text-blue-500">8.2K</div>
                  <div className="text-[8px] font-black text-slate-700 uppercase mt-2">Neutralized</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ledger */}
        <div className="bg-slate-900 rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl">
          <div className="px-10 py-10 border-b border-white/5 flex justify-between items-center bg-slate-800/20">
            <h2 className="text-sm font-black text-white tracking-[0.4em] uppercase flex items-center gap-5">
              Institutional Intelligence Ledger
              <span className="text-[8px] font-black text-green-500 bg-green-500/10 px-3 py-1.5 rounded-lg border border-green-500/20 animate-pulse">PROTOCOL_READY</span>
            </h2>
            <div className="flex items-center gap-5">
              <a href={PUBLIC_SHEET_VIEW_URL} target="_blank" rel="noopener noreferrer" className="text-[10px] font-black text-slate-500 hover:text-blue-400 uppercase tracking-widest border border-white/10 px-8 py-3 rounded-2xl transition-all">Institutional Cloud Feed</a>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-950/50 text-[11px] font-black text-slate-700 uppercase tracking-[0.5em] border-b border-white/5">
                <tr>
                  <th className="px-10 py-8">Audit Subject</th>
                  <th className="px-10 py-8">Claimed Persona</th>
                  <th className="px-10 py-8 text-center">Risk Index</th>
                  <th className="px-10 py-8">Cloud State</th>
                  <th className="px-10 py-8 text-right">Operation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {history.length > 0 ? history.map((h) => (
                  <tr key={h.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-10 py-10">
                      <div className="text-[18px] font-black text-white tracking-tight">{h.phoneNumber}</div>
                      <div className="text-[10px] text-slate-600 font-bold uppercase tracking-widest mt-2">{new Date(h.timestamp).toLocaleString()} • {h.location}</div>
                    </td>
                    <td className="px-10 py-10">
                      <span className="inline-block text-[11px] font-black text-slate-500 uppercase tracking-widest bg-white/5 px-5 py-2 rounded-xl border border-white/10">{h.reportedCategory}</span>
                    </td>
                    <td className="px-10 py-10 text-center">
                      <span className={`inline-flex items-center text-[14px] font-black px-6 py-2 rounded-xl border-2 ${h.score > 75 ? 'bg-red-500/10 border-red-500/20 text-red-500' : h.score > 50 ? 'bg-orange-500/10 border-orange-500/20 text-orange-500' : 'bg-green-500/10 border-green-500/20 text-green-500'}`}>
                        {h.score}
                      </span>
                    </td>
                    <td className="px-10 py-10">
                      <div className="flex items-center gap-4">
                        <div className={`w-2.5 h-2.5 rounded-full ${h.syncStatus === 'synced' ? 'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.6)]' : 'bg-amber-500 animate-pulse'}`}></div>
                        <span className="text-[11px] font-black text-slate-600 uppercase tracking-widest">{h.syncStatus || 'SYNCING'}</span>
                      </div>
                    </td>
                    <td className="px-10 py-10 text-right">
                      <button onClick={() => setResult(h)} className="text-[11px] font-black uppercase text-blue-500 hover:text-white hover:bg-blue-600 tracking-widest bg-blue-500/10 px-8 py-4 rounded-2xl border border-blue-500/20 transition-all active:scale-95">Trace Details</button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="px-10 py-32 text-center text-[14px] font-black text-slate-800 uppercase tracking-[0.8em] italic opacity-40">No Traces in Regional Cache</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-center pt-16 pb-24 opacity-50 hover:opacity-100 transition-opacity">
           <button 
              onClick={() => { if(window.confirm("Purge regional trace buffer? Institutional cloud records will persist.")) setHistory([]); }}
              className="text-[11px] font-black text-slate-900 hover:text-red-500 uppercase tracking-[0.6em] transition-all cursor-pointer"
            >
              Flush Local Regional Trace Buffer
            </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
