import { useState } from 'react'
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import { CLUBS } from '../../src/data/takes'
import { C, displayBlack } from '../src/theme'
import { vibrate } from '../src/haptics'
import Crest from '../components/Crest'

export default function Onboarding({ onDone }) {
  const [picked, setPicked] = useState(null)

  return (
    <View style={s.wrap}>
      <Text style={s.logo}>
        SALT<Text style={{ color: C.hot }}>·</Text>
        <Text style={{ color: C.cold }}>YR</Text>
      </Text>

      <Text style={[displayBlack, s.title]}>Choisis ton camp.</Text>
      <Text style={s.sub}>
        Ton club change tout ce que tu vois. Aucun compte, aucune adresse. Juste ta tribu.
      </Text>

      <FlatList
        data={CLUBS}
        keyExtractor={(c) => c.id}
        numColumns={3}
        columnWrapperStyle={{ gap: 10 }}
        contentContainerStyle={{ gap: 10, paddingBottom: 16 }}
        style={{ flex: 1 }}
        renderItem={({ item: club }) => {
          const active = picked === club.id
          return (
            <Pressable
              onPress={() => {
                vibrate()
                setPicked(club.id)
              }}
              style={[s.club, active && s.clubActive]}
            >
              <Crest club={club} size={44} fontSize={11} />
              <Text style={s.clubName} numberOfLines={1}>
                {club.name}
              </Text>
            </Pressable>
          )
        }}
      />

      <Pressable
        disabled={!picked}
        onPress={() => {
          vibrate(true)
          onDone(picked)
        }}
        style={({ pressed }) => [
          s.go,
          !picked && s.goDisabled,
          pressed && { transform: [{ scale: 0.97 }] },
        ]}
      >
        <Text style={[s.goText, !picked && { color: C.muted }]}>C'est parti →</Text>
      </Pressable>
    </View>
  )
}

const s = StyleSheet.create({
  wrap: { flex: 1, paddingHorizontal: 24 },
  logo: { color: C.salt, fontWeight: '900', fontSize: 18, letterSpacing: -0.5, marginBottom: 24 },
  title: { fontSize: 32, marginBottom: 8 },
  sub: { color: C.muted, fontSize: 13, lineHeight: 18, marginBottom: 20 },
  club: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: C.line,
    backgroundColor: C.ink2,
  },
  clubActive: { borderColor: C.hot, backgroundColor: 'rgba(255,90,54,0.08)' },
  clubName: { color: C.muted, fontSize: 10, fontWeight: '700', textTransform: 'uppercase' },
  go: {
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: C.hot,
    alignItems: 'center',
    marginBottom: 8,
  },
  goDisabled: { backgroundColor: C.ink2, borderWidth: 1, borderColor: C.line },
  goText: { color: '#1a0800', fontWeight: '900', fontSize: 15 },
})
