
import React from 'react';
import { ShieldCheck, FileText, Search, Download, AlertTriangle, Sparkles, Bike, Zap } from 'lucide-react';
import { Invoice } from '../types';

export const Contracts: React.FC<{ invoices: Invoice[] }> = ({ invoices }) => {
  const contracts = invoices.filter(i => i.type === 'invoice');

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div><h1 className="text-3xl font-bold">Base de Contrats</h1><p className="text-slate-500">Registre légal et engagements B2B actifs.</p></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><ShieldCheck size={24} /></div>
          <div><p className="text-[10px] font-bold text-slate-400 uppercase">Actifs</p><p className="text-xl font-bold">{contracts.length}</p></div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl"><AlertTriangle size={24} /></div>
          <div><p className="text-[10px] font-bold text-slate-400 uppercase">Alertes Renouvellement</p><p className="text-xl font-bold">2</p></div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Sparkles size={24} /></div>
          <div><p className="text-[10px] font-bold text-slate-400 uppercase">Audits IA réalisés</p><p className="text-xl font-bold">12</p></div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center">
          <h3 className="font-bold">Registre des engagements</h3>
          <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} /><input placeholder="Chercher un contrat..." className="pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-sm outline-none" /></div>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {contracts.map((c, idx) => (
            <div key={idx} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors group">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                  {idx % 2 === 0 ? <Bike size={24} /> : <Zap size={24} />}
                </div>
                <div>
                  <h4 className="font-bold">{c.clientName}</h4>
                  <p className="text-xs text-slate-400 font-mono">CONTRAT_{c.id}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                 <div className="text-right"><p className="text-[10px] font-bold text-slate-400 uppercase">Échéance</p><p className="text-sm font-bold">Janv. 2026</p></div>
                 <button className="p-2 text-slate-400 hover:text-teal-600"><Download size={20} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
