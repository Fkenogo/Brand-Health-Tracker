
import React, { useState, useEffect, useCallback } from 'react';
import { getResponses } from '../utils/storage';
import { exportToCSV } from '../utils/export';
import { CountryCode, Language } from '../types';
import { fetchDashboardMetrics, fetchCompetitorData, fetchNPSDrivers, DashboardMetrics, CompetitorData, NPSDriver } from '../utils/api';
import { ArrowLeft, Download, Zap, Globe, BarChart, Check, Loader2, Lock, TrendingUp, TrendingDown, Target as TargetIcon, Activity, Users, Languages, SlidersHorizontal, Share2, ChevronDown } from 'lucide-react';
import { BANKS, AGE_CHOICES, COUNTRY_THEMES, COUNTRY_CHOICES, UI_STRINGS } from '../constants';

interface AdminDashboardProps {
  onBack: () => void;
  lang: Language;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBack, lang: initialLang }) => {
  const [lang, setLang] = useState<Language>(initialLang);
  const [activeCountry, setActiveCountry] = useState<CountryCode>('rwanda');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState(false);
  const [selectedBankId, setSelectedBankId] = useState<string>('');
  const [currentTab, setCurrentTab] = useState('Overview');
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<DashboardMetrics | null>(null);
  const [competitorData, setCompetitorData] = useState<CompetitorData[]>([]);
  const [npsDrivers, setNpsDrivers] = useState<NPSDriver[]>([]);

  const theme = COUNTRY_THEMES[activeCountry];
  const s = UI_STRINGS.admin;

  const toggleLang = () => setLang(l => l === 'en' ? 'rw' : l === 'rw' ? 'fr' : 'en');

  useEffect(() => {
    const cb = BANKS.filter(b => b.country === activeCountry);
    if (cb.length > 0) setSelectedBankId(cb[0].id);
  }, [activeCountry]);

  const load = useCallback(async () => {
    if (!selectedBankId) return;
    setLoading(true);
    const [m, c, d] = await Promise.all([
      fetchDashboardMetrics(selectedBankId, { country: activeCountry }),
      fetchCompetitorData(),
      fetchNPSDrivers(selectedBankId)
    ]);
    setDashboardData(m);
    setCompetitorData(c.filter(comp => comp.id.includes(activeCountry === 'rwanda' ? '_RW' : activeCountry === 'uganda' ? '_UG' : '_BI')));
    setNpsDrivers(d);
    setLoading(false);
  }, [selectedBankId, activeCountry]);

  useEffect(() => { if (isAuthenticated) load(); }, [isAuthenticated, load]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-6">
        <div className="glass-card p-10 rounded-[40px] w-full max-w-md text-center">
          <Lock size={48} className="text-blue-500 mx-auto mb-6" />
          <h1 className="text-2xl font-black mb-2">{s.authTitle[lang]}</h1>
          <p className="text-slate-500 mb-8 uppercase text-[10px] tracking-widest">{s.authDesc[lang]}</p>
          <form onSubmit={(e) => { e.preventDefault(); if(password==='admin2026') setIsAuthenticated(true); else setAuthError(true); }}>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className={`w-full h-14 bg-white/5 border rounded-2xl mb-4 px-6 outline-none ${authError ? 'border-red-500' : 'border-white/10'}`} />
            <button className="w-full h-14 bg-blue-600 rounded-2xl font-black uppercase text-sm tracking-widest">{s.authBtn[lang]}</button>
          </form>
          <button onClick={onBack} className="mt-6 text-[10px] font-black uppercase opacity-40">{UI_STRINGS.back[lang]}</button>
        </div>
      </div>
    );
  }

  const Kpi = ({ title, value, rank }: any) => (
    <div className="glass-card p-6 rounded-3xl relative overflow-hidden group">
      <div className="flex justify-between items-start mb-4">
        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{title}</span>
        {rank && <div className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center text-[10px] font-black">#{rank}</div>}
      </div>
      <div className="text-4xl font-black text-white">{value}</div>
      <div className="mt-4 flex items-center gap-1.5 text-emerald-500 font-bold text-xs"><TrendingUp size={14}/> 4.2% <span className="text-slate-600 font-black uppercase text-[9px] ml-1">{s.vsPrev[lang]}</span></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-inter pb-20">
      <header className="px-10 py-10 bg-[#0f172a]/80 backdrop-blur-2xl sticky top-0 z-50 border-b border-white/5">
        <div className="flex justify-between items-center mb-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">LIVE DASHBOARD</span>
            </div>
            <h1 className="text-5xl font-black font-sora text-white tracking-tight bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              {s.dashboardTitle[lang]}
            </h1>
            <div className="flex items-center gap-2 mt-2 text-sm text-slate-500 font-medium">
              <span className="text-slate-300 font-bold">{theme.name} {s.industry[lang]}</span>
              <span>•</span>
              <span className="flex items-center gap-1.5"><Globe size={14}/> {s.updatedLabel[lang]} 2 hours ago</span>
              
              <div className="relative ml-4 inline-block group">
                <select 
                  value={activeCountry} 
                  onChange={(e) => setActiveCountry(e.target.value as CountryCode)}
                  className="bg-slate-800/50 border border-white/10 rounded-lg px-3 py-1 text-xs font-bold text-slate-300 appearance-none pr-8 cursor-pointer hover:bg-slate-800 transition-all"
                >
                  {COUNTRY_CHOICES.map(c => (
                    <option key={c.value} value={c.value}>{c.label[lang]}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500" size={14} />
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button onClick={toggleLang} className="px-5 py-3 glass-card rounded-2xl flex items-center gap-2 font-black uppercase text-[10px] border-white/10 hover:bg-white/5 transition-all">
              <Languages size={14}/> {lang.toUpperCase()}
            </button>
            <button className="px-6 py-3 bg-[#1e293b] text-white rounded-2xl flex items-center gap-2 font-black uppercase text-[10px] border border-white/10 hover:bg-slate-700 transition-all">
              <SlidersHorizontal size={14}/> {s.filters[lang]}
            </button>
            <button 
              onClick={() => exportToCSV(getResponses().filter(r => r.selected_country === activeCountry))} 
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-2xl flex items-center gap-2 font-black uppercase text-[10px] shadow-lg shadow-blue-500/30 active:scale-95 transition-all"
            >
              <Share2 size={14}/> {s.exportReport[lang]}
            </button>
            <button onClick={onBack} className="p-3 bg-red-500/10 text-red-500 rounded-2xl border border-red-500/20 hover:bg-red-500/20 transition-all">
              <ArrowLeft />
            </button>
          </div>
        </div>

        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
          {BANKS.filter(b => b.country === activeCountry).map((b, i) => (
            <button 
              key={b.id} 
              onClick={() => setSelectedBankId(b.id)} 
              className={`flex-shrink-0 min-w-[180px] h-16 rounded-2xl text-left px-6 relative transition-all duration-300 group ${
                selectedBankId === b.id 
                  ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-xl shadow-blue-500/20 scale-[1.02] z-10' 
                  : 'bg-[#141d2e] border border-white/[0.03] text-slate-300 hover:bg-[#1a2538]'
              }`}
            >
              <div className="flex items-center gap-3 relative z-10">
                {selectedBankId !== b.id && (
                  <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full" 
                       style={{ backgroundColor: i % 4 === 0 ? '#3B82F6' : i % 4 === 1 ? '#FACC15' : i % 4 === 2 ? '#22C55E' : '#A78BFA' }} 
                  />
                )}
                <span className="text-sm font-black tracking-tight">{b.name.split(' (')[0]}</span>
              </div>
              {selectedBankId !== b.id && (
                 <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </button>
          ))}
        </div>

        <nav className="flex gap-10 mt-10 border-b border-white/5">
          {(Object.keys(s.tabs) as Array<keyof typeof s.tabs>).map(key => (
            <button 
              key={key} 
              onClick={() => setCurrentTab(key)} 
              className={`pb-5 text-[10px] font-black uppercase tracking-[0.2em] relative transition-all ${currentTab === key ? 'text-white' : 'text-slate-600 hover:text-slate-400'}`}
            >
              {s.tabs[key][lang]}
              {currentTab === key && (
                <div className="absolute bottom-0 inset-x-0 h-1 bg-blue-500 rounded-t-full shadow-[0_0_12px_rgba(59,130,246,0.6)]" />
              )}
            </button>
          ))}
        </nav>
      </header>

      <main className="px-10 pt-10">
        {loading ? (
          <div className="py-60 text-center">
            <Loader2 size={48} className="animate-spin mx-auto text-blue-500 mb-6" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">Syncing Intelligence...</span>
          </div>
        ) : (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-1000">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Kpi title={s.kpis.tom[lang]} value={`${dashboardData?.metrics.topOfMind.value}%`} rank={dashboardData?.metrics.topOfMind.rank} />
              <Kpi title={s.kpis.nps[lang]} value={dashboardData?.metrics.nps.value} rank={1} />
              <Kpi title={s.kpis.momentum[lang]} value={`${dashboardData?.metrics.momentum.value}%`} rank={2} />
              <Kpi title={s.kpis.consideration[lang]} value={`${dashboardData?.metrics.consideration.value}%`} rank={1} />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <div className="glass-card p-10 rounded-[40px] border-white/5 shadow-2xl">
                <div className="flex justify-between items-center mb-10">
                  <h3 className="text-xl font-black flex items-center gap-3"><TargetIcon size={20} className="text-blue-500" /> {s.priorityMatrix[lang]}</h3>
                  <div className="text-[9px] font-black uppercase text-slate-600 tracking-widest bg-white/5 px-4 py-1.5 rounded-full border border-white/5">Q4 Data Analysis</div>
                </div>
                
                <div className="relative aspect-square border-l-2 border-b-2 border-slate-700/50 m-6">
                  <span className="absolute -left-14 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] font-black uppercase text-slate-600 tracking-widest whitespace-nowrap">{s.impVsPerf[lang].split(' vs ')[1]}</span>
                  <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase text-slate-600 tracking-widest">{s.impVsPerf[lang].split(' vs ')[0]}</span>
                  
                  <div className="absolute top-4 right-4 text-[9px] font-black uppercase opacity-40 text-slate-500">{s.quadrants.maintain[lang]}</div>
                  <div className="absolute top-4 left-4 text-[9px] font-black uppercase opacity-60 text-emerald-500">{s.quadrants.opportunity[lang]}</div>
                  <div className="absolute bottom-4 left-4 text-[9px] font-black uppercase opacity-40 text-slate-500">{s.quadrants.low[lang]}</div>
                  <div className="absolute bottom-4 right-4 text-[9px] font-black uppercase opacity-60 text-rose-500">{s.quadrants.critical[lang]}</div>
                  
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-full h-[1px] bg-white/[0.03]" />
                    <div className="h-full w-[1px] bg-white/[0.03] absolute" />
                  </div>

                  {npsDrivers.map((d, i) => (
                    <div key={i} className={`absolute w-10 h-10 rounded-full border-2 flex items-center justify-center text-[10px] font-black transition-all cursor-default hover:scale-110 ${d.impact === 'positive' ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'bg-red-500/20 border-red-500 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.3)]'}`} style={{left: `${d.importance * 100}%`, bottom: `${d.performance}%`, transform: 'translate(-50%, 50%)'}}>
                      {i+1}
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card p-10 rounded-[40px] border-white/5 shadow-2xl">
                <h3 className="text-xl font-black mb-10 flex items-center gap-3"><Activity size={20} className="text-blue-500" /> {s.loyaltyDist[lang]}</h3>
                <div className="space-y-8">
                   {Object.entries(dashboardData?.metrics.loyalty || {}).map(([key, val], idx) => (
                     <div key={key} className="group">
                        <div className="flex justify-between items-center text-[10px] font-black uppercase mb-3 text-slate-500 group-hover:text-slate-300 transition-colors">
                          <span className="tracking-widest">{key}</span>
                          <span className="text-white">{val}%</span>
                        </div>
                        <div className="h-2.5 bg-slate-800/50 rounded-full overflow-hidden border border-white/[0.03]">
                          <div 
                            className="h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(59,130,246,0.3)]" 
                            style={{
                              width: `${val}%`, 
                              backgroundColor: idx === 0 ? '#3B82F6' : idx === 1 ? '#6366F1' : idx === 2 ? '#8B5CF6' : idx === 3 ? '#F59E0B' : '#64748B'
                            }} 
                          />
                        </div>
                     </div>
                   ))}
                </div>

                <div className="mt-14 p-8 bg-blue-500/5 border border-blue-500/10 rounded-3xl">
                   <div className="flex items-start gap-4">
                      <Users size={24} className="text-blue-500 flex-shrink-0" />
                      <div>
                        <h4 className="text-sm font-black text-white mb-2">{s.audienceProf[lang]}</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">Sample size N={dashboardData?.sampleSize} respondents. Data weighted based on national demographic census 2024.</p>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
