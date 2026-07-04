// Les archétypes de réponse — écrits par nous, cochés par les users.
// Zéro texte libre = zéro modération.
export const ARCHETYPES = [
  { id: 'passionne', emoji: '🔥', label: 'Le Passionné' },
  { id: 'objectif', emoji: '🧊', label: "L'Objectif" },
  { id: 'dubitatif', emoji: '🤔', label: 'Le Dubitatif' },
  { id: 'nuance', emoji: '⚖️', label: 'Le Nuancé' },
  { id: 'nostalgique', emoji: '👴', label: 'Le Nostalgique' },
  { id: 'provocateur', emoji: '😈', label: 'Le Provocateur' },
]

// Rivalités réelles quand elles existent ; sinon PSG par défaut
// (tout le monde déteste le leader — c'est le rôle du leader).
export const CLUBS = [
  { id: 'psg', name: 'PSG', colors: ['#0a1a3f', '#c1122e'], rival: 'om' },
  { id: 'om', name: 'Marseille', colors: ['#2fb5e6', '#0a3d6b'], rival: 'psg' },
  { id: 'ol', name: 'Lyon', colors: ['#12326b', '#c1122e'], rival: 'ase' },
  { id: 'rcl', name: 'Lens', colors: ['#f0b000', '#111111'], rival: 'lil' },
  { id: 'asm', name: 'Monaco', colors: ['#c1122e', '#ffffff'], rival: 'ogcn' },
  { id: 'lil', name: 'Lille', colors: ['#e01a22', '#111111'], rival: 'rcl' },
  { id: 'ase', name: 'St-Étienne', colors: ['#0a9b4b', '#ffffff'], rival: 'ol' },
  { id: 'ogcn', name: 'Nice', colors: ['#c1122e', '#111111'], rival: 'asm' },
  { id: 'srfc', name: 'Rennes', colors: ['#e01a22', '#111111'], rival: 'fcn' },
  { id: 'fcn', name: 'Nantes', colors: ['#f7d417', '#0a7b3e'], rival: 'srfc' },
  { id: 'rcsa', name: 'Strasbourg', colors: ['#2f9ee0', '#ffffff'], rival: 'psg' },
  { id: 'tfc', name: 'Toulouse', colors: ['#5b3e8f', '#ffffff'], rival: 'psg' },
  { id: 'mhsc', name: 'Montpellier', colors: ['#0a2f6b', '#f28c00'], rival: 'ogcn' },
  { id: 'sb29', name: 'Brest', colors: ['#e01a22', '#ffffff'], rival: 'srfc' },
  { id: 'sdr', name: 'Reims', colors: ['#e01a22', '#ffffff'], rival: 'psg' },
  { id: 'aja', name: 'Auxerre', colors: ['#1a4fa0', '#ffffff'], rival: 'psg' },
  { id: 'hac', name: 'Le Havre', colors: ['#0a2f6b', '#7fc9e8'], rival: 'psg' },
  // Pas de club : le reveal reste national, pas de duel tribal.
  { id: 'neutre', name: 'Neutre', colors: ['#5c6879', '#232e3d'], rival: null, neutral: true, emoji: '🇫🇷' },
]

