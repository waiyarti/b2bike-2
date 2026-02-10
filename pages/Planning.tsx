
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Plus, Bike as BikeIcon, X, Info, LayoutGrid, Search, Filter } from 'lucide-react';
import { Bike, Client, Booking } from '../types';

interface PlanningProps {
  bikes: Bike[];
  clients: Client[];
  bookings: Booking[];
  setBookings: React.Dispatch<React.SetStateAction<Booking[]>>;
  setBikes: React.Dispatch<React.SetStateAction<Bike[]>>;
}

export const Planning: React.FC<PlanningProps> = ({ bikes, clients, bookings, setBookings, setBikes }) => {
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date());
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [searchFilter, setSearchFilter] = useState('');
  const [page, setPage] = useState(0);
  const PAGE_SIZE = 12;

  const filteredBikes = bikes.filter(b => b.id.toLowerCase().includes(searchFilter.toLowerCase()));
  const paginatedBikes = filteredBikes.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const weekDates = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(currentWeekStart);
    d.setDate(d.getDate() - d.getDay() + 1 + i);
    return d;
  });

  const formatDate = (date: Date) => date.toISOString().split('T')[0];

  const handleAddBooking = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const bikeId = formData.get('bikeId') as string;
    const type = formData.get('type') as 'Location' | 'Maintenance';

    const newBooking: Booking = {
      id: `BK-${Date.now().toString().slice(-4)}`,
      bikeId,
      clientId: formData.get('clientId') as string,
      startDate: formData.get('startDate') as string,
      duration: parseInt(formData.get('duration') as string),
      type
    };

    setBookings([...bookings, newBooking]);
    setAddModalOpen(false);
  };

  const getDayPosition = (dateStr: string) => {
    const date = new Date(dateStr);
    const startOfWeek = new Date(weekDates[0]);
    startOfWeek.setHours(0,0,0,0);
    const diffTime = date.getTime() - startOfWeek.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight uppercase italic text-teal-600">Planning Simplifié</h1>
          <p className="text-slate-500 font-medium">Visualisez l'occupation de votre flotte en un coup d'oeil.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input type="text" value={searchFilter} onChange={(e) => {setSearchFilter(e.target.value); setPage(0);}} placeholder="N° Vélo..." className="pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm w-48 focus:ring-2 focus:ring-teal-500 outline-none" />
          </div>
          <button onClick={() => setAddModalOpen(true)} className="flex items-center gap-2 bg-teal-600 text-white px-8 py-4 rounded-3xl font-black shadow-xl hover:scale-105 transition-all"><Plus size={20} /> Nouvelle Réserve</button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden flex flex-col">
        {/* Navigation Semaine */}
        <div className="grid grid-cols-8 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
          <div className="p-4 flex items-center justify-center border-r dark:border-slate-800">
            <div className="flex bg-white dark:bg-slate-900 rounded-xl p-1 shadow-sm border border-slate-100 dark:border-slate-700">
              <button onClick={() => setCurrentWeekStart(new Date(currentWeekStart.setDate(currentWeekStart.getDate() - 7)))} className="p-2 hover:bg-slate-100 rounded-lg transition-colors"><ChevronLeft size={20}/></button>
              <button onClick={() => setCurrentWeekStart(new Date(currentWeekStart.setDate(currentWeekStart.getDate() + 7)))} className="p-2 hover:bg-slate-100 rounded-lg transition-colors"><ChevronRight size={20}/></button>
            </div>
          </div>
          {weekDates.map((date, idx) => (
            <div key={idx} className={`p-5 text-center border-r dark:border-slate-800 last:border-0 ${formatDate(date) === formatDate(new Date()) ? 'bg-teal-600/10' : ''}`}>
              <p className="text-[10px] font-black uppercase text-slate-400 mb-1">{['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'][idx]}</p>
              <p className={`text-2xl font-black ${formatDate(date) === formatDate(new Date()) ? 'text-teal-600' : 'text-slate-900 dark:text-white'}`}>{date.getDate()}</p>
            </div>
          ))}
        </div>

        {/* Grille de vélos */}
        <div className="flex-1 min-h-[500px]">
          {paginatedBikes.length > 0 ? paginatedBikes.map((bike) => (
            <div key={bike.id} className="grid grid-cols-8 border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/20 h-20 relative group transition-colors">
              <div className="p-4 border-r dark:border-slate-800 flex flex-col items-center justify-center bg-slate-50/30 dark:bg-slate-800/10 shrink-0">
                <span className="font-mono text-[11px] font-black text-slate-800 dark:text-slate-200 uppercase">{bike.id}</span>
                <span className="text-[9px] font-bold text-slate-400 uppercase">{bike.type.split("'")[1] || bike.type}</span>
              </div>
              <div className="col-span-7 relative">
                {/* Lignes de fond pour la grille */}
                <div className="absolute inset-0 grid grid-cols-7 pointer-events-none opacity-20">
                  {Array.from({length: 7}).map((_, i) => <div key={i} className="border-r border-slate-300 dark:border-slate-700"></div>)}
                </div>
                
                {bookings.filter(b => b.bikeId === bike.id).map(booking => {
                  const startPos = getDayPosition(booking.startDate);
                  const displayWidth = Math.min(booking.duration, 7 - startPos);
                  
                  if (startPos > 6 || (startPos + booking.duration) < 0) return null;
                  
                  const safeStart = Math.max(0, startPos);
                  const safeWidth = Math.min(7 - safeStart, booking.duration + Math.min(0, startPos));

                  return (
                    <div 
                      key={booking.id} 
                      onClick={() => setSelectedBooking(booking)} 
                      className={`absolute top-3 bottom-3 rounded-2xl border-2 cursor-pointer z-20 flex items-center px-6 overflow-hidden shadow-lg transition-all hover:scale-[1.01] active:scale-95 ${booking.type === 'Location' ? 'bg-amber-500 border-amber-600 text-white' : 'bg-rose-500 border-rose-600 text-white'}`} 
                      style={{ 
                        left: `${(safeStart / 7) * 100 + 0.5}%`, 
                        width: `${(safeWidth / 7) * 100 - 1}%` 
                      }}
                    >
                      <span className="text-[11px] font-black uppercase truncate tracking-widest">
                        {booking.type === 'Location' ? clients.find(c => c.id === booking.clientId)?.name : 'MAINTENANCE SAV'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )) : <div className="p-20 text-center italic text-slate-400">Aucun vélo ne correspond à votre recherche.</div>}
        </div>
        
        {/* Pagination Bas de page */}
        <div className="p-8 bg-slate-50 dark:bg-slate-800 flex justify-between items-center">
          <div className="flex items-center gap-2"><Filter size={16} className="text-teal-600" /><span className="text-[11px] font-black text-slate-500 uppercase">Affichage : {paginatedBikes.length} / {filteredBikes.length} unités</span></div>
          <div className="flex gap-4 items-center">
            <button disabled={page === 0} onClick={() => setPage(page - 1)} className="px-6 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl font-bold disabled:opacity-30 hover:bg-slate-50">Précédent</button>
            <div className="px-4 py-2 bg-teal-600 text-white rounded-xl font-black text-sm">Page {page + 1}</div>
            <button disabled={(page + 1) * PAGE_SIZE >= filteredBikes.length} onClick={() => setPage(page + 1)} className="px-6 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl font-bold disabled:opacity-30 hover:bg-slate-50">Suivant</button>
          </div>
        </div>
      </div>
    </div>
  );
};
