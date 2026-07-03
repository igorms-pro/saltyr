// Desktop : l'app reste mobile (elle est née pour le pouce) — on la cadre
// dans un « téléphone » centré, avec la marque à côté. Mobile : passe-through total.
export default function DesktopShell({ children }) {
  return (
    <div className="h-full lg:min-h-screen lg:flex lg:items-center lg:justify-center lg:gap-20 lg:px-10 lg:py-10 lg:bg-[radial-gradient(900px_500px_at_15%_10%,rgba(255,90,54,0.08),transparent_60%),radial-gradient(800px_500px_at_85%_90%,rgba(31,227,194,0.07),transparent_60%)]">
      {/* Panneau de marque — desktop uniquement */}
      <div className="hidden lg:flex flex-col gap-6 max-w-md">
        <div className="font-display font-black text-5xl tracking-tight">
          SALT<span className="text-hot">·</span>
          <span className="text-cold">YR</span>
        </div>
        <h1 className="take-title text-4xl text-balance">
          Balance ton take.
          <br />
          Vois qui ose être <span className="text-cold">d'accord</span>.
        </h1>
        <ul className="flex flex-col gap-3 text-muted">
          <li>
            <span className="text-hot font-black">🔥 Un débat par jour.</span> Le même pour toute la
            France. Il expire à minuit.
          </li>
          <li>
            <span className="text-salt font-black">⚔️ Ton club contre le rival.</span> Tu ne défends
            pas ton avis — tu défends ton camp.
          </li>
          <li>
            <span className="text-cold font-black">🧂 Zéro compte, zéro friction.</span> Tu votes en
            5 secondes.
          </li>
        </ul>
        <p className="text-muted/60 text-sm">
          Pensée pour le pouce — sur ton téléphone, ajoute-la à l'écran d'accueil.
        </p>
      </div>

      {/* Le cadre téléphone */}
      <div className="h-full lg:h-[780px] lg:max-h-[92vh] lg:w-[400px] lg:flex-none lg:rounded-[2.5rem] lg:border lg:border-line lg:bg-ink lg:shadow-[0_60px_120px_-40px_rgba(0,0,0,0.9)] lg:overflow-hidden">
        {children}
      </div>
    </div>
  )
}
