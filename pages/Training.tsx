
import React from 'react';
import { BookOpen, LayoutDashboard, Users, Bike, FileText, Calendar, Mail, CheckCircle2, Star, ArrowRight, Lightbulb } from 'lucide-react';

export const Training: React.FC = () => {
  const steps = [
    {
      num: "01",
      title: "Pilotage Stratégique",
      subtitle: "Le Dashboard",
      icon: LayoutDashboard,
      color: "from-teal-500 to-emerald-600",
      description: "C'est votre tour de contrôle. Vous y suivez la santé financière et l'impact écologique de la flotte.",
      points: ["Surveillez le CA HT en temps réel", "Vérifiez les alertes météo de la MEL", "Analysez les économies de CO2"]
    },
    {
      num: "02",
      title: "Gestion Relationnelle",
      subtitle: "CRM & Clients",
      icon: Users,
      color: "from-blue-500 to-indigo-600",
      description: "Apprenez à gérer nos partenaires. La carte interactive permet de visualiser notre emprise sur Lille.",
      points: ["Ajout de fiches SIRET conformes", "Calcul du Score Santé par l'IA", "Géo-localisation des dépôts"]
    },
    {
      num: "03",
      title: "Maintenance & Stock",
      subtitle: "La Flotte",
      icon: Bike,
      color: "from-violet-500 to-purple-600",
      description: "Le cœur technique. Chaque vélo est un actif précieux dont il faut suivre l'usure.",
      points: ["Checklist SAV assistée par IA", "Suivi des cycles de batterie", "Rotation des stocks Disponible/Loué"]
    },
    {
      num: "04",
      title: "Flux Financiers",
      subtitle: "Facturation",
      icon: FileText,
      color: "from-rose-500 to-orange-600",
      description: "La partie administrative. Générez des documents conformes en moins de 30 secondes.",
      points: ["Transformation Devis en Facture", "Export PDF haute définition (A4)", "Gestion des relances d'impayés"]
    }
  ];

  return (
    <div className="min-h-screen space-y-16 pb-24 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-[60px] bg-slate-900 text-white p-12 md:p-20 shadow-2xl">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-teal-500/20 to-transparent blur-3xl opacity-50"></div>
        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-teal-500/10 border border-teal-500/20 text-teal-400 rounded-full text-[10px] font-black uppercase tracking-[0.3em]">
            <Star size={12} fill="currentColor" /> Nouveau Collaborateur
          </div>
          <h1 className="text-6xl font-black italic tracking-tighter leading-none">
            PROGRAMME <br />
            <span className="text-teal-400">D'ONBOARDING</span>
          </h1>
          <p className="text-xl text-slate-400 font-medium leading-relaxed">
            Bienvenue chez B2Bike & Co. Ce parcours est conçu pour vous rendre autonome sur nos outils en moins de 2 heures. Suivez chaque étape pour maîtriser l'ERP.
          </p>
        </div>
      </section>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {steps.map((step, idx) => (
          <div key={idx} className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[50px] p-10 shadow-sm hover:shadow-2xl hover:border-teal-500/30 transition-all duration-500 overflow-hidden">
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-700 blur-2xl`}></div>
            <div className="flex items-start gap-8 relative z-10">
              <div className="flex flex-col items-center">
                <span className="text-4xl font-black text-slate-200 dark:text-slate-800 italic mb-4">{step.num}</span>
                <div className={`p-5 rounded-3xl bg-gradient-to-br ${step.color} text-white shadow-lg`}>
                  <step.icon size={36} />
                </div>
              </div>
              <div className="space-y-6 flex-1">
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-teal-600 mb-1">{step.subtitle}</h3>
                  <h2 className="text-3xl font-black text-slate-900 dark:text-white italic">{step.title}</h2>
                </div>
                <p className="text-slate-500 font-medium leading-relaxed">{step.description}</p>
                <div className="space-y-3">
                  {step.points.map((p, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm font-bold text-slate-700 dark:text-slate-300">
                      <CheckCircle2 size={18} className="text-teal-500 shrink-0" /> {p}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pro Tip Section */}
      <div className="bg-teal-50 dark:bg-teal-900/10 border border-teal-100 dark:border-teal-800 rounded-[50px] p-12 flex flex-col md:flex-row items-center gap-10">
        <div className="p-6 bg-white dark:bg-slate-900 rounded-full shadow-xl border border-teal-100 dark:border-teal-800">
          <Lightbulb size={48} className="text-teal-500 animate-pulse" />
        </div>
        <div className="flex-1 space-y-3">
          <h3 className="text-2xl font-black italic uppercase">Conseil d'Expert</h3>
          <p className="text-slate-600 dark:text-slate-400 font-medium text-lg leading-relaxed">
            N'oubliez pas d'utiliser l'IA Gemini intégrée. Elle peut analyser n'importe quel contrat ou diagnostic en un clic pour vous faire gagner un temps précieux.
          </p>
        </div>
      </div>

      {/* Help & Contact Section */}
      <section className="bg-slate-900 rounded-[60px] p-16 text-center space-y-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <h2 className="text-4xl font-black text-white italic uppercase">Besoin d'assistance ?</h2>
          <p className="text-slate-400 text-lg">
            Si une fonctionnalité vous semble complexe ou si vous rencontrez un bug, contactez directement l'administrateur technique.
          </p>
          <div className="pt-4 flex flex-col items-center gap-6">
            <a 
              href="mailto:wailyarti2005@gmail.com" 
              className="group flex items-center gap-4 px-12 py-6 bg-teal-600 hover:bg-teal-500 text-white rounded-[30px] font-black uppercase text-sm tracking-widest shadow-2xl shadow-teal-500/20 transition-all hover:scale-105 active:scale-95"
            >
              <Mail size={20} /> Me contacter par Email
              <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </a>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Réponse garantie sous 24h</p>
          </div>
        </div>
      </section>
    </div>
  );
};
