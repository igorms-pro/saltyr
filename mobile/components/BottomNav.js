import { Pressable, StyleSheet, Text, View } from 'react-native'
import { C } from '../src/theme'
import { vibrate } from '../src/haptics'

const TABS = [
  { id: 'debat', emoji: '🔥', label: 'Débat' },
  { id: 'feed', emoji: '♾️', label: 'Feed' },
  { id: 'board', emoji: '🏆', label: 'Board' },
  { id: 'profil', emoji: '👤', label: 'Profil' },
]

export default function BottomNav({ tab, onTab }) {
  return (
    <View style={s.nav}>
      {TABS.map((t) => {
        const active = tab === t.id
        return (
          <Pressable
            key={t.id}
            onPress={() => {
              vibrate()
              onTab(t.id)
            }}
            style={s.tab}
          >
            <Text style={[s.emoji, !active && s.inactive]}>{t.emoji}</Text>
            <Text style={[s.label, { color: active ? C.hot : 'rgba(125,135,152,0.6)' }]}>
              {t.label}
            </Text>
          </Pressable>
        )
      })}
    </View>
  )
}

const s = StyleSheet.create({
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    paddingBottom: 4,
    borderTopWidth: 1,
    borderTopColor: C.line,
    marginTop: 12,
  },
  tab: { alignItems: 'center', gap: 2, paddingHorizontal: 12, paddingVertical: 4 },
  emoji: { fontSize: 18 },
  inactive: { opacity: 0.5 },
  label: { fontSize: 10, fontWeight: '700', letterSpacing: 0.5 },
})
