
import React, { useState } from 'react';
import { Zap, Activity, ShieldCheck, CheckCircle2, Bike, Battery, Clock, X } from 'lucide-react';

export const Offers: React.FC = () => {
  const [selectedOffer, setSelectedOffer] = useState<any>(null);

  const offers = [
    {
      name: 'Flash', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-50', price: '190€',
      desc: 'Flexibilité maximale pour les tests ou besoins temporaires.',
      features: ['Engagement mensuel', 'Vélos L\'Active reconditionnés', 'Assistance 48h', 'Maintenance trimestrielle'],
      details: "L'offre Flash est conçue pour les organisations souhaitant tester la mobilité douce sans engagement long. Elle inclut des véhicules fiables avec une assistance de proximité sur Lille."
    },
    {
      name: 'Agilité', icon: Activity, color: 'text-teal-600', bg: 'bg-teal-50', price: '240€',
      desc: 'Le standard pour les trajets domicile-travail quotidiens.',
      features: ['Engagement 12 mois', 'Vélos Le Boost neufs', 'Assistance 24h', 'Maintenance mensuelle incluse', 'Assurance vol/casse'],
      details: "C'est notre offre la plus populaire. Elle permet d'équiper durablement vos collaborateurs avec du matériel haut de gamme (assistance électrique) et une sécurité totale grâce à l'assurance incluse."
    },
    {
      name: 'Sérénité', icon: ShieldCheck, color: 'text-indigo-600', bg: 'bg-indigo-50', price: '310€',
      desc: 'Zéro contrainte pour les flottes à usage intensif.',
      features: ['Engagement 24/36 mois', 'Matériel premium Le Boost / La Pure', 'Assistance Premium < 4h', 'Vélos de remplacement immédiat'],
      details: "Destinée aux collectivités et grandes entreprises, cette offre garantit une disponibilité à 100% de votre flotte. Nous nous occupons de tout, de la logistique à l'entretien hebdomadaire sur site."
    }
  ];

  return (
    <div className="space-y-12 pb-20">
      <div className="text-center max-w-2xl mx-auto"><h1 className="text-4xl font-black mb-4">Notre Grille de Services</h1><p className="text-slate-500 italic">Des solutions pensées pour la performance des entreprises du Nord.</p></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {offers.map((offer, idx) => (
          <div key={idx} className={`p-8 bg-white dark:bg-slate-900 border-2 rounded-[40px] shadow-xl hover:scale-105 transition-all flex flex-col ${idx === 1 ? 'border-teal-500' : 'border-slate-100 dark:border-slate-800'}`}>
            <div className={`p-4 rounded-3xl ${offer.bg} ${offer.color} w-fit mb-8`}><offer.icon size={32} /></div>
            <h3 className="text-3xl font-black mb-2">{offer.name}</h3>
            <p className="text-slate-400 text-sm mb-6 h-12">{offer.desc}</p>
            <div className="mb-8 font-black text-4xl">{offer.price}<span className="text-slate-400 font-bold text-sm ml-1">/mois HT</span></div>
            <div className="space-y-4 flex-1">
              {offer.features.map((f, i) => (<div key={i} className="flex items-center gap-3"><CheckCircle2 className="text-teal-500 shrink-0" size={18} /><span className="text-sm font-medium">{f}</span></div>))}
            </div>
            <button onClick={() => setSelectedOffer(offer)} className="mt-10 w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-teal-600 transition-colors">Voir les détails</button>
          </div>
        ))}
      </div>

      {selectedOffer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl p-8 shadow-2xl relative animate-in zoom-in">
             <button onClick={() => setSelectedOffer(null)} className="absolute top-6 right-6 p-2 bg-slate-100 rounded-full"><X size={20}/></button>
             <h2 className="text-3xl font-black text-teal-600 mb-4">Détails de l'offre {selectedOffer.name}</h2>
             <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-8">{selectedOffer.details}</p>
             <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-teal-50 rounded-2xl text-center"><Bike className="mx-auto text-teal-600 mb-2"/><p className="text-xs font-bold uppercase">Matériel</p><p className="text-sm font-bold">VTC/VAE Premium</p></div>
                <div className="p-4 bg-teal-50 rounded-2xl text-center"><Clock className="mx-auto text-teal-600 mb-2"/><p className="text-xs font-bold uppercase">Disponibilité</p><p className="text-sm font-bold">Garantie 99%</p></div>
             </div>
             <button onClick={() => setSelectedOffer(null)} className="mt-8 w-full py-4 bg-teal-600 text-white rounded-xl font-bold">Fermer</button>
          </div>
        </div>
      )}
    </div>
  );
};
