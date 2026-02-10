
import React, { useState } from 'react';
import { Bike, Search, Battery, PenTool, Sparkles, ChevronDown, Package, CheckCircle, Clock, Wrench } from 'lucide-react';
import { Bike as BikeType, BikeStatus } from '../types';
import { AIModal } from '../components/AIModal';

interface FleetProps {
  bikes: BikeType[];
  setBikes: React.Dispatch<React.SetStateAction<BikeType[]>>;
}

export const Fleet: React.FC<FleetProps> = ({ bikes }) => {
  const [search, setSearch] = useState('');
  const [aiModal, setAiModal] = useState<{ isOpen: boolean; title: string; type: 'diagnostic' } | null>(null);

  const filterByType = (type: string) => bikes.filter(b => b.type === type);
  const types = ["L'Active", "Le Boost", "La Pure"];

  const statsByType = types.map(type => {
    const list = filterByType(type);
    return {
      name: type,
      total: list.length,
      available: list.filter(b => b.status === 'Disponible').length,
      rented: list.filter(b => b.status === 'Loué').length,
      maintenance: list.filter(b => b.status === 'En Maintenance').length,
      ca: list.filter(b => b.status === 'Loué').length * (type === "L'Active" ? 350 : type === "Le Boost" ? 850 : 480) / 12,
    };
  });

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Gestion de la Flotte</h1>
          <p className="text-slate-500">Inventaire technique et taux de rotation du parc.</p>
        </div>
        <div className="flex gap-4">
           <div className="bg-white dark:bg-slate-900 border px-6 py-3 rounded-2xl shadow-sm text-center">
             <p className="text-[10px] font-bold text-slate-400 uppercase">Taux d'utilisation</p>
             <p className="text-xl font-bold text-teal-600">{Math.round((bikes.filter(b => b.status === 'Loué').length / bikes.length) * 100)}%</p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statsByType.map((s, i) => (
          <div key={i} className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-teal-50 text-teal-600 rounded-xl"><Package size={24} /></div>
              <div className="text-right">
                <p className="font-bold text-lg">{s.name}</p>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{s.total} unités</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-6 text-center">
              <div className="p-2 bg-emerald-50 rounded-xl"><p className="text-xs font-bold text-emerald-600">{s.available}</p><p className="text-[8px] uppercase font-bold text-emerald-400">Dispo</p></div>
              <div className="p-2 bg-blue-50 rounded-xl"><p className="text-xs font-bold text-blue-600">{s.rented}</p><p className="text-[8px] uppercase font-bold text-blue-400">Loués</p></div>
              <div className="p-2 bg-rose-50 rounded-xl"><p className="text-xs font-bold text-rose-600">{s.maintenance}</p><p className="text-[8px] uppercase font-bold text-rose-400">S.A.V</p></div>
            </div>
            <div className="pt-4 border-t flex justify-between items-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase">CA Mensuel Estimé</span>
              <span className="font-bold text-slate-900 dark:text-white">{Math.round(s.ca).toLocaleString()}€</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center">
          <h3 className="font-bold">Journal d'Inventaire</h3>
          <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} /><input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Chercher un ID..." className="pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-sm outline-none" /></div>
        </div>
        <div className="max-h-[400px] overflow-y-auto">
          <table className="w-full text-left">
            <thead className="sticky top-0 bg-slate-50 dark:bg-slate-800 text-[10px] font-bold uppercase text-slate-400 tracking-widest">
              <tr><th className="px-8 py-4">Véhicule</th><th className="px-8 py-4">Modèle</th><th className="px-8 py-4">Statut</th><th className="px-8 py-4">Localisation / Client</th><th className="px-8 py-4 text-right">Action</th></tr>
            </thead>
            <tbody className="divide-y">
              {bikes.filter(b => b.id.includes(search)).slice(0, 50).map((bike) => (
                <tr key={bike.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-8 py-4 font-mono font-bold text-xs">{bike.id}</td>
                  <td className="px-8 py-4 text-sm font-medium">{bike.type}</td>
                  <td className="px-8 py-4"><span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${bike.status === 'Disponible' ? 'bg-emerald-100 text-emerald-700' : bike.status === 'Loué' ? 'bg-blue-100 text-blue-700' : 'bg-rose-100 text-rose-700'}`}>{bike.status}</span></td>
                  <td className="px-8 py-4 text-sm text-slate-500">{bike.clientName || 'Entrepôt Lille (Euralille)'}</td>
                  <td className="px-8 py-4 text-right">
                    {bike.status === 'En Maintenance' ? <button onClick={() => setAiModal({ isOpen: true, title: `Checklist SAV - ${bike.id}`, type: 'diagnostic' })} className="p-2 bg-teal-50 text-teal-600 rounded-lg"><Sparkles size={16} /></button> : <button className="p-2 text-slate-400"><PenTool size={16} /></button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {aiModal && <AIModal isOpen={aiModal.isOpen} onClose={() => setAiModal(null)} title={aiModal.title} type={aiModal.type} />}
    </div>
  );
};
