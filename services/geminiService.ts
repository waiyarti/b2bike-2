
import { GoogleGenAI } from "@google/genai";

const mockResponses: Record<string, string> = {
  rse: "L'impact RSE de B2Bike & Co pour ce trimestre est exemplaire. Grâce à vos 250 véhicules actifs, vous avez évité l'émission de 12.4 tonnes de CO2 dans la métropole lilloise. Le taux de recyclage de vos batteries atteint désormais 92%. Recommandation : Intégrer des pneus à base de gomme bio-sourcée pour le prochain lot de 'L'Active'.",
  unpaid: "Liste des relances prioritaires : 1. TechHub Roubaix (Facture F-2024-012, 45 jours de retard). 2. EuraTechnologies (Facture F-2024-025, 12 jours de retard). Modèle de relance suggéré : Bonjour Jade, nous avons remarqué un retard de paiement sur votre dernier relevé de location de flotte.",
  satisfaction: "Score de santé client : 88/100. Points forts : La réactivité de votre service technique est saluée par 90% des partenaires. Axe d'amélioration : Plusieurs clients suggèrent l'ajout de vélos-cargos électriques pour les livraisons légères en centre-ville de Lille.",
  diagnostic: "Diagnostic technique : Usure des plaquettes de freins à 75%. Tension de chaîne à ajuster. La batterie affiche 420 cycles, prévoyez un remplacement dans 6 mois pour maintenir l'autonomie nominale de 60km.",
  legal: "Analyse du contrat : Clause de responsabilité civile conforme aux normes 2024. Note : La franchise en cas de vol est fixée à 150€ par sinistre, ce qui est très compétitif pour le secteur."
};

export const runAISimulation = async (type: keyof typeof mockResponses): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  if (!process.env.API_KEY) return mockResponses[type];

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Rédige un rapport court, professionnel et sans aucun symbole de formatage (pas de #, pas de *, pas de tirets, pas de listes). Fais des paragraphes simples. Sujet : ${type}. ${mockResponses[type]}`
    });
    return response.text || mockResponses[type];
  } catch (error) {
    console.error("Gemini API Error:", error);
    return mockResponses[type];
  }
};
