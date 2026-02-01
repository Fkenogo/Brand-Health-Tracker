
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { SURVEY_QUESTIONS, UI_STRINGS, COUNTRY_CHOICES, COUNTRY_THEMES, ALL_BANKS } from './constants';
import { saveResponse, isSurveyCompleted, setSurveyCompleted, saveDraft, getDraft } from './utils/storage';
import { getFingerprint } from './utils/validation';
import { QuestionRenderer } from './components/QuestionRenderer';
import { ProgressBar } from './components/ProgressBar';
import { AdminDashboard } from './components/AdminDashboard';
import { PieChart, CheckCircle2, Globe, BarChart, ChevronRight } from 'lucide-react';
import { Language, CountryCode, Question } from './types';
import confetti from 'https://cdn.skypack.dev/canvas-confetti';

const App: React.FC = () => {
  const deviceId = useMemo(() => getFingerprint(), []);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [lang, setLang] = useState<Language>(() => (localStorage.getItem('survey_lang') as Language) || 'en');
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<any>(() => {
    const path = window.location.pathname.replace('/', '').toLowerCase();
    const valid: CountryCode[] = ['rwanda', 'uganda', 'burundi'];
    const pre = valid.find(c => path === c || path === c.substr(0, 2));
    return { selected_country: pre };
  });
  const [isCompleted, setIsCompleted] = useState(() => isSurveyCompleted(deviceId));

  useEffect(() => { localStorage.setItem('survey_lang', lang); }, [lang]);

  const visibleQuestions = useMemo(() => {
    return SURVEY_QUESTIONS.filter(q => !q.logic || q.logic(formData));
  }, [formData]);

  const currentQuestion = visibleQuestions[currentStep];

  const handleNext = () => {
    if (currentStep < visibleQuestions.length - 1) {
      setCurrentStep(s => s + 1);
    } else {
      saveResponse({ ...formData, device_id: deviceId, language_at_submission: lang });
      setSurveyCompleted();
      setIsCompleted(true);
      confetti({ particleCount: 150, spread: 70 });
    }
  };

  const isNextDisabled = currentQuestion?.required && !formData[currentQuestion.id];
  const theme = formData.selected_country ? COUNTRY_THEMES[formData.selected_country as CountryCode] : null;

  if (isAdmin) return <AdminDashboard onBack={() => setIsAdmin(false)} lang={lang} />;

  if (isCompleted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-[#0f172a]">
        <div className="glass-card p-10 rounded-[40px] text-center max-w-lg w-full">
          <CheckCircle2 size={64} className="text-emerald-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">{UI_STRINGS.murakoze[lang]}</h1>
          <p className="opacity-60 mb-8">{UI_STRINGS.successMessage[lang]}</p>
          <button onClick={() => window.location.reload()} className="w-full py-4 bg-blue-600 rounded-2xl font-bold">New Session</button>
        </div>
      </div>
    );
  }

  if (showWelcome) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#0f172a]">
        <div className="max-w-lg w-full text-center space-y-12 animate-in fade-in zoom-in duration-700">
           <Globe size={80} className="text-blue-500 mx-auto" />
           <div className="space-y-4">
              <h1 className="text-5xl font-black font-sora text-white">Banking Insights 2026</h1>
              <p className="text-slate-400">Independent regional market research.</p>
           </div>
           
           <div className="space-y-6">
              <div className="flex bg-slate-900/50 p-1.5 rounded-2xl border border-white/5 mx-auto w-fit">
                {(['en', 'rw', 'fr'] as Language[]).map(l => (
                  <button 
                    key={l}
                    onClick={() => setLang(l)}
                    className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${lang === l ? 'bg-blue-600 text-white' : 'text-slate-500'}`}
                  >
                    {l === 'en' ? 'English' : l === 'rw' ? 'Kiny' : 'Français'}
                  </button>
                ))}
              </div>

              <button 
                onClick={() => setShowWelcome(false)}
                className="w-full h-20 bg-blue-600 rounded-3xl font-black text-xl flex items-center justify-center gap-4 hover:scale-105 transition-all"
              >
                Start Survey <ChevronRight />
              </button>
              <button onClick={() => setIsAdmin(true)} className="text-[10px] uppercase font-black tracking-widest text-slate-600 hover:text-white">Admin Portal</button>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200">
      <header className="max-w-2xl mx-auto px-6 py-10 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center font-black" style={theme ? {backgroundColor: theme.primary} : {}}>
            {formData.selected_country?.substr(0, 2).toUpperCase() || '?'}
          </div>
          <span className="font-black uppercase tracking-widest text-sm">Collector</span>
        </div>
        <button onClick={() => setLang(l => l === 'en' ? 'rw' : l === 'rw' ? 'fr' : 'en')} className="px-4 py-2 glass-card rounded-xl text-[10px] font-black uppercase">{lang}</button>
      </header>

      <div className="max-w-2xl mx-auto px-6 mb-8">
        <ProgressBar current={currentStep + 1} total={visibleQuestions.length} themeColor={theme?.primary} />
      </div>

      <main className="max-w-2xl mx-auto px-6 pb-40">
        {currentQuestion && (
          <div key={`${currentQuestion.id}-${lang}`} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-black font-sora">{currentQuestion.label[lang]}</h2>
            {currentQuestion.description && <p className="opacity-60">{currentQuestion.description[lang]}</p>}
            <QuestionRenderer question={currentQuestion} formData={formData} value={formData[currentQuestion.id]} lang={lang} onChange={(v) => setFormData({...formData, [currentQuestion.id]: v})} themeColor={theme?.primary} />
          </div>
        )}
      </main>

      <footer className="fixed bottom-0 inset-x-0 p-8 glass-card border-t border-white/5">
        <div className="max-w-2xl mx-auto flex gap-4">
          <button onClick={() => setCurrentStep(s => s - 1)} disabled={currentStep === 0} className="flex-1 py-5 rounded-3xl font-black border border-white/5 disabled:opacity-20">{UI_STRINGS.back[lang]}</button>
          <button onClick={handleNext} disabled={isNextDisabled} className="flex-[2] py-5 rounded-3xl bg-blue-600 font-black disabled:opacity-50" style={!isNextDisabled && theme ? {backgroundColor: theme.primary} : {}}>
            {currentStep === visibleQuestions.length - 1 ? UI_STRINGS.complete[lang] : UI_STRINGS.continue[lang]}
          </button>
        </div>
      </footer>
    </div>
  );
};

export default App;
