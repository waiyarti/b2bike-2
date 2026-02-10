
export type BikeType = "L'Active" | "Le Boost" | "La Pure";
export type BikeStatus = "Disponible" | "Loué" | "En Maintenance";

export interface Bike {
  id: string;
  type: BikeType;
  status: BikeStatus;
  clientName?: string;
  maintenanceReason?: string;
  batteryLevel?: number;
}

export interface Client {
  id: string;
  name: string;
  type: 'Entreprise' | 'Collectivité';
  sector: string;
  city: string;
  address: string;
  siret: string;
  contactName: string;
  contactRole: string;
  email: string;
  phone: string;
  x: number;
  y: number;
}

export interface Invoice {
  id: string;
  clientId: string;
  clientName: string;
  date: string;
  amount: number;
  type: 'quote' | 'invoice';
  status: 'pending' | 'paid' | 'overdue';
  items: InvoiceItem[];
  hasDelivery: boolean;
}

export interface InvoiceItem {
  id: string;
  model: BikeType;
  package: 'Flash' | 'Agilité' | 'Sérénité';
  quantity: number;
  price: number;
}

export interface Booking {
  id: string;
  bikeId: string;
  clientId: string;
  startDate: string;
  duration: number;
  type: 'Location' | 'Maintenance';
}

export enum Page {
  Dashboard = 'dashboard',
  Clients = 'clients',
  Contracts = 'contracts',
  Fleet = 'fleet',
  Invoices = 'invoices',
  Planning = 'planning',
  Offers = 'offers',
  Training = 'training'
}
