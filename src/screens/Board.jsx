// Salty Board — le classement des takes les plus clivants. Rempli par l'issue #4.
export default function Board() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center">
      <span className="text-4xl">🏆</span>
      <h2 className="take-title text-xl">Le Salty Board arrive</h2>
      <p className="text-muted text-sm max-w-[26ch]">
        Le classement des takes qui coupent la France en deux. Bientôt.
      </p>
    </div>
  )
}
