import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import { TAKES } from '../../src/data/takes'
import { saltLevel } from '../../src/lib/salt'
import { getVotes } from '../src/store'
import { C, card, displayBlack } from '../src/theme'
import { vibrate } from '../src/haptics'

export default function Board({ onOpenTake }) {
  const votes = getVotes()
  const ranked = [...TAKES].sort((a, b) => saltLevel(b) - saltLevel(a))

  return (
    <View style={{ flex: 1 }}>
      <Text style={[displayBlack, s.title]}>Salty Board</Text>
      <Text style={s.sub}>
        Les takes qui coupent la France en deux. Trié au{' '}
        <Text style={{ color: C.gold, fontWeight: '700' }}>Salt Level</Text> 🧂
      </Text>

      <FlatList
        data={ranked}
        keyExtractor={(t) => t.id}
        contentContainerStyle={{ gap: 10, paddingBottom: 8 }}
        renderItem={({ item: take, index: i }) => {
          const vote = votes[take.id]
          const salt = saltLevel(take)
          return (
            <Pressable
              onPress={() => {
                if (!vote) {
                  vibrate()
                  onOpenTake(take.id)
                }
              }}
              style={({ pressed }) => [card, s.row, pressed && !vote && { transform: [{ scale: 0.98 }] }]}
            >
              <Text style={[s.rank, { color: i < 3 ? C.gold : 'rgba(125,135,152,0.6)' }]}>
                {i + 1}
              </Text>
              <View style={{ flex: 1 }}>
                <Text style={s.text}>« {take.text} »</Text>
                <View style={s.meta}>
                  <View style={s.gauge}>
                    <View style={[s.gaugePour, { width: `${take.pour}%` }]} />
                    <View style={s.gaugeContre} />
                  </View>
                  <Text style={s.split}>
                    {take.pour}/{100 - take.pour}
                  </Text>
                  {vote ? (
                    <Text style={[s.you, { color: vote.side === 'pour' ? C.hot : C.cold }]}>
                      {vote.side === 'pour' ? 'TOI : POUR 🔥' : 'TOI : CONTRE ❄'}
                    </Text>
                  ) : (
                    <Text style={[s.you, { color: C.gold }]}>→ VOTE</Text>
                  )}
                </View>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={s.salt}>{salt}</Text>
                <Text style={s.saltLabel}>SALT</Text>
              </View>
            </Pressable>
          )
        }}
      />
    </View>
  )
}

const s = StyleSheet.create({
  title: { fontSize: 24, marginBottom: 4 },
  sub: { color: C.muted, fontSize: 12, marginBottom: 16 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
  },
  rank: { fontWeight: '900', fontSize: 18, width: 24 },
  text: { color: C.salt, fontWeight: '700', fontSize: 13, lineHeight: 18 },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 6 },
  gauge: {
    width: 64,
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: C.line,
  },
  gaugePour: { backgroundColor: C.hot, height: '100%' },
  gaugeContre: { backgroundColor: C.cold, height: '100%', flex: 1 },
  split: { color: C.muted, fontSize: 10, fontWeight: '700', fontVariant: ['tabular-nums'] },
  you: { fontSize: 10, fontWeight: '900' },
  salt: { color: C.gold, fontWeight: '700', fontSize: 14, fontVariant: ['tabular-nums'] },
  saltLabel: { color: 'rgba(125,135,152,0.5)', fontSize: 8, letterSpacing: 1.4, fontWeight: '600' },
})
