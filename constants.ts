import { Bank, Choice, Question, Localized, CountryCode } from './types';

export interface CountryTheme {
  primary: string;
  secondary: string;
  accent: string;
  name: string;
  title: Localized;
}

export const COUNTRY_THEMES: Record<CountryCode, CountryTheme> = {
  rwanda: {
    primary: '#3B82F6',
    secondary: '#FACC15',
    accent: '#22C55E',
    name: 'Rwanda',
    title: {
      en: 'Rwanda Bank Brand Health Dashboard',
      rw: 'Imiterere y\'ibigo bya banki mu Rwanda',
      fr: 'Tableau de bord de la santé des marques bancaires au Rwanda'
    }
  },
  uganda: {
    primary: '#000000',
    secondary: '#FACC15',
    accent: '#EF4444',
    name: 'Uganda',
    title: {
      en: 'Uganda Bank Brand Health Dashboard',
      rw: 'Imiterere y\'ibigo bya banki muri Uganda',
      fr: 'Tableau de bord de la santé des marques bancaires en Ouganda'
    }
  },
  burundi: {
    primary: '#EF4444',
    secondary: '#22C55E',
    accent: '#FFFFFF',
    name: 'Burundi',
    title: {
      en: 'Burundi Bank Brand Health Dashboard',
      rw: 'Imiterere y\'ibigo bya banki mu Burundi',
      fr: 'Tableau de bord de la santé des marques bancaires au Burundi'
    }
  }
};

export const ALL_BANKS: Bank[] = [
  // Rwanda
  { id: 'BK_RW', name: 'Bank of Kigali (BK)', country: 'rwanda' },
  { id: 'IM_RW', name: 'I&M Bank', country: 'rwanda' },
  { id: 'BPR_RW', name: 'BPR Bank', country: 'rwanda' },
  { id: 'ECO_RW', name: 'EcoBank', country: 'rwanda' },
  { id: 'COGE_RW', name: 'Cogebanque', country: 'rwanda' },
  { id: 'ACC_RW', name: 'Access Bank', country: 'rwanda' },
  { id: 'EQU_RW', name: 'Equity Bank', country: 'rwanda' },
  { id: 'BOA_RW', name: 'Bank of Africa', country: 'rwanda' },
  { id: 'NCBA_RW', name: 'NCBA Bank', country: 'rwanda' },
  { id: 'GTB_RW', name: 'Guaranty Trust Bank (GTBank)', country: 'rwanda' },
  { id: 'KCB_RW', name: 'KCB Bank', country: 'rwanda' },
  { id: 'URW_RW', name: 'Urwego Opportunity Bank', country: 'rwanda' },
  { id: 'UNG_RW', name: 'Unguka Bank', country: 'rwanda' },
  // Uganda
  { id: 'ABSA_UG', name: 'Absa Bank', country: 'uganda' },
  { id: 'STB_UG', name: 'Stanbic Bank', country: 'uganda' },
  { id: 'CEN_UG', name: 'Centenary Bank', country: 'uganda' },
  { id: 'EQU_UG', name: 'Equity Bank', country: 'uganda' },
  // Burundi
  { id: 'KCB_BI', name: 'KCB Bank', country: 'burundi' },
  { id: 'BAN_BI', name: 'BANCOBU', country: 'burundi' },
  { id: 'ECO_BI', name: 'EcoBank', country: 'burundi' }
];

export const getBankChoicesByCountry = (country?: CountryCode): Choice[] => {
  if (!country) return [];
  return ALL_BANKS
    .filter(b => b.country === country)
    .map(b => ({ label: { en: b.name, rw: b.name, fr: b.name }, value: b.id }));
};

export const COUNTRY_CHOICES: Choice[] = [
  { label: { en: 'Rwanda', rw: 'u Rwanda', fr: 'Rwanda' }, value: 'rwanda' },
  { label: { en: 'Uganda', rw: 'u Bugande', fr: 'Ouganda' }, value: 'uganda' },
  { label: { en: 'Burundi', rw: 'u Burundi', fr: 'Burundi' }, value: 'burundi' }
];

