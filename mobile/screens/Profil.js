import { useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { CLUBS } from '../../src/data/takes'
import { computeProfileStats, rebelTitle } from '../src/stats'
import { C, card, mono, displayBlack } from '../src/theme'
import { vibrate } from '../src/haptics'
import Crest from '../components/Crest'

export default function Profil({ clubId, onChangeClub }) {
  const club = CLUBS.find((c) => c.id === clubId)
  const stats = computeProfileStats()
  const [confirmSwitch, setConfirmSwitch] = useState(false)

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
      {/* Identité */}
      <View style={s.identity}>
        <Crest club={club} size={64} fontSize={20} radius={16} />
        <Text style={[displayBlack, { fontSize: 18, textAlign: 'center' }]}>
          {club.neutral
            ? 'Sans club, 100 % foot'
            : `Supporter ${club.id === 'om' ? "de l'" : 'du '}${club.name}`}
        </Text>
        <Text style={s.identSub}>
          🧂 {stats.total} votes · 🔥 {stats.streak} jour{stats.streak > 1 ? 's' : ''} de série
        </Text>
      </View>

      {/* Rebel Score */}
      <View style={[card, s.block]}>
        <View style={s.blockHead}>
          <Text style={[mono, { color: C.muted, fontSize: 10 }]}>Rebel Score</Text>
          <Text style={s.rebelPct}>{stats.rebelScore}%</Text>
        </View>
        <View style={s.track}>
          <View style={[s.fill, { width: `${stats.rebelScore}%` }]} />
        </View>
        <Text style={s.blockText}>
          Tu votes minoritaire {stats.rebelScore}% du temps. {rebelTitle(stats.rebelScore)}
        </Text>
      </View>

      {/* Archétype dominant */}
      <View style={[card, s.block]}>
        <Text style={[mono, { color: C.muted, fontSize: 10 }]}>Ton archétype</Text>
        {stats.dominant ? (
          <View style={s.domRow}>
            <Text style={{ fontSize: 30 }}>{stats.dominant.emoji}</Text>
            <View>
              <Text style={[displayBlack, { fontSize: 17 }]}>{stats.dominant.label}</Text>
              <Text style={s.blockText}>{stats.dominantPct}% de tes votes</Text>
            </View>
          </View>
        ) : (
          <Text style={[s.blockText, { marginTop: 8 }]}>
            Vote pour découvrir qui tu es vraiment. 🧂
          </Text>
        )}
      </View>

      {/* Stats grid */}
      <View style={s.grid}>
        {[
          { v: stats.total, label: 'Votes', color: C.salt },
          { v: stats.streak, label: 'Série', color: C.gold },
          { v: `${stats.rebelScore}%`, label: 'Rebelle', color: C.cold },
        ].map((x) => (
          <View key={x.label} style={[card, s.cell]}>
            <Text style={[s.cellValue, { color: x.color }]}>{x.v}</Text>
            <Text style={s.cellLabel}>{x.label}</Text>
          </View>
        ))}
      </View>

      {/* Changer de club — la trahison assumée */}
      <Pressable
        onPress={() => {
          vibrate()
          if (confirmSwitch) onChangeClub()
          else setConfirmSwitch(true)
        }}
        style={[s.switch, confirmSwitch && s.switchConfirm]}
      >
        <Text style={[s.switchText, confirmSwitch && { color: C.hot }]}>
          {confirmSwitch
            ? club.neutral
              ? 'Confirmer — tu choisis enfin un camp ? 👀'
              : `Confirmer la trahison ${club.id === 'om' ? "de l'" : 'du '}${club.name} ? 😱`
            : 'Changer de club'}
        </Text>
      </Pressable>
    </ScrollView>
  )
}

const s = StyleSheet.create({
  identity: { alignItems: 'center', gap: 8, paddingVertical: 16 },
  identSub: { color: C.muted, fontSize: 12, fontVariant: ['tabular-nums'] },
  block: { padding: 20, marginBottom: 12, borderRadius: 16 },
  blockHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 },
  rebelPct: { color: C.cold, fontWeight: '900', fontSize: 24, fontVariant: ['tabular-nums'] },
  track: { height: 10, borderRadius: 6, backgroundColor: C.line, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 6, backgroundColor: C.cold },
  blockText: { color: C.muted, fontSize: 12, marginTop: 10 },
  domRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 8 },
  grid: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  cell: { flex: 1, paddingVertical: 14, alignItems: 'center', borderRadius: 16 },
  cellValue: { fontWeight: '900', fontSize: 18, fontVariant: ['tabular-nums'] },
  cellLabel: { color: C.muted, fontSize: 9, textTransform: 'uppercase', letterSpacing: 1.2, marginTop: 2 },
  switch: {
    marginTop: 'auto',
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: C.line,
    alignItems: 'center',
    marginBottom: 8,
  },
  switchConfirm: { borderColor: C.hot, backgroundColor: 'rgba(255,90,54,0.1)' },
  switchText: { color: C.muted, fontWeight: '700', fontSize: 13 },
})
