import React, { useState } from 'react';
import { Plus, Download, FileText, Trash2, ArrowLeft, Truck, Save, Edit } from 'lucide-react';
import { Invoice, Client, InvoiceItem } from '../types';
import { Logo } from '../components/Logo';
import { createRoot } from 'react-dom/client';

interface InvoicingProps {
  invoices: Invoice[];
  setInvoices: React.Dispatch<React.SetStateAction<Invoice[]>>;
  clients: Client[];
}

// Composant dédié à l'impression, défini en dehors pour la stabilité
const InvoicePrintView: React.FC<{ doc: Invoice; clients: Client[] }> = ({ doc, clients }) => {
  const clientData = clients.find(c => c.id === doc.clientId);
  return (
    <div className="p-16 text-slate-900 bg-white min-h-screen font-sans">
      <div className="flex justify-between items-start border-b-4 border-teal-600 pb-12 mb-12">
        <div className="space-y-4">
          <Logo className="h-24" />
          <div className="text-sm space-y-1">
            <p className="font-black text-lg">B2Bike & Co France</p>
            <p>165 Avenue de Bretagne, Euratechnologies</p>
            <p>59000 Lille, France</p>
            <p>SIRET : 824 958 100 00012</p>
            <p>TVA : FR 45 824 958 100</p>
          </div>
        </div>
        <div className="text-right space-y-2">
          <h1 className="text-6xl font-black text-teal-600 uppercase mb-4">
            {doc.type === 'quote' ? 'Devis' : 'Facture'}
          </h1>
          <div className="bg-slate-100 p-4 rounded-xl inline-block">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Référence document</p>
            <p className="text-2xl font-black">{doc.id}</p>
          </div>
          <p className="text-slate-500 font-bold mt-4">Date d'émission : {doc.date}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-20 mb-16">
        <div className="space-y-4">
          <p className="text-xs font-bold text-teal-600 uppercase tracking-widest border-b border-teal-100 pb-2">Destinataire</p>
          <h3 className="text-3xl font-black">{doc.clientName}</h3>
          <div className="text-slate-600 space-y-1">
            <p>{clientData?.address || 'Adresse non renseignée'}</p>
            <p>{clientData?.city || 'Lille'}, France</p>
          </div>
        </div>
        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Conditions de règlement</p>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span>Délai de paiement</span><span className="font-bold">30 Jours nets</span></div>
            <div className="flex justify-between"><span>Mode de règlement</span><span className="font-bold">Virement Bancaire</span></div>
            <div className="flex justify-between"><span>IBAN</span><span className="font-mono font-bold">FR76 3000 6000 0123 4567 8901 234</span></div>
          </div>
        </div>
      </div>

      <table className="w-full mb-16 border-collapse">
        <thead>
          <tr className="bg-teal-600 text-white text-left text-xs uppercase font-bold tracking-widest">
            <th className="p-4 rounded-l-xl">Désignation des prestations</th>
            <th className="p-4 text-center">Qté</th>
            <th className="p-4 text-right">PU HT</th>
            <th className="p-4 text-right rounded-r-xl">Montant HT</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {doc.items.map((it, i) => (
            <tr key={i} className="border-b border-slate-100">
              <td className="p-6">
                <p className="font-black text-lg">Location Longue Durée : {it.model}</p>
                <p className="text-slate-500 italic">Pack de maintenance : {it.package}</p>
              </td>
              <td className="p-6 text-center font-bold">{it.quantity}</td>
              <td className="p-6 text-right">{it.price.toLocaleString()}€</td>
              <td className="p-6 text-right font-black">{(it.quantity * it.price).toLocaleString()}€</td>
            </tr>
          ))}
          {doc.hasDelivery && (
            <tr className="border-b border-slate-100 bg-teal-50/20">
              <td className="p-6 font-bold italic">Forfait Logistique : Livraison & Mise en service MEL</td>
              <td className="p-6 text-center">1</td>
              <td className="p-6 text-right">150€</td>
              <td className="p-6 text-right font-black">150€</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex justify-end mt-12">
        <div className="w-full max-w-sm space-y-4">
          <div className="flex justify-between text-slate-400 font-bold uppercase text-xs"><span>Total Hors Taxes</span><span className="text-slate-900">{doc.amount.toLocaleString()}€</span></div>
          <div className="flex justify-between text-slate-400 font-bold uppercase text-xs"><span>TVA (20%)</span><span className="text-slate-900">{(doc.amount * 0.2).toLocaleString()}€</span></div>
          <div className="flex justify-between items-center pt-6 border-t-4 border-teal-600">
            <span className="text-2xl font-black uppercase italic tracking-tighter">Total TTC</span>
            <span className="text-4xl font-black text-teal-600">{(doc.amount * 1.2).toLocaleString()}€</span>
          </div>
        </div>
      </div>

      <div className="mt-24 pt-8 border-t border-slate-100 text-[10px] text-slate-400 text-center uppercase tracking-[0.2em] font-bold">
        B2Bike & Co — Simplifier la mobilité urbaine — lille-metropole.b2bike.fr
      </div>
    </div>
  );
};

export const Invoicing: React.FC<InvoicingProps> = ({ invoices, setInvoices, clients }) => {
  const [activeTab, setActiveTab] = useState<'quotes' | 'invoices'>('quotes');
  const [isCreating, setIsCreating] = useState(false);
  const [editModeId, setEditModeId] = useState<string | null>(null);

  const [currentClient, setCurrentClient] = useState<Client | null>(null);
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([{ id: '1', model: "L'Active", package: 'Agilité', quantity: 5, price: 240 }]);
  const [delivery, setDelivery] = useState(false);

  const calculateTotal = () => invoiceItems.reduce((acc, item) => acc + (item.price * item.quantity), 0) + (delivery ? 150 : 0);

  const handleSave = () => {
    if (!currentClient) return alert('Veuillez sélectionner un client');
    
    const newDoc: Invoice = {
      id: editModeId || `${activeTab === 'quotes' ? 'DEV' : 'INV'}-2024-${Date.now().toString().slice(-4)}`,
      clientId: currentClient.id,
      clientName: currentClient.name,
      date: new Date().toISOString().split('T')[0],
      amount: calculateTotal(),
      type: activeTab === 'quotes' ? 'quote' : 'invoice',
      status: 'pending',
      items: [...invoiceItems],
      hasDelivery: delivery
    };

    if (editModeId) {
      setInvoices(invoices.map(inv => inv.id === editModeId ? newDoc : inv));
    } else {
      setInvoices([newDoc, ...invoices]);
    }

    setIsCreating(false);
    setEditModeId(null);
    resetForm();
  };

  const handleEdit = (inv: Invoice) => {
    setEditModeId(inv.id);
    setActiveTab(inv.type === 'quote' ? 'quotes' : 'invoices');
    setCurrentClient(clients.find(c => c.id === inv.clientId) || null);
    setInvoiceItems([...inv.items]);
    setDelivery(inv.hasDelivery);
    setIsCreating(true);
  };

  const resetForm = () => {
    setCurrentClient(null);
    setInvoiceItems([{ id: '1', model: "L'Active", package: 'Agilité', quantity: 5, price: 240 }]);
    setDelivery(false);
  };

  const handleExportPDF = (doc: Invoice) => {
    const printContainer = document.getElementById('invoice-root');
    if (!printContainer) return;

    // Nettoyage et rendu propre pour l'impression
    printContainer.innerHTML = '';
    const root = createRoot(printContainer);
    root.render(<InvoicePrintView doc={doc} clients={clients} />);
    
    // On attend un délai de sécurité pour que les images (Logo) et le texte soient rendus
    setTimeout(() => {
      window.print();
    }, 800);
  };

  const filteredDocs = invoices.filter(i => activeTab === 'quotes' ? i.type === 'quote' : i.type === 'invoice');

  if (isCreating) {
    return (
      <div className="flex flex-col h-[calc(100vh-140px)] animate-in slide-in-from-right-10 duration-500">
        <div className="flex items-center justify-between mb-8 shrink-0">
          <button onClick={() => { setIsCreating(false); setEditModeId(null); resetForm(); }} className="flex items-center gap-2 text-slate-500 font-bold hover:text-teal-600 transition-colors">
            <ArrowLeft size={20} /> Annuler l'édition
          </button>
          <button onClick={handleSave} className="px-10 py-4 bg-teal-600 text-white rounded-2xl font-black shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
            <Save size={20} /> {editModeId ? 'Mettre à jour' : 'Générer le document'}
          </button>
        </div>

        <div className="flex-1 flex gap-8 overflow-hidden">
          <div className="w-1/2 bg-white dark:bg-slate-900 rounded-[40px] border border-slate-200 dark:border-slate-800 p-8 overflow-y-auto space-y-8 no-print custom-scrollbar shadow-sm">
            <div className="space-y-2 border-b border-slate-100 dark:border-slate-800 pb-6">
              <h3 className="text-2xl font-black text-teal-600 italic uppercase">Paramètres du Document</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Configuration de l'offre commerciale</p>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Client partenaire</label>
                <select 
                  className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl outline-none focus:ring-4 focus:ring-teal-500/20 font-bold transition-all" 
                  onChange={(e) => setCurrentClient(clients.find(c => c.id === e.target.value) || null)} 
                  value={currentClient?.id || ''}
                >
                  <option value="">-- Sélectionner un partenaire MEL --</option>
                  {clients.map(c => <option key={c.id} value={c.id}>{c.name} ({c.city})</option>)}
                </select>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-slate-50 dark:border-slate-800 pb-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Postes de dépense</label>
                  <button onClick={() => setInvoiceItems([...invoiceItems, { id: Date.now().toString(), model: "L'Active", package: 'Agilité', quantity: 1, price: 240 }])} className="text-[10px] font-black text-teal-600 bg-teal-50 dark:bg-teal-900/20 px-4 py-2 rounded-xl hover:bg-teal-600 hover:text-white transition-all">+ AJOUTER UNE LIGNE</button>
                </div>
                {invoiceItems.map((item, idx) => (
                  <div key={item.id} className="grid grid-cols-12 gap-3 bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 items-center">
                    <div className="col-span-5">
                      <select className="w-full text-xs font-bold bg-white dark:bg-slate-900 border-none rounded-xl p-3 outline-none" value={item.model} onChange={(e) => { const n = [...invoiceItems]; n[idx].model = e.target.value as any; setInvoiceItems(n); }}>
                        <option value="L'Active">Modèle L'Active (VTC)</option>
                        <option value="Le Boost">Modèle Le Boost (VAE)</option>
                        <option value="La Pure">Modèle La Pure (Scooter)</option>
                      </select>
                    </div>
                    <div className="col-span-3">
                      <select className="w-full text-xs font-bold bg-white dark:bg-slate-900 border-none rounded-xl p-3 outline-none" value={item.package} onChange={(e) => { const n = [...invoiceItems]; n[idx].package = e.target.value as any; setInvoiceItems(n); }}>
                        <option value="Flash">Pack Flash</option>
                        <option value="Agilité">Pack Agilité</option>
                        <option value="Sérénité">Pack Sérénité</option>
                      </select>
                    </div>
                    <div className="col-span-2">
                      <input type="number" className="w-full text-xs font-black bg-white dark:bg-slate-900 border-none rounded-xl p-3 text-center outline-none" value={item.quantity} onChange={(e) => { const n = [...invoiceItems]; n[idx].quantity = parseInt(e.target.value) || 1; setInvoiceItems(n); }} />
                    </div>
                    <div className="col-span-2 flex justify-center items-center">
                      <button onClick={() => setInvoiceItems(invoiceItems.filter((_, i) => i !== idx))} className="text-rose-500 hover:scale-125 transition-transform"><Trash2 size={20}/></button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between p-6 bg-teal-50 dark:bg-teal-950/30 rounded-3xl border border-teal-100 dark:border-teal-900 group cursor-pointer" onClick={() => setDelivery(!delivery)}>
                <div className="flex items-center gap-4"><Truck className="text-teal-600" size={24} /><span className="text-sm font-black uppercase italic tracking-tighter">Frais de livraison & Mise en service (+150€)</span></div>
                <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${delivery ? 'bg-teal-600 border-teal-600' : 'border-slate-300'}`}>
                  {delivery && <Plus size={16} className="text-white rotate-45" />}
                </div>
              </div>
            </div>
          </div>

          <div className="w-1/2 flex justify-center bg-slate-100 dark:bg-slate-950 p-8 overflow-y-auto no-print custom-scrollbar">
            <div className="w-[210mm] min-h-[297mm] bg-white text-slate-900 p-[15mm] shadow-2xl origin-top scale-[0.7] md:scale-[0.8] flex flex-col border border-slate-300 rounded-sm">
               <div className="flex justify-between items-start border-b-2 border-teal-600 pb-6 mb-8">
                  <Logo className="h-12" />
                  <div className="text-right">
                    <h2 className="text-2xl font-black text-teal-600 uppercase italic">Aperçu {activeTab === 'quotes' ? 'Devis' : 'Facture'}</h2>
                  </div>
               </div>
               <div className="mb-8">
                 <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Destinataire</p>
                 <h3 className="text-xl font-black">{currentClient?.name || 'SÉLECTIONNER UN CLIENT...'}</h3>
                 <p className="text-xs text-slate-500">{currentClient?.address} {currentClient?.city}</p>
               </div>
               <table className="w-full mb-10 text-[10px]">
                 <thead className="bg-slate-50"><tr className="font-black uppercase"><th className="p-3 text-left">Description</th><th className="p-3 text-center">Qté</th><th className="p-3 text-right">Total HT</th></tr></thead>
                 <tbody className="divide-y divide-slate-100 italic">
                   {invoiceItems.map((it, i) => <tr key={i}><td className="p-3 font-bold">{it.model} ({it.package})</td><td className="p-3 text-center">{it.quantity}</td><td className="p-3 text-right">{(it.quantity * it.price).toLocaleString()}€</td></tr>)}
                   {delivery && <tr><td className="p-3 font-bold">Forfait Livraison</td><td className="p-3 text-center">1</td><td className="p-3 text-right">150€</td></tr>}
                 </tbody>
               </table>
               <div className="mt-auto pt-4 border-t-2 border-slate-100 text-right">
                  <p className="text-[10px] font-black text-slate-400 uppercase">Montant total à régler TTC</p>
                  <p className="text-4xl font-black text-teal-600">{(calculateTotal() * 1.2).toLocaleString()}€</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white uppercase italic">Docs Commerciaux</h1>
          <p className="text-slate-500 font-medium mt-1">Édition, suivi et export des factures & devis.</p>
        </div>
        <button onClick={() => { setIsCreating(true); setEditModeId(null); resetForm(); }} className="flex items-center gap-3 bg-teal-600 text-white px-10 py-5 rounded-2xl font-black shadow-2xl hover:scale-105 active:scale-95 transition-all">
          <Plus size={24} /> NOUVEAU DOCUMENT
        </button>
      </div>

      <div className="flex bg-white dark:bg-slate-900 rounded-2xl p-2 gap-2 shadow-sm border border-slate-200 dark:border-slate-800">
        <button onClick={() => setActiveTab('quotes')} className={`flex-1 py-4 font-black rounded-xl transition-all uppercase tracking-tighter text-sm italic ${activeTab === 'quotes' ? 'bg-teal-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>Base Devis</button>
        <button onClick={() => setActiveTab('invoices')} className={`flex-1 py-4 font-black rounded-xl transition-all uppercase tracking-tighter text-sm italic ${activeTab === 'invoices' ? 'bg-teal-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>Base Factures</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDocs.length > 0 ? filteredDocs.map((doc) => (
          <div key={doc.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-[40px] shadow-sm hover:border-teal-500 hover:shadow-xl transition-all group relative overflow-hidden">
             <div className="flex justify-between items-start mb-6">
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl group-hover:bg-teal-50 dark:group-hover:bg-teal-900/20 transition-colors">
                  <FileText className="text-teal-600" size={24} />
                </div>
                <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${
                  doc.status === 'paid' ? 'bg-emerald-100 text-emerald-700' : 
                  doc.status === 'overdue' ? 'bg-rose-100 text-rose-700' : 
                  'bg-amber-100 text-amber-700'
                }`}>
                  {doc.status === 'paid' ? 'Payée' : doc.status === 'overdue' ? 'En retard' : 'Attente'}
                </div>
             </div>
             
             <div className="space-y-1 mb-8">
               <p className="text-[10px] font-mono font-black text-slate-400 tracking-widest">{doc.id}</p>
               <h3 className="text-xl font-black text-slate-900 dark:text-white truncate uppercase italic leading-tight">{doc.clientName}</h3>
               <p className="text-[10px] font-bold text-slate-400 uppercase">{doc.date}</p>
             </div>

             <div className="flex items-center justify-between pt-6 border-t border-slate-50 dark:border-slate-800">
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Total document</p>
                  <p className="text-2xl font-black text-slate-900 dark:text-white italic">{(doc.amount * 1.2).toLocaleString()}€ <span className="text-[10px] font-normal opacity-50 not-italic">TTC</span></p>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => handleEdit(doc)} title="Modifier" className="p-3 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl hover:bg-teal-600 hover:text-white transition-all"><Edit size={18}/></button>
                    <button onClick={() => handleExportPDF(doc)} title="Imprimer / PDF" className="p-3 bg-teal-600 text-white rounded-xl hover:scale-110 active:scale-90 transition-all shadow-lg shadow-teal-500/20"><Download size={18}/></button>
                </div>
             </div>
          </div>
        )) : (
          <div className="col-span-full py-20 text-center space-y-4">
             <div className="p-6 bg-slate-100 dark:bg-slate-900 rounded-full w-fit mx-auto opacity-50"><FileText size={48} /></div>
             <p className="text-slate-400 font-bold uppercase italic tracking-widest">Aucun document dans cette base</p>
          </div>
        )}
      </div>
    </div>
  );
};