
import { Bike, Client, Invoice, Booking, BikeType, BikeStatus } from './types';

const LILLE_CLIENTS: Omit<Client, 'id'>[] = [
  { name: 'Mairie de Lille', type: 'Collectivité', sector: 'Public', city: 'Lille', address: 'Place Augustin Laurent, 59000 Lille', siret: '21590350100017', contactName: 'M. Dumont', contactRole: 'DSI', email: 'transport@mairie-lille.fr', phone: '03 20 49 50 50', x: 45, y: 55 },
  { name: 'Decathlon Campus', type: 'Entreprise', sector: 'Sport', city: 'Villeneuve-d\'Ascq', address: '4 Bd de Mons, 59650 Villeneuve-d\'Ascq', siret: '30613890003058', contactName: 'Mme. Leclerc', contactRole: 'Responsable RSE', email: 'rse@decathlon.com', phone: '03 20 33 50 00', x: 80, y: 40 },
  { name: 'TechHub Roubaix', type: 'Entreprise', sector: 'Tech', city: 'Roubaix', address: '99 Rue du Chemin de Fer, 59100 Roubaix', siret: '82049581000012', contactName: 'Wail Yarti', contactRole: 'Fondateur', email: 'wail@techhub.rbx', phone: '06 12 34 56 78', x: 75, y: 20 },
  { name: 'EuraTechnologies', type: 'Entreprise', sector: 'Innovation', city: 'Lille', address: '165 Av. de Bretagne, 59000 Lille', siret: '51382490100015', contactName: 'Jade Chauvin', contactRole: 'Directrice Opérations', email: 'jade@euratech.fr', phone: '06 98 76 54 32', x: 25, y: 45 },
  { name: 'CHU Lille', type: 'Collectivité', sector: 'Santé', city: 'Lille', address: '2 Av. Oscar Lambret, 59000 Lille', siret: '26590671900017', contactName: 'Théo Vaast', contactRole: 'Logistique', email: 'theo@chulille.fr', phone: '03 20 44 59 62', x: 30, y: 75 },
  { name: 'Stade Pierre Mauroy', type: 'Entreprise', sector: 'Événementiel', city: 'Villeneuve-d\'Ascq', address: '261 Bd de Tournai, 59650 Villeneuve-d\'Ascq', siret: '51023456700019', contactName: 'Jean Dupont', contactRole: 'Stadium Manager', email: 'contact@stade-pm.com', phone: '03 20 12 34 56', x: 85, y: 50 },
  { name: 'Aéroport Lille-Lesquin', type: 'Entreprise', sector: 'Transport', city: 'Lesquin', address: 'Route de l\'Aéroport, 59810 Lesquin', siret: '44012345600021', contactName: 'Alice Martin', contactRole: 'Ops Manager', email: 'ops@lille.aeroport.fr', phone: '03 20 67 89 01', x: 60, y: 85 },
];

export const generateInitialData = () => {
  const clients: Client[] = LILLE_CLIENTS.map((c, i) => ({ ...c, id: `CLI-${100 + i}` }));
  
  const bikes: Bike[] = Array.from({ length: 250 }).map((_, i) => {
    const id = `VEL-${1001 + i}`;
    const rand = Math.random();
    let type: BikeType = "L'Active";
    if (rand > 0.4 && rand <= 0.8) type = "Le Boost";
    else if (rand > 0.8) type = "La Pure";

    const statusRand = Math.random();
    let status: BikeStatus = 'Disponible';
    let clientName = undefined;
    if (statusRand > 0.7 && statusRand <= 0.95) {
      status = 'Loué';
      clientName = clients[Math.floor(Math.random() * clients.length)].name;
    } else if (statusRand > 0.95) {
      status = 'En Maintenance';
    }

    return { id, type, status, clientName, batteryLevel: type !== "L'Active" ? Math.floor(Math.random() * 100) : undefined };
  });

  const invoices: Invoice[] = [
    { id: 'INV-2024-001', clientId: clients[1].id, clientName: clients[1].name, date: '2024-05-10', amount: 4500, type: 'invoice', status: 'paid', hasDelivery: true, items: [{ id: '1', model: "Le Boost", package: 'Sérénité', quantity: 10, price: 450 }] },
    { id: 'INV-2024-002', clientId: clients[3].id, clientName: clients[3].name, date: '2024-05-12', amount: 1200, type: 'invoice', status: 'pending', hasDelivery: false, items: [{ id: '1', model: "L'Active", package: 'Agilité', quantity: 5, price: 240 }] },
    { id: 'INV-2024-003', clientId: clients[4].id, clientName: clients[4].name, date: '2024-05-15', amount: 8400, type: 'invoice', status: 'paid', hasDelivery: true, items: [{ id: '1', model: "Le Boost", package: 'Sérénité', quantity: 20, price: 420 }] },
    { id: 'DEV-2024-004', clientId: clients[0].id, clientName: clients[0].name, date: '2024-05-18', amount: 3500, type: 'quote', status: 'pending', hasDelivery: true, items: [{ id: '1', model: "La Pure", package: 'Flash', quantity: 10, price: 350 }] },
    { id: 'INV-2024-005', clientId: clients[5].id, clientName: clients[5].name, date: '2024-05-20', amount: 2100, type: 'invoice', status: 'overdue', hasDelivery: false, items: [{ id: '1', model: "L'Active", package: 'Agilité', quantity: 10, price: 210 }] },
    { id: 'INV-2024-006', clientId: clients[6].id, clientName: clients[6].name, date: '2024-05-22', amount: 5600, type: 'invoice', status: 'paid', hasDelivery: true, items: [{ id: '1', model: "Le Boost", package: 'Sérénité', quantity: 12, price: 450 }] },
    { id: 'DEV-2024-007', clientId: clients[1].id, clientName: clients[1].name, date: '2024-05-25', amount: 12500, type: 'quote', status: 'pending', hasDelivery: true, items: [{ id: '1', model: "Le Boost", package: 'Sérénité', quantity: 25, price: 500 }] },
    { id: 'INV-2024-008', clientId: clients[2].id, clientName: clients[2].name, date: '2024-05-28', amount: 950, type: 'invoice', status: 'pending', hasDelivery: false, items: [{ id: '1', model: "La Pure", package: 'Agilité', quantity: 4, price: 237.5 }] },
  ];

  const bookings: Booking[] = [
    { id: 'BK-001', bikeId: 'VEL-1001', clientId: clients[0].id, startDate: '2024-05-20', duration: 7, type: 'Location' },
    { id: 'BK-002', bikeId: 'VEL-1050', clientId: clients[2].id, startDate: '2024-05-22', duration: 14, type: 'Location' },
    { id: 'BK-003', bikeId: 'VEL-1100', clientId: clients[1].id, startDate: '2024-06-01', duration: 30, type: 'Location' },
  ];

  return { clients, bikes, invoices, bookings };
};
