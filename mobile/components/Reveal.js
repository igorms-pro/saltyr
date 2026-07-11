import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { ARCHETYPES } from '../../src/data/takes'
import { C, card, mono, displayBlack } from '../src/theme'
import { vibrate } from '../src/haptics'
import Crest from './Crest'

function ClubBar({ club, pct, isYou }) {
  return (
    <View style={s.clubRow}>
      <View style={s.clubLabel}>
        <Crest club={club} size={24} fontSize={7} radius={8} />
        <Text style={s.clubWho}>{isYou ? 'Toi' : 'Rival'}</Text>
      </View>
      <View style={s.clubTrack}>
        <View
          style={[
            s.clubFill,
            { width: `${pct}%`, backgroundColor: isYou ? C.hot : C.cold },
          ]}
        />
      </View>
      <Text style={s.clubPct}>{pct}%</Text>
    </View>
  )
}

export default function Reveal({ take, side, archetype, stats, onNext, nextLabel = 'Suivant →', footer = null }) {
  const pour = stats.pour
  const majority = (side === 'pour') === (pour >= 50)
  const yourPct = side === 'pour' ? pour : 100 - pour
  const hasDuel = Boolean(stats.club && stats.rival)
  const clubLeads = hasDuel && stats.club.pct > stats.rival.pct

  const top = ARCHETYPES.map((a, i) => ({ ...a, pct: stats.archPcts[i] }))
    .sort((a, b) => b.pct - a.pct)
    .slice(0, 3)

  return (
    <View style={[card, s.wrap]}>
      <ScrollView style={{ flex: 1 }}>
        <Text style={[mono, { color: C.hot }]}>Résultat</Text>
        <Text style={[displayBlack, s.title]}>{take.text}</Text>

        {/* Le duel national */}
        <View style={s.duel}>
          <View style={[s.duelPour, { width: `${pour}%` }]}>
            <Text style={s.duelPourText}>{pour}%</Text>
          </View>
          <View style={s.duelContre}>
            <Text style={s.duelContreText}>{100 - pour}%</Text>
          </View>
        </View>

        {/* Le twist tribal — masqué pour les Neutres */}
        {hasDuel && (
          <View style={{ gap: 10, marginTop: 16 }}>
            <ClubBar club={stats.club} pct={stats.club.pct} isYou />
            <ClubBar club={stats.rival} pct={stats.rival.pct} isYou={false} />
          </View>
        )}

        {/* Top archétypes */}
        <View style={s.archBlock}>
          <Text style={[mono, { color: C.muted, fontSize: 10, marginBottom: 10 }]}>
            Pourquoi ils ont voté
          </Text>
          {top.map((a) => {
            const you = a.id === archetype
            return (
              <View key={a.id} style={s.archRow}>
                <Text style={[s.archLabel, you && s.archYou]}>
                  {a.emoji} {a.label} {you && '← toi'}
                </Text>
                <Text style={[s.archPct, you && s.archYou]}>{a.pct}%</Text>
              </View>
            )
          })}
        </View>
      </ScrollView>

      <View>
        <View style={s.badge}>
          <Text style={s.badgeText}>
            {majority ? "T'ES DANS LA MAJORITÉ 🐑" : `T'ES DANS LES ${yourPct}% DE REBELLES ✊`}
            {hasDuel && (clubLeads ? ' · TON CLUB MÈNE' : ' · TON CLUB PERD, RAMÈNE DU MONDE')}
          </Text>
        </View>
        {onNext && (
          <Pressable
            onPress={() => {
              vibrate()
              onNext()
            }}
            style={({ pressed }) => [s.nextBtn, pressed && { transform: [{ scale: 0.95 }] }]}
          >
            <Text style={s.nextText}>{nextLabel}</Text>
          </Pressable>
        )}
        {footer}
      </View>
    </View>
  )
}

const s = StyleSheet.create({
  wrap: { flex: 1, padding: 24 },
  title: { fontSize: 19, lineHeight: 23, marginTop: 8, marginBottom: 16 },
  duel: {
    height: 48,
    borderRadius: 16,
    overflow: 'hidden',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: C.line,
  },
  duelPour: { backgroundColor: C.hot, justifyContent: 'center', paddingLeft: 14 },
  duelPourText: { color: '#1a0800', fontWeight: '900', fontVariant: ['tabular-nums'] },
  duelContre: { flex: 1, backgroundColor: C.cold, justifyContent: 'center', alignItems: 'flex-end', paddingRight: 14 },
  duelContreText: { color: '#012019', fontWeight: '900', fontVariant: ['tabular-nums'] },
  clubRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  clubLabel: { flexDirection: 'row', alignItems: 'center', gap: 8, width: 64 },
  clubWho: { color: C.salt, fontSize: 12, fontWeight: '800' },
  clubTrack: { flex: 1, height: 10, borderRadius: 6, backgroundColor: C.line, overflow: 'hidden' },
  clubFill: { height: '100%', borderRadius: 6 },
  clubPct: { color: C.muted, fontSize: 12, fontWeight: '800', width: 36, textAlign: 'right', fontVariant: ['tabular-nums'] },
  archBlock: { marginTop: 20, borderTopWidth: 1, borderTopColor: C.line, paddingTop: 16 },
  archRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 },
  archLabel: { color: C.muted, fontSize: 14 },
  archPct: { color: C.muted, fontSize: 14, fontWeight: '700', fontVariant: ['tabular-nums'] },
  archYou: { color: C.gold, fontWeight: '800' },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,194,75,0.1)',
    borderColor: 'rgba(255,194,75,0.4)',
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 16,
    marginTop: 12,
  },
  badgeText: { color: C.gold, fontWeight: '800', fontSize: 11 },
  nextBtn: {
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: C.salt,
    alignItems: 'center',
  },
  nextText: { color: C.ink, fontWeight: '900', fontSize: 15 },
})
