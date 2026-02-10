
import React, { useState } from 'react';
import { Users, MapPin, Building2, Landmark, Phone, Mail, FileText, Plus, X, Search, Sparkles, Activity, Trash2, Edit } from 'lucide-react';
import { Client } from '../types';
import { AIModal } from '../components/AIModal';

interface ClientsProps {
  clients: Client[];
  setClients: React.Dispatch<React.SetStateAction<Client[]>>;
}

export const Clients: React.FC<ClientsProps> = ({ clients, setClients }) => {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [aiModal, setAiModal] = useState<{ isOpen: boolean; title: string; type: 'satisfaction' } | null>(null);

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalCA = 125400; // Mock total CA

  const handleAddClient = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newClient: Client = {
      id: `CLI-${Date.now()}`,
      name: formData.get('name') as string,
      type: formData.get('type') as any,
      sector: formData.get('sector') as string,
      city: formData.get('city') as string,
      address: formData.get('address') as string,
      siret: formData.get('siret') as string,
      contactName: formData.get('contact') as string,
      contactRole: formData.get('role') as string || 'Responsable de compte',
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
    };
    setClients([...clients, newClient]);
    setAddModalOpen(false);
  };

  const deleteClient = (id: string) => {
    if (confirm("Voulez-vous vraiment supprimer ce client de la base B2Bike & Co ?")) {
      setClients(clients.filter(c => c.id !== id));
      setSelectedClient(null);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">CRM Clientèle</h1>
          <p className="text-slate-500 font-medium">Gestion et prospection des entreprises du Nord.</p>
        </div>
        <button onClick={() => setAddModalOpen(true)} className="flex items-center gap-2 bg-teal-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg hover:bg-teal-700 transition-all transform active:scale-95">
          <Plus size={20} /> Nouveau Client
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border flex items-center gap-4">
            <div className="p-3 bg-teal-50 text-teal-600 rounded-xl"><Users /></div>
            <div><p className="text-[10px] uppercase font-bold text-slate-400">Total Clients</p><p className="text-xl font-bold">{clients.length}</p></div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Building2 /></div>
            <div><p className="text-[10px] uppercase font-bold text-slate-400">Entreprises</p><p className="text-xl font-bold">{clients.filter(c => c.type === 'Entreprise').length}</p></div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border flex items-center gap-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl"><Landmark /></div>
            <div><p className="text-[10px] uppercase font-bold text-slate-400">Collectivités</p><p className="text-xl font-bold">{clients.filter(c => c.type === 'Collectivité').length}</p></div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border flex items-center gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><Activity /></div>
            <div><p className="text-[10px] uppercase font-bold text-slate-400">CA Cumulé</p><p className="text-xl font-bold">{totalCA.toLocaleString()}€</p></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-slate-900 rounded-3xl overflow-hidden relative border border-slate-800 shadow-2xl min-h-[500px]">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#14b8a6_1px,transparent_1px)] [background-size:20px_20px]"></div>
          <div className="absolute top-6 left-6 z-10 bg-slate-800/90 px-4 py-2 rounded-full text-white flex items-center gap-2 border border-slate-700 shadow-lg">
            <MapPin size={16} className="text-teal-400" /> <span className="text-xs font-bold uppercase tracking-tighter">Implantation Métropole Lilloise (59)</span>
          </div>
          {filteredClients.map((c) => (
            <button key={c.id} onClick={() => setSelectedClient(c)} className="absolute group transform hover:scale-110 transition-transform" style={{ left: `${c.x}%`, top: `${c.y}%` }}>
              <div className="p-2 rounded-full bg-teal-500 shadow-xl border-2 border-white"><Building2 size={16} className="text-white" /></div>
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 whitespace-nowrap shadow-2xl transition-all border border-teal-500">{c.name}</div>
            </button>
          ))}
        </div>

        <div className="lg:col-span-4 space-y-4">
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Chercher un client, ville..." className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-teal-500 shadow-sm" />
          </div>
          <div className="max-h-[500px] overflow-y-auto pr-2 space-y-3 custom-scrollbar">
            {filteredClients.length > 0 ? filteredClients.map((client) => (
              <div key={client.id} onClick={() => setSelectedClient(client)} className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl cursor-pointer hover:border-teal-500 group transition-all relative">
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${client.type === 'Entreprise' ? 'bg-blue-100 text-blue-700' : 'bg-indigo-100 text-indigo-700'}`}>{client.type}</span>
                  <div className="flex gap-2">
                    <button onClick={(e) => { e.stopPropagation(); deleteClient(client.id); }} className="text-slate-300 hover:text-rose-500 transition-colors"><Trash2 size={16} /></button>
                  </div>
                </div>
                <h3 className="font-bold text-slate-800 dark:text-slate-100">{client.name}</h3>
                <p className="text-xs text-slate-400 mt-1 flex items-center gap-1 font-medium"><MapPin size={12} />{client.city} • {client.sector}</p>
              </div>
            )) : <div className="text-center py-20 text-slate-400 italic">Aucun client trouvé pour cette recherche.</div>}
          </div>
        </div>
      </div>

      {/* MODALE DÉTAILS CLIENT */}
      {selectedClient && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-800 overflow-hidden relative">
            <button onClick={() => setSelectedClient(null)} className="absolute top-6 right-6 p-2 bg-white/20 text-white rounded-full hover:bg-white/40 z-10 transition-colors">
              <X size={20} />
            </button>
            <div className="bg-teal-600 p-8 flex justify-between items-start text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-20 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="flex gap-6 items-center relative z-10">
                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-teal-600 shadow-xl">{selectedClient.type === 'Entreprise' ? <Building2 size={40} /> : <Landmark size={40} />}</div>
                <div>
                    <h2 className="text-3xl font-bold">{selectedClient.name}</h2>
                    <p className="opacity-80 uppercase tracking-widest text-xs font-bold mt-1">{selectedClient.sector} • {selectedClient.city}</p>
                </div>
              </div>
            </div>
            <div className="p-8 grid grid-cols-2 gap-8">
              <div className="space-y-6">
                <div><label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">SIRET</label><p className="font-mono text-sm font-bold bg-slate-50 dark:bg-slate-800 p-2 rounded-lg mt-1">{selectedClient.siret}</p></div>
                <div><label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Coordonnées</label><p className="text-sm font-medium leading-relaxed">{selectedClient.address}</p></div>
                <div><label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Interlocuteur</label><p className="font-bold text-lg text-teal-600">{selectedClient.contactName}</p><p className="text-xs text-slate-500 font-medium">{selectedClient.contactRole}</p></div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl hover:bg-slate-100 transition-colors cursor-default"><Mail className="text-teal-500" size={18} /><span className="text-sm font-medium truncate">{selectedClient.email}</span></div>
                <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl hover:bg-slate-100 transition-colors cursor-default"><Phone className="text-teal-500" size={18} /><span className="text-sm font-medium">{selectedClient.phone}</span></div>
                <button onClick={() => setAiModal({ isOpen: true, title: 'Satisfaction Client (IA)', type: 'satisfaction' })} className="w-full flex items-center justify-center gap-2 py-4 bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-400 rounded-2xl font-bold text-sm hover:bg-teal-100 transition-colors border border-teal-100 dark:border-teal-800"><Activity size={18} /> Calculer le Score Santé</button>
              </div>
            </div>
            <div className="p-6 bg-slate-50 dark:bg-slate-800 flex justify-between items-center border-t dark:border-slate-700">
               <button onClick={() => deleteClient(selectedClient.id)} className="flex items-center gap-2 px-6 py-2 text-rose-500 font-bold hover:bg-rose-50 rounded-xl transition-colors"><Trash2 size={18} /> Supprimer la fiche</button>
               <button onClick={() => setSelectedClient(null)} className="px-8 py-2 bg-slate-900 text-white rounded-xl font-bold hover:opacity-90 transition-opacity">Fermer</button>
            </div>
          </div>
        </div>
      )}

      {/* MODALE AJOUT CLIENT */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in slide-in-from-bottom-8 duration-300">
          <div className="bg-white dark:bg-slate-900 w-full max-w-xl rounded-3xl shadow-2xl border border-slate-800 overflow-hidden relative">
            <button onClick={() => setAddModalOpen(false)} className="absolute top-6 right-6 p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-all"><X size={20}/></button>
            <div className="p-8 border-b dark:border-slate-800"><h3 className="font-bold text-2xl text-teal-600">Nouveau Partenaire B2B</h3><p className="text-slate-400 text-sm">Renseignez les informations légales et opérationnelles.</p></div>
            <form onSubmit={handleAddClient} className="p-8 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1"><label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Raison Sociale</label><input name="name" required className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-teal-500" /></div>
                <div className="space-y-1"><label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Secteur d'activité</label><input name="sector" required placeholder="Ex: Logistique" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-teal-500" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1"><label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Type</label><select name="type" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl outline-none border border-slate-200 dark:border-slate-700"><option value="Entreprise">Entreprise</option><option value="Collectivité">Collectivité</option></select></div>
                <div className="space-y-1"><label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">N° SIRET</label><input name="siret" required className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl" /></div>
              </div>
              <div className="space-y-1"><label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Adresse Siège</label><input name="address" required className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1"><label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ville</label><input name="city" required className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700" /></div>
                <div className="space-y-1"><label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Contact Référent</label><input name="contact" required className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1"><label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tél. Professionnel</label><input name="phone" required className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700" /></div>
                <div className="space-y-1"><label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email Facturation</label><input name="email" type="email" required className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700" /></div>
              </div>
              <div className="flex gap-4 pt-4">
                 <button type="button" onClick={() => setAddModalOpen(false)} className="flex-1 py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-colors">Annuler</button>
                 <button type="submit" className="flex-[2] py-4 bg-teal-600 text-white rounded-2xl font-bold shadow-lg shadow-teal-600/20 hover:bg-teal-700 transition-colors">Créer le compte</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {aiModal && <AIModal isOpen={aiModal.isOpen} onClose={() => setAiModal(null)} title={aiModal.title} type={aiModal.type} />}
    </div>
  );
};
