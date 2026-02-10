import React, { useState, useEffect, useMemo } from 'react';
import { 
  LayoutDashboard, Users, Bike as BikeIcon, FileText, 
  Calendar, ShieldCheck, Tag, Menu, Search, 
  Sun, Moon, BookOpen, X
} from 'lucide-react';
import { Logo } from './components/Logo';
import { Page, Bike, Client, Invoice, Booking } from './types';
import { generateInitialData } from './mockData';

import { Dashboard } from './pages/Dashboard';
import { Clients } from './pages/Clients';
import { Fleet } from './pages/Fleet';
import { Invoicing } from './pages/Invoicing';
import { Planning } from './pages/Planning';
import { Contracts } from './pages/Contracts';
import { Offers } from './pages/Offers';
import { Training } from './pages/Training';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Dashboard);
  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  
  const initialData = useMemo(() => generateInitialData(), []);
  const [clients, setClients] = useState<Client[]>(initialData.clients);
  const [bikes, setBikes] = useState<Bike[]>(initialData.bikes);
  const [invoices, setInvoices] = useState<Invoice[]>(initialData.invoices);
  const [bookings, setBookings] = useState<Booking[]>(initialData.bookings);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  const menuItems = [
    { id: Page.Dashboard, label: 'Tableau de bord', icon: LayoutDashboard },
    { id: Page.Clients, label: 'Clients (CRM)', icon: Users },
    { id: Page.Contracts, label: 'Contrats', icon: ShieldCheck },
    { id: Page.Fleet, label: 'Flotte', icon: BikeIcon },
    { id: Page.Invoices, label: 'Facturation', icon: FileText },
    { id: Page.Planning, label: 'Planning', icon: Calendar },
    { id: Page.Offers, label: 'Offres', icon: Tag },
    { id: Page.Training, label: 'Onboarding (Formation)', icon: BookOpen }
  ];

  return (
    <div className="h-screen w-full flex bg-[#F8FAFC] dark:bg-[#020617] text-slate-900 dark:text-slate-100 overflow-hidden font-sans">
      {/* Sidebar - Fixée à gauche sur Desktop, Overlay sur Mobile */}
      <aside 
        className={`no-print flex-shrink-0 z-50 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 ease-in-out
          ${isSidebarOpen ? 'w-80' : 'w-0 lg:w-20'} 
          fixed lg:relative inset-y-0 left-0 overflow-hidden flex flex-col`}
      >
        {/* Logo Section */}
        <div className="h-24 flex items-center justify-center border-b border-slate-100 dark:border-slate-800 shrink-0">
          <Logo className={`transition-all duration-300 ${isSidebarOpen ? 'h-12' : 'h-8 opacity-0 lg:opacity-100'}`} />
          {!isSidebarOpen && <button onClick={() => setSidebarOpen(true)} className="lg:hidden absolute top-6 right-6 p-2 text-teal-600"><Menu /></button>}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-8 px-4 space-y-1 custom-scrollbar">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 group relative
                ${currentPage === item.id 
                  ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/20' 
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
            >
              <item.icon size={22} className={currentPage === item.id ? 'text-white' : 'text-slate-400 group-hover:text-teal-500'} />
              {isSidebarOpen && (
                <span className="font-bold text-xs uppercase tracking-wider truncate">{item.label}</span>
              )}
              {currentPage === item.id && isSidebarOpen && (
                <div className="absolute right-4 w-1.5 h-1.5 bg-white rounded-full"></div>
              )}
            </button>
          ))}
        </nav>

        {/* Footer Sidebar / Profile */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 shrink-0">
          <div className={`flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 ${!isSidebarOpen && 'justify-center'}`}>
            <div className="w-10 h-10 rounded-xl border-2 border-white dark:border-slate-900 overflow-hidden shadow-md shrink-0">
              <img src="https://picsum.photos/seed/jade/100/100" className="w-full h-full object-cover" alt="Profile" />
            </div>
            {isSidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-black truncate uppercase italic">Admin Team</p>
                <p className="text-[9px] text-teal-600 font-black uppercase tracking-widest">En ligne</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Overlay Mobile */}
      {isSidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)} 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden transition-opacity"
        ></div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen relative bg-slate-50 dark:bg-[#020617]">
        {/* Header - Aligné sur le flux */}
        <header className="no-print h-20 flex items-center justify-between px-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setSidebarOpen(!isSidebarOpen)} 
              className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-500 hover:text-teal-600 transition-colors"
            >
              <Menu size={20} />
            </button>
            <div className="hidden md:flex items-center relative group">
              <Search className="absolute left-3.5 text-slate-400 group-focus-within:text-teal-600 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Recherche globale..." 
                className="pl-11 pr-6 py-2.5 bg-slate-100 dark:bg-slate-800 border-none rounded-xl w-72 text-sm font-medium focus:ring-2 focus:ring-teal-500/20 outline-none transition-all shadow-inner" 
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setDarkMode(!darkMode)} 
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 hover:text-teal-600 transition-all active:scale-95"
            >
              {darkMode ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} />}
            </button>
            <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-2"></div>
            <button className="flex items-center gap-3 pl-2 pr-4 py-1.5 bg-slate-900 dark:bg-slate-800 text-white rounded-xl font-bold uppercase text-[10px] tracking-widest hover:bg-slate-800 dark:hover:bg-slate-700 transition-all shadow-lg">
              <div className="w-7 h-7 rounded-lg bg-teal-600 flex items-center justify-center font-black">JS</div>
              PROFIL
            </button>
          </div>
        </header>

        {/* Scrollable Content Zone */}
        <main className="flex-1 overflow-y-auto custom-scrollbar p-8 lg:p-12">
          <div className="max-w-[1400px] mx-auto">
            {currentPage === Page.Dashboard && <Dashboard clients={clients} bikes={bikes} invoices={invoices} setCurrentPage={setCurrentPage} />}
            {currentPage === Page.Clients && <Clients clients={clients} setClients={setClients} />}
            {currentPage === Page.Fleet && <Fleet bikes={bikes} setBikes={setBikes} />}
            {currentPage === Page.Invoices && <Invoicing invoices={invoices} setInvoices={setInvoices} clients={clients} />}
            {currentPage === Page.Planning && <Planning bikes={bikes} clients={clients} bookings={bookings} setBookings={setBookings} setBikes={setBikes} />}
            {currentPage === Page.Contracts && <Contracts invoices={invoices} />}
            {currentPage === Page.Offers && <Offers />}
            {currentPage === Page.Training && <Training />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;