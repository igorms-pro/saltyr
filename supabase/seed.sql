-- Seed SALTYR — les 10 takes de lancement.
-- Les compteurs partent d'un baseline (~10 000 votes) aligné sur les splits
-- éditoriaux : les vrais votes s'y additionnent sans faire du 100/0 au démarrage.

insert into public.takes (id, cat, text, answers, pour_count, contre_count) values
(
  'mbappe-real', 'Mercato', 'Mbappé s''est planté en signant au Real.',
  '{"passionne":"Je l''ai jamais senti là-bas, point.","objectif":"Ses stats disent le contraire. Cope.","dubitatif":"Laisse-lui une saison complète avant de juger.","nuance":"Bon choix sportif, mauvais timing.","nostalgique":"Un Zidane serait resté loyal, lui.","provocateur":"Planté ? Il a ruiné tout le vestiaire oui."}',
  5500, 4500
),
(
  'var-foot', 'Arbitrage', 'La VAR a tué le foot.',
  '{"passionne":"Depuis la VAR j''éteins la télé, voilà.","objectif":"Moins d''erreurs d''arbitrage, factuellement.","dubitatif":"Faut peut-être le temps que ça se rode, non ?","nuance":"Bonne idée, exécution catastrophique.","nostalgique":"La main de Dieu, ÇA c''était du foot.","provocateur":"La VAR ? Virez carrément les arbitres."}',
  5300, 4700
),
(
  'zidane-messi', 'GOAT', 'Zidane au sommet > Messi. Point.',
  '{"passionne":"Le contrôle contre le Brésil. Fin du débat.","objectif":"8 Ballons d''Or contre 1. Les maths.","dubitatif":"Deux époques, comment comparer sérieusement ?","nuance":"Zidane le pic, Messi la carrière.","nostalgique":"Ceux qui ont vu 98 savent. Les autres non.","provocateur":"Messi sans la Pulga médiatique, c''est Iniesta."}',
  5400, 4600
),
(
  'psg-c1', 'Ligue des Champions', 'Le PSG ne mérite pas sa Ligue des Champions.',
  '{"passionne":"Des années de guez, ça se mérite pas en une saison.","objectif":"Ils ont sorti tout le monde. Mérité, factuel.","dubitatif":"Mérite ou pas, je sais même plus ce que ça veut dire.","nuance":"Mérité sur le terrain, indigeste dans l''histoire.","nostalgique":"Le PSG de Ronaldinho la méritait plus.","provocateur":"Achetée, comme tout le reste du projet."}',
  4800, 5200
),
(
  'ligue1-fermiers', 'Ligue 1', 'La Ligue 1 est un championnat de fermiers.',
  '{"passionne":"Viens voir un Lens-Lille à Bollaert et on en reparle.","objectif":"5e coefficient UEFA. Les chiffres parlent.","dubitatif":"Depuis quelques saisons je sais plus trop.","nuance":"Faible en haut, féroce au milieu.","nostalgique":"Le Bordeaux-OM des 90''s, tu peux pas test.","provocateur":"Même les Parisiens s''endorment au Parc."}',
  4600, 5400
),
(
  'benzema-ballons', 'GOAT', 'Benzema méritait deux Ballons d''Or.',
  '{"passionne":"Le 9 le plus élégant de sa génération, respect.","objectif":"2022 oui. Un deuxième ? Montre-moi l''année.","dubitatif":"Peut-être 2021... ou pas. Chaud.","nuance":"Un mérité, un volable. Ça compte pour deux ?","nostalgique":"À l''époque on le sifflait, maintenant on le sacralise.","provocateur":"Deux ? Il en méritait trois, réveillez-vous."}',
  5100, 4900
),
(
  'zero-zero', 'Débat éternel', 'Un 0-0 peut être le plus beau match du monde.',
  '{"passionne":"Un 0-0 avec 12 poteaux, j''ai pleuré une fois.","objectif":"Le spectacle se mesure pas au score. Basique.","dubitatif":"Mouais, j''ai jamais vu ce fameux beau 0-0.","nuance":"Beau tactiquement, cruel émotionnellement.","nostalgique":"Italie-France 2006, avant les tirs au but. Voilà.","provocateur":"Les amateurs de 0-0 regardent les échecs, avouez."}',
  4900, 5100
),
(
  'gardien-n10', 'Débat éternel', 'Un bon gardien vaut plus qu''un bon n°10.',
  '{"passionne":"Un arrêt à la 90e vaut tous les gestes techniques.","objectif":"Les points sauvés par saison, regardez les datas.","dubitatif":"Ça dépend tellement de l''équipe...","nuance":"Le gardien sauve, le 10 fait rêver. Deux métiers.","nostalgique":"Barthez 98 > tout le monde, désolé.","provocateur":"Les n°10 c''est des gardiens qui savent pas plonger."}',
  5800, 4200
),
(
  'om-authentique', 'Clubs', 'L''OM est le club le plus authentique de France.',
  '{"passionne":"Le Vélodrome un soir d''Europe, rien au-dessus.","objectif":"Seul club français champion d''Europe. Fact.","dubitatif":"Authentique... on met quoi derrière ce mot ?","nuance":"La ferveur oui, la gestion non.","nostalgique":"Le OM de 93, la France entière vibrait.","provocateur":"Authentiquement incapable de gagner un titre, oui."}',
  5200, 4800
),
(
  'edf-2026-98', 'Équipe de France', 'L''équipe de France actuelle > la génération 98.',
  '{"passionne":"On compare pas des légendes à des influenceurs.","objectif":"Profondeur de banc actuelle largement supérieure.","dubitatif":"Attends qu''ils gagnent autant avant de trancher.","nuance":"Plus de talent aujourd''hui, plus d''âme en 98.","nostalgique":"Le 12 juillet 98 c''est un jour férié dans mon cœur.","provocateur":"98 en 2026 ils prennent 4-0, soyons sérieux."}',
  4100, 5900
);
