import { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { getDailyTake, msUntilMidnight, formatCountdown } from '../../src/lib/daily'
import { getVotes } from '../src/store'
import { C, mono } from '../src/theme'
import VoteFlow from '../components/VoteFlow'

// Le rituel : un take par jour, le même pour tout le monde, qui expire à minuit.
export default function DailyDebate({ clubId }) {
  const take = getDailyTake()
  const vote = getVotes()[take.id] || null
  const [countdown, setCountdown] = useState(() => formatCountdown(msUntilMidnight()))

  useEffect(() => {
    const t = setInterval(() => setCountdown(formatCountdown(msUntilMidnight())), 30000)
    return () => clearInterval(t)
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <View style={s.pill}>
        <Text style={[mono, { color: C.muted, fontSize: 10 }]}>
          🔥 Débat du jour · ferme dans {countdown}
        </Text>
      </View>
      <VoteFlow
        take={take}
        clubId={clubId}
        initialVote={vote}
        onNext={null}
        revealFooter={
          <Text style={s.footer}>
            Prochain débat dans <Text style={{ color: C.gold, fontWeight: '700' }}>{countdown}</Text>{' '}
            — reviens défendre ton camp. 🧂
          </Text>
        }
      />
    </View>
  )
}

const s = StyleSheet.create({
  pill: {
    alignSelf: 'flex-start',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: C.line,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  footer: { textAlign: 'center', color: 'rgba(125,135,152,0.7)', fontSize: 12, marginTop: 16 },
})
