import { useState } from 'react'
import { CLUBS } from './data/takes'
import { getClub, setClub, clearClub, getVotes, getDeviceId } from './lib/device'
import Onboarding from './components/Onboarding'
import BottomNav from './components/BottomNav'
import DailyDebate from './screens/DailyDebate'
import Feed from './screens/Feed'
import Board from './screens/Board'
import Profil from './screens/Profil'

export default function App() {
  getDeviceId() // s'assure que l'identité anonyme existe

  const [clubId, setClubId] = useState(getClub())
  const [tab, setTab] = useState('debat') // le rituel d'abord
  const [feedTakeId, setFeedTakeId] = useState(null) // take ciblé depuis le Board

  if (!clubId) {
    return (
      <Onboarding
        onDone={(id) => {
          setClub(id)
          setClubId(id)
        }}
      />
    )
  }

  const club = CLUBS.find((c) => c.id === clubId)
  const votedCount = Object.keys(getVotes()).length

  return (
    <div className="h-full flex flex-col px-5 pt-12 pb-6 max-w-md mx-auto">
      <header className="flex items-center justify-between pb-4">
        <div className="font-display font-black tracking-tight">
          SALT<span className="text-hot">·</span>
          <span className="text-cold">YR</span>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-muted">
          <span
            className="w-6 h-6 rounded-lg grid place-items-center font-display font-black text-white text-[8px]"
            style={{ background: `linear-gradient(135deg, ${club.colors[0]}, ${club.colors[1]})` }}
          >
            {club.name.slice(0, 3).toUpperCase()}
          </span>
          <span className="text-gold tabular-nums">🧂 {votedCount}</span>
        </div>
      </header>

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
    </div>
  )
}
