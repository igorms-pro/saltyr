# SALTYR — Vision produit

> **« Balance ton take. Vois qui ose être d'accord. »**
> Le clash d'avis foot, en PWA. Le TikTok du débat, mais où tu participes.

---

## 1. L'insight

Le foot, c'est **90 % de gueulante sur des avis**, pas sur des buts. Les gens ragent sur les transferts, les notes, l'arbitrage, les pronos ratés — **tout le temps, même à 3h du matin en juillet sans un seul match.**

- **La rage est le carburant.** L'algo de TikTok récompense le clash, pas la nuance.
- **Le vote est le partage.** Découvrir que 86 % pensent le contraire de toi crée l'émotion qui pousse à partager.
- **Le trou dans le marché :** « football hot takes » est déjà un genre viral sur TikTok — mais en **vidéos passives**. Personne n'en a fait une **app où tu participes**.

---

## 2. La boucle centrale (le noyau addictif)

Trois écrans. Une boucle de **5 secondes** que tu répètes à l'infini — et qui recrache du contenu partageable à chaque tour.

| # | Écran | Ce qui se passe |
|---|-------|-----------------|
| **01** | **La carte** | Une punchline qui pique, plein écran, fond néon. Deux boutons géants : `POUR 🔥` / `CONTRE ❄`. Zéro friction, zéro compte. |
| **02** | **Le verdict** | La barre se remplit. Tu vois ton camp, le % de la France, et si t'es un **mouton** (majorité) ou un **rebelle** (minorité). |
| **03** | **La carte à partager** | Un tap génère une image propre pour ta story. **Le user fait ta pub gratuitement.** |

Puis : **swipe → take suivant → recommence.**

---

## 3. L'app complète (les 6 systèmes)

Autour de la boucle de vote, six systèmes qui transforment un jouet en habitude quotidienne :

1. **Le Feed** — pile de cartes swipeables sans fin, personnalisée selon ton équipe et tes ligues. Le TikTok du débat foot.
2. **Filtres & univers** — Ligue 1, Premier League, Liga, Ligue des Champions, Équipe de France, débats GOAT. Tu choisis ton terrain.
3. **Le Salty Board** — le classement du jour : les takes les plus **clivants** (proches du 50/50), les plus consensuels, les plus votés.
4. **Propose ton take** — les users écrivent les punchlines. File de modération → le meilleur contenu vient de la foule, gratuitement.
5. **Rebel Score & profil** — ton % de votes minoritaires, ta série quotidienne, ton total. Une identité à faire grimper et à exhiber.
6. **Moteur de partage** — chaque verdict = une carte image générée. Le produit fabrique le contenu qui le fait grandir. En boucle.

### Focus — Le Salty Board
Le live du foot est intermittent (le soir, le week-end). Le Board rend l'app vivante **24/7** : même sans match, tu scrolles les débats les plus chauds. C'est ton **filet anti-app-vide** — et il marche avec 10 users comme avec 1 million.

---

## 4. La boucle virale (pourquoi ça grandit tout seul)

La plupart des apps **consomment** le contenu de TikTok. SALTYR en **fabrique**.

```
01 Je vote  →  02 Je découvre  →  03 Je partage  →  04 Ils arrivent
   ↑                                                        │
   └────────────────────  la boucle tourne  ────────────────┘
```

- **01 — Je vote :** un débat qui me touche, un camp que je défends. Instinctif.
- **02 — Je découvre :** « 86 % pensent le contraire ?! » L'écart crée l'émotion.
- **03 — Je partage :** la carte part en story pour prouver que j'ai raison (ou que je suis un rebelle).
- **04 — Ils arrivent :** mes potes veulent voter aussi. Retour à l'étape 01.

---

## 5. La route vers 1M

On ne construit pas « pour 1M » d'un coup. On construit la boucle, on prouve qu'elle tourne, puis on met de l'huile sur le feu.

### V1 — Jour 1 · La boucle
**Le noyau addictif.** Feed de takes, vote, reveal du %, carte à partager. Anonyme (device ID), 40 punchlines écrites à la main. Zéro backend risqué.
- PWA React + Tailwind, déploiement Vercel
- Supabase : tables `takes` / `votes`, vote atomique, 1 vote / device
- Objectif : la boucle tourne, on la teste sur soi

### V2 — Semaine 1 · La rétention
**De jouet à habitude.** On ajoute les raisons de revenir chaque jour.
- Salty Board (classements) + « Take du jour » + série quotidienne
- Rebel Score & profil · filtres par ligue
- Propose ton take + modération légère

### V3 — Mois 1 · La viralité
**On allume la mèche.** On optimise chaque écran pour le screenshot.
- Générateur de cartes soigné (formats story / TikTok)
- Takes calés sur les gros matchs & le mercato (event-tied)
- Seeding créateurs foot : ils postent leurs résultats

### 1M — Échelle · La machine
**Tenir la charge & élargir.**
- Compteurs agrégés + cache CDN sur le feed (lectures massives)
- Anti-triche, modération à l'échelle, notifications push
- Extension : NBA, télé-réalité, ciné — la méca est identique

---

## 6. Pourquoi ça peut gagner

| Chiffre | Ce que ça veut dire |
|---------|---------------------|
| **5 s** | Le temps d'un cycle vote → partage. La boucle la plus courte du game. |
| **~0 €** | Coût d'acquisition visé : chaque carte partagée est une pub gratuite. |
| **24/7** | Le Board fait vivre l'app hors des matchs. Zéro dépendance au live. |
| **1 → ∞** | Contenu seedé par toi, puis par la foule. Jamais vide, jamais tari. |

---

## 7. Exemples de takes (le contenu de départ)

- « Mbappé n'a jamais été un vrai leader. »
- « Zidane au sommet > Messi. Point. »
- « La VAR a tué le foot. »
- « Le PSG ne mérite pas sa Ligue des Champions. »
- « Un 0-0 peut être le plus beau match du monde. »
- « Benzema méritait deux Ballons d'Or. »
- « Le championnat français est ennuyeux : c'est un mensonge. »
- « Un bon gardien vaut plus qu'un bon n°10. »

---

*SALTYR — « Taste their tears, hear their pride. » · Concept & vision produit.*
