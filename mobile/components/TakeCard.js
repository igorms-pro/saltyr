import { Pressable, StyleSheet, Text, View } from 'react-native'
import { C, card, mono, displayBlack } from '../src/theme'
import { vibrate } from '../src/haptics'

export default function TakeCard({ take, votesCount, onVote }) {
  return (
    <View style={[card, s.wrap]}>
      <View>
        <Text style={[mono, { color: C.hot }]}>{take.cat}</Text>
        <Text style={[displayBlack, s.title]}>{take.text}</Text>
        <View style={s.liveRow}>
          <View style={s.dot} />
          <Text style={s.liveText}>
            {votesCount.toLocaleString('fr-FR')} ont déjà tranché
          </Text>
        </View>
      </View>

      <View style={s.buttons}>
        <Pressable
          onPress={() => {
            vibrate()
            onVote('contre')
          }}
          style={({ pressed }) => [s.btn, s.btnContre, pressed && s.pressed]}
        >
          <Text style={[s.btnText, { color: C.cold }]}>CONTRE ❄</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            vibrate()
            onVote('pour')
          }}
          style={({ pressed }) => [s.btn, s.btnPour, pressed && s.pressed]}
        >
          <Text style={[s.btnText, { color: '#1a0800' }]}>POUR 🔥</Text>
        </Pressable>
      </View>
    </View>
  )
}

const s = StyleSheet.create({
  wrap: { flex: 1, justifyContent: 'space-between', padding: 24 },
  title: { fontSize: 28, lineHeight: 32, marginTop: 12, marginBottom: 16 },
  liveRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: C.hot },
  liveText: { color: C.muted, fontSize: 12, fontVariant: ['tabular-nums'] },
  buttons: { flexDirection: 'row', gap: 12, marginTop: 20 },
  btn: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  btnContre: {
    borderWidth: 1.5,
    borderColor: 'rgba(31,227,194,0.4)',
    backgroundColor: 'rgba(31,227,194,0.05)',
  },
  btnPour: { backgroundColor: C.hot },
  btnText: { fontWeight: '900', fontSize: 15 },
  pressed: { transform: [{ scale: 0.95 }] },
})
