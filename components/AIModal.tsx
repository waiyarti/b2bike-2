
import React, { useState, useEffect } from 'react';
import { X, Sparkles, Loader2, Bot } from 'lucide-react';
import { runAISimulation } from '../services/geminiService';

interface AIModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  type: 'rse' | 'unpaid' | 'satisfaction' | 'diagnostic' | 'legal';
}

export const AIModal: React.FC<AIModalProps> = ({ isOpen, onClose, title, type }) => {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState('');

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      runAISimulation(type).then(res => {
        // Nettoyage radical de tout caractère Markdown ou IA
        const cleanedText = res
          .replace(/[#*`>_~-]/g, '') // Supprime les symboles MD
          .replace(/\n\s*\n/g, '\n\n') // Harmonise les espaces
          .trim();
        setContent(cleanedText);
        setLoading(false);
      });
    }
  }, [isOpen, type]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-300"
      onClick={onClose} // Fermeture par clic à l'extérieur
    >
      <div 
        className="bg-white dark:bg-slate-900 w-full max-w-2xl max-h-[90vh] rounded-[40px] shadow-2xl border border-teal-500/20 overflow-hidden flex flex-col animate-in zoom-in duration-300"
        onClick={(e) => e.stopPropagation()} // Empêche la fermeture au clic interne
      >
        {/* Header - Toujours visible */}
        <div className="bg-teal-600 p-8 flex justify-between items-center text-white shrink-0">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-white/20 rounded-xl"><Bot size={28} /></div>
            <h3 className="font-black text-2xl uppercase italic tracking-tight">{title}</h3>
          </div>
          <button 
            onClick={onClose} 
            className="p-3 bg-white/10 hover:bg-white/30 rounded-full transition-all border border-white/20"
            title="Fermer (Echap)"
          >
            <X size={28} />
          </button>
        </div>

        {/* Corps de la modale - Scrollable si texte long */}
        <div className="p-10 overflow-y-auto custom-scrollbar flex-1">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 gap-6 text-slate-500">
              <Loader2 className="animate-spin text-teal-500" size={60} />
              <div className="text-center">
                <p className="font-black uppercase text-xs tracking-[0.2em] mb-2">Analyse IA en cours</p>
                <p className="text-sm opacity-60">Synchronisation des données de la MEL...</p>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-10 rounded-[35px] border border-slate-100 dark:border-slate-800 shadow-inner">
                <p className="text-slate-700 dark:text-slate-100 leading-relaxed font-bold text-xl whitespace-pre-wrap italic">
                  "{content}"
                </p>
              </div>
              <div className="flex items-center gap-3 text-[10px] font-black uppercase text-teal-600 tracking-widest justify-end opacity-70">
                <Sparkles size={16} /> Rapport d'Intelligence Opérationnelle
              </div>
            </div>
          )}
        </div>

        {/* Footer - Toujours visible */}
        <div className="p-8 border-t border-slate-100 dark:border-slate-800 flex justify-end shrink-0 bg-white dark:bg-slate-900">
          <button 
            onClick={onClose} 
            className="px-12 py-5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-[25px] font-black uppercase text-sm hover:scale-105 active:scale-95 transition-all shadow-xl shadow-slate-900/20"
          >
            Quitter le rapport
          </button>
        </div>
      </div>
    </div>
  );
};
