import { useState } from 'react'
import { CLUBS } from './data/takes'
import { getClub, setClub, clearClub, getVotes, getDeviceId } from './lib/device'
import { useSession } from './lib/useSession'
import { parseDeepLinkTakeId, clearDeepLink } from './lib/deeplink'
import Onboarding from './components/Onboarding'
import BottomNav from './components/BottomNav'
import DesktopShell from './components/DesktopShell'
import DailyDebate from './screens/DailyDebate'
import Feed from './screens/Feed'
import Board from './screens/Board'
import Profil from './screens/Profil'
import Settings from './screens/Settings'

export default function App() {
  getDeviceId() // s'assure que l'identité anonyme existe
  const { session } = useSession() // session Supabase anonyme, invisible

  // Deep-link : arrivée via une carte partagée (/t/<id>). Capturé une fois,
  // préservé à travers l'onboarding, puis l'app ouvre ce take dans le Feed.
  const [deepTakeId] = useState(() => {
    const id = parseDeepLinkTakeId()
    clearDeepLink()
    return id
  })

  const [clubId, setClubId] = useState(getClub())
  const [tab, setTab] = useState(deepTakeId ? 'feed' : 'debat') // lien partagé → Feed ; sinon rituel
  const [feedTakeId, setFeedTakeId] = useState(deepTakeId) // take ciblé (deep-link ou Board)
  const [settingsOpen, setSettingsOpen] = useState(false)

  if (!clubId) {
    return (
      <DesktopShell>
        <Onboarding
          deeplinked={Boolean(deepTakeId)}
          onDone={(id) => {
            setClub(id)
            setClubId(id)
            // après l'onboarding, on file voter le take partagé
            if (deepTakeId) {
              setFeedTakeId(deepTakeId)
              setTab('feed')
            }
          }}
        />
      </DesktopShell>
    )
  }

  const club = CLUBS.find((c) => c.id === clubId)
  const votedCount = Object.keys(getVotes()).length

  return (
    <DesktopShell>
    <div className="h-full flex flex-col px-5 pt-12 pb-6 max-w-md mx-auto lg:pt-8">
      <header className="flex items-center justify-between pb-4">
        <div className="font-display font-black tracking-tight">
          SALT<span className="text-hot">·</span>
          <span className="text-cold">YR</span>
        </div>
        <div className="flex items-center gap-2.5 text-xs font-bold text-muted">
          <span
            className="w-6 h-6 rounded-lg grid place-items-center font-display font-black text-white text-[8px]"
            style={{ background: `linear-gradient(135deg, ${club.colors[0]}, ${club.colors[1]})` }}
          >
            {club.emoji || club.name.slice(0, 3).toUpperCase()}
          </span>
          <span className="text-gold tabular-nums">🧂 {votedCount}</span>
          <button
            onClick={() => setSettingsOpen(true)}
            aria-label="Réglages"
            className="text-muted/70 hover:text-salt active:scale-90 transition-all text-base leading-none"
          >
            ⚙️
          </button>
        </div>
      </header>

      {settingsOpen ? (
        <Settings
          session={session}
          onBack={() => setSettingsOpen(false)}
          onSignedOut={() => setSettingsOpen(false)}
        />
      ) : (
        <>
      {tab === 'debat' && <DailyDebate clubId={clubId} />}
      {tab === 'feed' && <Feed key={feedTakeId || 'feed'} clubId={clubId} initialTakeId={feedTakeId} />}
      {tab === 'board' && (
        <Board
          onOpenTake={(id) => {
            setFeedTakeId(id)
            setTab('feed')
          }}
        />
      )}
      {tab === 'profil' && (
        <Profil
          clubId={clubId}
          session={session}
          onChangeClub={() => {
            clearClub()
            setClubId(null)
            setTab('debat')
          }}
        />
      )}

      <BottomNav
        tab={tab}
        onTab={(t) => {
          if (t === 'feed') setFeedTakeId(null)
          setTab(t)
        }}
      />
        </>
      )}
    </div>
    </DesktopShell>
  )
}
