import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, Bike, FileWarning, Leaf, CloudRain, PlusCircle, ArrowRight } from 'lucide-react';
import { Page, Bike as BikeType, Client, Invoice } from '../types';

interface DashboardProps {
  clients: Client[];
  bikes: BikeType[];
  invoices: Invoice[];
  setCurrentPage: (page: Page) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ clients, bikes, invoices, setCurrentPage }) => {
  const [co2Saved, setCo2Saved] = useState(1240.45);

  useEffect(() => {
    const timer = setInterval(() => setCo2Saved(prev => prev + 0.05), 2000);
    return () => clearInterval(timer);
  }, []);

  const totalCA = invoices.filter(i => i.type === 'invoice').reduce((acc, inv) => acc + inv.amount, 0);
  const pendingInvoices = invoices.filter(i => i.status === 'pending' || i.status === 'overdue').length;

  const stats = [
    { label: "Chiffre d'Affaires HT", value: `${totalCA.toLocaleString()}€`, icon: TrendingUp, color: 'text-teal-600', bg: 'from-teal-50 to-emerald-50 dark:from-teal-900/10 dark:to-emerald-900/10' },
    { label: 'Portefeuille Clients', value: clients.length.toString(), icon: Users, color: 'text-blue-600', bg: 'from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10' },
    { label: 'Actifs en circulation', value: bikes.filter(b => b.status === 'Loué').length.toString(), icon: Bike, color: 'text-indigo-600', bg: 'from-indigo-50 to-purple-50 dark:from-indigo-900/10 dark:to-purple-900/10' },
    { label: 'Alertes Facturation', value: pendingInvoices.toString(), icon: FileWarning, color: 'text-rose-600', bg: 'from-rose-50 to-orange-50 dark:from-rose-900/10 dark:to-orange-900/10' }
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Hero & Weather */}
      <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-10 border-b border-slate-200 dark:border-slate-800 pb-10">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-teal-600/10 text-teal-600 dark:text-teal-400 rounded-lg text-[10px] font-black uppercase tracking-widest border border-teal-600/20">
            <Activity size={12} className="animate-pulse" /> Live Monitoring
          </div>
          <h1 className="text-6xl font-black tracking-tighter italic text-slate-900 dark:text-white leading-[0.9]">
            CENTRE DE <br />
            <span className="text-teal-600">COMMANDES.</span>
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 font-medium max-w-lg italic">
            Intelligence opérationnelle B2Bike & Co dédiée à la mobilité douce en métropole lilloise.
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-5 p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl text-blue-600"><CloudRain size={28} /></div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">MEL Météo</p>
              <p className="text-xl font-black">14°C <span className="text-xs font-bold opacity-40 uppercase">Lille</span></p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl text-emerald-600"><Leaf size={28} /></div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Impact Éco</p>
              <p className="text-xl font-mono font-black text-emerald-600 tracking-tight">{co2Saved.toFixed(2)} <span className="text-[10px] font-bold uppercase">Kg CO2</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="relative group p-8 bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-teal-500/30 transition-all duration-300 overflow-hidden">
            <div className={`p-3.5 w-fit rounded-2xl bg-slate-50 dark:bg-slate-800 ${stat.color} mb-6 shadow-sm`}><stat.icon size={28} /></div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-3xl font-black italic tracking-tighter text-slate-900 dark:text-white leading-none">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Analytics & Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-slate-900 text-white p-10 rounded-[40px] shadow-2xl relative overflow-hidden group border border-slate-800">
          <div className="absolute inset-0 bg-[radial-gradient(#14b8a6_1px,transparent_1px)] [background-size:24px_24px] opacity-10"></div>
          <div className="flex justify-between items-center mb-10 relative z-10">
            <div>
              <h3 className="font-black text-2xl uppercase italic tracking-tighter">Growth Analytics</h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Projection trimestrielle</p>
            </div>
            <span className="text-[10px] font-black text-teal-400 bg-teal-400/10 px-4 py-2 rounded-full uppercase tracking-widest">+12.5% vs Q1</span>
          </div>
          <div className="h-64 flex items-end justify-between gap-4 relative z-10">
            {[45, 65, 55, 85, 70, 95].map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-4 group/bar">
                <div className="w-full bg-white/5 rounded-xl overflow-hidden relative group-hover/bar:bg-white/10 transition-colors" style={{ height: '100%' }}>
                  <div className="absolute bottom-0 left-0 w-full bg-teal-600 rounded-xl transition-all duration-1000" style={{ height: `${val}%` }}>
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent"></div>
                  </div>
                </div>
                <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">{['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin'][i]}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-6">
          <button onClick={() => setCurrentPage(Page.Invoices)} className="w-full flex items-center justify-between p-8 bg-teal-600 text-white rounded-[32px] shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-300 group relative overflow-hidden">
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex items-center gap-5 relative z-10">
              <div className="p-4 bg-white/20 rounded-2xl"><PlusCircle size={28} /></div>
              <div className="text-left">
                <p className="font-black text-xl italic uppercase tracking-tighter">Nouveau Devis</p>
                <p className="text-white/60 text-[9px] font-bold uppercase tracking-widest mt-1">Édition Instantanée</p>
              </div>
            </div>
            <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform opacity-50" />
          </button>
          
          <div className="p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[32px] shadow-sm space-y-8">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <h4 className="font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">Flux opérationnel</h4>
              <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></div>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                <p className="text-[11px] font-bold text-slate-600 dark:text-slate-300 leading-tight">
                  <span className="text-teal-600 font-black uppercase">Decathlon Campus</span> : Contrat validé pour 15 nouveaux modèles "Le Boost".
                </p>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                <p className="text-[11px] font-bold text-slate-600 dark:text-slate-300 leading-tight">
                  Alerte maintenance : 3 vélos signalés en anomalie au <span className="text-rose-600 font-black uppercase">CHU Lille</span>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Icône Activity manquante exportée proprement
const Activity = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);