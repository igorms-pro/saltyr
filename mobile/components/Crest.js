import { Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { C } from '../src/theme'

// L'écusson d'un club — dégradé aux couleurs du club, comme le web.
export default function Crest({ club, size = 44, fontSize = 12, radius = 12 }) {
  return (
    <LinearGradient
      colors={club.colors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ color: '#fff', fontWeight: '900', fontSize }}>
        {club.emoji || club.name.slice(0, 3).toUpperCase()}
      </Text>
    </LinearGradient>
  )
}

export { C }