export const UI_STRINGS = {
  adminPortal: { en: 'Admin Portal', rw: "Ibiro by'Ubuyobozi", fr: 'Portail Admin' },
  back: { en: 'Back', rw: 'Subira inyuma', fr: 'Retour' },
  continue: { en: 'Continue', rw: 'Komeza', fr: 'Continuer' },
  complete: { en: 'Complete Survey', rw: 'Rangiza Ubushakashatsi', fr: 'Terminer' },
  murakoze: { en: 'Thank you!', rw: 'Murakoze!', fr: 'Merci !' },
  selectOption: { en: 'Select an option...', rw: 'Hitamo rimwe...', fr: 'Sélectionnez...' },
  typeAnswer: { en: 'Type your answer here...', rw: 'Andika igisubizo hano...', fr: 'Tapez votre réponse...' },
  successMessage: { 
    en: 'Thank you for participating! Your feedback helps improve banking services.', 
    rw: 'Murakoze cyane! Ibitekerezo byanyu ni ingenzi mu gushyigikira serivisi za banki.',
    fr: 'Merci de votre participation ! Vos commentaires aident à améliorer les services.'
  },
  admin: {
    dashboardTitle: { en: 'Brand Health Tracker', rw: 'Isesengura ry\'Ibirango', fr: 'Suivi de Santé de Marque' },
    industry: { en: 'Banking Industry', rw: 'Isesengura rya Banki', fr: 'Secteur Bancaire' },
    filters: { en: 'Filters', rw: 'Muyunguruzi', fr: 'Filtres' },
    exportReport: { en: 'Export Report', rw: 'Raporo ya CSV', fr: 'Exporter le Rapport' },
    updatedLabel: { en: 'Updated', rw: 'Iheruka', fr: 'Mis à jour' },
    scope: { en: 'Market Data Scope', rw: 'Igipimo cy\'isoko', fr: 'Périmètre des données' },
    liveIntelligence: { en: 'Live Dashboard', rw: 'Amakuru y\'ako kanya', fr: 'Tableau de bord' },
    csvReport: { en: 'Export CSV', rw: 'Kuramo CSV', fr: 'Exporter CSV' },
    authTitle: { en: 'Admin Access', rw: 'Kwinjira', fr: 'Accès Admin' },
    authDesc: { en: 'Enter administrator password', rw: 'Andika ijambo ry\'ibanga', fr: 'Entrez le mot de passe' },
    authBtn: { en: 'Authenticate', rw: 'Kwinjira', fr: 'S\'authentifier' },
    vsPrev: { en: 'vs Prev Quarter', rw: 'ugereranyije na mbere', fr: 'vs Trimestre Précédent' },
    loyaltyDist: { en: 'Loyalty Distribution', rw: 'Isesengura ry\'ubudahemuka', fr: 'Distribution de la Fidélité' },
    audienceProf: { en: 'Audience Profile', rw: 'Imyirondoro y\'abajijwe', fr: 'Profil de l\'Audience' },
    leadersBench: { en: 'Market Leaders Benchmarking', rw: 'Igereranya ry\'ibigo bikomeye', fr: 'Analyse Comparative' },
    priorityMatrix: { en: 'Priority Matrix', rw: 'Icyapa mbonerabitekerezo', fr: 'Matrice de Priorité' },
    impVsPerf: { en: 'Importance vs Performance', rw: 'Ingufu n\'Umusaruro', fr: 'Importance vs Performance' },
    quadrants: {
      maintain: { en: 'Maintain Strength', rw: 'Gukomera', fr: 'Maintenir' },
      opportunity: { en: 'Key Opportunities', rw: 'Amahirwe', fr: 'Opportunités' },
      low: { en: 'Low Priority', rw: 'Ibyo gutekereza', fr: 'Priorité Basse' },
      critical: { en: 'Critical Risk', rw: 'Ibyo kwitonderwa', fr: 'Risque Critique' }
    },
    tabs: {
      overview: { en: 'Overview', rw: 'Incamake', fr: 'Vue d\'ensemble' },
      awareness: { en: 'Awareness', rw: 'Kumenyekana', fr: 'Notoriété' },
      usage: { en: 'Usage', rw: 'Ikoreshwa', fr: 'Usage' },
      momentum: { en: 'Momentum', rw: 'Ingufu', fr: 'Momentum' },
      loyalty: { en: 'Loyalty', rw: 'Ubudahemuka', fr: 'Fidélité' },
      snapshot: { en: 'Snapshot', rw: 'Ishusho', fr: 'Instantané' },
      competitive: { en: 'Competitive', rw: 'Ihangana', fr: 'Compétition' },
      nps: { en: 'NPS Drivers', rw: 'Ibintu bitera NPS', fr: 'Facteurs NPS' }
    },
    kpis: {
      tom: { en: 'Top-of-Mind Recall', rw: 'Iya mbere m\'intekerezo', fr: 'Notoriété Top-of-Mind' },
      nps: { en: 'Net Promoter Score', rw: 'Igipimo cya NPS', fr: 'Net Promoter Score' },
      momentum: { en: 'Brand Momentum', rw: 'Ingufu z\'ikirango', fr: 'Momentum de Marque' },
      consideration: { en: 'Future Consideration', rw: 'Icyifuzo cy\'ahazaza', fr: 'Considération Future' }
    }
  }
};

export const RATING_DESCRIPTORS: Record<number, Localized> = {
  0: { en: 'Not at all likely', rw: 'Ntibishoboka', fr: 'Pas du tout probable' },
  5: { en: 'Neutral', rw: 'Hagati na hagati', fr: 'Neutre' },
  10: { en: 'Extremely likely', rw: 'Birashoboka cyane', fr: 'Extrêmement probable' }
};