// Pack de lancement — 10 takes evergreen + les takes d'actu datés.
// pour = % POUR baseline. date = 'YYYY-MM-DD' → devient LE Débat du Jour ce jour-là.
export const TAKES = [
  // ==== TAKES D'ACTU (ajoutés chaque matin depuis les news de la veille) ====
  // <NEWS_TAKES> — l'agent quotidien insère ici, ne pas supprimer cette ancre
  {
    id: 'mbappe-ameriquesud-2026-07-04',
    date: '2026-07-04',
    cat: 'Équipe de France',
    text: 'Mbappé a raison : le foot sud-américain a un train de retard sur l\'Europe.',
    pour: 47,
    answers: {
      passionne: 'Merci de le dire tout haut, on le pense tous depuis 20 ans.',
      objectif: 'La Colombie finit 1re de son groupe devant le Portugal, les chiffres le contredisent direct.',
      dubitatif: 'Attendons la fin du Mondial avant de sortir le classement définitif des continents.',
      nuance: 'Vrai sur la structure des championnats, faux sur le terrain cette année.',
      nostalgique: 'Pelé, Maradona, Ronaldinho... on parlait pas comme ça de leur niveau avant.',
      provocateur: 'Il attend juste d\'être éliminé par une équipe sud-américaine pour se taire.',
    },
  },
  {
    id: 'fifa-croatie-2026-07-03',
    date: '2026-07-03',
    cat: 'Coupe du Monde',
    text: 'Le but refusé à la Croatie : la FIFA décide qui gagne.',
    pour: 52,
    answers: {
      passionne: 'On l\'a tous vu en direct, ce but était valable. Point.',
      objectif: 'Relis la règle du hors-jeu avant de crier au complot.',
      dubitatif: 'Attendons les images de la FIFA avant de juger.',
      nuance: 'Décision limite, mais de là à parler de complot...',
      nostalgique: 'Avant la VAR on gueulait 5 minutes et on passait à autre chose.',
      provocateur: 'Le Portugal en finale vend plus de maillots, cherchez pas.',
    },
  },
  // ==== EVERGREEN ====
  {
    id: 'mbappe-real',
    cat: 'Mercato',
    text: 'Mbappé s\'est planté en signant au Real.',
    pour: 55,
    answers: {
      passionne: 'Je l\'ai jamais senti là-bas, point.',
      objectif: 'Ses stats disent le contraire. Cope.',
      dubitatif: 'Laisse-lui une saison complète avant de juger.',
      nuance: 'Bon choix sportif, mauvais timing.',
      nostalgique: 'Un Zidane serait resté loyal, lui.',
      provocateur: 'Planté ? Il a ruiné tout le vestiaire oui.',
    },
  },
  {
    id: 'var-foot',
    cat: 'Arbitrage',
    text: 'La VAR a tué le foot.',
    pour: 53,
    answers: {
      passionne: 'Depuis la VAR j\'éteins la télé, voilà.',
      objectif: 'Moins d\'erreurs d\'arbitrage, factuellement.',
      dubitatif: 'Faut peut-être le temps que ça se rode, non ?',
      nuance: 'Bonne idée, exécution catastrophique.',
      nostalgique: 'La main de Dieu, ÇA c\'était du foot.',
      provocateur: 'La VAR ? Virez carrément les arbitres.',
    },
  },
  {
    id: 'zidane-messi',
    cat: 'GOAT',
    text: 'Zidane au sommet > Messi. Point.',
    pour: 54,
    answers: {
      passionne: 'Le contrôle contre le Brésil. Fin du débat.',
      objectif: '8 Ballons d\'Or contre 1. Les maths.',
      dubitatif: 'Deux époques, comment comparer sérieusement ?',
      nuance: 'Zidane le pic, Messi la carrière.',
      nostalgique: 'Ceux qui ont vu 98 savent. Les autres non.',
      provocateur: 'Messi sans la Pulga médiatique, c\'est Iniesta.',
    },
  },
  {
    id: 'psg-c1',
    cat: 'Ligue des Champions',
    text: 'Le PSG ne mérite pas sa Ligue des Champions.',
    pour: 48,
    answers: {
      passionne: 'Des années de guez, ça se mérite pas en une saison.',
      objectif: 'Ils ont sorti tout le monde. Mérité, factuel.',
      dubitatif: 'Mérite ou pas, je sais même plus ce que ça veut dire.',
      nuance: 'Mérité sur le terrain, indigeste dans l\'histoire.',
      nostalgique: 'Le PSG de Ronaldinho la méritait plus.',
      provocateur: 'Achetée, comme tout le reste du projet.',
    },
  },
  {
    id: 'ligue1-fermiers',
    cat: 'Ligue 1',
    text: 'La Ligue 1 est un championnat de fermiers.',
    pour: 46,
    answers: {
      passionne: 'Viens voir un Lens-Lille à Bollaert et on en reparle.',
      objectif: '5e coefficient UEFA. Les chiffres parlent.',
      dubitatif: 'Depuis quelques saisons je sais plus trop.',
      nuance: 'Faible en haut, féroce au milieu.',
      nostalgique: 'Le Bordeaux-OM des 90\'s, tu peux pas test.',
      provocateur: 'Même les Parisiens s\'endorment au Parc.',
    },
  },
  {
    id: 'benzema-ballons',
    cat: 'GOAT',
    text: 'Benzema méritait deux Ballons d\'Or.',
    pour: 51,
    answers: {
      passionne: 'Le 9 le plus élégant de sa génération, respect.',
      objectif: '2022 oui. Un deuxième ? Montre-moi l\'année.',
      dubitatif: 'Peut-être 2021... ou pas. Chaud.',
      nuance: 'Un mérité, un volable. Ça compte pour deux ?',
      nostalgique: 'À l\'époque on le sifflait, maintenant on le sacralise.',
      provocateur: 'Deux ? Il en méritait trois, réveillez-vous.',
    },
  },
  {
    id: 'zero-zero',
    cat: 'Débat éternel',
    text: 'Un 0-0 peut être le plus beau match du monde.',
    pour: 49,
    answers: {
      passionne: 'Un 0-0 avec 12 poteaux, j\'ai pleuré une fois.',
      objectif: 'Le spectacle se mesure pas au score. Basique.',
      dubitatif: 'Mouais, j\'ai jamais vu ce fameux beau 0-0.',
      nuance: 'Beau tactiquement, cruel émotionnellement.',
      nostalgique: 'Italie-France 2006, avant les tirs au but. Voilà.',
      provocateur: 'Les amateurs de 0-0 regardent les échecs, avouez.',
    },
  },
  {
    id: 'gardien-n10',
    cat: 'Débat éternel',
    text: 'Un bon gardien vaut plus qu\'un bon n°10.',
    pour: 58,
    answers: {
      passionne: 'Un arrêt à la 90e vaut tous les gestes techniques.',
      objectif: 'Les points sauvés par saison, regardez les datas.',
      dubitatif: 'Ça dépend tellement de l\'équipe...',
      nuance: 'Le gardien sauve, le 10 fait rêver. Deux métiers.',
      nostalgique: 'Barthez 98 > tout le monde, désolé.',
      provocateur: 'Les n°10 c\'est des gardiens qui savent pas plonger.',
    },
  },
  {
    id: 'om-authentique',
    cat: 'Clubs',
    text: 'L\'OM est le club le plus authentique de France.',
    pour: 52,
    answers: {
      passionne: 'Le Vélodrome un soir d\'Europe, rien au-dessus.',
      objectif: 'Seul club français champion d\'Europe. Fact.',
      dubitatif: 'Authentique... on met quoi derrière ce mot ?',
      nuance: 'La ferveur oui, la gestion non.',
      nostalgique: 'Le OM de 93, la France entière vibrait.',
      provocateur: 'Authentiquement incapable de gagner un titre, oui.',
    },
  },
  {
    id: 'edf-2026-98',
    cat: 'Équipe de France',
    text: 'L\'équipe de France actuelle > la génération 98.',
    pour: 41,
    answers: {
      passionne: 'On compare pas des légendes à des influenceurs.',
      objectif: 'Profondeur de banc actuelle largement supérieure.',
      dubitatif: 'Attends qu\'ils gagnent autant avant de trancher.',
      nuance: 'Plus de talent aujourd\'hui, plus d\'âme en 98.',
      nostalgique: 'Le 12 juillet 98 c\'est un jour férié dans mon cœur.',
      provocateur: '98 en 2026 ils prennent 4-0, soyons sérieux.',
    },
  },
]
