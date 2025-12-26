
import React from 'react';
import Home from './pages/Home.tsx';
import { Icons } from './constants.tsx';

const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center gap-2">
              <div className="w-8 h-8 bg-slate-900 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xl">B</span>
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900 uppercase">Bitara Lab</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-600 border border-green-100">
               <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
               <span className="text-[10px] font-black uppercase tracking-widest">Global Network Active</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Footer: React.FC = () => (
  <footer className="bg-slate-900 text-slate-400 py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-12">
        <div className="max-w-md">
          <div className="flex items-center gap-2 mb-6 text-white">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <span className="font-bold text-xl">B</span>
            </div>
            <span className="font-bold text-xl uppercase tracking-widest">Bitara Lab</span>
          </div>
          <p className="text-sm leading-relaxed mb-6 italic opacity-80">
            "Empowering collective defense through probabilistic signal quantification."
          </p>
          <div className="text-[10px] text-slate-500 border-l-2 border-slate-700 pl-4 uppercase tracking-widest font-black">
            Advisory Notice: BITARA LAB is a crowdsourced intelligence protocol. Reported identities and scores are probabilistic indicators. Final operational decisions are the responsibility of the user.
          </div>
        </div>
        <div className="flex flex-col gap-4 text-right items-end">
           <h4 className="text-white font-black text-[10px] uppercase tracking-[0.2em]">Operational Links</h4>
           <a 
              href="https://docs.google.com/spreadsheets/d/17kWihP5Zuy_4wvf614FlgO2aZJi7UfHsDIF6tUobajU/edit?usp=sharing" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs font-bold text-blue-400 hover:text-blue-300 uppercase tracking-widest"
           >
             View Global Audit Log (Sheet)
           </a>
           <div className="flex gap-4 mt-2">
             <Icons.Database />
             <Icons.Shield />
           </div>
        </div>
      </div>
      <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold uppercase tracking-widest">
        <p>&copy; {new Date().getFullYear()} BITARA LAB PROTOCOL. CROWDSOURCED INTELLIGENCE UNIT.</p>
        <div className="flex space-x-8 mt-4 md:mt-0 opacity-50">
          <span>Security Audit v1.4</span>
          <span>End-to-End Encryption</span>
        </div>
      </div>
    </div>
  </footer>
);

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-grow">
        <Home />
      </main>
      <Footer />
    </div>
  );
};

export default App;