export const GENDER_CHOICES: Choice[] = [
  { label: { en: 'Male', rw: 'Gabo', fr: 'Homme' }, value: 'male' },
  { label: { en: 'Female', rw: 'Gore', fr: 'Femme' }, value: 'female' }
];

export const SURVEY_QUESTIONS: Question[] = [
  {
    id: 'intro',
    type: 'note',
    section: 'A',
    label: { en: 'Welcome to Regional Banking Insights 2026', rw: 'Ikaze mu bushakashatsi 2026', fr: 'Bienvenue aux Perspectives Bancaires 2026' },
    description: { 
      en: 'Share your views to help improve banking services. Confidentiality is guaranteed.',
      rw: 'Tanga ibitekerezo byanyu ufashe kunoza serivisi. Ibitekerezo byanyu bizaguma ari ibanga.',
      fr: 'Partagez vos opinions pour améliorer les services bancaires. La confidentialité est garantie.'
    }
  },
  {
    id: 'selected_country',
    type: 'radio',
    section: 'A',
    label: { en: 'Which country are you responding from?', rw: 'Ni mu buhe gihugu muri gusubiriza?', fr: 'De quel pays répondez-vous ?' },
    required: true,
    choices: COUNTRY_CHOICES
  },
  {
    id: 'consent',
    type: 'radio',
    section: 'A',
    label: { en: 'Would you like to participate?', rw: 'Wifuza kugira uruhare?', fr: 'Souhaitez-vous participer ?' },
    required: true,
    choices: [
      { label: { en: 'Yes', rw: 'Yego', fr: 'Oui' }, value: 'yes' }, 
      { label: { en: 'No', rw: 'Oya', fr: 'Non' } , value: 'no' }
    ]
  },
  {
    id: 'b1_last_used',
    type: 'radio',
    section: 'B',
    label: { en: 'Last time you used banking services?', rw: 'Ni ryari mwaherukaga?', fr: 'Dernière utilisation des services ?' },
    required: true,
    logic: (d) => d.consent === 'yes',
    choices: [
      { label: { en: 'This Month', rw: 'Uyu kwezi', fr: 'Ce mois-ci' }, value: 'this_month' },
      { label: { en: 'More than a month ago', rw: 'Harenze ukwezi', fr: 'Plus d\'un mois' }, value: 'more_than_month' }
    ]
  },
  {
    id: 'b2_age',
    type: 'radio',
    section: 'B',
    label: { en: 'What is your age category?', rw: 'Imyaka yanyu?', fr: 'Quelle est votre tranche d\'âge ?' },
    required: true,
    logic: (d) => d.consent === 'yes',
    choices: [
      { label: { en: '18-24', rw: '18-24', fr: '18-24' }, value: '18-24' },
      { label: { en: '25-34', rw: '25-34', fr: '25-34' }, value: '25-34' },
      { label: { en: '35-44', rw: '35-44', fr: '35-44' }, value: '35-44' },
      { label: { en: '45-54', rw: '45-54', fr: '45-54' }, value: '45-54' },
      { label: { en: '55+', rw: '55+', fr: '55+' }, value: '55+' }
    ]
  },
  {
    id: 'c1_first_bank',
    type: 'text',
    section: 'C',
    label: { en: 'Which bank comes to your mind FIRST?', rw: 'Ni iyihe banki ihita ikuza mu mutwe?', fr: 'Quelle banque vous vient à l\'esprit en PREMIER ?' },
    required: true,
    logic: (d) => d.consent === 'yes'
  },
  {
    id: 'c3_aware_banks',
    type: 'checkbox',
    section: 'C',
    label: { en: 'Tick all banks you are aware of:', rw: 'Hitamo banki zose uzi:', fr: 'Cochez les banques que vous connaissez :' },
    required: true,
    filterChoices: (d) => getBankChoicesByCountry(d.selected_country),
    logic: (d) => !!d.c1_first_bank
  },
  {
    id: 'thank_you',
    type: 'note',
    section: 'F',
    label: { en: 'Complete', rw: 'Murakoze', fr: 'Terminé' },
    description: { en: 'Thank you for your participation!', rw: 'Murakoze cyane!', fr: 'Merci de votre participation !' },
    logic: (d) => d.consent === 'yes'
  }
];

export const BANKS = ALL_BANKS;
export const AGE_CHOICES = [
  { label: { en: '18-24', rw: '18-24', fr: '18-24' }, value: '18-24' },
  { label: { en: '25-34', rw: '25-34', fr: '25-34' }, value: '25-34' },
  { label: { en: '35-44', rw: '35-44', fr: '35-44' }, value: '35-44' },
  { label: { en: '45-54', rw: '45-54', fr: '45-54' }, value: '45-54' },
  { label: { en: '55+', rw: '55+', fr: '55+' }, value: '55+' }
];