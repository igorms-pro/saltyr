import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { ARCHETYPES } from '../../src/data/takes'
import { C, card, mono, displayBlack } from '../src/theme'
import { vibrate } from '../src/haptics'

export default function ArchetypePick({ take, side, onPick, onBack }) {
  return (
    <View style={[card, s.wrap]}>
      {onBack && (
        <Pressable
          onPress={() => {
            vibrate()
            onBack()
          }}
          style={s.back}
        >
          <Text style={s.backText}>← Revoir la question</Text>
        </Pressable>
      )}

      <Text style={[mono, { color: C.hot }]}>{take.cat}</Text>
      <Text style={[displayBlack, s.takeText]}>{take.text}</Text>

      <Text style={[mono, { color: C.gold }]}>
        Tu es {side === 'pour' ? 'POUR 🔥' : 'CONTRE ❄'}
      </Text>
      <Text style={[displayBlack, s.why]}>Pourquoi ?</Text>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ gap: 10 }}>
        {ARCHETYPES.map((a) => (
          <Pressable
            key={a.id}
            onPress={() => {
              vibrate()
              onPick(a.id)
            }}
            style={({ pressed }) => [s.answer, pressed && s.answerPressed]}
          >
            <Text style={s.answerText}>
              {a.emoji}  <Text style={{ fontWeight: '700' }}>{take.answers[a.id]}</Text>
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <Text style={s.footer}>Pas de commentaires. Que des punchlines maison. 🧂</Text>
    </View>
  )
}

const s = StyleSheet.create({
  wrap: { flex: 1, padding: 20 },
  back: { alignSelf: 'flex-start', marginBottom: 12 },
  backText: { color: C.muted, fontSize: 12, fontWeight: '700' },
  takeText: { fontSize: 16, lineHeight: 20, marginTop: 6, marginBottom: 14 },
  why: { fontSize: 20, marginTop: 4, marginBottom: 14 },
  answer: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: C.line,
    backgroundColor: 'rgba(10,14,20,0.6)',
  },
  answerPressed: { transform: [{ scale: 0.98 }], borderColor: 'rgba(255,90,54,0.6)' },
  answerText: { color: C.salt, fontSize: 13, lineHeight: 18 },
  footer: { color: 'rgba(125,135,152,0.6)', fontSize: 11, textAlign: 'center', paddingTop: 12 },
})
