import { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { CLUBS } from '../src/data/takes'
import { hydrate, getClub, setClub, clearClub, getVotes } from './src/store'
import { C } from './src/theme'
import Onboarding from './screens/Onboarding'
import DailyDebate from './screens/DailyDebate'
import Feed from './screens/Feed'
import Board from './screens/Board'
import Profil from './screens/Profil'
import BottomNav from './components/BottomNav'

export default function App() {
  const [ready, setReady] = useState(false)
  const [clubId, setClubId] = useState(null)
  const [tab, setTab] = useState('debat')
  const [feedTakeId, setFeedTakeId] = useState(null)

  // Hydrate le storage une fois → ensuite tout le code lit en synchrone.
  useEffect(() => {
    hydrate().then(() => {
      setClubId(getClub())
      setReady(true)
    })
  }, [])

  if (!ready) {
    return <View style={{ flex: 1, backgroundColor: C.ink }} />
  }

  if (!clubId) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={s.root}>
          <StatusBar style="light" />
          <Onboarding
            onDone={(id) => {
              setClub(id)
              setClubId(id)
            }}
          />
        </SafeAreaView>
      </SafeAreaProvider>
    )
  }

  const club = CLUBS.find((c) => c.id === clubId)
  const votedCount = Object.keys(getVotes()).length

  return (
    <SafeAreaProvider>
      <SafeAreaView style={s.root}>
        <StatusBar style="light" />
        <View style={s.frame}>
          <View style={s.header}>
            <Text style={s.logo}>
              SALT<Text style={{ color: C.hot }}>·</Text>
              <Text style={{ color: C.cold }}>YR</Text>
            </Text>
            <View style={s.headerRight}>
              <View style={s.crest}>
                <Text style={s.crestText}>
                  {club.emoji || club.name.slice(0, 3).toUpperCase()}
                </Text>
              </View>
              <Text style={s.count}>🧂 {votedCount}</Text>
            </View>
          </View>

          {tab === 'debat' && <DailyDebate clubId={clubId} />}
          {tab === 'feed' && (
            <Feed key={feedTakeId || 'feed'} clubId={clubId} initialTakeId={feedTakeId} />
          )}
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
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.ink },
  frame: { flex: 1, paddingHorizontal: 20, paddingTop: 8, paddingBottom: 4 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 16,
  },
  logo: { color: C.salt, fontWeight: '900', fontSize: 16, letterSpacing: -0.5 },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  crest: {
    width: 24,
    height: 24,
    borderRadius: 8,
    backgroundColor: C.ink2,
    borderWidth: 1,
    borderColor: C.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  crestText: { color: C.salt, fontWeight: '900', fontSize: 7 },
  count: { color: C.gold, fontWeight: '700', fontSize: 12, fontVariant: ['tabular-nums'] },
})
