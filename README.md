# 🧂 SALTYR

> **« Balance ton take. Vois qui ose être d'accord. »**

Le clash d'avis foot, en PWA. Un take clivant par jour, toute la France vote **POUR 🔥 / CONTRE ❄** — et tu vois **ton club contre le rival**. Le TikTok du débat, mais où tu participes.

## Le concept

- **Le Débat du Jour** — un take, le même pour tout le monde, qui expire. Le rituel quotidien (effet Wordle).
- **Le twist tribal** — le reveal ne montre pas juste « 62 % de la France » : il montre **PSG 79 % vs OM 34 %**. Tu ne défends pas ton avis, tu défends ton club.
- **Les archétypes** — pas de commentaires libres (zéro modération) : tu coches *pourquoi* parmi 6 réponses pré-écrites — 🔥 Passionné · 🧊 Objectif · 🤔 Dubitatif · ⚖️ Nuancé · 👴 Nostalgique · 😈 Provocateur. Ton archétype dominant devient ton identité.
- **Le Feed ∞** — pile de takes swipeable façon Tinder (droite = POUR, gauche = CONTRE).
- **Le Salty Board** — classement des takes les plus clivants, trié par « Salt Level » (proximité du 50/50).
- **Rebel Score** — ton % de votes minoritaires. Mouton ou rebelle ?
- **La carte à partager** — chaque verdict génère une image pour ta story. Le user fait la pub.

## Stack

- **Front** : React + Vite + Tailwind CSS · PWA (installable, offline shell)
- **Back** : Supabase (Postgres, vote atomique, 1 vote/device, realtime)
- **Auth** : aucune — device ID anonyme, zéro friction
- **Déploiement** : Vercel

## Démarrer

```bash
npm install
npm run dev
```

## Docs

- [`vision.md`](vision.md) — la vision produit complète (insight, boucle virale, route vers 1M)
- `design.html` — wireframes haute-fidélité & design system
- `vision.html` — la vision en page visuelle

---

*« Taste their tears, hear their pride. »*
